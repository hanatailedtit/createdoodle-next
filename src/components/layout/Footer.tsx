import Link from 'next/link';
import {BrandMark} from '@/components/common/BrandLogo';
import {SITE} from '@/constants/site.constants';

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-background py-7 text-xs text-muted-foreground md:mt-20 md:text-sm">
      <div className="page-container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            aria-label={`${SITE.name} 홈`}
            className="inline-flex items-center">
            <BrandMark size={22} className="size-5 md:size-[22px]" />
          </Link>
          <p>
            © {new Date().getFullYear()} {SITE.name}{' '}
            <span className="hidden md:inline">(Createdoodle)</span>
            <span className="md:hidden"> · 지영 (hanatailedtit)</span>
          </p>
        </div>
        <nav aria-label="외부 링크" className="flex items-center gap-5">
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary">
            GitHub
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={SITE.resume}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary">
            이력서
          </a>
          <span aria-hidden="true">·</span>
          <a href="/rss.xml" className="hover:text-primary">
            RSS
          </a>
        </nav>
      </div>
    </footer>
  );
}
