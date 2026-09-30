'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SiteNav } from '@/components/layout/SiteNav';
import { FRAME_COUNT, STAGES, frameSrc, stageIndexAt } from './stages';
import styles from './HeroSection.module.scss';

// Ignore sub-pixel scroll changes so the HUD doesn't re-render on every tick.
const PROGRESS_EPSILON = 0.0015;

export function HeroSection(): React.JSX.Element {
  const trackRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Warm the browser cache so frame swaps don't flash while scrolling.
  useEffect(() => {
    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
    }
  }, []);

  useEffect(() => {
    let raf = 0;

    const update = (): void => {
      raf = 0;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const next = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      setProgress((prev) => (Math.abs(prev - next) > PROGRESS_EPSILON ? next : prev));
    };

    const schedule = (): void => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };

    const onMouseMove = (e: MouseEvent): void => {
      const spot = spotRef.current;
      if (!spot) return;
      spot.style.setProperty('--mx', `${String(e.clientX)}px`);
      spot.style.setProperty('--my', `${String(e.clientY)}px`);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const frameIndex = Math.round(progress * (FRAME_COUNT - 1));
  const percent = Math.round(progress * 100);
  const stageIndex = stageIndexAt(progress);
  const stage = STAGES[stageIndex] ?? STAGES[0];
  const hintOpacity = 1 - Math.min(1, progress / 0.05);

  return (
    <section ref={trackRef} className={styles.track} aria-label="Хід будівництва">
      <div className={styles.stage}>
        <Image
          className={styles.frame}
          src={frameSrc(frameIndex)}
          alt="Хід будівництва ЖК на Хотинській"
          fill
          sizes="100vw"
          unoptimized
          loading="eager"
          fetchPriority="high"
        />

        <div className={styles.grid} aria-hidden="true" />
        <div ref={spotRef} className={styles.gridSpot} aria-hidden="true">
          <div className={styles.gridSpotLines} />
        </div>

        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.topShade} aria-hidden="true" />

        <p className={styles.eyebrow}>[ ЗАБУДОВНИК ПОВНОГО ЦИКЛУ · З 2005 ]</p>

        <div className={styles.textCol}>
          <h1 className={styles.title}>
            Свій Будинок.
            <br />
            Своя <span className={styles.shimmer}>відповідальність</span>.
            <br />
            Свої люди.
          </h1>
          <div className={styles.actions}>
            <Button href="/apartments" size="lg">
              Обрати квартиру
            </Button>
            <Button href="#about" size="lg" variant="outlineOnDark">
              Детальніше
            </Button>
          </div>
        </div>

        <aside className={styles.hud} aria-label="3D-візуалізація проєкту">
          <div className={styles.hudHead}>
            <span className={styles.pulseDot} />
            <span className={styles.monoLabel}>3D-ВІЗУАЛІЗАЦІЯ ПРОЄКТУ</span>
          </div>
          <div className={styles.monoLabel}>ОБʼЄКТ</div>
          <div className={styles.hudObject}>ЖК НА ХОТИНСЬКІЙ</div>
          <div className={styles.hudCoords}>48.2921° N · 25.9358° E</div>
          <div className={styles.hudPlot}>ДІЛЯНКА 0,42 ГА · ВЛАСНІСТЬ</div>
          <div className={styles.hudDivider} />
          <div className={styles.monoLabel}>ЕТАП {stage.code}</div>
          <div className={styles.hudStage}>{stage.name}</div>
          <div className={styles.hudReadiness}>
            <span className={styles.monoLabel}>ГОТОВНІСТЬ</span>
            <span className={styles.hudPercent}>{percent}%</span>
          </div>
          <div className={styles.progress}>
            <div className={styles.progressBar} style={{ width: `${String(percent)}%` }} />
          </div>
        </aside>

        <ol className={styles.rail} aria-label="Етапи будівництва">
          {STAGES.map((s, i) => {
            const state = i === stageIndex ? 'active' : i < stageIndex ? 'done' : 'todo';
            return (
              <li key={s.code} className={`${styles.railItem} ${styles[state]}`}>
                <span className={styles.railMark}>{state === 'done' ? '✓' : s.code}</span>
                <span className={styles.railName}>{s.name}</span>
              </li>
            );
          })}
        </ol>

        {hintOpacity > 0.01 && (
          <div className={styles.hint} style={{ opacity: hintOpacity }} aria-hidden="true">
            ГОРТАЙТЕ ДЛЯ БУДІВНИЦТВА
            <span className={styles.hintLine} />
          </div>
        )}

        <div className={styles.navLayer}>
          <SiteNav />
        </div>
      </div>
    </section>
  );
}
