import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPremiumCity, isPremiumService } from "@/lib/seo/premium/registry";
import { TIER2_PROTECTED_PATHS } from "@/lib/seo/premium/tier2-paths";

// Note Next.js 16 : le proxy tourne toujours en Node.js runtime, pas besoin de
// `config.runtime`. Le `matcher` n'est plus supporté en config — on filtre
// inline avec le check TRADES.has() au début de la fonction.

const TRADES = new Set(["plombier", "serrurier", "electricien"]);

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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

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
