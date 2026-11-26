import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * sitemap.xml (spec 9.2). List only pages we want ranked: /privacy and /terms
 * stay out until their legal review (tracker, owner content #20).
 * Update `lastModified` when a page's content changes; new routes are added
 * here as they ship (service pages, /about, /contact, blog).
 */
const ROUTES: { path: string; lastModified: string; priority: number }[] = [
  { path: '/', lastModified: '2026-11-26', priority: 1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, lastModified, priority }) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified,
    priority,
  }));
}
