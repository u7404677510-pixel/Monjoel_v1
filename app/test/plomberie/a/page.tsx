import { Metadata } from "next";
import { TradeVarianteA } from "@/components/ab";
import { tradeConfigs } from "@/lib/ab-test/config";

export const metadata: Metadata = {
  title: "[TEST] Variante A - Plombier d'urgence | Joël",
  description: "Page de test - Variante A (L'Urgentiste) pour la plomberie",
  robots: { index: false, follow: false },
};

export default function TestPlomberieA() {
  return <TradeVarianteA config={tradeConfigs.plomberie} variant="A" />;
}
