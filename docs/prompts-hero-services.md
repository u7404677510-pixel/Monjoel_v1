# Prompts Hero — Hubs métier + 39 sous-services

> Bibliothèque de prompts prêts à coller dans **Midjourney 7** ou **GPT Image 2**
> pour générer toutes les images Hero du site MonJoël.
>
> 3 hubs métier + 39 sous-services = **42 prompts** au total.

---

## Convention DA Purple — à respecter sur TOUS les visuels

Pour assurer une cohérence visuelle entre les 42 images, chaque prompt suit ce **template de base** (variables entre `{}` à remplacer) :

```
Editorial photograph of a {SUBJECT_OR_SCENE}, branded MonJoël badge visible
(small yellow patch with "MonJoël" text on chest or tool). Setting:
{LOCATION_PARISIAN}. Lighting: warm directional key light from
{LIGHT_DIRECTION}, deep purple ambient fill in shadows (#7055A7).
Color grading: deep purple shadows (#4a3070), lavender mid-tones (#9E76EC),
golden yellow highlights (#F5D547). Subtle film grain. Photorealistic,
editorial magazine quality, shot on {LENS}. {ASPECT_RATIO}. --style raw --v 7
```

**Règles communes** :
- ✅ Toujours inclure le badge MonJoël jaune visible (sur uniforme, outil, ou stuff visible)
- ✅ Lighting "warm key + deep purple ambient shadows" (DA Purple)
- ✅ Photoréaliste editorial magazine quality
- ✅ Subtle film grain (anti-AI-polish)
- ❌ Pas de stock photo cliché
- ❌ Pas de gradient SaaS générique
- ❌ Pas de texte/logo généré dans l'image (sauf badge MonJoël)
- ❌ Pas d'éléments UI à l'écran

**Specs export** :
- Hub métier : 1200×1000 (~6:5) — `/images/hero-{trade}.png` (déjà généré)
- Sous-service Hero : **1200×800 (3:2)** — `/images/services/{trade}-{service-slug}.png`
- Format : WebP qualité 85 (Sharp / Squoosh) ou PNG si transparence requise
- Post-prod : confirmer LUT Joël Purple cohérente sur tout le set

---

# 🏠 PROMPTS HUB MÉTIER (3 prompts — déjà générés et utilisés)

> Ces 3 prompts ont déjà servi à générer les images Hero principales des
> hubs `/plomberie`, `/serrurerie`, `/electricite`. Reproduits ici pour
> référence et régénération éventuelle.

### HUB 1 — Plomberie — `/images/hero-plombier.png`
```
Editorial photograph of a confident French male plumber in his late 30s, trustworthy smile, looking toward viewer. Wearing clean navy blue plumber overalls with subtle yellow Joël badge on chest. Half-body framing. Standing in a modern Parisian bathroom with chrome fixtures visible behind him (slightly out of focus). Holding a professional pipe wrench at chest level. Soft warm key light from window left, deep purple ambient fill in shadows (#7055A7). Subtle film grain. Color palette: deep purple, lavender, warm yellow accents. Photorealistic editorial magazine quality. --ar 6:5 --style raw --v 7
```

### HUB 2 — Serrurerie — `/images/hero-serrurier.png`
```
Editorial photograph of a confident French female locksmith in her early 30s, focused intelligent expression, looking calmly at viewer. Wearing dark technical jacket with reflective Joël yellow badge. Half-body. Holding a high-security A2P certified cylinder lock and a precision opening device. Standing in front of a wooden Parisian door with brass hardware (out of focus). Warm key light left, deep purple shadows. Photorealistic. --ar 6:5 --style raw --v 7
```

### HUB 3 — Électricité — `/images/hero-electricien.png`
```
Editorial photograph of a confident French male electrician, mid-40s, trustworthy reassuring smile. Wearing dark navy electrician uniform with yellow Joël badge and visible electrical safety certification clip. Half-body. Holding a professional voltmeter and an insulated screwdriver. In front of an open modern Schneider electrical panel (slightly out of focus). Warm key light from right, deep purple ambient shadows. Photorealistic editorial. --ar 6:5 --style raw --v 7
```

---

# 🔧 SOUS-SERVICES PLOMBIER (17 prompts)

> Cible : `/images/services/plombier-{slug}.png` — 1200×800 (3:2)

### 1. Fuite d'eau — `/plombier/fuite-eau`
```
Editorial macro photograph of a French plumber's hands tightening a chrome adjustable wrench on a leaking brass pipe joint under a modern Parisian kitchen sink. Single water droplet caught mid-fall, glistening. Plumber wears navy uniform with subtle yellow MonJoël badge visible on cuff. Camera angle: low, focus on hands and pipe. Background: cabinet interior softly out of focus. Warm key light from upper-left, deep purple ambient shadows (#7055A7). Subtle film grain. Photorealistic editorial magazine quality. --ar 3:2 --style raw --v 7
```

### 2. WC bouchés — `/plombier/wc-bouches`
```
Editorial photograph of a French plumber kneeling beside a Parisian apartment toilet, professionally inserting an electric drain auger (furet électrique) into the bowl. Plumber wears navy uniform with yellow MonJoël badge on chest. Modern white WC, mosaic tile floor visible. Focused expression, gloves on. Warm side light from bathroom window, deep purple ambient shadows. Realistic, editorial. --ar 3:2 --style raw --v 7
```

### 3. Débouchage canalisation — `/plombier/debouchage-canalisation`
```
Editorial close-up of a French plumber operating a professional motorized drain snake machine in a Parisian apartment basement utility room. Cable visibly going into the floor drain. Plumber's gloved hands controlling the device, MonJoël yellow badge on shoulder. Cinematic lighting: warm key from above-left, deep purple ambient shadows revealing copper pipes background. Slight film grain. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 4. Chauffe-eau en panne — `/plombier/chauffe-eau-panne`
```
Editorial photograph of a French plumber crouched beside a wall-mounted electric water heater (chauffe-eau) in a Parisian utility closet, opening the inspection panel with a screwdriver. White cylindrical heater, exposed wiring visible. MonJoël yellow badge on uniform chest. Focused, calm expression. Warm key light from open door, deep purple ambient shadows. Realistic, magazine quality. --ar 3:2 --style raw --v 7
```

### 5. Dégât des eaux — `/plombier/degat-des-eaux`
```
Editorial photograph of a French plumber standing in a Parisian apartment hallway with visible water damage on parquet floor and ceiling stain above. Plumber holds a professional moisture meter probe to the wall, taking a reading. Navy uniform with MonJoël yellow badge. Concerned but professional expression. Soft window light from left, deep purple ambient shadows. Cinematic, editorial. --ar 3:2 --style raw --v 7
```

### 6. Recherche de fuite — `/plombier/recherche-fuite`
```
Editorial photograph of a French plumber holding a professional thermal imaging camera (caméra thermique FLIR-style) pointed at a Parisian apartment wall, infrared display visible on the camera screen showing color heat zones. Plumber concentrated, MonJoël yellow badge on uniform. Background: wall slightly out of focus, warm tones. Deep purple ambient shadows in the room corners. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 7. Remplacement robinet — `/plombier/remplacement-robinet`
```
Editorial macro photograph of a French plumber's hands installing a brand-new chrome single-lever mixer faucet (mitigeur) on a modern white kitchen sink. Old faucet visible to the side, removed. Plumber wears MonJoël yellow badge on cuff. Bright warm key light, deep purple ambient shadows on the granite countertop. Magazine quality, photorealistic. --ar 3:2 --style raw --v 7
```

### 8. Urgence 24h — `/plombier/urgence-24h`
```
Editorial cinematic photograph of a French plumber arriving at a Parisian apartment door at night, holding a professional toolbox and ringing the bell. Apartment building lobby softly lit. Plumber wears navy uniform with MonJoël yellow badge, slight rain on jacket suggesting late-night intervention. Warm key light from corridor, deep purple ambient shadows. Mood: urgency + reassurance. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 9. Ballon eau chaude — `/plombier/ballon-eau-chaude`
```
Editorial photograph of a French plumber installing a brand-new vertical electric water tank (ballon d'eau chaude 200L) on a Parisian apartment wall, securing the bracket. White cylindrical tank with visible Atlantic or Thermor branding. Plumber wears MonJoël yellow badge on uniform. Warm directional key light, deep purple ambient shadows in the utility closet. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 10. Chasse d'eau — `/plombier/chasse-eau`
```
Editorial macro photograph of a French plumber's hands replacing the internal mechanism of a Parisian apartment toilet flush tank, white ceramic visible, new internal Geberit-style mechanism in hands. MonJoël yellow badge on uniform cuff. Bright warm key light from above, deep purple ambient shadows. Realistic, editorial. --ar 3:2 --style raw --v 7
```

### 11. Chaudière en panne — `/plombier/chaudiere-panne`
```
Editorial photograph of a French heating engineer (chauffagiste) inspecting a wall-mounted gas boiler (chaudière) in a Parisian kitchen, opened panel revealing internal components. Plumber holds a multimeter taking a reading on the boiler. MonJoël yellow badge on navy uniform. Calm focused expression. Warm key light from window, deep purple ambient shadows. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 12. Débouchage WC — `/plombier/debouchage-wc`
```
Editorial photograph of a French plumber using a manual drain plunger (ventouse pro) on a clogged Parisian apartment toilet, professional grip and stance. Modern white WC, mosaic tile bathroom visible behind. Plumber wears MonJoël yellow badge on uniform. Focused expression. Warm side light, deep purple ambient shadows. Realistic editorial. --ar 3:2 --style raw --v 7
```

### 13. Évier bouché — `/plombier/evier-bouche`
```
Editorial photograph of a French plumber crouched under a Parisian kitchen sink, manipulating the white siphon trap (siphon) with a wrench, water briefly visible. Stainless steel sink visible above. MonJoël yellow badge on cuff. Warm key light from kitchen window, deep purple ambient shadows in cabinet interior. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 14. Fuite tuyau / canalisation — `/plombier/fuite-tuyau`
```
Editorial close-up of a French plumber's hands wrapping pipe sealant tape around a leaking copper pipe joint in a Parisian apartment ceiling crawl space, water residue visible. New brass fitting awaiting installation. MonJoël yellow badge on cuff. Dramatic warm key light from below, deep purple ambient shadows. Cinematic editorial. --ar 3:2 --style raw --v 7
```

### 15. Groupe de sécurité — `/plombier/groupe-securite`
```
Editorial macro photograph of a French plumber's hands installing a brand-new safety relief valve (groupe de sécurité) on the inlet of a vertical electric water tank, brass and red lever visible. Old corroded valve removed beside. MonJoël yellow badge on cuff. Warm directional key light, deep purple ambient shadows. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 16. Installation WC — `/plombier/installation-wc`
```
Editorial photograph of a French plumber installing a new wall-hung WC (toilet pan) in a renovated Parisian bathroom, white ceramic suspended on chrome bracket, plumber adjusting the level. Tile floor freshly grouted. MonJoël yellow badge on uniform. Bright daylight from window, deep purple ambient shadows. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 17. Lavabo bouché — `/plombier/lavabo-bouche`
```
Editorial photograph of a French plumber clearing a clogged bathroom sink in a Parisian apartment, hands working under the white ceramic basin with a small drain snake. Modern minimalist bathroom design. MonJoël yellow badge on cuff. Soft warm key from bathroom mirror light, deep purple ambient shadows. Realistic editorial. --ar 3:2 --style raw --v 7
```

---

# 🔑 SOUS-SERVICES SERRURIER (16 prompts)

> Cible : `/images/services/serrurier-{slug}.png` — 1200×800 (3:2)

### 1. Ouverture sans perçage — `/serrurier/ouverture-sans-percage`
```
Editorial macro photograph of a French locksmith's hands using a thin opening tool (vérin de sécurité, professional bypass card) sliding under a closed Parisian wooden apartment door to release the latch. Subtle flexion of the door. MonJoël yellow badge visible on cuff. Warm key light from corridor, deep purple ambient shadows on the door wood grain. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 2. Ouverture avec perçage — `/serrurier/ouverture-avec-percage`
```
Editorial photograph of a French locksmith carefully drilling a high-security cylinder lock on a Parisian apartment door using a precision cordless drill, focused expression. Sparks of metal subtle. MonJoël yellow badge on dark technical jacket. Warm key light from upper-left, deep purple ambient shadows. Cinematic editorial. --ar 3:2 --style raw --v 7
```

### 3. Changement de cylindre — `/serrurier/changement-cylindre`
```
Editorial close-up of a French locksmith's hands installing a brand-new Vachette A2P certified brass cylinder lock into a Parisian apartment door, old cylinder visible beside. Detail of lock keys hanging. MonJoël yellow badge on cuff. Warm directional key light, deep purple ambient shadows revealing wood grain texture. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 4. Changement de serrure — `/serrurier/changement-serrure`
```
Editorial photograph of a French locksmith installing a complete new high-security multi-point lock (serrure 3 points) on a Parisian apartment door, brass lock visible mid-installation, screws being tightened. MonJoël yellow badge on jacket. Focused calm expression. Warm key light, deep purple ambient shadows. Editorial magazine quality. --ar 3:2 --style raw --v 7
```

### 5. Clé cassée dans serrure — `/serrurier/cle-cassee-serrure`
```
Editorial macro photograph of a French locksmith's hands using professional key extractor tools removing a broken key fragment from a brass Parisian door cylinder. Detail of broken key tip half-extracted. MonJoël yellow badge on cuff. Bright warm key light from door corridor, deep purple ambient shadows. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 6. Blindage de porte — `/serrurier/blindage-porte`
```
Editorial photograph of a French locksmith installing a steel armor plate (blindage) on a Parisian apartment door, large metal sheet being aligned, drill visible. Door wood frame visible. MonJoël yellow badge on technical jacket. Warm key light from upper-left, deep purple ambient shadows. Cinematic editorial. --ar 3:2 --style raw --v 7
```

### 7. Après effraction — `/serrurier/apres-effraction`
```
Editorial photograph of a French locksmith examining a damaged Parisian apartment door frame after a break-in attempt, splintered wood and pry marks visible. Locksmith taking notes on a tablet. MonJoël yellow badge on dark jacket. Concerned but professional expression. Soft hallway warm light, deep purple ambient shadows on the damaged wood. Realistic editorial. --ar 3:2 --style raw --v 7
```

### 8. Coffre-fort — `/serrurier/coffre-fort`
```
Editorial photograph of a French locksmith working on a wall-mounted home safe (coffre-fort) in a Parisian apartment closet, manipulation tools visible. Black metal safe with mechanical dial. MonJoël yellow badge on cuff. Warm directional key light, deep purple ambient shadows. Cinematic editorial. --ar 3:2 --style raw --v 7
```

### 9. Cylindre haute sécurité — `/serrurier/cylindre-haute-securite`
```
Editorial macro photograph of a French locksmith's hand presenting a high-security A2P 3-star Vachette cylinder lock with its security card and reversible key set, on a wooden surface. Detail of brass mechanism, anti-drill pins visible. MonJoël yellow badge on shirt. Bright warm key light from above, deep purple ambient shadows. Magazine quality. --ar 3:2 --style raw --v 7
```

### 10. Perte de clés — `/serrurier/perte-cles`
```
Editorial photograph of a French locksmith arriving at a Parisian apartment door with a comprehensive professional locksmith toolkit (key extractors, tension wrenches, professional opening devices), ready to open without the original keys. Calm reassuring expression. MonJoël yellow badge on jacket. Warm corridor light, deep purple ambient shadows on door panel. Realistic editorial. --ar 3:2 --style raw --v 7
```

### 11. Porte blindée — `/serrurier/porte-blindee`
```
Editorial photograph of a French locksmith presenting a freshly installed reinforced Parisian apartment armored door (porte blindée) with multi-point lock, brass hardware shining, A2P certification sticker visible on the frame. MonJoël yellow badge on uniform. Warm key light from corridor, deep purple ambient shadows. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 12. Porte fermée à clé — `/serrurier/porte-fermee-a-cle`
```
Editorial macro photograph of a French locksmith's hands manipulating a precision opening tools set (professional locksmith equipment) inside a Parisian apartment lock cylinder that has been locked from inside, focus on the lockpick tools. Brass keyhole detail. MonJoël yellow badge on cuff. Warm directional key light, deep purple ambient shadows on door wood grain. Cinematic editorial. --ar 3:2 --style raw --v 7
```

### 13. Reproduction de clés — `/serrurier/reproduction-cles`
```
Editorial photograph of a French locksmith operating a key cutting machine in a small Parisian workshop, blank key being shaped. Detail of metal shavings, brass keys hanging in background. MonJoël yellow badge on shirt. Warm directional workshop light, deep purple ambient shadows. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 14. Rideau métallique — `/serrurier/rideau-metallique`
```
Editorial photograph of a French locksmith repairing the rolling mechanism of a metal shutter (rideau métallique) on a Parisian shop front, ladder positioned, mechanism visible at the top. MonJoël yellow badge on technical jacket. Warm street-level key light, deep purple ambient shadows. Cinematic editorial. --ar 3:2 --style raw --v 7
```

### 15. Serrure 3 points — `/serrurier/serrure-3-points`
```
Editorial close-up of a French locksmith's hands installing a 3-point security lock (serrure 3 points) on a Parisian apartment door, the three locking pins visible engaging the frame. Brass mechanism shining new. MonJoël yellow badge on cuff. Warm directional key light, deep purple ambient shadows revealing the door wood. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 16. Serrure bloquée — `/serrurier/serrure-bloquee`
```
Editorial macro photograph of a French locksmith's hands diagnosing a stuck Parisian apartment lock cylinder, applying a small amount of graphite-based lubricant via a precision applicator to free the mechanism. Detail of brass cylinder. MonJoël yellow badge on cuff. Warm directional light, deep purple ambient shadows on the door panel. Realistic editorial. --ar 3:2 --style raw --v 7
```

### 17. Serrure multipoints — `/serrurier/serrure-multipoints`
```
Editorial photograph of a French locksmith demonstrating a brand-new 5-point security lock (serrure multipoints A2P) on a Parisian apartment door, the five locking pins clearly visible engaging the frame, brass hardware shining. MonJoël yellow badge on uniform. Warm corridor light, deep purple ambient shadows. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

---

# ⚡ SOUS-SERVICES ÉLECTRICIEN (6 prompts)

> Cible : `/images/services/electricien-{slug}.png` — 1200×800 (3:2)

### 1. Panne électrique — `/electricien/panne-electrique`
```
Editorial photograph of a French electrician using a professional voltmeter to test voltage at a Parisian apartment electrical outlet, focused diagnostic expression. Wall socket exposed, screwdriver visible. MonJoël yellow badge on dark navy uniform. Warm directional key light, deep purple ambient shadows revealing the wall texture. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 2. Disjoncteur qui saute — `/electricien/disjoncteur-saute`
```
Editorial close-up of a French electrician's hands resetting a tripped circuit breaker (disjoncteur différentiel) inside an open Schneider electrical panel in a Parisian apartment utility closet, finger flipping the switch back to the ON position. MonJoël yellow safety sticker visible on the panel door. Warm directional key light, deep purple ambient shadows. Cinematic editorial. --ar 3:2 --style raw --v 7
```

### 3. Court-circuit — `/electricien/court-circuit`
```
Editorial photograph of a French electrician carefully isolating a wire connection in a Parisian apartment junction box, slight scorch marks on old wiring visible. Insulated tools, multimeter beside. MonJoël yellow badge on navy uniform. Concerned focused expression. Warm directional key light, deep purple ambient shadows. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 4. Tableau électrique — `/electricien/tableau-electrique`
```
Editorial photograph of a French electrician installing a new modern Schneider electrical panel (tableau électrique) on a Parisian apartment wall, organized colored wiring visible, label markers in hand. MonJoël yellow safety sticker on the panel door. Warm directional key light from above, deep purple ambient shadows. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

### 5. Mise aux normes NF C 15-100 — `/electricien/mise-aux-normes`
```
Editorial photograph of a French electrician inspecting a fully-renovated Parisian apartment electrical installation, holding the NF C 15-100 conformity certificate (attestation Consuel) in front of a brand-new compliant Schneider electrical panel. MonJoël yellow badge on uniform. Calm professional expression. Warm key light, deep purple ambient shadows. Editorial magazine quality. --ar 3:2 --style raw --v 7
```

### 6. Prise / interrupteur HS — `/electricien/prise-interrupteur-hs`
```
Editorial macro photograph of a French electrician's hands replacing a defective wall outlet (prise) in a Parisian apartment with a brand-new Legrand white outlet, screwdriver mid-action, old outlet removed beside. MonJoël yellow badge visible on cuff. Warm directional key light, deep purple ambient shadows on wall texture. Photorealistic editorial. --ar 3:2 --style raw --v 7
```

---

# 📦 Pipeline d'intégration des images générées

Une fois les images générées (Midjourney 7 / GPT Image 2) :

1. **Optimiser** : convertir en WebP qualité 85 via `cwebp -q 85` ou Squoosh.app
2. **Renommer** au format canonique : `{trade}-{slug}.png` ou `.webp`
3. **Uploader** dans `/public/images/services/`
4. **Mettre à jour `lib/data/site-asset-slots.ts`** : ajouter un slot `service-{trade}-{slug}` par image
5. **Pages services** (`app/{trade}/{service}/page.tsx`) : récupérer via `useSiteAsset("service-{trade}-{slug}", fallback)`

Ou (workflow simple) : le fichier directement dans `/public/images/services/{trade}-{slug}.png`, et le composant Hero des pages services pointe directement vers ce path en dur.

## Notes de cohérence

- **Genre artisan** : varier H/F sur les 42 visuels pour diversité (60% H / 40% F est OK)
- **Âge** : varier 30-55 ans, éviter les artisans trop jeunes (<25) ou trop vieux (>60)
- **Ethnies** : diversité respectée — pas que des artisans blancs
- **Décor** : Parisien Haussmannien ou moderne IDF, pas de stock photo générique
- **Branding MonJoël** : badge jaune TOUJOURS visible (sur uniforme, casquette, ou outil)
- **DA Purple** : warm key + deep purple ambient — vérifier sur chaque image générée
- **Post-prod** : LUT Joël Purple recommandée si dispo (DaVinci/Premiere) pour homogénéiser
