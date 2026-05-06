"use client";

import { useState, useEffect } from "react";

interface SiteConfig {
  phone_number: string;
  primary_color: string;
  secondary_color: string;
  show_testimonials: boolean;
  show_quiz: boolean;
  show_phone: boolean;
  show_cta_phone: boolean;
  show_cta_devis: boolean;
  cta_devis_url: string;
}

const defaultConfig: SiteConfig = {
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

// Module-level cache: shared across all useSiteConfig instances on the page
let cachedConfig: SiteConfig | null = null;
let inflight: Promise<SiteConfig> | null = null;

async function loadSiteConfig(): Promise<SiteConfig> {
  if (cachedConfig) return cachedConfig;
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const res = await fetch("/api/site-config");
      if (!res.ok) return defaultConfig;
      const data = await res.json();
      const merged: SiteConfig = {
        phone_number: data?.phone_number || defaultConfig.phone_number,
        primary_color: data?.primary_color || defaultConfig.primary_color,
        secondary_color: data?.secondary_color || defaultConfig.secondary_color,
        show_testimonials: data?.show_testimonials ?? defaultConfig.show_testimonials,
        show_quiz: data?.show_quiz ?? defaultConfig.show_quiz,
        show_phone: data?.show_phone ?? defaultConfig.show_phone,
        show_cta_phone: data?.show_cta_phone ?? defaultConfig.show_cta_phone,
        show_cta_devis: data?.show_cta_devis ?? defaultConfig.show_cta_devis,
        cta_devis_url: data?.cta_devis_url || defaultConfig.cta_devis_url,
      };
      cachedConfig = merged;
      return merged;
    } catch {
      return defaultConfig;
    }
  })();

  return inflight;
}

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(cachedConfig ?? defaultConfig);
  const [loading, setLoading] = useState(!cachedConfig);

  useEffect(() => {
    let cancelled = false;
    loadSiteConfig()
      .then((data) => {
        if (!cancelled) {
          setConfig(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { config, loading };
}

export function formatPhoneForTel(phone: string): string {
  return phone.replace(/\s/g, "");
}
