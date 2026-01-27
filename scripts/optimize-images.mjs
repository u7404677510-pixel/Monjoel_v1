import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, parse } from 'path';

const PUBLIC_DIR = './public';
const QUALITY = 80;

async function optimizeImages() {
  const files = await readdir(PUBLIC_DIR);
  
  for (const file of files) {
    const filePath = join(PUBLIC_DIR, file);
    const fileStats = await stat(filePath);
    
    if (!fileStats.isFile()) continue;
    
    const { name, ext } = parse(file);
    
    // Only process hero images (PNG and JPG)
    if (!file.startsWith('hero-')) continue;
    if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) continue;
    
    const sizeBefore = fileStats.size;
    
    console.log(`Processing ${file} (${(sizeBefore / 1024 / 1024).toFixed(2)} MB)...`);
    
    // Convert to WebP
    const webpPath = join(PUBLIC_DIR, `${name}.webp`);
    await sharp(filePath)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(webpPath);
    
    const webpStats = await stat(webpPath);
    console.log(`  -> ${name}.webp (${(webpStats.size / 1024).toFixed(0)} KB) - ${((1 - webpStats.size / sizeBefore) * 100).toFixed(0)}% reduction`);
    
    // Create mobile version (640px)
    const mobilePath = join(PUBLIC_DIR, `${name}-mobile.webp`);
    await sharp(filePath)
      .resize(640, 640, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(mobilePath);
    
    const mobileStats = await stat(mobilePath);
    console.log(`  -> ${name}-mobile.webp (${(mobileStats.size / 1024).toFixed(0)} KB)`);
  }
  
  console.log('\nDone! WebP images created.');
}

optimizeImages().catch(console.error);
