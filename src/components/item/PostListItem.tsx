import type {PostListItemType} from '@/types/post.types';
import {Braces, Network} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {Card} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
export default function PostListItem({item}: {item: PostListItemType}) {
  const illustration =
    item.id === '18' ? Network : item.id === '14' ? Braces : null;
  const Illustration = illustration;
  return (
    <Card className="rounded-xl md:rounded-2xl">
      <Link
        href={`/post/${item.id}`}
        className="group block min-h-[136px] rounded-[inherit] p-4 transition-colors hover:bg-accent/50 md:min-h-[144px] md:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground md:text-[13px]">
          <Badge variant="secondary">{item.category}</Badge>
          <span>
            {item.date}
            {item.readingMinutes && ` · ${item.readingMinutes}분 읽기`}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-[17px] font-bold leading-[1.5] tracking-tight group-hover:text-accent-foreground md:text-xl">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-muted-foreground md:text-sm">
              {item.description}
            </p>
          </div>
          {Illustration ? (
            <span
              className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-secondary md:h-24 md:w-[108px]"
              aria-hidden="true">
              <Illustration
                className="size-7 text-accent-foreground md:size-10"
                strokeWidth={1.5}
              />
            </span>
          ) : (
            item.thumbnail && (
              <Image
                src={`/thumbnail/${item.thumbnail}.png`}
                alt=""
                width={108}
                height={96}
                sizes="(min-width: 768px) 108px, 64px"
                className="size-16 shrink-0 rounded-xl object-cover md:h-24 md:w-[108px]"
              />
            )
          )}
        </div>
      </Link>
    </Card>
  );
}
