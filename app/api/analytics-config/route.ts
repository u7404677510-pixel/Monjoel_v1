import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Cache HTTP : la config analytics change rarement, on cache 60s côté CDN
export const revalidate = 60;
export const dynamic = "force-static";

const DEFAULTS = {
  gtag_id: null as string | null,
  google_analytics_id: null as string | null,
  google_ads_conversion_id: null as string | null,
};

const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
};

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json(DEFAULTS, { headers: CACHE_HEADERS });
  }

  try {
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from("analytics_config")
      .select("gtag_id, google_analytics_id, google_ads_conversion_id")
      .maybeSingle();
    return NextResponse.json(data ?? DEFAULTS, { headers: CACHE_HEADERS });
  } catch {
    return NextResponse.json(DEFAULTS, { headers: CACHE_HEADERS });
  }
}
