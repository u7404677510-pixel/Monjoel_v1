"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import { getFooterDeptAnchor } from "@/lib/seo/anchor-variants";

const footerLinks = {
  plomberie: [
    { href: "/plomberie", label: "Plomberie", isMain: true },
    { href: "/plomberie/tarifs", label: "Tarifs plombier" },
    { href: "/plombier/fuite-eau", label: "Fuite d'eau" },
    { href: "/plombier/wc-bouches", label: "WC bouchés" },
    { href: "/plombier/debouchage-wc", label: "Débouchage WC" },
    { href: "/plombier/debouchage-canalisation", label: "Débouchage canalisation" },
    { href: "/plombier/degat-des-eaux", label: "Dégât des eaux" },
    { href: "/plombier/chauffe-eau-panne", label: "Chauffe-eau" },
    { href: "/plombier/ballon-eau-chaude", label: "Ballon eau chaude" },
    { href: "/plombier/urgence-24h", label: "Urgence 24h" },
    { href: "/plombier/recherche-fuite", label: "Recherche fuite" },
    { href: "/plombier/evier-bouche", label: "Évier bouché" },
    { href: "/plombier/chasse-eau", label: "Chasse d'eau" },
    { href: "/plombier/fuite-tuyau", label: "Fuite tuyau" },
    { href: "/plombier/installation-wc", label: "Installation WC" },
    { href: "/plombier/groupe-securite", label: "Groupe sécurité" },
    { href: "/plombier/lavabo-bouche", label: "Lavabo bouché" },
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
    { href: "/recrutement", label: "Recrutement" },
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
                  <span className="animate-pulse bg-gray-700 h-4 w-20 rounded-sm" />
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
            {departmentLinks.map((dept) => {
              // Anchors variés via title/aria-label — évite que les 8 dpts
              // aient tous l'ancre "Plombier {dept}". L'emoji visible n'a pas
              // de texte d'anchor, donc Google se base sur title/aria-label.
              const plombierAnchor = getFooterDeptAnchor(dept.name, dept.code, "plombier");
              const serrurierAnchor = getFooterDeptAnchor(dept.name, dept.code, "serrurier");
              const electricienAnchor = getFooterDeptAnchor(dept.name, dept.code, "electricien");
              return (
                <div key={dept.code} className="text-center">
                  <p className="text-xs text-gray-300 mb-2">{dept.name}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link
                      href={`/plombier-${dept.code}`}
                      className="text-base p-1.5 text-gray-300 hover:text-joel-yellow transition-colors"
                      title={plombierAnchor}
                      aria-label={plombierAnchor}
                    >
                      🔧
                    </Link>
                    <Link
                      href={`/serrurier-${dept.code}`}
                      className="text-base p-1.5 text-gray-300 hover:text-joel-yellow transition-colors"
                      title={serrurierAnchor}
                      aria-label={serrurierAnchor}
                    >
                      🔐
                    </Link>
                    <Link
                      href={`/electricien-${dept.code}`}
                      className="text-base p-1.5 text-gray-300 hover:text-joel-yellow transition-colors"
                      title={electricienAnchor}
                      aria-label={electricienAnchor}
                    >
                      ⚡
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom — identité légale + mentions téléphone */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-400 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} Joël. Tous droits réservés.</p>
            <span className="hidden sm:inline text-white/20">·</span>
            <p>SIRET : 98765432100012 · RC Pro assurée</p>
          </div>
          <p className="text-gray-500 text-center sm:text-right">
            Numéro non surtaxé — Appel &amp; service gratuits
          </p>
        </div>
      </div>
    </footer>
  );
}
