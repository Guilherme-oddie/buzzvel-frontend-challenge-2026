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
    size: { control: 'inline-radio', options: [32, 40] },
    borderTone: { control: 'inline-radio', options: ['surface', 'accent'] },
    borderWidth: { control: 'inline-radio', options: [1, 2] },
    'aria-label': { control: 'text' },
    className: { control: false },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Portraits use a shared 8px overlap. The default 32px size and 1px surface border follow the [Hero reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-41); 40px portraits with 2px accent borders support the final CTA. Use empty image alternatives for decorative portraits and an optional group label when needed.',
      },
    },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Large: Story = {
  args: { size: 40, borderTone: 'accent', borderWidth: 2 },
};
