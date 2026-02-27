"use client";

import { TradeType, tradeConfigs } from "@/lib/ab-test/config";
import TradeVarianteB from "./TradeVarianteB";

interface ABTestWrapperProps {
  trade: TradeType;
  fallback?: React.ReactNode;
}

// Variante B figée - A/B test en pause
export default function ABTestWrapper({ trade }: ABTestWrapperProps) {
  const config = tradeConfigs[trade];
  return <TradeVarianteB config={config} variant="B" />;
}
