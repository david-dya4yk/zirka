import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/ogImage';

export const alt = 'Житлові комплекси ЗІРКА у Чернівцях';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image(): Promise<Response> {
  return renderOgImage({
    photo: 'projects',
    kicker: 'Наші проєкти',
    title: '8 зданих обʼєктів і ЖК на Хотинській',
  });
}
