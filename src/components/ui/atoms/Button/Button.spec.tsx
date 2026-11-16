import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Icon } from '@/components/ui/atoms/Icon';
import { Button } from '.';

describe('Button', () => {
  it('renders with default props', () => {
    const { asFragment } = render(<Button>Explore courses</Button>);

    expect(asFragment()).toMatchSnapshot();
  });

  it.each(['primary', 'secondary', 'accent', 'text', 'icon', 'link', 'link-inverse'] as const)(
    'renders the %s variant',
    (variant) => {
      const { asFragment } = render(
        <Button variant={variant} aria-label={variant === 'icon' ? 'Open menu' : undefined}>
          {variant === 'icon' ? <Icon name="menu" /> : 'Explore courses'}
        </Button>,
      );

      expect(asFragment()).toMatchSnapshot();
    },
  );

  it('renders a compact filled button', () => {
    const { asFragment } = render(<Button size="compact">Start learning</Button>);

    expect(asFragment()).toMatchSnapshot();
  });

  it('forwards native button props and custom classes', () => {
    const { asFragment } = render(
      <Button id="enroll" type="submit" name="intent" value="enroll" className="w-full" disabled>
        Enroll now
      </Button>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a link with native anchor props', () => {
    const ref = createRef<HTMLAnchorElement>();
    const { asFragment } = render(
      <Button ref={ref} variant="link" href="/courses" target="_blank" rel="noreferrer">
        Browse courses
        <Icon name="arrow-right" />
      </Button>,
    );

    expect(asFragment()).toMatchSnapshot();
    expect(ref.current).toBe(screen.getByRole('link', { name: 'Browse courses' }));
  });

  it('invokes its click handler when enabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button ref={ref} onClick={onClick}>
        Explore courses
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Explore courses' });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(ref.current).toBe(button);
  });

  it('does not invoke its click handler when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Explore courses
      </Button>,
    );

    await user.click(screen.getByRole('button', { name: 'Explore courses' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('submits a form only with an explicit submit type', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Button>Preview course</Button>
        <Button type="submit">Enroll now</Button>
      </form>,
    );

    await user.click(screen.getByRole('button', { name: 'Preview course' }));
    expect(onSubmit).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Enroll now' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
