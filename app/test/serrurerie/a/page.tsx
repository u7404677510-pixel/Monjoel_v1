import { Metadata } from "next";
import { TradeVarianteA } from "@/components/ab";
import { tradeConfigs } from "@/lib/ab-test/config";

export const metadata: Metadata = {
  title: "[TEST] Variante A - Serrurier d'urgence",
  description: "Page de test - Variante A (L'Urgentiste) pour la serrurerie",
  robots: { index: false, follow: false },
};

export default function TestSerrurerieA() {
  return <TradeVarianteA config={tradeConfigs.serrurerie} variant="A" />;
}
