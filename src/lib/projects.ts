// «Проєкти» — copy from the claude.ai/design project. Photos that aren't in /public yet
// render as a «Фото фасаду» placeholder (see ProjectsCatalog).

export type ProjectCategory = 'building' | 'residential' | 'public';

export interface Project {
  name: string;
  address: string;
  category: ProjectCategory;
  image: string;
  text?: string;
  /** Extra badge on the photo, e.g. a current offer. */
  offer?: string;
  cta?: { label: string; href: string };
}

// Hero slideshow: photos of completed complexes; the caption names the current one.
export const HERO_SLIDES = [
  { src: '/images/projects/vyshneva.jpg', label: 'ЖК на Вишневій, 14Б' },
  { src: '/images/projects/veresneva-1z.jpg', label: 'ЖК на Вересневій, 1-З' },
  { src: '/images/projects/pidkovy-11b.jpg', label: 'ЖК на Івана Підкови, 11-Б' },
  { src: '/images/projects/zavodska-56k.jpg', label: 'ЖК на Заводській, 56-К' },
] as const;

export const HERO_CHIPS = [
  { label: '21 рік на ринку', accent: false },
  { label: '6 житлових ЖК', accent: false },
  { label: '2 громадських обʼєкти', accent: false },
  { label: '1 ЖК у будівництві', accent: true },
] as const;

export const FEATURED = {
  name: 'ЖК на Хотинській',
  image: '/images/khotynska/facade.jpg',
  badge: 'У будівництві · 15%',
  kicker: 'Новий проєкт · комфорт-клас',
  text: 'Новий ЖК комфорт-класу на стадії активного будівництва. Усі продажі — через нотаріальне посвідчення договору купівлі-продажу та реєстрацію МОН.',
  // The design says «здача 2027–2028»; the disclosure pages state III кв. 2029, so that wins.
  location: 'Чернівці, 4-й пров. Заводський, 2 · здача III кв. 2029',
  href: '/khotynska',
} as const;

export const PROJECTS: readonly Project[] = [
  {
    name: 'ЖК на Вишневій',
    address: 'Чернівці, вул. Вишнева, 14Б',
    category: 'residential',
    image: '/images/projects/vyshneva.jpg',
    text: 'Зданий житловий комплекс — можна оглянути сьогодні. Деякі квартири ще доступні.',
    offer: '+3 м²',
    cta: { label: 'Вільні квартири →', href: '/contacts#contact' },
  },
  {
    name: 'ЖК на Заводській, 58-З',
    address: 'Чернівці',
    category: 'residential',
    image: '/images/projects/zavodska-58z.jpg',
  },
  {
    name: 'ЖК на Заводській, 56-К',
    address: 'Чернівці',
    category: 'residential',
    image: '/images/projects/zavodska-56k.jpg',
  },
  {
    name: 'ЖК на Івана Підкови, 11-А',
    address: 'Чернівці',
    category: 'residential',
    image: '/images/projects/pidkovy-11a.jpg',
  },
  {
    name: 'ЖК на Івана Підкови, 11-Б',
    address: 'Чернівці',
    category: 'residential',
    image: '/images/projects/pidkovy-11b.jpg',
  },
  {
    name: 'ЖК на Вересневій, 1-З',
    address: 'Чернівці',
    category: 'residential',
    image: '/images/projects/veresneva-1z.jpg',
  },
  {
    name: 'Учбовий корпус БНУ',
    address: 'вул. Дарвіна, 2А',
    category: 'public',
    image: '/images/bnu.jpg',
    text: 'Корпус ПВНЗ «Буковинський університет» — здали в експлуатацію як генпідрядник.',
  },
  {
    name: 'Клуб «Рогізна»',
    address: 'вул. Возʼєднання, 2А',
    category: 'public',
    image: '/images/rohizna.jpg',
    text: 'Громадська споруда, побудована нами під ключ. Простір, у який чернівчани ходять роками.',
  },
];

export const TABS: readonly { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'Усі' },
  { id: 'building', label: 'У будівництві' },
  { id: 'residential', label: 'Здані житлові' },
  { id: 'public', label: 'Громадські обʼєкти' },
];
