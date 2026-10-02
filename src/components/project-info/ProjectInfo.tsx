import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { BUILD_TECH, DOC_TABS, FAQ, HANDOVER, SAFETY } from '@/lib/projectInfo';
import { MESSENGERS, PHONE_HREF } from '@/lib/siteContent';
import { DocTabs, type ResolvedTab } from './DocTabs';
import styles from './ProjectInfo.module.scss';

/** Keep a document link only when its file is actually in /public (or it points off-site). */
function resolveTabs(): ResolvedTab[] {
  return DOC_TABS.map((tab) => ({
    id: tab.id,
    label: tab.label,
    note: tab.note,
    objects: tab.objects,
    docs: tab.docs.map((d) => {
      const external = d.href?.startsWith('http') ?? false;
      const available =
        d.href !== undefined && (external || existsSync(join(process.cwd(), 'public', d.href)));
      return { title: d.title, href: available ? (d.href ?? null) : null, external };
    }),
  }));
}

export function ProjectInfoHero(): React.JSX.Element {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <nav className={styles.crumbs} aria-label="Хлібні крихти">
          <Link href="/">Головна</Link>
          <span aria-hidden="true">→</span>
          <span className={styles.crumbCurrent} aria-current="page">
            Проектна інформація
          </span>
        </nav>
        <h1 className={styles.heroTitle}>
          Проектна <span className={styles.shimmer}>інформація</span>
        </h1>
        <p className={styles.heroLead}>Усі документи, технології і умови будівництва — відкрито.</p>
        <p className={styles.heroNote}>
          Усі скани дозволів, договорів та технічних умов — у відкритому доступі.
        </p>
      </div>
    </section>
  );
}

export function DocsSection(): React.JSX.Element {
  return (
    <section id="docs" className={`${styles.section} ${styles.gray} ${styles.bordered}`}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Документи на наші ЖК</h2>
        <p className={styles.lead}>
          По кожному ЖК — повний пакет: дозволи на будівництво, акти введення в експлуатацію, право
          власності на ділянку, технічні умови. Завантажуйте, перевіряйте, показуйте юристу.
        </p>
        <DocTabs tabs={resolveTabs()} />
      </div>
    </section>
  );
}

function Grid({
  items,
  columns,
}: {
  items: readonly { t: string; d: string }[];
  columns: 3 | 4;
}): React.JSX.Element {
  return (
    <ul className={`${styles.grid} ${columns === 4 ? styles.grid4 : styles.grid3}`}>
      {items.map((i) => (
        <li key={i.t} className={styles.gridCell}>
          <h3 className={styles.gridTitle}>{i.t}</h3>
          <p className={styles.gridText}>{i.d}</p>
        </li>
      ))}
    </ul>
  );
}

export function TechSection(): React.JSX.Element {
  return (
    <section className={`${styles.section} ${styles.light}`}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Як ми будуємо</h2>
        <p className={styles.lead}>
          Базові технічні рішення, які застосовуємо на всіх наших об&apos;єктах. Якщо у конкретному
          ЖК є відмінність — окремо вказуємо у його паспорті.
        </p>
        <Grid items={BUILD_TECH} columns={4} />
      </div>
    </section>
  );
}

export function SafetySection(): React.JSX.Element {
  return (
    <section className={`${styles.section} ${styles.gray} ${styles.bordered}`}>
      <div className={styles.inner}>
        <h2 className={`${styles.title} ${styles.titleSpaced}`}>Безпека у наших ЖК</h2>
        <Grid items={SAFETY} columns={3} />
      </div>
    </section>
  );
}

export function HandoverSection(): React.JSX.Element {
  return (
    <section className={`${styles.section} ${styles.light}`}>
      <div className={`${styles.inner} ${styles.handover}`}>
        <div>
          <h2 className={styles.title}>Що ви отримуєте у день передачі квартири</h2>
          <dl className={styles.rows}>
            {HANDOVER.map((r) => (
              <div key={r.k} className={styles.row}>
                <dt>{r.k}</dt>
                <dd>{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <aside className={styles.callout}>
          <h3 className={styles.gridTitle}>Чому без ремонту «під ключ»</h3>
          <p className={styles.calloutText}>
            Це наша позиція з 2005 року. Ремонт «під ключ» означає, що ви оплачуєте чужий смак —
            кахлі, шпалери, сантехніку. У ціні 900–1000 $/м² ви платите тільки за квадратні метри.
            Ремонт обираєте і робите самі.
          </p>
        </aside>
      </div>
    </section>
  );
}

export function ServiceSection(): React.JSX.Element {
  return (
    <section className={`${styles.section} ${styles.light}`}>
      <div className={`${styles.inner} ${styles.narrow}`}>
        <h2 className={styles.title}>Що з обслуговуванням після здачі</h2>
        <p className={`${styles.text} ${styles.italic}`}>
          Своєї керуючої компанії у нас немає. І це теж позиція.
        </p>
        <p className={styles.text}>
          Після введення будинку в експлуатацію мешканці самостійно обирають форму управління: ОСББ,
          обслуговуюча компанія, керуюча. Допомагаємо з оформленням документів на старті —
          підкажемо, як зареєструвати ОСББ, з якими підрядниками працюють інші наші ЖК, до кого
          звернутися за вивозом сміття, ліфтовим обслуговуванням, прибиранням.
        </p>
        <p className={styles.note}>
          <strong>Чому так:</strong> ваш будинок — це ваші правила. Не нав&apos;язуємо тариф,
          постачальника і керівника.
        </p>
      </div>
    </section>
  );
}

export function FaqSection(): React.JSX.Element {
  return (
    <section className={`${styles.section} ${styles.gray} ${styles.borderTop}`}>
      <div className={`${styles.inner} ${styles.narrow}`}>
        <h2 className={`${styles.title} ${styles.titleSpaced}`}>Питання про документи та умови</h2>
        <div className={styles.faq}>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.faqItem}>
              <summary className={styles.faqHead}>
                {f.q}
                <span className={styles.faqIcon} aria-hidden="true">
                  ＋
                </span>
              </summary>
              <p className={styles.faqBody}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection(): React.JSX.Element {
  const telegram = MESSENGERS.find((m) => m.label === 'Telegram');
  return (
    <section className={`${styles.section} ${styles.dark}`}>
      <div className={`${styles.inner} ${styles.cta}`}>
        <div className={styles.ctaCopy}>
          <h2 className={styles.ctaTitle}>Залишилися запитання?</h2>
          <p className={styles.ctaText}>
            Якщо потрібен документ, якого нема на сторінці, або хочете перевірити деталь —
            зв&apos;яжіться з нами. Покажемо все.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Button href={PHONE_HREF} size="lg">
            Зателефонувати
          </Button>
          {telegram && (
            <Button href={telegram.href} size="lg" variant="outlineOnDark">
              Написати у месенджер
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
