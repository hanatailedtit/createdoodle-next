import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {getPostMd} from '@/api/post.api';
import MdPost from '@/components/posts/MdPost';
import TableOfContents from '@/components/posts/TableOfContents';
import ReadingProgress from '@/components/posts/ReadingProgress';
import AuthorProfile, {AuthorAvatar} from '@/components/common/AuthorProfile';
import CopyButton from '@/components/common/CopyButton';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {POST_LIST} from '@/constants/post-list.constants';
import {SITE} from '@/constants/site.constants';
import {getPostHeadings} from '@/utils/markdown.utils';
import {getReadingMinutes} from '@/utils/posts.utils';

type PostProps = {params: {id: string}};
export function generateStaticParams() {
  return POST_LIST.map((post) => ({id: post.id}));
}
export function generateMetadata({params}: PostProps): Metadata {
  const post = POST_LIST.find((item) => item.id === params.id);
  const ogImage = post?.thumbnail
    ? `/thumbnail/${post.thumbnail}.png`
    : SITE.ogImage;
  return {
    title: post?.title || '글을 찾을 수 없습니다',
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      siteName: SITE.name,
      images: ogImage,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
      description: post?.description,
      images: [ogImage],
    },
  };
}
export default async function Post({params}: PostProps) {
  const post = POST_LIST.find((item) => item.id === params.id);
  if (!post) notFound();
  const markdown = await getPostMd(post.id);
  const headings = getPostHeadings(markdown);
  const posts = [...POST_LIST].sort((a, b) => b.date.localeCompare(a.date));
  const index = posts.findIndex((item) => item.id === post.id);
  const older = posts[index + 1],
    newer = posts[index - 1];
  return (
    <main id="main-content" className="page-container pt-6 md:pt-8">
      <ReadingProgress />
      <div className="blog-grid items-start">
        <div className="min-w-0">
          <article className="min-w-0 lg:rounded-[20px] lg:bg-card lg:p-8">
            <header>
              <Link
                href="/"
                className="mb-6 hidden items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary lg:inline-flex">
                <ArrowLeft className="size-4" aria-hidden="true" />
                목록으로 돌아가기
              </Link>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{post.category}</Badge>
                {post.subCategory && (
                  <Badge variant="outline">#{post.subCategory}</Badge>
                )}
                <span className="ml-auto text-xs text-muted-foreground lg:hidden">
                  {post.date} · {getReadingMinutes(markdown)}분 읽기
                </span>
              </div>
              <h1 className="mt-4 text-[28px] font-bold leading-[1.45] tracking-tight lg:text-[32px]">
                {post.title}
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-muted-foreground lg:text-base">
                {post.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b pb-6">
                <div className="flex items-center gap-3">
                  <AuthorAvatar size={32} className="size-8" />
                  <p className="text-sm">
                    <span className="font-medium">지영</span>
                    <span className="lg:hidden"> (hanatailedtit)</span>
                    <span className="hidden text-muted-foreground lg:inline">
                      {' '}
                      · {post.date} · 약 {getReadingMinutes(markdown)}분 읽기
                    </span>
                  </p>
                </div>
                <div className="hidden lg:block">
                  <CopyButton />
                </div>
              </div>
            </header>
            <TableOfContents headings={headings} mobile />
            <MdPost markdownText={markdown} showPipeline={post.id === '20'} />
          </article>
          <nav
            aria-label="이전 글과 다음 글"
            className="mt-6 grid gap-3 md:grid-cols-2 md:gap-6">
            {[
              {item: older, label: '이전 아티클', Icon: ArrowLeft},
              {item: newer, label: '다음 아티클', Icon: ArrowRight},
            ].map(
              ({item, label, Icon}) =>
                item && (
                  <Card key={label} className="rounded-xl md:rounded-2xl">
                    <Link
                      href={`/post/${item.id}`}
                      className="block rounded-[inherit] p-5 hover:bg-accent md:p-6">
                      <span className="flex items-center gap-2 text-xs font-medium text-accent-foreground">
                        <Icon className="size-3" aria-hidden="true" />
                        {label}
                      </span>
                      <h2 className="mt-3 text-[15px] font-bold leading-6 md:text-base">
                        {item.title}
                      </h2>
                    </Link>
                  </Card>
                ),
            )}
          </nav>
          <Button asChild className="mt-4 h-12 w-full lg:hidden">
            <Link href="/">전체 아티클 목록으로 돌아가기</Link>
          </Button>
        </div>
        <aside
          aria-label="목차와 작성자"
          className="sticky top-[100px] hidden min-w-0 space-y-6 lg:block">
          <TableOfContents headings={headings} />
          <AuthorProfile />
        </aside>
      </div>
    </main>
  );
}
