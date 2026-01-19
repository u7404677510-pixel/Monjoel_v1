# Référence des Composants - monjoel.fr

## Vue d'ensemble

Le projet utilise une architecture de composants organisée en catégories fonctionnelles :

```
components/
├── sections/       # Sections de page (Hero, FAQ, etc.)
├── seo/            # Composants SEO pour pages dynamiques
├── ui/             # Composants UI réutilisables
└── [racine]        # Composants globaux (Navigation, Footer, etc.)
```

---

## Composants de Layout

### `Navigation.tsx`

Menu principal avec navigation par métier.

```tsx
import Navigation from "@/components/Navigation";

<Navigation />
```

**Caractéristiques** :
- Menu déroulant par métier (Plomberie, Serrurerie, Électricité)
- Logo cliquable vers homepage
- Bouton d'appel CTA
- Responsive (hamburger menu sur mobile)

---

### `Footer.tsx`

Pied de page avec liens de navigation et informations légales.

```tsx
import Footer from "@/components/Footer";

<Footer />
```

**Sections** :
- Logo et description
- Liens services par métier
- Liens légaux (Mentions légales, CGU, Confidentialité)
- Contact (téléphone, email)
- Copyright

---

### `LayoutWrapper.tsx`

Wrapper qui englobe Navigation + children + Footer.

```tsx
import LayoutWrapper from "@/components/LayoutWrapper";

<LayoutWrapper>
  <PageContent />
</LayoutWrapper>
```

**Usage** : Utilisé dans `app/layout.tsx` pour toutes les pages.

---

### `StickyCallButton.tsx`

Bouton d'appel fixe en bas de l'écran sur mobile.

```tsx
import StickyCallButton from "@/components/StickyCallButton";

<StickyCallButton />
```

**Caractéristiques** :
- Visible uniquement sur mobile (< 768px)
- Position fixed en bas
- Gradient Joël
- Lien `tel:+33172682202`

---

## Sections de Page

### `Hero.tsx`

Section hero de la homepage.

```tsx
import Hero from "@/components/sections/Hero";

<Hero />
```

**Contenu** :
- Titre H1 principal
- Sous-titre avec USPs
- Étoiles Google Avis (4.9/5)
- Bouton CTA d'appel
- Illustration

---

### `PlomberieHero.tsx` / `SerrurerieHero.tsx` / `ElectriciteHero.tsx`

Hero sections spécifiques par métier.

```tsx
import PlomberieHero from "@/components/sections/PlomberieHero";

<PlomberieHero
  title="Plombier d'urgence à prix fixe"
  subtitle="Plomberie"
  description="Intervention en 30 min • Prix Fixes & Transparents"
/>
```

**Props** :
| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Titre H1 |
| `subtitle` | `string` | Label métier |
| `description` | `string` | USPs |

**Caractéristiques** :
- Image de fond spécifique au métier
- Téléphone statique visible (SEO Google Ads)
- Badges marques partenaires
- Schema.org intégré

---

### `HowItWorks.tsx`

Section "Comment ça marche" en 3 étapes.

```tsx
import HowItWorks from "@/components/sections/HowItWorks";

<HowItWorks />
```

**Étapes** :
1. Décrivez votre problème
2. Recevez un prix fixe
3. Un artisan intervient

---

### `ServicesExplorer.tsx`

Explorateur de services par métier.

```tsx
import ServicesExplorer from "@/components/sections/ServicesExplorer";

<ServicesExplorer />
```

**Caractéristiques** :
- Tabs par métier
- Grille de services
- Liens vers pages détaillées

---

### `Advantages.tsx`

Section avantages Joël.

```tsx
import Advantages from "@/components/sections/Advantages";

<Advantages />
```

**Avantages affichés** :
- Prix fixe garanti
- Artisans vérifiés
- Intervention rapide
- Sans arnaque

---

### `ServiceFAQ.tsx`

FAQ avec accordéon.

```tsx
import ServiceFAQ from "@/components/sections/ServiceFAQ";

<ServiceFAQ 
  faqs={[
    { question: "...", answer: "..." },
  ]} 
  serviceName="Serrurerie" 
/>
```

**Props** :
| Prop | Type | Description |
|------|------|-------------|
| `faqs` | `FAQItem[]` | Liste des questions/réponses |
| `serviceName` | `string` | Nom du service pour le titre |

---

### `ServiceGuarantees.tsx`

Section garanties du service.

```tsx
import ServiceGuarantees from "@/components/sections/ServiceGuarantees";

<ServiceGuarantees />
```

---

### `ServiceProcess.tsx`

Processus d'intervention détaillé.

```tsx
import ServiceProcess from "@/components/sections/ServiceProcess";

<ServiceProcess />
```

---

### `ServiceZones.tsx`

Zones d'intervention (Île-de-France).

```tsx
import ServiceZones from "@/components/sections/ServiceZones";

<ServiceZones />
```

**Caractéristiques** :
- Liste des 8 départements IDF
- Mention "1200+ villes"
- Lien vers villes populaires

---

### `FinalCTA.tsx`

Call-to-action final de page.

```tsx
import FinalCTA from "@/components/sections/FinalCTA";

<FinalCTA />
```

**Contenu** :
- Titre incitatif
- Bouton d'appel proéminent
- Rappel des garanties

---

### Sections Stop Arnaques

Composants spécifiques à la page `/stop-arnaques` :

- `StopArnaquesHero.tsx` - Hero de la page
- `StopArnaquesStats.tsx` - Statistiques sur les arnaques
- `StopArnaquesPractices.tsx` - Pratiques frauduleuses
- `StopArnaquesSolution.tsx` - Solution Joël
- `StopArnaquesPreview.tsx` - Preview pour homepage
- `ScamQuiz.tsx` - Quiz interactif
- `ScamTestimonials.tsx` - Témoignages

---

## Composants SEO

### `CityHero.tsx`

Hero localisé pour pages ville.

```tsx
import { CityHero } from "@/components/seo";

<CityHero 
  trade={trade} 
  city={city} 
  content={content} 
/>
```

**Props** :
| Prop | Type | Description |
|------|------|-------------|
| `trade` | `Trade` | Métier (plombier, serrurier, électricien) |
| `city` | `City` | Ville avec slug, nom, département |
| `content` | `CityPageContent` | Contenu généré |

---

### `CityFAQ.tsx`

FAQ localisée pour pages ville.

```tsx
import { CityFAQ } from "@/components/seo";

<CityFAQ 
  faqItems={content.faq} 
  cityName={city.name} 
  tradeName={trade.name}
/>
```

---

### `CityServices.tsx`

Grille des services disponibles dans la ville.

```tsx
import { CityServices } from "@/components/seo";

<CityServices trade={trade} city={city} />
```

---

### `LocalSchema.tsx`

Composant pour injecter Schema.org JSON-LD.

```tsx
import { LocalSchema } from "@/components/seo";

<LocalSchema 
  trade={trade} 
  city={city} 
  faqItems={content.faq} 
/>
```

**Schemas générés** :
- LocalBusiness
- FAQPage
- BreadcrumbList

---

### `NearbyAreas.tsx`

Liens vers villes voisines (maillage interne).

```tsx
import { NearbyAreas } from "@/components/seo";

<NearbyAreas trade={trade} city={city} />
```

**Caractéristiques** :
- Affiche 5-8 villes du même département
- Liens vers pages `/[metier]/[ville]`
- Améliore le PageRank interne

---

### `PopularCities.tsx`

Liste des villes populaires par métier.

```tsx
import { PopularCities } from "@/components/seo";

<PopularCities trade={trade} />
```

---

### Export centralisé

```tsx
// components/seo/index.ts
export { default as CityHero } from "./CityHero";
export { default as CityFAQ } from "./CityFAQ";
export { default as CityServices } from "./CityServices";
export { default as LocalSchema } from "./LocalSchema";
export { default as NearbyAreas } from "./NearbyAreas";
export { default as PopularCities } from "./PopularCities";
```

---

## Composants UI

### `Button.tsx`

Bouton stylisé réutilisable.

```tsx
import Button from "@/components/ui/Button";

<Button variant="primary" size="lg">
  Appeler maintenant
</Button>
```

**Props** :
| Prop | Type | Valeurs |
|------|------|---------|
| `variant` | `string` | `primary`, `secondary`, `outline` |
| `size` | `string` | `sm`, `md`, `lg` |
| `href` | `string` | URL optionnelle (rend un `<a>`) |

---

### `Title.tsx`

Titre stylisé avec underline décoratif.

```tsx
import Title from "@/components/ui/Title";

<Title level={2}>
  Nos services
</Title>
```

**Props** :
| Prop | Type | Description |
|------|------|-------------|
| `level` | `1-6` | Niveau de heading HTML |
| `children` | `ReactNode` | Contenu du titre |

---

## Composants de Tracking

### `TelClickTracker.tsx`

Tracker de clics sur liens téléphone.

```tsx
import TelClickTracker from "@/components/TelClickTracker";

<TelClickTracker />
```

**Fonctionnement** :
- S'attache à tous les liens `tel:`
- Envoie conversion Google Ads au clic
- Utilise `gtag('event', 'conversion', { send_to: '...' })`

---

### `GoogleTag.tsx`

Composant gtag.js (désactivé car GTM utilisé).

```tsx
// Désactivé - tout passe par GTM
import GoogleTag from "@/components/GoogleTag";

<GoogleTag />
```

**Note** : Ce composant retourne `null`. Le tracking est géré par GTM.

---

### `ClientSchema.tsx`

Composant client pour Schema.org JSON-LD.

```tsx
import ClientSchema from "@/components/ClientSchema";

<ClientSchema 
  schema={localBusinessSchema} 
  id="local-business-schema" 
/>
```

**Props** :
| Prop | Type | Description |
|------|------|-------------|
| `schema` | `object` | Objet JSON-LD à injecter |
| `id` | `string` | ID unique du script (optionnel) |

**Usage** : Permet aux pages serveur d'inclure du Schema.org via un composant client.

---

## Autres Composants

### `Logo.tsx`

Logo Joël en SVG ou image.

```tsx
import Logo from "@/components/Logo";

<Logo variant="white" />
```

**Props** :
| Prop | Type | Valeurs |
|------|------|---------|
| `variant` | `string` | `default`, `white` |

---

### `PhoneButton.tsx`

Bouton d'appel avec icône téléphone.

```tsx
import PhoneButton from "@/components/PhoneButton";

<PhoneButton />
```

---

### `CTAButtons.tsx`

Groupe de boutons CTA (Appeler + Devis).

```tsx
import CTAButtons from "@/components/CTAButtons";

<CTAButtons />
```

---

### `AnimatedBackground.tsx`

Fond animé avec formes flottantes.

```tsx
import AnimatedBackground from "@/components/AnimatedBackground";

<AnimatedBackground />
```

**Utilisation** : Décoratif, utilisé dans certaines sections.

---

## Patterns d'Utilisation

### Page Hub Métier

```tsx
// app/serrurerie/page.tsx
import { Metadata } from "next";
import SerrurerieHero from "@/components/sections/SerrurerieHero";
import SerrurerieServicesGrid from "@/components/sections/SerrurerieServicesGrid";
import ServiceProcess from "@/components/sections/ServiceProcess";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import ClientSchema from "@/components/ClientSchema";

export const metadata: Metadata = { ... };

export default function Page() {
  return (
    <>
      <ClientSchema schema={localBusinessSchema} />
      <SerrurerieHero ... />
      <SerrurerieServicesGrid />
      <ServiceProcess />
      <ServiceFAQ faqs={...} serviceName="Serrurerie" />
      <FinalCTA />
    </>
  );
}
```

### Page Ville Dynamique

```tsx
// app/serrurier/[ville]/page.tsx
import { CityHero, CityFAQ, CityServices, LocalSchema, NearbyAreas } from "@/components/seo";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Page({ params }) {
  const city = getCityBySlug(params.ville);
  const trade = getTradeBySlug("serrurier");
  const content = generateCityPageContent(trade, city);

  return (
    <>
      <LocalSchema trade={trade} city={city} faqItems={content.faq} />
      <CityHero trade={trade} city={city} content={content} />
      <CityServices trade={trade} city={city} />
      <CityFAQ faqItems={content.faq} cityName={city.name} tradeName={trade.name} />
      <NearbyAreas trade={trade} city={city} />
      <FinalCTA />
    </>
  );
}
```

---

## Conventions de Style

### Classes Tailwind communes

```tsx
// Conteneur centré
<div className="max-w-7xl mx-auto px-6">

// Section avec padding
<section className="py-16 md:py-24">

// Gradient Joël
<div className="bg-gradient-joel">

// Couleurs de texte
<h1 className="text-joel-violet">
<span className="text-joel-mauve">

// Typographie
<h1 className="font-display text-4xl font-bold">
<p className="font-sans text-base text-gray-600">
```

### Animations (Framer Motion)

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Contenu animé
</motion.div>
```
