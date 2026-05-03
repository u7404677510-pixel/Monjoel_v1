# Joël - Dépannage d'Urgence Paris & Île-de-France

Site web de mise en relation pour services de dépannage d'urgence : **plomberie**, **serrurerie** et **électricité**.

🌐 **Production** : [https://monjoel.fr](https://monjoel.fr)

---

## 🎯 Présentation

Joël est une plateforme de dépannage à prix fixe couvrant Paris et toute l'Île-de-France. Le site génère **7869 pages statiques** optimisées SEO pour capturer le trafic local.

### Proposition de valeur

- ✅ **Prix fixe** annoncé avant intervention
- ✅ **Intervention rapide** en 30 minutes
- ✅ **Artisans vérifiés** et certifiés
- ✅ **Zéro arnaque** - transparence totale

### Couverture

- **3 métiers** : Plomberie, Serrurerie, Électricité
- **8 départements** : 75, 77, 78, 91, 92, 93, 94, 95
- **300+ villes** d'Île-de-France
- **21 services** différents

---

## 🛠 Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| [Next.js](https://nextjs.org/) | 14.x | Framework React avec App Router |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Typage statique |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.x | Styling utilitaire |
| [Framer Motion](https://www.framer.com/motion/) | 11.x | Animations |
| [Supabase](https://supabase.com/) | 2.x | Base de données (admin) |
| [Lucide React](https://lucide.dev/) | 0.4.x | Icônes |

### Tracking & Analytics

- **Google Tag Manager** (GTM-NFKDT6QC)
- **Google Analytics 4** (G-77JMV6XZ63)
- **Google Ads** (AW-17805011663)
- **Cookiebot** - Consent Management Platform
- **Ahrefs** - SEO Analytics

---

## 🚀 Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Démarrage

```bash
# Cloner le repo
git clone git@github.com:u7404677510-pixel/Monjoel_v1.git
cd monjoel

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Vérification ESLint
```

---

## 📁 Structure du Projet

```
monjoel/
├── app/                          # Pages (App Router)
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Layout racine + tracking
│   ├── globals.css               # Styles globaux
│   ├── sitemap.ts                # Sitemap XML dynamique
│   ├── robots.ts                 # robots.txt
│   │
│   ├── plomberie/                # Hub plomberie
│   ├── serrurerie/               # Hub serrurerie
│   ├── electricite/              # Hub électricité
│   │
│   ├── plombier/[ville]/         # Pages ville plomberie
│   ├── serrurier/[ville]/        # Pages ville serrurerie
│   ├── electricien/[ville]/      # Pages ville électricité
│   │
│   ├── stop-arnaques/            # Page anti-arnaques
│   ├── a-propos/                 # À propos
│   ├── contact/                  # Contact
│   ├── mentions-legales/         # Mentions légales
│   ├── cgu/                      # CGU
│   ├── confidentialite/          # Politique de confidentialité
│   └── admin/                    # Panel admin (protégé)
│
├── components/
│   ├── sections/                 # Sections de page
│   │   ├── Hero.tsx              # Hero homepage
│   │   ├── PlomberieHero.tsx     # Hero plomberie
│   │   ├── SerrurerieHero.tsx    # Hero serrurerie
│   │   ├── ElectriciteHero.tsx   # Hero électricité
│   │   ├── HowItWorks.tsx        # Comment ça marche
│   │   ├── Advantages.tsx        # Avantages
│   │   ├── ServiceFAQ.tsx        # FAQ
│   │   └── ...
│   │
│   ├── seo/                      # Composants SEO
│   │   ├── CityHero.tsx          # Hero localisé
│   │   ├── CityFAQ.tsx           # FAQ localisée
│   │   ├── LocalSchema.tsx       # Schema.org JSON-LD
│   │   ├── NearbyAreas.tsx       # Maillage interne
│   │   └── ...
│   │
│   ├── ui/                       # Composants UI
│   │   ├── Button.tsx
│   │   └── Title.tsx
│   │
│   ├── Navigation.tsx            # Menu principal
│   ├── Footer.tsx                # Pied de page
│   ├── StickyCallButton.tsx      # CTA mobile sticky
│   └── ClientSchema.tsx          # Schema client-side
│
├── lib/
│   ├── data/
│   │   ├── cities-idf.ts         # Base de 300+ villes IDF
│   │   └── services-definition.ts # Définition des 21 services
│   │
│   ├── seo/
│   │   ├── city-content.ts       # Générateur de contenu SEO
│   │   └── schema-generator.ts   # Générateur Schema.org
│   │
│   ├── hooks/
│   │   ├── useSiteConfig.ts      # Config site (Supabase)
│   │   └── useAnalyticsConfig.ts # Config analytics
│   │
│   └── supabase.ts               # Client Supabase
│
├── public/                       # Assets statiques
│   ├── logo.png
│   ├── hero-*.jpg                # Images hero sections
│   └── og-default.jpg            # Image Open Graph
│
├── docs/                         # Documentation
│   ├── tracking-setup.md         # Config tracking
│   ├── architecture.md           # Architecture technique
│   ├── seo-strategy.md           # Stratégie SEO
│   ├── components.md             # Référence composants
│   └── growth-hacking-plan.md    # Plan growth hacking
│
├── .cursorrules                  # Règles de codage pour l'IA
├── tailwind.config.ts            # Config Tailwind
├── next.config.mjs               # Config Next.js
└── package.json
```

---

## 🔧 Variables d'Environnement

Créer un fichier `.env.local` à la racine :

```bash
# Supabase (optionnel - pour admin)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# Tracking (valeurs par défaut incluses dans le code)
NEXT_PUBLIC_GTM_ID=GTM-NFKDT6QC
NEXT_PUBLIC_COOKIEBOT_ID=c1addd46-5bcb-4d18-835f-4db63cde7755
```

### Variables sur Vercel

Les mêmes variables doivent être configurées dans **Vercel → Settings → Environment Variables**.

---

## 🌍 Déploiement

Le projet est déployé automatiquement sur **Vercel** à chaque push sur `main`.

### Build de production

```bash
npm run build
```

Le build génère **7869 pages statiques** (SSG) pour un temps de chargement optimal.

### Domaine

- **Production** : monjoel.fr
- **Preview** : *.vercel.app (branches)

---

## 📊 SEO

### Pages générées

| Type | Nombre | URL Pattern |
|------|--------|-------------|
| Hub métier | 3 | `/plomberie`, `/serrurerie`, `/electricite` |
| Ville × Métier | ~900 | `/plombier/paris-15`, `/serrurier/boulogne-billancourt` |
| Ville × Service | ~6300 | `/plombier/paris-15/fuite-eau` |
| Pages fixes | ~15 | `/stop-arnaques`, `/contact`, etc. |
| **Total** | **~7869** | |

### Schema.org

Chaque page inclut des données structurées :
- `LocalBusiness` (avec téléphone, adresse, horaires)
- `FAQPage` (questions fréquentes)
- `BreadcrumbList` (fil d'Ariane)
- `Service` (pour pages service)

### Sitemap

Le sitemap est généré dynamiquement : [monjoel.fr/sitemap.xml](https://monjoel.fr/sitemap.xml)

---

## 📞 Contact

- **Téléphone** : 01 41 69 10 08
- **Email** : contact@monjoel.fr
- **Adresse** : 45 Rue Boursault, 75017 Paris

---

## 📚 Documentation

- [Architecture technique](docs/architecture.md)
- [Stratégie SEO](docs/seo-strategy.md)
- [Référence composants](docs/components.md)
- [Configuration tracking](docs/tracking-setup.md)
- [Plan growth hacking](docs/growth-hacking-plan.md)

---

## 📄 Licence

Projet privé - Tous droits réservés © 2024 Joël SAS
