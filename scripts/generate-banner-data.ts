import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { GamePoolOperator } from "./interfaces/game-pool-operator";
import { GamePoolWeapon } from "./interfaces/game-pool-weapon";
import { writeJsonFiles } from "./lib/write-json-files";
import { scriptConfig } from "./config";
import { Banner } from "@/types/banner";
import { downloadImage, resizeImage, saveAsPng } from "./lib/image";

const dir = process.cwd();

const paths = {
  rawPools: path.join(dir, "raw/game/pool"),
  generatedBanners: path.join(dir, "src/data/tracker/banners"),
  assets: path.join(dir, "public/assets"),
};
async function ensureDirs(...dirs: string[]) {
  await Promise.all(dirs.map((d) => fs.mkdir(d, { recursive: true })));
}

type TPoolData = GamePoolOperator | GamePoolWeapon;

interface IPoolResult {
  poolId: string;
  files: Record<string, TPoolData>;
}

export async function readAllPools(): Promise<IPoolResult[]> {
  const poolDirs = await fs.readdir(paths.rawPools, { withFileTypes: true });

  // ambil hanya folder
  const folders = poolDirs.filter((d) => d.isDirectory());

  const results = await Promise.all(
    folders.map(async (folder) => {
      const poolId = folder.name;
      const folderPath = path.join(paths.rawPools, poolId);

      const files = await fs.readdir(folderPath, { withFileTypes: true });

      const jsonFiles = files.filter(
        (f) => f.isFile() && f.name.endsWith(".json"),
      );

      const fileEntries = await Promise.all(
        jsonFiles.map(async (file) => {
          const filePath = path.join(folderPath, file.name);
          const content = await fs.readFile(filePath, "utf-8");

          try {
            const parsed: TPoolData = JSON.parse(content);
            return [file.name, parsed] as const;
          } catch {
            console.warn(`⚠️ gagal parse: ${file.name}`);
            return null;
          }
        }),
      );

      // filter null + jadi object
      const validEntries = Object.fromEntries(
        fileEntries.filter(
          (e): e is readonly [string, TPoolData] => e !== null,
        ),
      );

      return {
        poolId,
        files: validEntries,
      };
    }),
  );

  return results;
}

async function ticketifyImage({
  buffer,
  isRight = false,
}: {
  isRight: boolean;
  buffer: Buffer;
}): Promise<Buffer> {
  const image = sharp(buffer);
  const metadata = await image.metadata();

  const width = metadata.width;
  const height = metadata.height;

  // Crop rasio 3.2:1
  const targetWidth = Math.floor(height * 3.2);
  const cropWidth = Math.min(targetWidth, width);

  const cropped = image.extract({
    left: isRight ? width - cropWidth : 0,
    top: 0,
    width: cropWidth,
    height: height,
  });

  // Resize
  const resizedHeight = 145;
  const resized = cropped.resize({ height: resizedHeight });
  const resizedWidth = Math.floor(resizedHeight * (cropWidth / height));
  const x = isRight ? resizedWidth / 5 : resizedWidth - resizedWidth / 5;

  // Bikin seperti tiket
  const ticketSvg = `
  <svg width="${resizedWidth}" height="${resizedHeight}">
    <polygon 
      points="${x},${resizedHeight / 20} ${x - 10},0 ${x + 10},0"
      fill="white"
    />

    <line 
      x1="${x}" 
      y1="0" 
      x2="${x}" 
      y2="${resizedHeight}" 
      stroke="white"
      stroke-width="3"
      stroke-dasharray="5,5"
      stroke-linecap="round"
    />

    <polygon 
      points="${x},${resizedHeight - resizedHeight / 20} ${x - 10},${resizedHeight} ${x + 10},${resizedHeight}"
      fill="white"
    />

    <text
      x="${resizedWidth - 10}"
      y="${resizedHeight / 2}"
      text-anchor="middle"
      dominant-baseline="middle"
      fill="white"
      font-weight="bold"
      font-family="Arial, Helvetica, sans-serif"
      font-size="${Math.floor(resizedHeight * 0.1)}"
      transform="rotate(-90 ${resizedWidth - 10} ${resizedHeight / 2})"
    >
      Headhunt.cc
    </text>
  </svg>
  `;

  const ticketBuffer = await resized
    .composite([{ input: Buffer.from(ticketSvg), blend: "dest-out" }])
    .png()
    .toBuffer();

  return ticketBuffer;
}

async function bannerImages(
  assets: Map<string, string>,
  outputDir: string,
): Promise<Map<string, string>> {
  const map = new Map<string, string>();

  await Promise.all(
    Array.from(assets).map(async ([id, img]) => {
      const buffer = await downloadImage(img);
      const ticketBuffer = await ticketifyImage({
        buffer,
        isRight:
          id.startsWith("weponbox") ||
          id.startsWith("weaponbox") ||
          id.startsWith("joint"),
      });
      const resizedBuffer = await resizeImage({
        buffer: ticketBuffer,
        width: 256,
      });
      const banner = await saveAsPng({
        buffer: resizedBuffer,
        outputDir,
      });

      map.set(id, banner);
    }),
  );

  return map;
}

function getTimestampSecond(iso: string) {
  return Math.floor(Date.parse(iso) / 1000);
}
type PoolId = (typeof scriptConfig.pools)[number]["id"];

async function main() {
  await ensureDirs(paths.generatedBanners, paths.assets);

  const results = await readAllPools();

  const orderMap = new Map(scriptConfig.pools.map((e, i) => [e.id, i]));
  const sortedResults = results.sort((a, b) => {
    const indexA = orderMap.get(a.poolId as PoolId) ?? Infinity;
    const indexB = orderMap.get(b.poolId as PoolId) ?? Infinity;
    return indexA - indexB;
  });

  const assets = new Map<string, string>();

  for (const result of sortedResults) {
    Object.values(result.files).forEach((json) => {
      const configPool = scriptConfig.pools.find((e) => e.id === result.poolId);
      const image =
        configPool && "img" in configPool
          ? configPool.img
          : json.data.pool.up6_image;
      if (image) assets.set(result.poolId, image);
    });
  }

  console.log(`Total unique assets: ${assets.size}`);

  const assetsMap = await bannerImages(assets, paths.assets);

  const bannerMap: Record<string, Record<string, Banner>> = {};

  for (const result of sortedResults) {
    for (const [fileName, json] of Object.entries(result.files)) {
      const locale = fileName;

      const data = json.data.pool;
      const pool = scriptConfig.pools.find((e) => e.id === result.poolId);
      const isOperator = data.pool_gacha_type === "char";

      let rotate: string[] = [];

      if (isOperator) {
        const pool = (json as GamePoolOperator).data.pool;
        if (pool.pool_type === "special") {
          rotate = pool.rotate_list
            .map((e) => pool.all.find((f) => f.name === e.name)?.id)
            .filter((id): id is string => Boolean(id));
        }
        if (pool.pool_type === "extra") {
          rotate = pool.all.filter((e) => e.rarity === 6).map((e) => e.id);
        }
      }

      if (!bannerMap[locale]) bannerMap[locale] = {};

      bannerMap[locale][result.poolId] = {
        id: result.poolId,
        name: data.pool_name,
        image: assetsMap.get(result.poolId) || "",
        rateup: data.all.find((e) => e.name === data.up6_name)!.id,
        ...(rotate.length ? { rotate } : {}),
        ...(pool && "startAt" in pool
          ? { startTime: getTimestampSecond(pool.startAt) }
          : {}),
        ...(pool && "endAt" in pool
          ? { endTime: getTimestampSecond(pool.endAt) }
          : {}),
      };
    }
  }

  await writeJsonFiles(bannerMap, paths.generatedBanners);
}

main().catch(console.error);
