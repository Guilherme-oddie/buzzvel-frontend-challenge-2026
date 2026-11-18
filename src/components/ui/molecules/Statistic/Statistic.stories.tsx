import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { statisticsMock } from '@/mocks/testimonial';
import { Statistic } from '.';

const meta = {
  title: 'Design System/Molecules/Statistic',
  component: Statistic,
  args: statisticsMock[0],
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    className: { control: false },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A definition-list item with shared H1 and body typography. Render inside a dl; the label precedes the value semantically, while CSS places the value first visually. The parent owns alignment and spacing between items. The Figma value and label retain their natural height with a 4px gap.',
      },
    },
  },
  render: (args) => (
    <dl className="w-64 bg-white p-5">
      <Statistic {...args} />
    </dl>
  ),
} satisfies Meta<typeof Statistic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LongLabel: Story = {
  args: { label: 'learners building practical skills every week' },
};
