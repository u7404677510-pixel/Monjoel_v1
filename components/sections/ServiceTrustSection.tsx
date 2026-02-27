import { Star, Shield, Clock, Award, Check } from "lucide-react";
import Image from "next/image";

type TradeType = "serrurerie" | "plomberie" | "electricite";

interface ServiceTrustSectionProps {
  trade: TradeType;
}

const tradeReviews: Record<TradeType, Array<{ author: string; text: string; date: string }>> = {
  serrurerie: [
    {
      author: "Marie L.",
      text: "Porte claquée à 22h, serrurier sur place en 25 min. Prix annoncé au téléphone = prix payé. Zéro arnaque, je recommande !",
      date: "Il y a 3 jours",
    },
    {
      author: "Pierre-Antoine R.",
      text: "Serrurier très professionnel, serrure changée rapidement. Devis clair avant intervention et paiement CB sans problème.",
      date: "Il y a 1 semaine",
    },
    {
      author: "Camille T.",
      text: "Excellent service. Clé cassée dans la serrure, réglé en 20 minutes. Prix fixe respecté, artisan compétent.",
      date: "Il y a 2 semaines",
    },
  ],
  plomberie: [
    {
      author: "Sophie M.",
      text: "Fuite réparée rapidement, plombier arrivé en 20 min. Tarif honnête et transparent, attestation fournie pour l'assurance.",
      date: "Il y a 2 jours",
    },
    {
      author: "Julien B.",
      text: "WC bouchés réglés en 30 minutes. Plombier propre, efficace, prix fixe respecté. Je recommande vivement.",
      date: "Il y a 5 jours",
    },
    {
      author: "Nathalie H.",
      text: "Chauffe-eau réparé le jour même. Diagnostic précis, explication claire du problème. Prix annoncé avant travaux.",
      date: "Il y a 10 jours",
    },
  ],
  electricite: [
    {
      author: "Thomas D.",
      text: "Panne électrique résolue en 30 min. Électricien certifié, très pro. Prix fixe annoncé avant intervention, aucune surprise.",
      date: "Il y a 2 jours",
    },
    {
      author: "Isabelle P.",
      text: "Disjoncteur réparé rapidement, tout le courant rétabli. Artisan ponctuel et efficace, tarif transparent.",
      date: "Il y a 4 jours",
    },
    {
      author: "Marc V.",
      text: "Tableau électrique diagnostiqué et réparé. Explications claires, conformité garantie. Excellent rapport qualité-prix.",
      date: "Il y a 1 semaine",
    },
  ],
};

const insurances = [
  { name: "AXA", logo: "/logos/axa.svg" },
  { name: "Allianz", logo: "/logos/allianz.svg" },
  { name: "MAIF", logo: "/logos/maif.svg" },
  { name: "Groupama", logo: "/logos/groupama.svg" },
  { name: "MACIF", logo: "/logos/macif.svg" },
  { name: "Matmut", logo: "/logos/matmut.svg" },
];

const guarantees = [
  { icon: Shield, label: "Garantie pièces", sub: "2 ans sur toutes les pièces" },
  { icon: Award, label: "Garantie main d'œuvre", sub: "1 an sur l'intervention" },
  { icon: Check, label: "RC Pro", sub: "Artisans assurés" },
  { icon: Clock, label: "Sans majoration", sub: "Même tarif nuit & week-end" },
];

export default function ServiceTrustSection({ trade }: ServiceTrustSectionProps) {
  const reviews = tradeReviews[trade];

  return (
    <>
      {/* Avis clients */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header note globale */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900">Google Reviews — Joël</p>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="font-bold text-gray-900">4.9</span>
                  <span className="text-gray-500 text-sm">(947 avis)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Check size={16} />
              <span>Avis vérifiés Google</span>
            </div>
          </div>

          {/* 3 avis */}
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-gradient-joel rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">{review.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guarantees.map((g, i) => (
              <div key={i} className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <g.icon size={20} className="text-emerald-600" />
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1">{g.label}</p>
                <p className="text-xs text-gray-500">{g.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos assurances */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs text-gray-400 uppercase tracking-wider mb-5 font-medium">
            Agréé par les principales compagnies d&apos;assurance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {insurances.map((ins) => (
              <div
                key={ins.name}
                className="flex items-center justify-center w-24 h-12 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
              >
                <Image
                  src={ins.logo}
                  alt={ins.name}
                  width={80}
                  height={32}
                  className="w-auto h-8 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
