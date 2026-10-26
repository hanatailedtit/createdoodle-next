'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {
  ArrowLeft,
  ArrowUpRight,
  Moon,
  PanelRightOpen,
  Search,
  Sun,
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import DefaultSidebar from '@/components/sidebar/DefaultSidebar';
import BrandLogo from '@/components/common/BrandLogo';
import CopyButton from '@/components/common/CopyButton';
import {POST_LIST} from '@/constants/post-list.constants';
import {SITE} from '@/constants/site.constants';
import {getPostPage} from '@/utils/posts.utils';

export default function CommonHeader() {
  const path = usePathname();
  const router = useRouter();
  const isPost = path.startsWith('/post/');
  const post = POST_LIST.find((item) => path === `/post/${item.id}`);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, []);
  const results = getPostPage(
    POST_LIST,
    new URLSearchParams({q: query}),
    '',
  ).posts;
  function toggleTheme() {
    const value = !dark;
    setDark(value);
    document.documentElement.classList.toggle('dark', value);
    try {
      localStorage.setItem('theme', value ? 'dark' : 'light');
    } catch {}
  }
  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="page-container flex h-16 items-center gap-6 md:h-[76px]">
          {isPost && (
            <Button variant="outline" className="px-3 md:hidden" asChild>
              <Link href="/">
                <ArrowLeft aria-hidden="true" />
                목록
              </Link>
            </Button>
          )}
          <Link
            href="/"
            aria-label={`${SITE.name} 홈`}
            className={`flex shrink-0 items-center ${isPost ? 'absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0' : ''}`}>
            <BrandLogo
              priority
              markClassName={isPost ? 'size-7 md:size-9' : 'size-8 md:size-9'}
              className={isPost ? 'gap-2 md:gap-3' : undefined}
            />
          </Link>
          {!isPost ? (
            <nav
              aria-label="주 메뉴"
              className="ml-16 hidden h-full items-center gap-9 lg:flex">
              <Link
                href="/"
                className="relative flex h-full items-center font-bold text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:rounded-full after:bg-primary">
                아티클
              </Link>
            </nav>
          ) : (
            <p className="hidden min-w-0 truncate text-sm text-muted-foreground lg:block">
              / &nbsp;{post?.category}&nbsp; / &nbsp;{post?.title}
            </p>
          )}
          <div className="ml-auto flex items-center gap-3">
            <Button
              variant="ghost"
              className={`size-11 p-0 md:w-52 md:justify-start md:bg-muted md:px-3 ${isPost ? 'hidden md:inline-flex' : ''}`}
              aria-label="글 검색"
              onClick={() => setSearchOpen(true)}>
              <Search aria-hidden="true" />
              <span className="hidden font-normal text-muted-foreground md:inline">
                글과 키워드 검색
              </span>
              <kbd className="ml-auto hidden rounded bg-card px-2 py-1 text-xs text-muted-foreground md:inline">
                ⌘K
              </kbd>
            </Button>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                aria-label="카테고리 열기"
                className={`size-11 shrink-0 p-0 md:w-auto md:px-4 ${isPost ? 'hidden md:inline-flex' : ''}`}>
                <PanelRightOpen aria-hidden="true" />
                <span className="hidden md:inline">카테고리</span>
              </Button>
            </SheetTrigger>
            {isPost ? (
              <CopyButton share iconOnly />
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="hidden lg:inline-flex">
                  <a href={SITE.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={dark ? '밝은 테마로 변경' : '어두운 테마로 변경'}
                  onClick={toggleTheme}
                  className="hidden md:inline-flex">
                  {dark ? (
                    <Moon aria-hidden="true" />
                  ) : (
                    <Sun aria-hidden="true" />
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>글 검색</DialogTitle>
            <DialogDescription>
              제목, 내용 요약, 카테고리로 개발 기록을 찾아보세요.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              router.push(`/?q=${encodeURIComponent(query.trim())}`);
              setSearchOpen(false);
            }}>
            <label htmlFor="post-search" className="sr-only">
              검색어
            </label>
            <Input
              id="post-search"
              type="search"
              placeholder="예: Next.js, C++, RTSP"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
          </form>
          <ul className="max-h-[50dvh] overflow-y-auto" aria-label="검색 결과">
            {results.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/post/${item.id}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex min-h-16 items-center justify-between gap-4 rounded-md p-3 hover:bg-accent">
                  <span>
                    <span className="block text-xs text-accent-foreground">
                      {item.category}
                    </span>
                    <span className="mt-1 block text-sm font-medium">
                      {item.title}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0"
                  />
                </Link>
              </li>
            ))}
          </ul>
          {!results.length && (
            <p
              role="status"
              className="py-8 text-center text-sm text-muted-foreground">
              검색 결과가 없습니다. 다른 검색어를 입력해 주세요.
            </p>
          )}
          <Button
            variant="secondary"
            onClick={() => {
              router.push(`/?q=${encodeURIComponent(query.trim())}`);
              setSearchOpen(false);
            }}>
            전체 검색 결과 보기
          </Button>
        </DialogContent>
      </Dialog>
      <SheetContent
        className="w-[min(100%,400px)] overflow-y-auto p-4"
        aria-describedby={undefined}
        side="right">
        <SheetTitle className="sr-only">카테고리 탐색</SheetTitle>
        <div className="-mt-2 mb-4 flex h-11 items-center pr-12">
          <Link
            href="/"
            aria-label={`${SITE.name} 홈`}
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center">
            <BrandLogo size="sm" />
          </Link>
        </div>
        <DefaultSidebar onNavigate={() => setMenuOpen(false)} />
        <Button variant="outline" className="mt-6 w-full" onClick={toggleTheme}>
          {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          {dark ? '밝은 테마로 변경' : '어두운 테마로 변경'}
        </Button>
      </SheetContent>
    </Sheet>
  );
}
