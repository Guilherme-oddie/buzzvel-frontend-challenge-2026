import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { contactCardsMock } from '@/mocks/contact';
import { ContactInfoCard } from '.';

const meta = {
  title: 'Design System/Molecules/ContactInfoCard',
  component: ContactInfoCard,
  args: contactCardsMock[0],
  argTypes: {
    icon: { control: 'select', options: ['chat-bubble', 'clock'] },
    className: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Configurable icon, label, value and optional destination. Original chat-bubble (24px) and clock (20px) SVGs are exported from Figma. [Desktop cards](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=19-84), [mobile cards](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=21-59). Response text uses the existing muted color instead of the reference secondary gray to meet normal-text contrast on the surface. Preview email links retain mailto semantics and prevent opening an email application.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className="mx-auto max-w-130 bg-white p-5"
        onClickCapture={(event) => {
          if (event.target instanceof Element && event.target.closest('a[href]')) {
            event.preventDefault();
          }
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('link', { name: args.value })).toHaveAttribute('href', args.href);
  },
};

export const ResponseTime: Story = {
  args: { ...contactCardsMock[1], href: undefined },
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
