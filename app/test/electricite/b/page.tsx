import { Metadata } from "next";
import { TradeVarianteB } from "@/components/ab";
import { tradeConfigs } from "@/lib/ab-test/config";

export const metadata: Metadata = {
  title: "[TEST] Variante B - Électricien prix transparent",
  description: "Page de test - Variante B (Le Transparent) pour l'électricité",
  robots: { index: false, follow: false },
};

export default function TestElectriciteB() {
  return <TradeVarianteB config={tradeConfigs.electricite} variant="B" />;
}
