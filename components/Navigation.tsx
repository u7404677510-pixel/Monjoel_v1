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
}

const navLinks: NavLinkWithDropdown[] = [
  { href: "/", label: "Accueil" },
  { href: "/plomberie", label: "Plomberie", subLinks: plomberieSubLinks },
  { href: "/electricite", label: "Électricité", subLinks: electriciteSubLinks },
  { href: "/serrurerie", label: "Serrurerie", subLinks: serrurerieSubLinks },
  { href: "/stop-arnaques", label: "Anti-arnaque" },
];

function DropdownMenu({ link, onClose }: { link: NavLinkWithDropdown; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  if (!link.subLinks) {
    return (
      <Link
        href={link.href}
        className="text-gray-700 hover:text-joel-violet font-medium transition-colors"
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
        className="flex items-center gap-1 text-gray-700 hover:text-joel-violet font-medium transition-colors"
      >
        {link.label}
        <ChevronDown size={16} className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
      </Link>

      <div
        className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 transition-all duration-150 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="py-2">
          {link.subLinks.map((subLink) => (
            <Link
              key={subLink.href}
              href={subLink.href}
              onClick={onClose}
              className="block px-4 py-2.5 text-sm text-gray-600 hover:text-joel-violet hover:bg-joel-violet/5 transition-colors"
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
        className="text-gray-700 hover:text-joel-violet font-medium transition-colors py-2"
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
          className="text-gray-700 hover:text-joel-violet font-medium transition-colors py-2"
        >
          {link.label}
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-500 hover:text-joel-violet"
          aria-label={isOpen ? "Fermer le sous-menu" : "Ouvrir le sous-menu"}
        >
          <ChevronDown size={18} className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-4 border-l-2 border-joel-violet/20 ml-2 space-y-1">
          {link.subLinks.map((subLink) => (
            <Link
              key={subLink.href}
              href={subLink.href}
              onClick={onClose}
              className="block py-2 text-sm text-gray-500 hover:text-joel-violet transition-colors"
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/95 backdrop-blur-lg shadow-lg"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <DropdownMenu key={link.href} link={link} onClose={closeMobileMenu} />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${formatPhoneForTel(config.phone_number)}`}
              data-placement="header"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-joel text-white font-semibold rounded-full hover:shadow-lg transition-all"
            >
              <Phone size={18} />
              <span>{config.phone_number}</span>
            </a>
            <button
              onClick={() => setShowQuoteModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-joel-violet font-semibold rounded-full border-2 border-joel-violet/20 hover:border-joel-violet hover:bg-joel-violet/5 transition-all"
            >
              <span>Demander un devis</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden mt-4 pb-4 bg-white overflow-hidden transition-all duration-200 ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <MobileDropdown key={link.href} link={link} onClose={closeMobileMenu} />
            ))}
            <a
              href={`tel:${formatPhoneForTel(config.phone_number)}`}
              data-placement="header-mobile"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-joel text-white font-semibold rounded-full mt-4"
            >
              <Phone size={18} />
              <span>{config.phone_number}</span>
            </a>
            <button
              onClick={() => {
                setShowQuoteModal(true);
                closeMobileMenu();
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-joel-violet font-semibold rounded-full border-2 border-joel-violet/20 hover:border-joel-violet mt-2"
            >
              <span>Demander un devis</span>
              <ArrowRight size={16} />
            </button>
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
