import type { NavigationItem } from '@/types/navigation';

const pageDestinations = new Set([
  '#top',
  '#main-content',
  '#courses',
  '#course-details',
  '#how-it-works',
  '#testimonials',
  '#people',
  '#contact',
  '#contact-form',
  '#learn-next',
]);

const categoryDestinations = new Set(['#product-design', '#technology', '#business', '#creative']);

export function getDemoNotice(item: NavigationItem): string {
  return 'demoNotice' in item && typeof item.demoNotice === 'string' ? item.demoNotice : '';
}

export function resolveDemoLink<T extends NavigationItem>(item: T): T & { demoNotice?: string } {
  let href = item.href;
  let demoNotice: string | undefined;

  if (/^mailto:/i.test(href)) {
    href = '#contact-form';
    demoNotice = 'Email is disabled in this demo. Use the demo contact form instead.';
  } else if (categoryDestinations.has(href)) {
    href = '#course-details';
    demoNotice = `${item.label}: the full catalog is outside this demo. Showing the featured course preview instead.`;
  } else if (pageDestinations.has(href)) {
    if (href === '#course-details' && !getDemoNotice(item)) {
      demoNotice = 'This demo shows a course preview. Course enrollment is not available.';
    }
  } else {
    switch (href) {
      case '/':
        href = '#top';
        break;
      case '#categories':
        href = '#courses';
        break;
      case '#start-learning':
        href = '#courses';
        demoNotice = 'Course enrollment is not available in this demo. Explore the sample courses.';
        break;
      case '#community':
        href = '#people';
        break;
      case '#instructors':
        href = '#people';
        demoNotice =
          'Meet the sample learning community. Instructor profiles are outside this demo.';
        break;
      case '#about':
        href = '#testimonials';
        demoNotice =
          'Learn about Luma through sample learner feedback and statistics in this demo.';
        break;
      case '#for-teams':
        href = '#contact';
        demoNotice = 'Team learning is outside this demo. Use the demo form to try a team enquiry.';
        break;
      default:
        if (href.startsWith('#')) {
          href = '#contact';
          demoNotice = `${item.label} is not available in this demo. Try the contact form instead.`;
        }
    }
  }

  return { ...item, href, ...(demoNotice ? { demoNotice } : {}) };
}
