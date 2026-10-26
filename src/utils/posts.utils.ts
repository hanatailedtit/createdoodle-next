import type {PostListItemType} from '@/types/post.types';

export function getPostPage(
  posts: PostListItemType[],
  params: URLSearchParams,
  featuredId = '20',
) {
  const category = params.get('category');
  const categoryId = posts.some((post) => post.categoryId === category)
    ? category
    : null;
  const query = (params.get('q') || '').trim();
  const sort = params.get('sort') === 'oldest' ? 'oldest' : 'latest';
  const featured =
    !categoryId && !query
      ? posts.find((post) => post.id === featuredId)
      : undefined;
  const filtered = posts
    .filter(
      (post) =>
        (!categoryId || post.categoryId === categoryId) &&
        `${post.title} ${post.description} ${post.category} ${post.subCategory || ''}`
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()),
    )
    .sort((a, b) =>
      sort === 'oldest'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date),
    );
  const list = filtered.filter((post) => post.id !== featured?.id);
  const totalPages = Math.ceil(list.length / 5);
  const requestedPage = Number(params.get('page') || 0);
  const page = Number.isFinite(requestedPage)
    ? Math.max(
        0,
        Math.min(Math.floor(requestedPage), Math.max(0, totalPages - 1)),
      )
    : 0;
  return {
    categoryId,
    query,
    sort,
    featured,
    page,
    totalPages,
    total: filtered.length,
    posts: list.slice(page * 5, page * 5 + 5),
  };
}
export function getReadingMinutes(markdown: string) {
  return Math.max(
    1,
    Math.ceil(markdown.replace(/<[^>]*>|[#*`|]/g, '').length / 500),
  );
}
