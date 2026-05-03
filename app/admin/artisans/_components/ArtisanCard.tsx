"use client";

/**
 * ArtisanCard — carte d'un artisan en vue grid.
 *
 * - Avatar gradient `from-joel-violet to-joel-mauve` (initiales en font-display)
 * - Nom + métiers badges
 * - Statut badge live (dot pulsant si "intervention")
 * - Stats : interventions / rating
 * - Zones (chips compacts)
 * - Hover : translate-y -2px + shadow-md
 * - Actions : Tel / Email / Edit
 */

import { motion } from "motion/react";
import { Phone, Mail, Star, MapPin, Edit2, Wrench, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Artisan } from "@/lib/schemas/artisan";
import { STATUS_CONFIG, TRADE_ICONS } from "./status-config";

interface Props {
  artisan: Artisan;
  index?: number;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  onEdit?: (artisan: Artisan) => void;
  onDelete?: (artisan: Artisan) => void;
}

export function ArtisanCard({
  artisan,
  index = 0,
  selected,
  onToggleSelect,
  onEdit,
  onDelete,
}: Props) {
  const sc = STATUS_CONFIG[artisan.status] ?? STATUS_CONFIG.active;

  return (
    <motion.div
      layout
      initial={{ opacity: 0.5, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.03 + Math.min(index, 12) * 0.025,
      }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative bg-white border rounded-2xl p-5 transition-shadow",
        "hover:shadow-md",
        selected
          ? "border-joel-violet ring-2 ring-joel-violet/20"
          : "border-zinc-200 hover:border-joel-violet/30"
      )}
    >
      {/* Checkbox sélection (top-left, apparaît au hover ou si sélectionné) */}
      {onToggleSelect && (
        <button
          type="button"
          onClick={() => onToggleSelect(artisan.id)}
          aria-label={
            selected ? "Désélectionner cet artisan" : "Sélectionner cet artisan"
          }
          className={cn(
            "absolute top-3 left-3 w-5 h-5 rounded-sm border-2 transition-all flex items-center justify-center z-10",
            selected
              ? "bg-joel-violet border-joel-violet text-white opacity-100"
              : "bg-white border-zinc-300 opacity-0 group-hover:opacity-100 hover:border-joel-violet"
          )}
        >
          {selected && (
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-3 h-3"
              aria-hidden
            >
              <path
                d="M3 8l3 3 7-7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      )}

      {/* Header avatar + nom + statut */}
      <div className="flex items-start gap-3 mb-4">
        <Avatar artisan={artisan} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-zinc-900 truncate">
            {artisan.first_name} {artisan.last_name}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="relative flex h-2 w-2">
              {sc.pulse && (
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping",
                    sc.dotClass
                  )}
                />
              )}
              <span
                className={cn(
                  "relative inline-flex h-2 w-2 rounded-full",
                  sc.dotClass
                )}
              />
            </span>
            <span
              className={cn(
                "text-[11px] font-semibold px-1.5 py-0.5 rounded-full border",
                sc.badgeClass
              )}
            >
              {sc.label}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(artisan)}
              aria-label="Modifier"
              className="p-1.5 text-zinc-400 hover:text-joel-violet hover:bg-joel-violet/10 rounded-lg transition-colors"
            >
              <Edit2 size={14} />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(artisan)}
              aria-label="Supprimer"
              className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Stats : interventions / rating */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-zinc-50 rounded-lg px-3 py-2 text-center">
          <p className="text-sm font-bold text-zinc-800">
            {artisan.total_interventions ?? 0}
          </p>
          <p className="text-[10px] text-zinc-500">Interventions</p>
        </div>
        <div className="bg-zinc-50 rounded-lg px-3 py-2 text-center">
          <div className="flex items-center justify-center gap-1">
            <Star size={11} className="text-joel-yellow fill-joel-yellow" />
            <p className="text-sm font-bold text-zinc-800">
              {(artisan.rating ?? 0).toFixed(1)}
            </p>
          </div>
          <p className="text-[10px] text-zinc-500">Note moyenne</p>
        </div>
      </div>

      {/* Métiers */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {artisan.trades.length === 0 ? (
          <span className="text-[11px] text-zinc-400 italic">
            Aucun métier renseigné
          </span>
        ) : (
          artisan.trades.map((t) => {
            const Icon =
              (TRADE_ICONS as Record<string, typeof Wrench>)[t] ?? Wrench;
            return (
              <Badge
                key={t}
                variant="primary"
                className="text-[11px] font-semibold"
              >
                <Icon size={10} />
                {t}
              </Badge>
            );
          })
        )}
      </div>

      {/* Zones */}
      {artisan.zones.length > 0 && (
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mb-3">
          <MapPin size={11} className="shrink-0" />
          <div className="flex flex-wrap gap-1">
            {artisan.zones.map((z) => (
              <span
                key={z}
                className="px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-600 font-semibold"
              >
                {z}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-zinc-100">
        <a
          href={`tel:${artisan.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-joel-violet/5 hover:bg-joel-violet/10 text-joel-violet py-2 rounded-lg text-xs font-semibold transition-colors"
        >
          <Phone size={13} />
          Appeler
        </a>
        {artisan.email && (
          <a
            href={`mailto:${artisan.email}`}
            aria-label="Envoyer un email"
            className="p-2 bg-joel-violet/10 hover:bg-joel-violet/20 text-joel-violet rounded-lg transition-colors"
          >
            <Mail size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

function Avatar({ artisan }: { artisan: Artisan }) {
  const initials = (
    (artisan.first_name?.[0] ?? "") + (artisan.last_name?.[0] ?? "")
  ).toUpperCase();

  if (artisan.avatar_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={artisan.avatar_url}
        alt={`${artisan.first_name} ${artisan.last_name}`}
        className="w-12 h-12 rounded-full object-cover shrink-0 border border-zinc-200"
      />
    );
  }

  return (
    <div className="w-12 h-12 rounded-full bg-linear-to-br from-joel-violet to-joel-mauve flex items-center justify-center text-white font-display font-bold text-lg shrink-0">
      {initials || "JD"}
    </div>
  );
}

// Re-export pour usage dans la table
export function ArtisanAvatar({ artisan, size = 36 }: { artisan: Artisan; size?: number }) {
  const initials = (
    (artisan.first_name?.[0] ?? "") + (artisan.last_name?.[0] ?? "")
  ).toUpperCase();

  if (artisan.avatar_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={artisan.avatar_url}
        alt={`${artisan.first_name} ${artisan.last_name}`}
        style={{ width: size, height: size }}
        className="rounded-full object-cover border border-zinc-200"
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className="rounded-full bg-linear-to-br from-joel-violet to-joel-mauve flex items-center justify-center text-white font-display font-bold shrink-0"
    >
      {initials || "JD"}
    </div>
  );
}

