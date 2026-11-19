import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { learningStepsMock } from '@/mocks/learningSteps';
import { LearningStepCard, type LearningStepCardProps } from '.';

describe('LearningStepCard', () => {
  it.each([
    { name: 'default props', props: { ...learningStepsMock[0], variant: undefined } },
    {
      name: 'custom content, variant, heading and native props',
      props: {
        ...learningStepsMock[1],
        stepLabel: 'Step 04',
        title: 'Build your own project',
        description: <strong>Put your new skills to work in a personal project.</strong>,
        headingAs: 'h4',
        id: 'project-step',
        className: 'max-w-sm',
        role: 'group',
        'aria-label': 'Project step',
      },
    },
  ] satisfies readonly { name: string; props: LearningStepCardProps }[])(
    'renders with $name',
    ({ props }) => {
      const { asFragment } = render(<LearningStepCard {...props} />);

      expect(asFragment()).toMatchSnapshot();
    },
  );
});
