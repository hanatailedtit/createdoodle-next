import CommonHeader from '@/components/header/CommonHeader';
import Footer from '@/components/layout/Footer';
import {SITE} from '@/constants/site.constants';
import type {Metadata} from 'next';
import localFont from 'next/font/local';
import {Suspense} from 'react';
import './globals.css';

const spoqa = localFont({
  src: [
    {path: '../../public/fonts/SpoqaHanSansNeo-Regular.woff2', weight: '400'},
    {path: '../../public/fonts/SpoqaHanSansNeo-Medium.woff2', weight: '500'},
    {path: '../../public/fonts/SpoqaHanSansNeo-Bold.woff2', weight: '700'},
  ],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: [
      {url: SITE.logo, type: 'image/svg+xml'},
      {url: SITE.logoPng, type: 'image/png', sizes: '512x512'},
    ],
    shortcut: SITE.logo,
    apple: [{url: SITE.logoPng, sizes: '512x512', type: 'image/png'}],
  },
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    images: [{url: SITE.ogImage, width: 760, height: 380, alt: SITE.name}],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch{}`,
          }}
        />
      </head>
      <body className={`${spoqa.variable} font-sans`}>
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] rounded-md bg-primary p-3 text-primary-foreground focus:not-sr-only">
          본문으로 건너뛰기
        </a>
        <Suspense fallback={<div className="h-16 bg-background md:h-[76px]" />}>
          <CommonHeader />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
