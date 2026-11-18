import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BrandLogo } from '.';

const meta = {
  title: 'Design System/Atoms/BrandLogo',
  component: BrandLogo,
  args: { tone: 'default' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['default', 'inverse'] },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Original Luma artwork for light and dark backgrounds.',
      },
    },
  },
  render: (args) => (
    <div className={`p-8 ${args.tone === 'inverse' ? 'bg-ink' : 'bg-surface'}`}>
      <BrandLogo {...args} />
    </div>
  ),
} satisfies Meta<typeof BrandLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inverse: Story = {
  args: { tone: 'inverse' },
};
