// ЖК на Хотинській (4-й пров. Заводський, 2) — copy from «ЗІРКА - ЖК на Хотинській» in the
// claude.ai/design project. Shared facts (plans, progress photos, MON data) come from publicInfo/monData.

import { FLATS } from './monData';

// Full front render of the building.
export const KHOTYNSKA_HERO = '/images/khotynska/facade.jpg';
export const SALES_PHONE = '+38 (050) 939-34-96';
export const SALES_PHONE_HREF = 'tel:+380509393496';
// Building site pin shared by the client (the design's 48.2921, 25.9358 was ~3 km off).
export const COORDS = { lat: 48.317129, lng: 25.9230844 };
/** 48.3171° N · 25.9231° E */
export const COORDS_LABEL = `${COORDS.lat.toFixed(4)}° N · ${COORDS.lng.toFixed(4)}° E`;
export const MAPS_URL = `https://www.google.com/maps?q=${String(COORDS.lat)},${String(COORDS.lng)}`;
export const MAP_EMBED = `https://www.google.com/maps?q=${String(COORDS.lat)},${String(COORDS.lng)}&z=16&hl=uk&output=embed`;
export const READINESS = 15;

export const HERO_STATS = [
  { v: String(FLATS.length), k: 'Квартир' },
  { v: '8', k: 'Поверхів · 2 секції' },
  { v: '43', k: 'Паркомісця' },
  { v: 'від 900 $', k: 'За м²' },
] as const;

export const ANCHORS = [
  { id: 'about', label: 'Про ЖК' },
  { id: 'why', label: 'Переваги' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'plans', label: 'Планування' },
  { id: 'tech', label: 'Технології' },
  { id: 'location', label: 'Розташування' },
  { id: 'progress', label: 'Хід будівництва' },
  { id: 'buy', label: 'Умови' },
  { id: 'docs', label: 'Документи' },
] as const;

export const FACTS = [
  { v: '8', k: 'поверхів' },
  { v: '2', k: 'секції з ліфтами' },
  { v: String(FLATS.length), k: 'квартир' },
  { v: '2,8 м', k: 'висота стель' },
  { v: '34 + 9', k: 'паркомісць: підземних і відкритих' },
  { v: '15', k: 'комор' },
  { v: '198', k: 'місць у захисній споруді' },
  { v: '«C»', k: 'клас енергоефективності' },
] as const;

export const WHY = [
  {
    t: 'Власна земля',
    d: 'Ділянку викуплено у власність, не в оренду. Жодних ризиків з боку третіх осіб.',
  },
  {
    t: 'Власна техніка',
    d: 'Крани, екскаватори, самоскиди — наші. Темп будівництва не залежить від орендодавців.',
  },
  {
    t: 'Повний цикл',
    d: 'ЗІРКА — замовник і генпідрядник. Від котловану до введення в експлуатацію.',
  },
  {
    t: 'Безпечна угода',
    d: 'Нотаріальний договір купівлі-продажу та реєстрація МОН на ваше імʼя.',
  },
] as const;

// Gallery: main tile is the tall corner render, the wide front view spans the top-right cells.
export const GALLERY = [
  { src: '/images/khotynska/gallery-1.jpg', label: 'Будинок з боку вулиці' },
  { src: KHOTYNSKA_HERO, label: 'Головний фасад' },
  { src: '/images/khotynska/gallery-2.jpg', label: 'Вхідна група' },
  { src: '/images/khotynska/gallery-3.jpg', label: 'Балкони та перший поверх' },
] as const;

export const PLAN_TABS = [
  { label: 'Паркінг', src: '/images/public-info/plan-parking.jpg' },
  { label: '1 поверх · 1 підʼїзд', src: '/images/public-info/plan-s1-f1.jpg' },
  { label: '2 поверх · 1 підʼїзд', src: '/images/public-info/plan-s1-f2.jpg' },
  { label: 'Типовий · 1 підʼїзд', src: '/images/public-info/plan-s1-typ.jpg' },
  { label: '1 поверх · 2 підʼїзд', src: '/images/public-info/plan-s2-f1.jpg' },
  { label: 'Типовий · 2 підʼїзд', src: '/images/public-info/plan-s2-typ.jpg' },
] as const;

const ROOM_NAMES: Record<number, string> = { 1: '1-кімнатні', 2: '2-кімнатні', 3: '3-кімнатні' };

const area = (v: number): string => v.toFixed(1).replace('.', ',');

/** Area range and count per room type, computed from the MON flat list. */
export const ROOM_STATS = [...new Set(FLATS.map((f) => f[6]))]
  .sort((a, b) => a - b)
  .map((rooms) => {
    const areas = FLATS.filter((f) => f[6] === rooms).map((f) => f[4]);
    const min = Math.min(...areas);
    const max = Math.max(...areas);
    return {
      t: ROOM_NAMES[rooms] ?? `${String(rooms)}-кімнатні`,
      area: `${min === max ? area(min) : `${area(min)}–${area(max)}`} м²`,
      count: `${String(areas.length)} квартир`,
    };
  });

export const TECH = [
  {
    k: 'Фундамент',
    v: 'Залізобетонний монолітний стрічковий, частково стовпчастий. Бетон С16/20, арматура А500С.',
  },
  { k: 'Стіни', v: 'Керамічна цегла із зовнішнім утепленням пінополістирольними плитами.' },
  {
    k: 'Каркас',
    v: 'Камʼяна схема з частковою заміною несучих стін залізобетонними рамами. Паркінг — монолітний каркас.',
  },
  {
    k: 'Опалення',
    v: 'Індивідуальне: газові двоконтурні котли Vaillant ecoTEC plus, двотрубна система, термостатичні клапани на радіаторах.',
  },
  {
    k: 'Ліфти',
    v: 'Ліфт підвищеної комфортності в кожній секції: 1000 кг, 1,6 м/с, кабіна для маломобільних груп. Шахти не примикають до житлових кімнат.',
  },
  {
    k: 'Вентиляція',
    v: 'Витяжка через канали з кухонь і санвузлів, приплив — через провітрювачі у вікнах.',
  },
  {
    k: 'Укриття',
    v: 'Протирадіаційне укриття П-1 у паркінгу на 198 осіб, подвійного призначення.',
  },
] as const;

export const LOCATION_ROWS = [
  { k: 'Координати', v: COORDS_LABEL, mono: true },
  { k: 'Відкриті стоянки', v: '9 гостьових місць', mono: false },
  { k: 'Благоустрій', v: 'Тротуари, освітлення, лавочки', mono: false },
] as const;

export const PAYMENT_OPTIONS = [
  { v: '100 %', t: 'Повна оплата', d: 'Найкраща ціна за м² на етапі будівництва.', accent: false },
  {
    v: '0 %',
    t: 'Розтермінування',
    d: 'Від забудовника, без банку. Перший внесок і термін — індивідуально.',
    accent: true,
  },
] as const;

export const STEPS = [
  'Консультація та вибір квартири',
  'Огляд документів і будмайданчика',
  'Нотаріальний договір купівлі-продажу',
  'Реєстрація МОН на ваше імʼя',
] as const;

// «Правова інформація» doesn't exist yet, so it is left out.
export const DOCS = [
  {
    t: 'Публічна інформація про обʼєкт',
    s: 'Ідентифікатор, характеристики, замовник, перелік МОН',
    href: '/public-info',
    external: false,
  },
  {
    t: 'Проектна інформація',
    s: 'Дозволи, технології, умови передачі квартир',
    href: '/project-info',
    external: false,
  },
  {
    t: 'Дозвіл на будівельні роботи',
    s: 'ЄДЕССБ · ЧВ012250321873 від 26.03.2025',
    href: 'https://e-construction.gov.ua/',
    external: true,
  },
] as const;

export const INTERESTS = ['Прайс і планування', 'Показ на обʼєкті', 'Розтермінування'] as const;
