// Site-wide SEO: base URL, per-page metadata (canonical, Open Graph, Twitter) and schema.org data.
// Each route's share image comes from its opengraph-image.tsx (see lib/ogImage.tsx).

import type { Metadata } from 'next';
import { COORDS, KHOTYNSKA_HERO } from './khotynska';
import { FLATS } from './monData';
import { ADDRESS, EMAIL, PHONE, PHONE_2, REQUISITES } from './siteContent';

const vercelHost = process.env['VERCEL_PROJECT_PRODUCTION_URL'];

/** Production origin: NEXT_PUBLIC_SITE_URL, else the Vercel production domain. */
export const SITE_URL = (
  process.env['NEXT_PUBLIC_SITE_URL'] ??
  (vercelHost ? `https://${vercelHost}` : 'http://localhost:3000')
).replace(/\/$/, '');

export const SITE_NAME = 'ЗІРКА';
export const TITLE_SUFFIX = ` — ${SITE_NAME}`;
export const THEME_COLOR = '#15140f';

export const DEFAULT_DESCRIPTION =
  'ПВКФ «ЗІРКА» — забудовник повного циклу у Чернівцях з 2005 року. Квартири від забудовника у ЖК на Хотинській та зданих ЖК, нотаріальний договір і МОН з першого дня.';

export interface PageSeo {
  /** Page title without the « — ЗІРКА» suffix (the root layout's template adds it). */
  title: string;
  description: string;
  path: string;
  /** Use the title as-is, without the suffix (home page). */
  absoluteTitle?: boolean;
}

export function pageMetadata({ title, description, path, absoluteTitle }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title}${TITLE_SUFFIX}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'uk_UA',
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  };
}

// ---------------------------------------------------------------- pages

export const PAGES = {
  home: {
    title: 'ЗІРКА — новобудови у Чернівцях від забудовника',
    description: DEFAULT_DESCRIPTION,
    path: '/',
    absoluteTitle: true,
  },
  apartments: {
    title: 'Купити квартиру у Чернівцях від забудовника',
    description:
      'Вільні 1-, 2- і 3-кімнатні квартири у Чернівцях: ЖК на Хотинській у будівництві та готові квартири у зданих ЖК. Без посередників, нотаріальний договір і МОН.',
    path: '/apartments',
  },
  projects: {
    title: 'Проєкти та здані ЖК у Чернівцях',
    description:
      'Житлові комплекси та громадські обʼєкти ПВКФ «ЗІРКА»: ЖК на Хотинській у будівництві, 6 зданих ЖК, учбовий корпус БНУ і клуб «Рогізна» у Чернівцях.',
    path: '/projects',
  },
  khotynska: {
    title: 'ЖК на Хотинській у Чернівцях: квартири від 900 $/м²',
    description:
      'Восьмиповерховий ЖК на дві секції з підземним паркінгом: 80 квартир, 4-й пров. Заводський, 2, Чернівці. Планування, хід будівництва, ціни та умови придбання.',
    path: '/khotynska',
  },
  projectInfo: {
    title: 'Проектна інформація: документи, МОН, технології',
    description:
      'Документи на ЖК ПВКФ «ЗІРКА», технології будівництва, безпека, стан квартир при здачі, обслуговування та відповіді на питання про МОН і договір.',
    path: '/project-info',
  },
  publicInfo: {
    title: 'Публічна інформація: 4-й пров. Заводський, 2',
    description:
      'Розкриття інформації про обʼєкт будівництва у Чернівцях: технічні характеристики, замовник, дозвіл, ідентифікатори МОН, планування та умови придбання.',
    path: '/public-info',
  },
  contacts: {
    title: 'Контакти відділу продажу у Чернівцях',
    description:
      'Офіс продажу ПВКФ «ЗІРКА»: вул. Зоряна, 4, Чернівці. Пн–Пт 10:00–18:00. Телефони, Viber, Telegram, WhatsApp, запис на показ квартир і будмайданчика.',
    path: '/contacts',
  },
} as const satisfies Record<string, PageSeo>;

// ---------------------------------------------------------------- schema.org

const ORG_ID = `${SITE_URL}/#organization`;
const EDRPOU = /ЄДРПОУ:\s*(\d+)/.exec(REQUISITES)?.[1];
const toTel = (phone: string): string => phone.replace(/[^\d+]/g, '');

export function organizationSchema(): Record<string, unknown> {
  return {
    '@type': 'GeneralContractor',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: 'ПВКФ «Зірка»',
    url: SITE_URL,
    logo: `${SITE_URL}/apple-icon.png`,
    image: `${SITE_URL}${KHOTYNSKA_HERO}`,
    description: DEFAULT_DESCRIPTION,
    foundingDate: '2005',
    telephone: toTel(PHONE),
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.split(',').slice(0, 2).join(',').trim(),
      addressLocality: 'Чернівці',
      addressRegion: 'Чернівецька область',
      addressCountry: 'UA',
    },
    areaServed: { '@type': 'City', name: 'Чернівці' },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00',
    },
    contactPoint: [PHONE, PHONE_2].map((phone) => ({
      '@type': 'ContactPoint',
      telephone: toTel(phone),
      contactType: 'sales',
      availableLanguage: ['uk'],
    })),
    ...(EDRPOU && {
      identifier: { '@type': 'PropertyValue', propertyID: 'ЄДРПОУ', value: EDRPOU },
    }),
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'uk',
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbSchema(name: string, path: string): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Головна', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

// FAQ rich results are limited to gov/health sites since 2026-05; the markup still describes
// the visible Q&A to search and answer engines.
export function faqSchema(items: readonly { q: string; a: string }[]): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function khotynskaSchema(): Record<string, unknown> {
  return {
    '@type': 'ApartmentComplex',
    '@id': `${SITE_URL}/khotynska#complex`,
    name: 'ЖК на Хотинській',
    description: PAGES.khotynska.description,
    url: `${SITE_URL}/khotynska`,
    image: `${SITE_URL}${KHOTYNSKA_HERO}`,
    numberOfAccommodationUnits: FLATS.length,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4-й пров. Заводський, 2',
      addressLocality: 'Чернівці',
      addressRegion: 'Чернівецька область',
      addressCountry: 'UA',
    },
    geo: { '@type': 'GeoCoordinates', latitude: COORDS.lat, longitude: COORDS.lng },
    containsPlace: { '@type': 'ParkingFacility', name: 'Підземний паркінг' },
    provider: { '@id': ORG_ID },
  };
}
