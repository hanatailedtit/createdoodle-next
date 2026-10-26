import {AppWindow, ArrowRight, Camera, Film, Server} from 'lucide-react';

export default function StreamingPipeline() {
  const steps = [
    {Icon: Camera, title: '카메라', detail: 'RTSP 입력'},
    {Icon: Film, title: 'FFmpeg', detail: '디코딩·변환'},
    {Icon: Server, title: 'C++ 서버', detail: 'WebSocket'},
    {Icon: AppWindow, title: '브라우저', detail: '영상 재생'},
  ];
  return (
    <figure className="my-6 rounded-xl bg-accent p-4 md:p-6">
      <p className="mb-5 font-mono text-xs font-medium text-accent-foreground md:text-[13px]">
        STREAMING PIPELINE
      </p>
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {steps.map(({Icon, title, detail}, index) => (
          <div key={title} className="relative min-w-0">
            <div
              className={`flex h-full flex-col items-center justify-center rounded-lg px-1 py-4 text-center md:py-5 ${index === 2 ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
              <Icon
                className="mb-2 size-5 md:size-6"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="text-[11px] font-bold md:text-sm">{title}</p>
              <p className="mt-1 hidden text-xs md:block">{detail}</p>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight
                className="absolute -right-3 top-1/2 size-3 -translate-y-1/2 text-accent-foreground md:-right-5 md:size-4"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center text-xs leading-6 text-accent-foreground md:text-sm">
        RTSP 수집 → FFmpeg 변환 → WebSocket 전송 → 웹 재생
      </figcaption>
    </figure>
  );
}
