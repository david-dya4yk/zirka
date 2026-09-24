import { Button } from '@/components/ui/Button';
import styles from './OffersSection.module.scss';

export function OffersSection(): React.JSX.Element {
  return (
    <section id="offers" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>[ ПРОПОЗИЦІЇ ]</p>
        <h2 className={styles.title}>Спеціальні умови у наших ЖК</h2>
        <p className={styles.lead}>Діють до завершення продажів. Кількість обмежена.</p>

        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.figure}>
              −2 200 ₴<span className={styles.unit}>м²</span>
            </div>
            <h3 className={styles.cardTitle}>Знижка на 3-х кімнатну квартиру</h3>
            <p className={styles.cardText}>
              У ЖК на Вишневій. Купуєте одну з вільних квартир у зданому ЖК — і отримуєте знижку
              -50$ на м².
            </p>
            <p className={styles.cardNote}>Деталі акції — за телефоном.</p>
            <div className={styles.cardAction}>
              <Button href="#contact">Дізнатися більше</Button>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.figure}>
              −1 <span className={styles.unit}>паркомісце</span>
            </div>
            <h3 className={styles.cardTitle}>Паркомісце у подарунок</h3>
            <p className={styles.cardText}>
              У ЖК на Хотинській. Купуєте квартиру в новому ЖК у будівництві — паркомісце вже
              включено.
            </p>
            <p className={styles.cardNote}>Кількість місць обмежена.</p>
            <div className={styles.cardAction}>
              <span className={styles.pulse}>
                <Button href="#contact">Залишити заявку</Button>
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
