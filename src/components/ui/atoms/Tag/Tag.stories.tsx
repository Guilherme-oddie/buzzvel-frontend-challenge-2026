import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { featuredCourseMock } from '@/mocks/featuredCourse';
import { Tag } from '.';

const meta = {
  title: 'Design System/Atoms/Tag',
  component: Tag,
  args: { children: featuredCourseMock.metadata[0] },
  argTypes: {
    children: { control: 'text' },
    className: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A non-interactive outlined label using shared body1 typography. Keeps the featured course tag style and wraps long content. The preview uses the same blue background as the course section.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-primary p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const CourseDetails: Story = {
  render: () => (
    <ul aria-label="Course details" className="m-0 flex list-none flex-wrap gap-3 p-0">
      {featuredCourseMock.metadata.map((detail) => (
        <li key={detail} className="flex min-w-0 max-w-full">
          <Tag>{detail}</Tag>
        </li>
      ))}
    </ul>
  ),
};

export const LongContent: Story = {
  args: {
    children: 'No prior experience is required to start learning at your own pace',
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
