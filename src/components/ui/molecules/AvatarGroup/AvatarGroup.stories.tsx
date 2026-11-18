import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { heroMock } from '@/mocks/hero';
import { AvatarGroup } from '.';

const meta = {
  title: 'Design System/Molecules/AvatarGroup',
  component: AvatarGroup,
  args: {
    avatars: heroMock.socialProof.avatars,
    'aria-label': 'Learner portraits',
  },
  argTypes: {
    avatars: { control: 'object' },
    'aria-label': { control: 'text' },
    className: { control: false },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Portraits from the [Hero reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-41), rendered at 32px with an 8px overlap. Use empty image alternatives for decorative portraits and an optional group label when needed.',
      },
    },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
