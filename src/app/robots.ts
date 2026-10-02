import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  // Keep preview deployments out of the index; only production is crawlable.
  const vercelEnv = process.env['VERCEL_ENV'];
  const isProduction = !vercelEnv || vercelEnv === 'production';
  return {
    rules: isProduction ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
