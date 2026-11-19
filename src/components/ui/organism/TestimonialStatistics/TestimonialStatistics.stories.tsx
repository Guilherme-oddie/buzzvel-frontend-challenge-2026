import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { testimonialStatisticsMock } from '@/mocks/testimonial';
import { TestimonialStatistics } from '.';

const meta = {
  title: 'Design System/Organism/TestimonialStatistics',
  component: TestimonialStatistics,
  args: testimonialStatisticsMock,
  argTypes: {
    testimonial: { control: 'object' },
    statistics: { control: 'object' },
    className: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Composes the shared Testimonial and Statistic molecules with local fixtures and original assets. [Desktop reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-305), [mobile reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-4471). Statistics form a definition list: labels precede values in reading order, while values appear above their labels visually. Desktop has a vertical list and divider; mobile has three columns without a divider. Measurements come from the local Figma export. The 960px switch, padded 1120px content cap and natural text heights resolve inconsistent fixed export tracks without clipping. This is static content; page integration is separate.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        role="region"
        aria-label="Testimonial section preview"
        tabIndex={0}
        className="h-screen overflow-y-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TestimonialStatistics>;

export default meta;
type Story = StoryObj<typeof meta>;

function checkTestimonialStatistics(width: number): NonNullable<Story['play']> {
  return async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const document = canvasElement.ownerDocument;
    const view = document.defaultView!;
    const desktop = width >= 960;
    const figure = canvas.getByRole('figure');
    const quotation = canvas.getByText(args.testimonial.quote);
    const name = canvas.getByText(args.testimonial.author.name);
    const portrait = figure.querySelector('img');
    const statistics = canvas.getByLabelText('Learning community statistics');
    const terms = within(statistics).getAllByRole('term');
    const definitions = within(statistics).getAllByRole('definition');
    await document.fonts.ready;
    if (portrait) await portrait.decode();

    await step('Quote, author and statistic reading order', async () => {
      await expect(quotation.parentElement?.tagName).toBe('BLOCKQUOTE');
      await expect(view.getComputedStyle(quotation).fontSize).toBe(desktop ? '30px' : '20px');
      await expect(view.getComputedStyle(quotation).lineHeight).toBe(desktop ? '44px' : '32px');
      await expect(view.getComputedStyle(name).fontSize).toBe('16px');
      await expect(view.getComputedStyle(name).lineHeight).toBe(desktop ? '28px' : '26px');
      await expect(view.getComputedStyle(name).fontWeight).toBe('700');
      if (portrait && args.testimonial.author.image) {
        await expect(portrait.naturalWidth).toBeGreaterThan(0);
        await expect(portrait).toHaveAttribute('src', args.testimonial.author.image.src);
        await expect(portrait).toHaveAttribute('alt', args.testimonial.author.image.alt);
        await expect(portrait.getBoundingClientRect().width).toBe(48);
        await expect(portrait.getBoundingClientRect().height).toBe(48);
      }
      await expect(terms).toHaveLength(args.statistics.length);
      await expect(definitions).toHaveLength(args.statistics.length);
      for (const [index, statistic] of args.statistics.entries()) {
        await expect(terms[index]).toHaveTextContent(statistic.label);
        await expect(definitions[index]).toHaveTextContent(statistic.value);
        await expect(definitions[index].previousElementSibling).toBe(terms[index]);
      }
    });

    await step('Responsive arrangement and natural text wrapping', async () => {
      await expect(Math.abs(view.innerWidth - width)).toBeLessThanOrEqual(1);
      await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(view.innerWidth);
      await expect(view.getComputedStyle(statistics).borderLeftWidth).toBe(desktop ? '1px' : '0px');
      const quoteBounds = figure.getBoundingClientRect();
      const statsBounds = statistics.getBoundingClientRect();
      if (desktop) {
        await expect(statsBounds.left - quoteBounds.right).toBeGreaterThanOrEqual(59);
      } else {
        await expect(statsBounds.top - quoteBounds.bottom).toBeCloseTo(60, 1);
      }
      for (const [index, definition] of definitions.entries()) {
        if (index === 0) continue;
        const previous = definitions[index - 1].getBoundingClientRect();
        const current = definition.getBoundingClientRect();
        await expect(desktop ? current.top > previous.top : current.left > previous.left).toBe(
          true,
        );
      }
    });
  };
}

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: checkTestimonialStatistics(1280),
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkTestimonialStatistics(402),
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
  play: checkTestimonialStatistics(768),
};

export const LongContent: Story = {
  args: {
    testimonial: {
      ...testimonialStatisticsMock.testimonial,
      quote:
        'I started with a single lesson after work and kept coming back. The practical exercises helped me understand how to apply each idea, ask better questions and build the confidence to bring what I learned into projects with my team.',
      author: {
        ...testimonialStatisticsMock.testimonial.author,
        name: 'Alexandra Morgan-Campbell',
        role: 'Product Manager and lifelong learner',
      },
    },
    statistics: [
      { value: '24K+', label: 'active learners building practical skills' },
      { value: '120+', label: 'expert-led courses to explore at your own pace' },
      { value: '92%', label: 'complete their first course and keep learning' },
    ],
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkTestimonialStatistics(402),
};
