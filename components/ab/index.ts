/**
 * A/B Test Components - Export central
 */

export { default as ABTestWrapper } from "./ABTestWrapper";
export { default as LoadingSkeleton } from "./LoadingSkeleton";
export { default as TradeVarianteA } from "./TradeVarianteA";
export { default as TradeVarianteB } from "./TradeVarianteB";
export { default as TradeVarianteC } from "./TradeVarianteC";

// Re-export types
export type { TradeType, VariantType, TradeConfig } from "@/lib/ab-test/config";
