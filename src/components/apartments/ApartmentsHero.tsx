import Image from 'next/image';
import Link from 'next/link';
import {
  HERO_FALLBACK,
  HERO_IMAGE,
  HERO_LIT_IMAGE,
  LIGHT_CELLS,
  type LightCell,
} from '@/lib/apartments';
import styles from './Apartments.module.scss';

const pct = (v: number): string => `${(v * 100).toFixed(3)}%`;

// A window cell: clips the lit render (sized to the whole frame) to its own box.
function Light({ cell }: { cell: LightCell }): React.JSX.Element {
  return (
    <span
      className={styles.light}
      style={{ left: pct(cell.x), top: pct(cell.y), width: pct(cell.w), height: pct(cell.h) }}
    >
      <span
        className={styles.lightImage}
        style={{
          left: pct(-cell.x / cell.w),
          top: pct(-cell.y / cell.h),
          width: pct(1 / cell.w),
          height: pct(1 / cell.h),
        }}
      />
    </span>
  );
}

export function ApartmentsHero({
  withLights,
}: {
  /** Both hero renders are in /public; otherwise show the ЖК на Хотинській facade. */
  withLights: boolean;
}): React.JSX.Element {
  return (
    <section className={styles.hero}>
      {withLights ? (
        <div
          className={styles.heroBox}
          style={{ '--lit': `url(${HERO_LIT_IMAGE})` } as React.CSSProperties}
        >
          <Image src={HERO_IMAGE} alt="" fill sizes="max(100vw, 150vh)" preload />
          {/* Hovering a window lights it up. */}
          <div className={styles.lights} aria-hidden="true">
            {LIGHT_CELLS.map((cell) => (
              <Light key={`${String(cell.x)}:${String(cell.y)}`} cell={cell} />
            ))}
          </div>
        </div>
      ) : (
        <Image
          className={styles.heroFallback}
          src={HERO_FALLBACK}
          alt=""
          fill
          sizes="100vw"
          preload
        />
      )}
      <div className={styles.heroShade} />

      <nav className={styles.crumbs} aria-label="Хлібні крихти">
        <Link href="/">Головна</Link>
        <span aria-hidden="true">→</span>
        <span className={styles.crumbsCurrent} aria-current="page">
          Обрати квартиру
        </span>
      </nav>

      <div className={styles.heroText}>
        <h1 className={styles.heroTitle}>
          Купити <span className={styles.shimmer}>квартиру</span>
          <br />у Чернівцях
        </h1>
        <p className={styles.heroLead}>
          Усі вільні 1- і 2-кімнатні квартири у наших ЖК. Готові до заселення або у будівництві.
          Нотаріальний договір — з першого дня.
        </p>
        <p className={styles.heroNote}>
          Прямі продажі від забудовника. Без посередників, без комісій.
        </p>
      </div>
    </section>
  );
}
