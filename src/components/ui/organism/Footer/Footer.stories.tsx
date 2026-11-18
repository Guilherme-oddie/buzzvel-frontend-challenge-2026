import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { footerMock } from '@/mocks/footer';
import { Footer } from '.';

const meta = {
  title: 'Design System/Organism/Footer',
  component: Footer,
  args: { ...footerMock, onNavigate: fn() },
  argTypes: {
    groups: { control: 'object' },
    tagline: { control: 'text' },
    copyright: { control: 'text' },
    brandHref: { control: 'text' },
    onNavigate: { control: false },
    className: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A data-driven footer using shared BrandLogo, Typography and text Buttons. [Desktop reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-384), [mobile reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-4544). Measurements and the inverse logo come from the local Figma export. The logo keeps the existing 54×17px component frame. The 960px switch, padded 1120px container and natural text heights resolve inconsistent fixed export tracks. Mobile places Explore and Company side by side, then Support across the row. Hover and light focus outlines are implementation decisions for the dark surface. Mock hash destinations are configurable; preview clicks report Actions without navigation. Unavailable demo pages and page integration are deferred.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        role="region"
        aria-label="Footer preview"
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
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

function checkFooter(width: number): NonNullable<Story['play']> {
  return async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const document = canvasElement.ownerDocument;
    const view = document.defaultView!;
    const desktop = width >= 960;
    const footer = canvas.getByRole('contentinfo');
    const navigation = canvas.getByRole('navigation', { name: 'Footer navigation' });
    const home = canvas.getByRole('link', { name: 'Luma home' });
    const logo = within(home).getByRole('img', { name: 'Luma' });
    const copyright = canvas.getByText(args.copyright);
    const headings = within(navigation).getAllByRole('heading', { level: 2 });
    await document.fonts.ready;
    await (logo as HTMLImageElement).decode();

    await step('Complete footer content and responsive groups', async () => {
      await expect(Math.abs(view.innerWidth - width)).toBeLessThanOrEqual(1);
      await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(view.innerWidth);
      await expect(view.getComputedStyle(footer).backgroundColor).toBe('rgb(23, 27, 44)');
      await expect(logo).toHaveAttribute('src', '/brand/luma-inverse.svg');
      await expect(logo.getBoundingClientRect().width).toBe(54);
      await expect(logo.getBoundingClientRect().height).toBe(17);
      await expect(canvas.getByText(args.tagline)).toHaveClass('typography-body1');
      await expect(copyright).toHaveClass('typography-caption');
      await expect(view.getComputedStyle(copyright).textAlign).toBe(desktop ? 'left' : 'center');
      await expect(headings).toHaveLength(args.groups.length);
      for (const [index, group] of args.groups.entries()) {
        await expect(headings[index]).toHaveTextContent(group.title);
        await expect(headings[index]).toHaveClass('typography-overline');
        const links = within(headings[index].parentElement!).getAllByRole('link');
        await expect(links).toHaveLength(group.links.length);
        for (const [linkIndex, link] of group.links.entries()) {
          await expect(links[linkIndex]).toHaveTextContent(link.label);
          await expect(links[linkIndex]).toHaveAttribute('href', link.href);
        }
      }
      if (headings.length === 3) {
        const first = headings[0].getBoundingClientRect();
        const second = headings[1].getBoundingClientRect();
        const third = headings[2].getBoundingClientRect();
        await expect(second.left).toBeGreaterThan(first.left);
        await expect(second.top).toBeCloseTo(first.top, 1);
        await expect(desktop ? third.left > second.left : third.top > first.bottom).toBe(true);
      }
      await expect(view.getComputedStyle(copyright.parentElement!).borderTopWidth).toBe('1px');
    });

    await step(
      'Pointer and keyboard links report actions without leaving the preview',
      async () => {
        const location = view.location.href;
        const items = [
          { label: 'Luma home', href: args.brandHref ?? '/' },
          ...args.groups.flatMap((group) => group.links),
        ];
        const links = canvas.getAllByRole('link');
        await expect(links).toHaveLength(items.length);
        for (const [index, item] of items.entries()) {
          const link = links[index];
          await expect(link).toHaveAttribute('href', item.href);
          await userEvent.click(link);
          link.focus();
          await userEvent.keyboard('{Enter}');
          await expect(link).toHaveFocus();
          await expect(view.getComputedStyle(link).outlineColor).toBe('rgb(231, 231, 236)');
          await expect(args.onNavigate).toHaveBeenCalledTimes((index + 1) * 2);
          await expect(args.onNavigate).toHaveBeenLastCalledWith(item);
        }
        await expect(view.location.href).toBe(location);
      },
    );
  };
}

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: checkFooter(1280),
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkFooter(402),
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
  play: checkFooter(768),
};

export const LongContent: Story = {
  args: {
    tagline:
      'Practical learning for curious people who want to build confidence and develop new skills.',
    groups: footerMock.groups.map((group, index) => ({
      ...group,
      title: index === 0 ? 'Explore your next learning opportunity' : group.title,
      links:
        index === 0
          ? [
              { label: 'Browse practical courses for your next goal', href: '#courses' },
              ...group.links.slice(1),
            ]
          : group.links,
    })),
    copyright: '© 2026 Luma Learning. Practical learning for curious people everywhere.',
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkFooter(402),
};
