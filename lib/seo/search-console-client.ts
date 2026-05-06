/**
 * Google Search Console API client.
 *
 * Auth : service account JSON key — credentials lus depuis :
 *   - process.env.GSC_SERVICE_ACCOUNT_KEY     (JSON stringifié, recommandé pour Vercel)
 *   - process.env.GSC_SERVICE_ACCOUNT_KEY_FILE (path absolu vers fichier .json)
 *
 * Site cible : process.env.GSC_SITE_URL (défaut : "sc-domain:monjoel.fr").
 *
 * Setup côté GCP :
 *   1. Console GCP → IAM → Service accounts → Créer un compte
 *   2. APIs & Services → Activer "Search Console API"
 *   3. Créer une clé JSON pour le service account
 *   4. Dans Search Console (search.google.com/search-console) → Settings →
 *      Users and permissions → Ajouter l'email du service account comme "Owner"
 *   5. Copier le JSON entier dans la variable Vercel GSC_SERVICE_ACCOUNT_KEY
 *
 * Sécurité : credentials JAMAIS retournés ni loggés.
 */

import { google } from "googleapis";
import type { searchconsole_v1 } from "googleapis";
import fs from "node:fs";

const DEFAULT_SITE_URL = "sc-domain:monjoel.fr";
const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];

export type GSCConfigStatus = {
  configured: boolean;
  reason?: string;
  source?: "env" | "file";
};

export type SearchAnalyticsRow = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type SearchAnalyticsParams = {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  dimensions?: Array<"date" | "query" | "page" | "country" | "device" | "searchAppearance">;
  rowLimit?: number;
  startRow?: number;
};

export type IndexCoverageStatus = {
  indexed: number;
  notIndexed: number;
  total: number;
  notes: string;
};

/**
 * Vérifie si le client est configuré, sans tenter d'auth.
 * Safe à appeler n'importe où (UI, API, cron).
 */
export function getConfigStatus(): GSCConfigStatus {
  if (process.env.GSC_SERVICE_ACCOUNT_KEY) {
    return { configured: true, source: "env" };
  }
  if (process.env.GSC_SERVICE_ACCOUNT_KEY_FILE) {
    const path = process.env.GSC_SERVICE_ACCOUNT_KEY_FILE;
    if (!fs.existsSync(path)) {
      return {
        configured: false,
        reason: `GSC_SERVICE_ACCOUNT_KEY_FILE défini mais fichier introuvable (${path}).`,
      };
    }
    return { configured: true, source: "file" };
  }
  return {
    configured: false,
    reason:
      "Service account non configuré. Définir GSC_SERVICE_ACCOUNT_KEY (JSON stringifié) ou GSC_SERVICE_ACCOUNT_KEY_FILE (path).",
  };
}

export function getSiteUrl(): string {
  return process.env.GSC_SITE_URL || DEFAULT_SITE_URL;
}

type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
};

function loadCredentials(): ServiceAccountCredentials {
  const inline = process.env.GSC_SERVICE_ACCOUNT_KEY;
  if (inline) {
    try {
      const parsed = JSON.parse(inline) as ServiceAccountCredentials;
      if (!parsed.client_email || !parsed.private_key) {
        throw new Error("client_email ou private_key manquant dans le JSON.");
      }
      return parsed;
    } catch (err) {
      // Ne JAMAIS leak le contenu de la variable (peut contenir la private key)
      throw new Error(
        `GSC_SERVICE_ACCOUNT_KEY n'est pas un JSON service account valide (${err instanceof Error ? err.message : "parse error"}).`,
      );
    }
  }

  const filePath = process.env.GSC_SERVICE_ACCOUNT_KEY_FILE;
  if (filePath) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Fichier service account introuvable : ${filePath}.`);
    }
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as ServiceAccountCredentials;
    if (!parsed.client_email || !parsed.private_key) {
      throw new Error("client_email ou private_key manquant dans le fichier service account.");
    }
    return parsed;
  }

  throw new Error(
    "Service account non configuré (GSC_SERVICE_ACCOUNT_KEY ou GSC_SERVICE_ACCOUNT_KEY_FILE requis).",
  );
}

let cachedClient: searchconsole_v1.Searchconsole | null = null;

function getClient(): searchconsole_v1.Searchconsole {
  if (cachedClient) return cachedClient;

  const credentials = loadCredentials();

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
  });

  cachedClient = google.searchconsole({ version: "v1", auth });
  return cachedClient;
}

/**
 * Format YYYY-MM-DD pour les paramètres GSC.
 */
export function formatGSCDate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Date d'il y a `daysBack` jours en UTC, format YYYY-MM-DD.
 */
export function dateNDaysAgo(daysBack: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - daysBack);
  return formatGSCDate(d);
}

/**
 * Fetch brut des analytics. Échoue si non configuré.
 */
export async function fetchSearchAnalytics(
  params: SearchAnalyticsParams,
): Promise<SearchAnalyticsRow[]> {
  const client = getClient();
  const siteUrl = getSiteUrl();

  const res = await client.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: params.startDate,
      endDate: params.endDate,
      dimensions: params.dimensions,
      rowLimit: params.rowLimit ?? 1000,
      startRow: params.startRow ?? 0,
      type: "web",
    },
  });

  const rows = res.data.rows ?? [];
  return rows.map((row) => ({
    keys: row.keys ?? [],
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  }));
}

/**
 * Top pages sur les `daysBack` derniers jours, triées par clics descendants.
 */
export async function fetchTopPages(daysBack = 30, rowLimit = 100): Promise<SearchAnalyticsRow[]> {
  return fetchSearchAnalytics({
    startDate: dateNDaysAgo(daysBack),
    endDate: dateNDaysAgo(1), // GSC a un délai de ~1-2 jours
    dimensions: ["page"],
    rowLimit,
  });
}

/**
 * Top requêtes sur les `daysBack` derniers jours, triées par clics descendants.
 */
export async function fetchTopQueries(
  daysBack = 30,
  rowLimit = 100,
): Promise<SearchAnalyticsRow[]> {
  return fetchSearchAnalytics({
    startDate: dateNDaysAgo(daysBack),
    endDate: dateNDaysAgo(1),
    dimensions: ["query"],
    rowLimit,
  });
}

/**
 * Tendance journalière sur les `daysBack` derniers jours.
 */
export async function fetchDailyTrend(daysBack = 90): Promise<SearchAnalyticsRow[]> {
  return fetchSearchAnalytics({
    startDate: dateNDaysAgo(daysBack),
    endDate: dateNDaysAgo(1),
    dimensions: ["date"],
    rowLimit: daysBack + 10,
  });
}

/**
 * Couverture d'index (approximation via le nombre de pages distinctes vues
 * en search). L'URL Inspection API officielle est limitée à 2000 calls/jour
 * et complexe à orchestrer — on approxime ici.
 */
export async function fetchIndexCoverage(): Promise<IndexCoverageStatus> {
  const pages = await fetchSearchAnalytics({
    startDate: dateNDaysAgo(90),
    endDate: dateNDaysAgo(1),
    dimensions: ["page"],
    rowLimit: 5000,
  });
  const indexed = pages.filter((p) => p.impressions > 0).length;
  return {
    indexed,
    notIndexed: 0, // l'API GSC ne renvoie pas les pages non vues. À enrichir via URL Inspection.
    total: indexed,
    notes:
      "Approximation via Search Analytics (pages avec >0 impression sur 90j). Pour la vraie couverture, voir Search Console UI ou implémenter URL Inspection API.",
  };
}

/**
 * Test rapide de la connexion. Lance une requête minimale et retourne
 * un statut booléen + message lisible.
 */
export async function testConnection(): Promise<{ ok: boolean; message: string }> {
  try {
    await fetchSearchAnalytics({
      startDate: dateNDaysAgo(7),
      endDate: dateNDaysAgo(1),
      dimensions: ["date"],
      rowLimit: 1,
    });
    return { ok: true, message: `Connexion OK sur ${getSiteUrl()}.` };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur inconnue.";
    // Sanitize : on ne veut pas leak la private key même si une erreur la mentionne
    const sanitized = msg.replace(/-----BEGIN [\s\S]*?-----END [^-]+-----/g, "[PRIVATE_KEY_REDACTED]");
    return { ok: false, message: sanitized };
  }
}
