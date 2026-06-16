import { CONFIG } from '@/config';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: CONFIG.locales.filter((e) => e.enable).map((e) => e.id),
  defaultLocale: 'en',
  localePrefix: 'always',
  localeCookie: {
    name: 'locale',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  },
});
