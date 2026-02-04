import { Metadata } from "next";
import { TradeVarianteC } from "@/components/ab";
import { tradeConfigs } from "@/lib/ab-test/config";

export const metadata: Metadata = {
  title: "[TEST] Variante C - Serrurier anti-arnaque | Joël",
  description: "Page de test - Variante C (Le Rassurant) pour la serrurerie",
  robots: { index: false, follow: false },
};

export default function TestSerrurerieC() {
  return <TradeVarianteC config={tradeConfigs.serrurerie} variant="C" />;
}
