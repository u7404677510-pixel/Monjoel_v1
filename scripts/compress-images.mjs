/**
 * scripts/compress-images.mjs
 *
 * Re-encode IN PLACE the heavy raster images of public/ to slim down the
 * deployed bundle (perf mobile / LCP / Core Web Vitals → SEO + Quality Score).
 *
 * NON-NEGOTIABLE GUARANTEES
 *  - Same path, same filename, same format/extension → breaks ZERO `<Image src>` reference.
 *  - Never upscales (withoutEnlargement).
 *  - Never touches: SVG, fonts, favicons/.ico, and the already-optimized
 *    critical assets (og-default.jpg, og-image.png, logo.png). WebP is also
 *    left alone (owned by scripts/optimize-images.mjs and already small).
 *  - Only writes the result back if it is actually SMALLER than the original
 *    (an already-optimized file is left byte-for-byte untouched).
 *
 * RESIZE POLICY (max width, height auto, only if larger):
 *  - Avatars / testimonials  → max 256px wide  (displayed ~48px)
 *  - Other content images     → max 1600px wide
 *
 * QUALITY:
 *  - JPEG : quality 80, mozjpeg, progressive
 *  - PNG  : compressionLevel 9, effort 10, palette quantization when it helps
 *           (alpha preserved). Falls back to non-palette if palette is bigger.
 *
 * Usage:  node scripts/compress-images.mjs           (apply)
 *         node scripts/compress-images.mjs --dry-run  (report only, no writes)
 *
 * Dep: sharp (already installed).
 */

import sharp from "sharp";
import { readdir, stat, rename, unlink, writeFile, readFile } from "node:fs/promises";
import { join, relative, extname, basename, sep } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const PUBLIC_DIR = join(ROOT, "public");
const DRY_RUN = process.argv.includes("--dry-run");

// Max width by category.
const AVATAR_MAX_W = 256; // testimonials / avatars (rendered tiny)
const CONTENT_MAX_W = 1600; // everything else

// Don't bother re-encoding anything already this small.
const MIN_BYTES = 30 * 1024; // 30 KB

// JPEG quality target.
const JPEG_QUALITY = 80;

// Protected files (web paths, relative to /public). Never touched.
const PROTECTED = new Set([
  "/og-default.jpg",
  "/og-image.png",
  "/logo.png",
]);

// Extensions we re-encode in place. (WebP intentionally excluded: already small,
// owned by optimize-images.mjs; SVG/fonts/ico excluded by definition.)
const RASTER_EXT = new Set([".png", ".jpg", ".jpeg"]);

const fmtMB = (b) => `${(b / 1024 / 1024).toFixed(2)} MB`;
const fmtKB = (b) => `${(b / 1024).toFixed(0)} KB`;

/** Recursively collect candidate files under a directory. */
async function walk(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full, acc);
    } else if (e.isFile()) {
      acc.push(full);
    }
  }
  return acc;
}

/** Web path relative to /public, POSIX style, leading slash. */
function webPath(full) {
  return "/" + relative(PUBLIC_DIR, full).split(sep).join("/");
}

function isAvatar(full) {
  const wp = webPath(full);
  return wp.includes("/testimonials/") || basename(full).startsWith("avatar-");
}

/**
 * Re-encode one buffer keeping the same format. Returns a Buffer.
 * For PNG, tries palette first and keeps whichever is smaller.
 */
async function reencode(inputBuf, ext, maxW) {
  const base = sharp(inputBuf, { failOn: "error" }).rotate(); // respect EXIF orientation
  const meta = await base.metadata();
  const resizeOpts = { width: maxW, withoutEnlargement: true };

  if (ext === ".jpg" || ext === ".jpeg") {
    return base
      .resize(resizeOpts)
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();
  }

  // PNG: produce a palette variant and a max-zlib truecolor variant, keep smaller.
  const pipeline = () => sharp(inputBuf, { failOn: "error" }).rotate().resize(resizeOpts);

  const paletteBuf = await pipeline()
    .png({ compressionLevel: 9, effort: 10, palette: true, quality: 90 })
    .toBuffer()
    .catch(() => null);

  const truecolorBuf = await pipeline()
    .png({ compressionLevel: 9, effort: 10, palette: false })
    .toBuffer()
    .catch(() => null);

  const candidates = [paletteBuf, truecolorBuf].filter(Boolean);
  if (candidates.length === 0) {
    // Last resort: untouched re-encode.
    return pipeline().png({ compressionLevel: 9 }).toBuffer();
  }
  // Smallest wins. (Palette can band photographic PNGs but the truecolor
  // fallback guards quality — we only ship the smaller, and only if it beats
  // the original, checked by the caller.)
  return candidates.sort((a, b) => a.length - b.length)[0];
}

(async () => {
  console.log(`🪶  Compress images in place — MonJoël${DRY_RUN ? "  [DRY RUN]" : ""}\n`);

  const allFiles = await walk(PUBLIC_DIR);
  let totalBefore = 0;
  let totalAfter = 0;
  let rewritten = 0;
  let skippedSmall = 0;
  let skippedProtected = 0;
  let skippedNoGain = 0;
  let skippedExt = 0;
  let errors = 0;
  const rewrittenList = [];

  for (const full of allFiles) {
    const ext = extname(full).toLowerCase();
    const wp = webPath(full);

    if (!RASTER_EXT.has(ext)) {
      skippedExt += 1;
      continue;
    }
    if (PROTECTED.has(wp)) {
      skippedProtected += 1;
      console.log(`  ⛔ protected (skip)        ${wp}`);
      continue;
    }

    let beforeSize;
    try {
      beforeSize = (await stat(full)).size;
    } catch {
      continue;
    }

    if (beforeSize < MIN_BYTES) {
      skippedSmall += 1;
      continue;
    }

    const maxW = isAvatar(full) ? AVATAR_MAX_W : CONTENT_MAX_W;

    try {
      // Read the ORIGINAL encoded bytes (not a sharp round-trip) so sharp
      // decodes from the source for maximum fidelity.
      const inputBuf = await readFile(full);
      const outBuf = await reencode(inputBuf, ext, maxW);

      totalBefore += beforeSize;

      // Only rewrite for a MEANINGFUL gain. This keeps the script idempotent:
      // re-running it on already-optimized files is a no-op instead of slowly
      // re-compressing (and degrading) JPEGs for diminishing returns.
      const saved = beforeSize - outBuf.length;
      const meaningful = saved >= 5 * 1024 && outBuf.length <= beforeSize * 0.97;
      if (!meaningful) {
        totalAfter += beforeSize;
        skippedNoGain += 1;
        continue;
      }

      totalAfter += outBuf.length;
      rewritten += 1;
      const pct = ((1 - outBuf.length / beforeSize) * 100).toFixed(0);
      rewrittenList.push({ wp, beforeSize, after: outBuf.length, pct, maxW });
      console.log(
        `  ✓ ${fmtKB(beforeSize).padStart(8)} → ${fmtKB(outBuf.length).padStart(8)}  (-${pct}%)  [≤${maxW}px]  ${wp}`,
      );

      if (!DRY_RUN) {
        // `outBuf` is ALREADY fully-encoded image bytes (PNG/JPEG). Write them
        // verbatim — never re-pipe through sharp().toFile(), which would
        // re-encode (and, for our palette PNGs, silently drop the palette and
        // bloat the file). Write to a temp sibling, validate it decodes, then
        // atomically replace so the real path never holds a half-written file.
        const tmp = full + ".tmp-compress";
        await writeFile(tmp, outBuf);

        // Integrity gate: the written bytes must decode and must not be larger.
        let valid = false;
        try {
          const m = await sharp(tmp).metadata();
          valid = Boolean(m.width && m.height);
        } catch {
          valid = false;
        }
        const tmpSize = (await stat(tmp)).size;

        if (valid && tmpSize > 0 && tmpSize <= beforeSize) {
          await rename(tmp, full);
        } else {
          await unlink(tmp).catch(() => {});
          // revert accounting
          totalAfter -= outBuf.length;
          totalAfter += beforeSize;
          rewritten -= 1;
          rewrittenList.pop();
          skippedNoGain += 1;
        }
      }
    } catch (err) {
      errors += 1;
      console.error(`  ✗ ERROR ${wp} — ${err.message}`);
    }
  }

  console.log("\n────────────────────────────────────────");
  console.log(`Rewritten        : ${rewritten}`);
  console.log(`Skipped (small)  : ${skippedSmall}  (< ${fmtKB(MIN_BYTES)})`);
  console.log(`Skipped (protected): ${skippedProtected}`);
  console.log(`Skipped (no gain): ${skippedNoGain}`);
  console.log(`Non-raster files : ${skippedExt}`);
  console.log(`Errors           : ${errors}`);
  console.log(
    `Processed weight : ${fmtMB(totalBefore)} → ${fmtMB(totalAfter)}  (saved ${fmtMB(totalBefore - totalAfter)})`,
  );
  if (DRY_RUN) console.log("\n(DRY RUN — no files were modified)");
  if (errors > 0) process.exit(1);
})();
