import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RatingStars } from '.';

const meta = {
  title: 'Design System/Atoms/RatingStars',
  component: RatingStars,
  args: { count: 5 },
  argTypes: {
    count: { control: 'inline-radio', options: [1, 2, 3, 4, 5] },
    className: { control: false },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays one to five original Figma star icons. Count controls the number of visible stars, independently of any numeric rating text. Hide the group from assistive technology when an adjacent label already communicates the rating.',
      },
    },
  },
} satisfies Meta<typeof RatingStars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
