import type { ComponentPropsWithRef } from 'react';

export interface CategoryCardProps extends Omit<
  ComponentPropsWithRef<'a'>,
  'children' | 'title' | 'href'
> {
  numberLabel: string;
  title: string;
  description: string;
  href: string;
  actionLabel?: string;
  headingAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
