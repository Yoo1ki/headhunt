import fs from 'fs/promises';
import path from 'path';
import { GamePoolOperator } from './interfaces/game-pool-operator';
import { GamePoolWeapon } from './interfaces/game-pool-weapon';
import { CONFIG } from '@/config';
import { ensureDirs } from './lib/ensure-dirs';
import { writeJsonFiles } from './lib/write-json-files';
import { scriptConfig } from './config';

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

  const res = await fetch(`${CONFIG.endfieldBaseUrl}/api/content?${params}`);

  if (!res.ok) {
    throw new Error(`❌ Failed fetch ${lang} (${poolId}): ${res.status}`);
  }

  return res.json();
}

async function main() {
  await ensureDirs(paths.rawBanners);

  await Promise.all(
    scriptConfig.pools.map(async (pool) => {
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
            | GamePoolOperator
            | GamePoolWeapon;

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
        console.log(`\n📦 ${pool.id}`);
        logs.forEach((l) => console.log('  ' + l));
        console.warn(`🚫 no new data`);
        return;
      }

      const dataMap = Object.fromEntries(filtered);

      await fs.mkdir(outputDir, { recursive: true });
      await writeJsonFiles(dataMap, outputDir);

      console.log(`\n📦 ${pool.id}`);
      logs.forEach((l) => console.log('  ' + l));
    })
  );
}

main().catch(console.error);
