import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState, type MouseEvent } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { navbarMock } from '@/mocks/navigation';
import { Navbar, type NavbarProps } from '.';

function NavbarPreview(args: NavbarProps) {
  const [activeHref, setActiveHref] = useState<string>();

  function selectPreviewLink(event: MouseEvent<HTMLDivElement>) {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;

    if (!link || !event.currentTarget.contains(link)) return;

    event.preventDefault();
    setActiveHref(link.getAttribute('href') ?? undefined);
  }

  return (
    <div onClickCapture={selectPreviewLink}>
      <Navbar {...args} activeHref={activeHref} />
    </div>
  );
}

const meta = {
  title: 'Design System/Organism/Navbar',
  component: Navbar,
  render: (args) => <NavbarPreview {...args} />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive navigation with fixture data. Story navigation is simulated: links stay in the preview, expose the selected location and report actions. Selected colors, the 960px breakpoint and expanded disclosure are implementation decisions; the reference provides desktop and closed mobile headers.',
      },
    },
  },
  args: { ...navbarMock, onNavigate: fn() },
  argTypes: {
    activeHref: { control: false },
    onNavigate: { control: false },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const previewLocation = canvasElement.ownerDocument.defaultView?.location.href;
    const navigation = within(canvas.getByRole('navigation', { name: 'Main navigation' }));
    const firstLink = navigation.getByRole('link', { name: args.links[0].label });
    const nextLink = navigation.getByRole('link', { name: args.links[1].label });

    await userEvent.click(firstLink);
    await expect(firstLink).toHaveAttribute('aria-current', 'location');

    nextLink.focus();
    await userEvent.keyboard('{Enter}');
    await expect(nextLink).toHaveAttribute('aria-current', 'location');
    await expect(firstLink).not.toHaveAttribute('aria-current');
    await expect(args.onNavigate).toHaveBeenCalledWith(args.links[1]);

    const primaryAction = canvas.getByRole('link', { name: args.primaryAction.label });
    await userEvent.click(primaryAction);
    await expect(primaryAction).toHaveAttribute('aria-current', 'location');
    await expect(nextLink).not.toHaveAttribute('aria-current');

    if (args.secondaryAction) {
      const secondaryAction = canvas.getByRole('link', { name: args.secondaryAction.label });
      await userEvent.click(secondaryAction);
      await expect(secondaryAction).toHaveAttribute('aria-current', 'location');
      await expect(primaryAction).not.toHaveAttribute('aria-current');
    }

    const brand = canvas.getByRole('link', { name: 'Luma home' });
    await userEvent.click(brand);
    await expect(brand).toHaveAttribute('aria-current', 'location');
    await expect(primaryAction).not.toHaveAttribute('aria-current');
    await userEvent.click(firstLink);
    await expect(firstLink).toHaveAttribute('aria-current', 'location');
    await expect(canvasElement.ownerDocument.defaultView?.location.href).toBe(previewLocation);
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

export const ExpandedMobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const previewLocation = canvasElement.ownerDocument.defaultView?.location.href;
    await userEvent.click(canvas.getByRole('button', { name: 'Open menu' }));
    const navigation = canvas.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(navigation).toBeVisible();

    await userEvent.click(within(navigation).getByRole('link', { name: args.links[0].label }));
    await expect(canvas.queryByRole('navigation', { name: 'Mobile navigation' })).toBeNull();
    await expect(args.onNavigate).toHaveBeenCalledWith(args.links[0]);
    await expect(canvasElement.ownerDocument.defaultView?.location.href).toBe(previewLocation);

    await userEvent.click(canvas.getByRole('button', { name: 'Open menu' }));
    await expect(
      within(canvas.getByRole('navigation', { name: 'Mobile navigation' })).getByRole('link', {
        name: args.links[0].label,
      }),
    ).toHaveAttribute('aria-current', 'location');
  },
};
