"use client";

/**
 * MetierServicesGrid — grille tarifaire générique paramétrable par métier.
 *
 * DA Purple stricte : joel-violet, joel-mauve, joel-yellow.
 * Lit `lib/data/services-definition.ts` pour les services du métier passé en prop.
 * Layout : 3 colonnes desktop / 2 tablet / 1 mobile.
 * Hover : translate-y + shadow violet.
 * Animation entrée : opacity 1 -> 1 (visible) + y subtil pour éviter le bug invisible.
 */

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  AlertTriangle,
  BadgeCheck,
  CheckCircle,
  Clock,
  Copy,
  Cylinder,
  DoorClosed,
  Droplets,
  Euro,
  Flame,
  Key,
  KeyRound,
  LayoutGrid,
  Lock,
  LockKeyhole,
  Power,
  Replace,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShowerHead,
  Store,
  Thermometer,
  ToggleLeft,
  Unplug,
  Vault,
  Waves,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { getServicesByTrade } from "@/lib/data/services-definition";

type MetierSlug = "plombier" | "serrurier" | "electricien";

interface MetierServicesGridProps {
  metier: MetierSlug;
  title?: string;
  subtitle?: string;
  /** Limiter le nombre de services affichés (default: 6) */
  limit?: number;
}

// Map des noms d'icônes string -> composant Lucide
const ICON_MAP: Record<string, LucideIcon> = {
  AlertTriangle,
  BadgeCheck,
  CheckCircle,
  Clock,
  Copy,
  Cylinder,
  DoorClosed,
  Droplets,
  Euro,
  Flame,
  Key,
  KeyRound,
  LayoutGrid,
  Lock,
  LockKeyhole,
  Power,
  Replace,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShowerHead,
  Store,
  Thermometer,
  ToggleLeft,
  Unplug,
  Vault,
  Waves,
  Wrench,
  Zap,
};

const DEFAULTS: Record<MetierSlug, { title: string; subtitle: string; gradientLabel: string }> = {
  plombier: {
    title: "Nos services plomberie",
    subtitle: "Prix fixes annoncés avant intervention. Aucune majoration nuit/week-end.",
    gradientLabel: "plomberie",
  },
  serrurier: {
    title: "Nos services serrurerie",
    subtitle: "Ouverture sans dégâts en priorité. Devis annoncé au téléphone, prix fixe à la facture.",
    gradientLabel: "serrurerie",
  },
  electricien: {
    title: "Nos services électricité",
    subtitle: "Diagnostic gratuit. Artisans habilités BR / B1V / B2V. Mise aux normes NF C 15-100.",
    gradientLabel: "électricité",
  },
};

export default function MetierServicesGrid({
  metier,
  title,
  subtitle,
  limit = 6,
}: MetierServicesGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const services = getServicesByTrade(metier).slice(0, limit);
  const meta = DEFAULTS[metier];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-joel-yellow-light border border-joel-yellow/40 rounded-full mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-joel-violet">
              Tarifs fixes garantis
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {title ?? meta.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gradient-text">{meta.gradientLabel}</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            {subtitle ?? meta.subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.icon] ?? Wrench;
            const href = `/${metier}/${service.slug}`;
            const isUrgent = service.urgencyLevel === "high";

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 1, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
              >
                <Link
                  href={href}
                  className="group relative flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(112,85,167,0.35)] hover:border-joel-violet/40"
                >
                  {/* Top row: icon + urgency tag */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-joel flex items-center justify-center shadow-md shadow-joel-violet/20">
                      <Icon size={22} className="text-white" />
                    </div>
                    {isUrgent && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-joel-yellow text-gray-900 px-2 py-1 rounded-full">
                        <Clock size={10} />
                        Urgent
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-joel-violet transition-colors">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-5 flex-1 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Footer: price + arrow */}
                  <div className="flex items-end justify-between border-t border-zinc-100 pt-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-0.5">
                        À partir de
                      </p>
                      <p className="font-display text-2xl font-bold text-joel-violet">
                        {service.priceFrom}
                        <span className="text-base align-top">€</span>
                      </p>
                    </div>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-joel-yellow-light text-joel-violet group-hover:bg-joel-yellow group-hover:translate-x-1 transition-all duration-300">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer reassurance */}
        <motion.div
          initial={{ opacity: 1, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-500"
        >
          <span className="inline-flex items-center gap-2">
            <Shield size={16} className="text-joel-violet" />
            Prix annoncé au téléphone = prix payé sur la facture
          </span>
          <span className="hidden sm:inline text-gray-300">•</span>
          <span className="inline-flex items-center gap-2">
            <Clock size={16} className="text-joel-violet" />
            Intervention en 30 min, 24h/24
          </span>
        </motion.div>
      </div>
    </section>
  );
}
