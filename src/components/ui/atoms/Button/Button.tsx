import type { ComponentPropsWithRef } from 'react';

export type ButtonVariant =
  'primary' | 'secondary' | 'accent' | 'text' | 'icon' | 'link' | 'link-inverse';
export type ButtonSize = 'default' | 'compact';

type ButtonVisualProps = {
  variant?: ButtonVariant;
  /** Applies to the primary, secondary and accent variants. */
  size?: ButtonSize;
  className?: string;
};

export type ButtonProps = ButtonVisualProps &
  (
    | (ComponentPropsWithRef<'button'> & { href?: never })
    | (ComponentPropsWithRef<'a'> & { href: string })
  );

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary font-bold text-white hover:brightness-95',
  secondary: 'border border-line bg-white font-bold text-ink hover:brightness-95',
  accent: 'bg-accent font-bold text-ink hover:brightness-95',
  text: 'p-0 font-normal text-muted hover:text-ink',
  icon: 'h-9 w-9 shrink-0 p-1.5 text-ink hover:bg-line/40',
  link: 'p-0 font-bold text-ink hover:text-muted',
  'link-inverse':
    'h-[50px] px-4 py-3.5 font-bold text-on-primary hover:text-white min-[960px]:h-[52px]',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'px-7 py-3.5',
  compact: 'px-5 py-2.5',
};

export function Button({
  variant = 'primary',
  size = 'default',
  className,
  ...props
}: ButtonProps) {
  const isFilled = variant === 'primary' || variant === 'secondary' || variant === 'accent';
  const classes = [
    'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg typography-body1 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 motion-safe:transition-colors disabled:cursor-not-allowed disabled:opacity-50',
    variantClasses[variant],
    isFilled ? sizeClasses[size] : '',
    variant === 'link-inverse'
      ? 'focus-visible:outline-on-primary'
      : 'focus-visible:outline-primary',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (props.href !== undefined) {
    return <a {...props} className={classes} />;
  }

  return <button type="button" {...props} className={classes} />;
}

export default Button;
