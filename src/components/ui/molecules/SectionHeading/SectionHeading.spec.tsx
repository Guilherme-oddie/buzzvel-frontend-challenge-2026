import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '@/components/ui/atoms/Button';
import { SectionHeading, type SectionHeadingProps } from '.';

const content = {
  eyebrow: 'Explore your next step',
  title: 'Build practical skills',
  description: 'Learn at your own pace with flexible courses.',
};

describe('SectionHeading', () => {
  it.each([
    { name: 'default props', props: content },
    { name: 'only a title', props: { title: content.title } },
    {
      name: 'hero with h4 semantics',
      props: { ...content, variant: 'hero', headingAs: 'h4' },
    },
    {
      name: 'centered inverse featured content',
      props: { ...content, variant: 'featured', align: 'center', tone: 'inverse' },
    },
    {
      name: 'people, actions and native props',
      props: {
        ...content,
        variant: 'people',
        id: 'learning-intro',
        role: 'group',
        'aria-label': 'Learning introduction',
        className: 'max-w-xl',
        actions: <Button href="#courses">Explore courses</Button>,
      },
    },
    { name: 'contact content', props: { ...content, variant: 'contact' } },
    {
      name: 'centered call to action',
      props: {
        variant: 'cta',
        align: 'center',
        title: 'What will you learn next?',
        description: 'Start with one course. Build from there.',
        actions: (
          <>
            <Button>Explore all courses</Button>
            <Button variant="secondary">Join Luma</Button>
          </>
        ),
      },
    },
  ] satisfies readonly { name: string; props: SectionHeadingProps }[])(
    'renders with $name',
    ({ props }) => {
      const { asFragment } = render(<SectionHeading {...props} />);

      expect(asFragment()).toMatchSnapshot();
    },
  );
});
