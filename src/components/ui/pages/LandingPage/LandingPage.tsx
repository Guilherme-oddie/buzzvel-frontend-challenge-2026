'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from 'react';
import type { ContactValues } from '@/components/ui/organism/ContactForm';
import { LandingPageTemplate } from '@/components/ui/templates/LandingPageTemplate';
import { getDemoNotice, resolveDemoLink } from '@/lib/pageNavigation';
import { createContactSubmissionMock } from '@/mocks/contactSubmission';
import { pageMock, type PageFixtures } from '@/mocks/page';
import type { NavigationItem } from '@/types/navigation';

export interface LandingPageProps {
  fixtures?: PageFixtures;
  onContactSubmit?: (values: ContactValues) => Promise<void>;
  preview?: boolean;
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  window.addEventListener('popstate', onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener('popstate', onChange);
  };
}

function readHash() {
  return window.location.hash;
}

function serverHash() {
  return '';
}

function focusAnchor(hash: string, scroll = false) {
  const anchor = document.getElementById(hash.slice(1));
  const target = hash === '#top' ? document.getElementById('main-content') : anchor;
  if (!target) return;
  if (scroll) (anchor ?? target).scrollIntoView?.({ block: 'start', behavior: 'auto' });
  target.focus({ preventScroll: true });
}

export function LandingPage({
  fixtures = pageMock,
  onContactSubmit,
  preview = false,
}: LandingPageProps) {
  const locationHash = useSyncExternalStore(subscribeToHash, readHash, serverHash);
  const [previewHash, setPreviewHash] = useState('');
  const [navigationVersion, setNavigationVersion] = useState(0);
  const [navigationNotice, setNavigationNotice] = useState('');
  const [defaultSubmit] = useState(() => createContactSubmissionMock());
  const pendingNavigation = useRef<NavigationItem | undefined>(undefined);
  const hash = preview ? previewHash : locationHash;

  const recordNavigation = useCallback((item: NavigationItem) => {
    pendingNavigation.current = item;
  }, []);

  const data = useMemo<PageFixtures>(
    () => ({
      ...fixtures,
      navbar: {
        ...fixtures.navbar,
        brandHref: resolveDemoLink({ label: 'Luma home', href: fixtures.navbar.brandHref ?? '/' })
          .href,
        links: fixtures.navbar.links.map((link) => resolveDemoLink(link)),
        primaryAction: resolveDemoLink(fixtures.navbar.primaryAction),
        secondaryAction: fixtures.navbar.secondaryAction
          ? resolveDemoLink(fixtures.navbar.secondaryAction)
          : undefined,
      },
      hero: {
        ...fixtures.hero,
        actions: fixtures.hero.actions?.map((action) => resolveDemoLink(action)),
      },
      categories: {
        ...fixtures.categories,
        items: fixtures.categories.items.map((item) => {
          const link = resolveDemoLink({ label: item.title, href: item.href });
          return {
            ...item,
            href: link.href,
            onClick: (event: MouseEvent<HTMLAnchorElement>) => {
              item.onClick?.(event);
              if (!event.defaultPrevented) recordNavigation(link);
            },
          };
        }),
      },
      featuredCourse: {
        ...fixtures.featuredCourse,
        actions: fixtures.featuredCourse.actions?.map((action) => resolveDemoLink(action)),
      },
      people: {
        ...fixtures.people,
        action: fixtures.people.action ? resolveDemoLink(fixtures.people.action) : undefined,
      },
      contact: {
        ...fixtures.contact,
        cards: fixtures.contact.cards.map((card) => {
          if (!card.href) return card;
          const link = resolveDemoLink({ label: card.value, href: card.href });
          return {
            ...card,
            href: link.href,
            onClick: (event: MouseEvent<HTMLDivElement>) => {
              card.onClick?.(event);
              if (!event.defaultPrevented) recordNavigation(link);
            },
          };
        }),
      },
      finalCTA: {
        ...fixtures.finalCTA,
        actions: fixtures.finalCTA.actions?.map((action) => resolveDemoLink(action)),
      },
      footer: {
        ...fixtures.footer,
        brandHref: resolveDemoLink({ label: 'Luma home', href: fixtures.footer.brandHref ?? '/' })
          .href,
        groups: fixtures.footer.groups.map((group) => ({
          ...group,
          links: group.links.map((link) => resolveDemoLink(link)),
        })),
      },
    }),
    [fixtures, recordNavigation],
  );

  useEffect(() => {
    if (!hash) return;
    const frame = window.requestAnimationFrame(() => {
      if (hash === '#top' || document.getElementById(hash.slice(1))) {
        focusAnchor(hash, preview);
        return;
      }
      const fallback = resolveDemoLink({ label: 'This destination', href: hash });
      if (!fallback.href.startsWith('#') || !document.getElementById(fallback.href.slice(1)))
        return;
      setNavigationNotice(getDemoNotice(fallback));
      if (preview) setPreviewHash(fallback.href);
      else {
        window.history.replaceState(window.history.state, '', fallback.href);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
      focusAnchor(fallback.href, true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash, navigationVersion, preview]);

  async function handleContactSubmit(values: ContactValues) {
    await (onContactSubmit ?? defaultSubmit)(values);
    if (preview) return;

    console.info('Demo contact submission completed:', values);
    const labels = fixtures.contact.form.labels;
    window.alert(
      [
        labels?.success ?? 'Demo submission complete.',
        '',
        `${labels?.fullName ?? 'Full name'}: ${values.fullName}`,
        `${labels?.email ?? 'Email'}: ${values.email}`,
        `${labels?.question ?? 'Your question'}: ${values.question}`,
      ].join('\n'),
    );
  }

  function handlePageClick(event: MouseEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link =
      event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const href = link.getAttribute('href') ?? '';
    if (!href.startsWith('#')) return;

    setNavigationNotice(pendingNavigation.current ? getDemoNotice(pendingNavigation.current) : '');
    if (preview) {
      event.preventDefault();
      setPreviewHash(href);
    }
    setNavigationVersion((version) => version + 1);
  }

  const activeHref =
    hash === '#course-details'
      ? '#courses'
      : ['#top', '#courses', '#people', '#testimonials'].includes(hash)
        ? hash
        : undefined;

  return (
    <LandingPageTemplate
      data={data}
      activeHref={activeHref}
      navigationNotice={navigationNotice}
      onNavigate={recordNavigation}
      onContactSubmit={handleContactSubmit}
      onDismissNotice={() => {
        setNavigationNotice('');
        focusAnchor(hash || '#main-content');
      }}
      onClickCapture={() => {
        pendingNavigation.current = undefined;
      }}
      onClick={handlePageClick}
    />
  );
}

export default LandingPage;
