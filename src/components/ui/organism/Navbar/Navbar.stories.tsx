import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { navbarMock } from '@/mocks/navigation';
import { Navbar } from '.';

const meta = {
  title: 'Design System/Organism/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive navigation with fixture data. The 960px breakpoint and expanded disclosure are implementation decisions; the reference provides desktop and closed mobile headers.',
      },
    },
  },
  args: { ...navbarMock, onNavigate: fn() },
  argTypes: {
    onNavigate: { control: false },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

export const ExpandedMobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open menu' }));
    await expect(canvas.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  },
};
