'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PLAN_TABS } from '@/lib/khotynska';
import styles from './Khotynska.module.scss';

export function PlanTabs(): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const current = PLAN_TABS[index] ?? PLAN_TABS[0];

  return (
    <div className={styles.planTabs}>
      <div className={styles.planList} role="tablist" aria-label="Плани поверхів">
        {PLAN_TABS.map((plan, i) => (
          <button
            key={plan.src}
            type="button"
            role="tab"
            id={`plan-tab-${String(i)}`}
            aria-selected={i === index}
            aria-controls="plan-panel"
            className={styles.planTab}
            onClick={() => {
              setIndex(i);
            }}
          >
            {plan.label}
          </button>
        ))}
      </div>
      <a
        id="plan-panel"
        role="tabpanel"
        aria-labelledby={`plan-tab-${String(index)}`}
        href={current.src}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.planView}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={`План: ${current.label}`}
          fill
          sizes="(max-width: 1024px) 100vw, 880px"
          style={{ objectFit: 'contain' }}
        />
      </a>
    </div>
  );
}
