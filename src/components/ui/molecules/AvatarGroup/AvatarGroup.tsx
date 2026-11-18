import Image from 'next/image';
import type { HTMLAttributes } from 'react';

export interface AvatarGroupItem {
  src: string;
  alt: string;
}

export interface AvatarGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  avatars: readonly AvatarGroupItem[];
}

export function AvatarGroup({ avatars, className, ...props }: AvatarGroupProps) {
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
          width={32}
          height={32}
          className="box-border h-8 w-8 shrink-0 rounded-full border border-surface object-cover"
          unoptimized
        />
      ))}
    </div>
  );
}

export default AvatarGroup;
