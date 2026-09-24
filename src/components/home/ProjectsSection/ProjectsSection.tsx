import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import styles from './ProjectsSection.module.scss';

interface CompletedProject {
  name: string;
  address: string;
  image: string;
  badge: 'success' | 'neutral';
  note: string;
  /** Residential complexes with apartments still for sale get a link and a flame note. */
  forSale: boolean;
}

const COMPLETED: readonly CompletedProject[] = [
  {
    name: 'ЖК на Вишневій',
    address: 'Чернівці, вул. Вишнева, 14Б',
    image: '/images/vyshneva.jpg',
    badge: 'success',
    note: 'Є вільні квартири',
    forSale: true,
  },
  {
    name: 'Учбовий корпус БНУ',
    address: 'Буковинський університет',
    image: '/images/bnu.jpg',
    badge: 'neutral',
    note: 'Громадський обʼєкт',
    forSale: false,
  },
  {
    name: 'Клуб «Рогізна»',
    address: 'Чернівці',
    image: '/images/rohizna.jpg',
    badge: 'neutral',
    note: 'Громадський обʼєкт',
    forSale: false,
  },
];

function PinIcon(): React.JSX.Element {
  return (
    <svg
      width="17"
      height="17"
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

function CalendarIcon(): React.JSX.Element {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E8571B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18M8 2v4M16 2v4" />
    </svg>
  );
}

function GiftIcon(): React.JSX.Element {
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
      <path d="M20 12v10H4V12" />
      <path d="M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}

export function ProjectsSection(): React.JSX.Element {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>[ ОБʼЄКТИ ]</p>
            <h2 className={styles.title}>Наші проєкти</h2>
            <p className={styles.lead}>
              Серед реалізованих проєктів — 6 житлових комплексів та некомерційні проєкти:
              навчальний корпус Буковинського університету та клуб «Рогізна».
            </p>
          </div>
          <Button variant="outline">Усі проєкти →</Button>
        </div>

        <article className={styles.featured}>
          <div className={styles.featuredMedia}>
            <Image
              src="/frames/039.jpg"
              alt="ЖК на Хотинській"
              fill
              sizes="(max-width: 768px) 100vw, 56vw"
            />
            <div className={styles.featuredShade} />
            <div className={styles.featuredBadge}>
              <Badge variant="amber">У будівництві · 15%</Badge>
            </div>
          </div>
          <div className={styles.featuredBody}>
            <p className={styles.kicker}>Новий проєкт</p>
            <h3 className={styles.featuredTitle}>ЖК на Хотинській</h3>
            <p className={styles.featuredSub}>4-й провулок Заводський</p>
            <ul className={styles.facts}>
              <li>
                <PinIcon />
                Чернівці, 4-й пров. Заводський
              </li>
              <li>
                <CalendarIcon />
                Здача 2029
              </li>
            </ul>
            <div className={styles.offerTag}>
              <GiftIcon />
              <span>Спеціальна пропозиція</span>
            </div>
            <div>
              <Button href="#offers">Детальніше</Button>
            </div>
          </div>
        </article>

        <div className={styles.cards}>
          {COMPLETED.map((project) => (
            <article key={project.name} className={styles.card}>
              <div className={styles.cardMedia}>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className={styles.cardBadge}>
                  <Badge variant={project.badge}>Зданий</Badge>
                </div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{project.name}</h3>
                <p className={styles.cardAddress}>{project.address}</p>
                <div className={styles.cardFoot}>
                  <span className={project.forSale ? styles.noteAccent : styles.note}>
                    {project.note}
                  </span>
                  {project.forSale && (
                    <Button variant="ghost" size="sm">
                      Дивитися →
                    </Button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
