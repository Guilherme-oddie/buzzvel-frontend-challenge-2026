import { Icon } from '@/components/ui/atoms/Icon';
import { Typography } from '@/components/ui/atoms/Typography';
import type { CategoryCardProps } from './CategoryCard.types';

export function CategoryCard({
  numberLabel,
  title,
  description,
  href,
  actionLabel = 'Explore',
  headingAs = 'h3',
  className,
  ...props
}: CategoryCardProps) {
  return (
    <a
      {...props}
      href={href}
      className={[
        'group flex min-h-50 min-w-0 cursor-pointer flex-col justify-between rounded-2xl border border-line bg-white p-6 text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary min-[960px]:min-h-65 min-[960px]:p-7',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div>
        <div className="h-[46.5px] pt-0.5">
          <Typography
            as="span"
            variant="overline"
            className="inline-flex items-center rounded-md bg-primary-soft px-2 py-1 text-primary"
          >
            {numberLabel}
          </Typography>
        </div>
        <Typography as={headingAs} variant="h5">
          {title}
        </Typography>
        <Typography className="mt-3 text-secondary-text">{description}</Typography>
      </div>
      <Typography
        as="span"
        className="flex items-center gap-2 pt-6 font-bold group-hover:text-muted group-focus-visible:text-muted motion-safe:transition-colors"
      >
        {actionLabel}
        <Icon name="arrow-right" />
      </Typography>
    </a>
  );
}

export default CategoryCard;
