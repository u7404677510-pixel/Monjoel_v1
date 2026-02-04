"use client";

import { Phone, X, Check, AlertTriangle, Shield } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

export default function SplitHero() {
  const { config } = useSiteConfig();

  return (
    <section className="relative pt-20 md:pt-24 overflow-hidden">
      {/* Banner alert */}
      <div className="bg-red-500 text-white text-center py-2 px-4">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <AlertTriangle size={16} />
          <span>60% des plaintes dépannage concernent des arnaques tarifaires</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 min-h-[auto] md:min-h-[80vh]">
        {/* Côté gauche - Les autres (sombre) */}
        <div className="bg-gray-900 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 11px)`
            }} />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 text-sm font-bold px-4 py-2 rounded-full mb-6">
              <X size={16} />
              <span>Chez les autres</span>
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              L&apos;arnaque classique
            </h2>

            {/* Prix arnaque mis en avant */}
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400 text-sm mb-1">Prix annoncé au téléphone :</p>
              <p className="text-white text-2xl font-bold line-through decoration-red-500">59€</p>
              <p className="text-red-400 text-sm mt-2">Prix réel facturé :</p>
              <p className="text-red-400 text-3xl font-bold">890€</p>
            </div>

            <ul className="space-y-3">
              {[
                { text: '"Déplacement gratuit"', subtext: "→ Forfait minimum 200€" },
                { text: '"Devis gratuit"', subtext: "→ Paiement exigé AVANT" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={12} className="text-red-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium line-through decoration-red-400 text-sm">{item.text}</p>
                    <p className="text-red-400 text-xs">{item.subtext}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Côté droit - Avec Joël (lumineux) */}
        <div className="bg-gradient-to-br from-joel-violet to-joel-mauve p-8 md:p-12 flex flex-col justify-center relative">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-joel-yellow/20 rounded-full blur-xl" />

          <div className="relative z-10">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full">
                <Shield size={16} />
                <span>Avec Joël</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                <span>SANS MAJORATION 24h/24</span>
              </div>
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              La transparence totale
            </h2>

            {/* Prix Joël comparé */}
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 mb-6">
              <p className="text-white/80 text-sm mb-1">Chez nous, porte claquée :</p>
              <p className="text-joel-yellow text-4xl font-bold">89€ TTC</p>
              <p className="text-white/70 text-sm mt-1">Pas 890€. Jamais.</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                { text: "Prix annoncé = prix payé", subtext: "Garanti par écrit" },
                { text: "Déplacement inclus", subtext: "0€ de frais cachés" },
                { text: "Paiement APRÈS", subtext: "Intervention terminée" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-joel-yellow" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{item.text}</p>
                    <p className="text-white/70 text-xs">{item.subtext}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA XXL avec numéro */}
            <a
              href={`tel:${formatPhoneForTel(config.phone_number)}`}
              data-placement="split-hero"
              className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-joel-violet font-bold text-2xl rounded-xl shadow-2xl hover:shadow-white/30 transition-all w-full"
            >
              <Phone size={28} className="animate-ring" />
              <span>{config.phone_number}</span>
            </a>

            <p className="text-white/70 text-sm mt-3 text-center">
              Appel gratuit • Disponible 24h/24 • 7j/7
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
