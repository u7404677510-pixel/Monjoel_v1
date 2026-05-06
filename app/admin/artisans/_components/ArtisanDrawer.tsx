"use client";

/**
 * ArtisanDrawer — drawer slide-in droite (w-[520px]) pour création / édition.
 *
 * - React Hook Form + Zod resolver (validation temps réel)
 * - Champs : nom/prénom, email/tel, métiers (cards), zones (pills), statut (radio cards), bio, photo URL
 * - Mutations TanStack via props (création vs édition décidé par `artisan` prop)
 * - Animations Framer Motion (slide-in droite, exit avec ESC ou click overlay)
 * - DA stricte : joel-violet / joel-mauve / joel-yellow
 *
 * Note photo : upload simplifié (URL collée) — pas de bucket Storage pour
 * cette V1. La logique upload medias/ peut être branchée plus tard via
 * `avatar_url`.
 */

import { useEffect, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Save,
  Wrench,
  AlertCircle,
  ImageIcon,
  Loader2,
  CheckCircle2,
  Activity,
  Pause,
  type LucideIcon,
} from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  artisanSchema,
  emptyArtisanForm,
  artisanToFormValues,
  TRADES,
  ZONES_IDF,
  ARTISAN_STATUSES,
  type Artisan,
  type ArtisanFormValues,
  type ArtisanStatus,
} from "@/lib/schemas/artisan";
import { cn } from "@/lib/utils";
import { TRADE_ICONS } from "./status-config";

interface Props {
  open: boolean;
  artisan: Artisan | null; // null = création
  onClose: () => void;
  onSubmit: (values: ArtisanFormValues) => Promise<void> | void;
  submitting?: boolean;
}

export function ArtisanDrawer({
  open,
  artisan,
  onClose,
  onSubmit,
  submitting,
}: Props) {
  const formId = useId();
  const isEdit = !!artisan;

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<ArtisanFormValues>({
    resolver: zodResolver(artisanSchema),
    mode: "onChange",
    defaultValues: emptyArtisanForm(),
  });

  // Reset le form à chaque ouverture / changement d'artisan ciblé
  useEffect(() => {
    if (open) {
      reset(artisan ? artisanToFormValues(artisan) : emptyArtisanForm());
    }
  }, [open, artisan, reset]);

  // ESC pour fermer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const bioValue = watch("bio") ?? "";
  const bioLen = bioValue.length;

  return (
    <AnimatePresence initial={false}>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${formId}-title`}
            className={cn(
              "fixed right-0 top-0 z-50 h-full w-full sm:w-[520px] bg-white shadow-2xl shadow-joel-violet/30",
              "flex flex-col"
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-zinc-100">
              <div>
                <h2
                  id={`${formId}-title`}
                  className="text-lg font-display font-bold text-zinc-900"
                >
                  {isEdit ? "Modifier l'artisan" : "Nouvel artisan"}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {isEdit
                    ? `${artisan!.first_name} ${artisan!.last_name}`
                    : "Ajouter un artisan au réseau"}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form scrollable */}
            <form
              id={formId}
              onSubmit={handleSubmit(async (values) => {
                await onSubmit(values);
              })}
              className="flex-1 overflow-y-auto p-5 space-y-5"
            >
              {/* Nom + Prénom */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Prénom" required error={errors.first_name?.message}>
                  <Input
                    {...register("first_name")}
                    placeholder="Jean"
                    error={!!errors.first_name}
                  />
                </Field>
                <Field label="Nom" required error={errors.last_name?.message}>
                  <Input
                    {...register("last_name")}
                    placeholder="Dupont"
                    error={!!errors.last_name}
                  />
                </Field>
              </div>

              {/* Email + Tel */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Email" error={errors.email?.message}>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="jean.dupont@email.com"
                    error={!!errors.email}
                  />
                </Field>
                <Field label="Téléphone" required error={errors.phone?.message}>
                  <Input
                    type="tel"
                    {...register("phone")}
                    placeholder="06 12 34 56 78"
                    error={!!errors.phone}
                  />
                </Field>
              </div>

              {/* Métiers — cards cliquables */}
              <Field label="Métiers" required error={errors.trades?.message}>
                <Controller
                  control={control}
                  name="trades"
                  render={({ field }) => (
                    <div className="grid grid-cols-3 gap-2">
                      {TRADES.map((t) => {
                        const Icon =
                          (TRADE_ICONS as Record<string, typeof Wrench>)[t] ??
                          Wrench;
                        const active = field.value.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              field.onChange(
                                active
                                  ? field.value.filter((x) => x !== t)
                                  : [...field.value, t]
                              );
                            }}
                            aria-pressed={active}
                            className={cn(
                              "flex flex-col items-center justify-center gap-2 px-3 py-4 rounded-xl border-2 transition-all",
                              active
                                ? "bg-joel-violet/10 border-joel-violet text-joel-violet shadow-xs"
                                : "bg-white border-zinc-200 text-zinc-600 hover:border-joel-violet/40 hover:bg-joel-violet/5"
                            )}
                          >
                            <Icon
                              size={22}
                              strokeWidth={active ? 2.4 : 2}
                            />
                            <span className="text-xs font-semibold">{t}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
              </Field>

              {/* Zones — pills */}
              <Field label="Zones d'intervention" required error={errors.zones?.message}>
                <Controller
                  control={control}
                  name="zones"
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-1.5">
                      {ZONES_IDF.map((z) => {
                        const active = field.value.includes(z);
                        return (
                          <button
                            key={z}
                            type="button"
                            onClick={() => {
                              field.onChange(
                                active
                                  ? field.value.filter((x) => x !== z)
                                  : [...field.value, z]
                              );
                            }}
                            aria-pressed={active}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                              active
                                ? "bg-joel-violet text-white border-joel-violet shadow-xs"
                                : "bg-white text-zinc-700 border-zinc-200 hover:border-joel-violet/40"
                            )}
                          >
                            {z}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
              </Field>

              {/* Statut — radio cards */}
              <Field label="Statut" required error={errors.status?.message}>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <div className="grid grid-cols-3 gap-2">
                      {ARTISAN_STATUSES.map((s) => (
                        <StatusRadioCard
                          key={s}
                          status={s}
                          selected={field.value === s}
                          onSelect={() => field.onChange(s)}
                        />
                      ))}
                    </div>
                  )}
                />
              </Field>

              {/* Bio */}
              <Field
                label="Bio / Notes internes"
                error={errors.bio?.message}
                hint={`${bioLen}/500`}
              >
                <Textarea
                  {...register("bio")}
                  rows={4}
                  placeholder="Spécialités, particularités, retours clients récurrents…"
                  error={!!errors.bio}
                  className="resize-none"
                />
              </Field>

              {/* Avatar URL */}
              <Field
                label="Photo (URL)"
                error={errors.avatar_url?.message}
                hint="Optionnel — URL d'un avatar (sinon initiales sur gradient)"
              >
                <Input
                  {...register("avatar_url")}
                  type="url"
                  placeholder="https://…/avatar.jpg"
                  leftIcon={<ImageIcon className="h-4 w-4" />}
                  error={!!errors.avatar_url}
                />
              </Field>
            </form>

            {/* Footer actions */}
            <div className="border-t border-zinc-100 p-4 bg-zinc-50/50 flex items-center justify-between gap-3">
              {!isValid && Object.keys(errors).length > 0 ? (
                <p className="text-xs text-joel-violet inline-flex items-center gap-1.5">
                  <AlertCircle size={13} />
                  Corrigez les erreurs avant d'enregistrer
                </p>
              ) : (
                <span className="text-xs text-zinc-400">
                  {isEdit
                    ? "Les modifications sont visibles immédiatement"
                    : "Validation Zod en temps réel"}
                </span>
              )}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="md" type="button" onClick={onClose}>
                  Annuler
                </Button>
                <Button
                  type="submit"
                  form={formId}
                  variant="primary"
                  size="md"
                  loading={submitting}
                  leftIcon={
                    submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save size={14} />
                    )
                  }
                >
                  {isEdit ? "Mettre à jour" : "Créer l'artisan"}
                </Button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Field wrapper (label + error) ──────────────────────────────────────────

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-[10px] text-zinc-400">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="mt-1 text-[11px] text-red-600 inline-flex items-center gap-1">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Status radio card ──────────────────────────────────────────────────────

function StatusRadioCard({
  status,
  selected,
  onSelect,
}: {
  status: ArtisanStatus;
  selected: boolean;
  onSelect: () => void;
}) {
  const config: Record<
    ArtisanStatus,
    { icon: LucideIcon; label: string; accent: string }
  > = {
    active: {
      icon: CheckCircle2,
      label: "Actif",
      accent: "text-joel-violet border-emerald-500 bg-joel-violet/5",
    },
    on_intervention: {
      icon: Activity,
      label: "En intervention",
      accent: "text-joel-violet border-joel-violet bg-joel-violet/10",
    },
    inactive: {
      icon: Pause,
      label: "Inactif",
      accent: "text-zinc-600 border-zinc-400 bg-zinc-100",
    },
  };
  const { icon: Icon, label, accent } = config[status];

  return (
    <button
      type="button"
      onClick={onSelect}
      role="radio"
      aria-checked={selected}
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 px-3 py-3 rounded-xl border-2 transition-all",
        selected
          ? accent + " shadow-xs"
          : "bg-white border-zinc-200 text-zinc-500 hover:border-joel-violet/40"
      )}
    >
      <Icon size={18} />
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
