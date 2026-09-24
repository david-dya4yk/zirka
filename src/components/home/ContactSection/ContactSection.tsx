'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import styles from './ContactSection.module.scss';

export function ContactSection(): React.JSX.Element {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div>
          <h2 className={styles.title}>Готові до нової квартири?</h2>
          <p className={styles.lead}>Залиште заявку — покажемо квартири, документи та проєкти.</p>
          <div className={styles.photo}>
            <Image
              src="/images/contact.jpg"
              alt="ЖК від ПВКФ «ЗІРКА»"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </div>
        </div>

        {/* TODO: wire submission to a lead endpoint — no backend exists yet. */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={styles.fields}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>
                Імʼя <span className={styles.required}>*</span>
              </span>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                placeholder="Ваше імʼя"
                autoComplete="given-name"
                required
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Прізвище</span>
              <input
                className={styles.input}
                type="text"
                name="lastName"
                placeholder="Ваше прізвище"
                autoComplete="family-name"
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Email</span>
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="name@email.com"
                autoComplete="email"
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>
                Телефон <span className={styles.required}>*</span>
              </span>
              <input
                className={styles.input}
                type="tel"
                name="phone"
                placeholder="+380 __ ___ __ __"
                autoComplete="tel"
                required
              />
            </label>
            <label className={`${styles.field} ${styles.fieldWide}`}>
              <span className={styles.fieldLabel}>Повідомлення</span>
              <textarea
                className={styles.textarea}
                name="message"
                rows={4}
                placeholder="Проєкт, кількість кімнат, бюджет…"
              />
            </label>
          </div>

          <div className={styles.submitRow}>
            <label className={styles.consent}>
              <input type="checkbox" name="consent" required />
              Погоджуюсь з політикою конфіденційності
            </label>
            <Button type="submit" size="lg">
              Надіслати
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
