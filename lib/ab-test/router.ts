/**
 * A/B Test Router - Logique de sélection et tracking GTM
 */

import { TradeType, VariantType, abTestConfigs } from "./config";

const COOKIE_NAME = "joel_ab_variant";
const COOKIE_EXPIRY_DAYS = 30;

// Déclaration pour TypeScript
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Récupère ou assigne une variante pour un métier donné
 * - Vérifie d'abord si une variante est déjà assignée (cookie)
 * - Sinon, fait un tirage aléatoire pondéré
 * - Sauvegarde en cookie pour cohérence
 * - Envoie l'événement GTM d'attribution
 */
export function getOrAssignVariant(trade: TradeType): VariantType {
  const config = abTestConfigs[trade];
  
  // Test désactivé → toujours variante A
  if (!config.active) {
    return "A";
  }

  // 1. Vérifier si déjà assigné (cookie)
  const existing = getCookie(`${COOKIE_NAME}_${trade}`);
  if (existing && ["A", "B", "C"].includes(existing)) {
    return existing as VariantType;
  }

  // 2. Tirage aléatoire pondéré
  const random = Math.random() * 100;
  let cumulative = 0;
  let variant: VariantType = "A";

  for (const v of config.variants) {
    cumulative += v.weight;
    if (random < cumulative) {
      variant = v.id;
      break;
    }
  }

  // 3. Sauvegarder en cookie
  setCookie(`${COOKIE_NAME}_${trade}`, variant, COOKIE_EXPIRY_DAYS);

  // 4. Envoyer event GTM - Attribution
  pushToDataLayer({
    event: "ab_test_assigned",
    ab_test_id: config.id,
    ab_variant: variant,
    ab_trade: trade,
  });

  return variant;
}

/**
 * Track la vue d'une variante (chaque visite de page)
 */
export function trackVariantView(trade: TradeType, variant: VariantType): void {
  const config = abTestConfigs[trade];
  
  pushToDataLayer({
    event: "ab_test_view",
    ab_test_id: config.id,
    ab_variant: variant,
    ab_trade: trade,
  });
}

/**
 * Track une conversion (clic téléphone, soumission formulaire, etc.)
 */
export function trackConversion(
  trade: TradeType,
  variant: VariantType,
  placement: string
): void {
  const config = abTestConfigs[trade];
  
  pushToDataLayer({
    event: "ab_test_conversion",
    ab_test_id: config.id,
    ab_variant: variant,
    ab_trade: trade,
    ab_placement: placement,
  });
}

/**
 * Récupère la variante actuelle pour un métier (sans assigner)
 */
export function getCurrentVariant(trade: TradeType): VariantType | null {
  const existing = getCookie(`${COOKIE_NAME}_${trade}`);
  if (existing && ["A", "B", "C"].includes(existing)) {
    return existing as VariantType;
  }
  return null;
}

/**
 * Force une variante spécifique (pour debug/preview)
 * Utilisation: ?ab_variant=B dans l'URL
 */
export function forceVariant(trade: TradeType, variant: VariantType): void {
  setCookie(`${COOKIE_NAME}_${trade}`, variant, COOKIE_EXPIRY_DAYS);
}

/**
 * Reset toutes les variantes (pour debug)
 */
export function resetAllVariants(): void {
  const trades: TradeType[] = ["serrurerie", "plomberie", "electricite"];
  trades.forEach((trade) => {
    deleteCookie(`${COOKIE_NAME}_${trade}`);
  });
}

// ============================================
// Helpers - Cookies
// ============================================

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

// ============================================
// Helper - DataLayer (GTM)
// ============================================

function pushToDataLayer(data: Record<string, unknown>): void {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
    
    // Debug en développement
    if (process.env.NODE_ENV === "development") {
      console.log("[A/B Test]", data);
    }
  }
}
