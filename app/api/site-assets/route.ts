import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Cache HTTP : les assets changent rarement, on cache 60s côté CDN
export const revalidate = 60;
export const dynamic = "force-static";

const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
};

interface SiteAssetRow {
  slot_id: string;
  asset_url: string;
  alt_text: string | null;
  uploaded_at: string;
  uploaded_by: string | null;
}

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json([], { headers: CACHE_HEADERS });
  }

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("site_assets")
      .select("slot_id, asset_url, alt_text, uploaded_at, uploaded_by");

    // 42P01 = table missing (Supabase pas encore migré)
    if (error && (error as { code?: string }).code === "42P01") {
      return NextResponse.json([], { headers: CACHE_HEADERS });
    }
    if (error) {
      return NextResponse.json([], { headers: CACHE_HEADERS });
    }

    const rows = (data ?? []) as SiteAssetRow[];
    return NextResponse.json(rows, { headers: CACHE_HEADERS });
  } catch {
    return NextResponse.json([], { headers: CACHE_HEADERS });
  }
}
