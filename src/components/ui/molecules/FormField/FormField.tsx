'use client';

import { useId, type ComponentPropsWithRef } from 'react';
import { Typography } from '@/components/ui/atoms/Typography';
import styles from './FormField.module.css';

interface FormFieldContent {
  label: string;
  error?: string;
}

export type FormFieldProps = FormFieldContent &
  (
    | (Omit<ComponentPropsWithRef<'input'>, 'children'> & { as?: 'input' })
    | (Omit<ComponentPropsWithRef<'textarea'>, 'children'> & { as: 'textarea' })
  );

export function FormField({
  as = 'input',
  label,
  error,
  id,
  className,
  'aria-describedby': describedBy,
  'aria-invalid': invalid,
  ...props
}: FormFieldProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const errorId = `${controlId}-error`;
  const controlProps = {
    id: controlId,
    className: [
      'typography-body1',
      styles.control,
      as === 'textarea' ? styles.textarea : styles.input,
      className,
    ]
      .filter(Boolean)
      .join(' '),
    'aria-describedby':
      [describedBy, error ? errorId : undefined].filter(Boolean).join(' ') || undefined,
    'aria-invalid': error ? true : invalid,
  };

  return (
    <div className={styles.field}>
      <label htmlFor={controlId} className="typography-body1 font-bold text-ink">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea {...(props as ComponentPropsWithRef<'textarea'>)} {...controlProps} />
      ) : (
        <input {...(props as ComponentPropsWithRef<'input'>)} {...controlProps} />
      )}
      {error && (
        <Typography id={errorId} role="alert" variant="caption" className="text-error">
          {error}
        </Typography>
      )}
    </div>
  );
}

export default FormField;
