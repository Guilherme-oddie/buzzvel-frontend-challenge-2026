import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Typography } from '.';

describe('Typography', () => {
  it('keeps the semantic heading level independent from its visual variant', () => {
    render(
      <Typography as="h2" variant="h1">
        Learn at your own pace
      </Typography>,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Learn at your own pace' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });

  it('can render inline text inside a paragraph without nesting paragraphs', () => {
    const { container } = render(
      <p>
        Explore{' '}
        <Typography as="span" variant="overline">
          new skills
        </Typography>
        .
      </p>,
    );

    const inlineText = screen.getByText('new skills');
    const paragraph = container.querySelector('p');

    expect(inlineText.tagName).toBe('SPAN');
    expect(inlineText.parentElement).toBe(paragraph);
    expect(paragraph?.querySelector('p')).toBeNull();
  });

  it('defaults to a paragraph and forwards native attributes and custom classes', () => {
    render(
      <>
        <Typography id="course-copy" aria-describedby="course-help" className="custom-copy">
          Build practical skills
        </Typography>
        <span id="course-help">Choose a course to get started.</span>
      </>,
    );

    const text = screen.getByText('Build practical skills');

    expect(text.tagName).toBe('P');
    expect(text).toHaveAttribute('id', 'course-copy');
    expect(text).toHaveAccessibleDescription('Choose a course to get started.');
    expect(text).toHaveClass('custom-copy');
  });

  it('forwards native event handlers to its rendered element', async () => {
    const user = userEvent.setup();
    const onMouseEnter = vi.fn();

    render(
      <Typography as="span" onMouseEnter={onMouseEnter}>
        Course details
      </Typography>,
    );

    await user.hover(screen.getByText('Course details'));

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });
});
