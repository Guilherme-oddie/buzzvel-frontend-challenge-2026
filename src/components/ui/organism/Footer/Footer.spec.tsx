import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { footerMock } from '@/mocks/footer';
import { Footer } from '.';

describe('Footer', () => {
  it('renders the complete fixture with shared typography and inverse logo', () => {
    const { asFragment } = render(<Footer {...footerMock} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts configurable groups, copy, brand destination and native props', () => {
    const { asFragment } = render(
      <Footer
        tagline="Learn something new every day."
        copyright="© 2027 Luma Learning"
        brandHref="/home"
        groups={[{ title: 'Resources', links: [{ label: 'Journal', href: '/journal' }] }]}
        id="site-footer"
        className="custom-footer"
        aria-label="Site information"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('reports a selected link and preserves its destination', async () => {
    const onNavigate = vi.fn();
    render(<Footer {...footerMock} onNavigate={onNavigate} />);
    const navigation = within(screen.getByRole('navigation', { name: 'Footer navigation' }));
    const link = navigation.getByRole('link', { name: 'Courses' });

    await userEvent.click(link);

    expect(link).toHaveAttribute('href', footerMock.groups[0].links[0].href);
    expect(onNavigate).toHaveBeenCalledExactlyOnceWith(footerMock.groups[0].links[0]);
  });
});
