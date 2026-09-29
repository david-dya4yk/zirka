import Link from 'next/link';
import styles from './ContactsHero.module.scss';

export function ContactsHero(): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <nav className={styles.crumbs} aria-label="Хлібні крихти">
          <Link href="/" className={styles.crumbLink}>
            Головна
          </Link>
          <span aria-hidden="true">→</span>
          <span className={styles.crumbCurrent} aria-current="page">
            Контакти
          </span>
        </nav>
        <h1 className={styles.title}>
          <span className={styles.shimmer}>Зв&apos;яжіться</span> з нами
        </h1>
        <p className={styles.lead}>
          Покажемо квартири, документи, проєкти. Перша зустріч і консультація — без
          зобов&apos;язань.
        </p>
      </div>
    </section>
  );
}
