import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { contactCardsMock } from '@/mocks/contact';
import { ContactInfoCard } from '.';

describe('ContactInfoCard', () => {
  it('renders a linked email card', () => {
    const { asFragment } = render(<ContactInfoCard {...contactCardsMock[0]} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts plain content, an icon and native props', () => {
    const { asFragment } = render(
      <ContactInfoCard
        {...contactCardsMock[1]}
        label="Office hours"
        value="Monday to Friday"
        id="hours"
        className="custom-card"
      />,
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
