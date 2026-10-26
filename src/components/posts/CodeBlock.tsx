import SyntaxHighlighter from 'react-syntax-highlighter';
import {a11yDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CopyButton from '@/components/common/CopyButton';
export default function CodeBlock({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  return (
    <div className="my-6 overflow-hidden rounded-xl bg-code-surface text-code-foreground">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-2">
        <span className="font-mono text-xs">{language || 'text'}</span>
        <div className="[&_button]:h-8 [&_button]:border-white/20 [&_button]:bg-transparent [&_button]:px-3 [&_button]:text-xs [&_button]:text-code-foreground [&_button]:hover:bg-white/10">
          <CopyButton text={code} label="복사" />
        </div>
      </div>
      <SyntaxHighlighter
        style={a11yDark}
        language={language || 'text'}
        customStyle={{
          margin: 0,
          padding: '20px 16px',
          background: 'transparent',
          fontSize: '13px',
          lineHeight: 1.9,
        }}
        codeTagProps={{style: {fontFamily: 'Menlo, Consolas, monospace'}}}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
