import {Suspense} from 'react';
import {getPostMd} from '@/api/post.api';
import HomeContent from '@/components/home/HomeContent';
import {POST_LIST} from '@/constants/post-list.constants';
import {getReadingMinutes} from '@/utils/posts.utils';

export default async function Home() {
  const posts = await Promise.all(
    POST_LIST.map(async (post) => ({
      ...post,
      readingMinutes: getReadingMinutes(await getPostMd(post.id)),
    })),
  );
  return (
    <Suspense
      fallback={
        <main
          id="main-content"
          className="page-container py-12"
          aria-busy="true">
          <p>개발 기록을 불러오고 있습니다.</p>
        </main>
      }>
      <HomeContent posts={posts} />
    </Suspense>
  );
}
