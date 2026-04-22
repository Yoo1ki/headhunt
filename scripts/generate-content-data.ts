import fs from "fs/promises";
import path from "path";
import { SKPortGuideOperators } from "./interfaces/skport-guide-operators";
import { SKPortGuideWeapons } from "./interfaces/skport-guide-weapons";
import { writeJsonFiles } from "./lib/writeJsonFiles";
import { ensureDirs } from "./lib/ensureDirs";
import { downloadImage } from "./lib/downloadImage";
import { hashBuffer } from "./lib/hashBuffer.";
import { Catalog } from "@/types/catalog";
import { SKPortGuideEnums } from "./interfaces/skport-guide-enums";
import { Weapon, WeaponDetail } from "@/types/weapons";
import { Operator } from "@/types/operator";
import { RarityId } from "@/types/enums";
import {
  SKPortWikiDetailWeapon,
  Document,
  InlineElement,
} from "./interfaces/skport-wiki-detail-weapon";

const dir = process.cwd();

const BASE_LANG = "en.json" as const;
const paths = {
  rawSKPortWikiDetail: path.join(dir, "raw/skport/wiki/detail"),
  rawSKPortGuideEnums: path.join(dir, "raw/skport/guide/enums"),
  rawSKPortGuideOperators: path.join(dir, "raw/skport/guide/operators"),
  rawSKPortGuideWeapons: path.join(dir, "raw/skport/guide/weapons"),
  generatedEnums: path.join(dir, "src/data/enums"),
  generatedOperators: path.join(dir, "src/data/operators"),
  generatedWeapons: path.join(dir, "src/data/weapons"),
  generatedTrackerCatalogs: path.join(dir, "src/data/tracker/catalogs"),
  assets: path.join(dir, "public/assets"),
} as const;
const enumPicks = {
  rarities: "rarities",
  charProperties: "elements",
  professions: "opClass",
  weaponTypes: "wpTypes",
} as const;

async function readJsonFiles<T>(dir: string): Promise<Record<string, T>> {
  const files = await fs.readdir(dir);
  const data: Record<string, T> = {};

  await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(path.join(dir, file), "utf-8");
      data[file] = JSON.parse(content) as T;
    }),
  );

  return data;
}

async function downloadImages(
  urls: Set<string>,
  outputDir: string,
): Promise<Map<string, string>> {
  const map = new Map<string, string>();

  await Promise.all(
    Array.from(urls).map(async (url) => {
      try {
        const buffer = await downloadImage(url);
        const hash = hashBuffer(buffer);
        const filename = `${hash}.png`;
        const outputPath = path.join(outputDir, filename);

        try {
          await fs.access(outputPath);
        } catch {
          await fs.writeFile(outputPath, buffer);
          console.log(`✔ saved ${filename}`);
        }

        map.set(url, hash);
      } catch (err) {
        console.error(`❌ error downloading ${url}`, err);
      }
    }),
  );

  return map;
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSKPortGuideOperatorId(
  op: SKPortGuideOperators["data"]["chars"][number],
): string {
  const talent = op.abilityTalents.find((talent) =>
    talent.id.startsWith("chr_"),
  );
  if (!talent) throw new Error(`[Operator -> ${op.name}]: Talent not found`);
  return talent.id.split("_").slice(0, -1).join("_");
}

function getSKPortGuideWeaponId(
  wp: SKPortGuideWeapons["data"]["weapons"][number],
): string {
  const skill = wp.skills.find((skill) => skill.key.startsWith("sk_wpn_"));
  if (!skill) throw new Error(`[Weapon -> ${wp.name}]: Skill not found`);
  return skill.key.slice(3);
}

function buildSKPortGuideOperatorsSlugMap(
  json: SKPortGuideOperators,
): Map<string, string> {
  const map = new Map<string, string>();

  for (const op of json.data.chars) {
    const id = getSKPortGuideOperatorId(op);
    map.set(id, generateSlug(op.name));
  }

  return map;
}

function buildSKPortGuideWeaponsSlugMap(
  json: SKPortGuideWeapons,
): Map<string, string> {
  const map = new Map<string, string>();

  for (const wp of json.data.weapons) {
    const id = getSKPortGuideWeaponId(wp);
    map.set(id, generateSlug(wp.name));
  }

  return map;
}

function transformEnum<T extends Record<string, string>>({
  json,
  enumPicks,
}: {
  json: SKPortGuideEnums;
  enumPicks: T;
}) {
  return Object.fromEntries(
    Object.entries(enumPicks).map(([jsonKey, outKey]) => {
      let items = json.data[jsonKey as keyof typeof json.data] ?? [];

      if (jsonKey === "rarities") {
        items = [...items].sort((a, b) => a.key.localeCompare(b.key));
      }

      return [
        outKey,
        items.map((item) => ({
          id: item.key,
          name: item.value,
        })),
      ];
    }),
  ) as Record<T[keyof T], { id: string; name: string }[]>;
}

function transformOperator({
  json,
  assetsMap,
  slugMap,
}: {
  json: SKPortGuideOperators;
  assetsMap: Map<string, string>;
  slugMap: Map<string, string>;
}) {
  return json.data.chars.map((op) => {
    const id = getSKPortGuideOperatorId(op);
    const slug =
      (slugMap.get(id) ?? "") +
      (id === "chr_0002_endminm"
        ? "-m"
        : id === "chr_0003_endminf"
          ? "-f"
          : "");

    const data: Operator = {
      id,
      slug,
      name: op.name,
      avatar: assetsMap.get(op.avatarRtUrl) || "",
      rarityId: op.rarity.key,
      elementId: op.property.key,
      opClassId: op.profession.key,
      ...(op.labelType ? { labelType: op.labelType } : {}),
    };

    return data;
  });
}

function transformWeapon({
  file,
  json,
  assetsMap,
  slugMap,
  detailMap,
}: {
  file: string;
  json: SKPortGuideWeapons;
  assetsMap: Map<string, string>;
  slugMap: Map<string, string>;
  detailMap: Map<string, Map<string, Map<string, WeaponDetail>>>;
}) {
  return json.data.weapons.map((wp) => {
    const id = getSKPortGuideWeaponId(wp);
    const slug = slugMap.get(id) ?? "";
    const weaponDetail = detailMap.get("weapons")?.get(slug)?.get(file);

    const data: Weapon = {
      id: id,
      name: wp.name,
      icon: assetsMap.get(wp.iconUrl) || "",
      rarityId: wp.rarity.key,
      HeadhuntTypeId: wp.type.key,
      detail: weaponDetail,
      skillLabels: wp.skills.map((e) => e.value),
      ...(wp.labelType ? { labelType: wp.labelType } : {}),
    };

    return data;
  });
}

function transformCatalog({
  operatorsDataMap,
  weaponsDataMap,
  assetsMap,
}: {
  operatorsDataMap: Record<string, SKPortGuideOperators>;
  weaponsDataMap: Record<string, SKPortGuideWeapons>;
  assetsMap: Map<string, string>;
}): Record<string, Catalog> {
  const catalogs: Record<string, Catalog> = {};

  const files = new Set([
    ...Object.keys(operatorsDataMap),
    ...Object.keys(weaponsDataMap),
  ]);

  for (const file of files) {
    const items = [
      ...(operatorsDataMap[file]?.data.chars ?? []).map((op) => {
        const id = getSKPortGuideOperatorId(op);

        return [
          id,
          {
            name: op.name,
            icon: assetsMap.get(op.avatarSqUrl)!,
            rarityId: op.rarity.key as RarityId,
          },
        ];
      }),
      ...(weaponsDataMap[file]?.data.weapons ?? []).map((wp) => {
        const id = getSKPortGuideWeaponId(wp);

        return [
          id,
          {
            name: wp.name,
            icon: assetsMap.get(wp.iconUrl)!,
            rarityId: wp.rarity.key as RarityId,
          },
        ];
      }),
    ];

    catalogs[file] = Object.fromEntries(items);
  }

  return catalogs;
}

function getSKPortWikiTableCellContents({
  document,
  chapterId,
  blockId,
  cellPositions,
}: {
  document: Document;
  chapterId: string;
  blockId: string;
  cellPositions: {
    row: number;
    col: number;
  }[];
}) {
  const tabDataMap = document.widgetCommonMap[chapterId].tabDataMap;
  const defaultContentId = tabDataMap.default.content;
  const contentBlockMap = document.documentMap[defaultContentId].blockMap;
  const targetTable = contentBlockMap[blockId]?.table;

  if (!targetTable) return [];

  const cellContents = cellPositions
    .map((pos) => {
      const rowId = targetTable.rowIds[pos.row];
      const colId = targetTable.columnIds[pos.col];
      const cellIds = targetTable.cellMap[`${rowId}_${colId}`]?.childIds;

      if (!cellIds?.length) return;

      return cellIds
        .map((id) => contentBlockMap[id].text?.inlineElements)
        .filter((v): v is InlineElement[] => Array.isArray(v));
    })
    .filter((v): v is InlineElement[][] => Array.isArray(v));

  return cellContents;
}

async function getDetailMap() {
  const data = new Map<string, Map<string, Map<string, WeaponDetail>>>();

  function getOrCreate<K, V>(map: Map<K, V>, key: K, create: () => V): V {
    if (!map.has(key)) {
      map.set(key, create());
    }
    return map.get(key)!;
  }

  const folders = await fs.readdir(paths.rawSKPortWikiDetail);

  // operators, weapons, ...
  for (const folder of folders) {
    if (folder !== "weapons") continue;

    const items = await fs.readdir(
      path.join(paths.rawSKPortWikiDetail, folder),
    );

    // rossi, lupine-scarlet, ...
    for (const item of items) {
      const detailMaps = await readJsonFiles<SKPortWikiDetailWeapon>(
        path.join(paths.rawSKPortWikiDetail, folder, item),
      );

      // id.json, en.json, ...
      for (const [file, json] of Object.entries(detailMaps)) {
        // if (json.data.item.itemId !== "733") break;
        let baseATK = "-/-";
        let skills: {
          label: string;
          content: InlineElement[][];
        }[] = [];

        const document = json.data.item.document;
        const isRarity6 = json.data.item.tagIds.includes("10006");

        const chapterInformationId = document.chapterGroup.find((f) =>
          ["Informasi Senjata", "Weapon Information"].includes(f.title.trim()),
        )?.widgets[0].id;

        const chapterSkillId = document.chapterGroup.find((f) =>
          ["Skill & Aktivasi", "Skill & Activation"].includes(f.title.trim()),
        )?.widgets[0].id;

        // Informasi Senjata
        if (chapterInformationId) {
          const cellPositions = [
            { row: 1, col: 1 }, // Base Atk
            { row: 1, col: 3 }, // Max Base Atk
            { row: 2, col: 3 }, // Skill 1
            { row: 3, col: 3 }, // Skill 2
            { row: 4, col: 3 }, // Skill 3
          ];

          const cellContent = getSKPortWikiTableCellContents({
            document,
            chapterId: chapterInformationId,
            blockId: "siDaPc",
            cellPositions,
          });

          baseATK = cellContent
            .slice(0, 2)
            .map((e) => e?.[0]?.[0]?.text.text || "-")
            .join("/");

          if (!chapterSkillId) {
            skills = cellContent.slice(2).map((e) => ({
              label: "9/9",
              content: e ?? [],
            }));
          }
        }

        // Skill & Aktivasi
        if (chapterSkillId) {
          const cellPositions = [
            { row: 9, col: 1 },
            { row: 9, col: 2 },
            { row: isRarity6 ? 4 : 9, col: 3 },
          ];

          const cellContent = getSKPortWikiTableCellContents({
            document,
            chapterId: chapterSkillId,
            blockId: "6kzKo0",
            cellPositions,
          });

          skills = cellContent.map((e, i) => ({
            label: i === 2 && isRarity6 ? "4/9" : "9/9",
            content: e ?? [],
          }));
        }

        const content: WeaponDetail = { baseATK, skills };

        // SET DATA
        const map2 = getOrCreate(data, folder, () => new Map());
        const map3 = getOrCreate(map2, item, () => new Map());

        map3.set(file, content);
      }
    }
  }

  return data;
}

async function main() {
  await ensureDirs(
    paths.generatedEnums,
    paths.generatedOperators,
    paths.generatedWeapons,
    paths.generatedTrackerCatalogs,
    paths.assets,
  );

  const [enumsDataMap, operatorsDataMap, weaponsDataMap] = await Promise.all([
    readJsonFiles<SKPortGuideEnums>(paths.rawSKPortGuideEnums),
    readJsonFiles<SKPortGuideOperators>(paths.rawSKPortGuideOperators),
    readJsonFiles<SKPortGuideWeapons>(paths.rawSKPortGuideWeapons),
  ]);

  const detailMap = await getDetailMap();

  const operatorsSlugMap = buildSKPortGuideOperatorsSlugMap(
    operatorsDataMap[BASE_LANG],
  );

  const weaponsSlugMap = buildSKPortGuideWeaponsSlugMap(
    weaponsDataMap[BASE_LANG],
  );

  // collect assets
  const assets = new Set<string>();

  Object.values(operatorsDataMap).forEach((json) =>
    json.data.chars.forEach((c) => {
      assets.add(c.avatarRtUrl);
      assets.add(c.avatarSqUrl);
      // assets.add(c.illustrationUrl);
    }),
  );

  Object.values(weaponsDataMap).forEach((json) =>
    json.data.weapons.forEach((w) => assets.add(w.iconUrl)),
  );

  console.log(`Total unique assets: ${assets.size}`);

  const assetsMap = await downloadImages(assets, paths.assets);

  // Proccess & Generate Output
  await writeJsonFiles(
    Object.fromEntries(
      Object.entries(enumsDataMap).map(([file, json]) => [
        file,
        transformEnum({
          json,
          enumPicks,
        }),
      ]),
    ),
    paths.generatedEnums,
  );

  await writeJsonFiles(
    Object.fromEntries(
      Object.entries(operatorsDataMap).map(([file, json]) => [
        file,
        transformOperator({
          json,
          assetsMap,
          slugMap: operatorsSlugMap,
        }),
      ]),
    ),
    paths.generatedOperators,
  );

  await writeJsonFiles(
    Object.fromEntries(
      Object.entries(weaponsDataMap).map(([file, json]) => [
        file,
        transformWeapon({
          file,
          json,
          assetsMap,
          slugMap: weaponsSlugMap,
          detailMap,
        }),
      ]),
    ),
    paths.generatedWeapons,
  );

  await writeJsonFiles(
    transformCatalog({
      operatorsDataMap,
      weaponsDataMap,
      assetsMap,
    }),
    paths.generatedTrackerCatalogs,
  );
}

main().catch(console.error);
