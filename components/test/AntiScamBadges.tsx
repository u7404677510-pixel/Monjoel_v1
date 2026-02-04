import { Shield, FileCheck, CreditCard, Clock } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Prix garanti",
    description: "Le prix annoncé est le prix payé. Garanti par écrit.",
    color: "emerald",
  },
  {
    icon: FileCheck,
    title: "Devis avant",
    description: "Devis détaillé fourni avant toute intervention.",
    color: "blue",
  },
  {
    icon: CreditCard,
    title: "Paiement après",
    description: "Vous ne payez qu'une fois l'intervention terminée.",
    color: "violet",
  },
  {
    icon: Clock,
    title: "Sans majoration",
    description: "Même tarif 24h/24, 7j/7, jours fériés inclus.",
    color: "amber",
  },
];

const colorStyles: Record<string, { bg: string; text: string }> = {
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  violet: { bg: "bg-joel-violet/10", text: "text-joel-violet" },
  amber: { bg: "bg-amber-100", text: "text-amber-600" },
};

export default function AntiScamBadges() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Notre engagement anti-arnaque
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            4 garanties concrètes pour vous protéger des pratiques abusives.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            const colors = colorStyles[badge.color];
            
            return (
              <div
                key={badge.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={28} className={colors.text} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{badge.title}</h3>
                <p className="text-sm text-gray-500">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
