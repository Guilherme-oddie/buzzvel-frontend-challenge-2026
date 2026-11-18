import type { HTMLAttributes, ReactNode } from 'react';
import { Typography } from '@/components/ui/atoms/Typography';
import styles from './Tag.module.css';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export function Tag({ children, className, ...props }: TagProps) {
  return (
    <Typography
      as="span"
      variant="body1"
      {...props}
      className={[styles.tag, className].filter(Boolean).join(' ')}
    >
      {children}
    </Typography>
  );
}

export default Tag;
