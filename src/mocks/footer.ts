import type { FooterProps } from '@/components/ui/organism/Footer';

export const footerMock = {
  brandHref: '#top',
  tagline: 'Practical learning for curious people.',
  copyright: '© 2026 Luma Learning',
  groups: [
    {
      title: 'Explore',
      links: [
        { label: 'Courses', href: '#courses' },
        { label: 'Categories', href: '#categories' },
        { label: 'Instructors', href: '#instructors' },
        { label: 'For Teams', href: '#for-teams' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Careers', href: '#careers' },
        { label: 'Journal', href: '#journal' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#help-center' },
        { label: 'Contact', href: '#contact' },
        { label: 'Terms', href: '#terms' },
        { label: 'Privacy', href: '#privacy' },
      ],
    },
  ],
} satisfies FooterProps;
