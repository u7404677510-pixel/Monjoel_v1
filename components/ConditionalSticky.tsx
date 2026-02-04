"use client";

import { usePathname } from "next/navigation";
import StickyCallButton from "./StickyCallButton";

// Pages qui ont leur propre sticky (A/B test variantes)
// Les pages métiers /serrurerie, /plomberie, /electricite utilisent
// le sticky global maintenant (pages originales restaurées)
const PAGES_WITH_OWN_STICKY = [
  "/test",
];

export default function ConditionalSticky() {
  const pathname = usePathname();
  
  // Ne pas afficher sur les pages de test qui ont leur propre sticky
  const hasOwnSticky = PAGES_WITH_OWN_STICKY.some(
    (page) => pathname === page || pathname?.startsWith(`${page}/`)
  );
  
  if (hasOwnSticky) {
    return null;
  }
  
  return <StickyCallButton />;
}
