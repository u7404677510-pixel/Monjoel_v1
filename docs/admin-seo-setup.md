# Dashboard SEO — Setup Search Console API

Le dashboard `/admin/seo` se branche sur l'API Google Search Console pour afficher
clics / impressions / CTR / position en temps quasi-réel (délai naturel ~1-2j de GSC).

Ce guide explique comment provisioner les credentials côté Mehdi.

---

## 1. Créer un service account GCP (3 min)

1. Console GCP : <https://console.cloud.google.com/>
2. Sélectionner ou créer un projet (ex. `monjoel-seo`).
3. Menu : **IAM & Admin → Service Accounts → Create service account**.
   - Name : `gsc-reader`
   - ID : `gsc-reader`
   - Role : aucun rôle GCP nécessaire (les permissions se font côté Search Console)
4. Onglet **Keys → Add key → Create new key → JSON**. Le fichier `monjoel-seo-xxx.json`
   se télécharge. **Ne jamais commiter ce fichier** (il est ignoré via `.gitignore`).

## 2. Activer l'API dans GCP

1. Menu : **APIs & Services → Library**.
2. Chercher **Google Search Console API** → **Enable**.

## 3. Donner accès au service account dans Search Console

1. Ouvrir <https://search.google.com/search-console>
2. Sélectionner la propriété `sc-domain:monjoel.fr`.
3. Settings (engrenage) → **Users and permissions → Add user**.
4. Email = celui du service account (ex. `gsc-reader@monjoel-seo.iam.gserviceaccount.com`,
   visible dans le JSON sous `client_email`).
5. Permission : **Owner** ou **Full** (lecture suffit en pratique, mais Owner
   simplifie le debug).

## 4. Configurer les variables d'env

### En local (dev)

`.env.local` :

```
GSC_SERVICE_ACCOUNT_KEY_FILE=C:/chemin/absolu/vers/monjoel-seo-xxx.json
GSC_SITE_URL=sc-domain:monjoel.fr
```

### En production (Vercel)

Settings → Environment Variables → ajouter :

- `GSC_SERVICE_ACCOUNT_KEY` = **contenu** du JSON, en une seule ligne. Copier-coller
  le fichier entier. Vercel gère les retours-charriot dans la `private_key` sans escape
  manuel — vérifier après save que la valeur s'ouvre bien comme JSON.
- `GSC_SITE_URL` = `sc-domain:monjoel.fr`
- `CRON_SECRET` = string aléatoire fort (32+ chars). Sert à protéger le cron auto
  (voir section 6).
- `ADMIN_API_KEY` (optionnel) = pour pouvoir déclencher `/api/admin/seo/sync` via curl
  en cas de debug, sans cookie de session.

## 5. Premier test

1. Aller sur `/admin/seo` (onglet **Performance**).
2. Cliquer **Sync now**.
3. Si tout est OK : les 4 KPI cards se remplissent + tableau Top pages / Top requêtes.
4. Si erreur : le message s'affiche en haut. Les cas typiques :
   - `User does not have sufficient permission for site` → étape 3 ratée
   - `Search Console API has not been used in project` → étape 2 ratée
   - `client_email manquant` → variable `GSC_SERVICE_ACCOUNT_KEY` mal copiée

## 6. Activer le cron auto (optionnel, à faire après le test manuel)

Le cron sync les données 1× par jour à 4h du matin (UTC).

1. Vérifier que `CRON_SECRET` est bien défini dans Vercel.
2. Ajouter dans `vercel.json` la section suivante (à la racine de l'objet) :

   ```json
   "crons": [
     {
       "path": "/api/cron/seo-sync",
       "schedule": "0 4 * * *"
     }
   ]
   ```

   Vercel envoie un `Authorization: Bearer ${CRON_SECRET}` automatiquement quand on
   définit une **Cron Job Secret** dans les settings projet (ou notre code le lit
   directement depuis l'env, ce qui marche sans config supplémentaire).
3. Push sur main → Vercel détecte le nouveau cron et le programme.

## 7. Persistence du cache

- Si Supabase est configuré ET que la table `seo_search_console_cache` existe
  (cf. migration dans `lib/supabase-schema.sql`) → snapshot écrit en DB.
- Sinon → fichier `data/seo-cache.json` (dev) ou `/tmp/seo-cache.json` (Vercel,
  TTL 24h car `/tmp` peut être recyclé entre deux invocations serverless).

Pour appliquer la migration Supabase : copier les CREATE TABLE de la fin de
`lib/supabase-schema.sql` dans l'éditeur SQL Supabase et exécuter.

## 8. Sécurité

- Les credentials ne sont **jamais** retournés dans une réponse API ni loggés
  (la private_key est filtrée des messages d'erreur).
- L'endpoint `/api/admin/seo/sync` exige un cookie de session Supabase ou un header
  `X-Admin-Key`. Pas d'auth → 401.
- L'endpoint `/api/cron/seo-sync` exige `Authorization: Bearer ${CRON_SECRET}`.
- Les données affichées (clics/impressions) ne sont pas confidentielles — l'endpoint
  `/api/admin/seo/data` est non-authentifié pour simplifier le polling côté UI.
  Si besoin de durcir : ajouter le même check `isAuthorized` que le sync.
