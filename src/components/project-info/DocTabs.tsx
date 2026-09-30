'use client';

import { useState } from 'react';
import styles from './ProjectInfo.module.scss';

export interface ResolvedDoc {
  title: string;
  /** Set when the file exists in /public or the link is external. */
  href: string | null;
  external: boolean;
}

export interface ResolvedTab {
  id: string;
  label: string;
  note?: string | undefined;
  docs: readonly ResolvedDoc[];
  objects?: readonly string[] | undefined;
}

function DownloadIcon(): React.JSX.Element {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function DocTabs({ tabs }: { tabs: readonly ResolvedTab[] }): React.JSX.Element {
  const [active, setActive] = useState(tabs[0]?.id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <>
      <div className={styles.docTabs} role="tablist" aria-label="Обʼєкти">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`doc-tab-${t.id}`}
            aria-selected={t.id === tab?.id}
            aria-controls="doc-panel"
            className={styles.docTab}
            onClick={() => {
              setActive(t.id);
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab && (
        <div id="doc-panel" role="tabpanel" aria-labelledby={`doc-tab-${tab.id}`}>
          {tab.note && <p className={styles.docNote}>{tab.note}</p>}
          <ul className={styles.docList}>
            {tab.docs.map((d) => (
              <li key={d.title} className={styles.docRow}>
                <span>{d.title}</span>
                {d.href ? (
                  <a
                    href={d.href}
                    className={styles.docLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.external ? (
                      'ЄДЕССБ →'
                    ) : (
                      <>
                        <DownloadIcon />
                        PDF
                      </>
                    )}
                  </a>
                ) : (
                  <span className={styles.docMissing}>
                    {tab.objects ? `PDF · ${String(tab.objects.length)} файлів` : 'За запитом'}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {tab.objects && (
            <ul className={styles.chips}>
              {tab.objects.map((o) => (
                <li key={o} className={styles.chip}>
                  {o}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
