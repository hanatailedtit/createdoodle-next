'use client';
import {useEffect, useState} from 'react';
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(
          height > 0
            ? Math.min(100, Math.max(0, (window.scrollY / height) * 100))
            : 0,
        );
      });
    };
    update();
    window.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return (
    <div
      className="fixed inset-x-0 top-[61px] z-50 h-[3px] md:top-[73px]"
      aria-hidden="true">
      <div
        id="reading-progress"
        className="h-full bg-primary"
        style={{width: `${progress}%`}}
      />
    </div>
  );
}
