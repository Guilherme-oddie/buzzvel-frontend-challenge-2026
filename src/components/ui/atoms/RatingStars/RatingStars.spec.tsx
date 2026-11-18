import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RatingStars } from '.';

describe('RatingStars', () => {
  it.each([1, 2, 3, 4, 5] as const)('renders %i stars', (count) => {
    const { asFragment } = render(<RatingStars count={count} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the default count and native props', () => {
    const { asFragment } = render(
      <RatingStars id="course-stars" className="text-primary" aria-label="Course rating" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
