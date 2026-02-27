"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type TradeType = "serrurerie" | "plomberie" | "electricite";

interface FAQ {
  question: string;
  answer: string;
}

const faqsByTrade: Record<TradeType, FAQ[]> = {
  plomberie: [
    {
      question: "Combien coûte un plombier d'urgence à Paris ?",
      answer: "Nos tarifs plomberie démarrent à 79€ TTC pour une intervention simple (débouchage WC). Le prix exact est annoncé au téléphone avant que l'artisan parte. Ce prix est fixe : ni majoration, ni frais de déplacement cachés. Vous ne payez que ce qui a été dit.",
    },
    {
      question: "Intervenez-vous la nuit, le week-end et les jours fériés ?",
      answer: "Oui, 24h/24 et 7j/7, y compris les week-ends et jours fériés. Le tarif est identique à n'importe quelle heure. Nous ne facturons jamais l'urgence différemment : pas de majoration de nuit, pas de supplément week-end.",
    },
    {
      question: "En combien de temps arrive votre plombier ?",
      answer: "Nos plombiers interviennent en 20 minutes en moyenne sur Paris et l'Île-de-France. Ce délai est tenu dans la très grande majorité des cas. Dès que vous appelez, nous identifions l'artisan le plus proche de chez vous.",
    },
    {
      question: "Fournissez-vous une attestation pour l'assurance en cas de dégât des eaux ?",
      answer: "Oui, systématiquement. Après chaque intervention, nous fournissons une facture détaillée et une attestation d'intervention acceptée par toutes les compagnies d'assurance (AXA, Allianz, MAIF, Groupama…). Ce document précise la cause et la nature des travaux effectués.",
    },
    {
      question: "Que faire en attendant le plombier en cas de fuite d'eau ?",
      answer: "Coupez immédiatement l'arrivée d'eau générale, généralement située près du compteur d'eau (dans l'entrée ou la cave). Épongez l'eau stagnante pour limiter les dégâts. Si des installations électriques sont touchées, coupez également le disjoncteur correspondant. N'attendez pas : appelez-nous dès que possible.",
    },
  ],
  serrurerie: [
    {
      question: "Quelle est la différence entre une porte claquée et une porte fermée à clé ?",
      answer: "Une porte claquée signifie que le pêne demi-tour s'est enclenché en claquant, mais la serrure n'est pas verrouillée à clé. Dans ce cas, l'ouverture par technique radio (sans perçage) est possible. Une porte fermée à clé signifie qu'un ou plusieurs tours de clé ont été donnés : l'ouverture est plus complexe et nécessite d'autres techniques. Dans les deux cas, notre serrurier vous explique les options avant d'intervenir.",
    },
    {
      question: "Combien coûte l'ouverture d'une porte ?",
      answer: "L'ouverture d'une porte claquée sans perçage est à 89€ TTC, prix fixe, annoncé au téléphone avant intervention. Si un perçage est nécessaire (porte fermée à clé, serrure haute sécurité), le tarif est différent et vous est communiqué avant tout travail. Vous décidez, vous ne subissez pas.",
    },
    {
      question: "Intervenez-vous la nuit et en urgence ?",
      answer: "Oui, 24h/24 et 7j/7. Porte claquée à 2h du matin ? Nos serruriers sont disponibles. Le tarif est identique à n'importe quelle heure : pas de majoration, pas de frais supplémentaires la nuit ou le week-end.",
    },
    {
      question: "Percez-vous toujours la porte ?",
      answer: "Non. Nous essayons systématiquement les techniques non destructives en priorité : crochetage, ouverture radio. Le perçage n'est utilisé qu'en dernier recours, uniquement si aucune autre méthode n'est possible, et toujours après vous avoir informé et obtenu votre accord.",
    },
    {
      question: "Combien de temps dure une intervention de serrurerie ?",
      answer: "L'ouverture d'une porte claquée par technique radio prend généralement 5 à 20 minutes selon la complexité de la serrure. Le changement d'un cylindre dure 15 à 30 minutes, fourniture incluse. Dans tous les cas, notre serrurier ne repart pas avant que votre porte soit sécurisée.",
    },
  ],
  electricite: [
    {
      question: "Combien coûte un électricien d'urgence à Paris ?",
      answer: "Nos tarifs démarrent à 59€ TTC pour une intervention simple (remplacement prise/interrupteur). Le diagnostic et la remise en service d'une panne électrique sont à 79€. Le prix est annoncé avant l'intervention, il est fixe et ne peut pas être modifié sur place.",
    },
    {
      question: "Vos électriciens sont-ils certifiés ?",
      answer: "Oui. Tous nos électriciens disposent des habilitations électriques obligatoires (BR, B1V, B2V) délivrées après formation certifiée. Leur identité et leurs qualifications sont vérifiées avant leur intégration au réseau Joël. Nous travaillons avec des marques certifiées : Legrand, Schneider, Hager.",
    },
    {
      question: "Intervenez-vous en urgence électrique la nuit ?",
      answer: "Oui, 24h/24 et 7j/7. Une panne électrique ne peut pas attendre, surtout si elle touche le chauffage, le congélateur ou des équipements médicaux. Nos électriciens interviennent en 20 minutes, même de nuit, au même tarif qu'en journée.",
    },
    {
      question: "Est-ce dangereux d'attendre en cas de panne électrique ?",
      answer: "Ça dépend de la situation. Une simple coupure de courant liée au disjoncteur n'est pas dangereuse si vous ne touchez pas aux installations. En revanche, une odeur de brûlé, des étincelles ou de la fumée sont des signes de danger immédiat : coupez le disjoncteur principal et appelez-nous immédiatement. Ne rallumez pas une installation qui a provoqué un arc électrique.",
    },
    {
      question: "Fournissez-vous une attestation de conformité ?",
      answer: "Oui, après chaque remplacement de tableau électrique ou mise aux normes, nous fournissons une attestation de conformité aux normes NF C 15-100. Ce document est obligatoire lors de la vente de votre bien et peut être demandé par votre assurance. Il est remis le jour de l'intervention.",
    },
  ],
};

const tradeTitle: Record<TradeType, string> = {
  plomberie: "Questions fréquentes — Plomberie",
  serrurerie: "Questions fréquentes — Serrurerie",
  electricite: "Questions fréquentes — Électricité",
};

interface HubFAQProps {
  trade: TradeType;
}

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-bold text-gray-900 text-sm sm:text-base pr-2">
          {faq.question}
        </span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white">
          <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function HubFAQ({ trade }: HubFAQProps) {
  const faqs = faqsByTrade[trade];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-joel rounded-xl flex items-center justify-center flex-shrink-0">
            <HelpCircle size={20} className="text-white" />
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900">
            {tradeTitle[trade]}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
