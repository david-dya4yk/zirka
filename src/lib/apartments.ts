// «Обрати квартиру» — copy from «ЗІРКА - Обрати квартиру» in the claude.ai/design project.
// ЖК на Хотинській flats take their area, floor and plan from monData; ЖК на Вишневій has no
// published flat data, so those two cards keep the design's figures.

import { FLATS, type FlatRow } from './monData';
import { flatPlan } from './publicInfo';

export type ApartmentProject = 'khotynska' | 'vyshneva';
export type ApartmentStatus = 'ready' | 'building';

export interface Apartment {
  id: string;
  project: ApartmentProject;
  projectName: string;
  href: string;
  image: string;
  status: ApartmentStatus;
  rooms: number;
  area: number;
  floor: number;
  floors: number;
  /** Extra badge on the photo, e.g. a current offer. */
  offer?: string;
}

// Full-size day render and the same frame with the windows lit (hovered cells fade the lit one in).
// Until both files are in /public the hero falls back to the ЖК на Хотинській facade.
export const HERO_IMAGE = '/images/apartments/hero.jpg';
export const HERO_LIT_IMAGE = '/images/apartments/hero-lit.jpg';
export const HERO_FALLBACK = '/images/khotynska/facade.jpg';

// Same date as the disclosure pages (the design's «II кв.2027» predates them).
const KHOTYNSKA_HANDOVER = 'III кв. 2029';
const KHOTYNSKA_FLOORS = 8;

export const PROJECT_OPTIONS: readonly { id: ApartmentProject; label: string }[] = [
  { id: 'khotynska', label: 'ЖК на Хотинській' },
  { id: 'vyshneva', label: 'ЖК на Вишневій' },
];

export const STATUS_LABEL: Record<ApartmentStatus, string> = {
  ready: 'Готова',
  building: 'У будівництві',
};

function flat(num: number): FlatRow {
  const row = FLATS.find(([n]) => n === num);
  if (!row) throw new Error(`Unknown flat №${String(num)}`);
  return row;
}

function khotynskaApartment(num: number, image: string): Apartment {
  const [, , floor, , area, , rooms] = flat(num);
  return {
    id: `khotynska-${String(num)}`,
    project: 'khotynska',
    projectName: 'ЖК на Хотинській',
    href: '/khotynska',
    image,
    status: 'building',
    rooms,
    area,
    floor,
    floors: KHOTYNSKA_FLOORS,
  };
}

// TODO: the design shows four sample flats; swap in the live list of free flats when sales has one.
export const APARTMENTS: readonly Apartment[] = [
  khotynskaApartment(16, '/frames/039.jpg'),
  khotynskaApartment(29, '/frames/030.jpg'),
  {
    id: 'vyshneva-1',
    project: 'vyshneva',
    projectName: 'ЖК на Вишневій',
    href: '/projects',
    image: '/images/projects/vyshneva.jpg',
    status: 'ready',
    rooms: 1,
    area: 38,
    floor: 2,
    floors: 5,
    offer: '+3 м²',
  },
  {
    id: 'vyshneva-2',
    project: 'vyshneva',
    projectName: 'ЖК на Вишневій',
    href: '/projects',
    image: '/images/projects/vyshneva.jpg',
    status: 'ready',
    rooms: 2,
    area: 58,
    floor: 4,
    floors: 5,
  },
];

export const SORT_OPTIONS = [
  { id: 'default', label: 'Сортування' },
  { id: 'area-desc', label: 'Більша площа' },
  { id: 'area-asc', label: 'Менша площа' },
  { id: 'ready-first', label: 'Спочатку готові' },
] as const;
export type SortId = (typeof SORT_OPTIONS)[number]['id'];

export function roomsLabel(rooms: number): string {
  return rooms === 1 ? '1 кімната' : `${String(rooms)} кімнати`;
}

/** 43.15 → "43,15", 38 → "38". */
export function formatSqm(value: number): string {
  return String(value).replace('.', ',');
}

// «Планування квартир»: one flat per layout type from both sections of ЖК на Хотинській.
export const PLANS = [16, 29, 13, 14, 59, 60].map((num) => {
  const [, section, floor, , area, , rooms] = flat(num);
  return {
    num,
    section,
    floor,
    rooms,
    title: `${String(rooms)}-кімнатна, ${area.toFixed(2).replace('.', ',')} м²`,
    handover: KHOTYNSKA_HANDOVER,
    image: flatPlan(num),
  };
});

export const INTEREST_PLACEHOLDER = 'Який ЖК або тип квартири цікавить';
export const INTERESTS = [
  'ЖК на Хотинській (будується)',
  'ЖК на Вишневій (зданий)',
  'Інший зданий ЖК',
  'Ще не визначився(-лась)',
] as const;

export interface SeoBlock {
  kind: 'p' | 'lead' | 'ul' | 'ol';
  /** Paragraph text, or list items. A leading «**…**» part is rendered bold. */
  text: string | readonly string[];
}

export const SEO: readonly { title: string; body: readonly SeoBlock[] }[] = [
  {
    title: 'Чому варто купити квартиру у Чернівцях від «Зірки»',
    body: [
      {
        kind: 'p',
        text: 'Чернівці — місто, у якому хочеться залишатися. Тиха забудова, європейський центр, активна громада, університет, що приваблює молодь. Попит на квартири у новобудовах стабільний — і серед чернівчан, що покращують умови, і серед тих, хто повертається з-за кордону.',
      },
      { kind: 'lead', text: 'Переваги покупки квартири у новобудові від «Зірки»:' },
      {
        kind: 'ul',
        text: [
          'пряма угода із забудовником, без посередників і агентських комісій',
          'нотаріальний договір купівлі-продажу через зареєстрований МОН з першого дня',
          'усі ділянки під будівництво у нашій власності',
          '21 рік на ринку Чернівців, 8 зданих обʼєктів, 560 родин у наших будинках',
          'комфорт-клас за справедливою ціною — без ремонту, який навʼязали',
        ],
      },
    ],
  },
  {
    title: 'Новобудови від «Зірки»',
    body: [
      {
        kind: 'p',
        text: 'Ми пропонуємо квартири у різних частинах Чернівців. У зданих будинках можна оглянути квартиру і заїхати протягом місяця. У ЖК на Хотинській — стартові ціни на ранньому етапі будівництва, де ще можна обрати найкращі поверхи і орієнтацію.',
      },
      { kind: 'lead', text: 'Доступні формати:' },
      {
        kind: 'ul',
        text: [
          '**Квартири у ЖК, що будується** — найвигідніша ціна на старті. Гарантоване право власності через МОН.',
          '**Готові квартири у зданих ЖК** — заїжджаєте одразу після нотаріального договору. У ЖК на Вишневій — акція: 3 м² у подарунок.',
        ],
      },
    ],
  },
  {
    title: '1-, 2- і 3-кімнатні квартири — формати і площі',
    body: [
      {
        kind: 'p',
        text: 'У наших ЖК — переважно 1-, 2- і 3-кімнатні планування. Ми не будуємо студії, це свідомий вибір: квартири розраховані на сімʼю, яка купує житло для себе.',
      },
      {
        kind: 'p',
        text: '**1-кімнатні квартири** підходять для першого власного житла, для одної людини або молодої пари. Зручні у плануванні, без зайвих метрів і коридорів.',
      },
      {
        kind: 'p',
        text: '**2-кімнатні квартири** оптимальні для сімʼї з однією дитиною або як «квартира на виріст». Кухня-вітальня або окрема кухня — залежно від ЖК.',
      },
      {
        kind: 'p',
        text: '**3-кімнатні квартири** розраховані на сімʼю з двома дітьми або тих, кому потрібен окремий кабінет. Дві окремі спальні, простора кухня-вітальня і більше місця для зберігання.',
      },
      {
        kind: 'p',
        text: 'Балкон або лоджія є у більшості квартир — місце для ранкової кави, дитячої коляски або зеленого куточка.',
      },
    ],
  },
  {
    title: 'У якому стані передаємо квартири',
    body: [
      {
        kind: 'p',
        text: 'Квартири передаються **без ремонту**. Це наша позиція, і ми її не приховуємо.',
      },
      {
        kind: 'p',
        text: 'На момент передачі у вас стіни (у узгодженому стані за договором), металопластикові вікна, встановлені вхідні двері, засклені балкони (у більшості варіантів), підведені комунікації з лічильниками і розводка електрики та сантехніки згідно з проєктом.',
      },
      {
        kind: 'p',
        text: '**Чому без «під ключ»:** ремонт «під ключ» означає, що ви оплачуєте чужий смак — плитку, шпалери, сантехніку. А так ви платите тільки за метри. Ремонт обираєте і робите самі — або разом з підрядником, якого довіряєте.',
      },
    ],
  },
  {
    title: 'Ціни на квартири у Чернівцях',
    body: [
      {
        kind: 'p',
        text: 'Ціна квартири залежить від ЖК, поверху, площі, орієнтації і стану готовності. На старті будівництва ціна завжди нижча — це найкраща точка входу.',
      },
      {
        kind: 'p',
        text: 'Ціни на квартири у ЖК на Хотинській і у зданих ЖК — за актуальним прайсом відділу продажу, залежно від обʼєкта.',
      },
      {
        kind: 'p',
        // The design says «дивіться у фільтрі вище», but the cards don't show prices yet.
        text: 'Актуальну ціну на конкретну квартиру уточнюйте у менеджера: залиште заявку — і ми надішлемо детальний прайс із вільними варіантами.',
      },
    ],
  },
  {
    title: 'Що важливо знати перед покупкою',
    body: [
      {
        kind: 'p',
        text: '**Поверх.** Верхні — більше світла і краєвиди. Середні — оптимальне співвідношення зручності і температурного комфорту. Нижні — зручні для родин з дітьми, людей старшого віку, тих, хто часто заходить-виходить.',
      },
      {
        kind: 'p',
        text: '**Орієнтація вікон.** Південь — світло цілий день, але влітку спекотно. Захід — закат і мʼяке вечірнє світло. Схід — ранкове сонце. Північ — рівне світло без перегрівів.',
      },
      {
        kind: 'p',
        text: '**Інфраструктура району.** Перед покупкою прогуляйтеся околицями: де школа, садочок, продуктовий, зупинка, аптека. Покажемо у відділі продажу адресу — заїдемо разом.',
      },
      {
        kind: 'p',
        text: '**Документи забудовника.** Усі дозволи на будівництво, акти на ділянки, технічні умови — у нашій «Проектній інформації». Дивитися можна без заяв і паролів.',
      },
    ],
  },
  {
    title: 'Розстрочка та умови оплати',
    body: [
      { kind: 'p', text: 'Ми пропонуємо два формати оплати:' },
      {
        kind: 'p',
        text: '**1. Повна оплата.** Підписуємо нотаріальний договір купівлі-продажу. Ви одразу отримуєте витяг про реєстрацію квартири на ваше імʼя.',
      },
      {
        kind: 'p',
        text: '**2. Розстрочка від забудовника.** Без банку, без комісій. Перший внесок та термін визначаємо індивідуально, обговорюємо умови особисто. Без кредитної історії і скорингів.',
      },
      {
        kind: 'p',
        text: 'Ані єОселя, ані єВідновлення наразі не підключені — ми працюємо тільки з прямою оплатою або власною розстрочкою.',
      },
    ],
  },
  {
    title: 'Юридична частина — МОН і нотаріальний договір',
    body: [
      {
        kind: 'p',
        text: '**МОН (майбутній обʼєкт нерухомості)** — це юридичний інструмент, який дозволяє покупцю стати власником квартири ще до того, як будинок офіційно прийнято в експлуатацію. У нас МОН зареєстрований на всі поточні продажі.',
      },
      { kind: 'lead', text: 'Як це працює:' },
      {
        kind: 'ol',
        text: [
          'Ви обираєте квартиру.',
          'Підписуєте у нотаріуса договір купівлі-продажу.',
          'У день підписання отримуєте витяг із Державного реєстру речових прав про реєстрацію квартири на ваше імʼя.',
          'Після здачі будинку первинна реєстрація права власності оформлюється автоматично — ви вже власник.',
        ],
      },
      {
        kind: 'p',
        text: '**Чому це краще, ніж «попередній договір»:** МОН — це не майнові права через ФФБ і не «доля у будівництві». Це повноцінна нерухомість, на яку у вас юридичний документ з першого дня.',
      },
    ],
  },
];

export const FAQ = [
  {
    q: 'Чи можна купити квартиру у розстрочку?',
    a: 'Так. Розстрочка — від забудовника, без банку. Умови індивідуальні: перший внесок і термін обговорюємо особисто. Без перевірки кредитної історії.',
  },
  {
    q: 'Скільки коштує квартира у Чернівцях від «Зірки»?',
    a: 'Ціна залежить від ЖК, поверху, площі і стану готовності. Найвигідніші ціни — на ранніх етапах будівництва.',
  },
  {
    q: 'У якому стані передаєте квартиру?',
    a: 'Без ремонту. У вас будуть стіни, вікна, вхідні двері, лічильники, підведені комунікації. Ремонт «під ключ» ми не робимо принципово — ви платите тільки за квадратні метри, а не за чужий смак у плитці.',
  },
  {
    q: 'Чи можна купити квартиру за програмою «єОселя»?',
    a: 'Ні, наразі ми не підключені ані до «єОселі», ані до «єВідновлення». Працюємо тільки з прямою оплатою або власною розстрочкою — без банку.',
  },
  {
    q: 'Що таке МОН і навіщо це мені?',
    a: 'МОН (майбутній обʼєкт нерухомості) — це юридичний інструмент, завдяки якому покупець стає власником квартири ще до здачі будинку. У нас МОН зареєстрований на всі поточні продажі.',
  },
  {
    q: 'У яких ЖК є вільні квартири?',
    a: 'Вільні квартири є у ЖК на Хотинській (будується) і у деяких зданих ЖК — серед них ЖК на Вишневій, де діє акція «3 м² у подарунок».',
  },
] as const;

// ---------------------------------------------------------------- hero window lights

// Window grid of the hero render as fractions of the 2400×1600 frame (ported from the design).
const nx = (v: number): number => (((v * 800) / 1264) * 0.991 + 3.5) / 800;
const ny = (v: number): number => (((v * 800) / 1264) * 0.994 - 0.25) / 533.33;
const COLUMN_EDGES = [148, 225, 300, 400, 515, 625, 735, 830, 925, 1000, 1168].map(nx);
const FIRST_FLOOR_Y = 212;
const FLOOR_HEIGHT = 52.5;
const LIT_FLOORS = 8;
/** Each cell grows by this share of its size on every side and fades out over it. */
export const LIGHT_PAD = 0.22;

export interface LightCell {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const LIGHT_CELLS: readonly LightCell[] = Array.from({ length: LIT_FLOORS }, (_, f) =>
  COLUMN_EDGES.slice(0, -1).map((left, c) => {
    const right = COLUMN_EDGES[c + 1] ?? left;
    const top = ny(FIRST_FLOOR_Y + f * FLOOR_HEIGHT);
    const bottom = ny(FIRST_FLOOR_Y + (f + 1) * FLOOR_HEIGHT);
    const px = (right - left) * LIGHT_PAD;
    const py = (bottom - top) * LIGHT_PAD;
    return { x: left - px, y: top - py, w: right - left + 2 * px, h: bottom - top + 2 * py };
  }),
).flat();
