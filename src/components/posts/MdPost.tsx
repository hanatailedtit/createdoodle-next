import 'katex/dist/katex.min.css';
import {Children, isValidElement, type ReactNode} from 'react';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import CodeBlock from './CodeBlock';
import StreamingPipeline from './StreamingPipeline';
import {headingId} from '@/utils/markdown.utils';
import './MdPost.scss';

export default function MdPost({
  markdownText,
  showPipeline = false,
}: {
  markdownText: string;
  showPipeline?: boolean;
}) {
  return (
    <div className="md-post -mx-4 bg-background px-4 py-6 lg:mx-0 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-8">
      {showPipeline && <StreamingPipeline />}
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          h1({node, children}) {
            return node?.position?.start.line === 1 ? null : (
              <h2 id={headingId(node?.position?.start.line || 0)}>
                {children}
              </h2>
            );
          },
          h2({node, children}) {
            return (
              <h2 id={headingId(node?.position?.start.line || 0)}>
                {children}
              </h2>
            );
          },
          h3({node, children}) {
            return (
              <h3 id={headingId(node?.position?.start.line || 0)}>
                {children}
              </h3>
            );
          },
          img({src, alt, width, height}) {
            if (!src) return null;
            const url = /^https?:\/\//.test(src)
              ? src
              : `/${src.replace(/^\.?\//, '')}`;
            // Markdown images keep their authored dimensions and intrinsic aspect ratio.
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt={alt || ''}
                width={width}
                height={height}
                loading="lazy"
              />
            );
          },
          a({href, children}) {
            const external = /^https?:/.test(href || '');
            return (
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}>
                {children}
              </a>
            );
          },
          pre({children}) {
            const code = Children.toArray(children)[0];
            if (
              !isValidElement<{className?: string; children?: ReactNode}>(code)
            )
              return <pre>{children}</pre>;
            return (
              <CodeBlock
                language={
                  /language-([\w-]+)/.exec(code.props.className || '')?.[1]
                }
                code={String(code.props.children || '').replace(/\n$/, '')}
              />
            );
          },
          table({children}) {
            return (
              <div
                className="my-6 overflow-x-auto rounded-xl border"
                role="region"
                aria-label="본문 표, 좌우로 스크롤"
                tabIndex={0}>
                <table>{children}</table>
              </div>
            );
          },
        }}>
        {markdownText}
      </Markdown>
    </div>
  );
}
