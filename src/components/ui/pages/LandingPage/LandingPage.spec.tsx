import { act, cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { contactValuesMock } from '@/mocks/contact';
import { createContactSubmissionMock } from '@/mocks/contactSubmission';
import { pageMock, type PageFixtures } from '@/mocks/page';
import { LandingPage } from '.';

const filledFixtures: PageFixtures = {
  ...pageMock,
  contact: {
    ...pageMock.contact,
    form: { ...pageMock.contact.form, defaultValues: contactValuesMock },
  },
};

describe('LandingPage', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
    document.body.id = 'top';
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
      window.setTimeout(() => callback(performance.now()), 0),
    );
    vi.stubGlobal('cancelAnimationFrame', (id: number) => window.clearTimeout(id));
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    window.history.replaceState(null, '', '/');
    document.body.removeAttribute('id');
  });

  it('composes the reviewed sections, one H1 and valid local destinations', () => {
    const { container } = render(<LandingPage preview />);
    const main = screen.getByRole('main');

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(main).not.toContainElement(screen.getByRole('banner'));
    expect(main).not.toContainElement(screen.getByRole('contentinfo'));
    expect(Array.from(main.children).map((section) => section.id)).toEqual([
      'intro',
      'courses',
      'course-details',
      'how-it-works',
      'testimonials',
      'people',
      'contact',
      'learn-next',
    ]);
    expect(within(main).getByRole('list', { name: 'Learning steps' }).children).toHaveLength(3);
    for (const link of screen.getAllByRole('link')) {
      const href = link.getAttribute('href')!;
      expect(href).toMatch(/^#/);
      expect(document.getElementById(href.slice(1))).not.toBeNull();
    }
    const ids = Array.from(container.querySelectorAll('[id]'), (element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps preview navigation in place and announces demo destinations', async () => {
    render(<LandingPage preview />);
    const location = window.location.href;
    await userEvent.click(screen.getByRole('link', { name: /Product Design/ }));

    await waitFor(() => expect(document.getElementById('course-details')).toHaveFocus());
    expect(screen.getByText(/the full catalog is outside this demo/)).toHaveAttribute(
      'role',
      'status',
    );
    await userEvent.click(screen.getByRole('link', { name: 'Privacy' }));
    await waitFor(() => expect(document.getElementById('contact')).toHaveFocus());
    expect(screen.getByText(/Privacy is not available in this demo/)).toHaveAttribute(
      'role',
      'status',
    );
    expect(window.location.href).toBe(location);

    await userEvent.click(screen.getByRole('button', { name: 'Dismiss demo notice' }));
    expect(screen.queryByText(/Privacy is not available in this demo/)).not.toBeInTheDocument();
    expect(document.getElementById('contact')).toHaveFocus();
  });

  it('closes mobile navigation, selects the section and moves focus to it', async () => {
    render(<LandingPage preview />);
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const mobileNavigation = within(screen.getByRole('navigation', { name: 'Mobile navigation' }));

    await userEvent.click(mobileNavigation.getByRole('link', { name: 'Courses' }));

    await waitFor(() => expect(document.getElementById('courses')).toHaveFocus());
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
    expect(
      within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('link', {
        name: 'Courses',
      }),
    ).toHaveAttribute('aria-current', 'location');
  });

  it('resolves a bookmarked demo hash to a real section', async () => {
    window.history.replaceState(null, '', '/#careers');
    render(<LandingPage />);

    await waitFor(() => expect(window.location.hash).toBe('#contact'));
    await waitFor(() => expect(document.getElementById('contact')).toHaveFocus());
    expect(screen.getByText(/This destination is not available in this demo/)).toHaveAttribute(
      'role',
      'status',
    );
  });

  it('submits with the default local mock without opening alerts in previews', async () => {
    render(<LandingPage fixtures={filledFixtures} preview />);
    const form = within(screen.getByRole('form', { name: 'Contact us' }));

    await userEvent.click(form.getByRole('button', { name: pageMock.contact.form.labels.submit }));

    await waitFor(
      () => {
        expect(form.getByRole('status')).toHaveTextContent(pageMock.contact.form.labels.success);
      },
      { timeout: 2000 },
    );
    expect(window.alert).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();
  });

  it('logs the submitted values and opens an alert only after success on the page', async () => {
    let completeSubmission!: () => void;
    const onContactSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          completeSubmission = resolve;
        }),
    );
    render(<LandingPage fixtures={filledFixtures} onContactSubmit={onContactSubmit} />);
    const form = within(screen.getByRole('form', { name: 'Contact us' }));
    const labels = pageMock.contact.form.labels;

    await userEvent.click(form.getByRole('button', { name: labels.submit }));
    expect(onContactSubmit).toHaveBeenCalledExactlyOnceWith(contactValuesMock);
    expect(window.alert).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();

    await act(async () => completeSubmission());

    expect(form.getByRole('status')).toHaveTextContent(labels.success);
    expect(console.info).toHaveBeenCalledExactlyOnceWith(
      'Demo contact submission completed:',
      contactValuesMock,
    );
    expect(window.alert).toHaveBeenCalledTimes(1);
    const alertMessage = vi.mocked(window.alert).mock.calls[0][0];
    for (const text of [labels.success, ...Object.values(contactValuesMock)]) {
      expect(alertMessage).toContain(text);
    }
  });

  it('uses an injected failure sequence and permits a successful retry', async () => {
    const onContactSubmit = vi.fn(
      createContactSubmissionMock({ delayMs: 0, outcomes: ['error', 'success'] }),
    );
    render(<LandingPage fixtures={filledFixtures} onContactSubmit={onContactSubmit} />);
    const form = within(screen.getByRole('form', { name: 'Contact us' }));
    const labels = pageMock.contact.form.labels;

    await userEvent.click(form.getByRole('button', { name: labels.submit }));
    expect(await form.findByRole('alert')).toHaveTextContent(labels.error);
    expect(window.alert).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();
    expect(form.getByRole('textbox', { name: labels.email })).toHaveValue(contactValuesMock.email);
    await userEvent.click(form.getByRole('button', { name: labels.submit }));
    await waitFor(() => expect(form.getByRole('status')).toHaveTextContent(labels.success));
    expect(onContactSubmit).toHaveBeenCalledTimes(2);
    expect(onContactSubmit).toHaveBeenLastCalledWith(contactValuesMock);
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledExactlyOnceWith(
      'Demo contact submission completed:',
      contactValuesMock,
    );
  });
});
