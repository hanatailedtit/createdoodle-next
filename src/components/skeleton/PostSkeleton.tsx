import {CommonSkeleton} from '@/components/common';

export default function PostSkeleton() {
  return (
    <div className="flex flex-col gap-y-[16px] sm:gap-y-[32px] bg-white rounded-2xl p-[24px] sm:p-16 w-full lg:max-w-[1000px]">
      <CommonSkeleton className="h-[50px]" />
      <CommonSkeleton className="h-[50px] w-4/5" />
      <CommonSkeleton className="h-[30px] w-4/5" />
      <CommonSkeleton className="h-[30px] w-3/5" />
      <CommonSkeleton className="h-[30px] w-2/5" />
      <CommonSkeleton className="h-[30px] w-4/5" />
      <CommonSkeleton className="h-[30px] w-3/5" />
      <CommonSkeleton className="h-[30px] w-2/5" />
      <CommonSkeleton className="h-[30px] w-3/5" />
      <CommonSkeleton className="h-[30px] w-4/5" />
      <CommonSkeleton className="h-[30px] w-3/5" />
      <CommonSkeleton className="h-[30px] w-2/5" />
      <CommonSkeleton className="h-[30px] w-3/5" />
      <CommonSkeleton className="h-[30px] w-3/5" />
      <CommonSkeleton className="h-[30px] w-2/5" />
      <CommonSkeleton className="h-[30px] w-3/5" />
      <CommonSkeleton className="h-[30px] w-3/5" />
      <CommonSkeleton className="h-[30px] w-2/5" />
      <CommonSkeleton className="h-[30px] w-3/5" />
      <CommonSkeleton className="h-[30px] w-2/5" />
    </div>
  );
}
