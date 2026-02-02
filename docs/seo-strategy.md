# Stratégie SEO - monjoel.fr

## Objectif

Capturer le trafic local de recherche d'urgence en dépannage (plomberie, serrurerie, électricité) sur l'ensemble de l'Île-de-France à travers une stratégie de **SEO local massif**.

---

## Architecture des URLs

### Structure hiérarchique

```
monjoel.fr/
│
├── /plomberie                    # Hub métier plomberie
├── /serrurerie                   # Hub métier serrurerie
├── /electricite                  # Hub métier électricité
│
├── /plombier/[ville]             # Page ville plomberie
│   └── /plombier/[ville]/[service]   # Page service spécifique
│
├── /serrurier/[ville]            # Page ville serrurerie
│   └── /serrurier/[ville]/[service]  # Page service spécifique
│
├── /electricien/[ville]          # Page ville électricité
│   └── /electricien/[ville]/[service] # Page service spécifique
│
└── /stop-arnaques                # Page éditoriale
```

### Exemples d'URLs

| Type | Exemple | Intention de recherche |
|------|---------|------------------------|
| Hub | `/serrurerie` | "serrurier urgence", "serrurerie" |
| Ville | `/serrurier/boulogne-billancourt` | "serrurier boulogne-billancourt" |
| Service | `/serrurier/paris-15/ouverture-sans-percage` | "ouverture porte claquée paris 15" |

---

## Génération des Pages (SSG)

### Calcul du nombre de pages

```
Villes IDF           : ~300
Métiers              : 3 (plombier, serrurier, électricien)
Services plomberie   : 5
Services serrurerie  : 10
Services électricité : 6
─────────────────────────────────────────────
Pages ville × métier : 300 × 3 = 900
Pages ville × service: 300 × (5+10+6) = 6300
Pages fixes          : ~15
─────────────────────────────────────────────
TOTAL                : ~7215 pages (arrondi 7869 avec variantes)
```

### Implémentation Next.js

```typescript
// app/serrurier/[ville]/page.tsx

export async function generateStaticParams() {
  return citiesIDF.map((city) => ({
    ville: city.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.ville);
  const trade = getTradeBySlug("serrurier");
  const content = generateCityPageContent(trade, city);

  return {
    title: content.title,
    description: content.metaDescription,
    alternates: { canonical: content.canonical },
    openGraph: { ... },
  };
}
```

---

## Données Sources

### Fichier `cities-idf.ts`

```typescript
export interface City {
  slug: string;           // "boulogne-billancourt"
  name: string;           // "Boulogne-Billancourt"
  postalCodes: string[];  // ["92100"]
  department: string;     // "92"
  departmentName: string; // "Hauts-de-Seine"
  population?: number;    // 120071
  coordinates?: { lat: number; lng: number };
}
```

**Couverture** : 8 départements (75, 77, 78, 91, 92, 93, 94, 95)

### Fichier `services-definition.ts`

```typescript
export interface Service {
  slug: string;         // "fuite-eau"
  name: string;         // "Fuite d'eau"
  shortName: string;    // "Fuite"
  description: string;  // Description détaillée
  priceFrom: number;    // 89
  urgencyLevel: "high" | "medium" | "low";
  keywords: string[];   // ["fuite eau", "fuite robinet", ...]
  metaDescription: string; // Template avec {city}
}
```

---

## Générateur de Contenu SEO

### Fichier `city-content.ts`

Le générateur produit du contenu unique par combinaison ville × métier :

```typescript
export function generateCityPageContent(trade: Trade, city: City): CityPageContent {
  return {
    title: `${trade.name} à ${city.name} | Urgence 24h/24 | Joël`,
    metaDescription: `${trade.name} d'urgence à ${city.name} (${city.department})...`,
    canonical: `https://monjoel.fr/${trade.slug}/${city.slug}`,
    introduction: `Besoin d'un ${trade.name.toLowerCase()} à ${city.name}...`,
    highlights: [...],
    faq: generateLocalizedFAQ(trade, city),
  };
}
```

### Templates de contenu

**Titre** : `{Métier} à {Ville} | Urgence 24h/24 | Joël`

**Meta description** : `{Métier} d'urgence à {Ville} ({Département}). Intervention en 30 min, prix fixe dès {prix}€. Artisans certifiés. Appelez le 01 41 69 10 08.`

**Introduction** : Texte de 2-3 phrases contextualisant le service dans la ville.

---

## Schema.org JSON-LD

### LocalBusiness

Présent sur chaque page ville/service :

```json
{
  "@context": "https://schema.org",
  "@type": "Locksmith",
  "name": "Joël - Serrurier d'urgence Paris & Île-de-France",
  "telephone": "+33141691008",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Boulogne-Billancourt",
    "addressRegion": "Hauts-de-Seine",
    "postalCode": "92100",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "48.8396",
    "longitude": "2.2399"
  },
  "areaServed": {
    "@type": "City",
    "name": "Boulogne-Billancourt"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", ...],
    "opens": "00:00",
    "closes": "23:59"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "2847"
  }
}
```

### FAQPage

Questions fréquentes localisées :

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le prix d'un serrurier à Boulogne-Billancourt ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le prix moyen d'une intervention de serrurerie à Boulogne-Billancourt..."
      }
    }
  ]
}
```

### BreadcrumbList

Fil d'Ariane pour navigation :

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://monjoel.fr" },
    { "@type": "ListItem", "position": 2, "name": "Serrurerie", "item": "https://monjoel.fr/serrurerie" },
    { "@type": "ListItem", "position": 3, "name": "Boulogne-Billancourt", "item": "https://monjoel.fr/serrurier/boulogne-billancourt" }
  ]
}
```

---

## Maillage Interne

### Composant `NearbyAreas.tsx`

Chaque page ville affiche les villes voisines du même département :

```
┌────────────────────────────────────────────────────────┐
│  Serrurier dans les villes proches                     │
├────────────────────────────────────────────────────────┤
│  Serrurier Issy-les-Moulineaux                         │
│  Serrurier Sèvres                                      │
│  Serrurier Meudon                                      │
│  Serrurier Saint-Cloud                                 │
│  Voir toutes les villes →                              │
└────────────────────────────────────────────────────────┘
```

### Liens croisés

- Chaque page ville → autres villes du département
- Chaque page service → page ville parente
- Footer → hubs métier et villes principales

---

## Sitemap Dynamique

### Fichier `app/sitemap.ts`

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://monjoel.fr";
  const urls: MetadataRoute.Sitemap = [];

  // Pages statiques
  urls.push({ url: baseUrl, lastModified: new Date(), priority: 1.0 });

  // Pages hub métier
  trades.forEach((trade) => {
    urls.push({ url: `${baseUrl}/${trade.hubSlug}`, priority: 0.9 });
  });

  // Pages ville × métier × service
  citiesIDF.forEach((city) => {
    trades.forEach((trade) => {
      urls.push({ url: `${baseUrl}/${trade.slug}/${city.slug}`, priority: 0.8 });
      
      trade.services.forEach((service) => {
        urls.push({
          url: `${baseUrl}/${trade.slug}/${city.slug}/${service.slug}`,
          priority: 0.7
        });
      });
    });
  });

  return urls;
}
```

### Soumission

- URL : `https://monjoel.fr/sitemap.xml`
- Soumis à Google Search Console
- Mis à jour automatiquement au build

---

## Meta Tags

### Obligatoires sur chaque page

```html
<title>Serrurier à Boulogne-Billancourt | Urgence 24h/24 | Joël</title>
<meta name="description" content="Serrurier d'urgence à Boulogne-Billancourt (92)..." />
<link rel="canonical" href="https://monjoel.fr/serrurier/boulogne-billancourt" />
```

### Open Graph

```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="https://monjoel.fr/serrurier/boulogne-billancourt" />
<meta property="og:image" content="https://monjoel.fr/og-default.jpg" />
<meta property="og:locale" content="fr_FR" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Joël" />
```

### Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://monjoel.fr/og-default.jpg" />
```

---

## Robots.txt

### Fichier `app/robots.ts`

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: "https://monjoel.fr/sitemap.xml",
  };
}
```

---

## Optimisations Techniques

### Performance

| Métrique | Objectif | Impact SEO |
|----------|----------|------------|
| LCP | < 2.5s | Core Web Vitals |
| FID | < 100ms | Core Web Vitals |
| CLS | < 0.1 | Core Web Vitals |

### Mobile-First

- Design responsive
- Bouton d'appel sticky sur mobile
- Touch targets > 48px

### HTTPS

- SSL/TLS via Cloudflare
- Redirections HTTP → HTTPS automatiques

---

## Monitoring

### Google Search Console

- Soumission sitemap
- Surveillance indexation
- Détection erreurs 404
- Analyse requêtes de recherche

### Ahrefs

- Script analytics intégré
- Suivi backlinks
- Analyse concurrence

### GA4

- Trafic organique
- Pages les plus visitées
- Comportement utilisateur

---

## Checklist SEO par Page

- [ ] Title unique avec mots-clés (< 60 caractères)
- [ ] Meta description unique (150-160 caractères)
- [ ] Canonical URL
- [ ] Open Graph tags
- [ ] Schema.org LocalBusiness
- [ ] Schema.org FAQPage (si FAQ présente)
- [ ] H1 unique avec localisation
- [ ] Téléphone visible et cliquable
- [ ] Liens vers pages connexes (maillage)
- [ ] Images avec alt text

---

## Évolutions Prévues

### Court terme

- [ ] Images OG par métier (plomberie.jpg, serrurerie.jpg, electricite.jpg)
- [ ] Landing pages départements (serrurier-92, plombier-75)
- [ ] Blog avec articles conseils urgence

### Moyen terme

- [ ] Google Business Profile multi-zones
- [ ] FAQ enrichies avec plus de questions
- [ ] Témoignages clients par ville

### Long terme

- [ ] Autres régions (Lyon, Marseille, Lille)
- [ ] Marketplace artisans
- [ ] Application mobile
