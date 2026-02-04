"use client";

import { X, Check, AlertTriangle } from "lucide-react";

interface ComparisonRow {
  label: string;
  scam: string;
  joel: string;
}

const comparisons: ComparisonRow[] = [
  {
    label: "Prix annoncé au téléphone",
    scam: "59€ (appât)",
    joel: "89€ (réel)",
  },
  {
    label: "Prix final facturé",
    scam: "500€ à 1500€",
    joel: "89€ (identique)",
  },
  {
    label: "Déplacement",
    scam: '"Gratuit" puis 150€',
    joel: "Réellement inclus",
  },
  {
    label: "Majoration nuit/weekend",
    scam: "+100% à +200%",
    joel: "0€ (aucune)",
  },
  {
    label: "Devis écrit",
    scam: "Refusé ou falsifié",
    joel: "Avant intervention",
  },
  {
    label: "Moment du paiement",
    scam: "Avant intervention",
    joel: "Après intervention",
  },
];

export default function ScamComparison() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-sm font-bold px-4 py-2 rounded-full mb-4">
            <AlertTriangle size={16} />
            <span>Attention aux arnaques</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Comparez avant d&apos;appeler
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Voici ce qui distingue un artisan honnête d&apos;un arnaqueur.
          </p>
        </div>

        {/* Tableau comparatif - scrollable on mobile */}
        <div className="bg-gray-50 rounded-2xl overflow-x-auto">
          <div className="min-w-[480px]">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gray-100">
              <div className="p-3 md:p-4" />
              <div className="p-3 md:p-4 text-center bg-red-50">
                <div className="flex items-center justify-center gap-1 md:gap-2">
                  <X size={16} className="text-red-500" />
                  <span className="font-bold text-red-700 text-sm md:text-base">Arnaqueurs</span>
                </div>
              </div>
              <div className="p-3 md:p-4 text-center bg-emerald-50">
                <div className="flex items-center justify-center gap-1 md:gap-2">
                  <Check size={16} className="text-emerald-500" />
                  <span className="font-bold text-emerald-700 text-sm md:text-base">Joël</span>
                </div>
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((row, index) => (
              <div 
                key={row.label}
                className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <div className="p-3 md:p-4 font-medium text-gray-700 text-xs md:text-sm">
                  {row.label}
                </div>
                <div className="p-3 md:p-4 text-center text-xs md:text-sm text-red-600 bg-red-50/50">
                  {row.scam}
                </div>
                <div className="p-3 md:p-4 text-center text-xs md:text-sm text-emerald-600 font-medium bg-emerald-50/50">
                  {row.joel}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile scroll hint */}
        <p className="text-center text-xs text-gray-400 mt-2 md:hidden">
          ← Faites défiler le tableau →
        </p>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          <div className="text-center">
            <p className="text-4xl font-bold text-red-500 mb-2">60%</p>
            <p className="text-sm text-gray-600">des plaintes dépannage sont des arnaques tarifaires</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-red-500 mb-2">890€</p>
            <p className="text-sm text-gray-600">montant moyen facturé par un arnaqueur (source DGCCRF)</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-emerald-500 mb-2">0</p>
            <p className="text-sm text-gray-600">plainte reçue par Joël depuis 2020</p>
          </div>
        </div>
      </div>
    </section>
  );
}
