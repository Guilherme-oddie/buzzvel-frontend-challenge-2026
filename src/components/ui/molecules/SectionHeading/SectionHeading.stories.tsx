import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, within } from 'storybook/test';
import { Button } from '@/components/ui/atoms/Button';
import { Typography } from '@/components/ui/atoms/Typography';
import { sectionHeadingExamples } from '@/mocks/sectionHeadings';
import { SectionHeading } from '.';

const onAction = fn().mockName('onAction');

const meta = {
  title: 'Design System/Molecules/SectionHeading',
  component: SectionHeading,
  args: { ...sectionHeadingExamples[1].heading },
  argTypes: {
    title: { control: 'text' },
    eyebrow: { control: 'text' },
    description: { control: 'text' },
    headingAs: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    variant: {
      control: 'select',
      options: ['hero', 'section', 'featured', 'people', 'contact', 'cta'],
    },
    align: { control: 'inline-radio', options: ['left', 'center'] },
    tone: { control: 'inline-radio', options: ['default', 'inverse'] },
    actions: { control: false },
    className: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Composes the shared Typography atom with measured heading, description and spacing variants from [Figma](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-41). Heading semantics, alignment and contrast are independent. Optional actions compose shared Buttons; example clicks are recorded without navigation. Surfaces, media, social proof and contact cards belong to the surrounding composition. The existing 960px responsive switch is an implementation decision.',
      },
    },
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderExamples() {
  return (
    <div
      role="region"
      aria-label="Section heading examples"
      tabIndex={0}
      className="h-screen overflow-y-auto"
      style={{ scrollbarWidth: 'none' }}
    >
      {sectionHeadingExamples.map((sample) => {
        const inverse = sample.heading.tone === 'inverse';

        return (
          <section
            key={sample.id}
            aria-label={sample.label}
            className={`px-5 py-12 min-[960px]:px-20 ${inverse ? 'bg-primary' : 'bg-surface'}`}
          >
            <div className="mx-auto max-w-280">
              <Typography
                variant="caption"
                className={`mb-6 ${inverse ? 'text-white' : 'text-muted'}`}
              >
                {sample.label}
              </Typography>
              <SectionHeading
                {...sample.heading}
                data-testid={`section-heading-${sample.id}`}
                style={{ maxWidth: sample.desktopWidth }}
                actions={sample.actions?.map((action) => (
                  <Button key={action.label} variant={action.variant} onClick={onAction}>
                    {action.label}
                  </Button>
                ))}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}

function checkExamples(reference: 'desktop' | 'mobile'): NonNullable<Story['play']> {
  return async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const view = canvasElement.ownerDocument.defaultView;

    if (!view) throw new Error('SectionHeading examples require a browser window.');

    await canvasElement.ownerDocument.fonts.ready;
    await expect(view.innerWidth).toBe(reference === 'desktop' ? 1280 : 402);

    for (const sample of sectionHeadingExamples) {
      await step(`${sample.label}: semantics and wrapping`, async () => {
        const example = canvas.getByTestId(`section-heading-${sample.id}`);
        const heading = within(example).getByRole('heading', { name: sample.heading.title });

        await expect(heading.tagName.toLowerCase()).toBe(sample.heading.headingAs ?? 'h2');
        await expect(example.scrollWidth).toBeLessThanOrEqual(example.clientWidth);
      });
    }

    await step('Hero: full-width containers and aligned actions', async () => {
      const hero = canvas.getByTestId('section-heading-hero');
      const description = within(hero).getByText(sectionHeadingExamples[0].heading.description!);
      const firstAction = within(hero).getByRole('button', { name: 'Explore courses' });
      const nextAction = within(hero).getByRole('button', { name: 'See how it works' });
      const actions = firstAction.parentElement!;
      const width = reference === 'desktop' ? 560 : 362;

      await expect(hero.getBoundingClientRect().width).toBeCloseTo(width, 1);
      await expect(description.parentElement!.getBoundingClientRect().width).toBeCloseTo(width, 1);
      await expect(description.getBoundingClientRect().width).toBeCloseTo(
        reference === 'desktop' ? 480 : 362,
        1,
      );
      await expect(parseFloat(view.getComputedStyle(description.parentElement!).paddingTop)).toBe(
        24,
      );
      await expect(actions.getBoundingClientRect().width).toBeCloseTo(width, 1);
      await expect(view.getComputedStyle(actions).flexDirection).toBe(
        reference === 'desktop' ? 'row' : 'column',
      );
      await expect(parseFloat(view.getComputedStyle(actions).paddingTop)).toBe(32);
      await expect(parseFloat(view.getComputedStyle(actions).gap)).toBe(12);
      await expect(firstAction.getBoundingClientRect().left).toBeCloseTo(
        hero.getBoundingClientRect().left,
        1,
      );

      if (reference === 'desktop') {
        await expect(firstAction.getBoundingClientRect().top).toBeCloseTo(
          nextAction.getBoundingClientRect().top,
          1,
        );
        await expect(
          nextAction.getBoundingClientRect().left - firstAction.getBoundingClientRect().right,
        ).toBeCloseTo(12, 1);
      } else {
        await expect(firstAction.getBoundingClientRect().width).toBeCloseTo(width, 1);
        await expect(nextAction.getBoundingClientRect().width).toBeCloseTo(width, 1);
        await expect(
          nextAction.getBoundingClientRect().top - firstAction.getBoundingClientRect().bottom,
        ).toBeCloseTo(12, 1);
      }
    });

    await step('Section: full-width description with 16px spacing', async () => {
      const section = canvas.getByTestId('section-heading-categories');
      const description = within(section).getByText(sectionHeadingExamples[1].heading.description!);

      await expect(description.getBoundingClientRect().width).toBeCloseTo(
        reference === 'desktop' ? 560 : 362,
        1,
      );
      await expect(parseFloat(view.getComputedStyle(description.parentElement!).paddingTop)).toBe(
        16,
      );
    });

    await step('Centered: constrained title centered in its container', async () => {
      const section = canvas.getByTestId('section-heading-how-it-works');
      const heading = within(section).getByRole('heading');
      const bounds = section.getBoundingClientRect();
      const title = heading.getBoundingClientRect();

      await expect(title.width).toBeCloseTo(reference === 'desktop' ? 672 : 362, 1);
      await expect(title.left + title.width / 2).toBeCloseTo(bounds.left + bounds.width / 2, 1);
    });

    await step('People: content-width action aligned left', async () => {
      const section = canvas.getByTestId('section-heading-people');
      const action = within(section).getByRole('button');

      await expect(action.getBoundingClientRect().width).toBeLessThan(
        section.getBoundingClientRect().width,
      );
      await expect(action.getBoundingClientRect().left).toBeCloseTo(
        section.getBoundingClientRect().left,
        1,
      );
      await expect(parseFloat(view.getComputedStyle(action.parentElement!).paddingTop)).toBe(
        reference === 'desktop' ? 32 : 24,
      );
    });

    await step('Contact: responsive description typography', async () => {
      const contact = within(canvas.getByTestId('section-heading-contact'));
      const description = contact.getByText(sectionHeadingExamples[5].heading.description!);

      await expect(parseFloat(view.getComputedStyle(description).fontSize)).toBe(
        reference === 'desktop' ? 18 : 14,
      );
    });
  };
}

export const Playground: Story = {
  render: (args) => (
    <div
      className={`p-5 min-[960px]:p-20 ${args.tone === 'inverse' ? 'bg-primary' : 'bg-surface'}`}
    >
      <SectionHeading {...args} className="max-w-140" />
    </div>
  ),
};

export const DesktopExamples: Story = {
  render: renderExamples,
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: checkExamples('desktop'),
};

export const MobileExamples: Story = {
  render: renderExamples,
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkExamples('mobile'),
};

export const CallToAction: Story = {
  args: {
    variant: 'cta',
    align: 'center',
    eyebrow: undefined,
    title: 'What will you learn next?',
    description: 'Start with one course. Build from there.',
  },
  render: (args) => (
    <div className={args.tone === 'inverse' ? 'bg-primary' : 'bg-yellow-soft'}>
      <div className="mx-auto w-full max-w-180 px-5 py-12 min-[960px]:px-8">
        <SectionHeading
          {...args}
          actions={
            <>
              <Button onClick={onAction}>Explore all courses</Button>
              <Button variant="secondary" onClick={onAction}>
                Join Luma
              </Button>
            </>
          }
        />
      </div>
    </div>
  ),
};
