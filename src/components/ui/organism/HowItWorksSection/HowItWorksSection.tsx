import type { HTMLAttributes, ReactNode } from 'react';
import {
  LearningStepCard,
  type LearningStepCardProps,
} from '@/components/ui/molecules/LearningStepCard';
import { SectionHeading, type SectionHeadingProps } from '@/components/ui/molecules/SectionHeading';
import styles from './HowItWorksSection.module.css';

export interface HowItWorksSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  heading: Pick<SectionHeadingProps, 'eyebrow' | 'title' | 'description' | 'headingAs'>;
  steps: readonly LearningStepCardProps[];
  mobileDescriptions?: readonly ReactNode[];
}

export function HowItWorksSection({
  heading,
  steps,
  mobileDescriptions,
  className,
  ...props
}: HowItWorksSectionProps) {
  return (
    <section
      aria-label={heading.title}
      {...props}
      className={[styles.section, className].filter(Boolean).join(' ')}
    >
      <div className={styles.layout}>
        <SectionHeading {...heading} variant="section" align="center" />
        <ol aria-label="Learning steps" className={styles.list}>
          {steps.map((step, index) => {
            const mobileDescription = mobileDescriptions?.[index];
            const description =
              mobileDescription !== undefined && mobileDescription !== step.description ? (
                <>
                  <span className={styles.mobileDescription}>{mobileDescription}</span>
                  <span className={styles.desktopDescription}>{step.description}</span>
                </>
              ) : (
                step.description
              );

            return (
              <li key={`${step.stepLabel}-${index}`} className={styles.item}>
                <LearningStepCard {...step} description={description} />
                {index < steps.length - 1 && (
                  <span
                    aria-hidden
                    className={[
                      styles.connector,
                      index === 0 ? styles.firstConnector : styles.laterConnector,
                    ].join(' ')}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorksSection;
