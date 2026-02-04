"use client";

import { useState } from "react";
import { Search, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

type ResultType = "valid" | "suspicious" | "scam" | null;

interface AnalysisResult {
  type: ResultType;
  message: string;
  details: string[];
}

export default function TrueScopeMini() {
  const [price, setPrice] = useState("");
  const [service, setService] = useState("serrurerie");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzePrice = () => {
    const numPrice = parseInt(price);
    
    if (isNaN(numPrice) || numPrice <= 0) {
      setResult(null);
      return;
    }

    // Logique simplifiée d'analyse
    const thresholds: Record<string, { min: number; max: number; scam: number }> = {
      serrurerie: { min: 70, max: 200, scam: 400 },
      plomberie: { min: 80, max: 250, scam: 500 },
      electricite: { min: 70, max: 200, scam: 400 },
    };

    const t = thresholds[service];

    if (numPrice < t.min) {
      setResult({
        type: "suspicious",
        message: "Prix anormalement bas",
        details: [
          "Un prix trop bas est souvent un appât",
          "Le montant final sera probablement 5 à 10x plus élevé",
          "Demandez un devis écrit AVANT intervention",
        ],
      });
    } else if (numPrice <= t.max) {
      setResult({
        type: "valid",
        message: "Prix cohérent avec le marché",
        details: [
          "Ce tarif semble raisonnable",
          "Vérifiez que le déplacement est inclus",
          "Demandez confirmation par écrit",
        ],
      });
    } else if (numPrice <= t.scam) {
      setResult({
        type: "suspicious",
        message: "Prix élevé - à vérifier",
        details: [
          "Ce prix est au-dessus de la moyenne",
          "Demandez une justification détaillée",
          "Comparez avec d'autres devis",
        ],
      });
    } else {
      setResult({
        type: "scam",
        message: "Risque d'arnaque élevé",
        details: [
          "Ce prix est anormalement élevé",
          "Ne payez pas avant intervention",
          "Contactez la DGCCRF si besoin",
        ],
      });
    }
  };

  const resultStyles = {
    valid: { bg: "bg-emerald-50", border: "border-emerald-200", icon: CheckCircle, iconColor: "text-emerald-500" },
    suspicious: { bg: "bg-amber-50", border: "border-amber-200", icon: AlertCircle, iconColor: "text-amber-500" },
    scam: { bg: "bg-red-50", border: "border-red-200", icon: XCircle, iconColor: "text-red-500" },
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-joel-yellow/20 text-joel-yellow text-sm font-bold px-4 py-2 rounded-full mb-4">
            <Search size={16} />
            <span>TrueScope</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
            Vérifiez un devis en 10 secondes
          </h2>
          <p className="text-gray-400">
            Entrez le prix qu&apos;on vous a annoncé et notre outil vous dit s&apos;il est normal.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de service
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent"
              >
                <option value="serrurerie">Serrurerie</option>
                <option value="plomberie">Plomberie</option>
                <option value="electricite">Électricité</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix annoncé (€)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 150"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-joel-violet focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={analyzePrice}
                className="w-full px-6 py-3 bg-joel-violet hover:bg-joel-mauve text-white font-bold rounded-xl transition-colors"
              >
                Analyser
              </button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className={`${resultStyles[result.type!].bg} ${resultStyles[result.type!].border} border rounded-xl p-6`}>
              <div className="flex items-start gap-4">
                {(() => {
                  const IconComponent = resultStyles[result.type!].icon;
                  return <IconComponent size={24} className={resultStyles[result.type!].iconColor} />;
                })()}
                <div className="flex-1">
                  <p className="font-bold text-gray-900 mb-2">{result.message}</p>
                  <ul className="space-y-1">
                    {result.details.map((detail, i) => (
                      <li key={i} className="text-sm text-gray-600">• {detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            Outil fourni à titre indicatif.{" "}
            <Link href="/truescope" className="text-joel-violet hover:underline">
              Voir l&apos;analyse complète →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
