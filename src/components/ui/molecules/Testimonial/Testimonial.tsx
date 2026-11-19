import Image from 'next/image';
import type { CSSProperties, HTMLAttributes } from 'react';
import { Icon } from '@/components/ui/atoms/Icon';
import { Typography } from '@/components/ui/atoms/Typography';
import styles from './Testimonial.module.css';

export interface TestimonialAuthor {
  name: string;
  role?: string;
  image?: {
    src: string;
    alt: string;
    objectPosition?: CSSProperties['objectPosition'];
  };
}

export interface TestimonialProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  quote: string;
  author: TestimonialAuthor;
}

export function Testimonial({ quote, author, className, ...props }: TestimonialProps) {
  return (
    <figure {...props} className={[styles.testimonial, className].filter(Boolean).join(' ')}>
      <div aria-hidden className={styles.quoteMark}>
        <Icon name="quote" />
      </div>
      <blockquote className={styles.quotation}>
        <Typography variant="quotes" className="wrap-anywhere">
          {quote}
        </Typography>
      </blockquote>
      <figcaption className={styles.author}>
        {author.image && (
          <Image
            src={author.image.src}
            alt={author.image.alt}
            width={48}
            height={48}
            unoptimized
            className={styles.portrait}
            style={{ objectPosition: author.image.objectPosition }}
          />
        )}
        <div className="min-w-0 wrap-anywhere">
          <Typography
            variant="subtitle1"
            className={`${styles.authorName} min-[960px]:typography-subtitle2`}
          >
            {author.name}
          </Typography>
          {author.role && <Typography className="text-muted">{author.role}</Typography>}
        </div>
      </figcaption>
    </figure>
  );
}

export default Testimonial;
