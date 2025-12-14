"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function GoogleTag() {
  const [gtagId, setGtagId] = useState<string | null>(null);
  const [gaId, setGaId] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        const { data, error } = await supabase
          .from("analytics_config")
          .select("gtag_id, google_analytics_id")
          .single();

        if (error) throw error;
        if (data) {
          setGtagId(data.gtag_id || null);
          setGaId(data.google_analytics_id || null);
        }
      } catch (err) {
        console.error("Error loading analytics config:", err);
      }
    }
    loadConfig();
  }, []);

  // Don't render anything if no tracking ID is configured
  if (!gtagId && !gaId) return null;

  const primaryId = gtagId || gaId;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${gtagId ? `gtag('config', '${gtagId}');` : ''}
          ${gaId && gaId !== gtagId ? `gtag('config', '${gaId}');` : ''}
        `}
      </Script>
    </>
  );
}

