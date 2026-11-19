import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Hero } from '.';
import { heroMock } from '@/mocks/hero';

const meta = {
  title: 'Design System/Organism/Hero',
  component: Hero,
  args: { ...heroMock, onAction: fn() },
  argTypes: {
    ratingStars: { control: 'inline-radio', options: [1, 2, 3, 4, 5] },
    onAction: { control: false },
    className: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Composes SectionHeading, Buttons, AvatarGroup and Badges with original Figma imagery. Desktop uses a split layout; mobile places media first. Story actions report clicks without leaving the preview. The 960px responsive switch and fluid positions between the 1280px/402px references are implementation decisions. The mobile reference reports a 148px action group, although its children and spacing total 150px; this composition preserves their natural sizes and 12px gap.',
      },
    },
  },
  render: (args) => (
    <div
      role="region"
      aria-label="Hero preview"
      tabIndex={0}
      className="h-screen overflow-y-auto"
      style={{ scrollbarWidth: 'none' }}
      onClickCapture={(event) => {
        if (event.target instanceof Element && event.target.closest('a[href]')) {
          event.preventDefault();
        }
      }}
    >
      <Hero {...args} />
    </div>
  ),
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

function checkHero(reference: 'desktop' | 'mobile'): NonNullable<Story['play']> {
  return async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const document = canvasElement.ownerDocument;
    const view = document.defaultView!;
    const heading = canvas.getByRole('heading', { name: args.heading.title, level: 1 });
    const image = canvas.getByRole('img', { name: args.image.alt }) as HTMLImageElement;
    const media = image.parentElement!.parentElement!;
    const content = media.previousElementSibling!;
    const hero = image.closest('section')!;
    const firstAction = canvas.getByRole('link', { name: args.actions![0].label });
    const nextAction = canvas.getByRole('link', { name: args.actions![1].label });

    await document.fonts.ready;

    await step('Original assets, semantics and responsive layout', async () => {
      await Promise.all(Array.from(hero.querySelectorAll('img')).map((asset) => asset.decode()));
      await expect(view.innerWidth).toBe(reference === 'desktop' ? 1280 : 402);
      await expect(image.naturalWidth).toBe(900);
      await expect(image.getBoundingClientRect().width).toBeCloseTo(
        reference === 'desktop' ? 500 : 346,
        1,
      );
      await expect(image.getBoundingClientRect().height).toBeCloseTo(
        reference === 'desktop' ? 520 : 380,
        1,
      );
      await expect(parseFloat(view.getComputedStyle(heading).fontSize)).toBe(
        reference === 'desktop' ? 64 : 40,
      );
      await expect(hero.scrollWidth).toBeLessThanOrEqual(hero.clientWidth);
      await expect(canvas.getByText(args.courseBadge!.value)).toBeVisible();
      await expect(canvas.getByText(args.ratingLabel!)).toBeVisible();
      await expect(
        canvas.getByRole('group', { name: 'Learner portraits' }).querySelectorAll('img'),
      ).toHaveLength(3);

      if (reference === 'desktop') {
        await expect(content.getBoundingClientRect().right).toBeLessThan(
          media.getBoundingClientRect().left,
        );
        await expect(firstAction.getBoundingClientRect().top).toBeCloseTo(
          nextAction.getBoundingClientRect().top,
          1,
        );
      } else {
        await expect(media.getBoundingClientRect().bottom + 40).toBeCloseTo(
          content.getBoundingClientRect().top,
          1,
        );
        await expect(firstAction.getBoundingClientRect().width).toBeCloseTo(362, 1);
        await expect(
          nextAction.getBoundingClientRect().top - firstAction.getBoundingClientRect().bottom,
        ).toBeCloseTo(12, 1);
      }
    });

    await step('Preview actions keep their destinations without navigating', async () => {
      const location = view.location.href;
      await expect(firstAction).toHaveAttribute('href', args.actions![0].href);
      await userEvent.click(firstAction);
      await expect(args.onAction).toHaveBeenCalledWith(args.actions![0]);

      nextAction.focus();
      await userEvent.keyboard('{Enter}');
      await expect(nextAction).toHaveFocus();
      await expect(args.onAction).toHaveBeenCalledWith(args.actions![1]);
      await expect(view.location.href).toBe(location);
    });
  };
}

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: checkHero('desktop'),
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkHero('mobile'),
};
