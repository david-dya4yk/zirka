import { Button } from '@/components/ui/Button';
import { PHONE_HREF } from '@/lib/siteContent';
import styles from './Projects.module.scss';

export function ProjectsCta(): React.JSX.Element {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaInner}>
        <div className={styles.ctaCopy}>
          <h2 className={styles.ctaTitle}>Хочете подивитися на наше будівництво?</h2>
          <p className={styles.ctaText}>
            Запишемося на показ зданого обʼєкта або поїздку на майданчик ЖК на Хотинській.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Button href="/contacts#contact" size="lg">
            Записатися на показ
          </Button>
          <Button href={PHONE_HREF} size="lg" variant="outlineOnDark">
            Зателефонувати
          </Button>
        </div>
      </div>
    </section>
  );
}
