import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { isPremiumCity, isPremiumService } from "@/lib/seo/premium/registry";
import { TIER2_PROTECTED_PATHS } from "@/lib/seo/premium/tier2-paths";
import { isAllowedAdminEmail } from "@/lib/admin-auth";

// Note Next.js 16 : le proxy tourne toujours en Node.js runtime, pas besoin de
// `config.runtime`. Le `matcher` n'est plus supporté en config — on filtre
// inline avec le check TRADES.has() au début de la fonction.

const TRADES = new Set(["plombier", "serrurier", "electricien"]);

// Hub métier (nom commun) correspondant à chaque slug métier.
const HUB_BY_TRADE: Record<string, string> = {
  plombier: "plomberie",
  serrurier: "serrurerie",
  electricien: "electricite",
};

// Codes départements Île-de-France — miroir de lib/data/departments-idf.ts.
// Hardcodés ici pour garder le proxy léger (ne pas tirer le dataset villes
// ~970 entrées dans le bundle middleware).
const IDF_DEPT_CODES = new Set(["75", "77", "78", "91", "92", "93", "94", "95"]);

/**
 * Slugs des pages services génériques /[trade]/[service] qui ont des routes
 * STATIQUES dans app/. Ces URLs ne sont pas des villes — il ne faut pas les 410.
 *
 * Liste alignée sur app/plombier/*, app/serrurier/*, app/electricien/* + sitemap.ts.
 */
const STATIC_SERVICE_HUBS: Record<string, Set<string>> = {
  plombier: new Set([
    "fuite-eau",
    "wc-bouches",
    "degat-des-eaux",
    "chauffe-eau-panne",
    "remplacement-robinet",
    "debouchage-canalisation",
    "urgence-24h",
    "recherche-fuite",
    "ballon-eau-chaude",
    "chaudiere-panne",
    "debouchage-wc",
    "evier-bouche",
    "chasse-eau",
    "fuite-tuyau",
    "installation-wc",
    "groupe-securite",
    "lavabo-bouche",
  ]),
  serrurier: new Set([
    "ouverture-sans-percage",
    "ouverture-avec-percage",
    "perte-cles",
    "cle-cassee-serrure",
    "blindage-porte",
    "serrure-bloquee",
    "porte-fermee-a-cle",
    "changement-cylindre",
    "changement-serrure",
    "apres-effraction",
    "serrure-3-points",
    "serrure-multipoints",
    "cylindre-haute-securite",
    "porte-blindee",
    "coffre-fort",
    "rideau-metallique",
    "reproduction-cles",
  ]),
  electricien: new Set([
    "panne-electrique",
    "disjoncteur-saute",
    "tableau-electrique",
    "prise-interrupteur-hs",
    "court-circuit",
    "mise-aux-normes",
  ]),
};

function gone(): NextResponse {
  // HTTP 410 Gone — signal explicite à Google que cette URL est définitivement
  // supprimée. Body minimal (Google scanne surtout le code de statut).
  return new NextResponse(
    `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Page supprimée — Joël</title><meta name="robots" content="noindex, nofollow"></head><body><h1>Page supprimée</h1><p>Cette page a été supprimée définitivement. <a href="https://monjoel.fr/">Retour à l'accueil</a>.</p></body></html>`,
    {
      status: 410,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
}

function permanentRedirect(request: NextRequest, to: string): NextResponse {
  // 308 = redirection permanente (équivalent SEO du 301, cohérent avec les
  // redirects `permanent: true` de next.config.mjs qui émettent aussi du 308).
  return NextResponse.redirect(new URL(to, request.url), 308);
}

/**
 * URLs « legacy » mortes qui CONTOURNENT la logique 410 du proxy — elles ne
 * passent pas le filtre `TRADES.has(segments[0])` plus bas et finissaient donc
 * en 404 (app/not-found.tsx, via le catch-all app/[slug]) au lieu d'un signal
 * de redirection propre. On les renvoie en 308 vers la page la plus pertinente.
 *
 * Retourne une réponse, ou null si l'URL n'est pas concernée (flux normal).
 *
 *   1. /plombier, /serrurier, /electricien                  → hub (/plomberie…)
 *   2. /plombier-paris, /serrurier-pas-cher, /plombier-99   → hub métier
 *      /plombier-92-hauts-de-seine (code dépt IDF détecté)  → /plombier-92
 *      /plombier-75 (vraie page département)                → laissé en 200
 *
 * NON géré ici (volontaire) : les sous-chemins /plomberie/<x> (hors /tarifs) et
 * les slugs racine non préfixés métier (/depannage-plombier…). Aucune preuve
 * qu'ils soient indexés ; un 404 y reste sémantiquement correct. À convertir au
 * cas par cas via next.config.redirects() si GSC en remonte du volume.
 */
function redirectLegacyDeadUrl(
  request: NextRequest,
  segments: string[],
): NextResponse | null {
  if (segments.length !== 1) return null;
  const slug = segments[0];

  // (1) Nom de métier nu → hub métier.
  if (HUB_BY_TRADE[slug]) {
    return permanentRedirect(request, `/${HUB_BY_TRADE[slug]}`);
  }

  // (2) Slug racine préfixé par un métier (hors vraie page département).
  const m = slug.match(/^(plombier|serrurier|electricien)-(.+)$/);
  if (m) {
    const trade = m[1];
    const rest = m[2];
    const codeMatch = rest.match(/^(\d{2})(?:-.*)?$/);
    if (codeMatch && IDF_DEPT_CODES.has(codeMatch[1])) {
      // /plombier-75 exact = vraie page département (app/[slug]) → laisser en 200.
      if (rest === codeMatch[1]) return null;
      // /plombier-92-hauts-de-seine → page département /plombier-92.
      return permanentRedirect(request, `/${trade}-${codeMatch[1]}`);
    }
    // /plombier-paris, /serrurier-pas-cher, /plombier-99 (dépt hors IDF)… → hub.
    return permanentRedirect(request, `/${HUB_BY_TRADE[trade]}`);
  }

  return null;
}

/**
 * Construit un client Supabase « serveur » lié aux cookies de la requête, valide
 * le JWT via getUser() (≠ simple présence de cookie, forgeable) et renvoie
 * l'utilisateur + une réponse mutable (cookies de session rafraîchis si rotation).
 * user = null si Supabase n'est pas configuré.
 */
async function getRequestUser(
  request: NextRequest,
): Promise<{ user: User | null; response: NextResponse }> {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return { user: null, response };

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user, response };
}

/**
 * Garde serveur du back-office /admin et de l'API /api/admin.
 *
 *  - /admin/login   → toujours accessible (sinon boucle de redirection infinie).
 *  - /api/admin/*   → 401 JSON si non autorisé. Fallback header X-Admin-Key
 *                     (=== ADMIN_API_KEY) pour le debug/cron manuel.
 *  - /admin/*       → redirection vers /admin/login si non autorisé.
 *
 * « Autorisé » = session Supabase valide (JWT revalidé côté serveur via
 * getUser(), et non un simple test de présence de cookie) ET email présent
 * dans l'allowlist ADMIN_ALLOWED_EMAILS (variable serveur, jamais NEXT_PUBLIC_).
 */
async function guardAdmin(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith("/api/admin");

  // La page de login doit rester publique.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Fallback header réservé aux routes API (debug / cron manuel).
  if (isApi) {
    const adminKey = process.env.ADMIN_API_KEY;
    const provided = request.headers.get("x-admin-key");
    if (adminKey && provided && provided === adminKey) {
      return NextResponse.next();
    }
  }

  const { user, response } = await getRequestUser(request);
  if (user && isAllowedAdminEmail(user.email)) {
    return response;
  }

  // Non autorisé (pas de session, email hors allowlist, ou Supabase non configuré).
  if (isApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

/**
 * Garde serveur des portails /artisan et /client.
 *  - Racine (/artisan, /client) = entrée/login publique → laissée passer.
 *  - Sous-routes (/artisan/*, /client/*) = exigent une session authentifiée
 *    (JWT revalidé via getUser()), sinon redirection vers la racine du portail.
 *
 * La RLS Supabase reste le garde-fou des DONNÉES (chacun ne voit que les
 * siennes) ; ce gate empêche surtout l'accès NON authentifié aux pages.
 * (Affinage du rôle « artisan » : à ajouter quand profiles.role est fiabilisé.)
 */
async function guardPortal(
  request: NextRequest,
  root: "/artisan" | "/client",
): Promise<NextResponse> {
  if (request.nextUrl.pathname === root) {
    return NextResponse.next();
  }
  const { user, response } = await getRequestUser(request);
  if (user) {
    return response;
  }
  return NextResponse.redirect(new URL(root, request.url));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Back-office : protection serveur (session Supabase + allowlist email) ──
  // Doit passer AVANT la logique SEO 410.
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    return guardAdmin(request);
  }

  // ── Portails : exiger une session sur les sous-routes (racines publiques) ──
  if (pathname === "/artisan" || pathname.startsWith("/artisan/")) {
    return guardPortal(request, "/artisan");
  }
  if (pathname === "/client" || pathname.startsWith("/client/")) {
    return guardPortal(request, "/client");
  }

  const segments = pathname.split("/").filter(Boolean);

  // URLs legacy mortes qui contournent la logique 410 ci-dessous (métier nu,
  // slug racine préfixé métier, ancienne page dépt mal formée) → 308 propre
  // vers le hub/département pertinent, au lieu d'un 404 (app/not-found.tsx).
  const legacy = redirectLegacyDeadUrl(request, segments);
  if (legacy) return legacy;

  // Pas la peine d'intervenir hors trade/X(/Y).
  if (segments.length < 2 || !TRADES.has(segments[0])) {
    return NextResponse.next();
  }

  const trade = segments[0];
  const second = segments[1];
  const third = segments[2];

  // /[trade]/[service-statique] → laisse passer (page hub service, pas une ville).
  if (STATIC_SERVICE_HUBS[trade]?.has(second)) {
    return NextResponse.next();
  }

  // Tier 2 — pages avec trafic résiduel (≥1 clic GSC sur 90j).
  // On les laisse en 200 (rendu fallback noindex auto) au lieu de 410,
  // pour ne pas casser les appels existants.
  if (TIER2_PROTECTED_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // À ce stade, second est traité comme un slug de ville.
  // /[trade]/[ville] sans service.
  if (!third) {
    if (!isPremiumCity(trade, second)) return gone();
    return NextResponse.next();
  }

  // /[trade]/[ville]/[service]
  if (!isPremiumService(trade, second, third)) return gone();
  return NextResponse.next();
}
