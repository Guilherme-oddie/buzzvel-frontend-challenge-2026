import type { HTMLAttributes } from 'react';
import { Typography } from '@/components/ui/atoms/Typography';
import styles from './Statistic.module.css';

export interface StatisticProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: string;
  label: string;
}

export function Statistic({ value, label, className, ...props }: StatisticProps) {
  return (
    <div {...props} className={[styles.statistic, className].filter(Boolean).join(' ')}>
      <dt className={styles.label}>
        <Typography as="span" variant="body1" className="block text-secondary-text">
          {label}
        </Typography>
      </dt>
      <dd className={styles.value}>
        <Typography as="span" variant="h1" className="block text-primary">
          {value}
        </Typography>
      </dd>
    </div>
  );
}

export default Statistic;
