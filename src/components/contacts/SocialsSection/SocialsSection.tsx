// Restore with the social links below: import { Icon } from '../icons'; and SOCIALS from siteContent.
import { REQUISITES } from '@/lib/siteContent';
import styles from './SocialsSection.module.scss';

export function SocialsSection(): React.JSX.Element {
  return (
    <>
      <section className={styles.socials}>
        <div className={styles.socialsInner}>
          <h2 className={styles.title}>Слідкуйте за нами</h2>
          <p className={styles.text}>
            Публікуємо хід будівництва, новини про ЖК, реальні фото з об&apos;єктів.
          </p>
          {/* Social icons hidden until the real profile URLs are known (SOCIALS still has '#').
          <div className={styles.links}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={styles.link}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name={s.label} />
              </a>
            ))}
          </div>
          */}
        </div>
      </section>

      <section className={styles.requisites} aria-labelledby="requisites-title">
        <div className={styles.requisitesInner}>
          <h2 id="requisites-title" className={styles.eyebrow}>
            Реквізити
          </h2>
          <p className={styles.requisitesText}>{REQUISITES}</p>
        </div>
      </section>
    </>
  );
}
