'use client';
import {useEffect, useState} from 'react';
import {ChevronDown} from 'lucide-react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {cn} from '@/utils/class-name.utils';
import type {PostHeading} from '@/utils/markdown.utils';
export default function TableOfContents({
  headings,
  mobile = false,
}: {
  headings: PostHeading[];
  mobile?: boolean;
}) {
  const [active, setActive] = useState(headings[0]?.id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.isIntersecting);
        if (entry) setActive(entry.target.id);
      },
      {rootMargin: '-100px 0px -55% 0px'},
    );
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [headings]);
  if (!headings.length) return null;
  const links = (
    <nav
      aria-label={mobile ? '본문 목차' : '이 글의 목차'}
      className={cn(
        'space-y-1 overflow-y-auto pr-1',
        mobile ? 'max-h-48' : 'max-h-[55vh]',
      )}>
      {headings
        .filter((heading) => !mobile || heading.depth === 2)
        .map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={() => setActive(heading.id)}
            aria-current={active === heading.id ? 'location' : undefined}
            className={cn(
              'block rounded-md border-l-[3px] border-transparent px-3 py-2 text-[13px] leading-6 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
              heading.depth === 3 && 'ml-3 text-[13px]',
              active === heading.id &&
                'border-primary bg-secondary font-bold text-accent-foreground',
            )}>
            {heading.title}
          </a>
        ))}
    </nav>
  );
  if (mobile)
    return (
      <details open className="group my-6 rounded-xl bg-card p-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-accent-foreground">
          이 글의 목차 · {headings.filter((item) => item.depth === 2).length}
          <ChevronDown
            className="size-4 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="mt-3">{links}</div>
      </details>
    );
  return (
    <Card className="rounded-[20px] p-6">
      <div className="mb-4 flex items-center justify-between border-b pb-5">
        <h2 className="text-lg font-bold">이 글의 목차</h2>
        <span className="text-[13px] text-muted-foreground">
          {headings.filter((item) => item.depth === 2).length}개 섹션
        </span>
      </div>
      {links}
      <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-5">
        <Button variant="outline" onClick={() => window.scrollTo({top: 0})}>
          ↑ 맨 위로
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">목록 보기</Link>
        </Button>
      </div>
    </Card>
  );
}
