# Roadmap content & visual pipeline — Mai → Juillet 2026

**Date de l'audit** : 30 avril 2026
**Méthodologie** : 2 agents d'audit parallèles (visuel/assets + copy/content) sur l'ensemble du repo `Monjoel_v1_fresh`.
**Référence éditoriale** : `lib/seo/premium/content/plombier-paris-15.ts` (voix Joël franche, ton journalistique, chiffres concrets, vocabulaire métier précis).
**Règle DA absolue** : palette violet `#7055A7` + mauve `#9E76EC` + jaune `#F5D547` à conserver. Photos doivent suivre la LUT Joël Purple (ombres `#4a3070`, mid `#7055A7`, highlights `#FFF8DC`).

---

## ✅ Déjà livré (commits 1 + 2 de cette branche)

### Bugfixes cohérence
- Prix départ alignés sur HubFAQ : 29€ → **79/89/59€** (plomberie/serrurerie/électricité) dans 5 fichiers + lib/ab-test/config.ts
- Avis Google alignés sur **947** (canonique) dans Hero/PlomberieHero/ElectriciteHero (étaient à 847)
- Témoignages localisés IDF (Lyon/Marseille/Bordeaux/Toulouse → Saint-Denis/Boulogne/Nanterre/Versailles)
- Verification GSC placeholder commenté

### JoelWordmark UX
- Hover retiré (bug : lettres o/e/l disparaissaient via fallback initial)
- Patch idle J (motion 12 reset les props absentes)
- Patch tréma (transform conflit motion → left:calc())

### Refonte voix Joël (9 sections P0+P1)
- ScamTestimonials : 10 témoignages IDF avec prix annoncé/payé chiffrés + 2 cas évités
- StopArnaquesStats : 4 stats sourcées DGCCRF/UFC/INC + footnote méthodologie
- StopArnaquesHero : H1 manifeste mécanique + lead 70 mots
- HubFAQ : +24 nouvelles Q (8 par métier × 3) couvrant paiement, garanties, locataire/propriétaire, assurances, refus devis, sous-traitance
- A propos : storytelling fondateur (anecdote 2022, chronologie 2022-2025, quote sur fond gradient violet, 4 valeurs refondues)
- StopArnaquesPractices : 6 cards enrichies (tactic + cas type chiffré + recours actionnable)
- Advantages : 6 cards refondues avec preuve (RC pro, Qualibat, mécanique tarif fixe, 30 min/60 min, etc.)
- StopArnaquesSolution : 6 garanties tangibles (annulation sans frais, identité vérifiée, délai chronométré, facture conforme assurance, SAV 30 jours)

---

## 📋 Plan visuel/assets (Mehdi exécute)

### Sprint 1 — P0 critique (1 semaine)

#### ASSET 1 — Hero homepage : portrait artisan rassurant
- **Use case** : `components/sections/HeroCinematic.tsx` couche 0c (poster cinematic)
- **Specs** : 2400×1600 (3:2), AVIF q70 + JPEG q82 → `/public/videos/hero-poster.avif|jpg`
- **Prompt Midjourney 7** :
```
Cinematic editorial portrait of a 38-year-old French male artisan-craftsman, warm trustworthy smile, looking softly toward camera, three-quarter face. Wearing dark navy work overalls with subtle yellow accent stripe on shoulder. Crouched or standing in a Parisian apartment hallway, holding a professional toolbox with brand-new chrome tools visible. Clean Haussmannian background slightly out of focus (depth of field f/2.0). Lighting: soft warm key light from left simulating late afternoon golden hour through a window, with a deep purple ambient fill light in shadows (#7055A7). Composition rule of thirds, subject right side. Color palette dominated by deep purple #7055A7, lavender #9E76EC, with warm yellow #F5D547 accent (logo sticker on toolbox). Photorealistic, magazine cover quality, shot on Sony A7R V with 50mm 1.4 lens. Subtle film grain. Confident professional expression, not posed corporate, slightly candid. --ar 3:2 --style raw --v 7 --s 250
```
- **Variantes** : V2 femme 32 ans, V3 homme 50 ans (ancienneté), V4 mobile 9:16

#### ASSET 2 — Vidéo Hero cinematic (3 encodes)
- **Use case** : `HeroCinematic.tsx` couche 0d (cascade `<source>` av1 → hevc → h264)
- **Specs** : 1080p 24fps 8-12s loopable, encodé via `scripts/encode-hero-video.sh`
- **Targets** : `/public/videos/hero.av1.mp4` (~600KB) + `.hevc.mp4` (~900KB) + `.h264.mp4` (~1.5MB)
- **Prompt Seedance 2** :
```
Cinematic slow motion close-up of a French artisan plumber's hands tightening a chrome wrench on a brass pipe under a kitchen sink. Warm late afternoon light filters through a window casting soft purple shadows on the white pipes. Camera slowly dollies left in 8 seconds revealing the artisan's focused face, friendly mid-30s, navy uniform with small yellow patch. Color grading deep purple shadows, soft lavender mid-tones, golden yellow highlights. Slight film grain. Loopable seamless start/end. Aspect ratio 16:9, 24fps, 1080p, 10 seconds, no audio.
```
- **Variante B** : serrurier installant cylindre A2P haute sécurité (alternance)

#### ASSET 3 — `service-serrurerie.jpg` (manquant, casse home bento)
- **Use case** : `components/sections/ServicesDeepDive.tsx` row 02
- **Specs** : 1600×1200 (4:3) JPEG q85 → `/public/images/service-serrurerie.jpg`
- **Prompt** :
```
Editorial close-up photograph of a professional locksmith hands using a precision lockpick tool to open a high-security A2P certified Vachette cylinder lock on a Parisian apartment door. The door is dark wood with brass hardware. Soft warm key light from upper-left, deep purple ambient shadows. Brand-new chrome lockpicks visible in a leather organizer. Subtle yellow accent (small Joël brand sticker on the toolkit). Camera angle: slightly low, focus on hands and lock. Background: elegant Haussmannian hallway slightly out of focus. Color palette dominated by purple #7055A7 and lavender #9E76EC, warm wood tones, yellow accent #F5D547. Photorealistic, editorial magazine quality, shot on 85mm 1.8 lens. --ar 4:3 --style raw --v 7
```

#### ASSET 4 — Cutout transparent visage Hero
- **Use case** : ajouter slot image PNG transparent à droite du wordmark Hero (composition CSS), à intégrer dans `HeroCinematic.tsx`
- **Specs** : 1024×1280 (4:5) PNG transparent → `/public/hero-artisan-portrait.png`
- **Outil** : GPT Image 2 (meilleur pour cutouts) ou Midjourney + remove.bg
- **Prompt** :
```
Half-body portrait photograph of a friendly French male artisan-craftsman, mid-30s, wearing clean navy blue work overalls with a small yellow MonJoël embroidered badge on the chest. Warm trustworthy smile, looking directly at viewer with confident eyes. Holding a professional chrome adjustable wrench casually at chest level. Soft studio lighting from left. Subject only, plain white background (cutout-ready). Photorealistic, sharp focus on eyes, detailed skin texture, slight 5 o'clock shadow. Magazine cover quality. 4:5 portrait aspect ratio. Make sure background is completely plain white for easy alpha extraction.
```

### Sprint 2 — P1 preuves & humanité (1 semaine)

#### ASSET 5 — Avatars témoignages × 6
- **Use case** : `ScamTestimonials.tsx` + `PremiumPageRenderer.tsx` (section temoignages)
- **Specs** : 400×400 carré WebP q85 → `/public/testimonials/avatar-{1-6}.webp`
- **Diversité** : 3 femmes, 3 hommes, 3 ethnies, 25-65 ans
- **Prompt unique avec 6 variantes** :
```
Set of 6 individual portrait photographs of French residents of Paris and Île-de-France, candid friendly expressions, looking slightly off-camera. Diversity: a 32-year-old woman in office attire, a 58-year-old man with grey beard, a 28-year-old North African woman professional, a 45-year-old Black man in casual smart, a 38-year-old Asian woman with glasses, a 67-year-old Caucasian woman senior. All shot in soft natural daylight in front of slightly out-of-focus Parisian apartment interior backgrounds (different colors per person, but warm neutral tones). Photorealistic, sharp focus on eyes, magazine editorial quality. Square format 1:1. Generate as 6 separate portraits in one batch with consistent lighting style. --ar 1:1 --style raw --v 7 --s 100
```

#### ASSET 6 — Before/After × 3 paires (plomberie, serrurerie, électricité)
- **Use case** : nouveau slot dans `Advantages.tsx` ou nouvelle section dédiée. Slider via `react-compare-slider` ou CSS pure clip-path.
- **Specs** : 1600×1200 (4:3) WebP q80 → `/public/before-after/{trade}-{before|after}.webp`
- **Naming convention** : 3 paires
- **Prompt PLOMBERIE BEFORE** :
```
Photograph of an untreated water leak under a kitchen sink, brass pipe joint with limescale buildup and dripping water visible, small puddle on bottom cabinet floor, dim ambient light. Realistic, slightly grim atmosphere, documentary style. --ar 4:3 --style raw --v 7
```
- **Prompt PLOMBERIE AFTER** :
```
Same exact under-sink composition, same camera angle, same kitchen, but now the pipe joint is clean shiny chrome with new fittings, perfectly dry, soft warm side light, satisfying repair completed. Subtle yellow Joël tape on the new pipe seal. Color grading slight purple ambient. --ar 4:3 --style raw --v 7
```
- **Idem serrurerie** (porte avec cylindre cassé → A2P 3 étoiles Vachette)
- **Idem électricité** (tableau brûlé Schneider → tableau neuf NF C 15-100)
- **Important** : utiliser `--seed` Midjourney pour cohérence cadrage entre paires

#### ASSET 7 — Mains au travail × 3 close-ups métier
- **Use case** : slots dans `MetierTrust.tsx` ou nouveau composant proof
- **Specs** : 1600×900 (16:9) WebP q85 → `/public/metier-mains/{plombier|serrurier|electricien}.webp`
- **Prompt PLOMBIER** :
```
Macro photograph close-up of a male plumber's calloused experienced hands, gripping a chrome adjustable wrench, tightening a polished copper pipe joint. Visible water droplet glistening on the pipe. Soft warm key light from upper left, deep purple ambient shadows. Subtle yellow Joël brand sticker on the wrench handle. Photorealistic detail on skin texture, hand veins, fingernails slightly worn. Background completely out of focus (f/1.4). Editorial magazine quality. --ar 16:9 --style raw --v 7
```
- (Variantes serrurier + électricien fournies dans audit complet)

#### ASSET 8 — Refresh 3 Hero métier (visage + DA Purple)
- **Use case** : `PlomberieHero.tsx` / `SerrurerieHero.tsx` / `ElectriciteHero.tsx` via `useSiteAsset`
- **Specs** : 1200×1000 + version mobile 600×500 → `/public/hero-{trade}.webp` + `-mobile.webp`
- **3 prompts détaillés** disponibles dans audit (1 plombier H 38a, 1 serrurière F 30a, 1 électricien H 45a)
- **Important** : MÊME seed Midjourney pour les 3 → cohérence visuelle inter-pages métier

### Sprint 3 — P2 polish stratégique (2 semaines)

| Asset | Use case | Quantité |
|---|---|---|
| Photo anti-arnaques (facture surfacturée déchirée) | `StopArnaquesHero.tsx` background | 1 |
| Photo équipe IDF devant van/scooter logoté | `CoverageMap.tsx` enrichissement | 1 |
| Illustration facture transparente | `PricingTransparency.tsx` proof cards | 1 (SVG inline OU bitmap) |
| Vidéo loop B-roll "intervention rapide" 6-8s | slot `HowItWorks.tsx` ou `Advantages.tsx` | 1 |

### Sprint 4 — P3 finitions

- Avatars personas auteurs SEO (4-6) → `lib/seo/premium/personas.ts` + `PremiumPageRenderer.tsx`
- Vérification OG image dynamique (`app/opengraph-image.tsx`) sur les 9 routes opengraph
- Alt text descriptifs ServicesDeepDive (3 images)

### Pipeline upload existant à exploiter

Le système `useSiteAsset(slotId, fallback)` permet d'uploader via `/admin/medias` SANS toucher au code. Slots à compléter dans `lib/data/site-asset-slots.ts` :
- `home-hero-portrait`
- `testimonials-avatar-1` à `-6`
- `before-after-{plomberie|serrurerie|electricite}-{before|after}`
- `metier-mains-{plombier|serrurier|electricien}`
- `stop-arnaques-hero`
- `coverage-team-photo`
- `personas-{slug}` × N

---

## 📝 Plan copy restant (à exécuter via LLM puis intégrer)

### P1 — À faire après la vague visuelle

#### P1-9 TrueScope refonte complète (`app/truescope/page.tsx`)

**Problème** : Texte AI-marketing creux ("Une IA incorruptible", "Un algorithme qui ne triche pas", "L'ère de l'arnaque est terminée"). Caps lock excessif. Ponctuation jaune décorative à toutes les phrases.

**Prompt LLM** :
```
Tu es copywriter pour MonJoël. Réécris la page /truescope (l'app IA de devis instantané) en supprimant TOUS les tics AI-marketing.

CE QUE TRUESCOPE FAIT EN VRAI (à respecter) :
1. Vous décrivez votre problème en mots simples
2. Vous prenez 1 photo
3. L'app retourne un prix fixe pour le dépannage
4. Le prix est le même pour tout le monde, peu importe l'heure ou la nervosité du client

CONTRAINTES TON STRICTES :
- ZÉRO caps lock sauf le mot "TrueScope" lui-même
- ZÉRO emoji
- ZÉRO ponctuation jaune décorative dans le texte
- Pas de "incorruptible", "révolutionnaire", "magique"
- Pas de "L'ère de X est terminée"
- Voix Joël : factuelle, courte, pragmatique

GÉNÈRE :
1. H1 (8-12 mots) qui pose la promesse claire
2. Subtitle (15-25 mots) en termes humains
3. Manifeste 3 paragraphes (40-60 mots chacun) :
   - Pourquoi on a fait TrueScope (problème humain : devis qui varient)
   - Comment ça résout (mécanique : l'IA ne sait pas qui vous êtes)
   - Ce que ça change concrètement (1 phrase punchline)
4. 3 Steps (titre 2-4 mots + description 12-18 mots)
5. 3 Features (titre 2-3 mots + description 15-20 mots)
6. CTA finale H2 (6-10 mots) + sous-paragraphe (18-25 mots)

FORMAT JSON :
{
  "h1": "...", "subtitle": "...",
  "manifesto": ["p1", "p2", "p3"],
  "steps": [{"number": "01", "title": "...", "description": "..."}],
  "features": [...],
  "ctaH2": "...", "ctaSub": "..."
}
```

#### P1-10 Page Contact enrichie (`app/contact/page.tsx`)

**Problème** : "Adresse : Île-de-France" (vague). Pas d'horaire détaillé. Pas de FAQ ops. Pas de "Que se passe-t-il après l'appel".

**Prompt LLM** : voir audit complet section GAP 10 — 4 blocs : "Que se passe-t-il après l'appel" (4 étapes), coordonnées détaillées (adresse postale + email + horaires URGENCE vs ADMINISTRATIF + SIRET placeholder), 4 FAQ contact, refonte microcopy form.

#### P1-11 Page Recrutement (`app/recrutement/page.tsx`)

**Problème** : 4 avantages slogans vides ("rémunération juste"), aucun chiffre, aucun témoignage artisan, pas d'explication "comment on est payé".

**Prompt LLM** : voir audit complet section GAP 11 — refonte 4 avantages avec chiffres, 1 témoignage artisan complet, 5 FAQ artisan (paiement concret, commission Joël, documents, missions/mois moyennes, refus mission).

#### P1-8 ScamQuiz refondu (`components/sections/ScamQuiz.tsx`)

**Problème** : 5 questions avec valeurs invendées et sources vagues.

**Prompt LLM** : voir audit complet section GAP 8 — 8 questions sourcées DGCCRF/UFC/INC avec URLs vérifiables.

### P2 — Long terme

#### P2-15 Blog 12 nouveaux articles
1500-2500 mots chacun, 4 par métier. Plan détaillé dans audit GAP 15.
Plomberie : "Combien coûte vraiment un débouchage à Paris en 2026", "Reconnaître une fuite cachée : 7 signes", "Chauffe-eau qui ne chauffe plus : diagnostic en 5 étapes", "Dégât des eaux en copropriété : qui paye quoi"
Serrurerie : "Porte claquée à Paris : prix réels 2026", "Choisir une serrure A2P", "Que faire après un cambriolage", "Cylindre vs barillet"
Électricité : "Disjoncteur qui saute : 5 vraies causes", "Mise aux normes NF C 15-100", "Tableau électrique vétuste", "Panne électrique nuit : bons réflexes"

#### P2-18 Meta-descriptions par persona/métier/ville
40 variantes (3 hubs + 36 villes Premium + homepage). Prompt LLM dans audit GAP 18.

#### P2-16 Catalogue 12 CTAs
Phone primary + devis secondary + inline. Prompt LLM dans audit GAP 16.

#### P2-19 Génération pages SEO Premium en série
Pour combler le gap 36 villes Premium / 1200+ villes IDF. Prompt swarm coordinator dans audit GAP 19.

#### P2-17 Pages CGU/Mentions/Confidentialité
Vérification + refonte si template Lorem. Prompt juriste e-commerce dans audit GAP 17.

### P3 — Polish

- Alt text ServicesDeepDive (3 images)
- 25 microcopies form/error/success/empty/tooltips/toasts
- TrustStrip stats visibles (garantie pièces 2 ans, RC pro, couverture)
- Footnote méthodologie StatsStrip (15 000 interventions, 4.9/5 947 avis, 20 min délai, 100% prix fixe)

---

## 🎨 Brand voice guide MonJoël

À formaliser dans `docs/brand-voice.md` (à créer plus tard).

### Voix
Franche, directe, terre-à-terre. Voix de l'artisan qui parle au client comme à un ami qui aurait un problème chez lui.

### À privilégier
- Phrases courtes (max 14 mots H1, 25 mots corps)
- Chiffres concrets (prix, minutes, pourcentages)
- Cas localisés ("rue Mademoiselle", "Beaugrenelle", "Versailles")
- Vocabulaire métier (fuite, débouchage, A2P, NF C 15-100)
- "Le prix annoncé est le prix payé" (mantra)
- Mention naturelle 01 41 69 10 08

### À bannir
- "Leader", "n°1", "exceptionnel", "incroyable", "fantastique", "magique", "révolutionnaire"
- "Notre équipe est là pour vous", "main dans la main", "ensemble", "famille Joël", "ADN", "passion"
- "Cliquez ici", "En savoir plus", "Découvrez"
- "Toujours"/"Jamais" non défendable juridiquement
- Ponctuation jaune décorative à toutes les phrases (composant `yellowPunctuation` à utiliser parcimonieusement, 1 par titre max)
- Caps lock sur paragraphes
- Emojis dans les copys principaux (réserver aux signaux markdown blog : ⚠️ ✅ 📞)
- Témoignages romanisés sans ville/prix/cas concret

---

## 🔢 Cohérence chiffres canonique (référence après commits 1+2)

| Élément | Valeur canonique | Source de vérité |
|---|---|---|
| Avis Google | **947** | TrustStrip + 29 fichiers |
| Note moyenne | **4.9/5** | partout |
| Prix départ plomberie | **79€** | HubFAQ + meta |
| Prix départ serrurerie | **89€** | HubFAQ + meta |
| Prix départ électricité | **59€** | HubFAQ + meta |
| Délai Paris | **30 min** | hub + advantages |
| Délai couronne IDF | **60 min** | advantages |
| Téléphone | **01 41 69 10 08** | partout |
| Email | **contact@monjoel.fr** | à confirmer |
| Garantie pièces | **2 ans constructeur** | advantages + FAQ |
| Garantie main d'œuvre | **1 an** | advantages + FAQ |
| SAV | **30 jours retour offert** | StopArnaquesSolution |

---

## 🚀 Stratégie de roll-out copy

| Sprint | Focus | Livrables | Effort |
|---|---|---|---|
| **S1 (P0 — fait)** | Hero solidifié + cohérence | ✅ déjà livré dans cette branche | — |
| **S2 (P1 — 1 sem)** | Pages secondaires & polish | TrueScope refonte · Contact enrichi · Recrutement · ScamQuiz sourcé | M |
| **S3 (P2 — 2 sem)** | SEO scale | 12 articles blog · 40 meta-desc · 12 CTAs · Pages Premium en série · Légal vérifié | XL |
| **S4 (P3 — finitions)** | Polish | Alt text · Microcopies · TrustStrip stats · Footnote méthodologie | S |

---

## 📎 Audits complets

Les 2 audits complets (visuel + copy, au format détaillé avec 14 + 25 prompts prêts à coller) sont disponibles dans la conversation Claude Code de la session du 30/04/2026 → 01/05/2026 (id à conserver côté Mehdi). Ce fichier en est le résumé exécutif.
