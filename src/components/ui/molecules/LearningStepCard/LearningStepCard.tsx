import type { HTMLAttributes, ReactNode } from 'react';
import { Typography } from '@/components/ui/atoms/Typography';
import styles from './LearningStepCard.module.css';

export type LearningStepCardVariant = 'blue' | 'coral' | 'yellow';

export interface LearningStepCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'title'
> {
  variant?: LearningStepCardVariant;
  stepLabel: string;
  title: string;
  description: ReactNode;
  headingAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function LearningStepCard({
  variant = 'blue',
  stepLabel,
  title,
  description,
  headingAs = 'h3',
  className,
  ...props
}: LearningStepCardProps) {
  return (
    <div
      {...props}
      className={['flex min-w-0 flex-col items-start', className].filter(Boolean).join(' ')}
    >
      <div aria-hidden className={`${styles.marker} ${styles[variant]}`} />
      <Typography variant="overline" className="mt-6 text-muted">
        {stepLabel}
      </Typography>
      <Typography as={headingAs} variant="h5" className="mt-[9px] text-ink">
        {title}
      </Typography>
      <Typography variant="subtitle2" className="mt-3.5 text-muted min-[960px]:mt-[13px]">
        {description}
      </Typography>
    </div>
  );
}

export default LearningStepCard;
