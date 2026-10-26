'use client';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Button} from '@/components/ui/button';
export type CommonPaginationProps = {
  pagination: number;
  totalCount: number;
  onClickPagination: (page: number) => void;
};
export default function CommonPagination({
  pagination,
  totalCount,
  onClickPagination,
}: CommonPaginationProps) {
  if (totalCount < 2) return null;
  const start = Math.max(0, Math.min(pagination - 2, totalCount - 5));
  const pages = Array.from(
    {length: Math.min(5, totalCount)},
    (_, index) => start + index,
  );
  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2 md:mt-10"
      aria-label="글 목록 페이지">
      <Button
        variant="outline"
        size="icon"
        aria-label="이전 페이지"
        disabled={pagination === 0}
        onClick={() => onClickPagination(pagination - 1)}>
        <ChevronLeft aria-hidden="true" />
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === pagination ? 'default' : 'outline'}
          size="icon"
          aria-label={`${page + 1}페이지`}
          aria-current={page === pagination ? 'page' : undefined}
          onClick={() => onClickPagination(page)}>
          {page + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        aria-label="다음 페이지"
        disabled={pagination >= totalCount - 1}
        onClick={() => onClickPagination(pagination + 1)}>
        <ChevronRight aria-hidden="true" />
      </Button>
    </nav>
  );
}
