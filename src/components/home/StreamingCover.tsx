import {cn} from '@/utils/class-name.utils';
export default function StreamingCover({className}: {className?: string}) {
  return (
    <div
      className={cn(
        'flex h-[156px] items-center justify-center overflow-hidden rounded-xl bg-secondary md:h-[220px]',
        className,
      )}
      aria-hidden="true">
      <svg
        viewBox="0 0 312 180"
        className="h-full w-full text-accent-foreground"
        fill="none">
        <text
          x="20"
          y="27"
          fill="currentColor"
          fontFamily="Menlo,monospace"
          fontSize="13">
          RTSP → WEB
        </text>
        <g stroke="currentColor" strokeOpacity=".3" strokeWidth="1.5">
          <path d="M42 72h64c24 0 30 20 54 20h110" />
          <path d="M42 90h64c24 0 30 20 54 20h110" />
          <path d="M42 108h64c24 0 30 20 54 20h110" />
        </g>
        <g fill="currentColor">
          <rect x="144" y="72" width="9" height="9" rx="2" />
          <rect x="160" y="86" width="9" height="9" rx="2" />
          <rect x="176" y="100" width="9" height="9" rx="2" />
        </g>
        <rect
          x="16"
          y="65"
          width="52"
          height="50"
          rx="10"
          className="fill-card"
        />
        <g stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
          <rect x="31" y="81" width="18" height="16" rx="3" />
          <path d="m49 85 6-4v16l-6-4" />
        </g>
        <rect
          x="244"
          y="65"
          width="52"
          height="50"
          rx="10"
          className="fill-primary"
        />
        <g className="stroke-primary-foreground" strokeWidth="1.7">
          <rect x="258" y="78" width="25" height="23" rx="3" />
          <path d="M258 85h25m-20-3h1m3 0h1" />
        </g>
        <text
          x="20"
          y="160"
          fill="currentColor"
          fontFamily="Menlo,monospace"
          fontSize="13">
          C++ / FFmpeg / WebSocket
        </text>
      </svg>
    </div>
  );
}
