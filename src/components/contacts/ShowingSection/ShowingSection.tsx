import { Button } from '@/components/ui/Button';
import styles from './ShowingSection.module.scss';

export function ShowingSection(): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.title}>Записатися на показ ЖК</h2>
          <p className={styles.text}>
            Можемо зустрітися не в офісі, а одразу на об&apos;єкті — у зданому ЖК або на
            будмайданчику ЖК на Хотинській. Поїдемо разом, покажемо все.
          </p>
        </div>
        <Button href="#contact" size="lg" className={styles.cta}>
          Записатися на показ →
        </Button>
      </div>
    </section>
  );
}
