"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TradeType, VariantType, tradeConfigs } from "@/lib/ab-test/config";
import { getOrAssignVariant, trackVariantView, forceVariant } from "@/lib/ab-test/router";
import LoadingSkeleton from "./LoadingSkeleton";
import TradeVarianteA from "./TradeVarianteA";
import TradeVarianteB from "./TradeVarianteB";
import TradeVarianteC from "./TradeVarianteC";

interface ABTestWrapperProps {
  trade: TradeType;
  fallback?: React.ReactNode;
}

export default function ABTestWrapper({ trade, fallback }: ABTestWrapperProps) {
  const [variant, setVariant] = useState<VariantType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Permettre de forcer une variante via URL: ?ab_variant=B
    const forcedVariant = searchParams.get("ab_variant") as VariantType | null;
    if (forcedVariant && ["A", "B", "C"].includes(forcedVariant)) {
      forceVariant(trade, forcedVariant);
      setVariant(forcedVariant);
      trackVariantView(trade, forcedVariant);
    } else {
      // Attribution normale
      const assignedVariant = getOrAssignVariant(trade);
      setVariant(assignedVariant);
      trackVariantView(trade, assignedVariant);
    }
    
    setIsLoading(false);
  }, [trade, searchParams]);

  // Loading state (évite le flash)
  if (isLoading) {
    return fallback || <LoadingSkeleton />;
  }

  const config = tradeConfigs[trade];

  switch (variant) {
    case "A":
      return <TradeVarianteA config={config} variant={variant} />;
    case "B":
      return <TradeVarianteB config={config} variant={variant} />;
    case "C":
      return <TradeVarianteC config={config} variant={variant} />;
    default:
      return fallback || <TradeVarianteA config={config} variant="A" />;
  }
}
