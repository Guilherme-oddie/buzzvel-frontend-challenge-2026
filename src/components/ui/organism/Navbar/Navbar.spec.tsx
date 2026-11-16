import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { navbarMock } from '@/mocks/navigation';
import { Navbar } from '.';

function createDesktopMediaQuery() {
  return Object.assign(new EventTarget(), {
    matches: false,
    media: '(min-width: 960px)',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }) satisfies MediaQueryList;
}

describe('Navbar', () => {
  let desktopMediaQuery: ReturnType<typeof createDesktopMediaQuery>;

  beforeEach(() => {
    desktopMediaQuery = createDesktopMediaQuery();
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => desktopMediaQuery),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the supplied navigation and actions with the mobile menu closed', () => {
    render(<Navbar {...navbarMock} />);

    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });

    for (const link of navbarMock.links) {
      expect(within(navigation).getByRole('link', { name: link.label })).toHaveAttribute(
        'href',
        link.href,
      );
    }

    expect(screen.getByRole('link', { name: navbarMock.primaryAction.label })).toHaveAttribute(
      'href',
      navbarMock.primaryAction.href,
    );
    expect(screen.getByRole('link', { name: 'Log in' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
  });

  it('supports omitting the secondary action', () => {
    render(<Navbar {...navbarMock} secondaryAction={undefined} />);

    expect(screen.queryByRole('link', { name: 'Log in' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: navbarMock.primaryAction.label })).toBeInTheDocument();
  });

  it('opens and closes the mobile menu with its toggle', async () => {
    const user = userEvent.setup();
    render(<Navbar {...navbarMock} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    const toggle = screen.getByRole('button', { name: 'Close menu' });
    const navigation = screen.getByRole('navigation', { name: 'Mobile navigation' });

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(navigation).toHaveAttribute('id', toggle.getAttribute('aria-controls'));

    await user.click(toggle);

    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
  });

  it('closes on Escape and returns focus to the menu toggle', async () => {
    const user = userEvent.setup();
    render(<Navbar {...navbarMock} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
  });

  it('closes after choosing a mobile link and reports the selected item', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<Navbar {...navbarMock} onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    const navigation = screen.getByRole('navigation', { name: 'Mobile navigation' });
    const selectedItem = navbarMock.links[0];
    await user.click(within(navigation).getByRole('link', { name: selectedItem.label }));

    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(onNavigate).toHaveBeenCalledWith(selectedItem);
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('reports desktop navigation without opening the mobile menu', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<Navbar {...navbarMock} onNavigate={onNavigate} />);

    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
    const selectedItem = navbarMock.links[1];
    await user.click(within(navigation).getByRole('link', { name: selectedItem.label }));

    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(onNavigate).toHaveBeenCalledWith(selectedItem);
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
  });

  it('closes the mobile menu when the user clicks outside the navbar', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Navbar {...navbarMock} />
        <button type="button">Outside navigation</button>
      </>,
    );

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('button', { name: 'Outside navigation' }));

    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('closes the mobile menu when the viewport reaches the desktop breakpoint', async () => {
    const user = userEvent.setup();
    render(<Navbar {...navbarMock} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    act(() => {
      desktopMediaQuery.matches = true;
      desktopMediaQuery.dispatchEvent(
        Object.assign(new Event('change'), {
          matches: true,
          media: desktopMediaQuery.media,
        }),
      );
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});
