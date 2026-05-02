# GitHub Actions workflows — templates

Ces 2 workflows sont **prêts à activer** mais pas commités dans `.github/workflows/` parce que le PAT GitHub utilisé par Claude n'a pas le scope `workflow` requis pour push des fichiers `.github/workflows/*.yml`.

## Comment les activer (Mehdi, 2 minutes)

### Option A — via l'UI GitHub (recommandé)
1. Aller sur https://github.com/u7404677510-pixel/Monjoel_v1
2. Cliquer **Add file → Create new file**
3. Nom du fichier : `.github/workflows/ci.yml` (l'UI crée le dossier automatiquement)
4. Coller le contenu de `ci.yml` ci-joint
5. Commit direct sur `main` (ou ouvrir une PR)
6. Répéter pour `lighthouse.yml`

### Option B — via terminal local avec PAT scope `workflow`
1. Créer un nouveau PAT GitHub avec le scope `workflow` :
   https://github.com/settings/tokens/new (cocher la case `workflow`)
2. Mettre à jour le remote :
   ```bash
   git remote set-url origin https://USERNAME:NEW_PAT@github.com/u7404677510-pixel/Monjoel_v1.git
   ```
3. Déplacer les workflows :
   ```bash
   mkdir -p .github/workflows
   mv docs/github-workflows-templates/ci.yml .github/workflows/
   mv docs/github-workflows-templates/lighthouse.yml .github/workflows/
   git add .github/workflows/
   git commit -m "ops: enable GitHub Actions CI + Lighthouse workflows"
   git push
   ```

## Ce que font les 2 workflows

### `ci.yml` — déclenché sur chaque PR vers main
- **Lint** : ESLint 9 sur tout le code
- **Typecheck** : `tsc --noEmit` (TypeScript 6, strict)
- **Build** : `next build` complet avec Turbopack (vérifie 5685 pages SSG)
- 3 jobs en séquence (lint → typecheck → build), cancel-in-progress
- Cache npm via setup-node + `node-version-file: .nvmrc`
- Build artifact uploadé sur échec (debug)

### `lighthouse.yml` — sur PR + lundi 6h UTC
- Audit perf/A11y/Best Practices/SEO sur 5 routes critiques
- 3 runs/URL pour moyenne stable
- **Seuils stricts** :
  - A11y ≥ 0.9 (error)
  - Perf ≥ 0.8 (warn)
  - SEO ≥ 0.9 (error)
  - CLS ≤ 0.1 (error critique)
  - LCP ≤ 2.5s (warn)
- Upload temporary-public-storage (pas besoin de serveur LHCI dédié)

## Secrets GitHub à configurer (optionnel)

Aller sur https://github.com/u7404677510-pixel/Monjoel_v1/settings/secrets/actions

| Secret | Pour quoi | Obligatoire ? |
|---|---|---|
| `LHCI_GITHUB_APP_TOKEN` | Lighthouse CI commente les PR avec les scores | Non (sans = stockage public anonyme) |
| `SENTRY_AUTH_TOKEN` | Upload sourcemaps Sentry au build | Non (sans = Sentry désactivé) |
| `NEXT_PUBLIC_SENTRY_DSN` | DSN client Sentry | Non (sans = no-op) |

Les workflows fonctionnent **sans aucun secret** : Sentry passe en no-op, Lighthouse stocke en public storage.
