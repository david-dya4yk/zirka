import Image from 'next/image';
import Link from 'next/link';
import { ADDRESS, EMAIL, NAV_LINKS, PHONE, PHONE_HREF } from '@/lib/siteContent';
import styles from './SiteFooter.module.scss';

export function SiteFooter(): React.JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Image
            className={styles.logo}
            src="/images/logo-ondark.png"
            alt="ЗІРКА — приватна виробничо-комерційна фірма"
            width={90}
            height={76}
          />
          <div className={styles.columns}>
            <nav className={styles.column} aria-label="Навігація у футері">
              <p className={styles.heading}>Навігація</p>
              {NAV_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className={styles.item}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <address className={styles.column}>
              <p className={styles.heading}>Контакти</p>
              <a href={PHONE_HREF} className={`${styles.item} ${styles.mono}`}>
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className={`${styles.item} ${styles.mono}`}>
                {EMAIL}
              </a>
              <span className={styles.item}>{ADDRESS}</span>
            </address>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© 2005–2026 ПВКФ «ЗІРКА» · Чернівці</span>
          <div className={styles.legal}>
            <Link href="/public-info" className={styles.legalLink}>
              Публічна інформація
            </Link>
            <span>Правова інформація</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
