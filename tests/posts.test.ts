import assert from 'node:assert/strict';
import test from 'node:test';
import {POST_LIST} from '../src/constants/post-list.constants.ts';
import {getPostPage, getReadingMinutes} from '../src/utils/posts.utils.ts';
import {getPostHeadings} from '../src/utils/markdown.utils.ts';

test('추천 글은 중복하지 않고 모든 글을 페이지에 나눈다', () => {
  const first = getPostPage(POST_LIST, new URLSearchParams());
  assert.equal(first.featured?.id, '20');
  assert.equal(first.posts[0].id, '21');
  const ids = Array.from({length: first.totalPages}, (_, page) =>
    getPostPage(POST_LIST, new URLSearchParams({page: String(page)})).posts.map(
      (post) => post.id,
    ),
  ).flat();
  assert.equal(ids.length, POST_LIST.length - 1);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(!ids.includes('20'));
});

test('카테고리·검색·정렬을 함께 적용하고 원본 목록을 보존한다', () => {
  const ids = POST_LIST.map((post) => post.id);
  const result = getPostPage(
    POST_LIST,
    new URLSearchParams({category: 'language', q: 'c++', sort: 'oldest'}),
  );
  assert.equal(result.featured, undefined);
  assert.deepEqual(
    result.posts.map((post) => post.id),
    ['16', '17'],
  );
  assert.deepEqual(
    POST_LIST.map((post) => post.id),
    ids,
  );
  assert.deepEqual(
    getPostPage(POST_LIST, new URLSearchParams({category: 'server'})).posts.map(
      (post) => post.id,
    ),
    ['20'],
  );
});

test('잘못된 페이지·카테고리와 빈 검색 결과를 안전하게 처리한다', () => {
  for (const page of ['NaN', 'Infinity', '-5']) {
    assert.equal(getPostPage(POST_LIST, new URLSearchParams({page})).page, 0);
  }
  const last = getPostPage(
    POST_LIST,
    new URLSearchParams({page: '99999', category: 'missing'}),
  );
  assert.equal(last.page, last.totalPages - 1);
  assert.equal(last.categoryId, null);
  const empty = getPostPage(
    POST_LIST,
    new URLSearchParams({q: '존재하지않는검색어', page: '10'}),
  );
  assert.equal(empty.page, 0);
  assert.equal(empty.totalPages, 0);
  assert.equal(empty.posts.length, 0);
});

test('실제 마크다운 제목만 목차에 넣고 같은 제목도 고유 주소를 갖는다', () => {
  const headings = getPostHeadings(
    '# 제목\n\n## **반복** `코드`\n\n```md\n## 가짜 제목\n```\n\n## **반복** `코드`\n\n소제목\n------\n\n### 하위 제목',
  );
  assert.deepEqual(
    headings.map((heading) => heading.title),
    ['반복 코드', '반복 코드', '소제목', '하위 제목'],
  );
  assert.equal(new Set(headings.map((heading) => heading.id)).size, 4);
  assert.equal(headings[0].id, 'section-3');
  assert.equal(headings[3].depth, 3);
});

test('읽기 시간은 빈 글에도 양수이며 본문 길이에 따라 증가한다', () => {
  assert.equal(getReadingMinutes(''), 1);
  assert.equal(getReadingMinutes('가'.repeat(1001)), 3);
});
