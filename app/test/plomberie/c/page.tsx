import { Metadata } from "next";
import { TradeVarianteC } from "@/components/ab";
import { tradeConfigs } from "@/lib/ab-test/config";

export const metadata: Metadata = {
  title: "[TEST] Variante C - Plombier anti-arnaque",
  description: "Page de test - Variante C (Le Rassurant) pour la plomberie",
  robots: { index: false, follow: false },
};

export default function TestPlomberieC() {
  return <TradeVarianteC config={tradeConfigs.plomberie} variant="C" />;
}
