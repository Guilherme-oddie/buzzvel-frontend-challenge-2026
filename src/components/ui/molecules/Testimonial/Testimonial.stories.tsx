import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { testimonialMock } from '@/mocks/testimonial';
import { Testimonial } from '.';

const meta = {
  title: 'Design System/Molecules/Testimonial',
  component: Testimonial,
  args: testimonialMock,
  argTypes: {
    quote: { control: 'text' },
    author: { control: 'object' },
    className: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A semantic figure with a blockquote, shared quotes typography and an author caption. The original quote icon and 48px author portrait remain separate assets. The fixture portrait has empty alt text because the adjacent credit already names the author.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-white p-5">
        <div className="max-w-150">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Testimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

export const WithoutPortrait: Story = {
  args: {
    author: {
      name: testimonialMock.author.name,
      role: testimonialMock.author.role,
      image: undefined,
    },
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('figure img')).toBeNull();
  },
};
