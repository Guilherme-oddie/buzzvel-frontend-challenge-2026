import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { statisticsMock } from '@/mocks/testimonial';
import { Statistic, type StatisticProps } from '.';

describe('Statistic', () => {
  it.each([
    { name: 'default props', props: statisticsMock[0] },
    {
      name: 'custom content and native props',
      props: {
        value: '50+',
        label: 'new lessons every month',
        id: 'monthly-lessons',
        className: 'text-center',
        title: 'Monthly course additions',
      },
    },
  ] satisfies readonly { name: string; props: StatisticProps }[])(
    'renders with $name',
    ({ props }) => {
      const { asFragment } = render(
        <dl>
          <Statistic {...props} />
        </dl>,
      );

      expect(asFragment()).toMatchSnapshot();
    },
  );
});
