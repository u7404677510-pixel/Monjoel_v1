"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/plomberie", label: "Plomberie" },
  { href: "/electricite", label: "Électricité" },
  { href: "/serrurerie", label: "Serrurerie" },
  { href: "/stop-arnaques", label: "Anti-arnaque" },
];

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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-joel-violet font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Phone only in header */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${formatPhoneForTel(config.phone_number)}`}
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
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-joel-violet font-medium transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={`tel:${formatPhoneForTel(config.phone_number)}`}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-joel text-white font-semibold rounded-full mt-2"
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
