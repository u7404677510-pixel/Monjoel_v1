"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isArtisan = pathname?.startsWith("/artisan");
  const isFullPage = pathname?.startsWith("/test/joel-uber");

  if (isAdmin || isArtisan || isFullPage) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Skip-to-main link — WCAG 2.4.1 Bypass Blocks (A) + 2.1.1 Keyboard (A).
          Caché par défaut (sr-only), visible uniquement quand reçoit le focus
          clavier. Permet à l'utilisateur clavier / lecteur d'écran de sauter
          directement au contenu principal sans tabber dans toute la nav. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:bg-joel-violet focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:outline-hidden focus:ring-2 focus:ring-joel-yellow"
      >
        Aller au contenu principal
      </a>
      <AnimatedBackground />
      <div className="relative z-10">
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    </>
  );
}




