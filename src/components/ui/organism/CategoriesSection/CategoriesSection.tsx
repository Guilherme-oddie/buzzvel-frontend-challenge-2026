import type { HTMLAttributes } from 'react';
import { CategoryCard } from '@/components/ui/molecules/CategoryCard';
import type { CategoryCardProps } from '@/components/ui/molecules/CategoryCard/CategoryCard.types';
import { SectionHeading, type SectionHeadingProps } from '@/components/ui/molecules/SectionHeading';
import styles from './CategoriesSection.module.css';

export interface CategoriesSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  heading: Pick<SectionHeadingProps, 'eyebrow' | 'title' | 'description' | 'headingAs'>;
  items: readonly CategoryCardProps[];
}

export function CategoriesSection({ heading, items, className, ...props }: CategoriesSectionProps) {
  return (
    <section
      aria-label={heading.title}
      {...props}
      className={[styles.section, className].filter(Boolean).join(' ')}
    >
      <div className={styles.layout}>
        <SectionHeading {...heading} variant="section" className={styles.heading} />
        <div className={styles.grid}>
          {items.map((item, index) => (
            <CategoryCard {...item} key={`${item.numberLabel}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
