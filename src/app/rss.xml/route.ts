import {POST_LIST} from '@/constants/post-list.constants';
import {SITE} from '@/constants/site.constants';
const escapeXml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (char) =>
      ({'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;'})[
        char
      ]!,
  );
export function GET() {
  const origin = SITE.url;
  const logoUrl = escapeXml(new URL(SITE.logoPng, origin).href);
  const siteLink = escapeXml(origin);
  const items = [...POST_LIST]
    .reverse()
    .map(
      (post) =>
        `<item><title>${escapeXml(post.title)}</title><link>${escapeXml(new URL(`/post/${post.id}`, origin).href)}</link><guid>${escapeXml(new URL(`/post/${post.id}`, origin).href)}</guid><description>${escapeXml(post.description)}</description><pubDate>${new Date(post.date.replaceAll('.', '-') + 'T00:00:00+09:00').toUTCString()}</pubDate></item>`,
    )
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(SITE.name)}</title><link>${siteLink}</link><description>지영의 개발 기록</description><language>ko</language><image><url>${logoUrl}</url><title>${escapeXml(SITE.name)}</title><link>${siteLink}</link></image>${items}</channel></rss>`,
    {headers: {'Content-Type': 'application/rss+xml; charset=utf-8'}},
  );
}
