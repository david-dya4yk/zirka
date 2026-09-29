import { MAP_EMBED_URL, ROUTE_URL } from '@/lib/siteContent';
import { Icon } from '../icons';
import styles from './FindUsSection.module.scss';

export function FindUsSection(): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div>
          <h2 className={styles.title}>Як доїхати</h2>
          <p className={styles.text}>
            Офіс — у Чернівцях, на вулиці Зоряній, 4. Заходьте у робочі дні з 10:00 до 18:00 — без
            попереднього запису.
          </p>
        </div>
        <div>
          <div className={styles.map}>
            <iframe
              src={MAP_EMBED_URL}
              title="Мапа — вул. Зоряна, 4, Чернівці"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a href={ROUTE_URL} target="_blank" rel="noopener noreferrer" className={styles.route}>
            <Icon name="Route" size={16} />
            Прокласти маршрут у Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
