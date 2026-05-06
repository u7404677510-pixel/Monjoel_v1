"use client";

/**
 * ClientShell — wrapper sticky header + footer + mobile nav burger
 * pour tout l'espace client. DA Purple lumineuse (fond blanc/jaune léger).
 *
 * - Header : logo Joël + nav desktop (Mes demandes / Aide / Déconnexion).
 * - Mobile : bouton burger qui slide-in une nav latérale Framer.
 * - Footer : minimal "Joël - 01 41 69 10 08 - 24h/24".
 *
 * Le statut de session est lu une fois au mount pour adapter le label
 * "Déconnexion" (visible uniquement si session active). On ne re-render pas
 * sur changement de session ailleurs (le bouton renvoie vers /client qui
 * gère le state authoritatif).
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createClient } from "@supabase/supabase-js";
import {
  HelpCircle,
  ListChecks,
  LogOut,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const NAV = [
  { href: "/client/interventions", label: "Mes demandes", icon: ListChecks },
  { href: "/contact", label: "Aide", icon: HelpCircle },
] as const;

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Read session once on mount — we don't subscribe to auth changes here:
  // sub-pages (login flow, interventions) own the authoritative state.
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session);
    });
  }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    setMobileOpen(false);
    setAuthed(false);
    router.push("/client");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-white via-white to-joel-yellow-light/30">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-zinc-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/client"
            className="flex items-center gap-2 group"
            aria-label="Mon espace Joël - retour à l'accueil"
          >
            <Image
              src="/logo.webp"
              alt="Joël"
              width={88}
              height={32}
              className="h-7 w-auto group-hover:scale-105 transition-transform"
              priority
            />
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-joel-violet/70 font-semibold">
              Espace client
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-joel-violet/10 text-joel-violet"
                      : "text-zinc-600 hover:text-joel-violet hover:bg-joel-violet/5"
                  )}
                >
                  <Icon size={15} />
                  {item.label}
                </Link>
              );
            })}
            {authed ? (
              <button
                onClick={handleLogout}
                className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} />
                Déconnexion
              </button>
            ) : (
              <Link
                href="/"
                className="ml-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-500 hover:text-joel-violet hover:bg-joel-violet/5 transition-colors"
              >
                Retour au site
              </Link>
            )}
          </nav>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -mr-2 rounded-lg text-zinc-700 hover:bg-joel-violet/10 hover:text-joel-violet transition-colors"
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 max-w-[85%] bg-white shadow-2xl shadow-joel-violet/20 flex flex-col md:hidden"
              role="dialog"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-200">
                <span className="font-display text-lg text-joel-violet">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                {NAV.map((item) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors",
                        active
                          ? "bg-joel-violet/10 text-joel-violet"
                          : "text-zinc-700 hover:bg-joel-violet/5 hover:text-joel-violet"
                      )}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="px-3 pb-4 pt-2 border-t border-zinc-100 space-y-1">
                <a
                  href="tel:+33141691008"
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-joel-violet bg-joel-violet/5/60 hover:bg-joel-violet/5"
                >
                  <Phone size={18} />
                  01 41 69 10 08
                </a>
                {authed ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Déconnexion
                  </button>
                ) : (
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-100"
                  >
                    Retour au site
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1">{children}</main>

      {/* Footer minimal */}
      <footer className="mt-12 py-6 border-t border-zinc-200/70 bg-white/60 backdrop-blur-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>
            <span className="font-semibold text-joel-violet">Joël</span> —{" "}
            <a
              href="tel:+33141691008"
              className="hover:text-joel-violet font-medium"
            >
              01 41 69 10 08
            </a>{" "}
            — disponible 24h/24
          </p>
          <p>
            <Link href="/confidentialite" className="hover:text-joel-violet">
              Confidentialité
            </Link>
            <span className="mx-2">·</span>
            <Link href="/cgu" className="hover:text-joel-violet">
              CGU
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
