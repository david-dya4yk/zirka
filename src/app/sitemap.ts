import type { MetadataRoute } from 'next';
import { PAGES, SITE_URL } from '@/lib/seo';

const PRIORITY: Record<keyof typeof PAGES, number> = {
  home: 1,
  apartments: 0.9,
  khotynska: 0.9,
  projects: 0.8,
  contacts: 0.7,
  projectInfo: 0.6,
  publicInfo: 0.5,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return (Object.keys(PAGES) as (keyof typeof PAGES)[]).map((key) => ({
    url: `${SITE_URL}${PAGES[key].path === '/' ? '' : PAGES[key].path}`,
    lastModified,
    changeFrequency: key === 'apartments' || key === 'khotynska' ? 'weekly' : 'monthly',
    priority: PRIORITY[key],
  }));
}
