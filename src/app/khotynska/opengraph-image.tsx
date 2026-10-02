import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/ogImage';

export const alt = 'ЖК на Хотинській, Чернівці — фасад';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image(): Promise<Response> {
  return renderOgImage({
    photo: 'khotynska',
    kicker: 'ЖК комфорт-класу · у будівництві',
    title: 'ЖК на Хотинській',
  });
}
