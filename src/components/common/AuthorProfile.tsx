import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {SITE} from '@/constants/site.constants';
import {cn} from '@/utils/class-name.utils';

export function AuthorAvatar({
  size = 56,
  priority = true,
  className,
}: {
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={SITE.avatar}
      alt=""
      width={size}
      height={size}
      sizes="56px"
      priority={priority}
      aria-hidden="true"
      className={cn(
        'size-12 shrink-0 rounded-full border border-border bg-secondary object-cover',
        className,
      )}
    />
  );
}
export default function AuthorProfile({compact = false}: {compact?: boolean}) {
  return (
    <Card className={cn('rounded-[20px] p-6', compact && 'rounded-2xl p-4')}>
      <div className="flex items-center gap-3">
        <AuthorAvatar
          size={compact ? 44 : 56}
          className={compact ? 'size-11' : 'size-14'}
        />
        <div className="min-w-0">
          <h2 className="text-lg font-bold">
            {compact ? '지영의 개발 기록' : '지영 (hanatailedtit)'}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground md:text-sm">
            {compact ? '웹 · C++ · 서버 기술 아카이브' : 'Software Engineer'}
          </p>
        </div>
      </div>
      {!compact && (
        <p className="mt-6 text-[15px] leading-7 text-muted-foreground">
          웹과 시스템 프로그래밍 사이에서
          <br />
          배운 것을 더 읽기 쉬운 설명으로 남깁니다.
        </p>
      )}
      <div className={cn('mt-6 grid grid-cols-2 gap-3', compact && 'mt-4')}>
        <Button variant="outline" asChild>
          <a href={SITE.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={SITE.resume} target="_blank" rel="noreferrer">
            이력서 <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
      </div>
    </Card>
  );
}
