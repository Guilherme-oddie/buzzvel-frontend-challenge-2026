import { describe, expect, it } from 'vitest';
import { getDemoNotice, resolveDemoLink } from './pageNavigation';

describe('resolveDemoLink', () => {
  it('keeps existing page destinations and ordinary links unchanged', () => {
    for (const href of [
      '#top',
      '#main-content',
      '#courses',
      '#how-it-works',
      '#testimonials',
      '#people',
      '#contact',
      '#contact-form',
      '#learn-next',
      'https://example.com/#courses',
      '/courses',
      'courses?level=beginner',
    ]) {
      expect(resolveDemoLink({ label: 'Explore', href })).toEqual({ label: 'Explore', href });
    }
  });

  it.each([
    ['/', '#top'],
    ['#categories', '#courses'],
    ['#community', '#people'],
  ])('resolves %s to its existing section', (href, destination) => {
    expect(resolveDemoLink({ label: 'Explore', href })).toEqual({
      label: 'Explore',
      href: destination,
    });
  });

  it.each([
    ['#course-details', '#course-details', /preview.*enrollment/],
    ['#start-learning', '#courses', /enrollment/],
    ['#instructors', '#people', /profiles/],
    ['#about', '#testimonials', /feedback and statistics/],
    ['#for-teams', '#contact', /team enquiry/],
  ])('explains the demo behavior of %s', (href, destination, notice) => {
    const result = resolveDemoLink({ label: 'Explore', href });

    expect(result.href).toBe(destination);
    expect(getDemoNotice(result)).toMatch(notice);
  });

  it.each(['#product-design', '#technology', '#business', '#creative'])(
    'shows the featured preview for %s without claiming a filtered catalog',
    (href) => {
      const result = resolveDemoLink({ label: 'Selected category', href });

      expect(result.href).toBe('#course-details');
      expect(getDemoNotice(result)).toContain('Selected category');
      expect(getDemoNotice(result)).toMatch(/full catalog.*outside.*featured course preview/);
      expect(resolveDemoLink(result)).toEqual(result);
    },
  );

  it.each(['#login', '#careers', '#journal', '#help-center', '#terms', '#privacy', '#unknown'])(
    'provides a contact fallback for the unavailable destination %s',
    (href) => {
      const result = resolveDemoLink({ label: 'Requested page', href });

      expect(result.href).toBe('#contact');
      expect(getDemoNotice(result)).toContain('Requested page is not available in this demo');
    },
  );

  it.each(['mailto:contact@luma.com', 'MAILTO:contact@luma.com?subject=Hello'])(
    'routes %s to the demo form instead of an email application',
    (href) => {
      const result = resolveDemoLink({ label: 'Email', href });

      expect(result.href).toBe('#contact-form');
      expect(getDemoNotice(result)).toMatch(/Email is disabled.*contact form/);
    },
  );

  it('preserves additional props and leaves the source fixture untouched', () => {
    const metadata = { source: 'hero' };
    const item = Object.freeze({ label: 'Start learning', href: '#start-learning', metadata });
    const result = resolveDemoLink(item);

    expect(result).not.toBe(item);
    expect(result.metadata).toBe(metadata);
    expect(item).toEqual({ label: 'Start learning', href: '#start-learning', metadata });
    expect(result.href).toBe('#courses');
  });
});

describe('getDemoNotice', () => {
  it('returns only string metadata from a navigation item', () => {
    const item = { label: 'Explore', href: '#courses' };

    expect(getDemoNotice(item)).toBe('');
    expect(getDemoNotice({ ...item, ...{ demoNotice: null } })).toBe('');
    expect(getDemoNotice({ ...item, ...{ demoNotice: 42 } })).toBe('');
    expect(getDemoNotice({ ...item, ...{ demoNotice: 'Demo preview' } })).toBe('Demo preview');
  });
});
