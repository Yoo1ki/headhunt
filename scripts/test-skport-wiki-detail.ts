import fs from 'fs/promises';
import path from 'path';
import type {
  SKPortWikiDetailWeapon,
  Document,
  InlineElement,
} from './types/skport-wiki-detail-weapon';
import { logger, runScript } from './lib/logger';

const dir = process.cwd();
const paths = {
  rawSkportWikiDetail: path.join(dir, 'raw/skport/wiki/detail'),
} as const;

async function readJsonFiles<T>(dir: string): Promise<Record<string, T>> {
  const files = await fs.readdir(dir);
  const data: Record<string, T> = {};

  await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(path.join(dir, file), 'utf-8');
      data[file] = JSON.parse(content) as T;
    })
  );

  return data;
}

function getTableCellContents({
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
  const targetTable = contentBlockMap[blockId]!.table!;
  const cellContents = cellPositions
    .map((pos) => {
      const rowId = targetTable.rowIds[pos.row];
      const colId = targetTable.columnIds[pos.col];
      const cellId = targetTable.cellMap[`${rowId}_${colId}`]?.childIds[0];
      if (!cellId) return;
      return contentBlockMap[cellId].text?.inlineElements;
    })
    .filter(Array.isArray) as InlineElement[][];
  return cellContents;
}

async function main() {
  const folders = await fs.readdir(paths.rawSkportWikiDetail);

  // operators, weapons, ...
  for (const folder of folders) {
    const items = await fs.readdir(
      path.join(paths.rawSkportWikiDetail, folder)
    );

    // rossi, lupine-scarlet, ...
    for (const item of items) {
      const detailMaps = await readJsonFiles<SKPortWikiDetailWeapon>(
        path.join(paths.rawSkportWikiDetail, folder, item)
      );

      // id.json, en.json, ...
      for (const [file, json] of Object.entries(detailMaps)) {
        if (folder !== 'weapons') break;

        let skills: {
          label: string;
          content: InlineElement[];
        }[] = [];

        const document = json.data.item.document;
        const isRarity6 = json.data.item.tagIds.includes('10006');

        const chapterInformationId = document.chapterGroup.find((f) =>
          ['Informasi Senjata', 'Weapon Information'].includes(f.title.trim())
        )?.widgets[0].id;

        const chapterSkillId = document.chapterGroup.find((f) =>
          ['Skill & Aktivasi', 'Skill & Activation'].includes(f.title.trim())
        )?.widgets[0].id;

        // Informasi Senjata
        if (chapterInformationId) {
          const cellPositions = [
            { row: 1, col: 1 }, // Base Atk
            { row: 1, col: 3 }, // Max Base Atk
            // Skills
            { row: 2, col: 3 }, // [9/9] Skill 1
            { row: 3, col: 3 }, // [9/9] Skill 2
            { row: 4, col: 3 }, // [9/9] Skill 3
          ];

          const cellContent = getTableCellContents({
            document,
            chapterId: chapterInformationId,
            blockId: 'siDaPc',
            cellPositions,
          });

          if (!chapterSkillId) {
            skills = cellContent.slice(2).map((e) => {
              return {
                label: '9/9',
                content: e,
              };
            });
          }
        }

        // Skill & Aktivasi
        if (chapterSkillId) {
          const cellPositions = [
            { row: 9, col: 1 }, // [9/9] Skill 1
            { row: 9, col: 2 }, // [9/9] Skill 2
            { row: isRarity6 ? 4 : 9, col: 3 }, // [4/9] or [9/9] Skill 3
          ];

          const cellContent = getTableCellContents({
            document,
            chapterId: chapterSkillId,
            blockId: '6kzKo0',
            cellPositions,
          });

          skills = cellContent.map((e, i) => {
            return {
              label: i === 2 ? '4/9' : '9/9',
              content: e,
            };
          });
        }
        logger.info(file, json.data.item.itemId, skills[2]?.label);
      }
    }
  }
}

runScript('SKPort wiki detail diagnostics', main);
