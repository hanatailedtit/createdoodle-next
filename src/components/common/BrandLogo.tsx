import Image from 'next/image';
import {SITE} from '@/constants/site.constants';
import {cn} from '@/utils/class-name.utils';

export type BrandMarkProps = {
  size?: number;
  alt?: string;
  priority?: boolean;
  className?: string;
};

export function BrandMark({
  size = 32,
  alt = '',
  priority = false,
  className,
}: BrandMarkProps) {
  return (
    <Image
      src={SITE.logo}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      priority={priority}
      aria-hidden={alt ? undefined : true}
      className={cn('shrink-0 select-none object-contain', className)}
    />
  );
}

export type BrandLogoProps = {
  size?: 'sm' | 'md';
  priority?: boolean;
  markClassName?: string;
  textClassName?: string;
  className?: string;
};

export default function BrandLogo({
  size = 'md',
  priority = false,
  markClassName,
  textClassName,
  className,
}: BrandLogoProps) {
  const isSmall = size === 'sm';
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center font-bold',
        isSmall ? 'gap-2' : 'gap-2.5 md:gap-3',
        className,
      )}>
      <BrandMark
        size={isSmall ? 28 : 36}
        priority={priority}
        className={cn(isSmall ? 'size-7' : 'size-8 md:size-9', markClassName)}
      />
      <span
        className={cn(
          'whitespace-nowrap tracking-tight',
          isSmall ? 'text-base' : 'text-lg md:text-[22px]',
          textClassName,
        )}>
        {SITE.name}
      </span>
    </span>
  );
}
