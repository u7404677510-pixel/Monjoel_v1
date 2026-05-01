#!/usr/bin/env bash
#
# encode-hero-video.sh — Pipeline d'encodage Hero MonJoël
#
# Usage :
#   bash scripts/encode-hero-video.sh path/to/master-from-seedance.mp4
#
# Produit :
#   public/videos/hero.av1.mp4    (Chrome/Edge récents, mobile moderne)
#   public/videos/hero.hevc.mp4   (Safari, iOS — tag hvc1 obligatoire)
#   public/videos/hero.h264.mp4   (fallback universel)
#   public/videos/hero-poster.avif (LCP candidate)
#   public/videos/hero-poster.jpg  (fallback poster)
#
# Stratégie LCP-safe :
#   - le poster AVIF est le LCP, pas la vidéo
#   - la vidéo se charge avec preload="none", démarre après window.load
#   - la cascade <source> place AV1 en premier, HEVC, puis H.264
#
# Cibles qualité/poids (clip 8-12s, 1920x1080@24fps, sans audio) :
#   AV1 :  ~600-900 KB (CRF 32, preset 6)
#   HEVC : ~1.0-1.4 MB (CRF 26, preset slow)
#   H.264: ~1.5-2.5 MB (CRF 23, preset slow)
#
# Prérequis : ffmpeg ≥ 7.0 (vérifier `ffmpeg -version`)

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <master-video-file>"
  echo "Exemple: $0 ~/Downloads/seedance-output.mp4"
  exit 1
fi

INPUT="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
OUT_DIR="$ROOT_DIR/public/videos"

if [ ! -f "$INPUT" ]; then
  echo "Master file introuvable: $INPUT"
  exit 1
fi

mkdir -p "$OUT_DIR"

echo "==> Encoding hero video from: $INPUT"
echo "==> Output directory: $OUT_DIR"

# ----- 1. AV1 (SVT-AV1) -----
echo "[1/5] AV1 encoding (libsvtav1, CRF 32)..."
ffmpeg -y -i "$INPUT" -an \
  -c:v libsvtav1 -crf 32 -preset 6 \
  -svtav1-params "tune=0:enable-overlays=1:keyint=2s" \
  -pix_fmt yuv420p10le \
  -movflags +faststart \
  "$OUT_DIR/hero.av1.mp4"

# ----- 2. HEVC avec tag hvc1 (obligatoire Safari/iOS) -----
echo "[2/5] HEVC encoding (libx265, CRF 26, hvc1 tag)..."
ffmpeg -y -i "$INPUT" -an \
  -c:v libx265 -crf 26 -preset slow \
  -pix_fmt yuv420p \
  -tag:v hvc1 \
  -movflags +faststart \
  "$OUT_DIR/hero.hevc.mp4"

# ----- 3. H.264 fallback universel -----
echo "[3/5] H.264 fallback (libx264, CRF 23, High profile)..."
ffmpeg -y -i "$INPUT" -an \
  -c:v libx264 -crf 23 -preset slow \
  -profile:v high -level 4.0 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "$OUT_DIR/hero.h264.mp4"

# ----- 4. Poster AVIF (frame 0, LCP candidate) -----
echo "[4/5] Poster AVIF extraction..."
ffmpeg -y -i "$INPUT" -frames:v 1 \
  -c:v libaom-av1 -still-picture 1 \
  -cpu-used 4 -crf 28 \
  "$OUT_DIR/hero-poster.avif"

# ----- 5. Poster JPG fallback -----
echo "[5/5] Poster JPG fallback..."
ffmpeg -y -i "$INPUT" -frames:v 1 \
  -q:v 2 \
  "$OUT_DIR/hero-poster.jpg"

echo ""
echo "==> Done. Tailles produites :"
ls -lh "$OUT_DIR" | grep hero

echo ""
echo "Étapes suivantes :"
echo "  1. Vérifier les rendus poster (hero-poster.avif/jpg)"
echo "  2. Push sur Cloudflare R2 (pas Vercel Blob — piège à coût)"
echo "  3. Mettre à jour HeroVideo.tsx avec les URLs R2"
