import { createRef } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { categoriesMock } from '@/mocks/categories';
import { CategoryCard, type CategoryCardProps } from '.';

describe('CategoryCard', () => {
  it.each([
    { name: 'default props', props: { ...categoriesMock[0], actionLabel: undefined } },
    {
      name: 'custom content, heading and native props',
      props: {
        numberLabel: '05',
        title: 'Writing',
        description: 'Build a clear writing practice.',
        href: '#writing',
        actionLabel: 'View courses',
        headingAs: 'h2',
        id: 'writing-category',
        className: 'max-w-sm',
        'aria-label': 'Explore writing courses',
      },
    },
  ] satisfies readonly { name: string; props: CategoryCardProps }[])(
    'renders with $name',
    ({ props }) => {
      const { asFragment } = render(<CategoryCard {...props} />);

      expect(asFragment()).toMatchSnapshot();
    },
  );

  it('forwards its ref to the single link', () => {
    const ref = createRef<HTMLAnchorElement>();
    const { getByRole } = render(<CategoryCard {...categoriesMock[0]} ref={ref} />);

    expect(ref.current).toBe(getByRole('link'));
  });
});
