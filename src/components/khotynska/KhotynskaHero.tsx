import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ANCHORS, HERO_STATS, KHOTYNSKA_HERO } from '@/lib/khotynska';
import styles from './Khotynska.module.scss';

export function KhotynskaHero(): React.JSX.Element {
  return (
    <>
      <section className={styles.hero}>
        <Image
          src={KHOTYNSKA_HERO}
          alt="ЖК на Хотинській — візуалізація"
          fill
          sizes="100vw"
          preload
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Хлібні крихти">
            <Link href="/">Головна</Link>
            <span aria-hidden="true">→</span>
            <Link href="/#projects">Проєкти</Link>
            <span aria-hidden="true">→</span>
            <span className={styles.crumbCurrent} aria-current="page">
              ЖК на Хотинській
            </span>
          </nav>
          <h1 className={styles.heroTitle}>ЖК на Хотинській</h1>
          <p className={styles.heroLead}>
            Восьмиповерховий житловий будинок на дві секції з підземним паркінгом. Чернівці, 4-й
            провулок Заводський, 2.
          </p>
          <div className={styles.heroActions}>
            <Button href="#plans">Обрати квартиру</Button>
            <Button href="#contact" variant="outlineOnDark">
              Записатися на показ
            </Button>
          </div>
          <dl className={styles.heroStats}>
            {HERO_STATS.map((s) => (
              <div key={s.k}>
                <dt className={styles.heroStatLabel}>{s.k}</dt>
                <dd className={styles.heroStatValue}>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <nav className={styles.subnav} aria-label="Розділи сторінки">
        <div className={styles.subnavInner}>
          {ANCHORS.map((a) => (
            <a key={a.id} href={`#${a.id}`} className={styles.subnavLink}>
              {a.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
