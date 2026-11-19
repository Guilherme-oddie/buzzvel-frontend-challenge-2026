import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { RatingStars, type RatingStarCount } from '@/components/ui/atoms/RatingStars';
import { Typography } from '@/components/ui/atoms/Typography';
import { AvatarGroup, type AvatarGroupItem } from '@/components/ui/molecules/AvatarGroup';
import { Badge } from '@/components/ui/molecules/Badge';
import { SectionHeading, type SectionHeadingProps } from '@/components/ui/molecules/SectionHeading';
import styles from './Hero.module.css';

export interface HeroAction {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'title'> {
  heading: Pick<SectionHeadingProps, 'eyebrow' | 'title' | 'description'>;
  image: { src: string; alt: string };
  actions?: readonly HeroAction[];
  courseBadge?: { value: string; label: string };
  ratingLabel?: string;
  ratingStars?: RatingStarCount;
  socialProof?: {
    avatars: readonly AvatarGroupItem[];
    highlightedText: string;
    text: string;
  };
  onAction?: (action: HeroAction) => void;
}

export function Hero({
  heading,
  image,
  actions,
  courseBadge,
  ratingLabel,
  ratingStars = 5,
  socialProof,
  onAction,
  className,
  ...props
}: HeroProps) {
  return (
    <section
      {...props}
      className={['bg-surface px-5 py-15 min-[960px]:px-20 min-[960px]:py-25', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.layout}>
        <div className={styles.content}>
          <SectionHeading
            {...heading}
            variant="hero"
            headingAs="h1"
            actions={
              actions?.length
                ? actions.map((action) => (
                    <Button
                      key={action.href}
                      href={action.href}
                      variant={action.variant}
                      onClick={() => onAction?.(action)}
                    >
                      {action.label}
                    </Button>
                  ))
                : undefined
            }
          />
          {socialProof && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-8 min-[960px]:justify-start">
              <AvatarGroup avatars={socialProof.avatars} aria-label="Learner portraits" />
              <Typography className="text-muted">
                <strong className="font-bold text-ink">{socialProof.highlightedText}</strong>{' '}
                {socialProof.text}
              </Typography>
            </div>
          )}
        </div>
        <div className={styles.media}>
          <div aria-hidden className={styles.rectangle} />
          <div aria-hidden className={styles.circle} />
          <div className={styles.photo}>
            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={520}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              unoptimized
            />
          </div>
          {courseBadge && (
            <Badge
              className={styles.courseBadge}
              leading={
                <Typography
                  as="span"
                  className="flex h-8 shrink-0 items-center justify-center rounded-lg bg-[#e2e8ff] px-1 font-bold text-primary"
                >
                  {courseBadge.value}
                </Typography>
              }
            >
              {courseBadge.label}
            </Badge>
          )}
          {ratingLabel && (
            <Badge
              gap="sm"
              className={styles.ratingBadge}
              leading={<RatingStars count={ratingStars} aria-hidden />}
            >
              {ratingLabel}
            </Badge>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
