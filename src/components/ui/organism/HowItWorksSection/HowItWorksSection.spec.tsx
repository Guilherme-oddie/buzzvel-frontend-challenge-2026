import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { pageMock } from '@/mocks/page';
import { HowItWorksSection } from '.';

describe('HowItWorksSection', () => {
  it('renders one ordered list with the complete fixture and responsive descriptions', () => {
    const { asFragment } = render(
      <HowItWorksSection
        heading={pageMock.howItWorks.heading}
        steps={pageMock.howItWorks.steps}
        mobileDescriptions={pageMock.howItWorks.mobileSteps.map((step) => step.description)}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts custom heading semantics and native props without separate mobile copy', () => {
    const { asFragment } = render(
      <HowItWorksSection
        heading={{ title: 'Build a learning habit', headingAs: 'h3' }}
        steps={[
          {
            ...pageMock.howItWorks.steps[0],
            id: 'first-learning-step',
            headingAs: 'h4',
          },
        ]}
        id="learning-process"
        aria-label="Learning process"
        className="custom-section"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
