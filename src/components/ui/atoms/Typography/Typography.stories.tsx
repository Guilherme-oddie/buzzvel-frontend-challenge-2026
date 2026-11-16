import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import {
  typographyLongText,
  typographyPlaygroundText,
  typographySamples,
  type TypographyMetrics,
} from '@/mocks/typography';
import { Typography } from '.';

const meta = {
  title: 'Design System/Atoms/Typography',
  component: Typography,
  args: {
    as: 'p',
    variant: 'body1',
    children: typographyPlaygroundText,
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    variant: {
      control: 'select',
      options: typographySamples.map((sample) => sample.variant),
    },
    children: { control: 'text' },
    className: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Eight text styles measured in the 1280px desktop and 402px mobile [Figma frames](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-46). The 960px responsive switch is an implementation decision. `caption` is a local alias for the unnamed footer style. Visual variants and semantic elements are independent; text color inherits.',
      },
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

function describeMetrics(metrics: TypographyMetrics) {
  return `${metrics.fontSize}px size · ${metrics.lineHeight}px line height · ${metrics.letterSpacing}px tracking`;
}

function renderScale() {
  return (
    <div className="w-full min-w-0 space-y-10 p-6 sm:p-8">
      <Typography as="h1" variant="h5">
        Typography scale
      </Typography>
      {typographySamples.map((sample) => (
        <section
          key={sample.variant}
          aria-labelledby={`typography-label-${sample.variant}`}
          className="min-w-0 space-y-3 border-b border-line pb-8 last:border-b-0"
        >
          <div className="space-y-1">
            <Typography as="h2" variant="caption" id={`typography-label-${sample.variant}`}>
              {sample.variant} · {sample.fontFamily} · weight {sample.fontWeight}
            </Typography>
            <Typography variant="caption" className="text-muted">
              Desktop — {describeMetrics(sample.desktop)}
            </Typography>
            <Typography variant="caption" className="text-muted">
              Mobile — {describeMetrics(sample.mobile)}
            </Typography>
            {sample.note && (
              <Typography variant="caption" className="text-muted">
                {sample.note}
              </Typography>
            )}
          </div>
          <Typography variant={sample.variant} data-testid={`typography-sample-${sample.variant}`}>
            {sample.text}
          </Typography>
        </section>
      ))}
    </div>
  );
}

function checkReferenceScale(reference: 'desktop' | 'mobile'): NonNullable<Story['play']> {
  return async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const document = canvasElement.ownerDocument;
    const window = document.defaultView;

    if (!window) {
      throw new Error('Typography reference checks require a browser window.');
    }

    for (const sample of typographySamples) {
      await step(`${sample.variant} at the ${reference} reference width`, async () => {
        const metrics = sample[reference];
        const font = `${sample.fontWeight} ${metrics.fontSize}px "${sample.fontFamily}"`;
        const loadedFaces = await document.fonts.load(font, sample.text);

        await expect(loadedFaces.length).toBeGreaterThan(0);
        await expect(loadedFaces.every((face) => face.status === 'loaded')).toBe(true);

        const element = canvas.getByTestId(`typography-sample-${sample.variant}`);
        const style = window.getComputedStyle(element);
        const family = style.fontFamily.split(',')[0].trim().replace(/["']/g, '');
        const letterSpacing =
          style.letterSpacing === 'normal' ? 0 : parseFloat(style.letterSpacing);

        await expect(family).toBe(sample.fontFamily);
        await expect(style.fontWeight).toBe(String(sample.fontWeight));
        await expect(parseFloat(style.fontSize)).toBeCloseTo(metrics.fontSize, 2);
        await expect(parseFloat(style.lineHeight)).toBeCloseTo(metrics.lineHeight, 2);
        await expect(letterSpacing).toBeCloseTo(metrics.letterSpacing, 2);

        if (sample.variant === 'overline') {
          await expect(style.textTransform).toBe('uppercase');
        }
      });
    }
  };
}

export const Playground: Story = {
  render: (args) => (
    <div className="w-full min-w-0 p-6 sm:p-8">
      <Typography {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Uses the available canvas width. Change the content, visual variant and semantic tag.',
      },
    },
  },
};

export const DesktopScale: Story = {
  render: renderScale,
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: checkReferenceScale('desktop'),
};

export const MobileScale: Story = {
  render: renderScale,
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkReferenceScale('mobile'),
};

export const SemanticExample: Story = {
  render: () => (
    <div className="w-full min-w-0 space-y-5 p-6 sm:p-8">
      <Typography as="h2" variant="h3">
        A semantic h2 with the h3 visual style
      </Typography>
      <Typography>
        Inline text can use the same atom, including{' '}
        <Typography as="span" variant="caption">
          supporting details inside a paragraph
        </Typography>
        .
      </Typography>
      <Typography>
        Body text can contain <strong>meaningful emphasis</strong> while sharing the same typeface,
        size, line height and inherited color.
      </Typography>
    </div>
  ),
};

export const LongText: Story = {
  render: () => (
    <div className="w-full min-w-0 space-y-8 p-6 sm:p-8">
      <Typography variant="caption" className="text-muted">
        Resize the available canvas down to 320px to review wrapping.
      </Typography>
      <Typography as="h1" variant="h1">
        {typographyLongText.heading}
      </Typography>
      <Typography>{typographyLongText.body}</Typography>
      <Typography as="h2" variant="h3">
        {typographyLongText.heading}
      </Typography>
      <Typography variant="subtitle1">{typographyLongText.body}</Typography>
    </div>
  ),
};
