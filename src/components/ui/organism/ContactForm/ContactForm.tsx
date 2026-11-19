'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useId, useRef, type ComponentPropsWithoutRef, type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/atoms/Button';
import { Typography } from '@/components/ui/atoms/Typography';
import { FormField } from '@/components/ui/molecules/FormField';
import styles from './ContactForm.module.css';
import { createContactSchema, type ContactValues } from './ContactForm.schema';

export type { ContactValues } from './ContactForm.schema';

export interface ContactFormLabels {
  fullName: string;
  email: string;
  question: string;
  fullNamePlaceholder: string;
  emailPlaceholder: string;
  questionPlaceholder: string;
  submit: string;
  pending: string;
  success: string;
  error: string;
  required: string;
  invalidEmail: string;
}

export interface ContactFormProps extends Omit<
  ComponentPropsWithoutRef<'form'>,
  'children' | 'onSubmit' | 'title'
> {
  onSubmit: (values: ContactValues) => Promise<void>;
  headingAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title?: string;
  description?: string;
  labels?: Partial<ContactFormLabels>;
  defaultValues?: Partial<ContactValues>;
}

const defaultLabels: ContactFormLabels = {
  fullName: 'Full name',
  email: 'Email',
  question: 'Your question',
  fullNamePlaceholder: 'Your name',
  emailPlaceholder: 'youremail@example.com',
  questionPlaceholder: 'Tell us how we can help...',
  submit: 'Send message',
  pending: 'Sending message...',
  success: 'Your message has been submitted.',
  error: 'We could not submit your message. Please try again.',
  required: 'This field is required.',
  invalidEmail: 'Enter a valid email address.',
};

export function ContactForm({
  onSubmit,
  headingAs = 'h3',
  title = 'Contact us',
  description = 'Fill out the fields and we will get in touch.',
  labels: customLabels,
  defaultValues,
  id,
  className,
  ...props
}: ContactFormProps) {
  const generatedId = useId();
  const namespace = id ?? generatedId;
  const titleId = `${namespace}-title`;
  const pendingRef = useRef(false);
  const labels = { ...defaultLabels, ...customLabels };
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactValues>({
    resolver: yupResolver(createContactSchema(labels)),
    defaultValues: { fullName: '', email: '', question: '', ...defaultValues },
  });
  const submitError = errors.root?.submit?.message;
  const feedback = isSubmitting ? '' : (submitError ?? (isSubmitSuccessful ? labels.success : ''));

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    if (pendingRef.current) return;

    pendingRef.current = true;
    clearErrors('root.submit');
    try {
      await handleSubmit(async (values) => {
        try {
          await onSubmit(values);
        } catch {
          setError('root.submit', { type: 'server', message: labels.error });
        }
      })(event);
    } finally {
      pendingRef.current = false;
    }
  }

  return (
    <form
      {...props}
      id={id}
      aria-labelledby={props['aria-labelledby'] ?? (props['aria-label'] ? undefined : titleId)}
      aria-busy={isSubmitting || undefined}
      noValidate
      onSubmit={submitForm}
      className={[styles.form, className].filter(Boolean).join(' ')}
    >
      <div className={styles.header}>
        <Typography id={titleId} as={headingAs} variant="h5" className={styles.title}>
          {title}
        </Typography>
        {description && <Typography className="text-muted">{description}</Typography>}
      </div>
      <fieldset disabled={isSubmitting} className={styles.fields}>
        <FormField
          id={`${namespace}-full-name`}
          {...register('fullName')}
          label={labels.fullName}
          placeholder={labels.fullNamePlaceholder}
          autoComplete="name"
          error={errors.fullName?.message}
          required
        />
        <FormField
          id={`${namespace}-email`}
          {...register('email')}
          type="email"
          label={labels.email}
          placeholder={labels.emailPlaceholder}
          autoComplete="email"
          error={errors.email?.message}
          required
        />
        <FormField
          as="textarea"
          id={`${namespace}-question`}
          {...register('question')}
          label={labels.question}
          placeholder={labels.questionPlaceholder}
          error={errors.question?.message}
          required
        />
      </fieldset>
      <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting || undefined}>
        {isSubmitting ? labels.pending : labels.submit}
      </Button>
      <Typography
        role={submitError ? 'alert' : 'status'}
        aria-live={submitError ? 'assertive' : 'polite'}
        aria-atomic
        className={feedback ? (submitError ? 'text-error' : 'text-ink') : 'sr-only'}
      >
        {feedback}
      </Typography>
    </form>
  );
}

export default ContactForm;
