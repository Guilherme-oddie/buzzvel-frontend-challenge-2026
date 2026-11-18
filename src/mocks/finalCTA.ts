import type { FinalCTAProps } from '@/components/ui/organism/FinalCTA';
import { heroMock } from './hero';

export const finalCTAMock = {
  heading: {
    title: 'What will you learn next?',
    description: 'Start with one course. Build from there.',
  },
  avatars: [...heroMock.socialProof.avatars, { src: '/images/learners/learner-4.jpg', alt: '' }],
  actions: [
    { label: 'Explore all courses', href: '#courses', variant: 'primary' },
    { label: 'Join Luma', href: '#contact', variant: 'secondary' },
  ],
} satisfies FinalCTAProps;
