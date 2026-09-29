import Link from 'next/link';
import { FLATS, PARKING, STORAGE } from '@/lib/monData';
import styles from './PublicInfoHero.module.scss';

const CHIPS = [
  `${String(FLATS.length)} квартир`,
  `${String(PARKING.length)} паркомісця`,
  `${String(STORAGE.length)} комор`,
];

export function PublicInfoHero(): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <nav className={styles.crumbs} aria-label="Хлібні крихти">
          <Link href="/" className={styles.crumbLink}>
            Головна
          </Link>
          <span aria-hidden="true">→</span>
          <span className={styles.crumbCurrent} aria-current="page">
            Публічна інформація
          </span>
        </nav>
        <h1 className={styles.title}>Публічна інформація</h1>
        <p className={styles.lead}>
          Розкриття інформації про подільний об&apos;єкт незавершеного будівництва —
          багатоквартирний будинок на 4-му пров. Заводському, 2 у м. Чернівці. Технічні
          характеристики, відомості про замовника і підрядника, ідентифікатори майбутніх
          об&apos;єктів нерухомості.
        </p>
        <ul className={styles.chips}>
          {CHIPS.map((chip) => (
            <li key={chip} className={styles.chip}>
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
