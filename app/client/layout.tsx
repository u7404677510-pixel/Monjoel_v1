import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mon espace client — Joël",
  description: "Consultez vos interventions, devis et factures Joël.",
  robots: { index: false, follow: false },
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header minimal */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.webp" alt="Joël" width={80} height={28} className="h-7 w-auto" />
        </Link>
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← Retour au site
        </Link>
      </header>

      <main>{children}</main>

      <footer className="mt-16 py-8 text-center text-xs text-gray-400 border-t border-gray-100">
        <p>© {new Date().getFullYear()} Joël Technologies SAS · <Link href="/confidentialite" className="hover:underline">Confidentialité</Link></p>
      </footer>
    </div>
  );
}
