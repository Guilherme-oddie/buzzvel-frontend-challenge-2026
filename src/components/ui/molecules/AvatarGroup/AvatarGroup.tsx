import Image from 'next/image';
import type { HTMLAttributes } from 'react';

export interface AvatarGroupItem {
  src: string;
  alt: string;
}

export type AvatarGroupSize = 32 | 40;
export type AvatarGroupBorderTone = 'surface' | 'accent';
export type AvatarGroupBorderWidth = 1 | 2;

export interface AvatarGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  avatars: readonly AvatarGroupItem[];
  size?: AvatarGroupSize;
  borderTone?: AvatarGroupBorderTone;
  borderWidth?: AvatarGroupBorderWidth;
}

export function AvatarGroup({
  avatars,
  size = 32,
  borderTone = 'surface',
  borderWidth = 1,
  className,
  ...props
}: AvatarGroupProps) {
  const classes = [
    'inline-flex shrink-0 items-center -space-x-2 [&>img:nth-child(2)]:relative [&>img:nth-child(2)]:z-10',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div role="group" {...props} className={classes}>
      {avatars.map((avatar, index) => (
        <Image
          key={`${avatar.src}-${index}`}
          src={avatar.src}
          alt={avatar.alt}
          width={size}
          height={size}
          className={[
            'box-border',
            size === 40 ? 'h-10 w-10' : 'h-8 w-8',
            'shrink-0 rounded-full',
            borderWidth === 2 ? 'border-2' : 'border',
            borderTone === 'accent' ? 'border-accent' : 'border-surface',
            'object-cover',
          ].join(' ')}
          unoptimized
        />
      ))}
    </div>
  );
}

export default AvatarGroup;
