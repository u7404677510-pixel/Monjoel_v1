import { Metadata } from "next";
import ElectriciteHero from "@/components/sections/ElectriciteHero";
import ElectriciteServiceCards from "@/components/sections/ElectriciteServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TransparenceSection from "@/components/sections/TransparenceSection";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import ServicePricingHighlight from "@/components/sections/ServicePricingHighlight";
import ServiceTrustSection from "@/components/sections/ServiceTrustSection";

export const metadata: Metadata = {
  title: "Mise aux Normes Électrique Paris - NF C 15-100 | Électricien Joël",
  description: "Mise aux normes électrique NF C 15-100 à Paris & IDF. Électricien agréé, prix fixe dès 29€ annoncé avant intervention. Devis gratuit, 24h/24. 01 41 69 10 08",
  alternates: {
    canonical: "https://monjoel.fr/electricien/mise-aux-normes",
  },
};

const doList = [
  "Audit complet de l'installation",
  "Mise en conformité NF C 15-100",
  "Remplacement uniquement si nécessaire",
  "Prix fixe annoncé avant travaux",
];

const dontList = [
  "Pousser à des travaux inutiles",
  "Installer du matériel non conforme",
  "Facturer des options non demandées",
  "Laisser une installation dangereuse",
];

const benefitsList = [
  "Installation aux normes actuelles",
  "Attestation de conformité fournie",
  "Un prix clair, payé une seule fois",
  "Artisan certifié et assuré",
];

const faqs = [
  {
    question: "Quand faut-il faire une mise aux normes ?",
    answer: "Une mise aux normes est obligatoire lors d'une vente de bien, d'une rénovation importante, ou si votre installation a plus de 30 ans. Elle est aussi recommandée si vous avez des fusibles à broches ou pas de différentiel 30mA.",
  },
  {
    question: "Combien coûte une mise aux normes électrique ?",
    answer: "Le prix dépend de l'état de votre installation et des travaux nécessaires. L'audit initial est à partir de 29€. Vous recevez un devis détaillé AVANT toute intervention.",
  },
  {
    question: "Qu'est-ce que la norme NF C 15-100 ?",
    answer: "La NF C 15-100 est la norme française qui définit les règles d'installation électrique dans les logements résidentiels. Elle fixe les exigences en matière de sécurité, de protection et de conformité.",
  },
  {
    question: "Combien de temps durent les travaux ?",
    answer: "Une mise aux normes partielle peut prendre une demi-journée. Pour une rénovation complète, prévoir 1 à 3 jours selon la taille du logement.",
  },
  {
    question: "Fournissez-vous une attestation de conformité ?",
    answer: "Oui, nous fournissons une attestation de conformité après chaque mise aux normes. Ce document est exigé lors de la vente de votre bien.",
  },
  {
    question: "La mise aux normes est-elle remboursée ?",
    answer: "Selon les travaux, vous pouvez bénéficier de credits d'impôt ou d'aides (MaPrimeRénov', CEE). Notre électricien vous informe des dispositifs applicables.",
  },
];

export default function MiseAuxNormesPage() {
  return (
    <>
      <ElectriciteHero
        title="Mise aux normes électrique NF C 15-100"
        subtitle="Électricité"
        description="Installation électrique vieillissante ? Nos électriciens agréés réalisent votre mise aux normes à Paris & IDF avec devis clair avant intervention. Attestation de conformité fournie."
        servicePrice="dès 29€"
      />
      <ServicePricingHighlight
        serviceName="Mise aux normes électrique"
        price="dès 29€"
        priceFrom
        trade="electricite"
        features={[
          "Audit de l'installation inclus",
          "Devis détaillé avant travaux",
          "Attestation NF C 15-100 fournie",
          "Électricien agréé certifié",
        ]}
      />
      <ElectriciteServiceCards
        doList={doList}
        dontList={dontList}
        benefitsList={benefitsList}
      />
      <ServiceProcess />
      <ServiceTrustSection trade="electricite" />
      <TransparenceSection
        description="Remettre votre installation aux normes, c'est sécuriser votre logement et préparer une éventuelle vente. Chez Joël, nous n'effectuons que les travaux strictement nécessaires."
        points={["Diagnostic honnête", "Attestation conformité", "Prix fixe avant travaux"]}
      />
      <ServiceFAQ faqs={faqs} serviceName="Mise aux normes électrique" />
      <FinalCTA />
    </>
  );
}
