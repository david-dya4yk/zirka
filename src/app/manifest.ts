import type { MetadataRoute } from 'next';
import { DEFAULT_DESCRIPTION, SITE_NAME, THEME_COLOR } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ЗІРКА — забудовник у Чернівцях',
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    lang: 'uk',
    start_url: '/',
    display: 'standalone',
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
