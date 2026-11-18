import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ContactForm, type ContactValues } from '.';

const values: ContactValues = {
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  question: 'Which course should I choose?',
};

describe('ContactForm', () => {
  it('renders with default content', () => {
    const { asFragment } = render(
      <ContactForm id="contact-default" onSubmit={vi.fn().mockResolvedValue(undefined)} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts custom content, heading, defaults and native props', () => {
    const { asFragment } = render(
      <ContactForm
        id="contact-custom"
        onSubmit={vi.fn().mockResolvedValue(undefined)}
        headingAs="h2"
        title="Ask the team"
        description="We can help you choose a course."
        labels={{ fullName: 'Your full name', submit: 'Ask a question' }}
        defaultValues={{ fullName: 'Ada Lovelace' }}
        aria-label="Course enquiries"
        className="custom-form"
      />,
    );

    expect(screen.getByLabelText('Your full name')).toHaveValue('Ada Lovelace');
    expect(asFragment()).toMatchSnapshot();
  });

  it.each([
    { name: 'empty fields', defaults: {}, field: 'Full name', message: 'This field is required.' },
    {
      name: 'an invalid email',
      defaults: { ...values, email: 'invalid' },
      field: 'Email',
      message: 'Enter a valid email address.',
    },
    {
      name: 'a whitespace-only question',
      defaults: { ...values, question: '   ' },
      field: 'Your question',
      message: 'This field is required.',
    },
  ])('rejects $name and focuses the first invalid field', async ({ defaults, field, message }) => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm onSubmit={onSubmit} defaultValues={defaults} />);

    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));

    const control = screen.getByLabelText(field);
    await waitFor(() => {
      expect(control).toHaveFocus();
      expect(control).toHaveAttribute('aria-invalid', 'true');
      expect(control).toHaveAccessibleDescription(message);
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits trimmed data once while pending and announces success', async () => {
    let resolveSubmission!: () => void;
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmission = resolve;
        }),
    );
    render(
      <ContactForm
        onSubmit={onSubmit}
        defaultValues={{
          fullName: `  ${values.fullName}  `,
          email: values.email,
          question: `  ${values.question}  `,
        }}
        labels={{ success: 'Demo submission complete.' }}
      />,
    );
    const form = screen.getByRole('form', { name: 'Contact us' });
    const submit = screen.getByRole('button', { name: 'Send message' });

    fireEvent.submit(form);
    fireEvent.submit(form);
    await waitFor(() => expect(onSubmit).toHaveBeenCalledExactlyOnceWith(values));
    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledExactlyOnceWith(values);
    expect(form).toHaveAttribute('aria-busy', 'true');
    expect(submit).toBeDisabled();
    expect(submit).toHaveTextContent('Sending message...');
    expect(screen.getByLabelText('Full name')).toBeDisabled();
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByLabelText('Your question')).toBeDisabled();

    await act(async () => resolveSubmission());

    expect(screen.getByRole('status')).toHaveTextContent('Demo submission complete.');
    expect(form).not.toHaveAttribute('aria-busy', 'true');
    expect(submit).toBeEnabled();
  });

  it('keeps entered values after failure and permits a successful retry', async () => {
    const onSubmit = vi
      .fn()
      .mockRejectedValueOnce(new Error('Internal service detail'))
      .mockResolvedValueOnce(undefined);
    render(
      <ContactForm
        onSubmit={onSubmit}
        defaultValues={values}
        labels={{ error: 'Demo failed. Try again.', success: 'Demo submission complete.' }}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Demo failed. Try again.');
    expect(screen.queryByText('Internal service detail')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toHaveValue(values.fullName);
    expect(screen.getByLabelText('Email')).toHaveValue(values.email);
    expect(screen.getByLabelText('Your question')).toHaveValue(values.question);

    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Demo submission complete.');
    });
    expect(onSubmit).toHaveBeenCalledTimes(2);
    expect(onSubmit).toHaveBeenLastCalledWith(values);
  });

  it('uses custom schema messages and revalidates a corrected email', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(
      <ContactForm
        onSubmit={onSubmit}
        defaultValues={{ ...values, email: 'invalid' }}
        labels={{ email: 'Email address', invalidEmail: 'Use a valid email address.' }}
      />,
    );
    const email = screen.getByLabelText('Email address');

    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Use a valid email address.');

    await userEvent.clear(email);
    await userEvent.type(email, values.email);

    await waitFor(() => expect(email).not.toHaveAttribute('aria-invalid', 'true'));
    expect(onSubmit).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledExactlyOnceWith(values));
  });
});
