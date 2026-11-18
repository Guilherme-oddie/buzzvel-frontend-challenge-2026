import type { FeaturedCourseProps } from '@/components/ui/organism/FeaturedCourse';
import { sectionHeadingExamples } from './sectionHeadings';

const { eyebrow, title, description } = sectionHeadingExamples.find(
  (sample) => sample.id === 'featured',
)!.heading;

export const featuredCourseMock = {
  heading: { eyebrow, title, description },
  image: {
    src: '/images/courses/featured.jpg',
    alt: 'Person writing beside product prototypes and colorful material samples on a workbench.',
  },
  featuredLabel: 'Featured Course',
  instructor: { name: 'Maya Chen', role: 'Senior Product Designer' },
  metadata: ['8 lessons', '2h 40min', 'Intermediate'],
  actions: [
    { label: 'View course', href: '#course-details', variant: 'accent' },
    { label: 'Browse all courses', href: '#courses', variant: 'link-inverse' },
  ],
} satisfies FeaturedCourseProps;
