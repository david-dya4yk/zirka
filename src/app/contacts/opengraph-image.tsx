import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/ogImage';

export const alt = 'Контакти відділу продажу ЗІРКА у Чернівцях';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image(): Promise<Response> {
  return renderOgImage({
    photo: 'contacts',
    kicker: 'Відділ продажу · Пн–Пт 10:00–18:00',
    title: 'Вул. Зоряна, 4, Чернівці',
  });
}
