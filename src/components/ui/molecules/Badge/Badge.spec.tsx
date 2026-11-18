import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon } from '@/components/ui/atoms/Icon';
import { Badge } from '.';

describe('Badge', () => {
  it('renders children with default props', () => {
    const { asFragment } = render(<Badge>Expert-led courses</Badge>);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a leading slot, compact spacing and native props', () => {
    const { asFragment } = render(
      <Badge
        leading={<Icon name="star" />}
        gap="sm"
        id="course-rating"
        aria-label="Average course rating"
        className="max-w-sm"
      >
        <strong>4.9</strong> avg rating
      </Badge>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
