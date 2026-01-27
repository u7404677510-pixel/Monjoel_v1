"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { Trade } from "@/lib/data/services-definition";
import type { Department } from "@/lib/data/departments-idf";

interface DepartmentFAQProps {
  trade: Trade;
  department: Department;
  tradeName: string;
}

function generateFAQs(trade: Trade, department: Department, tradeName: string) {
  const tradeNameLower = tradeName.toLowerCase();
  
  return [
    {
      question: `Quel est le prix d'un ${tradeNameLower} en ${department.name} ?`,
      answer: `Le prix d'une intervention de ${trade.name.toLowerCase()} en ${department.name} (${department.code}) dépend du type de prestation. Chez Joël, nos tarifs commencent à partir de ${trade.services[0]?.priceFrom || 89}€. Le prix est fixe et annoncé avant l'intervention, sans surprise.`,
    },
    {
      question: `Un ${tradeNameLower} peut-il intervenir en urgence dans le ${department.code} ?`,
      answer: `Oui, nos ${tradeNameLower}s interviennent 24h/24 et 7j/7 dans les ${department.cityCount} communes du ${department.name}. Le délai moyen d'intervention est de 30 minutes. Appelez le 01 72 68 22 02 pour une urgence.`,
    },
    {
      question: `Quelles villes sont couvertes par votre service de ${trade.name.toLowerCase()} en ${department.name} ?`,
      answer: `Nous intervenons dans toutes les communes du ${department.name} (${department.code}), notamment ${department.mainCities.slice(0, 5).join(", ")} et ${department.cityCount - 5} autres villes. Nos artisans sont répartis sur tout le département pour garantir une intervention rapide.`,
    },
    {
      question: `Comment obtenir un devis de ${trade.name.toLowerCase()} en ${department.name} ?`,
      answer: `Pour obtenir un devis gratuit, appelez le 01 72 68 22 02 ou remplissez notre formulaire en ligne. Vous recevrez un prix fixe en moins de 2 minutes. Aucun engagement, aucun frais de déplacement caché.`,
    },
    {
      question: `Vos ${tradeNameLower}s sont-ils qualifiés et assurés ?`,
      answer: `Tous nos artisans ${tradeNameLower}s en ${department.name} sont vérifiés, qualifiés et assurés. Ils disposent des certifications requises et sont notés en moyenne 4.9/5 par nos clients. Chaque intervention est garantie.`,
    },
    {
      question: `Quels sont les modes de paiement acceptés ?`,
      answer: `Nous acceptons le paiement par carte bancaire, espèces ou chèque. Le paiement s'effectue uniquement après l'intervention, une fois que vous êtes satisfait du travail réalisé.`,
    },
  ];
}

export default function DepartmentFAQ({ trade, department, tradeName }: DepartmentFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = generateFAQs(trade, department, tradeName);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-joel-violet/10 text-joel-violet px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle size={16} />
            <span>Questions fréquentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            FAQ {tradeName} {department.name}
          </h2>
          <p className="text-lg text-gray-600">
            Tout ce que vous devez savoir sur nos services en {department.name}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-joel-violet flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Schema.org FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
