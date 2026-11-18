import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { ContactInfoCard } from '@/components/ui/molecules/ContactInfoCard';
import { SectionHeading } from '@/components/ui/molecules/SectionHeading';
import {
  contactCardsMock,
  contactFormMock,
  contactHeadingMock,
  contactValuesMock,
} from '@/mocks/contact';
import { ContactForm } from '.';

const meta = {
  title: 'Design System/Organism/ContactForm',
  component: ContactForm,
  args: {
    ...contactFormMock,
    onSubmit: fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
    }),
  },
  argTypes: {
    labels: { control: 'object' },
    defaultValues: { control: 'object' },
    headingAs: { control: 'select', options: ['h2', 'h3', 'h4', 'h5', 'h6'] },
    onSubmit: { control: false },
    className: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'An asynchronous contact form with required fields, email validation, associated errors and announced submit results. Stories compose the existing contact heading and independent information cards; the application page is unchanged. [Desktop reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=19-77), [mobile reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=21-52). The 960px layout switch and intermediate content caps are implementation decisions. English form copy is shared across viewports; mobile retains the 20/32px form title. Validation, error color and submit states are implementation decisions because the design only shows empty fields. Placeholders use the existing muted gray for readable contrast. Injected handlers simulate every outcome locally; no message is sent or stored. Values remain available after success or failure.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        role="region"
        aria-label="Contact section preview"
        tabIndex={0}
        className="h-screen overflow-y-auto"
        style={{ scrollbarWidth: 'none' }}
        onClickCapture={(event) => {
          if (event.target instanceof Element && event.target.closest('a[href]')) {
            event.preventDefault();
          }
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <section
      aria-label={contactHeadingMock.title}
      className="bg-white px-5 py-15 min-[960px]:px-20 min-[960px]:py-25"
    >
      <div className="mx-auto grid max-w-280 grid-cols-1 items-center gap-10 min-[960px]:grid-cols-[minmax(0,480fr)_minmax(0,540fr)] min-[960px]:gap-25">
        <div className="w-full max-w-120 min-w-0 justify-self-center">
          <SectionHeading {...contactHeadingMock} />
          <div className="mt-8 flex flex-col gap-4 min-[960px]:mt-10">
            {contactCardsMock.map((card) => (
              <ContactInfoCard {...card} key={card.label} />
            ))}
          </div>
        </div>
        <ContactForm {...args} className="w-full max-w-135 min-w-0 justify-self-center" />
      </div>
    </section>
  ),
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

function checkContactLayout(width: number, formWidth: number): NonNullable<Story['play']> {
  return async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const labels = { ...contactFormMock.labels, ...args.labels };
    const document = canvasElement.ownerDocument;
    const view = document.defaultView!;
    await document.fonts.ready;

    await step(
      'The empty form and independent contact cards fit the reference viewport',
      async () => {
        const form = canvas.getByRole('form', { name: args.title ?? contactFormMock.title });
        await expect(Math.abs(view.innerWidth - width)).toBeLessThanOrEqual(1);
        await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(view.innerWidth);
        await expect(Math.abs(form.getBoundingClientRect().width - formWidth)).toBeLessThanOrEqual(
          1,
        );
        await expect(canvas.getAllByRole('textbox')).toHaveLength(3);
        await expect(canvas.getByRole('link', { name: contactCardsMock[0].value })).toHaveAttribute(
          'href',
          contactCardsMock[0].href,
        );
        await expect(canvas.getByRole('button', { name: labels.submit })).toBeEnabled();
      },
    );
  };
}

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: checkContactLayout(1280, 540),
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkContactLayout(402, 362),
};

export const Intermediate: Story = {
  parameters: {
    viewport: {
      options: {
        intermediate: {
          name: 'Intermediate (768px)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
      },
    },
  },
  globals: { viewport: { value: 'intermediate', isRotated: false } },
  play: checkContactLayout(768, 540),
};

export const Invalid: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const labels = { ...contactFormMock.labels, ...args.labels };
    await userEvent.click(canvas.getByRole('button', { name: labels.submit }));
    await expect(canvas.getAllByText(labels.required)).toHaveLength(3);
    await expect(canvas.getByRole('textbox', { name: labels.fullName })).toHaveFocus();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const Submitting: Story = {
  args: {
    defaultValues: contactValuesMock,
    onSubmit: fn(() => new Promise<void>(() => {})),
  },
  globals: { viewport: { value: 'desktop', isRotated: false } },
  parameters: {
    docs: {
      description: {
        story: 'The injected promise remains pending so this state can be inspected.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const labels = { ...contactFormMock.labels, ...args.labels };
    await userEvent.click(canvas.getByRole('button', { name: labels.submit }));
    await expect(canvas.getByRole('button', { name: labels.pending })).toBeDisabled();
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
    await expect(args.onSubmit).toHaveBeenLastCalledWith(contactValuesMock);
  },
};

export const Success: Story = {
  args: { defaultValues: contactValuesMock, onSubmit: fn(async () => {}) },
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const labels = { ...contactFormMock.labels, ...args.labels };
    const submit = canvas.getByRole('button', { name: labels.submit });
    submit.focus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(canvas.getByRole('status')).toHaveTextContent(labels.success));
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
    await expect(args.onSubmit).toHaveBeenLastCalledWith(contactValuesMock);
  },
};

export const Failure: Story = {
  args: {
    defaultValues: contactValuesMock,
    onSubmit: fn(async () => {
      throw new Error('Simulated submission failure');
    }),
  },
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const labels = { ...contactFormMock.labels, ...args.labels };
    await userEvent.click(canvas.getByRole('button', { name: labels.submit }));
    await waitFor(() => expect(canvas.getByRole('alert')).toHaveTextContent(labels.error));
    await expect(canvas.getByRole('textbox', { name: labels.email })).toHaveValue(
      contactValuesMock.email,
    );
    await expect(canvas.getByRole('button', { name: labels.submit })).toBeEnabled();
  },
};
