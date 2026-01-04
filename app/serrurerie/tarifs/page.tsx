"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  DoorOpen, 
  DoorClosed, 
  LockKeyhole, 
  Drill, 
  KeyRound, 
  Wrench, 
  Cylinder, 
  Replace, 
  ShieldAlert, 
  Shield,
  Check,
  AlertCircle,
  Euro
} from "lucide-react";
import Link from "next/link";
import { yellowPunctuation } from "@/components/ui/Title";
import CTAButtons from "@/components/CTAButtons";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

const tarifs = [
  {
    href: "/serrurier/ouverture-sans-percage",
    icon: DoorOpen,
    title: "Porte claquée",
    subtitle: "Ouverture sans perçage",
    price: "119€",
    description: "Porte claquée non verrouillée. Technique radio, serrure intacte.",
  },
  {
    href: "/serrurier/porte-fermee-a-cle",
    icon: DoorClosed,
    title: "Porte fermée à clé",
    subtitle: "Clés à l'intérieur",
    price: "139€",
    description: "Porte verrouillée. Technique adaptée à ta serrure.",
  },
  {
    href: "/serrurier/serrure-bloquee",
    icon: LockKeyhole,
    title: "Serrure bloquée",
    subtitle: "Déblocage",
    price: "99€",
    description: "Serrure coincée ou grippée. Diagnostic + déblocage.",
  },
  {
    href: "/serrurier/ouverture-avec-percage",
    icon: Drill,
    title: "Ouverture avec perçage",
    subtitle: "Porte blindée",
    price: "149€",
    description: "Perçage si nécessaire. Cylindre neuf inclus.",
  },
  {
    href: "/serrurier/perte-cles",
    icon: KeyRound,
    title: "Perte de clés",
    subtitle: "Urgence",
    price: "119€",
    description: "Ouverture + option changement cylindre.",
  },
  {
    href: "/serrurier/cle-cassee-serrure",
    icon: Wrench,
    title: "Clé cassée",
    subtitle: "Extraction",
    price: "99€",
    description: "Extraction sans dégât. Serrure préservée.",
  },
  {
    href: "/serrurier/changement-cylindre",
    icon: Cylinder,
    title: "Changement cylindre",
    subtitle: "Barillet",
    price: "119€",
    description: "Cylindre standard ou haute sécurité A2P.",
  },
  {
    href: "/serrurier/changement-serrure",
    icon: Replace,
    title: "Changement serrure",
    subtitle: "Complet",
    price: "149€",
    description: "Serrure simple ou multipoints.",
  },
  {
    href: "/serrurier/apres-effraction",
    icon: ShieldAlert,
    title: "Après effraction",
    subtitle: "Urgence",
    price: "149€",
    description: "Sécurisation + facture assurance.",
  },
  {
    href: "/serrurier/blindage-porte",
    icon: Shield,
    title: "Blindage porte",
    subtitle: "Renforcement",
    price: "590€",
    description: "Sur devis. Diagnostic gratuit.",
  },
];

const inclus = [
  "Déplacement inclus",
  "Main d'œuvre incluse",
  "Diagnostic sur place",
  "Explication avant intervention",
  "Facture détaillée",
  "Garantie sur la pose",
];

const variables = [
  "Type de serrure (simple / multipoints)",
  "Porte blindée ou standard",
  "Niveau de sécurité du cylindre (A2P)",
  "Remplacement de pièces (annoncé avant)",
  "Complexité de l'intervention",
];

const faqs = [
  {
    question: "Le prix annoncé est-il vraiment le prix final ?",
    answer: "Oui. Le prix qu'on t'annonce avant l'intervention est le prix que tu paies. Pas de majoration, pas de frais cachés. Si la situation est plus complexe que prévu, on te prévient avant de continuer.",
  },
  {
    question: "Y a-t-il des frais de nuit ou week-end ?",
    answer: "Non. Nos tarifs sont les mêmes 24h/24, 7j/7. Pas de majoration de nuit, pas de supplément week-end ou jour férié.",
  },
  {
    question: "Le déplacement est-il inclus ?",
    answer: "Oui, le déplacement est inclus dans tous nos tarifs pour toute l'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95).",
  },
  {
    question: "Puis-je avoir un devis avant intervention ?",
    answer: "Oui, et c'est obligatoire chez nous. On te donne le prix exact avant de commencer. Tu valides, puis on intervient.",
  },
  {
    question: "Comment payer ?",
    answer: "Carte bancaire, espèces ou virement. On te fournit une facture détaillée pour ton assurance si besoin.",
  },
  {
    question: "Pourquoi les prix varient-ils ?",
    answer: "Le prix dépend du type de serrure, du niveau de sécurité souhaité et de la complexité. Une porte blindée demande plus de temps qu'une porte standard, par exemple.",
  },
];

export default function TarifsSerrurerie() {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const tableRef = useRef(null);
  const inclusRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });
  const tableInView = useInView(tableRef, { once: true, margin: "-100px" });
  const inclusInView = useInView(inclusRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gradient-joel">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-white/90 text-sm font-medium mb-4">
              Serrurerie
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {yellowPunctuation("Tarifs serrurerie : transparence avant intervention")}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Prix annoncé avant intervention. Pas de surprise, pas de frais cachés.
            </p>
            <CTAButtons variant="hero" />
          </motion.div>
        </div>
      </section>

      {/* Tarifs Cards */}
      <section ref={cardsRef} className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Nos <span className="gradient-text">tarifs</span> par intervention
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              {yellowPunctuation("Prix indicatifs. Le tarif exact est confirmé avant intervention selon ta situation.")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tarifs.map((tarif, index) => (
              <motion.div
                key={tarif.href}
                initial={{ opacity: 0, y: 30 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={tarif.href}
                  className="block h-full p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 hover:border-joel-violet/30 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-joel flex items-center justify-center">
                      <tarif.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{tarif.title}</h3>
                      <span className="text-xs text-gray-500">{tarif.subtitle}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{tarif.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-joel-violet">
                      à partir de {tarif.price}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tableau récapitulatif */}
      <section ref={tableRef} className="py-12 sm:py-16 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              Tableau <span className="gradient-text">récapitulatif</span>
            </h2>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-joel text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Intervention</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">À partir de</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {tarifs.map((tarif, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <tarif.icon size={18} className="text-joel-violet flex-shrink-0" />
                            <span className="text-sm text-gray-900">{tarif.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="font-bold text-joel-violet">{tarif.price}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ce qui est inclus / Ce qui peut varier */}
      <section ref={inclusRef} className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Inclus */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inclusInView ? { opacity: 1, x: 0 } : {}}
              className="bg-green-50/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-green-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Euro size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {yellowPunctuation("Ce qui est inclus")}
                </h3>
              </div>
              <ul className="space-y-3">
                {inclus.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Variables */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inclusInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="bg-amber-50/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-amber-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                  <AlertCircle size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {yellowPunctuation("Ce qui peut faire varier le prix")}
                </h3>
              </div>
              <ul className="space-y-3">
                {variables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertCircle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-gray-600 bg-white/60 rounded-xl p-4">
                <strong>Important :</strong> Toute variation est annoncée AVANT l'intervention. Tu décides, pas nous.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={faqs} serviceName="Tarifs serrurerie" />
      <FinalCTA />
    </>
  );
}

