import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { peopleSectionMock } from '@/mocks/people';
import { PeopleSection } from '.';

const meta = {
  title: 'Design System/Organism/PeopleSection',
  component: PeopleSection,
  args: { ...peopleSectionMock, onAction: fn() },
  argTypes: {
    heading: { control: 'object' },
    photos: { control: 'object' },
    action: { control: 'object' },
    onAction: { control: false },
    className: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Composes the shared people SectionHeading, secondary Button and ten-photo ImageCollage with original local assets. [Desktop reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=4-1136), [mobile reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=4-1234). Desktop splits text and media; mobile stacks text first. The 960px switch and 530px content/media cap between reference widths are implementation decisions. The fixture uses a configurable demo #community destination; preview actions report clicks without leaving Storybook.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        role="region"
        aria-label="People section preview"
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
} satisfies Meta<typeof PeopleSection>;

export default meta;
type Story = StoryObj<typeof meta>;
type Reference = 'desktop' | 'mobile' | 'intermediate';

function checkPeopleSection(reference: Reference): NonNullable<Story['play']> {
  const width = reference === 'desktop' ? 1280 : reference === 'mobile' ? 402 : 768;
  const collageWidth = reference === 'mobile' ? 362 : 530;

  return async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const document = canvasElement.ownerDocument;
    const view = document.defaultView!;
    const heading = canvas.getByRole('heading', {
      name: args.heading.title,
      level: Number((args.heading.headingAs ?? 'h2').slice(1)),
    });
    const content = heading.parentElement!.parentElement!;
    const collage = canvas.getByRole('group', { name: 'Students and teachers' });
    const images = Array.from(collage.querySelectorAll('img'));
    const action = args.action ? canvas.getByRole('link', { name: args.action.label }) : null;

    await document.fonts.ready;
    await Promise.all(images.map((image) => image.decode()));

    await step('Original photo slots, text and responsive layout', async () => {
      await expect(images).toHaveLength(10);
      for (const [index, image] of images.entries()) {
        await expect(image.naturalWidth).toBeGreaterThan(0);
        await expect(image).toHaveAttribute('src', args.photos[index].src);
        await expect(image).toHaveAttribute('alt', args.photos[index].alt);
      }

      // Browser zoom can round the reference iframe width by one CSS pixel.
      await expect(Math.abs(view.innerWidth - width)).toBeLessThanOrEqual(1);
      await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(view.innerWidth);
      await expect(
        Math.abs(collage.getBoundingClientRect().width - collageWidth),
      ).toBeLessThanOrEqual(1);
      await expect(
        Math.abs(
          collage.getBoundingClientRect().height -
            (reference === 'desktop' ? 522.438 : (collageWidth * 309.5) / 362),
        ),
      ).toBeLessThanOrEqual(1);

      if (reference === 'desktop') {
        await expect(
          collage.getBoundingClientRect().left - content.getBoundingClientRect().right,
        ).toBeCloseTo(60, 1);
      } else {
        await expect(
          collage.getBoundingClientRect().top - content.getBoundingClientRect().bottom,
        ).toBeCloseTo(32, 1);
      }
    });

    await step('The CTA reports pointer and keyboard actions without navigating', async () => {
      if (!args.action || !action) {
        await expect(canvas.queryByRole('link')).not.toBeInTheDocument();
        return;
      }
      const location = view.location.href;
      await expect(action).toHaveAttribute('href', args.action.href);
      await userEvent.click(action);
      await expect(args.onAction).toHaveBeenCalledTimes(1);
      await expect(args.onAction).toHaveBeenLastCalledWith(args.action);
      action.focus();
      await userEvent.keyboard('{Enter}');
      await expect(action).toHaveFocus();
      await expect(args.onAction).toHaveBeenCalledTimes(2);
      await expect(view.location.href).toBe(location);
    });
  };
}

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: checkPeopleSection('desktop'),
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkPeopleSection('mobile'),
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
  play: checkPeopleSection('intermediate'),
};

export const WithoutAction: Story = {
  args: { action: undefined },
};
