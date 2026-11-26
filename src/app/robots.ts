import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/** robots.txt (spec 9.2). The admin dashboard and API routes are kept out of crawls. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
