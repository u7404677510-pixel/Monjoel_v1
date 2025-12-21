"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

const footerLinks = {
  plomberie: [
    { href: "/plomberie", label: "Plomberie", isMain: true },
    { href: "/plombier/fuite-eau", label: "Fuite d'eau" },
    { href: "/plombier/wc-bouches", label: "WC bouchés" },
    { href: "/plombier/degat-des-eaux", label: "Dégât des eaux" },
    { href: "/plombier/chauffe-eau-panne", label: "Chauffe-eau" },
    { href: "/plombier/remplacement-robinet", label: "Robinet / Siphon" },
  ],
  electricite: [
    { href: "/electricite", label: "Électricité", isMain: true },
    { href: "/electricien/panne-electrique", label: "Panne électrique" },
    { href: "/electricien/disjoncteur-saute", label: "Disjoncteur" },
    { href: "/electricien/tableau-electrique", label: "Tableau électrique" },
    { href: "/electricien/court-circuit", label: "Court-circuit" },
    { href: "/electricien/mise-aux-normes", label: "Mise aux normes" },
  ],
  serrurerie: [
    { href: "/serrurerie", label: "Serrurerie", isMain: true },
    { href: "/serrurier/ouverture-sans-percage", label: "Ouverture sans perçage" },
    { href: "/serrurier/ouverture-avec-percage", label: "Ouverture avec perçage" },
    { href: "/serrurier/perte-cles", label: "Perte de clés" },
    { href: "/serrurier/cle-cassee-serrure", label: "Clé cassée" },
    { href: "/serrurier/blindage-porte", label: "Blindage porte" },
  ],
  company: [
    { href: "/stop-arnaques", label: "Anti-arnaque" },
    { href: "/a-propos", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/cgu", label: "CGU" },
    { href: "/confidentialite", label: "Confidentialité" },
  ],
};

export default function Footer() {
  const { config, loading } = useSiteConfig();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-joel rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <span className="text-2xl font-bold">Joël</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Dépannage d'urgence sans surprises. Prix fixes, artisans vérifiés.
            </p>
            <div className="space-y-2">
              {loading ? (
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone size={16} />
                  <span className="animate-pulse bg-gray-700 h-4 w-20 rounded" />
                </span>
              ) : (
                <a 
                  href={`tel:${formatPhoneForTel(config.phone_number)}`}
                  data-placement="footer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Phone size={16} />
                  <span>{config.phone_number}</span>
                </a>
              )}
              <a href="mailto:contact@monjoel.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                <Mail size={16} />
                <span>contact@monjoel.com</span>
              </a>
            </div>
          </div>

          {/* Plomberie */}
          <div>
            <h4 className="font-bold text-sm mb-3 text-joel-yellow">Plomberie</h4>
            <ul className="space-y-2">
              {footerLinks.plomberie.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.isMain 
                        ? "text-white hover:text-joel-yellow font-medium" 
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Électricité */}
          <div>
            <h4 className="font-bold text-sm mb-3 text-joel-yellow">Électricité</h4>
            <ul className="space-y-2">
              {footerLinks.electricite.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.isMain 
                        ? "text-white hover:text-joel-yellow font-medium" 
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Serrurerie */}
          <div>
            <h4 className="font-bold text-sm mb-3 text-joel-yellow">Serrurerie</h4>
            <ul className="space-y-2">
              {footerLinks.serrurerie.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.isMain 
                        ? "text-white hover:text-joel-yellow font-medium" 
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Entreprise</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Légal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Joël. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
