/**
 * A/B Test Components - Re-export types only
 *
 * NOTE: Les composants doivent être importés en direct pour éviter que
 * Next.js inclue toutes les variantes dans le chunk de chaque page consommatrice
 * (sinon TradeVarianteA + TradeVarianteC fuitent dans les bundles métier hub).
 *
 * Imports recommandés :
 *   import TradeVarianteB from "@/components/ab/TradeVarianteB";
 *   import LoadingSkeleton from "@/components/ab/LoadingSkeleton";
 */

export type { TradeType, VariantType, TradeConfig } from "@/lib/ab-test/config";
