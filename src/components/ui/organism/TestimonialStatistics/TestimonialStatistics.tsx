import type { HTMLAttributes } from 'react';
import { Statistic, type StatisticProps } from '@/components/ui/molecules/Statistic';
import { Testimonial, type TestimonialProps } from '@/components/ui/molecules/Testimonial';
import styles from './TestimonialStatistics.module.css';

export interface TestimonialStatisticsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  testimonial: Pick<TestimonialProps, 'quote' | 'author'>;
  statistics: readonly Pick<StatisticProps, 'value' | 'label'>[];
}

export function TestimonialStatistics({
  testimonial,
  statistics,
  className,
  ...props
}: TestimonialStatisticsProps) {
  return (
    <section
      aria-label="Learner testimonial and statistics"
      {...props}
      className={[styles.section, className].filter(Boolean).join(' ')}
    >
      <div className={styles.layout}>
        <Testimonial {...testimonial} className={styles.testimonial} />
        <dl aria-label="Learning community statistics" className={styles.statistics}>
          {statistics.map((statistic, index) => (
            <Statistic
              {...statistic}
              key={`${statistic.label}-${index}`}
              className={styles.statistic}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}

export default TestimonialStatistics;
