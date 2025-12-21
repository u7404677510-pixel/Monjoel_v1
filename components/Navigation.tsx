"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

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
  { href: "/serrurier/ouverture-sans-percage", label: "Ouverture sans perçage" },
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
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
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
          </motion.div>
        )}
      </AnimatePresence>
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
        >
          <ChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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

          {/* CTA Button - Phone only in header */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${formatPhoneForTel(config.phone_number)}`}
              data-placement="header"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-joel text-white font-semibold rounded-full hover:shadow-lg transition-all"
            >
              <Phone size={18} />
              <span>{config.phone_number}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 bg-white"
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
