import type { ImageCollagePhotos } from '@/components/ui/molecules/ImageCollage';
import type { PeopleSectionProps } from '@/components/ui/organism/PeopleSection';
import { sectionHeadingExamples } from './sectionHeadings';

export const peoplePhotosMock = [
  {
    src: '/images/people/person-01.jpg',
    alt: 'Person in a pastel shirt waving at a computer.',
  },
  {
    src: '/images/people/person-02.jpg',
    alt: 'People gathered around laptops at a table.',
  },
  {
    src: '/images/people/person-03.jpg',
    alt: 'Person in a blue hoodie reading with headphones around their neck.',
  },
  {
    src: '/images/people/person-04.jpg',
    alt: 'Two people singing into a microphone beside a music stand.',
  },
  {
    src: '/images/people/person-05.jpg',
    alt: 'Person taking notes beside an open book and a tablet.',
  },
  {
    src: '/images/people/person-06.jpg',
    alt: 'Person in a graduation cap and gown holding a red folder.',
  },
  {
    src: '/images/people/person-07.jpg',
    alt: 'Person seated at a kitchen table with a laptop and books.',
  },
  {
    src: '/images/people/person-08.jpg',
    alt: 'Person watching a speaker on a desktop computer.',
  },
  {
    src: '/images/people/person-09.jpg',
    alt: 'Person in a yellow shirt holding binders outdoors.',
  },
  {
    src: '/images/people/person-10.jpg',
    alt: 'Person in a black headscarf holding books and a takeaway cup.',
  },
] satisfies ImageCollagePhotos;

const { eyebrow, title, description } = sectionHeadingExamples.find(
  (sample) => sample.id === 'people',
)!.heading;

export const peopleSectionMock = {
  heading: { eyebrow, title, description },
  photos: peoplePhotosMock,
  action: { label: 'Explore teachers and students', href: '#community' },
} satisfies PeopleSectionProps;
