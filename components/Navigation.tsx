"use client";

/**
 * Navigation — Header sticky DA Purple lumineuse, premium.
 *
 * Direction artistique :
 *   - Verre dépoli blanc translucide (bg-white/85 + backdrop-blur).
 *   - Liens zinc-700 → joel-violet au hover, underline jaune animée
 *     (bg-gradient-to-r from-joel-yellow grow on hover).
 *   - CTA téléphone gradient violet→mauve (gradient-joel) avec lift au hover.
 *   - Mobile : burger → drawer slide-in droite (Motion AnimatePresence).
 *   - Au scroll > 80px : opacité augmente, shadow douce.
 *
 * Logique métier préservée :
 *   - useSiteConfig pour téléphone dynamique (defaut 01 41 69 10 08).
 *   - data-placement="nav-main" sur le bouton appel.
 *   - dataLayer.push({event:"click_to_call", placement:"nav_main"}).
 *   - Tous les liens hub conservés.
 */

import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { formatPhoneForTel, useSiteConfig } from "@/lib/hooks/useSiteConfig";

// ─────────────────────────────────────────────────────────────────────────────
// Liens hub — synchros avec le Footer DA Purple
// ─────────────────────────────────────────────────────────────────────────────

interface SubService {
  href: string;
  label: string;
  /** Description courte affichée sous le label dans le mega-menu. */
  desc?: string;
}

interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
  /** Sous-services affichés en mega-menu hover (desktop uniquement). */
  subServices?: SubService[];
  /** Lien "voir tous" en pied du mega-menu. */
  allServicesHref?: string;
}

const navLinks: NavLink[] = [
  {
    href: "/plomberie",
    label: "Plomberie",
    subServices: [
      { href: "/plombier/fuite-eau", label: "Fuite d'eau", desc: "Détection + réparation 24h/24" },
      { href: "/plombier/wc-bouches", label: "WC bouchés", desc: "Débouchage rapide dès 79€" },
      { href: "/plombier/debouchage-canalisation", label: "Débouchage canalisation", desc: "Furet + caméra" },
      { href: "/plombier/chauffe-eau-panne", label: "Chauffe-eau en panne", desc: "Diagnostic + réparation" },
      { href: "/plombier/recherche-fuite", label: "Recherche de fuite", desc: "Caméra thermique non destructive" },
      { href: "/plombier/degat-des-eaux", label: "Dégât des eaux", desc: "Attestation assurance fournie" },
    ],
    allServicesHref: "/plomberie/tarifs",
  },
  {
    href: "/serrurerie",
    label: "Serrurerie",
    subServices: [
      { href: "/serrurier/ouverture-sans-percage", label: "Ouverture sans perçage", desc: "Porte claquée — 89€" },
      { href: "/serrurier/ouverture-avec-percage", label: "Ouverture avec perçage", desc: "Porte fermée à clé" },
      { href: "/serrurier/changement-cylindre", label: "Changement de cylindre", desc: "A2P certifié" },
      { href: "/serrurier/changement-serrure", label: "Changement de serrure", desc: "Vachette · Bricard · Picard" },
      { href: "/serrurier/blindage-porte", label: "Blindage de porte", desc: "Anti-effraction" },
      { href: "/serrurier/apres-effraction", label: "Après effraction", desc: "Sécurisation immédiate" },
    ],
    allServicesHref: "/serrurerie/tarifs",
  },
  {
    href: "/electricite",
    label: "Électricité",
    subServices: [
      { href: "/electricien/panne-electrique", label: "Panne électrique", desc: "Diagnostic + remise en service" },
      { href: "/electricien/disjoncteur-saute", label: "Disjoncteur qui saute", desc: "Identification cause" },
      { href: "/electricien/court-circuit", label: "Court-circuit", desc: "Intervention urgente" },
      { href: "/electricien/tableau-electrique", label: "Tableau électrique", desc: "Schneider · Hager · Legrand" },
      { href: "/electricien/mise-aux-normes", label: "Mise aux normes NF C 15-100", desc: "Conformité vente / location" },
      { href: "/electricien/prise-interrupteur-hs", label: "Prise / interrupteur HS", desc: "Remplacement rapide" },
    ],
    allServicesHref: "/electricite/tarifs",
  },
  { href: "/stop-arnaques", label: "Anti-arnaque" },
  { href: "/recrutement", label: "Recrutement", highlight: true },
];

// ─────────────────────────────────────────────────────────────────────────────
// NavLink desktop — underline jaune animée au hover
// ─────────────────────────────────────────────────────────────────────────────

function DesktopNavLink({
  link,
  index,
  isActive,
}: {
  link: NavLink;
  index: number;
  isActive: boolean;
}) {
  if (link.highlight) {
    return (
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: [4, 0] }}
        transition={{ duration: 0.35, delay: 0.15 + index * 0.05, ease: [0.4, 0, 0.2, 1] }}
      >
        <Link
          href={link.href}
          aria-current={isActive ? "page" : undefined}
          className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-semibold text-joel-violet bg-joel-yellow/30 hover:bg-joel-yellow/50 transition-colors aria-[current=page]:bg-joel-yellow/70"
        >
          {link.label}
        </Link>
      </motion.div>
    );
  }

  // Lien avec mega-menu hover (desktop) : Plomberie / Serrurerie / Électricité
  if (link.subServices && link.subServices.length > 0) {
    return (
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: [4, 0] }}
        transition={{ duration: 0.35, delay: 0.1 + index * 0.05, ease: [0.4, 0, 0.2, 1] }}
        className="group relative"
      >
        <Link
          href={link.href}
          aria-current={isActive ? "page" : undefined}
          className="relative text-sm font-medium text-zinc-700 hover:text-joel-violet transition-colors duration-200 bg-linear-to-r from-joel-yellow to-joel-yellow bg-size-[0%_2px] bg-bottom bg-no-repeat group-hover:bg-size-[100%_2px] [transition:background-size_300ms_cubic-bezier(0.4,0,0.2,1),color_200ms] aria-[current=page]:text-joel-violet aria-[current=page]:bg-size-[100%_2px] inline-flex items-center gap-1"
        >
          {link.label}
          <svg
            aria-hidden="true"
            width="10"
            height="10"
            viewBox="0 0 12 12"
            className="opacity-50 group-hover:opacity-100 group-hover:rotate-180 transition-transform duration-300"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        {/* Mega-menu hover — invisible mais "pointer-events-auto" sur la zone, slide-down au reveal */}
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-[opacity,visibility] duration-200 z-50 pointer-events-none group-hover:pointer-events-auto"
          aria-hidden="true"
        >
          <div className="w-[440px] bg-white rounded-2xl shadow-2xl shadow-joel-violet/15 border border-zinc-100 overflow-hidden">
            {/* Header mini */}
            <div className="px-5 pt-4 pb-2 border-b border-zinc-100 bg-linear-to-br from-joel-violet/5 to-joel-mauve/5">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-joel-violet">
                Services {link.label.toLowerCase()}
              </p>
            </div>

            {/* Grille 2 colonnes des sous-services */}
            <ul className="grid grid-cols-2 gap-1 p-2">
              {link.subServices.map((sub) => (
                <li key={sub.href}>
                  <Link
                    href={sub.href}
                    className="block px-3 py-2.5 rounded-lg hover:bg-joel-violet/5 transition-colors group/sub"
                  >
                    <p className="text-sm font-semibold text-zinc-900 group-hover/sub:text-joel-violet transition-colors">
                      {sub.label}
                    </p>
                    {sub.desc && (
                      <p className="text-[11px] text-zinc-500 leading-snug mt-0.5">
                        {sub.desc}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Footer mega-menu : voir tous les services + lien hub */}
            {link.allServicesHref && (
              <div className="border-t border-zinc-100 px-5 py-3 bg-zinc-50/50 flex items-center justify-between">
                <Link
                  href={link.allServicesHref}
                  className="text-xs font-semibold text-joel-violet hover:underline inline-flex items-center gap-1"
                >
                  Voir tous les tarifs →
                </Link>
                <Link
                  href={link.href}
                  className="text-xs font-medium text-zinc-500 hover:text-joel-violet transition-colors"
                >
                  Page {link.label.toLowerCase()} complète
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Lien simple (Anti-arnaque)
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: [4, 0] }}
      transition={{ duration: 0.35, delay: 0.1 + index * 0.05, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link
        href={link.href}
        aria-current={isActive ? "page" : undefined}
        className="relative text-sm font-medium text-zinc-700 hover:text-joel-violet transition-colors duration-200 bg-linear-to-r from-joel-yellow to-joel-yellow bg-size-[0%_2px] bg-bottom bg-no-repeat hover:bg-size-[100%_2px] [transition:background-size_300ms_cubic-bezier(0.4,0,0.2,1),color_200ms] aria-[current=page]:text-joel-violet aria-[current=page]:bg-size-[100%_2px]"
      >
        {link.label}
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawer mobile — slide-in droite
// ─────────────────────────────────────────────────────────────────────────────

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  onCallClick: () => void;
  pathname: string | null;
}

function MobileDrawer({ isOpen, onClose, phone, onCallClick, pathname }: MobileDrawerProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-zinc-900/30 backdrop-blur-xs md:hidden"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.8 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[82%] max-w-sm bg-white shadow-2xl shadow-joel-violet/20 md:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
          >
            {/* Header drawer */}
            <div className="flex items-center justify-between h-16 px-5 border-b border-zinc-200/60">
              <Link href="/" onClick={onClose} className="inline-flex items-center">
                <Image
                  src="/logo.webp"
                  alt="Joël"
                  width={140}
                  height={45}
                  className="h-9 w-auto"
                  priority
                />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le menu"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full text-zinc-600 hover:text-joel-violet hover:bg-joel-violet/5 transition-colors"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            {/* Liens nav verticaux */}
            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className={
                          link.highlight
                            ? "block px-4 py-3 rounded-xl text-base font-semibold text-joel-violet bg-joel-yellow/30 hover:bg-joel-yellow/50 transition-colors aria-[current=page]:bg-joel-yellow/70"
                            : "block px-4 py-3 rounded-xl text-base font-medium text-zinc-800 hover:text-joel-violet hover:bg-joel-violet/5 transition-colors aria-[current=page]:text-joel-violet aria-[current=page]:bg-joel-violet/5"
                        }
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* CTA bottom drawer */}
            <div className="border-t border-zinc-200/60 p-5">
              <a
                href={`tel:${formatPhoneForTel(phone)}`}
                data-placement="nav-main"
                onClick={() => {
                  onCallClick();
                  onClose();
                }}
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-gradient-joel text-white text-base font-bold shadow-lg shadow-joel-violet/30 hover:shadow-xl hover:shadow-joel-violet/40 transition-all"
              >
                <Phone size={18} aria-hidden="true" />
                <span>{phone}</span>
              </a>
              <p className="mt-3 text-center text-xs text-zinc-500">
                24h/24 · Appel gratuit · Sans engagement
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation — composant principal
// ─────────────────────────────────────────────────────────────────────────────

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { config } = useSiteConfig();
  const pathname = usePathname();

  // Scroll detection : > 80px → header plus opaque + shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll quand drawer ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Tracking GTM — placement nav_main
  const handleCallClick = useCallback(() => {
    if (typeof window !== "undefined") {
      const w = window as Window & { dataLayer?: Array<Record<string, unknown>> };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "click_to_call",
        phone_number: config.phone_number,
        placement: "nav_main",
      });
    }
  }, [config.phone_number]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out border-b ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/95 backdrop-blur-md border-zinc-200/70 shadow-[0_4px_20px_-8px_rgba(112,85,167,0.15)]"
            : "bg-white/85 backdrop-blur-md border-zinc-200/50"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo gauche */}
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link
                href="/"
                aria-label="Joël - Retour à l'accueil"
                className="inline-flex items-center"
              >
                <Image
                  src="/logo.webp"
                  alt="Joël - Dépannage d'urgence"
                  width={180}
                  height={56}
                  className="h-9 md:h-11 w-auto"
                  priority
                  fetchPriority="high"
                />
              </Link>
            </motion.div>

            {/* Nav centrale desktop */}
            <div className="hidden md:flex items-center gap-7 lg:gap-9">
              {navLinks.map((link, i) => (
                <DesktopNavLink
                  key={link.href}
                  link={link}
                  index={i}
                  isActive={pathname === link.href}
                />
              ))}
            </div>

            {/* CTA téléphone droite (desktop) */}
            <div className="hidden md:flex items-center">
              <motion.a
                initial={false}
                animate={{ opacity: 1, y: [4, 0] }}
                transition={{ duration: 0.35, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                href={`tel:${formatPhoneForTel(config.phone_number)}`}
                onClick={handleCallClick}
                data-placement="nav-main"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-joel text-white text-sm font-bold shadow-md shadow-joel-violet/20 hover:shadow-lg hover:shadow-joel-violet/30 transition-all"
              >
                <Phone size={15} aria-hidden="true" />
                <span>{config.phone_number}</span>
              </motion.a>
            </div>

            {/* Section mobile */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={`tel:${formatPhoneForTel(config.phone_number)}`}
                onClick={handleCallClick}
                data-placement="nav-main"
                aria-label={`Appeler le ${config.phone_number}`}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-joel text-white shadow-md shadow-joel-violet/20"
              >
                <Phone size={18} aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Ouvrir le menu"
                aria-expanded={isMobileMenuOpen}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full text-zinc-700 hover:text-joel-violet hover:bg-joel-violet/5 transition-colors"
              >
                <Menu size={24} aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Drawer mobile — slide-in droite */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        phone={config.phone_number}
        onCallClick={handleCallClick}
        pathname={pathname}
      />
    </>
  );
}
