import type { HTMLAttributes, ReactNode } from 'react';
import { Typography } from '@/components/ui/atoms/Typography';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  leading?: ReactNode;
  gap?: 'sm' | 'md';
}

export function Badge({ children, leading, gap = 'md', className, ...props }: BadgeProps) {
  return (
    <div
      {...props}
      className={[
        'inline-flex items-center rounded-xl bg-white px-4 py-3 shadow-[0_4px_24px_0_#0000001a]',
        gap === 'sm' ? 'gap-2' : 'gap-3',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {leading}
      <Typography as="span" className="min-w-0 text-ink">
        {children}
      </Typography>
    </div>
  );
}

export default Badge;
