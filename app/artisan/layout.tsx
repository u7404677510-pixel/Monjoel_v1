import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Espace artisan — Joël",
  description: "Gérez vos missions et votre activité Joël.",
  robots: { index: false, follow: false },
};

export default function ArtisanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header dark */}
      <header className="bg-gray-900 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo-white.webp" alt="Joël" width={80} height={28} className="h-7 w-auto" />
        </Link>
        <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full">Espace artisan</span>
      </header>

      <main>{children}</main>
    </div>
  );
}
