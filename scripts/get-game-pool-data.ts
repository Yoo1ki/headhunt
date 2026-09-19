import fs from 'fs/promises';
import path from 'path';
import type {
  GamePoolOperator,
  GamePoolWeapon,
} from '../src/types/api/game-pool';
import { CONFIG } from '@/config';
import { TRACKER_CONFIG } from '@/config/tracker';
import { ensureDirs } from './lib/ensure-dirs';
import { writeJsonFiles } from './lib/write-json-files';
import { bannerPoolConfig } from './config/banner-pools';
import { logger, runScript } from './lib/logger';

const dir = process.cwd();

const paths = {
  rawBanners: path.join(dir, 'raw/game/pool'),
};

async function getContent(lang: string, poolId: string) {
  const params = new URLSearchParams({
    lang,
    pool_id: poolId,
    server_id: '2',
  });

  const response = await fetch(
    `${TRACKER_CONFIG.api.baseUrl}/api/content?${params}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${lang} (${poolId}): ${response.status}`);
  }

  return response.json();
}

async function main() {
  await ensureDirs(paths.rawBanners);

  await Promise.all(
    bannerPoolConfig.pools.map(async (pool) => {
      const outputDir = path.join(paths.rawBanners, pool.id);

      const logs: string[] = [];

      const results = await Promise.all(
        CONFIG.locales.map(async (locale) => {
          const filePath = path.join(outputDir, `${locale.id}.json`);

          try {
            await fs.access(filePath);
            logs.push(`⏩ skip (exists): ${locale.id}.json`);
            return null;
          } catch {}

          const data = (await getContent(locale.value, pool.id)) as
            GamePoolOperator | GamePoolWeapon;

          if (data.code !== 0) {
            logs.push(`⚠️ skip ${locale.id} (code: ${data.code})`);
            return null;
          }

          logs.push(`✅ fetched ${locale.id}`);
          return [`${locale.id}.json`, data] as const;
        })
      );

      const filtered = results.filter(Boolean) as NonNullable<
        (typeof results)[number]
      >[];

      if (filtered.length === 0) {
        logger.info(`Pool ${pool.id}`);
        logs.forEach((message) => logger.info(message));
        logger.warn(`No new data for pool ${pool.id}`);
        return;
      }

      const dataMap = Object.fromEntries(filtered);

      await fs.mkdir(outputDir, { recursive: true });
      await writeJsonFiles(dataMap, outputDir);

      logger.info(`Pool ${pool.id}`);
      logs.forEach((message) => logger.info(message));
    })
  );
}

runScript('Game pool data fetch', main);
