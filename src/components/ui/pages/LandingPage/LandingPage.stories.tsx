import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { contactValuesMock } from '@/mocks/contact';
import { createContactSubmissionMock } from '@/mocks/contactSubmission';
import { pageMock } from '@/mocks/page';
import { LandingPage } from '.';

const meta = {
  title: 'Design System/Pages/LandingPage',
  component: LandingPage,
  args: {
    fixtures: pageMock,
    preview: true,
    onContactSubmit: fn(createContactSubmissionMock()),
  },
  argTypes: {
    fixtures: { control: false },
    preview: { control: false },
    onContactSubmit: { control: false },
  },
  parameters: {
    docs: {
      story: { inline: false, height: 900 },
      description: {
        component:
          'The complete page composes the reviewed organisms and shared typed fixtures. [Desktop reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-7), [mobile reference](https://www.figma.com/design/G0zSf6gyynwzEusOCgm2CM/Buzzvel-FE---Test-2026?node-id=2-4195). Section padding is applied once, with 960px as the main responsive switch and 600px for the category grid. Categories and learning steps preserve the inspected full-section spacing; the ordered steps keep their reviewed 01/02/03 labels. Page links resolve to existing sections and unavailable features announce a demo notice. Preview mode scrolls and focuses inside the canvas without changing its URL; the application uses native fragment navigation. The contact handler succeeds by default; failure and retry are injected in stories/tests without public scenario controls.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        role="region"
        aria-label="Landing page preview"
        tabIndex={0}
        className="h-screen overflow-y-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <div id="top">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function checkPage(width: number): NonNullable<Story['play']> {
  return async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const document = canvasElement.ownerDocument;
    const view = document.defaultView!;
    const fixtures = args.fixtures ?? pageMock;
    await document.fonts.ready;
    const heroImage = canvas.getByRole('img', { name: fixtures.hero.image.alt });
    await (heroImage as HTMLImageElement).decode();

    await expect(Math.abs(view.innerWidth - width)).toBeLessThanOrEqual(1);
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(view.innerWidth);
    const preview = canvas.getByRole('region', { name: 'Landing page preview' });
    await expect(preview.scrollWidth).toBeLessThanOrEqual(preview.clientWidth + 1);
    await expect(canvas.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    await expect(canvas.getByRole('banner')).toBeVisible();
    await expect(canvas.getByRole('contentinfo')).toBeVisible();
    const main = canvas.getByRole('main');
    await expect(main.children).toHaveLength(8);
    await expect(within(main).getByRole('list', { name: 'Learning steps' }).children).toHaveLength(
      3,
    );
    for (const link of canvas.getAllByRole('link')) {
      const href = link.getAttribute('href') ?? '';
      if (href.startsWith('#')) await expect(document.getElementById(href.slice(1))).not.toBeNull();
    }
    await expect(heroImage).toHaveAttribute('loading', 'eager');
    await expect(heroImage).toHaveAttribute('fetchpriority', 'high');
  };
}

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  play: checkPage(1280),
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: checkPage(402),
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
  play: checkPage(768),
};

const retryOptions = { delayMs: 100, outcomes: ['error', 'success'] as const };
const retrySubmission = fn(createContactSubmissionMock(retryOptions));

export const ContactRetry: Story = {
  args: {
    fixtures: {
      ...pageMock,
      contact: {
        ...pageMock.contact,
        form: { ...pageMock.contact.form, defaultValues: contactValuesMock },
      },
    },
    onContactSubmit: retrySubmission,
  },
  beforeEach: () => {
    retrySubmission.mockClear();
    retrySubmission.mockImplementation(createContactSubmissionMock(retryOptions));
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const form = canvas.getByRole('form', { name: pageMock.contact.form.title });
    const fields = within(form);
    const labels = pageMock.contact.form.labels;
    form.scrollIntoView({ block: 'start', behavior: 'auto' });
    await userEvent.click(fields.getByRole('button', { name: labels.submit }));
    await waitFor(() => expect(fields.getByRole('alert')).toHaveTextContent(labels.error));
    await expect(fields.getByRole('textbox', { name: labels.email })).toHaveValue(
      contactValuesMock.email,
    );
    await userEvent.click(fields.getByRole('button', { name: labels.submit }));
    await waitFor(() => expect(fields.getByRole('status')).toHaveTextContent(labels.success));
    await expect(args.onContactSubmit).toHaveBeenCalledTimes(2);
  },
};
