import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AvatarGroup } from '.';

const avatars = [
  { src: '/images/learners/learner-1.jpg', alt: '' },
  { src: '/images/learners/learner-2.jpg', alt: '' },
  { src: '/images/learners/learner-3.jpg', alt: '' },
] as const;

describe('AvatarGroup', () => {
  it('renders with default props', () => {
    const { asFragment } = render(<AvatarGroup avatars={avatars} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders custom avatars and native props', () => {
    const { asFragment } = render(
      <AvatarGroup
        avatars={[{ src: avatars[1].src, alt: 'Featured learner' }]}
        aria-label="Featured learner portraits"
        id="featured-learners"
        className="mt-4"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
