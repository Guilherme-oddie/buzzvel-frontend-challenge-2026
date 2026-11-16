'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { BrandLogo } from '@/components/ui/atoms/BrandLogo';
import { Button } from '@/components/ui/atoms/Button';
import { Icon } from '@/components/ui/atoms/Icon';
import { NavigationList } from '@/components/ui/molecules/NavigationList';
import type { NavigationItem } from '@/types/navigation';

export interface NavbarProps {
  links: readonly NavigationItem[];
  primaryAction: NavigationItem;
  secondaryAction?: NavigationItem;
  brandHref?: string;
  activeHref?: string;
  onNavigate?: (item: NavigationItem) => void;
}

const desktopMediaQuery = '(min-width: 960px)';

export function Navbar({
  links,
  primaryAction,
  secondaryAction,
  brandHref = '/',
  activeHref,
  onNavigate,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuId = useId();

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopMediaQuery);
    const closeOnDesktop = () => {
      if (mediaQuery.matches) setIsMenuOpen(false);
    };

    mediaQuery.addEventListener('change', closeOnDesktop);
    return () => mediaQuery.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [isMenuOpen]);

  function selectItem(item: NavigationItem) {
    setIsMenuOpen(false);
    onNavigate?.(item);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && isMenuOpen) {
      event.preventDefault();
      setIsMenuOpen(false);
      toggleRef.current?.focus();
    }
  }

  return (
    <header
      ref={headerRef}
      className="relative z-30 border-b border-line bg-surface"
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsMenuOpen(false);
      }}
    >
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-5 min-[960px]:grid min-[960px]:h-17.25 min-[960px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[960px]:px-[clamp(24px,6.25vw,80px)]">
        <a
          href={brandHref}
          aria-label="Luma home"
          aria-current={activeHref === brandHref ? 'location' : undefined}
          className="inline-flex min-h-11 w-fit items-center rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          onClick={() => setIsMenuOpen(false)}
        >
          <BrandLogo />
        </a>

        <nav aria-label="Main navigation" className="hidden min-[960px]:block">
          <NavigationList items={links} activeHref={activeHref} onSelect={selectItem} />
        </nav>

        <div className="hidden items-center gap-2 justify-self-end min-[960px]:flex">
          {secondaryAction && (
            <Button
              href={secondaryAction.href}
              variant="text"
              aria-current={activeHref === secondaryAction.href ? 'location' : undefined}
              className="px-4 py-2.5 aria-[current=location]:text-primary aria-[current=location]:hover:text-primary"
              onClick={() => selectItem(secondaryAction)}
            >
              {secondaryAction.label}
            </Button>
          )}
          <Button
            href={primaryAction.href}
            size="compact"
            aria-current={activeHref === primaryAction.href ? 'location' : undefined}
            className="aria-[current=location]:bg-ink"
            onClick={() => selectItem(primaryAction)}
          >
            {primaryAction.label}
          </Button>
        </div>

        <Button
          ref={toggleRef}
          variant="icon"
          className="min-[960px]:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls={mobileMenuId}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} />
        </Button>
      </div>

      {isMenuOpen && (
        <nav
          id={mobileMenuId}
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full border-b border-line bg-surface px-5 pb-5 shadow-[0_12px_24px_-16px_rgba(23,27,44,0.2)] min-[960px]:hidden"
        >
          <NavigationList
            items={links}
            orientation="vertical"
            activeHref={activeHref}
            onSelect={selectItem}
          />
          <div className="mt-4 flex items-center justify-end gap-2">
            {secondaryAction && (
              <Button
                href={secondaryAction.href}
                variant="text"
                aria-current={activeHref === secondaryAction.href ? 'location' : undefined}
                className="px-4 py-2.5 aria-[current=location]:text-primary aria-[current=location]:hover:text-primary"
                onClick={() => selectItem(secondaryAction)}
              >
                {secondaryAction.label}
              </Button>
            )}
            <Button
              href={primaryAction.href}
              size="compact"
              aria-current={activeHref === primaryAction.href ? 'location' : undefined}
              className="aria-[current=location]:bg-ink"
              onClick={() => selectItem(primaryAction)}
            >
              {primaryAction.label}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
