import type { CategoryCardProps } from '@/components/ui/molecules/CategoryCard/CategoryCard.types';

export const categoriesMock = [
  {
    numberLabel: '01',
    title: 'Product Design',
    description: 'Turn complex problems into clear, useful experiences.',
    actionLabel: 'Explore',
    href: '#product-design',
  },
  {
    numberLabel: '02',
    title: 'Technology',
    description: 'Build a stronger understanding of the tools shaping digital products.',
    actionLabel: 'Explore',
    href: '#technology',
  },
  {
    numberLabel: '03',
    title: 'Business',
    description: 'Develop practical skills for better decisions and stronger teams.',
    actionLabel: 'Explore',
    href: '#business',
  },
  {
    numberLabel: '04',
    title: 'Creative',
    description: 'Explore new ways to communicate, create and tell stories.',
    actionLabel: 'Explore',
    href: '#creative',
  },
] satisfies readonly CategoryCardProps[];
