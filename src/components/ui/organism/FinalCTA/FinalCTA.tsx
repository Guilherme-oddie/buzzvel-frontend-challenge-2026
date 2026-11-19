import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { Button, type ButtonVariant } from '@/components/ui/atoms/Button';
import { AvatarGroup, type AvatarGroupItem } from '@/components/ui/molecules/AvatarGroup';
import { SectionHeading, type SectionHeadingProps } from '@/components/ui/molecules/SectionHeading';
import type { NavigationItem } from '@/types/navigation';
import styles from './FinalCTA.module.css';

export interface FinalCTAAction extends NavigationItem {
  variant: Extract<ButtonVariant, 'primary' | 'secondary'>;
}

export interface FinalCTAProps extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'title'> {
  heading: Pick<SectionHeadingProps, 'title' | 'description' | 'headingAs'>;
  avatars: readonly AvatarGroupItem[];
  actions?: readonly FinalCTAAction[];
  onAction?: (action: FinalCTAAction) => void;
}

export function FinalCTA({
  heading,
  avatars,
  actions,
  onAction,
  className,
  ...props
}: FinalCTAProps) {
  return (
    <section
      aria-label={heading.title}
      {...props}
      className={[styles.section, className].filter(Boolean).join(' ')}
    >
      <div aria-hidden className={styles.decorations}>
        <span className={styles.outlineCircleTop} />
        <span className={styles.circleBottomLeft} />
        <span className={styles.squareTopRight} />
        <span className={styles.outlineCircleBottom} />
        <span className={styles.squareLeft} />
        <span className={styles.circleBottomRight} />
        <span className={styles.outlineCircleRight} />
        <span className={styles.outlineSquareTop} />
        <Image
          src="/images/final-cta/bold.svg"
          alt=""
          width={102}
          height={102}
          className={styles.bold}
          unoptimized
        />
        <Image
          src="/images/final-cta/codepen.svg"
          alt=""
          width={160}
          height={160}
          className={styles.codepen}
          unoptimized
        />
        <Image
          src="/images/final-cta/chat-bubble.svg"
          alt=""
          width={32}
          height={32}
          className={styles.chatBubble}
          unoptimized
        />
        <Image
          src="/images/final-cta/dashboard.svg"
          alt=""
          width={62}
          height={62}
          className={styles.dashboard}
          unoptimized
        />
        <Image
          src="/images/final-cta/cash.svg"
          alt=""
          width={48}
          height={48}
          className={styles.cash}
          unoptimized
        />
      </div>
      <div className={styles.content}>
        {avatars.length > 0 && (
          <AvatarGroup
            avatars={avatars}
            size={40}
            borderTone="accent"
            borderWidth={2}
            aria-label="Learner portraits"
          />
        )}
        <SectionHeading
          {...heading}
          variant="cta"
          align="center"
          className={avatars.length > 0 ? 'mt-8 w-full' : 'w-full'}
          actions={
            actions?.length
              ? actions.map((action) => (
                  <Button
                    key={action.href}
                    href={action.href}
                    variant={action.variant}
                    className={styles.action}
                    onClick={() => onAction?.(action)}
                  >
                    {action.label}
                  </Button>
                ))
              : undefined
          }
        />
      </div>
    </section>
  );
}

export default FinalCTA;
