import type { HTMLAttributes, ReactNode } from 'react';
import { Typography } from '@/components/ui/atoms/Typography';

export type SectionHeadingVariant = 'hero' | 'section' | 'featured' | 'people' | 'contact';
export type SectionHeadingAlignment = 'left' | 'center';
export type SectionHeadingTone = 'default' | 'inverse';

export interface SectionHeadingProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'title'
> {
  title: string;
  eyebrow?: string;
  description?: string;
  headingAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: SectionHeadingVariant;
  align?: SectionHeadingAlignment;
  tone?: SectionHeadingTone;
  actions?: ReactNode;
}

const variantStyles = {
  hero: {
    title: 'h1',
    titleSpacing: 'pt-4',
    description: 'subtitle1',
    descriptionSpacing: 'pt-6',
    actionsSpacing: 'pt-8',
  },
  section: {
    title: 'h3',
    titleSpacing: 'pt-4',
    description: 'subtitle1',
    descriptionSpacing: 'pt-4',
    actionsSpacing: 'pt-8',
  },
  featured: {
    title: 'h3',
    titleSpacing: 'pt-4',
    description: 'subtitle2',
    descriptionSpacing: 'pt-5',
    actionsSpacing: 'pt-8',
  },
  people: {
    title: 'h3',
    titleSpacing: 'pt-2',
    description: 'subtitle1',
    descriptionSpacing: 'pt-6 min-[960px]:pt-8',
    actionsSpacing: 'pt-6 min-[960px]:pt-8',
  },
  contact: {
    title: 'h3',
    titleSpacing: 'pt-4',
    description: 'body1',
    descriptionSpacing: 'pt-4',
    actionsSpacing: 'pt-8',
  },
} as const;

export function SectionHeading({
  title,
  eyebrow,
  description,
  headingAs = 'h2',
  variant = 'section',
  align = 'left',
  tone = 'default',
  actions,
  className,
  ...props
}: SectionHeadingProps) {
  const styles = variantStyles[variant];
  const inverse = tone === 'inverse';
  const descriptionColor = inverse
    ? 'text-white'
    : variant === 'people'
      ? 'text-ink min-[960px]:text-muted'
      : 'text-muted';
  const classes = [
    'flex min-w-0 flex-col',
    align === 'center' ? 'items-center text-center' : 'items-start text-left',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div {...props} className={classes}>
      {eyebrow && (
        <Typography variant="overline" className={inverse ? 'text-white' : 'text-primary'}>
          {eyebrow}
        </Typography>
      )}
      <div
        className={`flex w-full ${eyebrow ? styles.titleSpacing : ''} ${align === 'center' ? 'justify-center' : ''}`}
      >
        <Typography
          as={headingAs}
          variant={styles.title}
          className={`w-full ${align === 'center' ? 'max-w-168' : ''} ${inverse ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </Typography>
      </div>
      {description && (
        <div
          className={`flex w-full flex-col ${styles.descriptionSpacing} ${align === 'center' ? 'items-center' : ''}`}
        >
          <Typography
            variant={styles.description}
            className={[
              'w-full',
              variant === 'hero' ? 'max-w-120' : '',
              variant === 'contact' ? 'min-[960px]:typography-subtitle1' : '',
              descriptionColor,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {description}
          </Typography>
        </div>
      )}
      {actions ? (
        <div
          className={[
            'flex max-w-full gap-3',
            variant === 'hero' ? 'w-full flex-col min-[960px]:flex-row' : 'flex-wrap',
            styles.actionsSpacing,
            align === 'center' ? 'justify-center' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export default SectionHeading;
