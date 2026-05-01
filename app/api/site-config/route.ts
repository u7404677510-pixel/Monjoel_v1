import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Cache HTTP : la config change rarement, on cache 60s côté CDN
export const revalidate = 60;
export const dynamic = "force-static";

// Default values en dur (fallback robuste)
const DEFAULTS = {
  phone_number: "01 41 69 10 08",
  primary_color: "#7055A7",
  secondary_color: "#9E76EC",
  show_testimonials: true,
  show_quiz: true,
  show_phone: true,
  show_cta_phone: true,
  show_cta_devis: true,
  cta_devis_url: "#quote-form",
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
      .from("site_config")
      .select("*")
      .maybeSingle();
    return NextResponse.json(data ?? DEFAULTS, { headers: CACHE_HEADERS });
  } catch {
    return NextResponse.json(DEFAULTS, { headers: CACHE_HEADERS });
  }
}
