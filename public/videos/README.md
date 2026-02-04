# Vidéos Hero - Guide d'ajout

Ce dossier contient les vidéos pour les landing pages test.

## Fichiers attendus

Pour la **Variante A (L'Urgentiste)** :

| Fichier | Format | Durée | Taille max |
|---------|--------|-------|------------|
| `hero-artisan.webm` | WebM (VP9) | 6-8s | < 2 MB |
| `hero-artisan.mp4` | MP4 (H.264) | 6-8s | < 3 MB |

## Spécifications recommandées

### Résolution
- **Desktop** : 1920x1080 (ou 1280x720 pour réduire la taille)
- **Mobile** : Pas de version séparée nécessaire, le CSS `object-cover` s'adapte

### Encodage optimisé

**WebM (préféré - Chrome, Firefox, Edge)** :
```bash
ffmpeg -i source.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an -loop 0 hero-artisan.webm
```

**MP4 (fallback - Safari, IE)** :
```bash
ffmpeg -i source.mp4 -c:v libx264 -crf 28 -preset slow -an hero-artisan.mp4
```

### Points clés
- **Pas de son** (`-an`) : obligatoire pour autoplay
- **CRF 28-32** : bon compromis qualité/taille
- **6-8 secondes** : durée idéale pour un loop
- **Pas de texte dans la vidéo** : le texte est superposé en HTML

## Contenu suggéré

1. Artisan en train d'intervenir (serrurerie, plomberie ou électricité)
2. Artisan devant son véhicule
3. Interaction avec un client satisfait
4. Gros plan sur outils/équipement professionnel

## Alternative temporaire

Si pas de vidéo disponible, le composant `VideoHero` affiche automatiquement l'image `poster` (`/hero-serrurerie.webp`) comme fallback.
