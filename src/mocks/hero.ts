import type { HeroProps } from '@/components/ui/organism/Hero';
import { sectionHeadingExamples } from './sectionHeadings';

const { eyebrow, title, description } = sectionHeadingExamples[0].heading;

export const heroMock = {
  heading: { eyebrow, title, description },
  image: {
    src: '/images/hero/learning.jpg',
    alt: 'A learner with glasses working at a laptop in a creative workspace.',
  },
  actions: [
    { label: 'Explore courses', href: '#courses', variant: 'primary' },
    { label: 'See how it works', href: '#how-it-works', variant: 'secondary' },
  ],
  courseBadge: { value: '120+', label: 'expert-led courses' },
  ratingLabel: '4.9 avg rating',
  ratingStars: 5,
  socialProof: {
    avatars: [
      { src: '/images/learners/learner-1.jpg', alt: '' },
      { src: '/images/learners/learner-2.jpg', alt: '' },
      { src: '/images/learners/learner-3.jpg', alt: '' },
    ],
    highlightedText: 'Trusted by 24,000+',
    text: 'learners',
  },
} satisfies HeroProps;
