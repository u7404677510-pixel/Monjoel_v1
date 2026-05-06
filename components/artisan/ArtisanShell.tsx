"use client";

/**
 * ArtisanShell — wrapper du header dark + nav pour `/artisan/*`.
 *
 * - Background : zinc-950 + radial gradient violet en filigrane (cinematic dark purple)
 * - Header sticky : logo white + badge "Espace artisan" + nav inline desktop
 * - Mobile : burger menu slide-in droite
 * - Nav items : Dashboard / Missions / Profil / Logout
 *
 * Auth : la page principale (`/artisan`) gère le state login/dashboard.
 * Cette shell ne fait que la chrome — pas de redirect.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Wrench,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/artisan", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { href: "/artisan/missions", label: "Missions", Icon: Wrench },
];

export function ArtisanShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/artisan";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null);

  // Watch auth state for header CTAs (Profile / Logout only show when logged in)
  useEffect(() => {
    if (!supabase) {
      setAuthed(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const isActive = (item: typeof NAV[number]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setAuthed(false);
    router.replace("/artisan");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      {/* Background ambient — gradient violet sombre + grain */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-zinc-950 via-[#160a2c] to-zinc-950" />
        <div className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-joel-violet/20 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/3 h-[440px] w-[440px] rounded-full bg-joel-mauve/12 blur-[120px]" />
        {/* SVG grain */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-[0.04] mix-blend-overlay"
        >
          <filter id="artisan-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" />
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#artisan-grain)" />
        </svg>
      </div>

      {/* Header sticky */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/artisan" className="flex items-center gap-2.5">
              <Image
                src="/logo-white.webp"
                alt="Joël"
                width={84}
                height={28}
                priority
                className="h-7 w-auto"
              />
            </Link>
            <span className="hidden rounded-full border border-white/20 bg-white/4 px-3 py-1 text-[11px] font-medium text-white sm:inline-block">
              Espace artisan
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-joel-mauve/15 text-white ring-1 ring-joel-mauve/40"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.Icon size={15} />
                  {item.label}
                </Link>
              );
            })}
            {authed && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                aria-label="Déconnexion"
              >
                <LogOut size={15} />
                <span className="hidden lg:inline">Déconnexion</span>
              </button>
            )}
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 hover:bg-white/10 md:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ pointerEvents: "none" }}
            animate={{ pointerEvents: "auto" }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="absolute right-0 top-0 h-full w-72 border-l border-white/10 bg-zinc-950/95 px-5 py-5 backdrop-blur-md"
            >
              <div className="mb-6 flex items-center justify-between">
                <Image
                  src="/logo-white.webp"
                  alt="Joël"
                  width={84}
                  height={28}
                  className="h-7 w-auto"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-300"
                  aria-label="Fermer"
                >
                  <X size={16} />
                </button>
              </div>

              <nav className="space-y-1">
                {NAV.map((item) => {
                  const active = isActive(item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-joel-mauve/15 text-white ring-1 ring-joel-mauve/40"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <item.Icon size={16} />
                      {item.label}
                    </Link>
                  );
                })}
                {authed && (
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={16} /> Déconnexion
                  </button>
                )}
              </nav>

              <div className="mt-8 border-t border-white/5 pt-5">
                <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                  Profil
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-400">
                  <User size={11} /> Géré sur le dashboard
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative">{children}</main>
    </div>
  );
}
