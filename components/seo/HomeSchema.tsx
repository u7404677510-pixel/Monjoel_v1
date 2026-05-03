/**
 * HomeSchema - Server Component
 *
 * Rend un graphe JSON-LD unique (`@graph`) pour la homepage MonJoel.
 * Contient 4 entités : Organization, WebSite, EmergencyService (LocalBusiness)
 * et FAQPage. Les references croisées sont faites via `@id` (pattern Schema.org
 * recommandé par Google Rich Results).
 *
 * Pas de "use client" : Server Component pur — le JSON-LD est rendu côté serveur,
 * directement crawlable par Google sans hydratation JS.
 */

const BASE_URL = "https://monjoel.fr";
const ORG_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const LOCAL_BUSINESS_ID = `${BASE_URL}/#localbusiness`;

export default function HomeSchema() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      // ============================================
      // 1. ORGANIZATION
      // ============================================
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Joël",
        legalName: "Joël",
        alternateName: "MonJoel",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.webp`,
          width: 512,
          height: 512,
        },
        image: [
          `${BASE_URL}/logo.webp`,
          `${BASE_URL}/og-default.jpg`,
        ],
        description:
          "Service de dépannage urgence à prix fixe en plomberie, serrurerie et électricité, à Paris et en Île-de-France. Intervention 24h/24, devis instantané, artisans certifiés.",
        slogan: "Prix fixe, zéro arnaque",
        foundingDate: "2024",
        knowsAbout: [
          "Plomberie urgence",
          "Serrurerie urgence",
          "Électricité urgence",
          "Dépannage 24h/24",
          "Recherche de fuite",
          "Ouverture de porte",
          "Tableau électrique",
          "Île-de-France",
          "Devis prix fixe",
        ],
        knowsLanguage: "fr-FR",
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 50,
          maxValue: 200,
        },
        telephone: "+33141691008",
        email: "contact@monjoel.fr",
        address: {
          "@type": "PostalAddress",
          streetAddress: "45 Rue Boursault",
          addressLocality: "Paris",
          postalCode: "75017",
          addressRegion: "Île-de-France",
          addressCountry: "FR",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Île-de-France",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+33141691008",
            contactType: "customer service",
            areaServed: "FR",
            availableLanguage: ["French"],
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          },
          {
            "@type": "ContactPoint",
            telephone: "+33141691008",
            contactType: "emergency",
            areaServed: "FR",
            availableLanguage: ["French"],
          },
        ],
        // TODO: Mehdi à fournir les URLs réelles des profils sociaux
        sameAs: [
          "https://www.google.com/maps/place/Mon+Jo%C3%ABl",
          // "https://www.facebook.com/monjoel",
          // "https://www.instagram.com/monjoel",
        ],
      },

      // ============================================
      // 2. WEBSITE
      // ============================================
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: BASE_URL,
        name: "Joël",
        description:
          "Dépannage urgence prix fixe Paris & Île-de-France. Plombier, serrurier, électricien 24h/24.",
        inLanguage: "fr-FR",
        publisher: { "@id": ORG_ID },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/recherche?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },

      // ============================================
      // 3. LOCAL BUSINESS — EmergencyService (hérite LocalBusiness)
      // ============================================
      {
        "@type": "EmergencyService",
        "@id": LOCAL_BUSINESS_ID,
        name: "Joël",
        alternateName: "MonJoel",
        description:
          "Dépannage urgence 24h/24 en plomberie, serrurerie et électricité. Prix fixe annoncé avant intervention, artisans certifiés, intervention en 30 minutes sur Paris et 1ʳᵉ couronne.",
        url: BASE_URL,
        image: [
          `${BASE_URL}/logo.webp`,
          `${BASE_URL}/og-default.jpg`,
        ],
        logo: `${BASE_URL}/logo.webp`,
        telephone: "+33141691008",
        email: "contact@monjoel.fr",
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Cash, Credit Card, Debit Card, Apple Pay, Google Pay",
        foundingDate: "2024",
        knowsAbout: [
          "Plomberie urgence 24h/24",
          "Serrurerie urgence 24h/24",
          "Électricité urgence 24h/24",
          "Recherche de fuite",
          "Débouchage canalisation",
          "Ouverture de porte claquée",
          "Changement cylindre",
          "Tableau électrique",
          "Mise aux normes NF C 15-100",
          "Île-de-France",
        ],
        keywords: [
          "dépannage urgence Paris",
          "plombier 24h/24",
          "serrurier 24h/24",
          "électricien 24h/24",
          "prix fixe",
          "Île-de-France",
        ],
        parentOrganization: { "@id": ORG_ID },
        address: {
          "@type": "PostalAddress",
          streetAddress: "45 Rue Boursault",
          addressLocality: "Paris",
          postalCode: "75017",
          addressRegion: "Île-de-France",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 48.8898,
          longitude: 2.3175,
        },
        hasMap:
          "https://www.google.com/maps/place/45+Rue+Boursault,+75017+Paris",
        areaServed: [
          { "@type": "AdministrativeArea", name: "Île-de-France" },
          { "@type": "AdministrativeArea", name: "Paris (75)" },
          { "@type": "AdministrativeArea", name: "Seine-et-Marne (77)" },
          { "@type": "AdministrativeArea", name: "Yvelines (78)" },
          { "@type": "AdministrativeArea", name: "Essonne (91)" },
          { "@type": "AdministrativeArea", name: "Hauts-de-Seine (92)" },
          { "@type": "AdministrativeArea", name: "Seine-Saint-Denis (93)" },
          { "@type": "AdministrativeArea", name: "Val-de-Marne (94)" },
          { "@type": "AdministrativeArea", name: "Val-d'Oise (95)" },
        ],
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 48.8566,
            longitude: 2.3522,
          },
          geoRadius: "50000",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
            validFrom: "2024-01-01",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "947",
          bestRating: "5",
          worstRating: "1",
        },
        review: [
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Marie L." },
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            reviewBody:
              "Intervention sous 25 min, prix annoncé tenu, artisan pro et propre. Je recommande.",
            datePublished: "2025-09-15",
          },
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Thomas R." },
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            reviewBody:
              "Appel un dimanche soir, technicien sur place dans l'heure. Aucune majoration. Top service.",
            datePublished: "2025-08-22",
          },
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Sophie M." },
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            reviewBody:
              "Devis transparent en 30 secondes, intervention le jour même. Vraiment zéro arnaque.",
            datePublished: "2025-07-08",
          },
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Karim B." },
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            reviewBody:
              "Serrurier arrivé en 18 minutes, ouverture sans perçage, prix exactement annoncé. Bluffant.",
            datePublished: "2025-06-12",
          },
        ],
        slogan: "Prix fixe, zéro arnaque",
        potentialAction: [
          {
            "@type": "OrderAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "tel:+33141691008",
              actionPlatform: [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
              ],
            },
            deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
          },
          {
            "@type": "ReserveAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${BASE_URL}/devis`,
              actionPlatform: [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
              ],
            },
          },
        ],
      },

      // ============================================
      // 4. FAQ PAGE
      // ============================================
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Combien coûte une intervention de plomberie d'urgence à Paris ?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Joël annonce un prix fixe avant intervention. Pas de surprise. Le tarif dépend du service (débouchage, fuite, etc.) et est communiqué après diagnostic gratuit.",
            },
          },
          {
            "@type": "Question",
            name: "En combien de temps un artisan arrive chez moi ?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Sur Paris et la première couronne, intervention sous 30 minutes. Sur la grande couronne IDF, sous 60 minutes.",
            },
          },
          {
            "@type": "Question",
            name: "Vos artisans sont-ils certifiés ?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Oui. Tous nos plombiers, serruriers et électriciens sont vérifiés (assurance pro, qualifications) avant d'intégrer notre réseau.",
            },
          },
          {
            "@type": "Question",
            name: "Êtes-vous disponibles la nuit et le week-end ?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Oui, 24h/24 et 7j/7, y compris jours fériés. Appelez le 01 41 69 10 08.",
            },
          },
          {
            "@type": "Question",
            name: "Puis-je avoir un devis avant de m'engager ?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Oui. Devis gratuit en 30 secondes via notre IA, ou par téléphone.",
            },
          },
          {
            "@type": "Question",
            name: "Couvrez-vous toute l'Île-de-France ?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Oui : 75, 77, 78, 91, 92, 93, 94, 95 — plus de 300 villes desservies.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
