import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { peoplePhotosMock } from '@/mocks/people';
import { ImageCollage } from '.';

const meta = {
  title: 'Design System/Molecules/ImageCollage',
  component: ImageCollage,
  args: { photos: peoplePhotosMock },
  argTypes: {
    photos: { control: 'object' },
    className: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Ten replaceable photos in four columns (2/3/3/2), ordered top to bottom within each column. The blue circle, crops, rounded corners and shadows stay separate from the original JPEGs. The preset follows the [desktop](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=4-1137) and [mobile](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=4-1236) photo bounds. Mobile column bounds produce 12px gaps although the inspector reports a 16px spacing value. The 960px switch is an implementation decision.',
      },
    },
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-[402px] p-5 min-[960px]:max-w-[570px]">
      <ImageCollage {...args} />
    </div>
  ),
} satisfies Meta<typeof ImageCollage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
