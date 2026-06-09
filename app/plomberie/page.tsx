import { Metadata } from "next";
import ClientSchema from "@/components/ClientSchema";
import MetierLandingPage from "@/components/landing/MetierLandingPage";
import { tradeConfigs } from "@/lib/ab-test/config";
import { generateHubSchema } from "@/lib/seo/schema-generator";
import { getTradeBySlug } from "@/lib/data/services-definition";

export const metadata: Metadata = {
  title: "Plombier d'urgence Paris & Île-de-France | Dès 69€",
  description: "Plombier d'urgence Paris & IDF. Fuite, WC, chauffe-eau. Intervention 30 min, à partir de 69€. Sans majoration. 01 41 69 10 08",
  keywords: [
    "plombier urgence Paris",
    "plombier Île-de-France",
    "fuite d'eau",
    "WC bouchés",
    "chauffe-eau panne",
    "plombier pas cher",
    "plombier 24h/24",
    "dépannage plomberie",
    "dégât des eaux",
    "plombier prix fixe",
    "plombier sans arnaque"
  ],
  alternates: {
    canonical: "https://monjoel.fr/plomberie",
    languages: {
      "fr-FR": "https://monjoel.fr/plomberie",
      "x-default": "https://monjoel.fr/plomberie",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/plomberie",
    siteName: "Joël",
    title: "Plombier d'urgence Paris | Dès 69€ | Intervention 30 min",
    description: "Plombier d'urgence à partir de 69€. Intervention en 30 min, zéro arnaque. Appelez le 01 41 69 10 08.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Joël - Plombier d'urgence Paris & Île-de-France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plombier d'urgence Paris | Dès 69€ | Intervention 30 min",
    description: "Plombier d'urgence à partir de 69€. Intervention en 30 min. Appelez le 01 41 69 10 08.",
    images: ["/og-default.jpg"],
  },
};

// FAQ enrichie pour la page hub (utilisée par generateHubSchema → FAQPage Rich Snippets)
const hubFaqItems = [
  {
    question: "Combien coûte un plombier d'urgence à Paris ?",
    answer:
      "Nos tarifs plomberie démarrent à 69€ TTC pour une intervention simple (remplacement de robinet, chasse d'eau, lavabo bouché). Le prix exact est annoncé au téléphone avant que l'artisan parte. Ce prix est fixe : ni majoration, ni frais de déplacement cachés.",
  },
  {
    question: "Intervenez-vous la nuit, le week-end et les jours fériés ?",
    answer:
      "Oui, 24h/24 et 7j/7, y compris les week-ends et jours fériés. Le tarif est identique à n'importe quelle heure. Pas de majoration de nuit, pas de supplément week-end.",
  },
  {
    question: "En combien de temps arrive votre plombier ?",
    answer:
      "Nos plombiers interviennent en 30 minutes en moyenne sur Paris et l'Île-de-France. Dès que vous appelez, nous identifions l'artisan le plus proche de chez vous.",
  },
  {
    question:
      "Fournissez-vous une attestation pour l'assurance en cas de dégât des eaux ?",
    answer:
      "Oui, systématiquement. Après chaque intervention, nous fournissons une facture détaillée et une attestation d'intervention acceptée par toutes les compagnies d'assurance (AXA, Allianz, MAIF, Groupama…).",
  },
  {
    question: "Que faire en attendant le plombier en cas de fuite d'eau ?",
    answer:
      "Coupez immédiatement l'arrivée d'eau générale, généralement située près du compteur d'eau. Épongez l'eau stagnante pour limiter les dégâts. Si des installations électriques sont touchées, coupez également le disjoncteur.",
  },
];

export default function PlomberiePage() {
  // Schemas enrichis : LocalBusiness Plumber (areaServed IDF complète, knowsAbout, image[],
  // Reviews, payments enrichis, OrderAction + ReserveAction) + BreadcrumbList + FAQPage
  const trade = getTradeBySlug("plombier")!;
  const [localBusinessSchema, breadcrumbSchema, faqSchema] = generateHubSchema(
    "plombier",
    "plomberie",
    trade,
    hubFaqItems
  );

  return (
    <>
      {/* Schema.org pour Google Ads + Rich Snippets */}
      <ClientSchema schema={localBusinessSchema} id="local-business-schema" />
      <ClientSchema schema={breadcrumbSchema} id="breadcrumb-schema" />
      {/* FAQ Schema — Rich Snippets Google */}
      <ClientSchema schema={faqSchema} id="faq-schema" />

      {/* Landing métier UNIQUE refondue — A/B/C abandonnés (mai 2026).
          Cf. components/landing/MetierLandingPage.tsx — DA Purple SOTA,
          QuickQuoteWidget interactif, Live ticker, sticky mobile bar. */}
      <MetierLandingPage config={tradeConfigs.plomberie} />
    </>
  );
}
