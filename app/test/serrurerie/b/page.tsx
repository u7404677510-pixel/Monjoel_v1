import { Metadata } from "next";
import { TradeVarianteB } from "@/components/ab";
import { tradeConfigs } from "@/lib/ab-test/config";

export const metadata: Metadata = {
  title: "[TEST] Variante B - Serrurier prix transparent | Joël",
  description: "Page de test - Variante B (Le Transparent) pour la serrurerie",
  robots: { index: false, follow: false },
};

export default function TestSerrurerieB() {
  return <TradeVarianteB config={tradeConfigs.serrurerie} variant="B" />;
}
