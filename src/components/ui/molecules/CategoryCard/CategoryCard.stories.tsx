import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { categoriesMock } from '@/mocks/categories';
import { CategoryCard } from '.';

const meta = {
  title: 'Design System/Molecules/CategoryCard',
  component: CategoryCard,
  args: { ...categoriesMock[0], onClick: fn() },
  argTypes: {
    headingAs: { control: 'select', options: ['h2', 'h3', 'h4', 'h5', 'h6'] },
    onClick: { control: false },
    className: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A category destination with an index, H5 title, body description and shared arrow icon. The entire card is one link. The preview prevents navigation and reports clicks in Actions. [Desktop reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-115), [mobile reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-4284). The 960px switch and two-column intermediate layout are implementation decisions. The Figma action wrapper is 44px high although its padding and text total 48px; this component preserves the natural text height and 24px top spacing. All mobile descriptions use the shared body style, including Creative, whose reference has no named style.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
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
  render: (args) => (
    <div className="mx-auto w-full max-w-[402px] p-5 min-[960px]:max-w-[321px] min-[960px]:p-7">
      <CategoryCard {...args} />
    </div>
  ),
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const renderCategories: NonNullable<Story['render']> = (args) => (
  <div className="mx-auto w-full max-w-7xl bg-white px-5 py-10 min-[960px]:px-20">
    <div className="grid auto-rows-fr grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[960px]:grid-cols-4 min-[960px]:gap-5">
      {categoriesMock.map((category) => (
        <CategoryCard {...args} {...category} key={category.numberLabel} />
      ))}
    </div>
  </div>
);

function checkCategories(reference: 'desktop' | 'mobile'): NonNullable<Story['play']> {
  return async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const document = canvasElement.ownerDocument;
    const view = document.defaultView!;
    const cards = canvas.getAllByRole('link');

    await document.fonts.ready;

    await step('Four reusable cards match the reference widths without overflow', async () => {
      await expect(view.innerWidth).toBe(reference === 'desktop' ? 1280 : 402);
      await expect(cards).toHaveLength(4);
      await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(view.innerWidth);

      for (const [index, card] of cards.entries()) {
        await expect(card).toHaveAttribute('href', categoriesMock[index].href);
        await expect(card.getBoundingClientRect().width).toBeCloseTo(
          reference === 'desktop' ? 265 : 362,
          1,
        );
        await expect(
          within(card).getByRole('heading', { level: Number((args.headingAs ?? 'h3').slice(1)) }),
        ).toHaveTextContent(categoriesMock[index].title);
      }

      const first = cards[0].getBoundingClientRect();
      const second = cards[1].getBoundingClientRect();
      if (reference === 'desktop') {
        await expect(first.top).toBeCloseTo(second.top, 1);
        await expect(second.left - first.right).toBeCloseTo(20, 1);
      } else {
        await expect(second.top - first.bottom).toBeCloseTo(16, 1);
      }
    });

    await step('One keyboard target per card and preview clicks do not navigate', async () => {
      const location = view.location.href;
      cards[0].focus();
      await userEvent.keyboard('{Enter}');
      await expect(args.onClick).toHaveBeenCalledTimes(1);
      await userEvent.tab();
      await expect(cards[1]).toHaveFocus();
      await expect(view.location.href).toBe(location);
    });
  };
}

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  render: renderCategories,
  play: checkCategories('desktop'),
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  render: renderCategories,
  play: checkCategories('mobile'),
};
