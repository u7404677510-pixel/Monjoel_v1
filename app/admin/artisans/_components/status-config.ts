/**
 * Configuration UI des statuts artisans (libellés FR + couleurs DA Purple).
 * Partagé entre cards, table, drawer, bulk bar, KPI row.
 *
 * DA stricte : `joel-violet`, `emerald-*`, `zinc-*`. Pas de monjoel-*.
 */

import { Droplets, Key, Zap, type LucideIcon } from "lucide-react";
import type { ArtisanStatus, Trade } from "@/lib/schemas/artisan";

export interface StatusUI {
  /** Clé DB (utilisée comme value) */
  key: ArtisanStatus;
  label: string;
  /** Classes pour badge text + bg + border */
  badgeClass: string;
  /** Classe pour le dot (pulsant si "intervention") */
  dotClass: string;
  /** Couleur d'accent KPI ("text-..." utilisable pour gros chiffres) */
  accentClass: string;
  /** Indique si le dot doit pulser (live) */
  pulse?: boolean;
}

export const STATUS_CONFIG: Record<ArtisanStatus, StatusUI> = {
  active: {
    key: "active",
    label: "Actif",
    badgeClass: "text-joel-violet bg-joel-violet/5 border-joel-violet/20",
    dotClass: "bg-joel-violet",
    accentClass: "text-joel-violet",
  },
  on_intervention: {
    key: "on_intervention",
    label: "En intervention",
    badgeClass: "text-joel-violet bg-joel-violet/10 border-joel-violet/20",
    dotClass: "bg-joel-violet",
    accentClass: "text-joel-violet",
    pulse: true,
  },
  inactive: {
    key: "inactive",
    label: "Inactif",
    badgeClass: "text-zinc-600 bg-zinc-50 border-zinc-200",
    dotClass: "bg-zinc-300",
    accentClass: "text-zinc-400",
  },
};

export const TRADE_ICONS: Record<Trade, LucideIcon> = {
  Plomberie: Droplets,
  Serrurerie: Key,
  Électricité: Zap,
};
