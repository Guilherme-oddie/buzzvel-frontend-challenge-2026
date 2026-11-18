import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { peopleSectionMock } from '@/mocks/people';
import { PeopleSection } from '.';

describe('PeopleSection', () => {
  it('renders the complete fixture', () => {
    const { asFragment } = render(<PeopleSection {...peopleSectionMock} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts custom heading semantics, optional action and native props', () => {
    render(
      <PeopleSection
        {...peopleSectionMock}
        heading={{ title: 'Meet our community', headingAs: 'h3' }}
        action={undefined}
        id="community"
        className="custom-section"
        aria-label="Community preview"
      />,
    );

    expect(screen.getByRole('heading', { name: 'Meet our community', level: 3 })).toMatchSnapshot();
    expect(screen.getByRole('region', { name: 'Community preview' })).toHaveAttribute(
      'id',
      'community',
    );
    expect(screen.getByRole('region', { name: 'Community preview' })).toHaveClass('custom-section');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('reports the action while preserving its destination', async () => {
    const onAction = vi.fn();
    render(<PeopleSection {...peopleSectionMock} onAction={onAction} />);
    const action = screen.getByRole('link', { name: peopleSectionMock.action.label });

    await userEvent.click(action);

    expect(action).toHaveAttribute('href', peopleSectionMock.action.href);
    expect(onAction).toHaveBeenCalledExactlyOnceWith(peopleSectionMock.action);
  });
});
