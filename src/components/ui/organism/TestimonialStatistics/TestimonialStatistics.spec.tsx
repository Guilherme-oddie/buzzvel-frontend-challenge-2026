import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { testimonialStatisticsMock } from '@/mocks/testimonial';
import { TestimonialStatistics } from '.';

describe('TestimonialStatistics', () => {
  it('composes the testimonial and the statistic definitions', () => {
    const { asFragment } = render(<TestimonialStatistics {...testimonialStatisticsMock} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts configurable statistics and native props', () => {
    const { asFragment } = render(
      <TestimonialStatistics
        {...testimonialStatisticsMock}
        statistics={[{ value: '12K+', label: 'new learners this month' }]}
        id="community-results"
        aria-label="Community results"
        className="custom-section"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
