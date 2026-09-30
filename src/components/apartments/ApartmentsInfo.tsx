import { FAQ, SEO, type SeoBlock } from '@/lib/apartments';
import styles from './Apartments.module.scss';

// «**bold** rest» → <strong>bold</strong> rest
function rich(text: string): React.ReactNode[] {
  return text
    .split(/\*\*(.+?)\*\*/)
    .map((part, i) => (i % 2 === 1 ? <strong key={part}>{part}</strong> : part));
}

function Block({ block }: { block: SeoBlock }): React.JSX.Element {
  if (typeof block.text !== 'string') {
    const items = block.text.map((item) => <li key={item}>{rich(item)}</li>);
    return block.kind === 'ol' ? <ol>{items}</ol> : <ul>{items}</ul>;
  }
  return <p className={block.kind === 'lead' ? styles.seoLead : undefined}>{rich(block.text)}</p>;
}

export function SeoSection(): React.JSX.Element {
  return (
    <section className={styles.seo}>
      <div className={styles.narrow}>
        <p className={styles.eyebrow}>[ ДОВІДКОВО ]</p>
        <h2 className={styles.sectionTitle}>Купівля квартири у Чернівцях</h2>
        <div className={styles.accordion}>
          {SEO.map((item, i) => (
            <details key={item.title} className={styles.accItem} open={i === 0}>
              <summary className={`${styles.accHead} ${styles.accHeadDisplay}`}>
                {item.title}
                <span className={styles.accIcon} aria-hidden="true">
                  ＋
                </span>
              </summary>
              <div className={styles.accBody}>
                {item.body.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection(): React.JSX.Element {
  return (
    <section className={styles.faq}>
      <div className={styles.narrow}>
        <h2 className={styles.sectionTitle}>Q&amp;A</h2>
        <div className={styles.accordion}>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.accItem}>
              <summary className={styles.accHead}>
                {f.q}
                <span className={`${styles.accIcon} ${styles.accIconBrand}`} aria-hidden="true">
                  ＋
                </span>
              </summary>
              <p className={styles.accBody}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
