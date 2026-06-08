/**
 * Helpers partagés par les composants de l'espace client :
 *  - mapping status lead → label/badge variant/icon
 *  - formatting de date FR
 *  - masquage du téléphone (côté client uniquement, par sécurité visuelle)
 */

import {
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { BadgeProps } from "@/components/ui/badge";

export type LeadStatus = "new" | "contacted" | "converted" | "lost";

export interface Lead {
  id: string;
  problem: string;
  problem_label: string;
  trade: string;
  postal_code: string;
  phone: string;
  source: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  /** Liaison au compte client (RLS). Optionnels — null pour un lead anonyme. */
  user_id?: string | null;
  email?: string | null;
  urgency?: string | null;
  urgency_label?: string | null;
}

export interface StatusMeta {
  label: string;
  short: string;
  icon: LucideIcon;
  badgeVariant: BadgeProps["variant"];
  /** Catégorie pour les filtres tabs : "open" / "done" / "cancelled". */
  bucket: "open" | "done" | "cancelled";
}

export const STATUS_META: Record<LeadStatus, StatusMeta> = {
  new: {
    label: "Demande reçue",
    short: "Nouveau",
    icon: AlertCircle,
    badgeVariant: "primary",
    bucket: "open",
  },
  contacted: {
    label: "Prise en charge",
    short: "En cours",
    icon: Clock,
    badgeVariant: "accent",
    bucket: "open",
  },
  converted: {
    label: "Intervention terminée",
    short: "Terminée",
    icon: CheckCircle,
    badgeVariant: "success",
    bucket: "done",
  },
  lost: {
    label: "Annulée",
    short: "Annulée",
    icon: XCircle,
    badgeVariant: "default",
    bucket: "cancelled",
  },
};

export const FALLBACK_META: StatusMeta = {
  label: "Demande reçue",
  short: "Nouveau",
  icon: Phone,
  badgeVariant: "default",
  bucket: "open",
};

export function getStatusMeta(status: string): StatusMeta {
  return STATUS_META[status as LeadStatus] ?? FALLBACK_META;
}

export function formatDateLong(d: string): string {
  try {
    return new Date(d).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export function formatDateShort(d: string): string {
  try {
    return new Date(d).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
    });
  } catch {
    return d;
  }
}

/** Masque tous sauf les 2 derniers chiffres : 06 12 34 56 78 → •• •• •• •• 78 */
export function maskPhone(phone: string): string {
  if (!phone) return "—";
  const cleaned = phone.replace(/\s+/g, "");
  if (cleaned.length < 4) return phone;
  const last = cleaned.slice(-2);
  return `•• •• •• •• ${last}`;
}

/** Extrait un prénom-friendly de l'email pour la salutation. */
export function emailToFirstName(email: string): string {
  if (!email) return "";
  const local = email.split("@")[0] ?? "";
  // Coupe sur séparateurs courants (., _, -, +)
  const first = local.split(/[._+-]/)[0] ?? local;
  if (!first) return "";
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}
