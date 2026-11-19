import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrandLogo, type BrandLogoProps } from '.';

describe('BrandLogo', () => {
  it.each([
    { name: 'default tone', props: {} },
    { name: 'inverse tone', props: { tone: 'inverse' } },
  ] satisfies readonly { name: string; props: BrandLogoProps }[])(
    'renders with $name',
    ({ props }) => {
      const { asFragment } = render(<BrandLogo {...props} />);

      expect(asFragment()).toMatchSnapshot();
    },
  );
});
