import fs from 'fs/promises';

export async function ensureDirs(...dirs: string[]) {
  await Promise.all(dirs.map((d) => fs.mkdir(d, { recursive: true })));
}
