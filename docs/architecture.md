# Architecture Technique - monjoel.fr

## Vue d'ensemble

Le site Joël est construit avec **Next.js 14 App Router** en mode **Static Site Generation (SSG)**. Cette architecture permet de générer **7869 pages statiques** au build time pour des performances optimales et un SEO maximal.

---

## Diagramme d'Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              UTILISATEUR                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLOUDFLARE                                      │
│  • DNS                                                                       │
│  • SSL/TLS                                                                   │
│  • Cache CDN                                                                 │
│  • Bot Protection                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                VERCEL                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         NEXT.JS 14 APP                                │   │
│  │                                                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                   │   │
│  │  │   PAGES     │  │ COMPONENTS  │  │    LIB      │                   │   │
│  │  │  (7869)     │  │             │  │             │                   │   │
│  │  │             │  │  sections/  │  │  data/      │                   │   │
│  │  │  /          │  │  seo/       │  │  seo/       │                   │   │
│  │  │  /plomberie │  │  ui/        │  │  hooks/     │                   │   │
│  │  │  /serrurier │  │             │  │             │                   │   │
│  │  │  /...       │  │             │  │             │                   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                   │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                      STATIC ASSETS (CDN)                              │   │
│  │  • Images (hero-*.jpg, logo.png)                                      │   │
│  │  • Fonts (Chillax, Poppins)                                           │   │
│  │  • CSS (Tailwind compiled)                                            │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
         ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
         │   SUPABASE   │  │     GTM      │  │  COOKIEBOT   │
         │  (optionnel) │  │              │  │              │
         │              │  │  • GA4       │  │  • Consent   │
         │  • Config    │  │  • Ads       │  │    Mode v2   │
         │  • Admin     │  │  • Events    │  │  • Bannière  │
         └──────────────┘  └──────────────┘  └──────────────┘
```

---

## Flux de Données SEO

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BUILD TIME (npm run build)                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DONNÉES SOURCE                                  │
│                                                                              │
│  ┌────────────────────────┐    ┌────────────────────────┐                   │
│  │   cities-idf.ts        │    │  services-definition.ts │                   │
│  │                        │    │                         │                   │
│  │  • 300+ villes IDF     │    │  • 3 métiers           │                   │
│  │  • Slugs               │    │  • 21 services         │                   │
│  │  • Codes postaux       │    │  • Prix                │                   │
│  │  • Départements        │    │  • Keywords            │                   │
│  │  • Coordonnées GPS     │    │  • Meta descriptions   │                   │
│  └────────────────────────┘    └────────────────────────┘                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         GÉNÉRATEURS SEO                                      │
│                                                                              │
│  ┌────────────────────────┐    ┌────────────────────────┐                   │
│  │   city-content.ts      │    │  schema-generator.ts    │                   │
│  │                        │    │                         │                   │
│  │  • Titres localisés    │    │  • LocalBusiness        │                   │
│  │  • Meta descriptions   │    │  • FAQPage              │                   │
│  │  • FAQ dynamiques      │    │  • BreadcrumbList       │                   │
│  │  • Highlights          │    │  • Service              │                   │
│  │  • Introductions       │    │                         │                   │
│  └────────────────────────┘    └────────────────────────┘                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     generateStaticParams() + generateMetadata()              │
│                                                                              │
│  Pour chaque combinaison ville × métier × service :                          │
│  1. Génération des paramètres statiques                                      │
│  2. Génération des métadonnées SEO                                           │
│  3. Génération du contenu JSON-LD                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            7869 PAGES HTML                                   │
│                                                                              │
│  Chaque page contient :                                                      │
│  • <title> et <meta description> optimisés                                   │
│  • Schema.org JSON-LD                                                        │
│  • Canonical URL                                                             │
│  • Open Graph tags                                                           │
│  • Contenu localisé                                                          │
│  • Maillage interne (NearbyAreas)                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Flux de Tracking

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CHARGEMENT PAGE                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  1. CONSENT MODE V2 DEFAULTS (script inline dans <head>)                     │
│                                                                              │
│     gtag('consent', 'default', {                                             │
│       ad_storage: 'denied',                                                  │
│       ad_user_data: 'denied',                                                │
│       ad_personalization: 'denied',                                          │
│       analytics_storage: 'denied',                                           │
│       wait_for_update: 500                                                   │
│     });                                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  2. COOKIEBOT CMP                                                            │
│                                                                              │
│     • Affiche la bannière de consentement                                    │
│     • Mode: auto-blocking                                                    │
│     • Sur choix utilisateur → gtag('consent', 'update', {...})               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  3. GOOGLE TAG MANAGER (GTM-NFKDT6QC)                                        │
│                                                                              │
│     Contient les tags :                                                      │
│     • Google Tag (GT-5MCRKCLP) - Configuration                               │
│     • GA4 (G-77JMV6XZ63) - Analytics                                         │
│     • Google Ads (AW-17805011663) - Conversions                              │
│     • Conversion Linker - Cross-domain                                       │
│                                                                              │
│     Respecte les signaux de consentement Cookiebot                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  4. ÉVÉNEMENTS PERSONNALISÉS                                                 │
│                                                                              │
│     TelClickTracker.tsx :                                                    │
│     • Écoute les clics sur liens tel:                                        │
│     • Envoie conversion Google Ads                                           │
│     • Event: 'conversion' avec send_to                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Structure des Composants

```
components/
│
├── Layout
│   ├── Navigation.tsx        # Menu principal avec dropdowns
│   ├── Footer.tsx            # Pied de page avec liens
│   ├── LayoutWrapper.tsx     # Wrapper avec Navigation + Footer
│   └── StickyCallButton.tsx  # CTA mobile fixe en bas
│
├── Sections (pages principales)
│   ├── Hero.tsx              # Hero homepage avec illustration
│   ├── PlomberieHero.tsx     # Hero spécifique plomberie
│   ├── SerrurerieHero.tsx    # Hero spécifique serrurerie
│   ├── ElectriciteHero.tsx   # Hero spécifique électricité
│   ├── HowItWorks.tsx        # Section "Comment ça marche"
│   ├── ServicesExplorer.tsx  # Explorateur de services
│   ├── Advantages.tsx        # Avantages Joël
│   ├── ServiceFAQ.tsx        # FAQ avec accordéon
│   ├── ServiceGuarantees.tsx # Garanties
│   ├── ServiceProcess.tsx    # Process d'intervention
│   ├── ServiceZones.tsx      # Zones d'intervention
│   └── FinalCTA.tsx          # CTA final de page
│
├── SEO (pages ville/service)
│   ├── CityHero.tsx          # Hero localisé
│   ├── CityFAQ.tsx           # FAQ localisée
│   ├── CityServices.tsx      # Services par ville
│   ├── LocalSchema.tsx       # JSON-LD Schema.org
│   ├── NearbyAreas.tsx       # Maillage interne
│   └── PopularCities.tsx     # Villes populaires
│
├── UI
│   ├── Button.tsx            # Boutons stylisés
│   └── Title.tsx             # Titres avec style
│
└── Tracking
    ├── TelClickTracker.tsx   # Tracker clics téléphone
    ├── GoogleTag.tsx         # (désactivé - GTM utilisé)
    └── ClientSchema.tsx      # Schema côté client
```

---

## Stratégie de Rendu

### Server Components (par défaut)

La majorité du site utilise des **Server Components** pour :
- Meilleur SEO (HTML complet au premier rendu)
- Performances optimales (pas de JS côté client)
- `generateMetadata` fonctionnel

```typescript
// app/serrurerie/page.tsx - Server Component
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serrurier d'urgence...",
  // ✅ Fonctionne car Server Component
};

export default function Page() {
  return <Content />;
}
```

### Client Components (quand nécessaire)

Utilisés uniquement pour :
- Interactivité (animations, hover states)
- Scripts côté client (Schema.org dynamique)
- Hooks React (useState, useEffect)

```typescript
// components/ClientSchema.tsx
"use client";

import Script from "next/script";

export default function ClientSchema({ schema }) {
  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## Configuration

### Tailwind CSS

```typescript
// tailwind.config.ts
{
  colors: {
    "joel-violet": "#7055A7",
    "joel-mauve": "#9E76EC",
    "joel-yellow": "#F5D547",
  },
  fontFamily: {
    sans: ["Poppins", ...],
    display: ["Chillax", ...],
  }
}
```

### Next.js

```javascript
// next.config.mjs
{
  // Configuration standard
  // Pas de redirects/rewrites spéciaux
}
```

---

## Dépendances Clés

| Package | Usage |
|---------|-------|
| `next` | Framework |
| `react` / `react-dom` | UI |
| `tailwindcss` | Styling |
| `framer-motion` | Animations |
| `lucide-react` | Icônes |
| `@supabase/supabase-js` | Database (admin) |
| `clsx` | Utility classes |

---

## Points d'Extension

### Ajouter une ville

1. Éditer `lib/data/cities-idf.ts`
2. Ajouter l'objet `City` dans le bon département
3. Rebuild → nouvelle page générée automatiquement

### Ajouter un service

1. Éditer `lib/data/services-definition.ts`
2. Ajouter l'objet `Service` dans le bon métier
3. Créer la page `/[metier]/[service]/page.tsx` si besoin
4. Rebuild

### Ajouter un métier

1. Créer le dossier `app/[nouveau-metier]/`
2. Ajouter dans `services-definition.ts`
3. Créer les composants Hero et ServicesGrid
4. Mettre à jour `Navigation.tsx` et `Footer.tsx`
