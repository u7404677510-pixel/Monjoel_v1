import { Metadata } from "next";
import { Suspense } from "react";
import ClientSchema from "@/components/ClientSchema";
import TradeVarianteB from "@/components/ab/TradeVarianteB";
import LoadingSkeleton from "@/components/ab/LoadingSkeleton";
import { tradeConfigs } from "@/lib/ab-test/config";
import { generateHubSchema } from "@/lib/seo/schema-generator";
import { getTradeBySlug } from "@/lib/data/services-definition";

export const metadata: Metadata = {
  title: "Serrurier d'urgence Paris & Île-de-France | Dès 89€",
  description: "Serrurier d'urgence Paris & IDF ⭐ 4.9/5 (947 avis). Intervention 20 min, à partir de 89€. Sans majoration 24h/24. 01 41 69 10 08",
  keywords: [
    "serrurier urgence Paris",
    "serrurier Île-de-France",
    "ouverture de porte",
    "changement serrure",
    "serrurier pas cher",
    "serrurier 24h/24",
    "dépannage serrurerie",
    "porte claquée",
    "serrure bloquée",
    "serrurier prix fixe",
    "serrurier sans arnaque"
  ],
  alternates: {
    canonical: "https://monjoel.fr/serrurerie",
    languages: {
      "fr-FR": "https://monjoel.fr/serrurerie",
      "x-default": "https://monjoel.fr/serrurerie",
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
    url: "https://monjoel.fr/serrurerie",
    siteName: "Joël",
    title: "Serrurier d'urgence Paris | Dès 89€ | Intervention 20 min",
    description: "Serrurier d'urgence à partir de 89€. Intervention en 20 min, zéro arnaque. Appelez le 01 41 69 10 08.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Joël - Serrurier d'urgence Paris & Île-de-France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serrurier d'urgence Paris | Dès 89€ | Intervention 20 min",
    description: "Serrurier d'urgence à partir de 89€. Intervention en 20 min. Appelez le 01 41 69 10 08.",
    images: ["/og-default.jpg"],
  },
};

// FAQ enrichie pour la page hub (utilisée par generateHubSchema → FAQPage Rich Snippets)
const hubFaqItems = [
  {
    question:
      "Quelle est la différence entre une porte claquée et une porte fermée à clé ?",
    answer:
      "Une porte claquée signifie que le pêne demi-tour s'est enclenché mais la serrure n'est pas verrouillée à clé — l'ouverture sans perçage est possible. Une porte fermée à clé signifie qu'un ou plusieurs tours de clé ont été donnés — d'autres techniques sont nécessaires. Notre serrurier vous explique les options avant d'intervenir.",
  },
  {
    question: "Combien coûte l'ouverture d'une porte à Paris ?",
    answer:
      "L'ouverture d'une porte claquée sans perçage est à 89€ TTC, prix fixe, annoncé au téléphone avant intervention. Si un perçage est nécessaire, le tarif différent vous est communiqué avant tout travail. Vous décidez.",
  },
  {
    question: "Votre serrurier intervient-il la nuit et en urgence ?",
    answer:
      "Oui, 24h/24 et 7j/7. Porte claquée à 2h du matin ? Nos serruriers sont disponibles. Le tarif est identique à n'importe quelle heure : pas de majoration de nuit, pas de frais supplémentaires le week-end.",
  },
  {
    question: "Percez-vous toujours la porte lors d'une ouverture d'urgence ?",
    answer:
      "Non. Nous essayons systématiquement les techniques non destructives en priorité : crochetage, ouverture radio. Le perçage n'est utilisé qu'en dernier recours, uniquement si aucune autre méthode n'est possible, et toujours après vous avoir informé et obtenu votre accord.",
  },
  {
    question: "Combien de temps dure une intervention de serrurerie ?",
    answer:
      "L'ouverture d'une porte claquée par technique radio prend généralement 5 à 20 minutes. Le changement d'un cylindre dure 15 à 30 minutes, fourniture incluse. Notre serrurier ne repart pas avant que votre porte soit sécurisée.",
  },
];

export default function SerrureriePage() {
  // Schemas enrichis : LocalBusiness Locksmith (areaServed IDF complète, knowsAbout,
  // image[], Reviews, payments enrichis, OrderAction + ReserveAction) + Breadcrumb + FAQ
  const trade = getTradeBySlug("serrurier")!;
  const [localBusinessSchema, breadcrumbSchema, faqSchema] = generateHubSchema(
    "serrurier",
    "serrurerie",
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

      {/* A/B Test - Variantes A, B, C */}
      <Suspense fallback={<LoadingSkeleton />}>
        <TradeVarianteB config={tradeConfigs.serrurerie} variant="B" />
      </Suspense>
    </>
  );
}
