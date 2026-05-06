/**
 * Cache des données Search Console.
 *
 * Stratégie :
 *   1. Si Supabase configuré ET table `seo_search_console_cache` existe → Supabase
 *   2. Sinon, fallback fichier JSON :
 *      - En dev : data/seo-cache.json (gitignoré)
 *      - En prod (Vercel) : /tmp/seo-cache.json (TTL 24h, peut être perdu entre invocations)
 *
 * Le shape stocké est volontairement plat pour rester portable entre les deux
 * backends.
 */

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import type { SearchAnalyticsRow } from "./search-console-client";

export type SEOCachePayload = {
  syncedAt: string; // ISO timestamp
  siteUrl: string;
  topPages: SearchAnalyticsRow[];
  topQueries: SearchAnalyticsRow[];
  dailyTrend: SearchAnalyticsRow[];
  // Comparaisons : période courante (30j) vs précédente (60-31j)
  totals: {
    current: { clicks: number; impressions: number; ctr: number; position: number };
    previous: { clicks: number; impressions: number; ctr: number; position: number };
  };
  errors?: string[];
};

const CACHE_TABLE = "seo_search_console_cache";
const CACHE_FILE_NAME = "seo-cache.json";
const TTL_MS = 24 * 60 * 60 * 1000; // 24h

function getCachePath(): string {
  // En prod sur Vercel, /tmp est le seul endroit writable
  if (process.env.VERCEL) {
    return path.join("/tmp", CACHE_FILE_NAME);
  }
  return path.join(process.cwd(), "data", CACHE_FILE_NAME);
}

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    return createClient(url, key);
  } catch {
    return null;
  }
}

async function readFromSupabase(): Promise<SEOCachePayload | null> {
  const sb = getServiceSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb
      .from(CACHE_TABLE)
      .select("payload, synced_at")
      .order("synced_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error || !data) return null;
    return data.payload as SEOCachePayload;
  } catch {
    return null;
  }
}

async function writeToSupabase(payload: SEOCachePayload): Promise<boolean> {
  const sb = getServiceSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb
      .from(CACHE_TABLE)
      .insert({ payload, synced_at: payload.syncedAt });
    return !error;
  } catch {
    return false;
  }
}

function readFromFile(): SEOCachePayload | null {
  try {
    const filePath = getCachePath();
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as SEOCachePayload;
  } catch {
    return null;
  }
}

function writeToFile(payload: SEOCachePayload): boolean {
  try {
    const filePath = getCachePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

export async function readCache(): Promise<SEOCachePayload | null> {
  // Tente Supabase d'abord, fallback fichier
  const fromDb = await readFromSupabase();
  if (fromDb) return fromDb;
  return readFromFile();
}

export async function writeCache(payload: SEOCachePayload): Promise<{ supabase: boolean; file: boolean }> {
  const supaOk = await writeToSupabase(payload);
  const fileOk = writeToFile(payload);
  return { supabase: supaOk, file: fileOk };
}

export function isCacheStale(payload: SEOCachePayload | null, ttlMs = TTL_MS): boolean {
  if (!payload) return true;
  const age = Date.now() - new Date(payload.syncedAt).getTime();
  return age > ttlMs;
}

export function ageInHours(payload: SEOCachePayload | null): number | null {
  if (!payload) return null;
  const ms = Date.now() - new Date(payload.syncedAt).getTime();
  return Math.round(ms / (60 * 60 * 1000));
}
