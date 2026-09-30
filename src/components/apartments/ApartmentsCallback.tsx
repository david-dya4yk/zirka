'use client';

import { useActionState } from 'react';
import { type LeadFormState, sendLead } from '@/app/actions/sendLead';
import { INTEREST_PLACEHOLDER, INTERESTS } from '@/lib/apartments';
import { MESSENGERS, PHONE } from '@/lib/siteContent';
import styles from './Apartments.module.scss';

const INITIAL_STATE: LeadFormState = { status: 'idle', message: '' };

function CallbackForm(): React.JSX.Element {
  const [state, formAction, isPending] = useActionState(sendLead, INITIAL_STATE);

  if (state.status === 'success') {
    return (
      <div className={styles.formCard} role="status">
        <p className={styles.formDone}>Дякуємо! Менеджер зателефонує найближчим часом.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className={styles.formCard}>
      <input type="hidden" name="origin" value="apartments" />
      {/* Submitting the form is the consent (see the note under the button). */}
      <input type="hidden" name="consent" value="on" />
      <input
        className={styles.honeypot}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input
        className={styles.input}
        name="firstName"
        placeholder="Імʼя"
        aria-label="Імʼя"
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
      <select
        className={`${styles.input} ${styles.select}`}
        name="interest"
        aria-label={INTEREST_PLACEHOLDER}
        defaultValue=""
      >
        <option value="">{INTEREST_PLACEHOLDER}</option>
        {INTERESTS.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <button type="submit" className={styles.submit} disabled={isPending}>
        {isPending ? 'Надсилаємо…' : 'Замовити дзвінок'}
      </button>
      {state.status === 'error' && (
        <p className={styles.formError} role="alert">
          {state.message}
        </p>
      )}
      <p className={styles.formNote}>
        Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.
      </p>
    </form>
  );
}

export function ApartmentsCallback(): React.JSX.Element {
  return (
    <section id="contact" className={styles.callback}>
      <div className={styles.callbackGlow} aria-hidden="true" />
      <div className={styles.callbackInner}>
        <div>
          <h2 className={styles.callbackTitle}>Підкажемо, яка квартира підійде</h2>
          <p className={styles.callbackText}>
            Залиште номер — менеджер передзвонить у робочий час. Без розсилок, без тиску.
          </p>
          <p className={styles.messengers}>
            <span>Або одразу у месенджер:</span>
            <span className={styles.messengerLinks}>
              {MESSENGERS.map((m, i) => (
                <span key={m.label}>
                  {i > 0 && ' · '}
                  <a href={m.href} target="_blank" rel="noreferrer">
                    {m.label}
                  </a>
                </span>
              ))}
            </span>
            <span>на {PHONE}</span>
          </p>
        </div>
        <CallbackForm />
      </div>
    </section>
  );
}
