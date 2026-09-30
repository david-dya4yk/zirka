export const PHONE = '+380 67 007 99 99';
export const PHONE_HREF = 'tel:+380670079999';
export const EMAIL = 'zirka9999@ukr.net';
export const ADDRESS = 'вул. Зоряна, 4, Чернівці';

// Sections that only exist on the home page are addressed as /#id so they work from any route.
export const NAV_LINKS = [
  { label: 'Про нас', href: '/#about' },
  { label: 'Проєкти', href: '/#projects' },
  { label: 'Обрати квартиру', href: '/#projects' },
  { label: 'Проектна інформація', href: '/project-info' },
  { label: 'Контакти', href: '/contacts' },
] as const;

export const PHONE_2 = '+380 66 922 33 11';
export const PHONE_2_HREF = 'tel:+380669223311';
export const SCHEDULE = 'Пн–Пт, 10:00–18:00';
export const ROUTE_URL = 'https://www.google.com/maps/dir/?api=1&destination=Чернівці,вул.Зоряна,4';
export const MAP_EMBED_URL =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('вул. Зоряна, 4, Чернівці') +
  '&z=16&hl=uk&output=embed';

// Chats open on the main number (both numbers have Viber, Telegram and WhatsApp).
export const MESSENGERS = [
  { label: 'Viber', href: 'viber://chat?number=%2B380670079999' },
  { label: 'Telegram', href: 'https://t.me/+380670079999' },
  { label: 'WhatsApp', href: 'https://wa.me/380670079999' },
] as const;

// TODO: replace with the company's real profile URLs — the design only has placeholders.
export const SOCIALS = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Telegram', href: '#' },
] as const;

export const REQUISITES =
  'ПВКФ «Зірка» · ЄДРПОУ: 03335617 · Юридична адреса: вул. Зоряна, 4, м. Чернівці · Керівник: Юрій Васильович Котильов';
