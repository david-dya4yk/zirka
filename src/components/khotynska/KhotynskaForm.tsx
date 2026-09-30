'use client';

import { useActionState } from 'react';
import { type LeadFormState, sendLead } from '@/app/actions/sendLead';
import { INTERESTS } from '@/lib/khotynska';
import styles from './Khotynska.module.scss';

const INITIAL_STATE: LeadFormState = { status: 'idle', message: '' };

export function KhotynskaForm(): React.JSX.Element {
  const [state, formAction, isPending] = useActionState(sendLead, INITIAL_STATE);

  if (state.status === 'success') {
    return (
      <div className={styles.formCard} role="status">
        <h3 className={styles.formDone}>Дякуємо, заявку отримано</h3>
        <p className={styles.formDoneText}>Менеджер звʼяжеться з вами протягом робочого дня.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className={styles.formCard}>
      <input type="hidden" name="origin" value="khotynska" />
      {/* The design makes submitting the form the consent (see the note under the button). */}
      <input type="hidden" name="consent" value="on" />
      <input
        className={styles.honeypot}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Імʼя</span>
        <input
          className={styles.input}
          name="firstName"
          placeholder="Ваше імʼя"
          autoComplete="name"
          required
        />
      </label>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Телефон</span>
        <input
          className={styles.input}
          type="tel"
          name="phone"
          placeholder="+38 (0__) ___-__-__"
          autoComplete="tel"
          required
        />
      </label>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Що вас цікавить</span>
        <select
          className={`${styles.input} ${styles.select}`}
          name="interest"
          defaultValue={INTERESTS[0]}
        >
          {INTERESTS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <button type="submit" className={styles.submit} disabled={isPending}>
        {isPending ? 'Надсилаємо…' : 'Надіслати заявку'}
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
