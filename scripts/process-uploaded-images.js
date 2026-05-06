/**
 * scripts/process-uploaded-images.js
 *
 * Convertit les PNG ChatGPT déposées par Mehdi dans public/ vers JPG optimisés
 * aux dimensions cibles (cover crop), renomme aux noms attendus par les slots
 * et range dans public/images/ ou public/videos/. Préserve les originaux dans
 * public/_originals/.
 *
 * Lancement : `node scripts/process-uploaded-images.js`
 *
 * Dépendances : `sharp` (déjà installé en devDependencies).
 */

const sharp = require("sharp");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const VIDEOS_DIR = path.join(PUBLIC_DIR, "videos");
const ORIGINALS_DIR = path.join(PUBLIC_DIR, "_originals");

/**
 * Mapping PNG ChatGPT → slot/path/dimensions.
 * Les PNG d'origine sont préservées dans _originals/.
 */
const MAPPING = [
  // Hero homepage poster (cover de la vidéo Seedance à venir, 16:9)
  {
    src: "ChatGPT Image 29 avr. 2026, 19_40_49.png",
    destDir: VIDEOS_DIR,
    destName: "hero-poster.jpg",
    width: 1920,
    height: 1080,
    quality: 86,
    label: "home-hero-poster",
  },
  // Services bento home — 4:3
  {
    src: "ChatGPT Image 29 avr. 2026, 19_41_46.png",
    destDir: IMAGES_DIR,
    destName: "service-plomberie.jpg",
    width: 1600,
    height: 1200,
    quality: 85,
    label: "home-services-plomberie",
  },
  {
    src: "ChatGPT Image 29 avr. 2026, 19_43_41.png",
    destDir: IMAGES_DIR,
    destName: "service-electricite.jpg",
    width: 1600,
    height: 1200,
    quality: 85,
    label: "home-services-electricite",
  },
  // Hero pages métier — 4:3 grand format
  {
    src: "ChatGPT Image 29 avr. 2026, 19_45_08.png",
    destDir: IMAGES_DIR,
    destName: "hero-plombier.jpg",
    width: 2000,
    height: 1500,
    quality: 86,
    label: "hero-plomberie",
  },
  {
    src: "ChatGPT Image 29 avr. 2026, 19_45_23.png",
    destDir: IMAGES_DIR,
    destName: "hero-electricien.jpg",
    width: 2000,
    height: 1500,
    quality: 86,
    label: "hero-electricite",
  },
  {
    src: "ChatGPT Image 29 avr. 2026, 19_45_32.png",
    destDir: IMAGES_DIR,
    destName: "hero-serrurier.jpg",
    width: 2000,
    height: 1500,
    quality: 86,
    label: "hero-serrurerie",
  },
  // Sections génériques EngagementSection — 4:3
  {
    src: "ChatGPT Image 29 avr. 2026, 19_48_24.png",
    destDir: IMAGES_DIR,
    destName: "section-diagnostic.jpg",
    width: 1600,
    height: 1200,
    quality: 85,
    label: "section-diagnostic",
  },
  {
    src: "ChatGPT Image 29 avr. 2026, 19_48_31.png",
    destDir: IMAGES_DIR,
    destName: "section-intervention.jpg",
    width: 1600,
    height: 1200,
    quality: 85,
    label: "section-intervention",
  },
  {
    src: "ChatGPT Image 29 avr. 2026, 19_48_35.png",
    destDir: IMAGES_DIR,
    destName: "section-artisans.jpg",
    width: 1600,
    height: 1200,
    quality: 85,
    label: "section-artisans",
  },
  {
    src: "ChatGPT Image 29 avr. 2026, 19_42_04.png",
    destDir: IMAGES_DIR,
    destName: "section-antiarnaque.jpg",
    width: 1600,
    height: 1200,
    quality: 85,
    label: "section-antiarnaque",
  },
];

async function ensureDir(dir) {
  if (!fsSync.existsSync(dir)) {
    await fs.mkdir(dir, { recursive: true });
  }
}

function fmtSize(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

(async () => {
  console.log("🎨 Process uploaded images — MonJoël\n");

  await ensureDir(IMAGES_DIR);
  await ensureDir(VIDEOS_DIR);
  await ensureDir(ORIGINALS_DIR);

  let totalIn = 0;
  let totalOut = 0;
  let processed = 0;
  let errors = 0;

  for (const item of MAPPING) {
    const srcPath = path.join(PUBLIC_DIR, item.src);
    const destPath = path.join(item.destDir, item.destName);
    const originalCopy = path.join(ORIGINALS_DIR, item.src);

    try {
      // Stat source
      const srcStats = await fs.stat(srcPath);
      totalIn += srcStats.size;

      // 1. Préserver l'original (copie unique, idempotent)
      if (!fsSync.existsSync(originalCopy)) {
        await fs.copyFile(srcPath, originalCopy);
      }

      // 2. Convertir + redimensionner
      await sharp(srcPath)
        .resize(item.width, item.height, {
          fit: "cover",
          position: "attention", // sharp choisit la meilleure zone (visage / objets)
        })
        .jpeg({
          quality: item.quality,
          mozjpeg: true, // optimise davantage en restant compatible
          progressive: true,
        })
        .toFile(destPath);

      const destStats = await fs.stat(destPath);
      totalOut += destStats.size;
      processed += 1;

      const compression = ((1 - destStats.size / srcStats.size) * 100).toFixed(0);
      console.log(
        `  ✓ ${item.label.padEnd(28)} → ${path.relative(PUBLIC_DIR, destPath).padEnd(38)} ${fmtSize(srcStats.size)} → ${fmtSize(destStats.size)} (-${compression}%)`,
      );
    } catch (err) {
      errors += 1;
      console.error(`  ✗ ${item.label.padEnd(28)} ${err.message}`);
    }
  }

  console.log("\n────────────────────────────────────────");
  console.log(`📊 Traités  : ${processed}/${MAPPING.length}`);
  console.log(`📥 Total in : ${fmtSize(totalIn)}`);
  console.log(`📤 Total out: ${fmtSize(totalOut)}`);
  console.log(`💾 Économie : ${fmtSize(totalIn - totalOut)} (-${(((totalIn - totalOut) / totalIn) * 100).toFixed(0)}%)`);
  console.log(`📁 Originaux préservés dans public/_originals/`);
  if (errors > 0) {
    console.log(`⚠️  ${errors} erreur(s)`);
    process.exit(1);
  }
  console.log("✅ OK\n");
})();
