import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { pageMock } from '@/mocks/page';
import { CategoriesSection } from '.';

describe('CategoriesSection', () => {
  it('renders the complete fixture', () => {
    const { asFragment } = render(<CategoriesSection {...pageMock.categories} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts custom content, heading semantics and native section and card props', () => {
    const { asFragment } = render(
      <CategoriesSection
        heading={{ title: 'Choose a creative skill', headingAs: 'h3' }}
        items={[
          {
            ...pageMock.categories.items[0],
            headingAs: 'h4',
            href: '#design-courses',
            id: 'design-category',
          },
        ]}
        id="course-categories"
        aria-label="Course categories"
        className="custom-section"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
