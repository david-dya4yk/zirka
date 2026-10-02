import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/ogImage';

export const alt = 'ЗІРКА — забудовник повного циклу у Чернівцях';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image(): Promise<Response> {
  return renderOgImage({
    photo: 'home',
    kicker: 'Новобудови у Чернівцях',
    title: 'Свій будинок. Своя відповідальність. Свої люди.',
  });
}
