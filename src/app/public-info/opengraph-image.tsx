import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/ogImage';

export const alt = 'Публічна інформація про обʼєкт на 4-му пров. Заводському, 2';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image(): Promise<Response> {
  return renderOgImage({
    photo: 'public-info',
    kicker: 'Розкриття інформації',
    title: '4-й пров. Заводський, 2',
  });
}
