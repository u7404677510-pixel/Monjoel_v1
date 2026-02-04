"use client";

import Image from "next/image";
import { Phone, Check, Star, Shield } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

interface PhotoHeroProps {
  artisanImage?: string;
}

export default function PhotoHero({
  artisanImage = "/artisan-real.webp",
}: PhotoHeroProps) {
  const { config } = useSiteConfig();

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white pt-24 pb-12 md:pt-28 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Contenu texte */}
          <div className="order-2 md:order-1">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="inline-flex items-center gap-2 bg-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                <Shield size={16} />
                <span>SANS MAJORATION 24h/24</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-joel-violet/10 text-joel-violet text-sm font-bold px-4 py-2 rounded-full">
                <span>PRIX FIXES GARANTIS</span>
              </div>
            </div>

            {/* Titre */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              <span className="text-joel-violet">Prix affichés</span>
              <br />
              = Prix payés
            </h1>

            {/* Prix phare */}
            <div className="bg-joel-yellow/20 border-2 border-joel-yellow rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Notre forfait le plus demandé :</p>
              <p className="text-2xl font-bold text-gray-900">
                Ouverture porte claquée : <span className="text-joel-violet">89€ TTC</span>
              </p>
              <p className="text-sm text-gray-500">Déplacement inclus • Sans surprise</p>
            </div>

            {/* Sous-titre */}
            <p className="text-lg text-gray-600 mb-6 max-w-lg">
              Chez Joël, pas de surprise. Le prix annoncé au téléphone est le prix que vous payez. Point.
            </p>

            {/* Liste garanties */}
            <ul className="space-y-3 mb-8">
              {[
                "Déplacement inclus dans le forfait",
                "Pas de majoration nuit & weekend",
                "Devis gratuit par téléphone",
                "Paiement APRÈS intervention",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-emerald-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA XXL */}
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${formatPhoneForTel(config.phone_number)}`}
                data-placement="photo-hero"
                className="flex items-center justify-center gap-3 px-8 py-5 bg-joel-violet hover:bg-joel-mauve text-white font-bold text-2xl rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Phone size={28} className="animate-ring" />
                <span>{config.phone_number}</span>
              </a>
              <p className="text-center text-sm text-gray-500">
                Appel gratuit • Réponse immédiate
              </p>
            </div>

            {/* Google rating */}
            <div className="flex items-center gap-3 mt-6 bg-gray-100 rounded-full px-4 py-2 w-fit">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                <span className="font-bold">4.9/5</span> sur 947 avis Google
              </span>
            </div>
          </div>

          {/* Image artisan */}
          <div className="order-1 md:order-2 relative">
            <div className="relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={artisanImage}
                alt="Artisan Joël en intervention"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-semibold">Marc, serrurier certifié</p>
                <p className="text-white/80 text-sm">12 ans d&apos;expérience • Paris 15e</p>
              </div>
            </div>

            {/* Badge flottant prix */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-joel-yellow rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">89€</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Porte claquée</p>
                  <p className="text-sm text-gray-500">Forfait tout compris</p>
                </div>
              </div>
            </div>

            {/* Badge intervention rapide */}
            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white rounded-xl shadow-xl px-4 py-2 hidden md:block">
              <p className="font-bold text-sm">20-30 min</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
