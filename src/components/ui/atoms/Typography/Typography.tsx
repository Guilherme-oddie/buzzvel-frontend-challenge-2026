import type { HTMLAttributes, ReactNode } from 'react';

export const typographyVariants = {
  h1: 'typography-h1',
  h2: 'typography-h2',
  h3: 'typography-h3',
  h5: 'typography-h5',
  subtitle1: 'typography-subtitle1',
  subtitle2: 'typography-subtitle2',
  body1: 'typography-body1',
  caption: 'typography-caption',
  overline: 'typography-overline',
} as const;

export type TypographyVariant = keyof typeof typographyVariants;

type TypographyTag = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: TypographyTag;
  variant?: TypographyVariant;
  children: ReactNode;
}

export function Typography({
  as: Component = 'p',
  variant = 'body1',
  className,
  children,
  ...props
}: TypographyProps) {
  const classes = className
    ? `${typographyVariants[variant]} ${className}`
    : typographyVariants[variant];

  return (
    <Component {...props} className={classes}>
      {children}
    </Component>
  );
}

export default Typography;
