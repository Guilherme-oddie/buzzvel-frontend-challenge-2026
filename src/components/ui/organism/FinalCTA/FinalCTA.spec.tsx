import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { finalCTAMock } from '@/mocks/finalCTA';
import { FinalCTA } from '.';

describe('FinalCTA', () => {
  it('renders the complete fixture', () => {
    const { asFragment } = render(<FinalCTA {...finalCTAMock} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts heading semantics, optional content and native props', () => {
    render(
      <FinalCTA
        heading={{ title: 'Choose your next skill', headingAs: 'h3' }}
        avatars={[]}
        id="next-skill"
        className="custom-section"
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Choose your next skill', level: 3 }),
    ).toMatchSnapshot();
    expect(screen.getByRole('region', { name: 'Choose your next skill' })).toHaveAttribute(
      'id',
      'next-skill',
    );
    expect(screen.getByRole('region', { name: 'Choose your next skill' })).toHaveClass(
      'custom-section',
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'Learner portraits' })).not.toBeInTheDocument();
  });

  it('reports the configured action while preserving its destination', async () => {
    const onAction = vi.fn();
    render(<FinalCTA {...finalCTAMock} onAction={onAction} />);
    const action = screen.getByRole('link', { name: finalCTAMock.actions[0].label });

    await userEvent.click(action);

    expect(action).toHaveAttribute('href', finalCTAMock.actions[0].href);
    expect(onAction).toHaveBeenCalledExactlyOnceWith(finalCTAMock.actions[0]);
  });
});
