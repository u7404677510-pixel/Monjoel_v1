"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
  phone_number: "01 89 47 05 56",
  primary_color: "#7055A7",
  secondary_color: "#9E76EC",
  show_testimonials: true,
  show_quiz: true,
  show_phone: true,
  show_cta_phone: true,
  show_cta_devis: true,
  cta_devis_url: "https://app.monjoel.fr",
};

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      // If supabase is not configured, use default config
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("site_config")
          .select("*")
          .single();

        if (error) throw error;
        if (data) {
          setConfig({
            phone_number: data.phone_number || defaultConfig.phone_number,
            primary_color: data.primary_color || defaultConfig.primary_color,
            secondary_color: data.secondary_color || defaultConfig.secondary_color,
            show_testimonials: data.show_testimonials ?? defaultConfig.show_testimonials,
            show_quiz: data.show_quiz ?? defaultConfig.show_quiz,
            show_phone: data.show_phone ?? defaultConfig.show_phone,
            show_cta_phone: data.show_cta_phone ?? defaultConfig.show_cta_phone,
            show_cta_devis: data.show_cta_devis ?? defaultConfig.show_cta_devis,
            cta_devis_url: data.cta_devis_url || defaultConfig.cta_devis_url,
          });
        }
      } catch (err) {
        console.error("Error fetching site config:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { config, loading };
}

export function formatPhoneForTel(phone: string): string {
  return phone.replace(/\s/g, "");
}
