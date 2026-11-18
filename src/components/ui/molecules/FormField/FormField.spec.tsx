import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormField } from '.';

describe('FormField', () => {
  it('renders an input with its label and native props', () => {
    const { asFragment } = render(
      <FormField
        id="full-name"
        label="Full name"
        name="fullName"
        placeholder="Your name"
        autoComplete="name"
        required
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a textarea and preserves description associations when invalid', () => {
    const { asFragment } = render(
      <FormField
        as="textarea"
        id="question"
        label="Your question"
        error="Add your question."
        aria-describedby="question-help"
        className="custom-control"
        rows={4}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('creates distinct control IDs for repeated labels', () => {
    render(
      <>
        <FormField label="Email" />
        <FormField label="Email" />
      </>,
    );
    const controls = screen.getAllByLabelText('Email');

    expect(controls[0].id).not.toBe('');
    expect(controls[0].id).not.toBe(controls[1].id);
  });
});
