import type { MouseEventHandler } from 'react';
import { Button } from '@/components/ui/atoms/Button';
import { Icon } from '@/components/ui/atoms/Icon';
import { Typography } from '@/components/ui/atoms/Typography';
import { ContactInfoCard } from '@/components/ui/molecules/ContactInfoCard';
import { SectionHeading } from '@/components/ui/molecules/SectionHeading';
import { CategoriesSection } from '@/components/ui/organism/CategoriesSection';
import { ContactForm, type ContactValues } from '@/components/ui/organism/ContactForm';
import { FeaturedCourse } from '@/components/ui/organism/FeaturedCourse';
import { FinalCTA } from '@/components/ui/organism/FinalCTA';
import { Footer } from '@/components/ui/organism/Footer';
import { Hero } from '@/components/ui/organism/Hero';
import { HowItWorksSection } from '@/components/ui/organism/HowItWorksSection';
import { Navbar } from '@/components/ui/organism/Navbar';
import { PeopleSection } from '@/components/ui/organism/PeopleSection';
import { TestimonialStatistics } from '@/components/ui/organism/TestimonialStatistics';
import type { PageFixtures } from '@/mocks/page';
import type { NavigationItem } from '@/types/navigation';
import styles from './LandingPageTemplate.module.css';

export interface LandingPageTemplateProps {
  data: PageFixtures;
  activeHref?: string;
  navigationNotice: string;
  onNavigate: (item: NavigationItem) => void;
  onContactSubmit: (values: ContactValues) => Promise<void>;
  onDismissNotice: () => void;
  onClickCapture: MouseEventHandler<HTMLDivElement>;
  onClick: MouseEventHandler<HTMLDivElement>;
}

function focusClassName(className?: string) {
  return [styles.focusTarget, className].filter(Boolean).join(' ');
}

export function LandingPageTemplate({
  data,
  activeHref,
  navigationNotice,
  onNavigate,
  onContactSubmit,
  onDismissNotice,
  onClickCapture,
  onClick,
}: LandingPageTemplateProps) {
  return (
    <div className="min-w-0" onClickCapture={onClickCapture} onClick={onClick}>
      <Navbar {...data.navbar} activeHref={activeHref} onNavigate={onNavigate} />
      <main
        id="main-content"
        tabIndex={-1}
        aria-label="Luma learning"
        className={styles.focusTarget}
      >
        <Hero
          {...data.hero}
          id="intro"
          aria-label={data.hero.heading.title}
          tabIndex={-1}
          className={focusClassName(data.hero.className)}
          onAction={onNavigate}
        />
        <CategoriesSection
          {...data.categories}
          id="courses"
          tabIndex={-1}
          className={styles.focusTarget}
        />
        <FeaturedCourse
          {...data.featuredCourse}
          id="course-details"
          tabIndex={-1}
          className={focusClassName(data.featuredCourse.className)}
          onAction={onNavigate}
        />
        <HowItWorksSection
          heading={data.howItWorks.heading}
          steps={data.howItWorks.steps}
          mobileDescriptions={data.howItWorks.mobileSteps.map((step) => step.description)}
          id="how-it-works"
          tabIndex={-1}
          className={styles.focusTarget}
        />
        <TestimonialStatistics
          {...data.testimonialStatistics}
          id="testimonials"
          tabIndex={-1}
          className={focusClassName(data.testimonialStatistics.className)}
        />
        <PeopleSection
          {...data.people}
          id="people"
          tabIndex={-1}
          className={focusClassName(data.people.className)}
          onAction={onNavigate}
        />
        <section
          id="contact"
          aria-label={data.contact.heading.title}
          tabIndex={-1}
          className={`${styles.contact} ${styles.focusTarget}`}
        >
          <div className={styles.contactLayout}>
            <div className={styles.contactCopy}>
              <SectionHeading {...data.contact.heading} variant="contact" />
              <div className={styles.contactCards}>
                {data.contact.cards.map((card, index) => (
                  <ContactInfoCard {...card} key={`${card.label}-${index}`} />
                ))}
              </div>
            </div>
            <ContactForm
              {...data.contact.form}
              id="contact-form"
              tabIndex={-1}
              className={`${styles.contactForm} ${styles.focusTarget}`}
              onSubmit={onContactSubmit}
            />
          </div>
        </section>
        <FinalCTA
          {...data.finalCTA}
          id="learn-next"
          tabIndex={-1}
          className={focusClassName(data.finalCTA.className)}
          onAction={onNavigate}
        />
      </main>
      <Footer {...data.footer} onNavigate={onNavigate} />
      <div className={navigationNotice ? styles.notice : 'sr-only'}>
        <Typography role="status" aria-live="polite" aria-atomic className="min-w-0 wrap-anywhere">
          {navigationNotice}
        </Typography>
        {navigationNotice && (
          <Button variant="icon" aria-label="Dismiss demo notice" onClick={onDismissNotice}>
            <Icon name="close" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default LandingPageTemplate;
