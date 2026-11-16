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
