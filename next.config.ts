import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withPWAInit from 'next-pwa';

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,
};

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: false,
  disable: process.env.NODE_ENV === 'development',
});

const withNextIntl = createNextIntlPlugin();

export default withPWA(withNextIntl(nextConfig));

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
