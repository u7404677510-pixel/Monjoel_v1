import { Metadata } from "next";
import { TradeVarianteA } from "@/components/ab";
import { tradeConfigs } from "@/lib/ab-test/config";

export const metadata: Metadata = {
  title: "[TEST] Variante A - Électricien d'urgence",
  description: "Page de test - Variante A (L'Urgentiste) pour l'électricité",
  robots: { index: false, follow: false },
};

export default function TestElectriciteA() {
  return <TradeVarianteA config={tradeConfigs.electricite} variant="A" />;
}
