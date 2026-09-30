import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  COMMISSIONING,
  COMPANY,
  FLOOR_PLANS,
  GENPLAN,
  type InfoRow,
  OBJECT_ADDRESS,
  OBJECT_ID,
  PERMIT,
  PERMIT_URL,
  PRICE_TERMS,
  PROGRESS_PHOTOS,
  SECTIONS,
  TECH,
} from '@/lib/publicInfo';
import { IdentifiersTabs } from './IdentifiersTabs';
import { PlanImage } from './PlanImage';
import styles from './Disclosure.module.scss';

type SectionId = (typeof SECTIONS)[number]['id'];

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: SectionId;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}): React.JSX.Element {
  const n = SECTIONS.findIndex((s) => s.id === id) + 1;
  return (
    <section id={id} className={styles.block} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={styles.blockTitle}>
        {n}. {title}
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {children}
    </section>
  );
}

function Rows({
  rows,
  wide = false,
}: {
  rows: readonly InfoRow[];
  wide?: boolean;
}): React.JSX.Element {
  return (
    <>
      {rows.map((row) => (
        <div key={row.k} className={`${styles.row} ${wide ? styles.rowWide : ''}`}>
          <dt className={styles.rowKey}>{row.k}</dt>
          <dd className={styles.rowValue}>{row.v}</dd>
        </div>
      ))}
    </>
  );
}

export function Disclosure(): React.JSX.Element {
  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <nav className={styles.toc} aria-label="Розділи">
          {SECTIONS.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className={styles.tocLink}>
              {i + 1}. {s.label}
            </a>
          ))}
        </nav>

        <div className={styles.content}>
          <Section
            id="object-id"
            title="Ідентифікатор об'єкта будівництва"
            subtitle="Ідентифікатор об'єкта будівництва (закінченого будівництвом об'єкта)"
          >
            <code className={styles.objectId}>{OBJECT_ID}</code>
          </Section>

          <Section
            id="tech"
            title="Основні технічні характеристики"
            subtitle="Основні технічні характеристики подільного об'єкта незавершеного будівництва визначаються згідно з переліком, затвердженим Кабінетом Міністрів України, але в обсязі не меншому, ніж передбачено законодавством:"
          >
            <dl className={styles.rows}>
              <div className={styles.row}>
                <dt className={styles.rowKey}>Розташування та генеральний план</dt>
                <dd className={styles.rowValue}>
                  {OBJECT_ADDRESS}
                  <PlanImage
                    src={GENPLAN.src}
                    alt="Генеральний план ділянки, 4-й пров. Заводський, 2"
                    placeholder={GENPLAN.label}
                  />
                </dd>
              </div>
              <Rows rows={TECH} />
            </dl>
            <div className={styles.plans}>
              {FLOOR_PLANS.map((plan) => (
                <figure key={plan.src} className={styles.plan}>
                  <figcaption className={styles.caption}>{plan.label}</figcaption>
                  <PlanImage
                    src={plan.src}
                    alt={plan.alt}
                    placeholder={plan.label}
                    ratio={'ratio' in plan ? plan.ratio : undefined}
                  />
                </figure>
              ))}
            </div>
          </Section>

          <Section
            id="customer"
            title="Замовник будівництва"
            subtitle="Відомості про замовника будівництва, девелопера будівництва, управителя фонду фінансування будівництва"
          >
            <dl className={styles.rows}>
              <Rows rows={COMPANY} wide />
            </dl>
          </Section>

          <Section
            id="contractor"
            title="Генеральний підрядник"
            subtitle="Відомості про генерального підрядника або підрядника (якщо будівельні роботи виконуються без залучення субпідрядників) та девелопера, передбачені пунктом 3 цієї частини"
          >
            <p className={styles.callout}>
              Генеральний підрядник — <strong>ПВКФ «ЗІРКА»</strong>, той самий суб&apos;єкт, що і
              замовник будівництва. Усі відомості, передбачені пунктом 3, — у розділі вище.
            </p>
          </Section>

          <Section
            id="commissioning"
            title="Прийняття в експлуатацію"
            subtitle="Запланований квартал, рік прийняття в експлуатацію закінченого будівництвом об'єкта"
          >
            <p className={styles.commissioning}>{COMMISSIONING}</p>
          </Section>

          <Section
            id="permit"
            title="Право на виконання будівельних робіт"
            subtitle="Відомості про право на виконання будівельних робіт з посиланням на відповідні відомості та документи в Єдиній державній електронній системі у сфері будівництва"
          >
            <div className={styles.permit}>
              <span>{PERMIT}</span>
              <a
                href={PERMIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.permitLink}
              >
                ЄДЕССБ →
              </a>
            </div>
          </Section>

          <Section
            id="progress"
            title="Хід будівництва"
            subtitle="Відомості про хід будівництва (щомісячні фотографії об'єкта, графік виконання робіт та стан його виконання)"
          >
            <div className={styles.photos}>
              {PROGRESS_PHOTOS.map((photo) => (
                <figure key={photo.src} className={styles.plan}>
                  <figcaption className={styles.caption}>{photo.label}</figcaption>
                  <PlanImage
                    src={photo.src}
                    alt={`Хід будівництва — ${photo.label.toLowerCase()}`}
                    placeholder="Фото об'єкта"
                    fit="cover"
                    className={styles.photo}
                  />
                </figure>
              ))}
            </div>
            <p className={styles.note}>
              Графік виконання робіт та стан його виконання — у розділі{' '}
              <Link href="/project-info" className={styles.permitLink}>
                «Проектна інформація»
              </Link>
              .
            </p>
          </Section>

          <Section
            id="identifiers"
            title="Ідентифікатори майбутніх об'єктів нерухомості"
            subtitle="Відомості про майбутні об'єкти нерухомості, які продано та які продаються, перелік яких визначається Кабінетом Міністрів України"
          >
            <p className={styles.text}>
              Адреса об&apos;єкта: провулок Заводський 4-й, будинок 2, м. Чернівці. Обмеблювання на
              схемах (планах) розміщення окремих приміщень у складі майбутнього об&apos;єкта
              нерухомості зображено умовно і не передбачає зобов&apos;язання такого обмеблювання зі
              сторони Продавця.
            </p>
            <IdentifiersTabs />
          </Section>

          <Section
            id="price"
            title="Умови придбання та ціна"
            subtitle="Умови придбання (Типовий Договір чинний з 01.10.2025) та ціна майбутніх об'єктів нерухомості або спосіб її визначення"
          >
            {PRICE_TERMS.map((term) => (
              <p key={term.slice(0, 40)} className={styles.priceText}>
                {term}
              </p>
            ))}
            <div className={styles.actions}>
              <Button href="/#projects">Обрати квартиру</Button>
              <Button href="/contacts" variant="outline">
                Задати питання →
              </Button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
