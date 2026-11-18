import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { SectionHeading } from '@/components/ui/molecules/SectionHeading';
import { learningStepsMock, mobileLearningStepsMock } from '@/mocks/learningSteps';
import { sectionHeadingExamples } from '@/mocks/sectionHeadings';
import { LearningStepCard } from '.';

const meta = {
  title: 'Design System/Molecules/LearningStepCard',
  component: LearningStepCard,
  args: { ...learningStepsMock[0] },
  argTypes: {
    variant: { control: 'inline-radio', options: ['blue', 'coral', 'yellow'] },
    headingAs: { control: 'select', options: ['h2', 'h3', 'h4', 'h5', 'h6'] },
    className: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A non-interactive learning step with a decorative geometric marker and shared overline, H5 and subtitle2 text. The group stories own the connectors and compose SectionHeading. [Desktop reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-238), [mobile reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-4405). Both layouts use Step 01/02/03, correcting the repeated desktop labels in Figma. Mobile keeps “actually” in the second description. The coral square is opaque peach on desktop and coral at 15% opacity on mobile. Step labels use the existing muted gray (#656770) for 5.30:1 contrast; the Figma gray (#6D7384) produces 4.45:1 against the surface. Text keeps natural height and observed gaps. The existing 960px switch is an implementation decision.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        role="region"
        aria-label="Learning step preview"
        tabIndex={0}
        className="h-screen overflow-y-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <div className="mx-auto w-full max-w-[402px] px-5 py-10 min-[960px]:max-w-94 min-[960px]:px-7">
      <LearningStepCard {...args} />
    </div>
  ),
} satisfies Meta<typeof LearningStepCard>;

export default meta;
type Story = StoryObj<typeof meta>;
type Reference = 'desktop' | 'mobile' | 'intermediate';

export const Blue: Story = {};

export const Coral: Story = {
  args: { ...learningStepsMock[1] },
};

export const Yellow: Story = {
  args: { ...learningStepsMock[2] },
};

function renderLearningSteps(reference: Reference): NonNullable<Story['render']> {
  const examples = reference === 'desktop' ? learningStepsMock : mobileLearningStepsMock;
  const heading = sectionHeadingExamples.find((sample) => sample.id === 'how-it-works')!.heading;

  return function LearningStepsGroup(args) {
    return (
      <section
        aria-label="How Luma works"
        className="bg-surface px-5 py-15 min-[960px]:px-20 min-[960px]:py-25"
      >
        <div className="mx-auto max-w-280">
          <SectionHeading {...heading} />
          <ol
            aria-label="Learning steps"
            className="mt-10 grid grid-cols-1 gap-19 min-[960px]:mt-20 min-[960px]:grid-cols-3 min-[960px]:gap-20 min-[960px]:py-7"
          >
            {examples.map((example, index) => (
              <li key={example.variant} className="relative">
                <LearningStepCard {...args} {...example} />
                {index < examples.length - 1 && (
                  <span
                    aria-hidden
                    className={[
                      'absolute left-7 w-px bg-line min-[960px]:top-7 min-[960px]:h-px min-[960px]:w-[calc(100%+80px)]',
                      index === 0
                        ? 'top-[calc(100%+26.25px)] h-[50px]'
                        : 'top-[calc(100%+29.25px)] h-[47px]',
                    ].join(' ')}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  };
}

function checkLearningSteps(reference: Reference): NonNullable<Story['play']> {
  const examples = reference === 'desktop' ? learningStepsMock : mobileLearningStepsMock;
  const width = reference === 'desktop' ? 1280 : reference === 'mobile' ? 402 : 768;

  return async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const document = canvasElement.ownerDocument;
    const view = document.defaultView!;
    const cards = within(canvas.getByRole('list', { name: 'Learning steps' })).getAllByRole(
      'listitem',
    );

    await document.fonts.ready;

    await step('The three steps preserve reference copy and reading order', async () => {
      await expect(cards).toHaveLength(3);
      for (const [index, card] of cards.entries()) {
        await expect(
          within(card).getByRole('heading', { level: Number((args.headingAs ?? 'h3').slice(1)) }),
        ).toHaveTextContent(examples[index].title);
        await expect(within(card).getByText(examples[index].stepLabel)).toBeVisible();
        await expect(within(card).getByText(examples[index].description)).toBeVisible();
      }
    });

    await step('Reference and intermediate widths remain usable without overflow', async () => {
      // Browser zoom can round the reference iframe width by one CSS pixel.
      await expect(Math.abs(view.innerWidth - width)).toBeLessThanOrEqual(1);
      await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(view.innerWidth);
      const first = cards[0].getBoundingClientRect();
      const second = cards[1].getBoundingClientRect();
      await expect(
        Math.abs(first.width - (reference === 'desktop' ? 320 : width - 40)),
      ).toBeLessThanOrEqual(1);

      if (reference === 'desktop') {
        await expect(first.top).toBeCloseTo(second.top, 1);
        await expect(second.left - first.right).toBeCloseTo(80, 1);
      } else {
        await expect(second.top - first.bottom).toBeCloseTo(76, 1);
      }
    });
  };
}

const groupControls = {
  variant: { control: false },
  stepLabel: { control: false },
  title: { control: false },
  description: { control: false },
} as const;

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  argTypes: groupControls,
  render: renderLearningSteps('desktop'),
  play: checkLearningSteps('desktop'),
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  argTypes: groupControls,
  render: renderLearningSteps('mobile'),
  play: checkLearningSteps('mobile'),
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
  argTypes: groupControls,
  render: renderLearningSteps('intermediate'),
  play: checkLearningSteps('intermediate'),
};
