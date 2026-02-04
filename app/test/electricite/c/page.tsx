import { Metadata } from "next";
import { TradeVarianteC } from "@/components/ab";
import { tradeConfigs } from "@/lib/ab-test/config";

export const metadata: Metadata = {
  title: "[TEST] Variante C - Électricien anti-arnaque | Joël",
  description: "Page de test - Variante C (Le Rassurant) pour l'électricité",
  robots: { index: false, follow: false },
};

export default function TestElectriciteC() {
  return <TradeVarianteC config={tradeConfigs.electricite} variant="C" />;
}
