import { CONFIG } from '@/config';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: CONFIG.appName,
    short_name: CONFIG.appShortName,
    start_url: '/',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#232323',
    background_color: '#171717',
    display: 'standalone',
  };
}
