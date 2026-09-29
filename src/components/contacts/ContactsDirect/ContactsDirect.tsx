import {
  ADDRESS,
  EMAIL,
  MESSENGERS,
  PHONE,
  PHONE_2,
  PHONE_2_HREF,
  PHONE_HREF,
  SCHEDULE,
} from '@/lib/siteContent';
import { Icon } from '../icons';
import { ContactsForm } from './ContactsForm';
import styles from './ContactsDirect.module.scss';

export function ContactsDirect(): React.JSX.Element {
  return (
    // id="contact" keeps the header's «Залишити заявку» link (#contact) working on this page.
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div>
          <h2 className={styles.eyebrow}>Прямі контакти</h2>
          <dl className={styles.list}>
            <div>
              <dt className={styles.label}>Адреса офісу продажу</dt>
              <dd className={styles.value}>{ADDRESS}</dd>
            </div>
            <div>
              <dt className={styles.label}>Графік роботи</dt>
              <dd className={styles.value}>{SCHEDULE}</dd>
            </div>
            <div>
              <dt className={styles.label}>Телефони</dt>
              <dd className={styles.value}>
                <a href={PHONE_HREF}>{PHONE}</a> · <a href={PHONE_2_HREF}>{PHONE_2}</a>
              </dd>
              <dd className={styles.note}>На обох — Viber, Telegram, WhatsApp</dd>
            </div>
            <div>
              <dt className={styles.label}>Email</dt>
              <dd className={styles.value}>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </dd>
            </div>
          </dl>

          <h3 className={`${styles.eyebrow} ${styles.eyebrowMuted}`}>Месенджери</h3>
          <div className={styles.socials}>
            {MESSENGERS.map((m) => (
              <a
                key={m.label}
                href={m.href}
                className={styles.social}
                aria-label={m.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name={m.label} />
              </a>
            ))}
          </div>
        </div>

        <ContactsForm />
      </div>
    </section>
  );
}
