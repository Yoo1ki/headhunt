import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { execFileSync } from 'node:child_process';

const buildId = (() => {
  const commitSha = process.env.GITHUB_SHA ?? process.env.CF_PAGES_COMMIT_SHA;
  if (commitSha) return commitSha.slice(0, 7);

  try {
    return execFileSync('git', ['rev-parse', '--short=7', 'HEAD'], {
      encoding: 'utf8',
    }).trim();
  } catch {
    return process.env.npm_package_version ?? 'development';
  }
})();

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,
  env: {
    NEXT_PUBLIC_BUILD_ID: buildId,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
