'use client';
import AuthorProfile from '@/components/common/AuthorProfile';
import {Card} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {KEYWORDS} from '@/constants/site.constants';
import {usePost} from '@/hooks/usePost';
import Link from 'next/link';
import {cn} from '@/utils/class-name.utils';

export default function DefaultSidebar({
  onNavigate,
  showProfile = true,
}: {
  onNavigate?: () => void;
  showProfile?: boolean;
}) {
  const {categoryList, categoryId, setCategory} = usePost();
  return (
    <div className="space-y-6">
      {showProfile && <AuthorProfile />}
      <Card className="rounded-[20px] p-4 md:p-6" id="categories">
        <div className="flex items-center justify-between border-b pb-5">
          <h2 className="text-xl font-bold">카테고리</h2>
          <span className="text-[13px] text-muted-foreground">
            {categoryList.length - 1}개 주제
          </span>
        </div>
        <nav className="mt-3 space-y-1" aria-label="글 카테고리">
          {categoryList.map((item) => (
            <Button
              key={item.value || 'all'}
              variant="ghost"
              className={cn(
                'h-11 w-full justify-between px-3 text-sm font-normal',
                categoryId === item.value &&
                  'bg-secondary font-bold text-accent-foreground',
              )}
              aria-current={categoryId === item.value ? 'page' : undefined}
              onClick={() => {
                setCategory(item.value);
                onNavigate?.();
              }}>
              {item.value ? item.label : '전체 글 보기'}
              <span
                className={cn(
                  'flex h-6 min-w-8 items-center justify-center rounded-full bg-muted px-2 text-xs',
                  categoryId === item.value &&
                    'bg-primary text-primary-foreground',
                )}>
                {item.count}
              </span>
            </Button>
          ))}
        </nav>
      </Card>
      <Card className="rounded-[20px] p-6">
        <h2 className="text-lg font-bold">자주 찾는 키워드</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {KEYWORDS.map((word) => (
            <Button
              key={word}
              variant="secondary"
              size="sm"
              className="bg-muted font-normal text-foreground"
              asChild>
              <Link
                href={`/?q=${encodeURIComponent(word)}`}
                onClick={onNavigate}>
                #{word}
              </Link>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
