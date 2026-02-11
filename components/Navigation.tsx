"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";
import QuickQuoteForm from "./QuickQuoteForm";

const plomberieSubLinks = [
  { href: "/plombier/fuite-eau", label: "Fuite d'eau" },
  { href: "/plombier/wc-bouches", label: "WC bouchés" },
  { href: "/plombier/degat-des-eaux", label: "Dégât des eaux" },
  { href: "/plombier/chauffe-eau-panne", label: "Chauffe-eau en panne" },
  { href: "/plombier/remplacement-robinet", label: "Remplacement robinet" },
];

const electriciteSubLinks = [
  { href: "/electricien/panne-electrique", label: "Panne électrique" },
  { href: "/electricien/disjoncteur-saute", label: "Disjoncteur qui saute" },
  { href: "/electricien/tableau-electrique", label: "Tableau électrique" },
  { href: "/electricien/prise-interrupteur-hs", label: "Prise / Interrupteur HS" },
  { href: "/electricien/court-circuit", label: "Court-circuit" },
  { href: "/electricien/mise-aux-normes", label: "Mise aux normes" },
];

const serrurerieSubLinks = [
  { href: "/serrurier/ouverture-sans-percage", label: "Ouverture porte claquée" },
  { href: "/serrurier/ouverture-avec-percage", label: "Ouverture avec perçage" },
  { href: "/serrurier/perte-cles", label: "Perte de clés" },
  { href: "/serrurier/cle-cassee-serrure", label: "Clé cassée" },
  { href: "/serrurier/blindage-porte", label: "Blindage de porte" },
];

interface NavLinkWithDropdown {
  href: string;
  label: string;
  subLinks?: { href: string; label: string }[];
  highlight?: boolean;
}

const navLinks: NavLinkWithDropdown[] = [
  { href: "/", label: "Accueil" },
  { href: "/plomberie", label: "Plomberie", subLinks: plomberieSubLinks },
  { href: "/electricite", label: "Électricité", subLinks: electriciteSubLinks },
  { href: "/serrurerie", label: "Serrurerie", subLinks: serrurerieSubLinks },
  { href: "/truescope", label: "TrueScope" },
  { href: "/stop-arnaques", label: "Anti-arnaque" },
  { href: "/recrutement", label: "Nous recrutons", highlight: true },
];

function DropdownMenu({ link, onClose }: { link: NavLinkWithDropdown; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  if (!link.subLinks) {
    return (
      <Link
        href={link.href}
        className={`text-[13px] tracking-wide transition-all duration-200 ${
          link.highlight
            ? "text-joel-violet font-semibold bg-joel-yellow/25 hover:bg-joel-yellow/40 px-3.5 py-1.5 rounded-full"
            : "text-gray-600 hover:text-gray-900 font-normal"
        }`}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={link.href}
        className="flex items-center gap-0.5 text-[13px] text-gray-600 hover:text-gray-900 font-normal tracking-wide transition-all duration-200 py-2"
      >
        {link.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      {/* Zone invisible pour garder le hover entre le lien et le dropdown */}
      <div className="absolute top-full left-0 w-full h-2" />

      <div
        className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100/80 overflow-hidden z-50 transition-all duration-200 origin-top ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="py-1.5">
          {link.subLinks.map((subLink) => (
            <Link
              key={subLink.href}
              href={subLink.href}
              onClick={onClose}
              className="block px-4 py-2.5 text-[13px] text-gray-500 hover:text-joel-violet hover:bg-gray-50/80 transition-all duration-150"
            >
              {subLink.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileDropdown({ link, onClose }: { link: NavLinkWithDropdown; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!link.subLinks) {
    return (
      <Link
        href={link.href}
        onClick={onClose}
        className={`transition-all duration-200 py-2.5 ${
          link.highlight
            ? "text-joel-violet font-semibold bg-joel-yellow/15 hover:bg-joel-yellow/30 px-4 rounded-xl text-[15px]"
            : "text-gray-800 hover:text-joel-violet font-normal text-[15px] px-1"
        }`}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          href={link.href}
          onClick={onClose}
          className="text-gray-800 hover:text-joel-violet font-normal transition-all duration-200 py-2.5 text-[15px] px-1"
        >
          {link.label}
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-400 hover:text-joel-violet transition-colors"
          aria-label={isOpen ? "Fermer le sous-menu" : "Ouvrir le sous-menu"}
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-250 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-4 border-l border-gray-200 ml-3 space-y-0.5 pb-1">
          {link.subLinks.map((subLink) => (
            <Link
              key={subLink.href}
              href={subLink.href}
              onClick={onClose}
              className="block py-2 text-[13px] text-gray-400 hover:text-joel-violet transition-colors"
            >
              {subLink.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const { config } = useSiteConfig();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/80 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          : "bg-white/60 backdrop-blur-xl"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Logo />

          {/* Desktop Navigation - centré */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <DropdownMenu key={link.href} link={link} onClose={closeMobileMenu} />
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href={`tel:${formatPhoneForTel(config.phone_number)}`}
              data-placement="header"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-joel text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all duration-200"
            >
              <Phone size={14} />
              <span>{config.phone_number}</span>
            </a>
            <button
              onClick={() => setShowQuoteModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-gray-600 text-[13px] font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:text-gray-900 transition-all duration-200"
            >
              <span>Devis gratuit</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Right Section */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href={`tel:${formatPhoneForTel(config.phone_number)}`}
              data-placement="header-mobile"
              className="flex items-center justify-center w-9 h-9 bg-gray-900 text-white rounded-full"
              aria-label="Appeler"
            >
              <Phone size={15} />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-[600px] opacity-100 pb-6"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-2 border-t border-gray-100">
            <div className="flex flex-col gap-0.5 mt-2">
              {navLinks.map((link) => (
                <MobileDropdown key={link.href} link={link} onClose={closeMobileMenu} />
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setShowQuoteModal(true);
                  closeMobileMenu();
                }}
                className="flex items-center justify-center gap-2 py-3 bg-gray-900 text-white text-[15px] font-medium rounded-2xl transition-all duration-200"
              >
                <span>Demander un devis gratuit</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Quote Modal */}
      {showQuoteModal && (
        <QuickQuoteForm
          variant="modal"
          onClose={() => setShowQuoteModal(false)}
        />
      )}
    </header>
  );
}
