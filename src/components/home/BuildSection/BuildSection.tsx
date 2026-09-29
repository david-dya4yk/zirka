import { Button } from '@/components/ui/Button';
import styles from './BuildSection.module.scss';

const PILLARS = [
  {
    title: 'Своя земля',
    text: 'Усі наші ділянки — у власності компанії, не в оренді. Жодних «оренда закінчилась» чи «ділянка під спором». Ваша квартира стоїть на нашій землі.',
  },
  {
    title: 'Своя техніка',
    text: 'Баштові крани, екскаватори, самоскиди, бетонозмішувачі, склади піску й гравію. Не чекаємо, поки звільниться чужий кран — будуємо тоді, коли треба.',
  },
  {
    title: 'Свої люди',
    text: 'Бригади — наші. Інженери, прораби, монтажники — у штаті компанії. ПВКФ «Зірка» одночасно і замовник, і генпідрядник. Один контур відповідальності.',
  },
  {
    title: 'Зареєстрований МОН',
    text: 'Продаж квартир відбувається через нотаріальне посвідчення договору купівлі-продажу, та отриманням клієнтом витягу про реєстрацію квартири на нього.',
  },
] as const;

export function BuildSection(): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>[ ми ]</p>
          <h2 className={styles.title}>Будуємо самі. Від ділянки до здачі ключа.</h2>
          <p className={styles.lead}>Не залучаємо субпідрядників на ключові процеси.</p>
          <Button size="lg" className={styles.cta}>
            Подивитися процес будівництва →
          </Button>
        </div>

        <ol className={styles.cards}>
          {PILLARS.map((pillar, i) => (
            <li
              key={pillar.title}
              className={styles.card}
              // Position in the sticky deck; offsets per breakpoint live in the stylesheet.
              style={{ '--stack-index': i } as React.CSSProperties}
            >
              <span className={styles.index}>/ {String(i + 1).padStart(2, '0')}</span>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardText}>{pillar.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
