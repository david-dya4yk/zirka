'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FEATURED, type Project, type ProjectCategory, PROJECTS, TABS } from '@/lib/projects';
import styles from './Projects.module.scss';

function PinIcon(): React.JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E8571B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ProjectCard({
  project,
  hasImage,
}: {
  project: Project;
  hasImage: boolean;
}): React.JSX.Element {
  const isPublic = project.category === 'public';
  return (
    <article className={styles.card}>
      <div className={styles.cardMedia}>
        {hasImage ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
        ) : (
          <span className={styles.cardPlaceholder}>Фото фасаду</span>
        )}
        <div className={styles.cardBadges}>
          <Badge variant={isPublic ? 'neutral' : 'success'}>
            {isPublic ? 'Громадський · Зданий' : 'Зданий'}
          </Badge>
          {project.offer && <Badge variant="amber">{project.offer}</Badge>}
        </div>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.name}</h3>
        <p className={styles.cardAddress}>{project.address}</p>
        {project.text && <p className={styles.cardText}>{project.text}</p>}
        {project.cta && (
          <div className={styles.cardCta}>
            <Button href={project.cta.href} variant="outline" size="sm">
              {project.cta.label}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

export function ProjectsCatalog({
  imageAvailable,
}: {
  /** Which project photos exist in /public (checked on the server). */
  imageAvailable: Readonly<Record<string, boolean>>;
}): React.JSX.Element {
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');
  const count = (id: 'all' | ProjectCategory): number =>
    id === 'all'
      ? PROJECTS.length + 1
      : id === 'building'
        ? 1
        : PROJECTS.filter((p) => p.category === id).length;
  const showFeatured = filter === 'all' || filter === 'building';
  const visible = PROJECTS.filter((p) => filter === 'all' || p.category === filter);

  return (
    <section className={styles.catalog}>
      <div className={styles.catalogInner}>
        <div className={styles.tabs} role="tablist" aria-label="Тип обʼєктів">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === filter}
              aria-controls="projects-grid"
              className={styles.tab}
              onClick={() => {
                setFilter(t.id);
              }}
            >
              {t.label} <span className={styles.tabCount}>{count(t.id)}</span>
            </button>
          ))}
        </div>

        <div id="projects-grid" role="tabpanel" className={styles.grid}>
          {showFeatured && (
            <article className={styles.featured}>
              <div className={styles.featuredMedia}>
                <Image
                  src={FEATURED.image}
                  alt={FEATURED.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 680px"
                />
                <div className={styles.featuredBadge}>
                  <Badge variant="amber">{FEATURED.badge}</Badge>
                </div>
              </div>
              <div className={styles.featuredBody}>
                <p className={styles.kicker}>{FEATURED.kicker}</p>
                <h3 className={styles.featuredTitle}>{FEATURED.name}</h3>
                <p className={styles.featuredText}>{FEATURED.text}</p>
                <p className={styles.featuredLocation}>
                  <PinIcon />
                  {FEATURED.location}
                </p>
                <div>
                  <Button href={FEATURED.href}>Детальніше про ЖК</Button>
                </div>
              </div>
            </article>
          )}
          {visible.map((p) => (
            <ProjectCard key={p.name} project={p} hasImage={imageAvailable[p.image] ?? false} />
          ))}
        </div>
      </div>
    </section>
  );
}
