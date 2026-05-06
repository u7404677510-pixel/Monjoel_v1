/**
 * Schémas Zod & types partagés pour la ressource `artisans`.
 *
 * - `artisanSchema`     : payload du formulaire (création / édition).
 * - `Artisan`           : ligne complète telle que renvoyée par Supabase.
 * - `ArtisanFormValues` : valeurs validées du formulaire (typed via Zod).
 *
 * Convention de statut : la base utilise `active` / `inactive` / `on_intervention`
 * (cf. `lib/supabase-migration.sql`). Le schéma Zod expose les MÊMES valeurs
 * pour éviter toute traduction côté client (les libellés FR sont gérés par
 * `STATUS_CONFIG` dans `app/admin/artisans/_components/status-config.ts`).
 */

import { z } from "zod";

// ─── Constantes métier ───────────────────────────────────────────────────────

export const TRADES = ["Plomberie", "Serrurerie", "Électricité"] as const;
export type Trade = (typeof TRADES)[number];

export const ZONES_IDF = ["75", "77", "78", "91", "92", "93", "94", "95"] as const;
export type ZoneIDF = (typeof ZONES_IDF)[number];

export const ARTISAN_STATUSES = ["active", "on_intervention", "inactive"] as const;
export type ArtisanStatus = (typeof ARTISAN_STATUSES)[number];

// ─── Regex téléphone FR ──────────────────────────────────────────────────────
// Accepte `+33 6 12 34 56 78`, `06 12 34 56 78`, `06.12.34.56.78`, `0612345678`.
export const PHONE_FR_REGEX = /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

// ─── Schéma form ─────────────────────────────────────────────────────────────

export const artisanSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "Prénom requis (2 caractères minimum)")
    .max(60, "Prénom trop long"),
  last_name: z
    .string()
    .trim()
    .min(2, "Nom requis (2 caractères minimum)")
    .max(60, "Nom trop long"),
  email: z
    .string()
    .trim()
    .email("Email invalide")
    .max(120, "Email trop long")
    .or(z.literal(""))
    .optional()
    .nullable(),
  phone: z
    .string()
    .trim()
    .regex(PHONE_FR_REGEX, "Téléphone FR invalide (ex : 06 12 34 56 78)"),
  trades: z
    .array(z.enum(TRADES))
    .min(1, "Sélectionner au moins un métier"),
  zones: z
    .array(z.enum(ZONES_IDF))
    .min(1, "Sélectionner au moins une zone"),
  status: z.enum(ARTISAN_STATUSES),
  rating: z
    .number()
    .min(0, "Note minimale : 0")
    .max(5, "Note maximale : 5")
    .optional()
    .nullable(),
  bio: z
    .string()
    .max(500, "Bio trop longue (500 caractères max)")
    .optional()
    .nullable(),
  avatar_url: z
    .string()
    .url("URL invalide")
    .or(z.literal(""))
    .optional()
    .nullable(),
});

export type ArtisanFormValues = z.infer<typeof artisanSchema>;

// ─── Type Supabase complet ───────────────────────────────────────────────────

export interface Artisan {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string;
  trades: string[];
  zones: string[];
  status: ArtisanStatus;
  rating: number;
  total_interventions: number;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const emptyArtisanForm = (): ArtisanFormValues => ({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  trades: [],
  zones: [],
  status: "active",
  rating: 5,
  bio: "",
  avatar_url: "",
});

export function artisanToFormValues(a: Artisan): ArtisanFormValues {
  return {
    first_name: a.first_name,
    last_name: a.last_name,
    email: a.email ?? "",
    phone: a.phone,
    trades: (a.trades ?? []).filter((t): t is Trade =>
      (TRADES as readonly string[]).includes(t)
    ),
    zones: (a.zones ?? []).filter((z): z is ZoneIDF =>
      (ZONES_IDF as readonly string[]).includes(z)
    ),
    status: a.status,
    rating: a.rating ?? 5,
    bio: a.bio ?? "",
    avatar_url: a.avatar_url ?? "",
  };
}
