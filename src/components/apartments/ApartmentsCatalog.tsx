'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  type Apartment,
  type ApartmentProject,
  type ApartmentStatus,
  APARTMENTS,
  formatSqm,
  PROJECT_OPTIONS,
  roomsLabel,
  SORT_OPTIONS,
  type SortId,
  STATUS_LABEL,
} from '@/lib/apartments';
import styles from './Apartments.module.scss';

interface Filters {
  /** Empty = all projects. */
  projects: readonly ApartmentProject[];
  rooms: 'all' | 1 | 2 | 3;
  status: 'all' | ApartmentStatus;
  areaMin: string;
  areaMax: string;
  floorMin: string;
  floorMax: string;
}

const NO_FILTERS: Filters = {
  projects: [],
  rooms: 'all',
  status: 'all',
  areaMin: '',
  areaMax: '',
  floorMin: '',
  floorMax: '',
};

const ROOM_OPTIONS = ['all', 1, 2, 3] as const;
const STATUS_OPTIONS = [
  { id: 'all', label: 'Усі' },
  { id: 'ready', label: 'Готова до заселення' },
  { id: 'building', label: 'У будівництві' },
] as const;

function inRange(value: number, min: string, max: string): boolean {
  const lo = parseFloat(min);
  const hi = parseFloat(max);
  return (Number.isNaN(lo) || value >= lo) && (Number.isNaN(hi) || value <= hi);
}

function matches(apt: Apartment, f: Filters): boolean {
  return (
    (f.projects.length === 0 || f.projects.includes(apt.project)) &&
    (f.rooms === 'all' || apt.rooms === f.rooms) &&
    (f.status === 'all' || apt.status === f.status) &&
    inRange(apt.area, f.areaMin, f.areaMax) &&
    inRange(apt.floor, f.floorMin, f.floorMax)
  );
}

function compare(sort: SortId): (a: Apartment, b: Apartment) => number {
  switch (sort) {
    case 'area-desc':
      return (a, b) => b.area - a.area;
    case 'area-asc':
      return (a, b) => a.area - b.area;
    case 'default':
      return () => 0;
  }
}

/** 1 → «квартиру», 3 → «квартири», 5 → «квартир» (after «Знайдено»). */
function flatsWord(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'квартиру';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'квартири';
  return 'квартир';
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <button type="button" className={styles.chip} aria-pressed={active} onClick={onClick}>
      {children}
    </button>
  );
}

function RangeInputs({
  label,
  min,
  max,
  onChange,
}: {
  label: string;
  min: string;
  max: string;
  onChange: (next: { min: string; max: string }) => void;
}): React.JSX.Element {
  return (
    <div role="group" aria-label={label}>
      <div className={styles.filterLabel}>{label}</div>
      <div className={styles.range}>
        <input
          className={styles.rangeInput}
          type="number"
          inputMode="decimal"
          min={0}
          placeholder="від"
          aria-label={`${label}: від`}
          value={min}
          onChange={(e) => {
            onChange({ min: e.target.value, max });
          }}
        />
        <span aria-hidden="true">—</span>
        <input
          className={styles.rangeInput}
          type="number"
          inputMode="decimal"
          min={0}
          placeholder="до"
          aria-label={`${label}: до`}
          value={max}
          onChange={(e) => {
            onChange({ min, max: e.target.value });
          }}
        />
      </div>
    </div>
  );
}

function ApartmentCard({ apt }: { apt: Apartment }): React.JSX.Element {
  const title = `${roomsLabel(apt.rooms)} · ${formatSqm(apt.area)} м²`;
  const badges = (
    <div className={styles.aptBadges}>
      <Badge variant={apt.status === 'ready' ? 'success' : 'amber'}>
        {STATUS_LABEL[apt.status]}
      </Badge>
      {apt.offer && <Badge variant="amber">{apt.offer}</Badge>}
    </div>
  );

  return (
    <article className={styles.apt}>
      {apt.plan ? (
        <a
          href={apt.plan.full}
          target="_blank"
          rel="noreferrer"
          className={styles.aptPlan}
          aria-label={`Відкрити повне планування${apt.num ? ` квартири №${String(apt.num)}` : ''}`}
        >
          <Image
            src={apt.plan.thumb}
            alt={`Планування: ${title}`}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 300px"
          />
          {badges}
          <span className={styles.aptZoom} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
            </svg>
          </span>
        </a>
      ) : (
        <div className={styles.aptPlan}>
          <span className={styles.aptPlanEmpty}>Планування готується</span>
          {badges}
        </div>
      )}
      <div className={styles.aptBody}>
        <p className={styles.aptProject}>
          {apt.projectName}
          {apt.section && ` · секція ${apt.section}`}
        </p>
        <h3 className={styles.aptTitle}>{title}</h3>
        <dl className={styles.aptFacts}>
          <div>
            <dt>Поверх</dt>
            <dd>
              {apt.floor} з {apt.floors}
            </dd>
          </div>
          {apt.num !== undefined && (
            <div>
              <dt>Квартира</dt>
              <dd>№{apt.num}</dd>
            </div>
          )}
          {apt.livingArea !== undefined && (
            <div>
              <dt>Житлова</dt>
              <dd>{formatSqm(apt.livingArea)} м²</dd>
            </div>
          )}
        </dl>
        <div className={styles.aptActions}>
          <Button href={apt.href} variant="ghost" size="sm">
            Про ЖК
          </Button>
          <Button href="#contact" size="sm">
            Залишити заявку
          </Button>
        </div>
      </div>
    </article>
  );
}

const PAGE_SIZE = 12;

export function ApartmentsCatalog(): React.JSX.Element {
  const [panelOpen, setPanelOpen] = useState(false);
  // Edited in the panel; the list only changes on «Показати варіанти».
  const [draft, setDraft] = useState<Filters>(NO_FILTERS);
  const [applied, setApplied] = useState<Filters>(NO_FILTERS);
  const [sort, setSort] = useState<SortId>('default');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [shown, setShown] = useState(PAGE_SIZE);

  const update = (patch: Partial<Filters>): void => {
    setDraft((f) => ({ ...f, ...patch }));
  };
  const reset = (): void => {
    setDraft(NO_FILTERS);
    setApplied(NO_FILTERS);
    setShown(PAGE_SIZE);
  };
  const toggleProject = (id: ApartmentProject): void => {
    setDraft((f) => ({
      ...f,
      projects: f.projects.includes(id) ? f.projects.filter((p) => p !== id) : [...f.projects, id],
    }));
  };

  const visible = APARTMENTS.filter((a) => matches(a, applied)).sort(compare(sort));

  return (
    <>
      <section className={styles.filters}>
        <div className={styles.filtersInner}>
          <button
            type="button"
            className={styles.filterToggle}
            aria-expanded={panelOpen}
            aria-controls="apartment-filters"
            onClick={() => {
              setPanelOpen((open) => !open);
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            {panelOpen ? 'Сховати фільтр' : 'Показати фільтр'}
          </button>

          <form
            id="apartment-filters"
            className={styles.filterPanel}
            hidden={!panelOpen}
            onSubmit={(e) => {
              e.preventDefault();
              setApplied(draft);
              setShown(PAGE_SIZE);
            }}
          >
            <div role="group" aria-label="Проєкт">
              <div className={styles.filterLabel}>Проєкт</div>
              <div className={styles.chips}>
                <Chip
                  active={draft.projects.length === 0}
                  onClick={() => {
                    update({ projects: [] });
                  }}
                >
                  Усі
                </Chip>
                {PROJECT_OPTIONS.map((p) => (
                  <Chip
                    key={p.id}
                    active={draft.projects.includes(p.id)}
                    onClick={() => {
                      toggleProject(p.id);
                    }}
                  >
                    {p.label}
                  </Chip>
                ))}
              </div>
            </div>

            <div className={styles.filterGrid}>
              <div role="group" aria-label="Кількість кімнат">
                <div className={styles.filterLabel}>Кількість кімнат</div>
                <div className={styles.chips}>
                  {ROOM_OPTIONS.map((r) => (
                    <Chip
                      key={r}
                      active={draft.rooms === r}
                      onClick={() => {
                        update({ rooms: r });
                      }}
                    >
                      {r === 'all' ? 'Усі' : r}
                    </Chip>
                  ))}
                </div>
              </div>
              <RangeInputs
                label="Площа, м²"
                min={draft.areaMin}
                max={draft.areaMax}
                onChange={({ min, max }) => {
                  update({ areaMin: min, areaMax: max });
                }}
              />
              <RangeInputs
                label="Поверх"
                min={draft.floorMin}
                max={draft.floorMax}
                onChange={({ min, max }) => {
                  update({ floorMin: min, floorMax: max });
                }}
              />
            </div>

            <div role="group" aria-label="Стан готовності">
              <div className={styles.filterLabel}>Стан готовності</div>
              <div className={styles.chips}>
                {STATUS_OPTIONS.map((s) => (
                  <Chip
                    key={s.id}
                    active={draft.status === s.id}
                    onClick={() => {
                      update({ status: s.id });
                    }}
                  >
                    {s.label}
                  </Chip>
                ))}
              </div>
            </div>

            <div className={styles.filterActions}>
              <Button type="submit">Показати варіанти</Button>
              <button type="button" className={styles.resetLink} onClick={reset}>
                Скинути фільтр
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className={styles.catalog} aria-label="Каталог квартир">
        <div className={styles.catalogInner}>
          <div className={styles.toolbar}>
            <p className={styles.count} aria-live="polite">
              Знайдено <strong>{visible.length}</strong> {flatsWord(visible.length)}
            </p>
            <div className={styles.toolbarControls}>
              <select
                className={styles.sort}
                aria-label="Сортування"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as SortId);
                  setShown(PAGE_SIZE);
                }}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
              <div className={styles.viewSwitch}>
                <button
                  type="button"
                  aria-label="Сітка"
                  aria-pressed={view === 'grid'}
                  onClick={() => {
                    setView('grid');
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
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Список"
                  aria-pressed={view === 'list'}
                  onClick={() => {
                    setView('list');
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
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {visible.length > 0 ? (
            <>
              <div className={`${styles.aptGrid} ${view === 'list' ? styles.aptList : ''}`}>
                {visible.slice(0, shown).map((apt) => (
                  <ApartmentCard key={apt.id} apt={apt} />
                ))}
              </div>
              {visible.length > shown && (
                <div className={styles.more}>
                  <button
                    type="button"
                    className={styles.moreButton}
                    onClick={() => {
                      setShown((n) => n + PAGE_SIZE);
                    }}
                  >
                    Показати ще
                    <span className={styles.moreCount}>
                      {Math.min(PAGE_SIZE, visible.length - shown)} з {visible.length - shown}
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.empty}>
              <h3 className={styles.emptyTitle}>Відсутні квартири за вашими параметрами</h3>
              <p className={styles.emptyText}>
                Змініть, будь ласка, умови пошуку — або залиште заявку, і ми повідомимо, коли
                зʼявиться відповідний варіант.
              </p>
              <div className={styles.emptyActions}>
                <button type="button" className={styles.resetButton} onClick={reset}>
                  Скинути фільтр
                </button>
                <Button href="#contact">Залишити заявку</Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
