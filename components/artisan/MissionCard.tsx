"use client";

/**
 * MissionCard — carte mission compacte/full pour la liste artisan.
 *
 * Variants:
 *  - "compact": dashboard preview (3 missions next), inline actions minimales
 *  - "full":    page missions, full actions selon status
 *
 * Affiche heure, badge status, adresse, type, distance estimée, boutons actions.
 */

import { motion } from "motion/react";
import {
  Clock,
  MapPin,
  Phone,
  Wrench,
  Droplets,
  Key,
  Zap,
  AlertCircle,
  CheckCircle,
  Navigation as NavIcon,
  Play,
  X,
  Check,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  useUpdateMissionStatus,
  type ArtisanMission,
  type MissionStatus,
} from "@/lib/hooks/artisan-queries";

const tradeIcons: Record<string, React.ElementType> = {
  Plomberie: Droplets,
  Serrurerie: Key,
  Électricité: Zap,
};

export const STATUS_META: Record<
  MissionStatus,
  { label: string; tone: string; dot: string }
> = {
  pending: {
    label: "En attente",
    tone: "text-amber-200 bg-amber-400/10 border-amber-400/30",
    dot: "bg-amber-400",
  },
  scheduled: {
    label: "Planifiée",
    tone: "text-sky-200 bg-sky-400/10 border-sky-400/30",
    dot: "bg-sky-400",
  },
  en_route: {
    label: "En route",
    tone: "text-indigo-200 bg-indigo-400/10 border-indigo-400/30",
    dot: "bg-indigo-400",
  },
  in_progress: {
    label: "En cours",
    tone: "text-joel-mauve bg-joel-mauve/15 border-joel-mauve/40",
    dot: "bg-joel-mauve",
  },
  completed: {
    label: "Terminée",
    tone: "text-emerald-200 bg-emerald-400/10 border-emerald-400/30",
    dot: "bg-emerald-400",
  },
  cancelled: {
    label: "Annulée",
    tone: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
    dot: "bg-zinc-500",
  },
};

function formatTime(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRelTime(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const diff = d.getTime() - Date.now();
  if (Math.abs(diff) < 60_000) return "maintenant";
  const minutes = Math.round(diff / 60_000);
  if (Math.abs(minutes) < 60) return `${minutes > 0 ? "dans " : "il y a "}${Math.abs(minutes)} min`;
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return `${hours > 0 ? "dans " : "il y a "}${Math.abs(hours)}h`;
  const days = Math.round(hours / 24);
  return `${days > 0 ? "dans " : "il y a "}${Math.abs(days)}j`;
}

// Distance estimée mock — basée sur le code postal IDF
function estimateDistance(postalCode: string | null): string {
  if (!postalCode) return "≈ ?";
  const dep = postalCode.slice(0, 2);
  const distMap: Record<string, string> = {
    "75": "≈ 4 km",
    "92": "≈ 8 km",
    "93": "≈ 12 km",
    "94": "≈ 11 km",
    "77": "≈ 28 km",
    "78": "≈ 22 km",
    "91": "≈ 25 km",
    "95": "≈ 18 km",
  };
  return distMap[dep] ?? "≈ 15 km";
}

interface MissionCardProps {
  mission: ArtisanMission;
  variant?: "compact" | "full";
  onOpen?: (mission: ArtisanMission) => void;
}

export function MissionCard({ mission, variant = "full", onOpen }: MissionCardProps) {
  const mutation = useUpdateMissionStatus();
  const meta = STATUS_META[mission.status];
  const TradeIcon = (mission.trade && tradeIcons[mission.trade]) || Wrench;
  const time = mission.scheduled_at
    ? formatTime(mission.scheduled_at)
    : formatTime(mission.created_at);
  const rel = mission.scheduled_at ? formatRelTime(mission.scheduled_at) : "";
  const distance = estimateDistance(mission.postal_code);
  const address = mission.address || (mission.postal_code ? `Code postal ${mission.postal_code}` : "Adresse à confirmer");
  const title =
    mission.client_problem_label ||
    mission.client_problem ||
    mission.trade ||
    "Mission";

  const handleStatus = (next: MissionStatus, label: string) => {
    if (mutation.isPending) return;
    mutation.mutate(
      { id: mission.id, status: next, patch: next === "completed" ? { completed_at: new Date().toISOString() } : undefined },
      {
        onSuccess: () => toast.success(label),
        onError: () => toast.error("Action impossible"),
      }
    );
  };

  const isCompact = variant === "compact";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xs",
        "bg-linear-to-br from-white/6 via-white/3 to-zinc-900/40",
        "hover:border-joel-mauve/40 hover:shadow-[0_8px_24px_-12px_rgba(158,118,236,0.35)]",
        "transition-all"
      )}
    >
      {/* Glow accent */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-joel-mauve/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className={cn("relative", isCompact ? "p-4" : "p-5")}>
        <div className="flex items-start gap-3">
          {/* Time block */}
          <div
            className={cn(
              "flex flex-col items-center justify-center rounded-xl border border-white/10 bg-zinc-950/50 px-3 py-2",
              isCompact ? "min-w-[58px]" : "min-w-[70px]"
            )}
          >
            <span
              className={cn(
                "font-display font-semibold text-joel-yellow leading-none",
                isCompact ? "text-base" : "text-lg"
              )}
            >
              {time}
            </span>
            {rel && (
              <span className="mt-0.5 text-[10px] text-zinc-500">{rel}</span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400">
                  <span className="inline-flex items-center gap-1 rounded-full border border-joel-mauve/30 bg-joel-mauve/10 px-2 py-0.5 font-medium text-joel-mauve">
                    <TradeIcon size={10} />
                    {mission.trade || "Mission"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={10} />
                    {distance}
                  </span>
                </div>
              </div>

              <span
                className={cn(
                  "inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                  meta.tone
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
                {meta.label}
              </span>
            </div>

            <p className="mt-2 truncate text-[11px] text-zinc-300">
              <MapPin size={10} className="mr-1 inline-block -translate-y-px" />
              {address}
            </p>

            {!isCompact && mission.notes && (
              <p className="mt-2 line-clamp-2 rounded-lg border border-white/5 bg-zinc-950/40 px-2.5 py-1.5 text-[11px] text-zinc-400">
                {mission.notes}
              </p>
            )}
          </div>
        </div>

        {/* Actions row */}
        <div className={cn("mt-3 flex items-center gap-2", isCompact && "mt-3")}>
          {isCompact ? (
            <button
              onClick={() => onOpen?.(mission)}
              className="ml-auto inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/4 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Voir détail <ArrowRight size={11} />
            </button>
          ) : (
            <FullActions
              mission={mission}
              onOpen={() => onOpen?.(mission)}
              onStatus={handleStatus}
              loading={mutation.isPending}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Full actions ───────────────────────────────────────────────────────────

function FullActions({
  mission,
  onOpen,
  onStatus,
  loading,
}: {
  mission: ArtisanMission;
  onOpen: () => void;
  onStatus: (next: MissionStatus, label: string) => void;
  loading: boolean;
}) {
  const phone = mission.client_phone;
  const status = mission.status;
  const mapsUrl = mission.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mission.address)}`
    : mission.postal_code
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${mission.postal_code} France`)}`
      : null;

  return (
    <div className="flex flex-wrap items-center gap-2 w-full">
      {phone && (
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-200 hover:bg-emerald-400/20 transition-colors"
        >
          <Phone size={11} /> Appeler
        </a>
      )}

      {mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/4 px-3 py-1.5 text-[11px] font-semibold text-zinc-200 hover:bg-white/10 transition-colors"
        >
          <NavIcon size={11} /> Itinéraire
        </a>
      )}

      <button
        onClick={onOpen}
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-950/40 px-3 py-1.5 text-[11px] font-semibold text-zinc-300 hover:bg-zinc-950/70 transition-colors"
      >
        Détail
      </button>

      {/* Conditional progress buttons */}
      <div className="ml-auto flex items-center gap-1.5">
        {status === "pending" && (
          <>
            <button
              onClick={() => onStatus("scheduled", "Mission acceptée")}
              disabled={loading}
              className="inline-flex items-center gap-1 rounded-lg bg-joel-mauve px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_4px_12px_-4px_rgba(158,118,236,0.5)] hover:bg-joel-mauve/90 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
              Accepter
            </button>
            <button
              onClick={() => onStatus("cancelled", "Mission refusée")}
              disabled={loading}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 px-3 py-1.5 text-[11px] font-semibold text-zinc-300 hover:bg-zinc-800/60 transition-colors"
            >
              <X size={11} /> Refuser
            </button>
          </>
        )}
        {status === "scheduled" && (
          <button
            onClick={() => onStatus("en_route", "En route !")}
            disabled={loading}
            className="inline-flex items-center gap-1 rounded-lg bg-joel-mauve px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_4px_12px_-4px_rgba(158,118,236,0.5)] hover:bg-joel-mauve/90 transition-colors"
          >
            <NavIcon size={11} /> En route
          </button>
        )}
        {status === "en_route" && (
          <button
            onClick={() => onStatus("in_progress", "Intervention démarrée")}
            disabled={loading}
            className="inline-flex items-center gap-1 rounded-lg bg-joel-yellow px-3 py-1.5 text-[11px] font-semibold text-joel-violet shadow-[0_4px_12px_-4px_rgba(245,213,71,0.5)] hover:bg-joel-yellow/90 transition-colors"
          >
            <Play size={11} /> Démarrer
          </button>
        )}
        {status === "in_progress" && (
          <button
            onClick={() => onStatus("completed", "Mission terminée")}
            disabled={loading}
            className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_4px_12px_-4px_rgba(16,185,129,0.5)] hover:bg-emerald-500/90 transition-colors"
          >
            <CheckCircle size={11} /> Terminer
          </button>
        )}
        {status === "completed" && (
          <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-200">
            <CheckCircle size={11} /> Clôturée
          </span>
        )}
        {status === "cancelled" && (
          <span className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 px-3 py-1.5 text-[11px] font-semibold text-zinc-400">
            <AlertCircle size={11} /> Refusée
          </span>
        )}
      </div>
    </div>
  );
}

// Re-export icons
export { Clock };
