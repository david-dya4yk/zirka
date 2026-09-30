'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FEATURED, PROJECTS } from '@/lib/projects';
import styles from './Apartments.module.scss';

const SLIDES = [
  { name: FEATURED.name, image: FEATURED.image, href: FEATURED.href, building: true },
  ...PROJECTS.filter((p) => p.category === 'residential').map((p) => ({
    name: p.name,
    image: p.image,
    href: '/projects',
    building: false,
  })),
];

const STEP = 300;

export function ProjectsSlider(): React.JSX.Element {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: -1 | 1): void => {
    trackRef.current?.scrollBy({ left: dir * STEP, behavior: 'smooth' });
  };

  return (
    <section className={styles.slider}>
      <div className={styles.sliderInner}>
        <div className={styles.sliderHead}>
          <h2 className={styles.sectionTitle}>Наші проєкти</h2>
          <div className={styles.sliderNav}>
            <button
              type="button"
              aria-label="Назад"
              aria-controls="projects-track"
              onClick={() => {
                scroll(-1);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Далі"
              aria-controls="projects-track"
              onClick={() => {
                scroll(1);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div id="projects-track" ref={trackRef} className={styles.sliderTrack}>
          {SLIDES.map((s) => (
            <Link key={s.name} href={s.href} className={styles.slideCard}>
              <div className={styles.slideMedia}>
                <Image src={s.image} alt={s.name} fill sizes="280px" />
                <div className={styles.slideBadge}>
                  <Badge variant={s.building ? 'amber' : 'success'}>
                    {s.building ? 'У будівництві' : 'Зданий'}
                  </Badge>
                </div>
              </div>
              <span className={styles.slideName}>{s.name}</span>
            </Link>
          ))}
        </div>

        <div className={styles.sliderMore}>
          <Button href="/projects" variant="outline">
            Усі проєкти →
          </Button>
        </div>
      </div>
    </section>
  );
}
