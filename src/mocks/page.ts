import type { CategoryCardProps } from '@/components/ui/molecules/CategoryCard/CategoryCard.types';
import type { ContactInfoCardProps } from '@/components/ui/molecules/ContactInfoCard';
import type { LearningStepCardProps } from '@/components/ui/molecules/LearningStepCard';
import type { SectionHeadingProps } from '@/components/ui/molecules/SectionHeading';
import type { ContactFormProps } from '@/components/ui/organism/ContactForm';
import type { FeaturedCourseProps } from '@/components/ui/organism/FeaturedCourse';
import type { FinalCTAProps } from '@/components/ui/organism/FinalCTA';
import type { FooterProps } from '@/components/ui/organism/Footer';
import type { HeroProps } from '@/components/ui/organism/Hero';
import type { NavbarProps } from '@/components/ui/organism/Navbar';
import type { PeopleSectionProps } from '@/components/ui/organism/PeopleSection';
import type { TestimonialStatisticsProps } from '@/components/ui/organism/TestimonialStatistics';
import { categoriesMock } from './categories';
import { contactCardsMock, contactFormMock, contactHeadingMock } from './contact';
import { featuredCourseMock } from './featuredCourse';
import { finalCTAMock } from './finalCTA';
import { footerMock } from './footer';
import { heroMock } from './hero';
import { learningStepsMock, mobileLearningStepsMock } from './learningSteps';
import { navbarMock } from './navigation';
import { peopleSectionMock } from './people';
import { sectionHeadingExamples } from './sectionHeadings';
import { testimonialStatisticsMock } from './testimonial';

export interface PageFixtures {
  navbar: NavbarProps;
  hero: HeroProps;
  categories: {
    heading: SectionHeadingProps;
    items: readonly CategoryCardProps[];
  };
  featuredCourse: FeaturedCourseProps;
  howItWorks: {
    heading: SectionHeadingProps;
    steps: readonly LearningStepCardProps[];
    mobileSteps: readonly LearningStepCardProps[];
  };
  testimonialStatistics: TestimonialStatisticsProps;
  people: PeopleSectionProps;
  contact: {
    heading: SectionHeadingProps;
    cards: readonly ContactInfoCardProps[];
    form: Omit<ContactFormProps, 'onSubmit'>;
  };
  finalCTA: FinalCTAProps;
  footer: FooterProps;
}

export const pageMock = {
  navbar: navbarMock,
  hero: heroMock,
  categories: {
    heading: sectionHeadingExamples.find((sample) => sample.id === 'categories')!.heading,
    items: categoriesMock,
  },
  featuredCourse: featuredCourseMock,
  howItWorks: {
    heading: sectionHeadingExamples.find((sample) => sample.id === 'how-it-works')!.heading,
    steps: learningStepsMock,
    mobileSteps: mobileLearningStepsMock,
  },
  testimonialStatistics: testimonialStatisticsMock,
  people: peopleSectionMock,
  contact: {
    heading: contactHeadingMock,
    cards: contactCardsMock,
    form: contactFormMock,
  },
  finalCTA: finalCTAMock,
  footer: footerMock,
} satisfies PageFixtures;
