import type { HTMLAttributes } from 'react';
import { Icon } from '@/components/ui/atoms/Icon';

export type RatingStarCount = 1 | 2 | 3 | 4 | 5;

export interface RatingStarsProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  count?: RatingStarCount;
}

export function RatingStars({ count = 5, className, ...props }: RatingStarsProps) {
  return (
    <span
      role="img"
      aria-label={`${count} ${count === 1 ? 'star' : 'stars'}`}
      {...props}
      className={['inline-flex shrink-0 gap-0.5 text-accent', className].filter(Boolean).join(' ')}
    >
      {Array.from({ length: count }, (_, index) => (
        <Icon key={index} name="star" />
      ))}
    </span>
  );
}

export default RatingStars;
