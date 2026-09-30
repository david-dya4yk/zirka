'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HERO_CHIPS, HERO_SLIDES } from '@/lib/projects';
import styles from './Projects.module.scss';

const SLIDE_MS = 6000;

export function ProjectsHero(): React.JSX.Element {
  const [index, setIndex] = useState(0);
  // Bumped on dot clicks so the auto-advance timer restarts from the chosen slide.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);
    return () => {
      window.clearInterval(timer);
    };
  }, [cycle]);

  return (
    <section className={styles.hero}>
      <div className={styles.slides} aria-hidden="true">
        {HERO_SLIDES.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            sizes="100vw"
            preload={i === 0}
            className={`${styles.slide} ${i === index ? styles.slideActive : ''}`}
          />
        ))}
      </div>
      <div className={styles.heroShade} />
      <div className={styles.heroInner}>
        <ul className={styles.heroChips}>
          {HERO_CHIPS.map((c) => (
            <li
              key={c.label}
              className={`${styles.heroChip} ${c.accent ? styles.heroChipAccent : ''}`}
            >
              {c.label}
            </li>
          ))}
        </ul>
        <div>
          <h1 className={styles.heroTitle}>
            Наші <span className={styles.shimmer}>проєкти</span>
          </h1>
          <p className={styles.heroLead}>
            8 завершених обʼєктів. 1 — у будівництві. Усі — у Чернівцях.
          </p>
          <div className={styles.heroFoot}>
            <span className={styles.heroCaption} aria-live="polite">
              {HERO_SLIDES[index]?.label}
            </span>
            <div className={styles.dots}>
              {HERO_SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                  aria-label={slide.label}
                  aria-pressed={i === index}
                  onClick={() => {
                    setIndex(i);
                    setCycle((c) => c + 1);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
