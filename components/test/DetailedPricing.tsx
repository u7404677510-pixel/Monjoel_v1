"use client";

import { Check, Info } from "lucide-react";

interface PricingRow {
  label: string;
  value: string;
  info?: string;
}

const baseRates: PricingRow[] = [
  { label: "Déplacement", value: "0€", info: "Inclus dans le forfait" },
  { label: "Main d'œuvre (heure)", value: "45€ HT", info: "52€ TTC" },
  { label: "Diagnostic", value: "Gratuit", info: "Inclus si intervention" },
];

const surcharges: PricingRow[] = [
  { label: "Intervention soirée (20h-22h)", value: "+0€", info: "Sans majoration" },
  { label: "Intervention nuit (22h-6h)", value: "+0€", info: "Sans majoration" },
  { label: "Week-end et jours fériés", value: "+0€", info: "Sans majoration" },
];

const popularServices = [
  { service: "Ouverture porte claquée", price: "89€", includes: ["Déplacement", "Ouverture non destructive", "TVA"] },
  { service: "Débouchage WC / évier", price: "110€", includes: ["Déplacement", "Furet manuel", "TVA"] },
  { service: "Réparation fuite simple", price: "95€", includes: ["Déplacement", "Joint / raccord", "TVA"] },
  { service: "Panne électrique", price: "89€", includes: ["Déplacement", "Diagnostic", "TVA"] },
];

export default function DetailedPricing() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Grille tarifaire complète
          </h2>
          <p className="text-gray-600">
            Tous nos tarifs sont affichés. Pas de surprise, pas de frais cachés.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Tarifs de base */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-gray-900 mb-4">
              Tarifs de base
            </h3>
            <div className="space-y-3">
              {baseRates.map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{row.label}</span>
                    {row.info && (
                      <span className="text-xs text-gray-400" title={row.info}>
                        <Info size={14} />
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-joel-violet">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Majorations */}
          <div className="bg-emerald-50 rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              Majorations
              <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                ZÉRO
              </span>
            </h3>
            <div className="space-y-3">
              {surcharges.map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-emerald-200 last:border-0">
                  <span className="text-gray-700">{row.label}</span>
                  <span className="font-bold text-emerald-600">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Forfaits populaires */}
        <h3 className="font-display text-lg font-bold text-gray-900 mb-4 text-center">
          Forfaits tout compris les plus demandés
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularServices.map((item) => (
            <div key={item.service} className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-joel-violet/30 transition-colors">
              <p className="font-semibold text-gray-900 mb-2">{item.service}</p>
              <p className="text-3xl font-bold text-joel-violet mb-3">{item.price}</p>
              <ul className="space-y-1">
                {item.includes.map((inc) => (
                  <li key={inc} className="flex items-center gap-2 text-sm text-gray-500">
                    <Check size={12} className="text-emerald-500" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          * Tarifs TTC indicatifs. Le prix exact est confirmé par téléphone avant toute intervention.
        </p>
      </div>
    </section>
  );
}
