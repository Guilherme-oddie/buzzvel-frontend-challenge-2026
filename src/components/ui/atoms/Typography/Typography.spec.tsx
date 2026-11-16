import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { typographySamples } from '@/mocks/typography';
import { Typography } from '.';

describe('Typography', () => {
  it('renders with default props', () => {
    const { asFragment } = render(<Typography>Build practical skills</Typography>);

    expect(asFragment()).toMatchSnapshot();
  });

  it.each(typographySamples)('renders the $variant variant', ({ variant, text }) => {
    const { asFragment } = render(<Typography variant={variant}>{text}</Typography>);

    expect(asFragment()).toMatchSnapshot();
  });

  it.each(['h2', 'span'] as const)('renders as %s with native props', (as) => {
    const { asFragment } = render(
      <Typography
        as={as}
        variant="h1"
        id="course-title"
        aria-label="Course title"
        className="text-primary"
      >
        Learn at your own pace
      </Typography>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
