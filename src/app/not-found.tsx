import Link from 'next/link';
import {BrandMark} from '@/components/common/BrandLogo';
import {Button} from '@/components/ui/button';
export default function NotFound() {
  return (
    <main
      id="main-content"
      className="page-container flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
      <BrandMark size={64} className="size-16" />
      <p className="font-mono text-sm text-accent-foreground">404</p>
      <h1 className="text-2xl font-bold">글을 찾을 수 없습니다.</h1>
      <p className="text-muted-foreground">
        주소를 확인하거나 전체 개발 기록을 둘러보세요.
      </p>
      <Button asChild>
        <Link href="/">전체 글 보기</Link>
      </Button>
    </main>
  );
}
