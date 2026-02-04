"use client";

import Link from "next/link";
import Image from "next/image";
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
    { href: "/serrurerie/tarifs", label: "Tarifs serrurier" },
    { href: "/serrurier/ouverture-sans-percage", label: "Porte claquée" },
    { href: "/serrurier/serrure-3-points", label: "Serrure 3 points" },
    { href: "/serrurier/cylindre-haute-securite", label: "Cylindre A2P" },
    { href: "/serrurier/porte-blindee", label: "Porte blindée" },
    { href: "/serrurier/reproduction-cles", label: "Double de clés" },
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

// Zones d'intervention par département
const departmentLinks = [
  { code: "75", name: "Paris" },
  { code: "92", name: "Hauts-de-Seine" },
  { code: "93", name: "Seine-Saint-Denis" },
  { code: "94", name: "Val-de-Marne" },
  { code: "95", name: "Val-d'Oise" },
  { code: "77", name: "Seine-et-Marne" },
  { code: "78", name: "Yvelines" },
  { code: "91", name: "Essonne" },
];

export default function Footer() {
  const { config, loading } = useSiteConfig();

  return (
    <footer className="bg-[#2D1F4E] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="/logo-white.webp"
                  alt="Joël - Dépannage d'urgence"
                  width={200}
                  height={64}
                  className="h-auto w-auto max-h-20"
                />
              </Link>
            </div>
            <div className="space-y-2">
              {loading ? (
                <span className="flex items-center gap-2 text-gray-300 text-sm">
                  <Phone size={16} />
                  <span className="animate-pulse bg-gray-700 h-4 w-20 rounded" />
                </span>
              ) : (
                <a 
                  href={`tel:${formatPhoneForTel(config.phone_number)}`}
                  data-placement="footer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  <Phone size={16} />
                  <span>{config.phone_number}</span>
                </a>
              )}
              <a href="mailto:contact@monjoel.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
                <Mail size={16} />
                <span>contact@monjoel.com</span>
              </a>
            </div>
          </div>

          {/* Plomberie */}
          <div>
            <p className="font-bold text-sm mb-3 text-joel-yellow">Plomberie</p>
            <ul className="space-y-2">
              {footerLinks.plomberie.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.isMain 
                        ? "text-white hover:text-joel-yellow font-medium" 
                        : "text-gray-300 hover:text-white"
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
            <p className="font-bold text-sm mb-3 text-joel-yellow">Électricité</p>
            <ul className="space-y-2">
              {footerLinks.electricite.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.isMain 
                        ? "text-white hover:text-joel-yellow font-medium" 
                        : "text-gray-300 hover:text-white"
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
            <p className="font-bold text-sm mb-3 text-joel-yellow">Serrurerie</p>
            <ul className="space-y-2">
              {footerLinks.serrurerie.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.isMain 
                        ? "text-white hover:text-joel-yellow font-medium" 
                        : "text-gray-300 hover:text-white"
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
            <p className="font-bold text-sm mb-3 text-white">Entreprise</p>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <p className="font-bold text-sm mb-3 text-white">Légal</p>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Zones d'intervention */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="font-bold text-sm mb-4 text-joel-yellow">Zones d&apos;intervention</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {departmentLinks.map((dept) => (
              <div key={dept.code} className="text-center">
                <p className="text-xs text-gray-300 mb-2">{dept.name}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link
                    href={`/plombier-${dept.code}`}
                    className="text-base p-1.5 text-gray-300 hover:text-joel-yellow transition-colors"
                    title={`Plombier ${dept.name}`}
                    aria-label={`Plombier ${dept.name}`}
                  >
                    🔧
                  </Link>
                  <Link
                    href={`/serrurier-${dept.code}`}
                    className="text-base p-1.5 text-gray-300 hover:text-joel-yellow transition-colors"
                    title={`Serrurier ${dept.name}`}
                    aria-label={`Serrurier ${dept.name}`}
                  >
                    🔐
                  </Link>
                  <Link
                    href={`/electricien-${dept.code}`}
                    className="text-base p-1.5 text-gray-300 hover:text-joel-yellow transition-colors"
                    title={`Électricien ${dept.name}`}
                    aria-label={`Électricien ${dept.name}`}
                  >
                    ⚡
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 text-center text-gray-300 text-sm">
          <p>© {new Date().getFullYear()} Joël. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
