'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FLATS, MON_PREFIX, PARKING, STORAGE, type UnitRow } from '@/lib/monData';
import { flatPlan, formatArea, formatTotal } from '@/lib/publicInfo';
import styles from './Disclosure.module.scss';

type Tab = 'flats' | 'parking' | 'storage';

const sum = (values: readonly number[]): number => values.reduce((a, b) => a + b, 0);

const TABS: readonly { id: Tab; label: string; count: number; total: string }[] = [
  {
    id: 'flats',
    label: 'Квартири',
    count: FLATS.length,
    total: `Загальна площа квартир — ${formatTotal(sum(FLATS.map((f) => f[4])))} м², житлова — ${formatTotal(sum(FLATS.map((f) => f[5])))} м².`,
  },
  {
    id: 'parking',
    label: 'Паркомісця',
    count: PARKING.length,
    total: `Загальна площа паркомісць — ${formatTotal(sum(PARKING.map((p) => p[3])))} м².`,
  },
  {
    id: 'storage',
    label: 'Комори',
    count: STORAGE.length,
    total: `Загальна площа комор — ${formatTotal(sum(STORAGE.map((s) => s[3])))} м².`,
  },
];

// Nothing is marked as sold yet; the column is required by the disclosure rules.
const NOT_SOLD = '—';

function UnitsTable({ rows }: { rows: readonly UnitRow[] }): React.JSX.Element {
  return (
    <table className={`${styles.table} ${styles.tableNarrow}`}>
      <thead>
        <tr>
          <th>Номер</th>
          <th>Поверх</th>
          <th>Ідентифікатор</th>
          <th className={styles.right}>Заг. площа</th>
          <th className={styles.center}>Продано</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([num, floor, id, area]) => (
          <tr key={num}>
            <td className={styles.strong}>{num}</td>
            <td>{floor}</td>
            <td className={styles.ident}>{MON_PREFIX + id}</td>
            <td className={styles.right}>{formatArea(area)}</td>
            <td className={`${styles.center} ${styles.muted}`}>{NOT_SOLD}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function IdentifiersTabs(): React.JSX.Element {
  const [tab, setTab] = useState<Tab>('flats');
  const current = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="Тип об'єктів нерухомості">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={t.id === tab}
            aria-controls={`panel-${t.id}`}
            className={styles.tab}
            onClick={() => {
              setTab(t.id);
            }}
          >
            {t.label} · {t.count}
          </button>
        ))}
      </div>

      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
        <div className={styles.tableWrap}>
          {tab === 'flats' ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Планування</th>
                  <th>Під&apos;їзд</th>
                  <th>Поверх</th>
                  <th>Ідентифікатор</th>
                  <th className={styles.right}>Заг. площа</th>
                  <th className={styles.right}>Житлова</th>
                  <th className={styles.right}>Кімнат</th>
                  <th className={styles.center}>Продано</th>
                </tr>
              </thead>
              <tbody>
                {FLATS.map(([num, entrance, floor, id, total, living, rooms]) => {
                  const plan = flatPlan(num);
                  return (
                    <tr key={num}>
                      <td className={styles.strong}>{num}</td>
                      <td>
                        <a
                          href={plan}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.thumb}
                          aria-label={`Планування квартири ${String(num)} — відкрити`}
                        >
                          <Image
                            src={plan}
                            alt={`Планування квартири ${String(num)}`}
                            fill
                            sizes="120px"
                            style={{ objectFit: 'contain' }}
                          />
                        </a>
                      </td>
                      <td>{entrance} під&apos;їзд</td>
                      <td>{floor}</td>
                      <td className={styles.ident}>{MON_PREFIX + id}</td>
                      <td className={styles.right}>{formatArea(total)}</td>
                      <td className={styles.right}>{formatArea(living)}</td>
                      <td className={styles.right}>{rooms}</td>
                      <td className={`${styles.center} ${styles.muted}`}>{NOT_SOLD}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <UnitsTable rows={tab === 'parking' ? PARKING : STORAGE} />
          )}
        </div>
        <p className={styles.tableNote}>{current?.total}</p>
      </div>
    </>
  );
}
