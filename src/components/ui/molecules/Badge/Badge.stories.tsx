import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RatingStars, type RatingStarCount } from '@/components/ui/atoms/RatingStars';
import { Typography } from '@/components/ui/atoms/Typography';
import { heroMock } from '@/mocks/hero';
import { Badge, type BadgeProps } from '.';

type BadgeStoryArgs = BadgeProps & { starCount?: RatingStarCount; courseCount?: string };

const meta = {
  title: 'Design System/Molecules/Badge',
  component: Badge,
  args: {
    children: heroMock.courseBadge.label,
    gap: 'md',
  },
  argTypes: {
    children: { control: 'text' },
    gap: { control: 'inline-radio', options: ['sm', 'md'] },
    leading: { control: false },
    starCount: { control: false, table: { disable: true } },
    courseCount: { control: false, table: { disable: true } },
    className: { control: false },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A floating information card with body text and an optional leading slot. The Hero uses 12px spacing for its course count and 8px for its rating. Shared padding, radius and shadow follow the [Figma reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-77).',
      },
    },
  },
} satisfies Meta<BadgeStoryArgs>;

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Playground: Story = {};

export const CourseCount: Story = {
  args: {
    courseCount: heroMock.courseBadge.value,
  },
  argTypes: {
    courseCount: { control: 'text', table: { disable: false } },
  },
  render: ({ courseCount, ...args }) => (
    <Badge
      {...args}
      leading={
        <Typography
          as="span"
          className="flex h-8 shrink-0 items-center justify-center rounded-lg bg-[#e2e8ff] px-1 font-bold text-primary"
        >
          {courseCount}
        </Typography>
      }
    />
  ),
};

export const Rating: Story = {
  args: {
    children: heroMock.ratingLabel,
    gap: 'sm',
    starCount: heroMock.ratingStars,
  },
  argTypes: {
    starCount: {
      control: 'inline-radio',
      options: [1, 2, 3, 4, 5],
      table: { disable: false },
    },
  },
  render: ({ starCount, ...args }) => (
    <Badge {...args} leading={<RatingStars count={starCount} aria-hidden />} />
  ),
};
