import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { featuredCourseMock } from '@/mocks/featuredCourse';
import { FeaturedCourse } from '.';

const meta = {
  title: 'Design System/Organism/FeaturedCourse',
  component: FeaturedCourse,
  args: { ...featuredCourseMock, onAction: fn() },
  argTypes: {
    heading: { control: 'object' },
    image: { control: 'object' },
    featuredLabel: { control: 'text' },
    instructor: { control: 'object' },
    metadata: { control: 'object' },
    actions: { control: 'object' },
    onAction: { control: false },
    className: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A data-driven featured course with the original local photograph, a separate highlight label, shared inverse SectionHeading, instructor credit, metadata and shared actions. [Desktop reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-193), [mobile reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-4361). Uses the existing browser-verified H3/subtitle2 styles and local Figma export measurements. The 960px switch and intermediate media cap are implementation decisions. Declared section padding and gaps take precedence over inconsistent fixed export tracks: desktop content overflows its padded area by 16px, and mobile text exceeds its fixed row. Natural tracks preserve wrapping. The instructor follows its linked subtitle2 style rather than conflicting raw italic attributes. Metadata and browse text use white instead of near-white for normal-text contrast. Both actions use a light focus outline on blue; the inverse action can grow for long labels. Demo #course-details and #courses destinations are configurable and preview clicks are reported without navigation. Page integration is separate.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        role="region"
        aria-label="Featured course preview"
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
} satisfies Meta<typeof FeaturedCourse>;

export default meta;
type Story = StoryObj<typeof meta>;

function checkFeaturedCourse(width: number): NonNullable<Story['play']> {
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
    const photo = section.querySelector('img')!;
    const media = photo.parentElement!;
    await document.fonts.ready;
    await photo.decode();

    await step('Original image, linked typography and responsive layout', async () => {
      await expect(Math.abs(view.innerWidth - width)).toBeLessThanOrEqual(1);
      await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(view.innerWidth);
      await expect(view.getComputedStyle(section).backgroundColor).toBe('rgb(49, 87, 246)');
      await expect(photo.naturalWidth).toBeGreaterThan(0);
      await expect(photo).toHaveAttribute('src', args.image.src);
      await expect(photo).toHaveAttribute('alt', args.image.alt);
      const mediaBounds = media.getBoundingClientRect();
      await expect(
        Math.abs(mediaBounds.height - mediaBounds.width * (desktop ? 408 / 538 : 280 / 362)),
      ).toBeLessThanOrEqual(1);
      if (desktop) {
        await expect(heading.getBoundingClientRect().left - mediaBounds.right).toBeCloseTo(60, 1);
      } else {
        await expect(heading.getBoundingClientRect().top).toBeGreaterThan(mediaBounds.bottom);
      }
      await expect(view.getComputedStyle(heading).fontSize).toBe(desktop ? '48px' : '32px');
      await expect(view.getComputedStyle(heading).lineHeight).toBe(desktop ? '56px' : '36px');
      if (args.featuredLabel) await expect(canvas.getByText(args.featuredLabel)).toBeVisible();
      if (args.instructor)
        await expect(
          canvas.getByText(`with ${args.instructor.name}`, { exact: false }),
        ).toBeVisible();
      if (args.metadata?.length) {
        const details = within(canvas.getByRole('list', { name: 'Course details' }));
        await expect(details.getAllByRole('listitem')).toHaveLength(args.metadata.length);
        for (const item of args.metadata) await expect(details.getByText(item)).toBeVisible();
      }
      const links = canvas.queryAllByRole('link');
      await expect(links).toHaveLength(args.actions?.length ?? 0);
      if (links.length > 1) {
        const first = links[0].getBoundingClientRect();
        const second = links[1].getBoundingClientRect();
        await expect(desktop ? second.left - first.right : second.top - first.bottom).toBeCloseTo(
          12,
          1,
        );
      }
    });

    await step(
      'Pointer and keyboard actions report destinations and keep the preview in place',
      async () => {
        const location = view.location.href;
        for (const [index, action] of (args.actions ?? []).entries()) {
          const link = canvas.getByRole('link', { name: action.label });
          await expect(link).toHaveAttribute('href', action.href);
          await userEvent.click(link);
          link.focus();
          await userEvent.keyboard('{Enter}');
          await expect(link).toHaveFocus();
          await expect(view.getComputedStyle(link).outlineColor).toBe('rgb(231, 231, 236)');
          await expect(args.onAction).toHaveBeenCalledTimes((index + 1) * 2);
          await expect(args.onAction).toHaveBeenLastCalledWith(action);
        }
        await expect(view.location.href).toBe(location);
      },
    );
  };
}

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: checkFeaturedCourse(1280),
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkFeaturedCourse(402),
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
  play: checkFeaturedCourse(768),
};

export const LongContent: Story = {
  args: {
    heading: {
      ...featuredCourseMock.heading,
      title: 'Designing thoughtful products that help people learn new skills',
      description:
        'Turn a complex product idea into a clear experience through research, hands-on exercises and practical decisions you can apply to your own work.',
    },
    metadata: ['12 practical lessons', 'Learn at your own pace', 'No prior experience required'],
    actions: [
      {
        label: 'View the complete course and practical exercises',
        href: '#course-details',
        variant: 'accent',
      },
      {
        label: 'Browse all practical courses for your next learning goal',
        href: '#courses',
        variant: 'link-inverse',
      },
    ],
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkFeaturedCourse(402),
};

export const Minimal: Story = {
  args: {
    featuredLabel: undefined,
    instructor: undefined,
    metadata: [],
    actions: undefined,
  },
};
