import fs from 'fs/promises';
import path from 'path';
import { logger } from './logger';

export async function writeJsonFiles(
  dataMap: Record<string, unknown>,
  outputDir: string
) {
  await Promise.all(
    Object.entries(dataMap).map(async ([file, data]) => {
      const outputPath = path.join(outputDir, file);
      await fs.writeFile(outputPath, JSON.stringify(data));
      logger.success(`Saved ${outputPath}`);
    })
  );
}
