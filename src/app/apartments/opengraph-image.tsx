import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/ogImage';

export const alt = 'Квартири від забудовника ЗІРКА у Чернівцях';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image(): Promise<Response> {
  return renderOgImage({
    photo: 'apartments',
    kicker: 'Квартири від забудовника',
    title: 'Купити квартиру у Чернівцях',
  });
}
