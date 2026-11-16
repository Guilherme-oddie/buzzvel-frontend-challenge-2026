import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Icon } from '@/components/ui/atoms/Icon';
import { Typography } from '@/components/ui/atoms/Typography';
import { buttonSamples, buttonSizeSamples, buttonStateLabels } from '@/mocks/buttons';
import { Button } from '.';

const meta = {
  title: 'Design System/Atoms/Button',
  component: Button,
  args: {
    children: 'Explore courses',
    variant: 'primary',
    size: 'default',
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'select', options: buttonSamples.map((sample) => sample.variant) },
    size: { control: 'select', options: buttonSizeSamples.map((sample) => sample.size) },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: false },
    onClick: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Shared button and link styles from the [Figma reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-52). Filled variants use 14px/28px padding, or 10px/20px with `size="compact"`. Text uses `body1`, with bold action labels. `href` renders an anchor, and native buttons default to `type="button"`. Icons are decorative children with their exported dimensions. Hover, focus, disabled and submitting feedback are implementation decisions. The inverse link switches from the measured mobile 50px height to desktop 52px at the existing 960px breakpoint.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderVariants() {
  return (
    <div className="grid min-w-0 gap-6 p-5 min-[960px]:grid-cols-2 min-[960px]:p-8">
      {buttonSamples.map((sample) => (
        <section key={sample.variant} className="min-w-0 space-y-3">
          <Typography as="h2" variant="caption">
            {sample.variant}
          </Typography>
          <div
            className={
              sample.variant === 'link-inverse'
                ? 'flex justify-center rounded-lg bg-primary p-4'
                : ''
            }
          >
            <Button
              variant={sample.variant}
              aria-label={sample.variant === 'icon' ? sample.label : undefined}
              className={sample.mobileFullWidth ? 'w-full min-[960px]:w-auto' : undefined}
            >
              {sample.variant !== 'icon' && sample.label}
              {sample.icon && <Icon name={sample.icon} />}
            </Button>
          </div>
        </section>
      ))}
    </div>
  );
}

export const Playground: Story = {
  render: (args) => (
    <div className={`min-w-0 p-5 sm:p-8 ${args.variant === 'link-inverse' ? 'bg-primary' : ''}`}>
      <Button {...args} aria-label={args.variant === 'icon' ? 'Open menu' : undefined}>
        {args.variant === 'icon' ? <Icon name="menu" /> : args.children}
      </Button>
    </div>
  ),
};

export const DesktopVariants: Story = {
  render: renderVariants,
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export const MobileVariants: Story = {
  render: renderVariants,
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-8 p-5 sm:p-8">
      {buttonSizeSamples.map((sample) => (
        <section key={sample.size} className="space-y-3">
          <Typography as="h2" variant="caption">
            {sample.size}
          </Typography>
          <Button size={sample.size}>{sample.label}</Button>
        </section>
      ))}
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <div className="p-5 sm:p-8">
      <Button href="#courses" variant="link">
        Browse courses
        <Icon name="arrow-right" />
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-start gap-5 p-5 sm:p-8">
      <Button onClick={args.onClick}>{buttonStateLabels.enabled}</Button>
      <Button onClick={args.onClick} disabled>
        {buttonStateLabels.disabled}
      </Button>
      <Button disabled aria-busy>
        {buttonStateLabels.submitting}
      </Button>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const enabled = canvas.getByRole('button', { name: buttonStateLabels.enabled });
    const disabled = canvas.getByRole('button', { name: buttonStateLabels.disabled });

    await userEvent.click(enabled);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(2);
    await userEvent.click(disabled);
    await expect(disabled).toBeDisabled();
    await expect(args.onClick).toHaveBeenCalledTimes(2);
    await expect(
      canvas.getByRole('button', { name: buttonStateLabels.submitting }),
    ).toHaveAttribute('aria-busy', 'true');
  },
};
