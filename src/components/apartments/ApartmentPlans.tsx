import Image from 'next/image';
import { PLANS } from '@/lib/apartments';
import styles from './Apartments.module.scss';

export function ApartmentPlans(): React.JSX.Element {
  return (
    <section className={styles.plans}>
      <div className={styles.plansInner}>
        <h2 className={styles.titleRule}>Планування квартир</h2>
        <div className={styles.plansGrid}>
          {PLANS.map((plan) => (
            <article key={plan.num}>
              <a
                href={plan.image}
                target="_blank"
                rel="noreferrer"
                className={styles.planMedia}
                aria-label={`Відкрити планування квартири №${String(plan.num)}`}
              >
                <Image
                  src={plan.image}
                  alt={`Планування: ${plan.title}`}
                  fill
                  sizes="(max-width: 880px) 100vw, (max-width: 1100px) 50vw, 400px"
                />
              </a>
              <h3 className={styles.planTitle}>{plan.title}</h3>
              <dl className={styles.planFacts}>
                <div>
                  <dt>Секція:</dt>
                  <dd>{plan.section}</dd>
                </div>
                <div>
                  <dt>Заплановано:</dt>
                  <dd>{plan.handover}</dd>
                </div>
                <div>
                  <dt>Поверх:</dt>
                  <dd>{plan.floor}</dd>
                </div>
                <div>
                  <dt>Квартира:</dt>
                  <dd>{plan.num}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
