import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { contactFormLabelsMock } from '@/mocks/contact';
import { FormField, type FormFieldProps } from '.';

const meta = {
  title: 'Design System/Molecules/FormField',
  component: FormField,
  args: {
    label: contactFormLabelsMock.fullName,
    placeholder: contactFormLabelsMock.fullNamePlaceholder,
  },
  argTypes: {
    as: { control: 'select', options: ['input', 'textarea'] },
    className: { control: false },
    ref: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-135 bg-white p-5">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A native input or textarea with an associated label, optional error and forwarded native props. Uses shared body/caption typography, original 48px input geometry and a 100px mobile/120px desktop textarea. Muted placeholders preserve readable contrast; error styling and focus feedback are implementation decisions.',
      },
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<FormFieldProps>;

export const Text: Story = { args: meta.args };

export const Email: Story = {
  args: {
    type: 'email',
    label: contactFormLabelsMock.email,
    placeholder: contactFormLabelsMock.emailPlaceholder,
    autoComplete: 'email',
  },
};

export const Question: Story = {
  args: {
    as: 'textarea',
    label: contactFormLabelsMock.question,
    placeholder: contactFormLabelsMock.questionPlaceholder,
  },
};

export const Invalid: Story = {
  args: { ...meta.args, error: contactFormLabelsMock.required, required: true },
  play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: FormFieldProps }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole('textbox', { name: args.label });
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await expect(field).toHaveAccessibleDescription(args.error);
  },
};

export const Disabled: Story = {
  args: { ...meta.args, disabled: true },
};
