import { Metadata } from "next";
import { TradeVarianteB } from "@/components/ab";
import { tradeConfigs } from "@/lib/ab-test/config";

export const metadata: Metadata = {
  title: "[TEST] Variante B - Plombier prix transparent",
  description: "Page de test - Variante B (Le Transparent) pour la plomberie",
  robots: { index: false, follow: false },
};

export default function TestPlomberieB() {
  return <TradeVarianteB config={tradeConfigs.plomberie} variant="B" />;
}
