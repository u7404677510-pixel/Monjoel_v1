/**
 * /recherche — page de recherche du site (Server Component).
 *
 * Pourquoi cette page existe :
 *   Le JSON-LD WebSite/SearchAction injecté par `HomeSchema.tsx` pointe vers
 *   `https://monjoel.fr/recherche?q={search_term_string}`. Si Google ou un
 *   utilisateur arrive sur cette URL, on doit servir une vraie page (sinon
 *   404 et schéma cassé).
 *
 * Logique recherche :
 *   - On lit `searchParams.q` côté server (utile pour partage URL et SEO).
 *   - Le composant `<SearchInput>` côté client construit un index fuzzy au
 *     mount et propose une autocomplétion live (villes IDF, services, hubs
 *     métier, pages clés). Pas de backend, pas de coût.
 *   - Si q présent → on affiche un bloc "Résultats pour : {q}" + on propose
 *     des sous-options métier si le query mentionne une ville sans métier
 *     clair, ou on redirige côté client si tout est explicite.
 *
 * Style :
 *   DA Purple lumineuse — fond blanc, accents violet/jaune, harmonisé avec
 *   le nouveau Hero `HeroCinematic` et la `Navigation` refondue.
 *
 * Note SEO :
 *   - /recherche (sans query) : indexable (page hub légitime).
 *   - /recherche?q=... : noindex (Google déteste indexer les SERP internes,
 *     évite duplicate content sur des milliers de variantes).
 */

import { ArrowRight, Phone, Search, Shield, Sparkles, Wrench, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import SearchInput from "./SearchInput";

interface RecherchePageProps {
  // Next 14 — searchParams sont sync, mais Next 15 les a passés async :
  // on reste sur Next 14 ici (`"next": "^14.2.5"`), donc valeur sync.
  searchParams: Promise<{ q?: string | string[] }>;
}

// Métadonnées dynamiques : noindex uniquement si une query est présente.
export async function generateMetadata(props: RecherchePageProps): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const rawQ = searchParams?.q;
  const query = (Array.isArray(rawQ) ? rawQ[0] : rawQ ?? "").trim();
  const hasQuery = query.length > 0;

  return {
    title: "Recherche | Joël - Dépannage urgence Paris IDF",
    description:
      "Recherchez un plombier, serrurier ou électricien à Paris ou en Île-de-France. Intervention 30 minutes, prix fixe garanti.",
    // Sans query → page indexable. Avec query → noindex (SERP interne).
    robots: hasQuery
      ? { index: false, follow: true }
      : { index: true, follow: true },
    alternates: {
      canonical: "https://monjoel.fr/recherche",
      languages: {
        "fr-FR": "https://monjoel.fr/recherche",
        "x-default": "https://monjoel.fr/recherche",
      },
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: "https://monjoel.fr/recherche",
      siteName: "Joël",
      title: "Recherche | Joël - Dépannage urgence Paris IDF",
      description:
        "Recherchez un plombier, serrurier ou électricien à Paris ou en Île-de-France.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Recherche | Joël - Dépannage urgence Paris IDF",
      description:
        "Recherchez un plombier, serrurier ou électricien à Paris ou en Île-de-France.",
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Suggestions populaires
// ─────────────────────────────────────────────────────────────────────────────

// Routes vérifiées : toutes existantes dans app/ (cf. /plombier/[ville],
// /plombier/{service}, /serrurerie/tarifs, etc.).
const popularSuggestions: { label: string; href: string }[] = [
  { label: "Plombier Paris 15", href: "/plombier/paris-15" },
  { label: "Serrurier 24h/24", href: "/serrurerie" },
  { label: "Électricien Boulogne", href: "/electricien/boulogne-billancourt" },
  { label: "Devis plomberie", href: "/plomberie/tarifs" },
  { label: "Stop arnaques", href: "/stop-arnaques" },
  { label: "Fuite d'eau urgente", href: "/plombier/fuite-eau" },
  { label: "Porte claquée", href: "/serrurier/ouverture-sans-percage" },
  { label: "Panne électrique", href: "/electricien/panne-electrique" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cards métier
// ─────────────────────────────────────────────────────────────────────────────

const metierCards: {
  href: string;
  title: string;
  description: string;
  Icon: typeof Wrench;
}[] = [
  {
    href: "/plomberie",
    title: "Plomberie",
    description: "Fuite, chauffe-eau, débouchage, dégât des eaux — 24h/24.",
    Icon: Wrench,
  },
  {
    href: "/serrurerie",
    title: "Serrurerie",
    description: "Porte claquée, perte de clés, blindage, ouverture rapide.",
    Icon: Shield,
  },
  {
    href: "/electricite",
    title: "Électricité",
    description: "Panne, disjoncteur, tableau, mise aux normes.",
    Icon: Zap,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Schema.org — WebPage + BreadcrumbList + référence WebSite SearchAction
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = "https://monjoel.fr";

const searchPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/recherche#webpage`,
      url: `${BASE_URL}/recherche`,
      name: "Recherche dépannage urgence Paris IDF",
      description:
        "Recherchez un plombier, serrurier ou électricien à Paris ou en Île-de-France. Intervention 30 minutes, prix fixe garanti.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#localbusiness` },
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/recherche?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/recherche#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Recherche",
          item: `${BASE_URL}/recherche`,
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default async function RecherchePage(props: RecherchePageProps) {
  const searchParams = await props.searchParams;
  const rawQ = searchParams?.q;
  const query = (Array.isArray(rawQ) ? rawQ[0] : rawQ ?? "").trim();
  const hasQuery = query.length > 0;

  return (
    <div className="relative min-h-screen bg-white">
      {/* Schema.org JSON-LD — WebPage + BreadcrumbList + SearchAction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchPageSchema) }}
      />

      {/* Décor lumineux DA Purple — halo violet/jaune en haut */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(112,85,167,0.10) 0%, transparent 60%)," +
            "radial-gradient(ellipse 50% 40% at 80% 5%, rgba(245,213,71,0.10) 0%, transparent 55%)",
        }}
      />

      {/* Hero search */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          {/* Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-joel-yellow/30 border border-joel-yellow/40">
            <Sparkles size={14} className="text-joel-violet" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-joel-violet">
              Recherche
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
            Que cherchez-vous{" "}
            <span className="bg-gradient-joel bg-clip-text text-transparent">?</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
            Plombier, serrurier, électricien à Paris ou en Île-de-France.
          </p>

          {/* Search input */}
          <SearchInput defaultValue={query} />

          {/* Mention sous-input */}
          <p className="mt-4 text-xs text-zinc-500">
            Intervention 30 minutes · Prix fixe garanti · Disponible 24h/24
          </p>
        </div>
      </section>

      {/* Bloc résultats si query */}
      {hasQuery && (
        <section className="relative py-8">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-joel-violet/15 bg-linear-to-br from-joel-violet/5 via-white to-joel-yellow/10 p-6 md:p-8 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-joel-violet text-white shadow-md shadow-joel-violet/30">
                  <Search size={20} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-500 mb-1">Résultats pour :</p>
                  <p className="text-lg md:text-xl font-bold text-zinc-900 wrap-break-word mb-3">
                    « {query} »
                  </p>
                  <p className="text-sm md:text-base text-zinc-700 mb-4">
                    Affinez votre recherche par métier ou zone, ou appelez le{" "}
                    <a
                      href="tel:0141691008"
                      className="font-bold text-joel-violet hover:text-joel-mauve transition-colors"
                    >
                      01 41 69 10 08
                    </a>{" "}
                    — un conseiller vous oriente immédiatement.
                  </p>
                  <a
                    href="tel:0141691008"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-joel text-white text-sm font-bold shadow-md shadow-joel-violet/30 hover:shadow-lg hover:shadow-joel-violet/40 hover:-translate-y-0.5 transition-all"
                  >
                    <Phone size={14} aria-hidden="true" />
                    <span>Appeler maintenant</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Suggestions populaires — chips */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
              Suggestions populaires
            </h2>
            <div className="h-px flex-1 bg-linear-to-r from-zinc-200 to-transparent" />
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {popularSuggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm font-medium text-zinc-700 hover:border-joel-violet hover:text-joel-violet hover:bg-joel-violet/5 transition-all"
                >
                  <span>{s.label}</span>
                  <ArrowRight
                    size={13}
                    aria-hidden="true"
                    className="opacity-60"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cards métier */}
      <section className="relative py-12 md:py-20 bg-linear-to-b from-transparent via-joel-violet/3 to-transparent">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">
              Vous cherchez{" "}
              <span className="bg-gradient-joel bg-clip-text text-transparent">
                un métier en particulier
              </span>{" "}
              ?
            </h2>
            <p className="text-base text-zinc-600">
              Explorez nos hubs spécialisés pour aller plus vite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {metierCards.map(({ href, title, description, Icon }) => (
              <Link
                key={href}
                href={href}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 md:p-7 shadow-xs hover:shadow-xl hover:shadow-joel-violet/15 hover:-translate-y-1 hover:border-joel-violet/40 transition-all duration-300"
              >
                {/* Halo violet au hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-joel-yellow/0 group-hover:bg-joel-yellow/30 blur-3xl transition-colors duration-500"
                />

                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-joel text-white shadow-md shadow-joel-violet/30 mb-5">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-zinc-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-zinc-600 mb-5">{description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-joel-violet group-hover:gap-2.5 transition-all">
                    <span>Découvrir</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-joel p-8 md:p-12 text-center text-white shadow-xl shadow-joel-violet/30">
            {/* Halo jaune */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-joel-yellow/30 blur-3xl"
            />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Vous ne trouvez pas ?
              </h2>
              <p className="text-white/85 mb-6 max-w-xl mx-auto">
                Appelez Joël — un conseiller vous oriente vers le bon artisan en moins
                de 60 secondes.
              </p>
              <a
                href="tel:0141691008"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-joel-yellow text-joel-violet text-base font-bold shadow-lg shadow-joel-yellow/40 hover:shadow-xl hover:shadow-joel-yellow/50 hover:-translate-y-0.5 transition-all"
              >
                <Phone size={16} aria-hidden="true" />
                <span>01 41 69 10 08</span>
              </a>
              <p className="mt-3 text-xs text-white/70">
                24h/24 · Appel gratuit · Sans engagement
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
