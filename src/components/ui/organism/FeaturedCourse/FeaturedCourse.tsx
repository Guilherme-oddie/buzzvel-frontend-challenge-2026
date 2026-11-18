import Image from 'next/image';
import type { CSSProperties, HTMLAttributes } from 'react';
import { Button, type ButtonVariant } from '@/components/ui/atoms/Button';
import { Icon } from '@/components/ui/atoms/Icon';
import { Tag } from '@/components/ui/atoms/Tag';
import { Typography } from '@/components/ui/atoms/Typography';
import { SectionHeading, type SectionHeadingProps } from '@/components/ui/molecules/SectionHeading';
import type { NavigationItem } from '@/types/navigation';
import styles from './FeaturedCourse.module.css';

export interface FeaturedCourseImage {
  src: string;
  alt: string;
  objectPosition?: CSSProperties['objectPosition'];
}

export interface FeaturedCourseInstructor {
  name: string;
  role?: string;
}

export interface FeaturedCourseAction extends NavigationItem {
  variant: Extract<ButtonVariant, 'accent' | 'link-inverse'>;
}

export interface FeaturedCourseProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'title'
> {
  heading: Pick<SectionHeadingProps, 'eyebrow' | 'title' | 'description' | 'headingAs'>;
  image: FeaturedCourseImage;
  featuredLabel?: string;
  instructor?: FeaturedCourseInstructor;
  metadata?: readonly string[];
  actions?: readonly FeaturedCourseAction[];
  onAction?: (action: FeaturedCourseAction) => void;
}

export function FeaturedCourse({
  heading,
  image,
  featuredLabel,
  instructor,
  metadata,
  actions,
  onAction,
  className,
  ...props
}: FeaturedCourseProps) {
  return (
    <section
      aria-label={heading.title}
      {...props}
      className={[styles.section, className].filter(Boolean).join(' ')}
    >
      <div className={styles.layout}>
        <div className={styles.media}>
          <div className={styles.photo}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              unoptimized
              sizes="(min-width: 1280px) 530px, (min-width: 960px) calc((100vw - 220px) / 2), (min-width: 570px) 530px, calc(100vw - 40px)"
              className={styles.image}
              style={{ objectPosition: image.objectPosition }}
            />
          </div>
          {featuredLabel && (
            <Typography as="span" variant="overline" className={styles.featuredLabel}>
              {featuredLabel}
            </Typography>
          )}
        </div>
        <div className={styles.content}>
          <SectionHeading {...heading} variant="featured" tone="inverse" />
          {instructor && (
            <Typography variant="subtitle2" className="mt-6 text-white">
              with {instructor.name}
              {instructor.role ? ` · ${instructor.role}` : ''}
            </Typography>
          )}
          {metadata?.length ? (
            <ul aria-label="Course details" className={styles.metadata}>
              {metadata.map((detail, index) => (
                <li className={styles.metadataItem} key={`${detail}-${index}`}>
                  <Tag>{detail}</Tag>
                </li>
              ))}
            </ul>
          ) : null}
          {actions?.length ? (
            <div className={styles.actions}>
              {actions.map((action) => (
                <Button
                  key={action.href}
                  href={action.href}
                  variant={action.variant}
                  className={[
                    styles.action,
                    action.variant === 'link-inverse' ? styles.browseAction : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => onAction?.(action)}
                >
                  {action.label}
                  {action.variant === 'link-inverse' && <Icon name="arrow-right-light" />}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCourse;
