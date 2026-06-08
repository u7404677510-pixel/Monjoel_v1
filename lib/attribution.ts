/**
 * Attribution marketing (R9) — capture côté client.
 *
 * Objectif "Maximum Lead" : savoir D'OÙ vient chaque lead pour piloter le budget
 * Google Ads (gclid → import de conversions hors ligne) et lire le SEO/UTM.
 *
 * Stockée en localStorage pour survivre à la navigation interne et être
 * disponible au moment de la soumission du formulaire. Aucune dépendance.
 * 100% client : toutes les fonctions sont no-op côté serveur.
 */

export interface Attribution {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
}

const STORAGE_KEY = "monjoel_attribution_v1";

// Paramètres d'URL suivis (clic publicitaire + UTM standard).
const PARAM_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/**
 * Lit l'attribution déjà stockée (ou null). Safe côté serveur.
 */
export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/**
 * Capture l'attribution depuis l'URL courante.
 *
 * Règle : si l'URL porte des paramètres de tracking, on (ré)écrit (le DERNIER
 * clic publicitaire gagne — c'est ce qu'attend l'import de conversions hors
 * ligne Google Ads). Sinon, si rien n'est encore stocké, on garde au moins la
 * landing page + le referrer (utile pour les visites organiques/directes).
 * La landing page et le referrer du 1er contact ne sont jamais écrasés.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const incoming: Attribution = {};
    let hasTracking = false;
    for (const key of PARAM_KEYS) {
      const value = params.get(key);
      if (value) {
        incoming[key] = value.slice(0, 512);
        hasTracking = true;
      }
    }

    const existing = getAttribution();

    // Rien de neuf dans l'URL et déjà un enregistrement → on ne touche pas.
    if (!hasTracking && existing) return;

    const record: Attribution = {
      ...existing, // conserve d'éventuelles valeurs précédentes
      ...incoming, // le dernier clic publicitaire écrase
      // 1er contact préservé pour landing + referrer :
      landing_page:
        existing?.landing_page ??
        window.location.pathname + window.location.search,
      referrer: existing?.referrer ?? (document.referrer || undefined),
      captured_at: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage indisponible (navigation privée stricte) → on ignore.
  }
}
