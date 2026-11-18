import type { HTMLAttributes } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { ImageCollage, type ImageCollagePhotos } from '@/components/ui/molecules/ImageCollage';
import { SectionHeading, type SectionHeadingProps } from '@/components/ui/molecules/SectionHeading';
import styles from './PeopleSection.module.css';

export interface PeopleSectionAction {
  label: string;
  href: string;
}

export interface PeopleSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'title'
> {
  heading: Pick<SectionHeadingProps, 'eyebrow' | 'title' | 'description' | 'headingAs'>;
  photos: ImageCollagePhotos;
  action?: PeopleSectionAction;
  onAction?: (action: PeopleSectionAction) => void;
}

export function PeopleSection({
  heading,
  photos,
  action,
  onAction,
  className,
  ...props
}: PeopleSectionProps) {
  return (
    <section
      aria-label={heading.title}
      {...props}
      className={['bg-surface px-5 py-15 min-[960px]:px-20 min-[960px]:py-25', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.layout}>
        <SectionHeading
          {...heading}
          variant="people"
          className={styles.content}
          actions={
            action ? (
              <Button href={action.href} variant="secondary" onClick={() => onAction?.(action)}>
                {action.label}
              </Button>
            ) : undefined
          }
        />
        <ImageCollage
          photos={photos}
          aria-label="Students and teachers"
          className={styles.collage}
        />
      </div>
    </section>
  );
}

export default PeopleSection;
