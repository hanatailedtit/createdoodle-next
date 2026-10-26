'use client';
import Link from 'next/link';
import {ArrowRight, SearchX} from 'lucide-react';
import AuthorProfile from '@/components/common/AuthorProfile';
import CommonPagination from '@/components/common/CommonPagination';
import StreamingCover from '@/components/home/StreamingCover';
import PostList from '@/components/list/PostList';
import DefaultSidebar from '@/components/sidebar/DefaultSidebar';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {usePost} from '@/hooks/usePost';
import type {PostListItemType} from '@/types/post.types';

export default function HomeContent({posts}: {posts: PostListItemType[]}) {
  const {
    categoryId,
    categoryList,
    query,
    featured,
    page,
    totalPages,
    total,
    sort,
    posts: list,
    setCategory,
    setPage,
    setSort,
    clearFilters,
  } = usePost(posts);
  return (
    <main id="main-content" className="page-container pt-6 md:pt-10">
      <section id="about" aria-label="블로그 소개" className="mb-5 md:mb-10">
        <h1 className="sr-only md:hidden">지영의 개발 기록, 끄적끄적</h1>
        <div className="md:hidden">
          <AuthorProfile compact />
        </div>
        <div className="hidden md:block">
          <div className="flex items-center justify-between gap-4 text-[13px]">
            <p className="font-mono font-medium text-accent-foreground">
              HANATAILEDTIT’S DEVELOPMENT JOURNAL
            </p>
            <p className="text-muted-foreground">
              {posts.length}개의 글 · {categoryList.length - 1}개의 주제
            </p>
          </div>
          <h1 className="mt-4 text-[38px] font-bold leading-[1.45] tracking-tight">
            직접 만들고, <span className="doodle-underline">오래 남기는</span>{' '}
            개발 기록.
          </h1>
          <p className="mt-5 leading-7 text-muted-foreground">
            프론트엔드부터 C++·임베디드·서버까지, 직접 부딪히며 배운 것들을
            끄적입니다.
          </p>
        </div>
      </section>
      <div className="blog-grid items-start">
        <div className="flex min-w-0 flex-col">
          <div
            className="order-1 mb-5 flex gap-2 overflow-x-auto pb-1 md:order-2 md:mb-0 md:mt-6"
            role="group"
            aria-label="카테고리 필터">
            {categoryList.map((item) => (
              <Button
                key={item.value || 'all'}
                variant={categoryId === item.value ? 'default' : 'outline'}
                className="h-11 shrink-0 rounded-full border-0 px-4 text-[13px] font-normal md:h-10 md:text-sm"
                aria-pressed={categoryId === item.value}
                onClick={() => setCategory(item.value)}>
                {item.value === 'library-and-framework'
                  ? '프레임워크'
                  : item.label}{' '}
                {item.count}
              </Button>
            ))}
          </div>
          {featured && (
            <Card className="order-2 rounded-2xl p-4 md:order-1 md:rounded-[20px] md:p-6 xl:p-7">
              <Link
                href={`/post/${featured.id}`}
                className="group grid items-center gap-5 rounded-md md:grid-cols-[minmax(0,1fr)_42%] md:gap-6">
                <div className="order-2 min-w-0 md:order-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground md:text-[13px]">
                    <Badge>추천 아티클</Badge>
                    <Badge variant="secondary">{featured.category}</Badge>
                    <span>
                      {featured.date} · {featured.readingMinutes}분 읽기
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold leading-[1.45] tracking-tight group-hover:text-accent-foreground md:text-[28px]">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {featured.description}
                  </p>
                  <span className="mt-5 hidden items-center gap-3 text-sm font-bold text-accent-foreground md:inline-flex">
                    아티클 읽기
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <StreamingCover className="order-1 md:order-2" />
              </Link>
            </Card>
          )}
          <section
            id="articles"
            aria-labelledby="articles-heading"
            className="order-3 mt-5 min-w-0 md:mt-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2
                id="articles-heading"
                className="text-lg font-bold md:text-xl">
                {query
                  ? `‘${query}’ 검색 결과`
                  : categoryId
                    ? categoryList.find((item) => item.value === categoryId)
                        ?.label
                    : sort === 'oldest'
                      ? '전체 아티클'
                      : '최신 아티클'}
                {(query || categoryId) && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {total}개
                  </span>
                )}
              </h2>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger
                  className="h-10 w-[112px] border-0 bg-transparent shadow-none"
                  aria-label="글 정렬">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="oldest">오래된순</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div role="status" className="sr-only">
              {total}개의 글, {page + 1}페이지
            </div>
            {list.length ? (
              <PostList list={list} />
            ) : (
              <Card className="flex flex-col items-center gap-4 px-6 py-16 text-center">
                <SearchX
                  className="size-8 text-muted-foreground"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-bold">
                  조건에 맞는 글이 없습니다.
                </h3>
                <p className="text-sm text-muted-foreground">
                  다른 검색어를 입력하거나 전체 글을 둘러보세요.
                </p>
                <Button variant="secondary" onClick={clearFilters}>
                  전체 글 보기
                </Button>
              </Card>
            )}
            <CommonPagination
              pagination={page}
              totalCount={totalPages}
              onClickPagination={setPage}
            />
          </section>
          <p className="order-4 mt-10 text-center text-[13px] text-muted-foreground md:hidden">
            조금씩 이해하고, 꾸준히 기록하기.
          </p>
        </div>
        <aside className="hidden lg:block" aria-label="작성자와 카테고리">
          <DefaultSidebar />
        </aside>
      </div>
    </main>
  );
}
