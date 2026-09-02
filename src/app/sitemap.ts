import { CONFIG } from '@/config';
import { routing } from '@/i18n/routing';
import type { MetadataRoute } from 'next';

const pages = [
  '',
  'operators',
  'tracker',
  'weapons',
  'gear',
  'changelog',
  'privacy-policy',
  'terms-of-service',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const localeRoutes = routing.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${CONFIG.baseUrl}/${locale}${page ? `/${page}` : ''}`,
      lastModified: new Date(),
    }))
  );

  return localeRoutes;
}
