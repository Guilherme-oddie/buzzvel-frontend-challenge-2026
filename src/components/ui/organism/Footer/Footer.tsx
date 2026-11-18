'use client';

import type { HTMLAttributes } from 'react';
import { BrandLogo } from '@/components/ui/atoms/BrandLogo';
import { Button } from '@/components/ui/atoms/Button';
import { Typography } from '@/components/ui/atoms/Typography';
import type { NavigationItem } from '@/types/navigation';
import styles from './Footer.module.css';

export interface FooterLinkGroup {
  title: string;
  links: readonly NavigationItem[];
}

export interface FooterProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  groups: readonly FooterLinkGroup[];
  tagline: string;
  copyright: string;
  brandHref?: string;
  onNavigate?: (item: NavigationItem) => void;
}

export function Footer({
  groups,
  tagline,
  copyright,
  brandHref = '/',
  onNavigate,
  className,
  ...props
}: FooterProps) {
  return (
    <footer {...props} className={[styles.footer, className].filter(Boolean).join(' ')}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.brand}>
            <Button
              href={brandHref}
              variant="text"
              aria-label="Luma home"
              className={styles.brandLink}
              onClick={() => onNavigate?.({ label: 'Luma home', href: brandHref })}
            >
              <BrandLogo tone="inverse" />
            </Button>
            <Typography className={styles.tagline}>{tagline}</Typography>
          </div>
          <nav aria-label="Footer navigation" className={styles.navigation}>
            {groups.map((group, groupIndex) => (
              <div className={styles.group} key={`${group.title}-${groupIndex}`}>
                <Typography as="h2" variant="overline" className="text-on-primary">
                  {group.title}
                </Typography>
                <ul className={styles.links}>
                  {group.links.map((link, linkIndex) => (
                    <li key={`${link.href}-${linkIndex}`} className="min-w-0">
                      <Button
                        href={link.href}
                        variant="text"
                        className={styles.link}
                        onClick={() => onNavigate?.(link)}
                      >
                        {link.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <Typography variant="caption" className={styles.copyright}>
            {copyright}
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
