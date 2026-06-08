// Joel Homepage Test — Architecture inspired by Uber.com — Built with Cursor
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const PHONE = "01 41 69 10 08";
const PHONE_TEL = "tel:+33141691008";

const NAV_LINKS = [
  { label: "Appeler maintenant", href: PHONE_TEL },
  { label: "Nos services", href: "/plomberie" },
  { label: "Professionnels", href: "/recrutement" },
  { label: "À propos", href: "/a-propos" },
];

const SERVICES = [
  { icon: "🚿", title: "Plomberie urgence", desc: "Fuite d'eau, canalisation, chauffe-eau. Un plombier en 30 min.", href: "/plomberie" },
  { icon: "🔐", title: "Serrurerie express", desc: "Porte claquée, serrure bloquée. On arrive avant vous !", href: "/serrurerie" },
  { icon: "⚡", title: "Électricité", desc: "Panne, disjoncteur, mise aux normes. Certifié Consuel.", href: "/electricite" },
  { icon: "🤖", title: "Devis instantané", desc: "Notre IA calcule votre prix en 60 secondes. Sans surprise.", href: "/plomberie" },
  { icon: "📅", title: "Planifier", desc: "Réservez votre artisan à l'avance, au créneau qui vous convient.", href: "#planifier" },
  { icon: "🏢", title: "Entreprises", desc: "Solutions B2B pour gestionnaires et syndics de copropriété.", href: "/recrutement" },
];

const DEPARTMENTS = ["75 — Paris", "77 — Seine-et-Marne", "78 — Yvelines", "91 — Essonne", "92 — Hauts-de-Seine", "93 — Seine-Saint-Denis", "94 — Val-de-Marne", "95 — Val-d'Oise"];

const TABS = ["Urgence", "Planifié", "Entreprise"];

const STEPS: Record<string, Array<{ num: string; title: string; desc: string }>> = {
  Urgence: [
    { num: "01", title: "Prenez une photo", desc: "Montrez le problème en 5 secondes" },
    { num: "02", title: "Répondez aux questions", desc: "Notre IA comprend votre situation" },
    { num: "03", title: "Devis immédiat", desc: "Prix fixe garanti avant toute intervention" },
    { num: "04", title: "On arrive", desc: "Un artisan chez vous en ~30 minutes" },
  ],
  Planifié: [
    { num: "01", title: "Choisissez un créneau", desc: "Jusqu'à 30 jours à l'avance" },
    { num: "02", title: "Décrivez le problème", desc: "Photos et description détaillée" },
    { num: "03", title: "Confirmez la réservation", desc: "Rappel automatique 1h avant" },
    { num: "04", title: "Accueillez l'artisan", desc: "Ponctuel, poli, certifié" },
  ],
  Entreprise: [
    { num: "01", title: "Créez votre compte Pro", desc: "Accès au tableau de bord centralisé" },
    { num: "02", title: "Déposez vos demandes", desc: "Par bâtiment, par urgence" },
    { num: "03", title: "Suivez les interventions", desc: "En temps réel pour toute l'équipe" },
    { num: "04", title: "Facture unifiée", desc: "Un seul interlocuteur, une seule facture" },
  ],
};

const FOOTER_COLS = [
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Presse", href: "#" },
      { label: "Investisseurs", href: "#" },
      { label: "Blog", href: "/blog" },
      { label: "Offres d'emploi", href: "/recrutement" },
      { label: "Joel IA", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Plomberie", href: "/plomberie" },
      { label: "Serrurerie", href: "/serrurerie" },
      { label: "Électricité", href: "/electricite" },
      { label: "Devis IA", href: "#" },
      { label: "Joel Pro", href: "#" },
      { label: "Joel Entreprise", href: "#" },
    ],
  },
  {
    title: "Confiance",
    links: [
      { label: "Anti-arnaque", href: "/stop-arnaques" },
      { label: "Développement durable", href: "#" },
      { label: "Sécurité", href: "#" },
      { label: "Artisans vérifiés", href: "/stop-arnaques" },
    ],
  },
  {
    title: "Interventions",
    links: [
      { label: "Réserver", href: "/plomberie" },
      { label: "Aéroports IDF", href: "#" },
      { label: "Villes desservies", href: "#" },
    ],
  },
];

// ─── SCROLL REVEAL HOOK ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── SECTION WRAPPER ───────────────────────────────────────────────────────────
function Section({ children, bg = "#fff", py = "80px", className = "" }: {
  children: React.ReactNode;
  bg?: string;
  py?: string;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref}
      style={{ background: bg, paddingTop: py, paddingBottom: py }}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }} className={className}>
    {children}
  </div>
);

// ─── BUTTON COMPONENTS ────────────────────────────────────────────────────────
const BtnPrimary = ({ children, href, onClick, fullWidth }: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}) => {
  const cls = `inline-flex items-center justify-center gap-2 font-semibold text-white cursor-pointer transition-all hover:bg-gray-800 active:scale-95`;
  const style: React.CSSProperties = {
    background: "#000",
    borderRadius: 100,
    padding: "14px 24px",
    fontSize: 15,
    fontWeight: 600,
    width: fullWidth ? "100%" : undefined,
    border: "none",
    textDecoration: "none",
  };
  if (href) return <a href={href} className={cls} style={style}>{children}</a>;
  return <button onClick={onClick} className={cls} style={style}>{children}</button>;
};

const BtnSecondary = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center justify-center gap-2 font-semibold cursor-pointer transition-all hover:bg-gray-100 active:scale-95"
    style={{ background: "transparent", border: "1px solid #000", borderRadius: 100, padding: "14px 24px", fontSize: 15, fontWeight: 600 }}
  >
    {children}
  </button>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function JoelUberHomepage() {
  const [scrolled, setScrolled] = useState(false);
  const [heroMode, setHeroMode] = useState<"now" | "plan">("now");
  const [heroDropOpen, setHeroDropOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Urgence");
  const [zoneOpen, setZoneOpen] = useState(false);
  const [problem, setProblem] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const close = () => { setHeroDropOpen(false); setZoneOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div style={{ fontFamily: "var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: "#000", background: "#fff" }}>

      {/* ════════════════════════════════════════════════════════════
          1. NAVBAR
      ════════════════════════════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "#000",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.4)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : undefined,
          transition: "box-shadow 0.3s",
        }}
      >
        <Container>
          <div className="flex items-center justify-between" style={{ height: 64 }}>
            {/* Logo */}
            <Link href="/" className="flex items-center cursor-pointer select-none">
              <Image
                src="/logo-white.webp"
                alt="Joël"
                width={80}
                height={28}
                className="h-7 w-auto object-contain"
              />
            </Link>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-white text-sm font-medium relative group"
                  style={{ textDecoration: "none", fontSize: 14 }}
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-200" style={{ background: "#FFE066" }} />
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-4">
              <span style={{ color: "#fff", fontSize: 13, opacity: 0.7 }}>🌍 Paris, FR</span>
              <Link href="/contact" style={{ color: "#fff", fontSize: 14, textDecoration: "none", opacity: 0.8 }}>Aide</Link>
              <a href="#" style={{ color: "#fff", fontSize: 14, textDecoration: "none", opacity: 0.8 }}>Connexion</a>
              <a
                href={PHONE_TEL}
                style={{ background: "#fff", color: "#000", borderRadius: 100, padding: "10px 18px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}
              >
                Obtenir un devis
              </a>
            </div>

            {/* Mobile — phone button */}
            <a href={PHONE_TEL} className="md:hidden" style={{ background: "#7C3AED", color: "#fff", borderRadius: 100, padding: "8px 16px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Appeler
            </a>
          </div>
        </Container>
      </nav>

      {/* ════════════════════════════════════════════════════════════
          2. HERO
      ════════════════════════════════════════════════════════════ */}
      <section style={{ minHeight: "100vh", paddingTop: 64, background: "#fff", display: "flex", alignItems: "center" }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ paddingTop: 40, paddingBottom: 60 }}>
            {/* Left */}
            <div>
              {/* Micro-badge */}
              <div className="inline-flex items-center gap-2 mb-6" style={{ fontSize: 13, color: "#6B6B6B" }}>
                <span>📍</span>
                <span>Paris, Île-de-France</span>
                <span>·</span>
                <a href="#" style={{ color: "#000", textDecoration: "underline" }}>Changer de ville</a>
              </div>

              {/* H1 */}
              <h1 style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, marginBottom: 28, color: "#000" }}>
                Un artisan chez vous<br />
                <span style={{ color: "#000" }}>en 30 minutes</span>
              </h1>

              {/* Mode dropdown */}
              <div className="relative mb-4" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setHeroDropOpen(!heroDropOpen)}
                  className="inline-flex items-center gap-2 font-medium"
                  style={{ background: "#F6F6F6", border: "none", borderRadius: 100, padding: "10px 20px", fontSize: 14, cursor: "pointer" }}
                >
                  <span>⏱</span>
                  <span>{heroMode === "now" ? "Intervention maintenant" : "Planifier une date"}</span>
                  <span style={{ marginLeft: 4 }}>▾</span>
                </button>
                {heroDropOpen && (
                  <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "#fff", borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.12)", padding: 8, minWidth: 220, zIndex: 20 }}>
                    {[["now", "⚡ Maintenant"], ["plan", "📅 Planifier"]].map(([v, l]) => (
                      <button
                        key={v}
                        onClick={() => { setHeroMode(v as "now" | "plan"); setHeroDropOpen(false); }}
                        style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", border: "none", background: heroMode === v ? "#F6F6F6" : "transparent", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: heroMode === v ? 600 : 400 }}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Form card */}
              <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 24px rgba(0,0,0,0.10)", padding: 20, marginBottom: 16 }}>
                {/* Address input */}
                <div className="flex items-center gap-3 pb-4" style={{ borderBottom: "1px dashed #E5E5E5" }}>
                  <span style={{ color: "#6B6B6B", fontSize: 18 }}>📍</span>
                  <input
                    type="text"
                    placeholder="Votre adresse"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 15, background: "transparent", color: "#000" }}
                  />
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "#7C3AED", fontSize: 18 }} title="Localiser">◎</button>
                </div>

                {/* Problem dropdown */}
                <div className="flex items-center gap-3 pt-4 pb-4">
                  <span style={{ color: "#6B6B6B", fontSize: 18 }}>🔧</span>
                  <select
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 15, background: "transparent", color: problem ? "#000" : "#6B6B6B", cursor: "pointer" }}
                  >
                    <option value="">Type de problème</option>
                    <option value="plomberie">🚿 Plomberie</option>
                    <option value="serrurerie">🔐 Serrurerie</option>
                    <option value="electricite">⚡ Électricité</option>
                  </select>
                </div>

                <a href={PHONE_TEL}>
                  <BtnPrimary fullWidth>Voir les prix</BtnPrimary>
                </a>
              </div>

              <p style={{ fontSize: 13, color: "#6B6B6B" }}>
                <a href="#" style={{ color: "#000", textDecoration: "underline" }}>Connectez-vous</a> pour accéder à vos interventions récentes
              </p>
            </div>

            {/* Right — illustration */}
            <div className="hidden lg:block relative">
              <div style={{ borderRadius: 16, height: 480, position: "relative", overflow: "hidden" }}>
                <Image
                  src="/uber-test/hero-artisan.webp"
                  alt="Artisan Joël — intervention urgence Paris"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Hover card bas */}
                <div
                  className="absolute bottom-0 left-0 right-0 group"
                  style={{ background: "#7C3AED", padding: "20px 24px", borderRadius: "0 0 16px 16px" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, margin: 0 }}>Urgence ? Appelez maintenant</p>
                      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: "4px 0 0" }}>Réponse en moins de 2 minutes</p>
                    </div>
                    <a
                      href={PHONE_TEL}
                      style={{ background: "#fff", color: "#7C3AED", borderRadius: 100, padding: "10px 18px", fontSize: 14, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}
                    >
                      {PHONE}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3. SERVICES GRID 3×2
      ════════════════════════════════════════════════════════════ */}
      <Section bg="#fff">
        <Container>
          <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, marginBottom: 32 }}>Nos services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
                style={{ border: "1px solid #E8E8E8", borderRadius: 16, padding: 24 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: "#6B6B6B", lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
                  </div>
                  <span style={{ fontSize: 32, marginLeft: 16, flexShrink: 0 }}>{s.icon}</span>
                </div>
                <a href={s.href} style={{ color: "#7C3AED", fontSize: 14, fontWeight: 600, textDecoration: "underline" }}>
                  Détails →
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════════════════════════
          4. COMPTE / TRUST 50/50
      ════════════════════════════════════════════════════════════ */}
      <Section bg="#fff">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#6B6B6B", marginBottom: 16 }}>Votre espace client</p>
              <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 24 }}>
                Suivez votre artisan<br />en temps réel
              </h2>
              <p style={{ fontSize: 16, color: "#6B6B6B", lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
                Consultez l'heure d'arrivée estimée, l'historique de vos interventions, vos devis et factures. Tout dans votre espace client.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <BtnPrimary href="#">Se connecter à mon compte</BtnPrimary>
                <Link href="/recrutement" style={{ color: "#000", fontSize: 15, fontWeight: 500, textDecoration: "underline", display: "flex", alignItems: "center" }}>
                  Créer un compte
                </Link>
              </div>
            </div>
            <div style={{ borderRadius: 16, height: 360, position: "relative", overflow: "hidden" }}>
              <Image
                src="/uber-test/artisan-client.webp"
                alt="Artisan Joël avec un client — suivi intervention"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════════════════════════
          5. PLANIFIER
      ════════════════════════════════════════════════════════════ */}
      <Section bg="#F6F6F6">
        <Container>
          <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, marginBottom: 40 }}>Planifiez</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Form card */}
            <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", padding: 32 }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Réservez votre intervention</h3>
              <p style={{ fontSize: 14, color: "#6B6B6B", marginBottom: 16 }}>Choisir une date et une heure</p>
              <div className="flex flex-col gap-3 mb-6">
                <div style={{ border: "1px solid #E5E5E5", borderRadius: 8, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <span>📅</span>
                  <input type="text" placeholder="Aujourd'hui" style={{ border: "none", outline: "none", flex: 1, fontSize: 15 }} />
                </div>
                <div style={{ border: "1px solid #E5E5E5", borderRadius: 8, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <span>🕐</span>
                  <select style={{ border: "none", outline: "none", flex: 1, fontSize: 15, background: "transparent" }}>
                    {["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"].map(h => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>
              <BtnPrimary href={PHONE_TEL} fullWidth>Suivant</BtnPrimary>
            </div>

            {/* Avantages */}
            <div className="flex flex-col gap-6 pt-4">
              <h3 style={{ fontSize: 20, fontWeight: 700 }}>Avantages</h3>
              {[
                { icon: "📅", text: "Choisissez votre créneau jusqu'à 30 jours à l'avance" },
                { icon: "⏱", text: "Temps d'attente inclus pour retrouver votre artisan" },
                { icon: "❌", text: "Annulation sans frais jusqu'à 2h avant l'intervention" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-4">
                  <div style={{ width: 44, height: 44, background: "#F0F0F0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>
                    {item.icon}
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "#1A1A1A" }}>{item.text}</p>
                </div>
              ))}
              <Link href="/cgu" style={{ color: "#6B6B6B", fontSize: 14, textDecoration: "underline" }}>
                Voir les conditions générales
              </Link>
            </div>

            {/* Image planifier — 3e colonne desktop */}
            <div className="hidden lg:block" style={{ borderRadius: 16, height: 360, position: "relative", overflow: "hidden" }}>
              <Image
                src="/uber-test/planifier-card.webp"
                alt="Planifier une intervention Joël"
                fill
                className="object-cover object-center"
                sizes="33vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════════════════════════
          6. ZONE D'INTERVENTION
      ════════════════════════════════════════════════════════════ */}
      <Section bg="#fff">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 20 }}>
                Vous êtes en<br />Île-de-France ?
              </h2>
              <p style={{ fontSize: 16, color: "#6B6B6B", lineHeight: 1.7, marginBottom: 28, maxWidth: 440 }}>
                Nous couvrons les 8 départements franciliens. Transport en commun, banlieue, zones pavillonnaires... On vient partout.
              </p>
              {/* Zone dropdown */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setZoneOpen(!zoneOpen)}
                  style={{ background: "#F6F6F6", border: "none", borderRadius: 100, padding: "12px 22px", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span>📍 Paris</span>
                  <span>▾</span>
                </button>
                {zoneOpen && (
                  <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "#fff", borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.12)", padding: 8, minWidth: 240, zIndex: 20 }}>
                    {DEPARTMENTS.map((d) => (
                      <button
                        key={d}
                        onClick={() => setZoneOpen(false)}
                        style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", border: "none", background: "transparent", borderRadius: 8, cursor: "pointer", fontSize: 14 }}
                        className="hover:bg-gray-50"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div style={{ borderRadius: 16, height: 360, position: "relative", overflow: "hidden" }}>
              <Image
                src="/uber-test/carte-idf.webp"
                alt="Zone d'intervention Joël — Île-de-France"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════════════════════════
          7. COMMENT ÇA MARCHE — TABS
      ════════════════════════════════════════════════════════════ */}
      <Section bg="#F6F6F6">
        <Container>
          <div className="text-center mb-12">
            <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, marginBottom: 12 }}>Comment ça marche ?</h2>
            <p style={{ fontSize: 16, color: "#6B6B6B" }}>De votre demande à l'intervention, en quelques minutes.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-12 justify-center flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 100,
                  border: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: activeTab === tab ? "#000" : "transparent",
                  color: activeTab === tab ? "#fff" : "#6B6B6B",
                  transition: "all 0.2s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 3 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Steps left */}
            <div className="flex flex-col gap-6">
              {STEPS[activeTab].map((step) => (
                <div key={step.num} className="flex gap-4">
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#000", opacity: 0.25, flexShrink: 0, paddingTop: 2, minWidth: 24 }}>{step.num}</span>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{step.title}</p>
                    <p style={{ fontSize: 14, color: "#6B6B6B", lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mockup center */}
            <div style={{ background: "#1A1A1A", borderRadius: 24, height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>[App Joël]</span>
            </div>

            {/* Articles right */}
            <div className="flex flex-col gap-4">
              {[
                { img: "/uber-test/article-plomberie.webp", alt: "Article plomberie — trouver un plombier urgence Paris", title: "Paris : Comment trouver un plombier d'urgence", tag: "Conseils pratiques", href: "/plomberie" },
                { img: "/uber-test/article-serrurerie.webp", alt: "Article serrurerie — arnaques à éviter", title: "Serrurerie : les arnaques à éviter absolument", tag: "Sécurité & confiance", href: "/stop-arnaques" },
              ].map((art) => (
                <div key={art.title} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ height: 120, position: "relative" }}>
                    <Image
                      src={art.img}
                      alt={art.alt}
                      fill
                      className="object-cover object-center"
                      sizes="300px"
                    />
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase", letterSpacing: 1 }}>{art.tag}</span>
                    <p style={{ fontSize: 15, fontWeight: 600, marginTop: 6, lineHeight: 1.4 }}>{art.title}</p>
                    <a href={art.href} style={{ fontSize: 13, color: "#6B6B6B", textDecoration: "underline", display: "block", marginTop: 8 }}>En savoir plus</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════════════════════════
          8. DEVENIR ARTISAN
      ════════════════════════════════════════════════════════════ */}
      <Section bg="#fff">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Illustration gauche */}
            <div style={{ borderRadius: 16, height: 400, position: "relative", overflow: "hidden" }}>
              <Image
                src="/uber-test/artisan-travail-B2B.webp"
                alt="Artisan Joël en intervention"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Texte droite */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#6B6B6B", marginBottom: 16 }}>Rejoindre le réseau</p>
              <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 20 }}>
                Travaillez quand<br />vous voulez, gagnez plus
              </h2>
              <p style={{ fontSize: 16, color: "#6B6B6B", lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
                Rejoignez le réseau Joël. Vous choisissez vos créneaux, nous gérons les clients, la facturation et les impayés. Liberté totale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <BtnPrimary href="/recrutement">Devenir artisan Joël</BtnPrimary>
                <a href="#" style={{ color: "#6B6B6B", fontSize: 14, textDecoration: "underline", display: "flex", alignItems: "center", paddingTop: 4 }}>
                  Vous avez déjà un compte ? Connectez-vous
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════════════════════════
          9. B2B PRO
      ════════════════════════════════════════════════════════════ */}
      <Section bg="#F6F6F6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#6B6B6B", marginBottom: 16 }}>Joël Pro</p>
              <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 20 }}>
                Le Joël que vous connaissez,<br />repensé pour les professionnels
              </h2>
              <p style={{ fontSize: 16, color: "#6B6B6B", lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
                Joël Pro est dédié aux gestionnaires d'immeubles, syndics et entreprises. Gérez vos interventions, vos équipes et vos budgets en un seul endroit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <BtnPrimary href="/recrutement">Commencer</BtnPrimary>
                <Link href="/a-propos" style={{ color: "#000", fontSize: 15, fontWeight: 500, textDecoration: "underline", display: "flex", alignItems: "center" }}>
                  Découvrir nos solutions pro →
                </Link>
              </div>
            </div>
            <div style={{ borderRadius: 16, height: 400, position: "relative", overflow: "hidden" }}>
              <Image
                src="/uber-test/joel-pro-dashboard.webp"
                alt="Joël Pro — dashboard gestionnaire"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════════════════════════
          10. APP QR CODES
      ════════════════════════════════════════════════════════════ */}
      <Section bg="#F6F6F6">
        <Container>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, textAlign: "center", marginBottom: 40 }}>
            C'est plus simple dans l'application
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { title: "Téléchargez l'app Joël", desc: "Pour les clients — Devis, suivi, factures" },
              { title: "L'app pour les artisans", desc: "Gérez vos missions, votre agenda" },
            ].map((app) => (
              <div
                key={app.title}
                style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
                className="flex flex-col gap-4"
              >
                <div style={{ width: 80, height: 80, background: "#000", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontSize: 10, opacity: 0.4 }}>QR</span>
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{app.title}</p>
                  <p style={{ fontSize: 13, color: "#6B6B6B" }}>{app.desc}</p>
                </div>
                <p style={{ fontSize: 13, color: "#6B6B6B" }}>Scannez pour télécharger →</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════════════════════════
          11. FOOTER
      ════════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#000", color: "#fff", paddingTop: 56, paddingBottom: 40 }}>
        <Container>
          {/* Top row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-white.webp"
                alt="Joël"
                width={80}
                height={28}
                className="h-7 w-auto object-contain"
              />
            </Link>
            <div className="flex items-center gap-2" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
              <span style={{ color: "#4CAF50" }}>✅</span>
              <span>Tous les services opérationnels · 24h/24 · 7j/7</span>
            </div>
          </div>

          {/* Help link */}
          <div className="py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <Link href="/contact" style={{ color: "#fff", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Accéder au centre d'aide →
            </Link>
          </div>

          {/* 4 columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1 }}>
                  {col.title}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} style={{ color: "#fff", fontSize: 14, textDecoration: "none", opacity: 0.8 }}
                        className="hover:opacity-100 transition-opacity"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between flex-wrap">
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-4">
              {["LinkedIn", "YouTube", "Instagram", "X"].map((sn) => (
                <a
                  key={sn}
                  href="#"
                  style={{ color: "#fff", fontSize: 12, textDecoration: "none", opacity: 0.6, border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 10px" }}
                  className="hover:opacity-100 transition-opacity"
                >
                  {sn}
                </a>
              ))}
            </div>

            {/* Sélecteurs + stores */}
            <div className="flex flex-wrap items-center gap-3">
              <button style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "8px 14px", color: "#fff", fontSize: 13, cursor: "pointer" }}>
                🌍 Français (France)
              </button>
              <button style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "8px 14px", color: "#fff", fontSize: 13, cursor: "pointer" }}>
                📍 Paris
              </button>
              {["Google Play", "App Store"].map((store) => (
                <a
                  key={store}
                  href="#"
                  style={{ background: "#1A1A1A", color: "#fff", borderRadius: 10, padding: "8px 14px", fontSize: 12, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  {store}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-wrap items-center gap-4 pt-6" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            <span>© 2025 Joël Technologies SAS.</span>
            {[
              { label: "Confidentialité", href: "/confidentialite" },
              { label: "Accessibilité", href: "#" },
              { label: "Conditions", href: "/cgu" },
            ].map((l) => (
              <a key={l.label} href={l.href} style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }} className="hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </Container>
      </footer>

      {/* ════════════════════════════════════════════════════════════
          STICKY BOTTOM BAR
      ════════════════════════════════════════════════════════════ */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 99, background: "#000", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <Container>
          <div className="flex items-center justify-between" style={{ height: 56 }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
              Appel gratuit · <span style={{ color: "#fff", fontWeight: 600 }}>{PHONE}</span>
            </span>
            <a
              href={PHONE_TEL}
              style={{ background: "#fff", color: "#000", borderRadius: 100, padding: "10px 20px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}
            >
              Appeler maintenant
            </a>
          </div>
        </Container>
      </div>

      {/* Spacer for sticky bottom bar */}
      <div style={{ height: 56 }} />
    </div>
  );
}
