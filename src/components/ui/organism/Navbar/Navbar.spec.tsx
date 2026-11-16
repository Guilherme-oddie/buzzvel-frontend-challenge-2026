import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { navbarMock } from '@/mocks/navigation';
import { Navbar } from '.';

describe('Navbar', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
  });

  afterEach(() => vi.unstubAllGlobals());

  it.each([
    { name: 'default props', props: navbarMock },
    {
      name: 'custom props',
      props: {
        ...navbarMock,
        links: navbarMock.links.slice(0, 2),
        activeHref: navbarMock.links[0].href,
        brandHref: '/home',
        primaryAction: { label: 'Browse courses', href: '/courses' },
        secondaryAction: undefined,
      },
    },
  ])('renders with $name', ({ props }) => {
    const { asFragment } = render(<Navbar {...props} />);
    const snapshot = asFragment();

    // Normalize React's generated ID only in the snapshot copy.
    snapshot.querySelector('[aria-controls]')?.setAttribute('aria-controls', 'mobile-menu');

    expect(snapshot).toMatchSnapshot();
  });

  it('opens and closes the mobile menu with its toggle', async () => {
    const user = userEvent.setup();
    render(<Navbar {...navbarMock} />);
    const toggle = screen.getByRole('button', { name: 'Open menu' });

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toHaveAttribute(
      'id',
      toggle.getAttribute('aria-controls'),
    );

    await user.click(toggle);

    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
  });

  it('closes on Escape and returns focus to the toggle', async () => {
    const user = userEvent.setup();
    render(<Navbar {...navbarMock} />);
    const toggle = screen.getByRole('button', { name: 'Open menu' });

    await user.click(toggle);
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it('reports a selected mobile link and closes the menu', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<Navbar {...navbarMock} onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const navigation = screen.getByRole('navigation', { name: 'Mobile navigation' });
    await user.click(within(navigation).getByRole('link', { name: navbarMock.links[0].label }));

    expect(onNavigate).toHaveBeenCalledExactlyOnceWith(navbarMock.links[0]);
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
  });
});
