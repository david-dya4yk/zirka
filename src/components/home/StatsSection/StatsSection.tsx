'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './StatsSection.module.scss';

const STATS = [
  { value: 21, label: ['рік досвіду'] },
  { value: 560, label: ['родин нам довіряють'] },
  { value: 8, label: ['проєктів введено', 'в експлуатацію'] },
] as const;

const COUNT_DURATION_MS = 1600;

/** 0 → 1 ease-out progress, started once the stats grid scrolls into view. */
function useCountUp(target: React.RefObject<HTMLElement | null>): number {
  const [eased, setEased] = useState(0);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    let raf = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setEased(1);
          return;
        }
        const start = performance.now();
        const tick = (now: number): void => {
          const t = Math.min(1, (now - start) / COUNT_DURATION_MS);
          setEased(1 - Math.pow(1 - t, 3));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -18% 0px' },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return eased;
}

export function StatsSection(): React.JSX.Element {
  const gridRef = useRef<HTMLDivElement>(null);
  const eased = useCountUp(gridRef);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>[ ЧЕРНІВЦІ · З 2005 РОКУ ]</p>
        <h2 className={styles.title}>Про нас</h2>
        <p className={styles.lead}>
          Усе будівництво — від земельної ділянки до здачі ключа — ми ведемо самі. Роки досвіду та
          довіри — наш найвищий пріоритет.
        </p>
        <div ref={gridRef} className={styles.grid}>
          {STATS.map((stat) => (
            <div key={stat.value} className={styles.cell}>
              <div className={styles.value}>
                <span aria-hidden="true">{Math.round(1 + (stat.value - 1) * eased)}</span>
                <span className={styles.srOnly}>{stat.value}</span>
              </div>
              <div className={styles.label}>
                {stat.label.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
