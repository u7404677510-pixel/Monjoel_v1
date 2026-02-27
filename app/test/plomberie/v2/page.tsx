import { Metadata } from "next";
import PlomberieV2Landing from "@/components/test/PlomberieV2Landing";

export const metadata: Metadata = {
  title: "[TEST V2] Plombier Paris — Intervention 20 min | Joël",
  description: "Page de test — DA radicale Plomberie V2. Non indexée.",
  robots: { index: false, follow: false },
};

export default function TestPlomberieV2() {
  return <PlomberieV2Landing />;
}
