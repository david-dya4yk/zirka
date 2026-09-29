import { SiteNav } from '../SiteNav';
import styles from './StickyHeader.module.scss';

/** Site header docked to the top while scrolling — for inner pages (home overlays it on the hero). */
export function StickyHeader(): React.JSX.Element {
  return (
    <div className={styles.bar}>
      <SiteNav />
    </div>
  );
}
