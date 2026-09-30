import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  DOCS,
  FACTS,
  GALLERY,
  LOCATION_ROWS,
  MAP_EMBED,
  MAPS_URL,
  PAYMENT_OPTIONS,
  READINESS,
  ROOM_STATS,
  SALES_PHONE,
  SALES_PHONE_HREF,
  STEPS,
  TECH,
  WHY,
} from '@/lib/khotynska';
import { PROGRESS_PHOTOS } from '@/lib/publicInfo';
import { ADDRESS, EMAIL } from '@/lib/siteContent';
import { KhotynskaForm } from './KhotynskaForm';
import { PlanTabs } from './PlanTabs';
import { SlotImage } from './SlotImage';
import styles from './Khotynska.module.scss';

type Tone = 'light' | 'gray' | 'dark';

function Section({
  id,
  tone,
  eyebrow,
  title,
  children,
}: {
  id: string;
  tone: Tone;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <section id={id} className={`${styles.section} ${styles[tone]}`}>
      <div className={styles.inner}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </section>
  );
}

export function AboutSection(): React.JSX.Element {
  return (
    <Section id="about" tone="light">
      <div className={styles.twoCol}>
        <div>
          <p className={styles.eyebrow}>Про комплекс</p>
          <h2 className={styles.title}>Будинок, який ми ведемо від землі до ключів</h2>
          <p className={styles.text}>
            ЖК на Хотинській — новий проєкт ПВКФ «ЗІРКА». Ми одночасно замовник і генеральний
            підрядник: купили ділянку у власність, проєктуємо і будуємо власною технікою.
          </p>
          <p className={styles.text}>
            Дві секції по вісім поверхів, ліфти на 1000 кг, підземний паркінг на 34 авто, 15 комор і
            захисна споруда на 198 осіб. Квартири продаються через нотаріальний договір із
            реєстрацією МОН на ваше імʼя.
          </p>
        </div>
        <dl className={styles.facts}>
          {FACTS.map((f) => (
            <div key={f.k} className={styles.fact}>
              <dt className={styles.factLabel}>{f.k}</dt>
              <dd className={styles.factValue}>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

export function WhySection(): React.JSX.Element {
  return (
    <Section
      id="why"
      tone="gray"
      eyebrow="Чому це надійно"
      title="Одна компанія — одна відповідальність"
    >
      <ol className={styles.whyGrid}>
        {WHY.map((w, i) => (
          <li key={w.t} className={styles.card}>
            <span className={styles.cardNum}>{String(i + 1).padStart(2, '0')}</span>
            <h3 className={styles.cardTitle}>{w.t}</h3>
            <p className={styles.cardText}>{w.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function GallerySection(): React.JSX.Element {
  return (
    <Section id="gallery" tone="dark">
      <div className={styles.headRow}>
        <div>
          <p className={styles.eyebrow}>Візуалізація</p>
          <h2 className={styles.title}>Як виглядатиме будинок</h2>
        </div>
        <p className={styles.headNote}>
          Візуалізації умовні. Остаточне оздоблення фасаду визначається проєктом.
        </p>
      </div>
      <div className={styles.gallery}>
        {GALLERY.map((g, i) => (
          <SlotImage
            key={g.src}
            src={g.src}
            alt={g.label}
            sizes={i < 2 ? '(max-width: 880px) 100vw, 560px' : '(max-width: 880px) 50vw, 280px'}
            className={i === 0 ? styles.galleryMain : i === 1 ? styles.galleryWide : undefined}
          />
        ))}
      </div>
    </Section>
  );
}

export function PlansSection(): React.JSX.Element {
  return (
    <Section id="plans" tone="light" eyebrow="Квартири" title="Планування та площі">
      <ul className={styles.roomGrid}>
        {ROOM_STATS.map((r) => (
          <li key={r.t} className={`${styles.card} ${styles.cardAccent}`}>
            <h3 className={styles.cardTitle}>{r.t}</h3>
            <p className={styles.roomArea}>{r.area}</p>
            <p className={styles.muted}>{r.count}</p>
          </li>
        ))}
      </ul>
      <PlanTabs />
      <div className={styles.actions}>
        <Button href="/public-info#identifiers">Усі квартири</Button>
        <Button href="/public-info#identifiers" variant="outline">
          Перелік МОН →
        </Button>
      </div>
    </Section>
  );
}

export function TechSection(): React.JSX.Element {
  return (
    <section id="tech" className={`${styles.section} ${styles.gray}`}>
      <div className={`${styles.inner} ${styles.techGrid}`}>
        <div className={styles.techIntro}>
          <p className={styles.eyebrow}>Технології</p>
          <h2 className={styles.title}>З чого ми будуємо</h2>
          <p className={styles.text}>
            Повні технічні характеристики — у розділі{' '}
            <Link href="/public-info#tech" className={styles.inlineLink}>
              Публічна інформація
            </Link>
            .
          </p>
        </div>
        <dl>
          {TECH.map((t) => (
            <div key={t.k} className={styles.spec}>
              <dt className={styles.specKey}>{t.k}</dt>
              <dd className={styles.specValue}>{t.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function LocationSection(): React.JSX.Element {
  return (
    <Section id="location" tone="light">
      <div className={`${styles.twoCol} ${styles.locationGrid}`}>
        <div>
          <p className={styles.eyebrow}>Розташування</p>
          <h2 className={styles.title}>4-й провулок Заводський, 2</h2>
          <p className={styles.text}>
            Чернівці, район вулиці Хотинської. Ділянка 0,42 га — у власності забудовника.
          </p>
          <dl className={styles.locRows}>
            {LOCATION_ROWS.map((r) => (
              <div key={r.k} className={styles.locRow}>
                <dt className={styles.muted}>{r.k}</dt>
                <dd className={r.mono ? styles.mono : undefined}>{r.v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            Відкрити в Google Maps →
          </a>
        </div>
        <div className={styles.map}>
          <iframe
            src={MAP_EMBED}
            title="Мапа — ЖК на Хотинській"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Section>
  );
}

export function ProgressSection(): React.JSX.Element {
  return (
    <Section id="progress" tone="dark">
      <div className={`${styles.twoCol} ${styles.progressHead}`}>
        <div>
          <p className={styles.eyebrow}>Хід будівництва</p>
          <h2 className={styles.title}>Щомісячний фотозвіт</h2>
        </div>
        <div>
          <div className={styles.progressMeta}>
            <span>Готовність</span>
            <span className={styles.progressValue}>{READINESS} %</span>
          </div>
          <div
            className={styles.progressBar}
            role="progressbar"
            aria-valuenow={READINESS}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Готовність будівництва"
          >
            <span style={{ width: `${String(READINESS)}%` }} />
          </div>
          <div className={styles.progressFoot}>
            <span>Дозвіл ЧВ012250321873 · 26.03.2025</span>
            <span>III кв. 2029</span>
          </div>
        </div>
      </div>
      <div className={styles.photoGrid}>
        {PROGRESS_PHOTOS.map((p) => (
          <figure key={p.src} className={styles.photo}>
            <SlotImage src={p.src} alt={p.label} sizes="(max-width: 880px) 100vw, 400px" />
            <figcaption className={styles.photoCaption}>{p.label}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function BuySection(): React.JSX.Element {
  return (
    <Section id="buy" tone="light" eyebrow="Умови придбання" title="Як купити квартиру">
      <div className={styles.payGrid}>
        {PAYMENT_OPTIONS.map((p) => (
          <div key={p.t} className={`${styles.card} ${p.accent ? styles.cardAccent : ''}`}>
            <p className={styles.payValue}>{p.v}</p>
            <h3 className={styles.cardTitle}>{p.t}</h3>
            <p className={styles.cardText}>{p.d}</p>
          </div>
        ))}
      </div>
      <ol className={styles.steps}>
        {STEPS.map((s, i) => (
          <li key={s}>
            <span className={styles.stepNum}>Крок {String(i + 1).padStart(2, '0')}</span>
            <span className={styles.stepText}>{s}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function DocsSection(): React.JSX.Element {
  return (
    <Section id="docs" tone="gray" eyebrow="Документи" title="Відкрито про обʼєкт">
      <ul className={styles.docs}>
        {DOCS.map((d) => (
          <li key={d.t}>
            <a
              href={d.href}
              className={styles.doc}
              {...(d.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span>
                <span className={styles.docTitle}>{d.t}</span>
                <span className={styles.docSub}>{d.s}</span>
              </span>
              <span className={styles.docArrow} aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function ContactSection(): React.JSX.Element {
  return (
    <Section id="contact" tone="dark">
      <div className={styles.twoCol}>
        <div>
          <h2 className={styles.title}>Поїдемо на будмайданчик разом</h2>
          <p className={`${styles.text} ${styles.contactLead}`}>
            Залиште заявку — менеджер надішле прайс, планування і домовиться про показ на обʼєкті.
            Без зобовʼязань.
          </p>
          <div className={styles.contactList}>
            <a href={SALES_PHONE_HREF} className={styles.contactPhone}>
              {SALES_PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className={styles.contactMail}>
              {EMAIL}
            </a>
            <span className={styles.contactAddr}>
              Офіс: Чернівці, {ADDRESS.replace(', Чернівці', '')}
            </span>
          </div>
        </div>
        <KhotynskaForm />
      </div>
    </Section>
  );
}
