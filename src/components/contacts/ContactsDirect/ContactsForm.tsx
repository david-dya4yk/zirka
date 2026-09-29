'use client';

import { useActionState } from 'react';
import { type LeadFormState, sendLead } from '@/app/actions/sendLead';
import styles from './ContactsDirect.module.scss';

const INITIAL_STATE: LeadFormState = { status: 'idle', message: '' };

const INTERESTS = [
  'Квартира у ЖК на Хотинській',
  'Квартира у зданому ЖК',
  'Документи по обʼєкту',
  'Інше питання',
] as const;

export function ContactsForm(): React.JSX.Element {
  const [state, formAction, isPending] = useActionState(sendLead, INITIAL_STATE);
  const sent = state.status === 'success';

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="origin" value="contacts" />
      {/* Honeypot for bots — hidden from people and assistive tech. */}
      <input
        className={styles.honeypot}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <h2 className={styles.formTitle}>Залиште номер — передзвонимо</h2>
      <p className={styles.formLead}>
        Менеджер зв&apos;яжеться у робочий час. Без розсилок і нав&apos;язування.
      </p>

      <input
        className={styles.input}
        type="text"
        name="firstName"
        placeholder="Ваше ім'я"
        aria-label="Ваше ім'я"
        autoComplete="name"
        required
      />
      <input
        className={styles.input}
        type="tel"
        name="phone"
        placeholder="Телефон"
        aria-label="Телефон"
        autoComplete="tel"
        required
      />
      <select className={styles.input} name="interest" aria-label="Що цікавить" defaultValue="">
        <option value="">Що цікавить</option>
        {INTERESTS.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <textarea
        className={`${styles.input} ${styles.textarea}`}
        name="message"
        rows={3}
        placeholder="Повідомлення (необов'язкове)"
        aria-label="Повідомлення"
      />

      <label className={styles.consent}>
        <input type="checkbox" name="consent" required />
        <span>Погоджуюсь на обробку персональних даних</span>
      </label>

      {!sent && (
        <button type="submit" className={styles.submit} disabled={isPending}>
          {isPending ? 'Надсилаємо…' : 'Замовити дзвінок'}
        </button>
      )}
      <p
        className={`${styles.status} ${state.status === 'error' ? styles.statusError : ''}`}
        role="status"
        aria-live="polite"
      >
        {sent ? 'Дякуємо! Менеджер зателефонує найближчим часом.' : state.message}
      </p>

      <p className={styles.formNote}>
        Відповідаємо у робочий час. Деталі обробки даних — у Політиці конфіденційності.
      </p>
    </form>
  );
}
