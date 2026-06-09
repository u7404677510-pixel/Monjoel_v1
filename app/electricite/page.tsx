import { Metadata } from "next";
import ClientSchema from "@/components/ClientSchema";
import MetierLandingPage from "@/components/landing/MetierLandingPage";
import { tradeConfigs } from "@/lib/ab-test/config";
import { generateHubSchema } from "@/lib/seo/schema-generator";
import { getTradeBySlug } from "@/lib/data/services-definition";

export const metadata: Metadata = {
  title: "Électricien d'urgence Paris & Île-de-France | Dès 59€",
  description: "Électricien d'urgence Paris & IDF. Panne, disjoncteur, tableau. Intervention 30 min, à partir de 59€. 01 41 69 10 08",
  keywords: [
    "électricien urgence Paris",
    "électricien Île-de-France",
    "panne électrique",
    "disjoncteur saute",
    "tableau électrique",
    "électricien pas cher",
    "électricien 24h/24",
    "dépannage électricité",
    "court-circuit",
    "électricien prix fixe",
    "électricien sans arnaque"
  ],
  alternates: {
    canonical: "https://monjoel.fr/electricite",
    languages: {
      "fr-FR": "https://monjoel.fr/electricite",
      "x-default": "https://monjoel.fr/electricite",
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
    url: "https://monjoel.fr/electricite",
    siteName: "Joël",
    title: "Électricien d'urgence Paris | Dès 59€ | Intervention 30 min",
    description: "Électricien d'urgence à partir de 59€. Intervention en 30 min, zéro arnaque. Appelez le 01 41 69 10 08.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Joël - Électricien d'urgence Paris & Île-de-France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Électricien d'urgence Paris | Dès 59€ | Intervention 30 min",
    description: "Électricien d'urgence à partir de 59€. Intervention en 30 min. Appelez le 01 41 69 10 08.",
    images: ["/og-default.jpg"],
  },
};

// FAQ enrichie pour la page hub (utilisée par generateHubSchema → FAQPage Rich Snippets)
const hubFaqItems = [
  {
    question: "Combien coûte un électricien d'urgence à Paris ?",
    answer:
      "Nos tarifs démarrent à 59€ TTC pour une intervention simple (remplacement prise/interrupteur). La remise en service d'une panne électrique est à 89€. Le prix est annoncé avant l'intervention, fixe et non modifiable sur place.",
  },
  {
    question: "Vos électriciens sont-ils certifiés et habilités ?",
    answer:
      "Oui. Tous nos électriciens disposent des habilitations électriques obligatoires (BR, B1V, B2V). Leur identité et qualifications sont vérifiées avant intégration au réseau Joël. Nous travaillons avec des marques certifiées : Legrand, Schneider, Hager.",
  },
  {
    question: "Intervenez-vous en urgence électrique la nuit ?",
    answer:
      "Oui, 24h/24 et 7j/7. Nos électriciens interviennent en 30 minutes, même de nuit, au même tarif qu'en journée. Pas de majoration, pas de supplément week-end ou jour férié.",
  },
  {
    question: "Est-ce dangereux d'attendre en cas de panne électrique ?",
    answer:
      "Une simple coupure liée au disjoncteur n'est pas dangereuse si vous ne touchez pas aux installations. En revanche, une odeur de brûlé, des étincelles ou de la fumée sont des signes de danger immédiat : coupez le disjoncteur principal et appelez-nous immédiatement.",
  },
  {
    question: "Fournissez-vous une attestation de conformité électrique ?",
    answer:
      "Oui, après chaque remplacement de tableau électrique ou mise aux normes NF C 15-100. Ce document est obligatoire lors de la vente de votre bien et peut être demandé par votre assurance. Il est remis le jour de l'intervention.",
  },
];

export default function ElectricitePage() {
  // Schemas enrichis : LocalBusiness Electrician (areaServed IDF complète, knowsAbout,
  // image[], Reviews, payments enrichis, OrderAction + ReserveAction) + Breadcrumb + FAQ
  const trade = getTradeBySlug("electricien")!;
  const [localBusinessSchema, breadcrumbSchema, faqSchema] = generateHubSchema(
    "electricien",
    "electricite",
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

      {/* Landing métier UNIQUE refondue (mai 2026) — voir components/landing/MetierLandingPage.tsx */}
      <MetierLandingPage config={tradeConfigs.electricite} />
    </>
  );
}
