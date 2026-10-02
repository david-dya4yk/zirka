import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/ogImage';

export const alt = 'Проектна інформація ЗІРКА: документи, МОН, технології';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image(): Promise<Response> {
  return renderOgImage({
    photo: 'project-info',
    kicker: 'Проектна інформація',
    title: 'Документи, МОН і технології',
  });
}
