import sharp from 'sharp';
import { readdir, rename, stat } from 'fs/promises';
import { join, parse } from 'path';

const DIR = './public/uber-test';
const QUALITY = 82;

// Renommer le fichier Gemini avant conversion
await rename(
  join(DIR, 'Gemini_Generated_Image_cxb1djcxb1djcxb1.png'),
  join(DIR, 'artisan-client.png')
).catch(() => console.log('Gemini file already renamed or not found — skipping'));

const files = await readdir(DIR);
let count = 0;

for (const file of files) {
  if (!file.endsWith('.png')) continue;

  const srcPath = join(DIR, file);
  const { name } = parse(file);
  const destPath = join(DIR, `${name}.webp`);

  const srcStat = await stat(srcPath);
  const sizeMb = (srcStat.size / 1024 / 1024).toFixed(2);

  process.stdout.write(`Converting ${file} (${sizeMb} MB) → ${name}.webp ... `);

  await sharp(srcPath)
    .resize(1200, 900, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(destPath);

  const destStat = await stat(destPath);
  const sizeKb = (destStat.size / 1024).toFixed(0);
  const reduction = ((1 - destStat.size / srcStat.size) * 100).toFixed(0);
  console.log(`${sizeKb} KB (-${reduction}%)`);
  count++;
}

console.log(`\nDone! ${count} images converted to WebP in ${DIR}`);
