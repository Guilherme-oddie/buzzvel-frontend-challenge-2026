import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { featuredCourseMock } from '@/mocks/featuredCourse';
import { FeaturedCourse } from '.';

describe('FeaturedCourse', () => {
  it('renders the complete fixture', () => {
    const { asFragment } = render(<FeaturedCourse {...featuredCourseMock} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts custom heading semantics, image crop and native props', () => {
    render(
      <FeaturedCourse
        heading={{ title: 'Build better product experiences', headingAs: 'h3' }}
        image={{
          src: '/custom-course.jpg',
          alt: 'A team planning a product together.',
          objectPosition: '25% 50%',
        }}
        id="product-course"
        className="custom-course"
        aria-label="Course preview"
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Build better product experiences', level: 3 }),
    ).toMatchSnapshot();
    expect(
      screen.getByRole('img', { name: 'A team planning a product together.' }),
    ).toMatchSnapshot();
    expect(screen.getByRole('region', { name: 'Course preview' })).toHaveAttribute(
      'id',
      'product-course',
    );
    expect(screen.getByRole('region', { name: 'Course preview' })).toHaveClass('custom-course');
    expect(screen.queryByRole('list', { name: 'Course details' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByText('Featured Course')).not.toBeInTheDocument();
    expect(screen.queryByText(/with Maya Chen/)).not.toBeInTheDocument();
  });

  it('reports the configured action while preserving its destination', async () => {
    const onAction = vi.fn();
    render(<FeaturedCourse {...featuredCourseMock} onAction={onAction} />);
    const action = screen.getByRole('link', { name: featuredCourseMock.actions[0].label });

    await userEvent.click(action);

    expect(action).toHaveAttribute('href', featuredCourseMock.actions[0].href);
    expect(onAction).toHaveBeenCalledExactlyOnceWith(featuredCourseMock.actions[0]);
  });
});
