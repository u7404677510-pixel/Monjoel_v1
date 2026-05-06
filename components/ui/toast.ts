/**
 * Toast — re-export Sonner avec helpers stylés DA Purple.
 *
 * Le `<Toaster />` est monté dans `app/providers.tsx` (richColors + closeButton).
 * On expose ici l'API impérative `toast.*` + helpers spécialisés MonJoël.
 *
 * @example
 * import { toast } from "@/components/ui/toast";
 * toast.success("Lead créé");
 * toast.error("Erreur réseau", { description: "Réessayez dans un instant." });
 * toast.promise(saveLead(), { loading: "Enregistrement…", success: "OK", error: "Échec" });
 */

import { toast as sonnerToast } from "sonner";

type SonnerToast = typeof sonnerToast;

/**
 * Extension de l'API Sonner avec préréglages MonJoël.
 * Les helpers .success / .error / .warning / .info / .promise / .loading / .dismiss
 * sont déjà exposés par sonner — on les re-export tels quels.
 */
export const toast: SonnerToast = sonnerToast;

// Re-export du type pour les wrappers custom
export type { ExternalToast } from "sonner";
