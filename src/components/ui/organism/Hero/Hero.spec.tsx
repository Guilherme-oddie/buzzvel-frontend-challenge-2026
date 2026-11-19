import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { heroMock } from '@/mocks/hero';
import { Hero, type HeroProps } from '.';

describe('Hero', () => {
  it.each([
    { name: 'complete fixture', props: heroMock },
    {
      name: 'custom content with three stars and no actions or social proof',
      props: {
        id: 'team-learning',
        className: 'custom-hero',
        'aria-label': 'Team learning',
        heading: { title: 'Learn with your team' },
        image: { src: '/team.jpg', alt: 'A team learning together.' },
        ratingLabel: 'Course rating',
        ratingStars: 3,
      },
    },
  ] satisfies readonly { name: string; props: HeroProps }[])('renders $name', ({ props }) => {
    const { asFragment } = render(<Hero {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('reports the selected action while preserving its destination', async () => {
    const onAction = vi.fn();
    render(<Hero {...heroMock} onAction={onAction} />);
    const link = screen.getByRole('link', { name: heroMock.actions[0].label });

    await userEvent.click(link);

    expect(link).toHaveAttribute('href', heroMock.actions[0].href);
    expect(onAction).toHaveBeenCalledExactlyOnceWith(heroMock.actions[0]);
  });
});
