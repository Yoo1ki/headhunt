import fs from 'fs/promises';
import { CONFIG } from '@/config';
import puppeteer, { Browser, HTTPResponse } from 'puppeteer-core';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { SKPortWikiCatalog } from './interfaces/skport-wiki-catalog';
import { SKPortWikiDetailOperator } from './interfaces/skport-wiki-detail-operator';

const dir = process.cwd();

const paths = {
  rawCatalog: path.join(dir, 'raw/skport/wiki/catalog'),
} as const;

const executablePath =
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\src\\Puppeteer\\User Data';
const pageUrl = 'https://wiki.skport.com/endfield/detail';

const subIds: Record<string, string> = {
  '1': 'operators',
  '2': 'weapons',
  '4': 'gear',
};

async function readJsonFiles<T>(dir: string): Promise<Record<string, T>> {
  const files = await fs.readdir(dir);
  const data: Record<string, T> = {};

  for (const file of files) {
    const content = await fs.readFile(path.join(dir, file), 'utf-8');
    data[file] = JSON.parse(content);
  }

  return data;
}

async function saveJson(dir: string, locale: string, data: unknown) {
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${locale}.json`);
  await writeFile(filePath, JSON.stringify(data), 'utf-8');
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildSlugMap(
  json: SKPortWikiCatalog
): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};

  const subData = json.data.catalog.find((e) => e.id === '1')?.typeSub;

  const items = Object.entries(subIds).flatMap(
    ([subId]) =>
      subData
        ?.find((e) => e.id === subId)
        ?.items.map((item) => ({
          subId,
          itemId: item.itemId,
          itemName: item.name,
        })) ?? []
  );

  for (const item of items) {
    if (!result[item.subId]) result[item.subId] = {};
    result[item.subId][item.itemId] = generateSlug(item.itemName);
  }

  return result;
}

async function fetchItem(
  browser: Browser,
  item: { subId: string; path: string; itemId: string },
  localeId: string,
  region: string
): Promise<SKPortWikiDetailOperator | null> {
  for (let attempt = 1; attempt <= Infinity; attempt++) {
    const page = await browser.newPage();

    try {
      let found = false;

      const data: SKPortWikiDetailOperator | null = await new Promise(
        async (resolve) => {
          const timeout = setTimeout(() => {
            if (!found) resolve(null);
          }, 8000);

          page.on('response', async (response: HTTPResponse) => {
            const url = response.url();

            if (!url.includes(`/web/v1/wiki/item/info?id=${item.itemId}`))
              return;

            try {
              const json = (await response.json()) as SKPortWikiDetailOperator;

              if (json.code !== 0) return;

              found = true;
              clearTimeout(timeout);
              resolve(json);
            } catch {
              resolve(null);
            }
          });

          await page.evaluateOnNewDocument((region: string) => {
            localStorage.setItem(
              'SK_THEME_INFO',
              JSON.stringify({
                region,
                lang: 'en',
                device: 'desktop',
                color: 'dark',
                nativeColor: 'dark',
              })
            );
          }, region);

          await page.goto(
            `${pageUrl}?mainTypeId=1&subTypeId=${item.subId}&gameEntryId=${item.itemId}`,
            { waitUntil: 'domcontentloaded' }
          );
        }
      );

      await page.close();

      if (data) return data;

      console.log(`[${localeId}] (${item.path}) retry ${attempt}...`);

      await new Promise((r) => setTimeout(r, 1000));
    } catch {
      await page.close();
    }
  }

  return null;
}

async function main() {
  console.log('🔥 [Get]: SKPort Wiki detail started');

  const browser = await puppeteer.launch({
    executablePath,
    userDataDir,
    headless: true,
  });

  const catalogMap = await readJsonFiles<SKPortWikiCatalog>(paths.rawCatalog);

  const slugMap = buildSlugMap(catalogMap['en.json']);

  const localesMap = Object.fromEntries(
    CONFIG.locales.filter((e) => e.enable).map((e) => [e.id, e])
  );

  for (const [file, json] of Object.entries(catalogMap)) {
    const subData = json.data.catalog.find((e) => e.id === '1')?.typeSub;

    const items = Object.entries(subIds).flatMap(
      ([subId, path]) =>
        subData
          ?.find((e) => e.id === subId)
          ?.items.map((item) => ({
            subId,
            path,
            itemId: item.itemId,
          })) ?? []
    );

    const localeId = file.split('.')[0];
    if (!localesMap[localeId]) continue;

    const total = items.length;
    let current = 0;

    console.log(`[${localeId}] Total :`, total);

    for (const item of items) {
      console.log(`[${localeId}] ${++current}/${total} Loading...`);

      const res = await fetchItem(
        browser,
        item,
        localeId,
        localesMap[localeId].region
      );

      if (!res) {
        console.log(`[${localeId}] (${item.path}) ❌ gagal total`);
        continue;
      }

      const rawDir = path.join(
        dir,
        'raw/skport/wiki/detail/',
        item.path,
        slugMap[item.subId][item.itemId]
      );

      await saveJson(rawDir, localeId, res);

      console.log(
        `[${localeId}] (${item.path}): 💾`,
        slugMap[item.subId][item.itemId]
      );
    }
  }

  await browser.close();
  console.log('⚡ [Get]: SKPort Wiki data done');
}

main().catch(console.error);
