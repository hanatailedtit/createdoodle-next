'use client';
import {useEffect, useRef, useState} from 'react';
import {Check, Copy, Share2} from 'lucide-react';
import {Button} from '@/components/ui/button';

export default function CopyButton({
  text,
  share = false,
  iconOnly = false,
  label = 'URL 복사',
}: {
  text?: string;
  share?: boolean;
  iconOnly?: boolean;
  label?: string;
}) {
  const [message, setMessage] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      const nativeShare = share && typeof navigator.share === 'function';
      if (nativeShare)
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      else await navigator.clipboard.writeText(text ?? window.location.href);
      setMessage(nativeShare ? '공유했습니다' : '복사했습니다');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setMessage('복사하지 못했습니다. 브라우저 권한을 확인해 주세요.');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(''), 3000);
  }
  const Icon = message.startsWith('복사했습니다')
    ? Check
    : share
      ? Share2
      : Copy;
  return (
    <span className="inline-flex shrink-0 items-center">
      <Button
        type="button"
        variant="outline"
        size={iconOnly ? 'icon' : 'default'}
        onClick={copy}
        aria-label={iconOnly ? '이 글 공유하기' : undefined}>
        <Icon aria-hidden="true" />
        {!iconOnly &&
          (message.startsWith('복사했습니다') ? '복사 완료' : label)}
      </Button>
      <span className="sr-only" role="status">
        {message}
      </span>
    </span>
  );
}
