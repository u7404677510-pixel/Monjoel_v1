import type { Metadata } from "next";
import { ArtisanShell } from "@/components/artisan/ArtisanShell";

export const metadata: Metadata = {
  title: "Espace artisan — Joël",
  description: "Pilotez vos missions et votre activité Joël en temps réel.",
  robots: { index: false, follow: false },
};

export default function ArtisanLayout({ children }: { children: React.ReactNode }) {
  return <ArtisanShell>{children}</ArtisanShell>;
}
