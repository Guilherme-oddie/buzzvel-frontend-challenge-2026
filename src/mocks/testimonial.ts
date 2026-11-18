import type { StatisticProps } from '@/components/ui/molecules/Statistic';
import type { TestimonialProps } from '@/components/ui/molecules/Testimonial';
import type { TestimonialStatisticsProps } from '@/components/ui/organism/TestimonialStatistics';

export const testimonialMock = {
  quote:
    'The lessons are short enough to fit into my week, but detailed enough that I actually leave with something I can use.',
  author: {
    name: 'Alex Morgan',
    role: 'Product Manager',
    image: { src: '/images/testimonial/alex-morgan.jpg', alt: '' },
  },
} satisfies TestimonialProps;

export const statisticsMock = [
  { value: '24K+', label: 'active learners' },
  { value: '120+', label: 'expert-led courses' },
  { value: '92%', label: 'complete their first course' },
] satisfies StatisticProps[];

export const testimonialStatisticsMock = {
  testimonial: testimonialMock,
  statistics: statisticsMock,
} satisfies TestimonialStatisticsProps;
