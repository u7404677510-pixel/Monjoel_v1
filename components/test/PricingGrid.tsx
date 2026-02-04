"use client";

import { Wrench, Zap, Lock, Check } from "lucide-react";

interface PricingItem {
  service: string;
  price: string;
  note?: string;
}

interface PricingCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  items: PricingItem[];
}

const pricingData: PricingCategory[] = [
  {
    title: "Serrurerie",
    icon: <Lock size={24} className="3xl:w-8 3xl:h-8 5xl:w-10 5xl:h-10" />,
    color: "joel-violet",
    items: [
      { service: "Ouverture porte claquée", price: "89€", note: "sans perçage" },
      { service: "Ouverture avec perçage", price: "150€", note: "cylindre à remplacer" },
      { service: "Changement cylindre", price: "120€", note: "fourniture incluse" },
      { service: "Blindage de porte", price: "Sur devis" },
    ],
  },
  {
    title: "Plomberie",
    icon: <Wrench size={24} className="3xl:w-8 3xl:h-8 5xl:w-10 5xl:h-10" />,
    color: "blue-500",
    items: [
      { service: "Fuite simple", price: "95€", note: "robinet, joint" },
      { service: "Débouchage WC", price: "110€", note: "manuel ou furet" },
      { service: "Dégât des eaux", price: "150€", note: "intervention urgente" },
      { service: "Chauffe-eau", price: "Sur devis" },
    ],
  },
  {
    title: "Électricité",
    icon: <Zap size={24} className="3xl:w-8 3xl:h-8 5xl:w-10 5xl:h-10" />,
    color: "amber-500",
    items: [
      { service: "Panne électrique", price: "89€", note: "diagnostic inclus" },
      { service: "Disjoncteur saute", price: "95€", note: "réparation" },
      { service: "Prise / Interrupteur HS", price: "75€", note: "remplacement" },
      { service: "Tableau électrique", price: "Sur devis" },
    ],
  },
];

export default function PricingGrid() {
  return (
    <section className="py-12 md:py-16 3xl:py-22 5xl:py-30 bg-gray-50">
      <div className="max-w-6xl 3xl:max-w-8xl 4xl:max-w-9xl 5xl:max-w-10xl mx-auto px-4 sm:px-6 3xl:px-8">
        <div className="text-center mb-10 3xl:mb-14">
          <h2 className="font-display text-2xl md:text-3xl 3xl:text-4xl 5xl:text-5xl font-bold text-gray-900 mb-3 3xl:mb-4">
            Nos tarifs transparents
          </h2>
          <p className="text-gray-600 max-w-2xl 3xl:max-w-3xl mx-auto 3xl:text-lg 5xl:text-xl">
            Prix fixes, annoncés avant intervention. Pas de surprise, pas de majoration.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 3xl:gap-8 5xl:gap-10">
          {pricingData.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-2xl 3xl:rounded-3xl shadow-lg overflow-hidden"
            >
              {/* Header */}
              <div className={`bg-${category.color} bg-joel-violet p-4 3xl:p-6 5xl:p-8 text-white`}>
                <div className="flex items-center gap-3 3xl:gap-4">
                  {category.icon}
                  <h3 className="font-display text-xl 3xl:text-2xl 5xl:text-3xl font-bold">{category.title}</h3>
                </div>
              </div>

              {/* Items */}
              <div className="p-4 3xl:p-6 5xl:p-8 space-y-3 3xl:space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.service}
                    className="flex items-start justify-between gap-2 pb-3 3xl:pb-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 3xl:text-lg 5xl:text-xl">{item.service}</p>
                      {item.note && (
                        <p className="text-xs 3xl:text-sm 5xl:text-base text-gray-500">{item.note}</p>
                      )}
                    </div>
                    <span className="font-bold text-joel-violet whitespace-nowrap 3xl:text-lg 5xl:text-xl">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 3xl:px-6 5xl:px-8 pb-4 3xl:pb-6 5xl:pb-8">
                <div className="flex items-center gap-2 text-sm 3xl:text-base 5xl:text-lg text-emerald-600">
                  <Check size={16} className="3xl:w-5 3xl:h-5 5xl:w-6 5xl:h-6" />
                  <span>Déplacement inclus</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm 3xl:text-base 5xl:text-lg text-gray-500 mt-8 3xl:mt-10">
          * Prix indicatifs TTC. Le tarif exact est confirmé par téléphone avant intervention.
        </p>
      </div>
    </section>
  );
}
