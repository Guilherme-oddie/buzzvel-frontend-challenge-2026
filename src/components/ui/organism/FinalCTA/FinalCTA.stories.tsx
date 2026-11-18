import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { finalCTAMock } from '@/mocks/finalCTA';
import { FinalCTA } from '.';

const meta = {
  title: 'Design System/Organism/FinalCTA',
  component: FinalCTA,
  args: { ...finalCTAMock, onAction: fn() },
  argTypes: {
    heading: { control: 'object' },
    avatars: { control: 'object' },
    actions: { control: 'object' },
    onAction: { control: false },
    className: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A centered H2 call to action with shared 40px AvatarGroup portraits and primary/secondary Buttons. [Desktop reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-352), [mobile reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-4517). Original decorative SVGs and separate CSS geometric shapes appear on desktop only, as in Figma. The 960px switch and proportional decoration positions at other widths are implementation decisions. Measured spacing and shared text/button heights take precedence over inconsistent fixed Figma wrapper heights. The mock actions use #courses and #contact destinations; previews report clicks without navigating or opening a signup flow.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        role="region"
        aria-label="Final call to action preview"
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
} satisfies Meta<typeof FinalCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

function checkFinalCTA(width: number): NonNullable<Story['play']> {
  return async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const document = canvasElement.ownerDocument;
    const view = document.defaultView!;
    const desktop = width >= 960;
    const section = canvas.getByRole('region', { name: args.heading.title });
    const heading = canvas.getByRole('heading', {
      name: args.heading.title,
      level: Number((args.heading.headingAs ?? 'h2').slice(1)),
    });
    const avatarGroup = args.avatars.length
      ? canvas.getByRole('group', { name: 'Learner portraits' })
      : null;
    const portraits = Array.from(avatarGroup?.querySelectorAll('img') ?? []);
    await document.fonts.ready;
    await Promise.all(portraits.map((portrait) => portrait.decode()));

    await step(
      'Original desktop decorations keep their exported dimensions and stay hidden on mobile',
      async () => {
        const decorations = section.querySelector<HTMLElement>('[aria-hidden="true"]')!;
        await expect(view.getComputedStyle(decorations).display).toBe(desktop ? 'block' : 'none');
        if (desktop) {
          const graphics = Array.from(decorations.querySelectorAll('img'));
          await expect(graphics).toHaveLength(5);
          await Promise.all(graphics.map((graphic) => graphic.decode()));
          for (const graphic of graphics) {
            await expect(graphic.naturalWidth).toBeGreaterThan(0);
            await expect(graphic.getBoundingClientRect().width).toBeCloseTo(
              Number(graphic.getAttribute('width')),
              1,
            );
            await expect(graphic.getBoundingClientRect().height).toBeCloseTo(
              Number(graphic.getAttribute('height')),
              1,
            );
          }
        }
      },
    );

    await step('Responsive H2, original portraits and actions fit the viewport', async () => {
      await expect(Math.abs(view.innerWidth - width)).toBeLessThanOrEqual(1);
      await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(view.innerWidth);
      await expect(view.getComputedStyle(section).backgroundColor).toBe('rgb(255, 241, 194)');
      await expect(view.getComputedStyle(heading).fontSize).toBe(desktop ? '56px' : '36px');
      await expect(view.getComputedStyle(heading).lineHeight).toBe(desktop ? '64px' : '40px');
      await expect(portraits).toHaveLength(args.avatars.length);
      for (const [index, portrait] of portraits.entries()) {
        await expect(portrait.naturalWidth).toBeGreaterThan(0);
        await expect(portrait).toHaveAttribute('src', args.avatars[index].src);
        await expect(portrait).toHaveAttribute('alt', args.avatars[index].alt);
        await expect(portrait.getBoundingClientRect().width).toBeCloseTo(40, 1);
        // Browser zoom can round thin borders to a fractional CSS pixel.
        await expect(
          Math.abs(parseFloat(view.getComputedStyle(portrait).borderTopWidth) - 2),
        ).toBeLessThanOrEqual(0.5);
      }
      const links = canvas.queryAllByRole('link');
      await expect(links).toHaveLength(args.actions?.length ?? 0);
      if (links.length >= 2) {
        const first = links[0].getBoundingClientRect();
        const second = links[1].getBoundingClientRect();
        await expect(desktop ? second.left - first.right : second.top - first.bottom).toBeCloseTo(
          12,
          1,
        );
        if (!desktop) {
          await expect(
            Math.abs(first.width - heading.getBoundingClientRect().width),
          ).toBeLessThanOrEqual(1);
        }
      }
    });

    await step('Actions report pointer and keyboard activation without navigating', async () => {
      const location = view.location.href;
      for (const [index, action] of (args.actions ?? []).entries()) {
        const link = canvas.getByRole('link', { name: action.label });
        await expect(link).toHaveAttribute('href', action.href);
        await userEvent.click(link);
        link.focus();
        await userEvent.keyboard('{Enter}');
        await expect(link).toHaveFocus();
        await expect(args.onAction).toHaveBeenCalledTimes((index + 1) * 2);
        await expect(args.onAction).toHaveBeenLastCalledWith(action);
      }
      await expect(view.location.href).toBe(location);
    });
  };
}

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: checkFinalCTA(1280),
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkFinalCTA(402),
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
  play: checkFinalCTA(768),
};

export const LongContent: Story = {
  args: {
    heading: {
      title: 'Build the practical skills you want to use every day',
      description:
        'Explore a new subject at your own pace and take your next step with our community.',
    },
    actions: [
      {
        label: 'Explore practical courses for your next learning goal',
        href: '#courses',
        variant: 'primary',
      },
      { label: 'Join the learning community', href: '#contact', variant: 'secondary' },
    ],
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkFinalCTA(402),
};

export const HeadingOnly: Story = {
  args: { avatars: [], actions: undefined },
};
