"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { XCircle } from "lucide-react";

const practices = [
  {
    title: "Le prix d'appel cassé",
    tactic:
      "Annoncé 39€ au téléphone, la facture grimpe à 380-650€ une fois sur place.",
    example: "Débouchage WC : 39€ annoncés → 547€ facturés après faux « démontage cuvette ».",
    recourse: "Opposition CB sous 8 semaines, signalement signal.conso.gouv.fr.",
  },
  {
    title: "Les travaux inutiles",
    tactic:
      "Changement de pièces en parfait état pour grossir le ticket, justifié par un jargon technique.",
    example: "Cylindre A2P remplacé pour « usure », 380€, alors que la serrure était neuve.",
    recourse: "Demander la pièce déposée + un devis détaillé écrit avant tout démontage.",
  },
  {
    title: "L'urgence fabriquée",
    tactic:
      "Faux diagnostic alarmiste qui présente un risque grave pour pousser à signer dans la minute.",
    example: "« Tableau électrique dangereux, à refaire ce soir » : 1 980€ pour réarmer un différentiel.",
    recourse: "Demander un second avis. Aucun pro sérieux ne refuse 24h de réflexion.",
  },
  {
    title: "Le devis flou signé sous pression",
    tactic:
      "Devis manuscrit, montant total caché, signé en pleine nuit ou avec menace de partir sans rien faire.",
    example: "Devis serrurerie illisible : 460€ qui deviennent 1 100€ sur la facture finale.",
    recourse: "Refus de signer. Une intervention faite sans devis signé est juridiquement contestable.",
  },
  {
    title: "Le paiement liquide forcé",
    tactic:
      "CB refusée, virement refusé : exigence de payer en espèces immédiatement.",
    example: "« La machine CB ne fonctionne pas » : 870€ exigés en liquide, pas de facture conforme.",
    recourse: "Refus catégorique. Tout pro sérieux accepte CB ou virement et émet un reçu.",
  },
  {
    title: "La société-écran sans SIRET",
    tactic:
      "Pas de raison sociale claire, SIRET introuvable au RCS, adresse de domiciliation collective.",
    example: "Facture griffonnée sans SIRET : aucune prise en charge possible par l'assurance habitation.",
    recourse: "Vérifier le SIRET sur infogreffe.fr ou societe.com avant tout paiement.",
  },
];

export default function StopArnaquesPractices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Les <span className="text-red-500">pratiques douteuses</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Apprenez à reconnaître les techniques des faux artisans.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practices.map((practice, index) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-red-50/80 backdrop-blur-xs rounded-2xl p-6 border border-red-100 flex flex-col"
            >
              <XCircle className="text-red-500 mb-4" size={32} />
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {practice.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {practice.tactic}
              </p>
              <div className="rounded-lg bg-white/70 border border-red-100 px-3 py-2 mb-3">
                <p className="text-xs font-mono uppercase tracking-wider text-red-600 mb-1">
                  Cas type
                </p>
                <p className="text-sm text-gray-700 italic leading-snug">
                  {practice.example}
                </p>
              </div>
              <div className="mt-auto pt-2 border-t border-red-100">
                <p className="text-xs font-mono uppercase tracking-wider text-joel-violet mb-1">
                  Recours
                </p>
                <p className="text-sm text-gray-700 leading-snug">
                  {practice.recourse}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
