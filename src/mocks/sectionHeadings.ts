import type { ButtonVariant } from '@/components/ui/atoms/Button';
import type { SectionHeadingProps } from '@/components/ui/molecules/SectionHeading';

interface SectionHeadingAction {
  label: string;
  variant: Extract<ButtonVariant, 'primary' | 'secondary'>;
}

export interface SectionHeadingExample {
  id: string;
  label: string;
  heading: Omit<SectionHeadingProps, 'actions' | 'className'>;
  desktopWidth: number;
  actions?: readonly SectionHeadingAction[];
  reference: { desktop: string; mobile: string };
}

export const sectionHeadingExamples: readonly SectionHeadingExample[] = [
  {
    id: 'hero',
    label: 'Hero',
    heading: {
      variant: 'hero',
      headingAs: 'h1',
      eyebrow: 'Learn at your own pace',
      title: 'Build skills that actually move you forward.',
      description:
        'Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.',
    },
    desktopWidth: 560,
    actions: [
      { label: 'Explore courses', variant: 'primary' },
      { label: 'See how it works', variant: 'secondary' },
    ],
    reference: { desktop: '2-41', mobile: '2-4211' },
  },
  {
    id: 'categories',
    label: 'Section',
    heading: {
      eyebrow: 'Find your next skill',
      title: 'Learn something worth knowing.',
      description:
        'Short, practical courses designed around skills you can put to work immediately.',
    },
    desktopWidth: 560,
    reference: { desktop: '2-102', mobile: '2-4271' },
  },
  {
    id: 'how-it-works',
    label: 'Centered',
    heading: {
      align: 'center',
      eyebrow: 'How Luma works',
      title: 'Less browsing. More learning.',
    },
    desktopWidth: 1120,
    reference: { desktop: '2-240', mobile: '2-4407' },
  },
  {
    id: 'featured',
    label: 'Inverse',
    heading: {
      variant: 'featured',
      tone: 'inverse',
      eyebrow: 'Most popular this month',
      title: 'Designing products people understand.',
      description:
        'Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.',
    },
    desktopWidth: 536,
    reference: { desktop: '2-202', mobile: '2-4370' },
  },
  {
    id: 'people',
    label: 'People with an action',
    heading: {
      variant: 'people',
      eyebrow: 'The people',
      title: 'Meet international students & teachers',
      description:
        'Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus aenean lorem faucibus integer.',
    },
    desktopWidth: 530,
    actions: [{ label: 'Explore teachers and students', variant: 'secondary' }],
    reference: { desktop: '4-1173', mobile: '4-1272' },
  },
  {
    id: 'contact',
    label: 'Contact',
    heading: {
      variant: 'contact',
      eyebrow: 'Contact',
      title: 'Get in touch',
      description:
        'Have a question? We’re here to help. Whether you’re looking for the right course, learning with your team or interested in teaching with Luma, we’d love to hear from you.',
    },
    desktopWidth: 480,
    reference: { desktop: '19-79', mobile: '21-54' },
  },
];
