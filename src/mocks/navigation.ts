import type { NavbarProps } from '@/components/ui/organism/Navbar';

export const navbarMock = {
  brandHref: '#top',
  links: [
    { label: 'Courses', href: '#courses' },
    { label: 'For Teams', href: '#for-teams' },
    { label: 'Community', href: '#community' },
    { label: 'About', href: '#about' },
  ],
  secondaryAction: { label: 'Log in', href: '#login' },
  primaryAction: { label: 'Start learning', href: '#start-learning' },
} satisfies NavbarProps;
