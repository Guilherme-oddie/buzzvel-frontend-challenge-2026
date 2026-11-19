import type { HTMLAttributes } from 'react';
import { Icon, type IconName } from '@/components/ui/atoms/Icon';
import { Typography } from '@/components/ui/atoms/Typography';

export interface ContactInfoCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
}

export function ContactInfoCard({
  icon,
  label,
  value,
  href,
  className,
  ...props
}: ContactInfoCardProps) {
  return (
    <div
      role="group"
      aria-label={label}
      {...props}
      className={[
        'flex min-w-0 items-center gap-4 rounded-xl bg-surface p-4 min-[960px]:p-5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
        <Icon name={icon} />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5 min-[960px]:gap-1">
        <Typography className="text-ink">{label}</Typography>
        <Typography className="wrap-anywhere text-muted">
          {href ? (
            <a
              href={href}
              className="rounded-sm text-primary outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {value}
            </a>
          ) : (
            value
          )}
        </Typography>
      </div>
    </div>
  );
}

export default ContactInfoCard;
