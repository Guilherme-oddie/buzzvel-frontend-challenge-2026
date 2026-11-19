import type { TypographyVariant } from '@/components/ui/atoms/Typography';

export interface TypographyMetrics {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}

export interface TypographySample {
  variant: TypographyVariant;
  text: string;
  fontFamily: 'Inter' | 'Plus Jakarta Sans';
  fontWeight: 400 | 600 | 700 | 800;
  desktop: TypographyMetrics;
  mobile: TypographyMetrics;
  note?: string;
}

export const typographySamples: readonly TypographySample[] = [
  {
    variant: 'h1',
    text: 'Build skills that open new doors.',
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: 800,
    desktop: { fontSize: 64, lineHeight: 70, letterSpacing: -1.6 },
    mobile: { fontSize: 40, lineHeight: 44, letterSpacing: -1 },
  },
  {
    variant: 'h2',
    text: 'Learn at your own pace.',
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: 800,
    desktop: { fontSize: 56, lineHeight: 64, letterSpacing: -1.4 },
    mobile: { fontSize: 36, lineHeight: 40, letterSpacing: -0.9 },
  },
  {
    variant: 'h3',
    text: 'Find your next learning path.',
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: 800,
    desktop: { fontSize: 48, lineHeight: 56, letterSpacing: -1.2 },
    mobile: { fontSize: 32, lineHeight: 36, letterSpacing: -0.8 },
  },
  {
    variant: 'h4',
    text: 'Take the next step in your learning journey.',
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: 800,
    desktop: { fontSize: 40, lineHeight: 48, letterSpacing: -1.1 },
    mobile: { fontSize: 28, lineHeight: 32, letterSpacing: -0.75 },
    note: 'Named styles Desktop/H4 (4:1093) and Mobile/H4 (4:1094).',
  },
  {
    variant: 'h5',
    text: 'Build confidence with every lesson.',
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: 700,
    desktop: { fontSize: 20, lineHeight: 32, letterSpacing: 0 },
    mobile: { fontSize: 20, lineHeight: 28, letterSpacing: 0 },
  },
  {
    variant: 'subtitle1',
    text: 'Practical lessons for your next step.',
    fontFamily: 'Inter',
    fontWeight: 400,
    desktop: { fontSize: 18, lineHeight: 28, letterSpacing: 0 },
    mobile: { fontSize: 16, lineHeight: 26, letterSpacing: 0 },
  },
  {
    variant: 'subtitle2',
    text: 'Every course includes practical exercises designed to turn knowledge into action.',
    fontFamily: 'Inter',
    fontWeight: 400,
    desktop: { fontSize: 16, lineHeight: 28, letterSpacing: 0 },
    mobile: { fontSize: 14, lineHeight: 24, letterSpacing: 0 },
  },
  {
    variant: 'quotes',
    text: 'The lessons helped me turn new ideas into practical skills.',
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: 600,
    desktop: { fontSize: 30, lineHeight: 44, letterSpacing: -0.75 },
    mobile: { fontSize: 20, lineHeight: 32, letterSpacing: 0 },
    note: 'Named styles Desktop/quotes (7:1307) and Mobile/quotes (18:712).',
  },
  {
    variant: 'body1',
    text: 'Learn from experienced teachers through practical, flexible courses.',
    fontFamily: 'Inter',
    fontWeight: 400,
    desktop: { fontSize: 14, lineHeight: 24, letterSpacing: 0 },
    mobile: { fontSize: 14, lineHeight: 24, letterSpacing: 0 },
  },
  {
    variant: 'overline',
    text: 'Explore your next step',
    fontFamily: 'Inter',
    fontWeight: 600,
    desktop: { fontSize: 12, lineHeight: 16, letterSpacing: 1.44 },
    mobile: { fontSize: 12, lineHeight: 16, letterSpacing: 1.44 },
  },
  {
    variant: 'caption',
    text: 'Supporting details and course information.',
    fontFamily: 'Inter',
    fontWeight: 400,
    desktop: { fontSize: 13, lineHeight: 19.5, letterSpacing: 0 },
    mobile: { fontSize: 13, lineHeight: 19.5, letterSpacing: 0 },
    note: 'Local alias for the unnamed footer text style in Figma.',
  },
];

export const typographyPlaygroundText = 'A little learning can lead to something great.';

export const typographyLongText = {
  heading: 'Make room for the skills, ideas and experiences that will shape your next chapter.',
  body: 'Learning should fit the way you live. Explore practical lessons, return to the topics that matter to you and build confidence one step at a time. This longer paragraph helps review wrapping, reading rhythm and available space as the canvas becomes narrower.',
};
