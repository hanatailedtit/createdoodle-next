import type {PostListItemType} from '@/types/post.types';
import PostListItem from '../item/PostListItem';
export default function PostList({list}: {list: PostListItemType[]}) {
  return (
    <div className="flex w-full flex-col gap-3 md:gap-4">
      {list.map((item) => (
        <PostListItem item={item} key={item.id} />
      ))}
    </div>
  );
}
