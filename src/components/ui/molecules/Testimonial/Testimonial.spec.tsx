import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { testimonialMock } from '@/mocks/testimonial';
import { Testimonial } from '.';

describe('Testimonial', () => {
  it('renders the quote and author fixture with shared typography', () => {
    const { asFragment } = render(<Testimonial {...testimonialMock} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts custom content, an author without a portrait or role and native props', () => {
    const { asFragment } = render(
      <Testimonial
        quote="I can apply what I learn to my own projects."
        author={{ name: 'Jordan Lee' }}
        id="learner-story"
        className="custom-testimonial"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
