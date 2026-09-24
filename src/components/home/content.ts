export const PHONE = '+380 67 007 99 99';
export const PHONE_HREF = 'tel:+380670079999';
export const EMAIL = 'zirka9999@ukr.net';
export const ADDRESS = 'вул. Зоряна, 4, Чернівці';

// Other pages don't exist yet, so nav targets the matching home-page sections.
export const NAV_LINKS = [
  { label: 'Про нас', href: '#about' },
  { label: 'Проєкти', href: '#projects' },
  { label: 'Обрати квартиру', href: '#projects' },
  { label: 'Контакти', href: '#contact' },
] as const;
