"use client";

import Link from "next/link";
import { Phone, Clock, MapPin, Shield } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

export default function TestFooter() {
  const { config } = useSiteConfig();

  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA Final */}
      <div className="bg-gradient-joel py-8 3xl:py-12 5xl:py-16 px-4">
        <div className="max-w-3xl 3xl:max-w-4xl 5xl:max-w-5xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl 3xl:text-4xl 5xl:text-5xl font-bold mb-4 3xl:mb-6">
            Une urgence ? Appelez maintenant
          </h2>
          <a
            href={`tel:${formatPhoneForTel(config.phone_number)}`}
            data-placement="test-footer"
            className="inline-flex items-center gap-3 3xl:gap-4 px-8 3xl:px-10 5xl:px-14 py-4 3xl:py-5 5xl:py-6 bg-white text-joel-violet font-bold text-xl 3xl:text-2xl 5xl:text-3xl rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            <Phone size={24} className="3xl:w-8 3xl:h-8 5xl:w-10 5xl:h-10" />
            <span>{config.phone_number}</span>
          </a>
        </div>
      </div>

      {/* Info Footer */}
      <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl 5xl:max-w-10xl mx-auto px-4 sm:px-6 3xl:px-8 py-10 3xl:py-14 5xl:py-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 3xl:gap-12 text-center md:text-left">
          {/* Horaires */}
          <div className="flex flex-col items-center md:items-start gap-2 3xl:gap-3">
            <Clock className="text-joel-mauve 3xl:w-8 3xl:h-8 5xl:w-10 5xl:h-10" size={24} />
            <h3 className="font-semibold text-lg 3xl:text-xl 5xl:text-2xl">Disponibilité</h3>
            <p className="text-gray-400 3xl:text-lg 5xl:text-xl">24h/24 - 7j/7</p>
            <p className="text-gray-400 3xl:text-lg 5xl:text-xl">Jours fériés inclus</p>
          </div>

          {/* Zone */}
          <div className="flex flex-col items-center md:items-start gap-2 3xl:gap-3">
            <MapPin className="text-joel-mauve 3xl:w-8 3xl:h-8 5xl:w-10 5xl:h-10" size={24} />
            <h3 className="font-semibold text-lg 3xl:text-xl 5xl:text-2xl">Zone d&apos;intervention</h3>
            <p className="text-gray-400 3xl:text-lg 5xl:text-xl">Paris & Île-de-France</p>
            <p className="text-gray-400 3xl:text-lg 5xl:text-xl">8 départements</p>
          </div>

          {/* Garanties */}
          <div className="flex flex-col items-center md:items-start gap-2 3xl:gap-3">
            <Shield className="text-joel-mauve 3xl:w-8 3xl:h-8 5xl:w-10 5xl:h-10" size={24} />
            <h3 className="font-semibold text-lg 3xl:text-xl 5xl:text-2xl">Garanties</h3>
            <p className="text-gray-400 3xl:text-lg 5xl:text-xl">Prix fixe garanti</p>
            <p className="text-gray-400 3xl:text-lg 5xl:text-xl">Sans majoration</p>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-gray-800 mt-8 3xl:mt-12 pt-8 3xl:pt-12 pb-20 md:pb-0 flex flex-col md:flex-row items-center justify-between gap-4 text-sm 3xl:text-base 5xl:text-lg text-gray-500">
          <p>© {new Date().getFullYear()} Joël. Tous droits réservés.</p>
          <div className="flex gap-4 3xl:gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="/cgu" className="hover:text-white transition-colors">
              CGU
            </Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
