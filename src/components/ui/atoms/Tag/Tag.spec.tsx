import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Tag } from '.';

describe('Tag', () => {
  it('renders its label with body1 typography', () => {
    const { asFragment } = render(<Tag>8 lessons</Tag>);

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts custom children, className and native props', () => {
    const { asFragment } = render(
      <Tag id="course-level" className="custom-tag" title="Course difficulty">
        <strong>Intermediate</strong>
      </Tag>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
