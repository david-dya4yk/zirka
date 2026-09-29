'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS, PHONE, PHONE_HREF } from '@/lib/siteContent';
import styles from './SiteNav.module.scss';

export function SiteNav(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/logo-ondark.png" alt="ЗІРКА" width={45} height={38} preload />
        </Link>

        <nav className={styles.links} aria-label="Головна навігація">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.link}
              aria-current={link.href === pathname ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.aside}>
          <a href={PHONE_HREF} className={styles.phone}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFC003"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.74a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {PHONE}
          </a>
          <Button href="#contact" size="sm">
            Залишити заявку
          </Button>
          <button
            type="button"
            className={styles.toggle}
            aria-label="Меню"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => {
              setMenuOpen((open) => !open);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className={styles.mobileMenu} aria-label="Мобільна навігація">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.mobileLink}
              aria-current={link.href === pathname ? 'page' : undefined}
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              {link.label}
            </Link>
          ))}
          <a href={PHONE_HREF} className={styles.mobilePhone}>
            {PHONE}
          </a>
        </nav>
      )}
    </header>
  );
}
