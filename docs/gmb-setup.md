# Setup Google My Business → MonJoël

Guide pour brancher les vrais avis Google My Business sur le site et réinjecter un `aggregateRating` Schema.org **légitime** (pas fictif).

## Pourquoi c'est important

Avant le 2026-05-04, le site affichait dans son JSON-LD :
```json
"aggregateRating": { "ratingValue": "4.9", "reviewCount": "947" }
```

C'était **fictif**. Risque pénalité Google "structured data spam" + manual action si détecté. Tous ces blocs ont été retirés des Schemas.

Pour réafficher proprement :
1. Créer un profil Google My Business
2. Récolter des avis réels
3. Connecter l'API GMB → notre Supabase
4. Le schema `aggregateRating` réapparaît automatiquement quand ≥10 avis vérifiés

---

## Étape 1 — Profil Google My Business

1. Aller sur https://www.google.com/business/
2. Créer un profil pour **MonJoël**
3. Catégorie : "Plombier" (catégorie principale) + ajouter "Serrurier" et "Électricien" en secondaires
4. Adresse : ton adresse pro (peut être masquée du public si "Secteur de prestation")
5. Zone de service : Paris + Île-de-France (8 départements)
6. Téléphone : 01 41 69 10 08
7. Site web : https://monjoel.fr
8. Faire vérifier le profil (carte postale, téléphone, ou vidéo selon ce que Google propose)

## Étape 2 — Récolter les premiers avis

Méthodes :
- Mail post-intervention avec lien direct vers la page Google "laisser un avis"
- QR code sur la facture / le sticker artisan
- Demande verbale après intervention (ne pas insister, illégal de payer pour des avis)

Cible court terme : **10 avis vérifiés** (seuil minimum pour réinjecter `aggregateRating` dans le Schema.org).

## Étape 3 — Activer la sync API

### 3.1 Migration Supabase

Dans l'éditeur SQL Supabase, exécuter :
```bash
lib/supabase-migration-reviews.sql
```

Ça crée les tables `reviews` + `aggregate_rating_cache` + le trigger automatique.

### 3.2 Service account Google Cloud

1. https://console.cloud.google.com/ → créer un projet "MonJoel-GMB"
2. Activer l'API : `My Business Business Information API` + `My Business Account Management API`
3. IAM & Admin → Service Accounts → Créer un service account "monjoel-gmb-reader"
4. Créer une clé JSON, télécharger
5. Dans Google Business Profile → Paramètres → Gestionnaires → Ajouter l'email du service account comme **Manager**

### 3.3 Variables d'environnement Vercel

Ajouter dans **Vercel → Settings → Environment Variables** :

```bash
GMB_ACCOUNT_ID="accounts/123456789"        # ID compte GMB (URL du dashboard)
GMB_LOCATION_ID="locations/987654321"      # ID de la fiche
GMB_SERVICE_ACCOUNT_KEY='{"type":"service_account","client_email":"...","private_key":"..."}'  # JSON stringifié de la clé téléchargée
SUPABASE_SERVICE_ROLE_KEY="eyJhbG..."      # Service role key Supabase (Settings → API)
CRON_SECRET="<générer 32 chars random>"     # Token pour gate l'endpoint cron
```

⚠ Ne jamais commit ces valeurs dans le repo. Vercel env vars uniquement.

### 3.4 Activer le cron

Dans `vercel.json`, décommenter / ajouter :

```json
{
  "crons": [
    {
      "path": "/api/cron/reviews-sync-gmb",
      "schedule": "0 4 * * *"
    }
  ]
}
```

(Sync chaque jour à 4h du matin.)

### 3.5 Test manuel

```bash
curl -X POST https://monjoel.fr/api/reviews/sync-gmb \
  -H "Authorization: Bearer $CRON_SECRET"
```

Réponse attendue :
- Sans setup : `{ "ok": true, "skipped": true, "reason": "GMB env vars missing" }`
- Avec setup, pas d'avis : `{ "ok": true, "fetched": 0, "inserted": 0, "updated": 0 }`
- Avec setup + 12 avis : `{ "ok": true, "fetched": 12, "inserted": 12, "updated": 0 }`

## Étape 4 — Vérifier l'apparition dans les Schemas

Une fois ≥10 avis vérifiés synchronisés :

1. Build/déployer le site (la cache mémoire `aggregate-rating.ts` se warm-up au premier render)
2. Aller sur https://search.google.com/test/rich-results et tester n'importe quelle page (ex: `/plombier/paris-15`)
3. Vérifier que `LocalBusiness` contient maintenant `aggregateRating` avec ta vraie note

## Étape 5 — Brancher le composant `<RealReviews />`

Créé dans `components/sections/RealReviews.tsx`. Importer où on veut afficher les avis :

```tsx
import RealReviews from "@/components/sections/RealReviews";

// Sur la home, en remplacement ou complément de ScamTestimonials :
<RealReviews limit={6} layout="grid" />

// Sur une page métier :
<RealReviews service="plombier" limit={4} layout="carousel" />

// Sur une page ville premium :
<RealReviews city="paris-15" limit={3} hideAggregate />
```

Le composant se rend en NULL tant qu'il n'y a aucun avis = pas besoin de gating manuel.

---

## Maintenance

- Répondre aux avis (positifs ET négatifs) sur Google → la sync remonte les réponses dans Supabase et le composant les affiche
- Modérer les avis frauduleux : Supabase admin → reviews → status='hidden'
- Éviter d'acheter des avis (illégal France + pénalité Google)
- Si chute soudaine du nombre d'avis : vérifier que GMB n'a pas suspendu le profil

## Statut actuel (2026-05-04)

- ✅ Schema `aggregateRating` fictif retiré de tous les schemas
- ✅ Migration SQL prête (`lib/supabase-migration-reviews.sql`)
- ✅ Endpoints `/api/reviews` et `/api/reviews/sync-gmb` prêts
- ✅ Helper `getAggregateRating()` prêt (renvoie null tant que <10 avis)
- ✅ Composant `<RealReviews />` prêt à brancher
- ⏳ **À faire (côté Mehdi)** : étapes 1, 2, 3, et 5
