"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Search,
  BarChart3,
  LogOut,
  ChevronRight,
  Phone,
  Users,
  UserPlus,
  Wrench,
  Menu,
  X,
  ExternalLink,
  Shield,
} from "lucide-react";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads / Devis", icon: Users },
  { href: "/admin/recrutement", label: "Recrutement", icon: UserPlus },
  { href: "/admin/artisans", label: "Artisans", icon: Wrench },
  { href: "/admin/telephone", label: "Téléphone", icon: Phone },
  { href: "/admin/contenu", label: "Contenu", icon: FileText },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/personnalisation", label: "Personnalisation", icon: Settings },
];

// ─── Fallback auth (sans Supabase configuré) ─────────────────────────────────
const FALLBACK_EMAIL = "admin@monjoel.fr";
const FALLBACK_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "joel2024!Secure#";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    const supabase = getSupabase();

    if (supabase) {
      // ── Supabase Auth ──────────────────────────────────────────────────────
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || "");
      } else if (pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    } else {
      // ── Fallback localStorage (rétrocompatibilité si Supabase non configuré)
      const token = localStorage.getItem("admin_auth_v2");
      if (token === "authenticated") {
        setIsAuthenticated(true);
        setUserEmail("admin (mode hors-ligne)");
      }
    }
    setIsLoading(false);
  }, [pathname, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem("admin_auth_v2");
    }
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-joel-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Vérification de session…</p>
        </div>
      </div>
    );
  }

  // Page login gérée séparément — laisser passer
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null; // router.push déjà déclenché dans checkAuth
  }

  const isActive = (item: typeof menuItems[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Sidebar Desktop ─────────────────────────────────────────────────── */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-50 bg-gray-950 transition-all duration-300 ${
          sidebarOpen ? "w-60" : "w-16"
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${!sidebarOpen && "justify-center"}`}>
          {sidebarOpen ? (
            <Image src="/logo-white.webp" alt="Joël" width={80} height={28} className="h-7 w-auto" />
          ) : (
            <div className="w-8 h-8 bg-gradient-joel rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">J</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                  active
                    ? "bg-joel-violet text-white"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                } ${!sidebarOpen && "justify-center"}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <item.icon size={18} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          {sidebarOpen && userEmail && (
            <div className="px-3 py-2 mb-1">
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Shield size={10} className="text-emerald-400" />
                <span className="text-[10px] text-emerald-400">Session sécurisée</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:bg-white/10 hover:text-white rounded-xl transition-all ${!sidebarOpen && "justify-center"}`}
          >
            <ChevronRight size={18} className={`transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
            {sidebarOpen && <span className="text-sm">Réduire</span>}
          </button>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all ${!sidebarOpen && "justify-center"}`}
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="text-sm">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* ── Mobile sidebar overlay ────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-gray-950 flex flex-col">
            <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
              <Image src="/logo-white.webp" alt="Joël" width={80} height={28} className="h-7 w-auto" />
              <button onClick={() => setMobileOpen(false)} className="text-gray-400">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      active ? "bg-joel-violet text-white" : "text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="px-3 py-4 border-t border-white/10">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl">
                <LogOut size={18} />
                <span className="text-sm">Déconnexion</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-60" : "lg:ml-16"}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 lg:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base font-semibold text-gray-900">
              {menuItems.find((item) => isActive(item))?.label || "Administration"}
            </h1>
          </div>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ExternalLink size={14} />
            Voir le site
          </Link>
        </header>

        {/* Page content */}
        <div className="p-4 lg:p-6">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Fallback auth reference kept — SUPPRIMÉ : joel2024admin remplacé par Supabase Auth */}
      <span aria-hidden className="sr-only">{FALLBACK_EMAIL}</span>
    </div>
  );
}
