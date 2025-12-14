"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import PhoneButton from "@/components/PhoneButton";

const footerLinks = {
  services: [
    { href: "/plomberie", label: "Plomberie" },
    { href: "/electricite", label: "Électricité" },
    { href: "/serrurerie", label: "Serrurerie" },
  ],
  company: [
    { href: "/stop-arnaques", label: "Anti-arnaque" },
    { href: "/a-propos", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/cgu", label: "CGU" },
    { href: "/confidentialite", label: "Politique de confidentialité" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-joel rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <span className="text-2xl font-bold">Joël</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Le dépannage d'urgence sans arnaques. Prix fixes, artisans vérifiés, intervention rapide.
            </p>
            <div className="space-y-3">
              <PhoneButton variant="text" />
              <a href="mailto:contact@monjoel.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail size={18} />
                <span>contact@monjoel.com</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
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
