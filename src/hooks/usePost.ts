'use client';
import {CATEGORY_LIST} from '@/constants/category.constants';
import {POST_LIST} from '@/constants/post-list.constants';
import {SITE} from '@/constants/site.constants';
import type {PostListItemType} from '@/types/post.types';
import {getPostPage} from '@/utils/posts.utils';
import {useRouter, useSearchParams} from 'next/navigation';
export function usePost(posts: PostListItemType[] = POST_LIST) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const result = getPostPage(
    posts,
    new URLSearchParams(searchParams.toString()),
    SITE.featuredPostId,
  );
  const navigate = (patch: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.push(params.size ? `/?${params}` : '/');
  };
  return {
    ...result,
    categoryList: CATEGORY_LIST.map((item) => ({
      label: item.name,
      value: item.id,
      count: posts.filter((post) => !item.id || post.categoryId === item.id)
        .length,
    })),
    setCategory: (category: string | null) => navigate({category, page: null}),
    setSort: (sort: string) =>
      navigate({sort: sort === 'latest' ? null : sort, page: null}),
    setPage: (page: number) => navigate({page: page ? String(page) : null}),
    clearFilters: () => router.push('/'),
  };
}
