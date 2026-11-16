import type { ComponentPropsWithRef, ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'primary' | 'text' | 'icon';

type ButtonVisualProps = {
  variant?: ButtonVariant;
  className?: string;
};

export type ButtonProps = ButtonVisualProps &
  (
    | (ComponentPropsWithRef<'button'> & { href?: never })
    | (ComponentPropsWithoutRef<'a'> & { href: string })
  );

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary px-5 py-2.5 font-bold text-white hover:brightness-95',
  text: 'p-0 font-normal text-muted hover:text-ink',
  icon: 'h-9 w-9 shrink-0 p-1.5 text-ink hover:bg-line/40',
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const classes = `inline-flex items-center justify-center whitespace-nowrap rounded-lg typography-body1 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-safe:transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`;

  if (props.href !== undefined) {
    return <a {...props} className={classes} />;
  }

  return <button type="button" {...props} className={classes} />;
}

export default Button;
