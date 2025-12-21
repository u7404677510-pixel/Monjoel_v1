"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface AnalyticsConfig {
  gtagId: string | null;
  googleAnalyticsId: string | null;
  googleAdsConversionId: string | null;
}

const defaultConfig: AnalyticsConfig = {
  gtagId: null,
  googleAnalyticsId: null,
  googleAdsConversionId: null,
};

// Singleton to cache the config and prevent multiple fetches
let cachedConfig: AnalyticsConfig | null = null;
let fetchPromise: Promise<AnalyticsConfig> | null = null;

async function fetchAnalyticsConfig(): Promise<AnalyticsConfig> {
  // Return cached config if available
  if (cachedConfig) {
    return cachedConfig;
  }

  // Return existing promise if fetch is in progress
  if (fetchPromise) {
    return fetchPromise;
  }

  fetchPromise = (async () => {
    // If supabase is not configured, return default config
    if (!supabase) {
      return defaultConfig;
    }

    try {
      const { data, error } = await supabase
        .from("analytics_config")
        .select("gtag_id, google_analytics_id, google_ads_conversion_id")
        .single();

      if (error) throw error;

      const config: AnalyticsConfig = {
        gtagId: data?.gtag_id || null,
        googleAnalyticsId: data?.google_analytics_id || null,
        googleAdsConversionId: data?.google_ads_conversion_id || null,
      };

      cachedConfig = config;
      return config;
    } catch (err) {
      console.error("Error fetching analytics config:", err);
      return defaultConfig;
    }
  })();

  return fetchPromise;
}

/**
 * Hook to get the analytics configuration from Supabase
 * 
 * Returns the Google Ads conversion ID for tracking phone clicks.
 * Falls back to NEXT_PUBLIC_GOOGLE_ADS_SEND_TO env var if not configured in backoffice.
 */
export function useAnalyticsConfig() {
  const [config, setConfig] = useState<AnalyticsConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsConfig().then((fetchedConfig) => {
      setConfig(fetchedConfig);
      setLoading(false);
    });
  }, []);

  // Get the send_to value with fallback
  const getSendTo = useCallback((): string | null => {
    // Priority 1: Backoffice value
    if (config.googleAdsConversionId) {
      return config.googleAdsConversionId;
    }
    // Priority 2: Environment variable
    const envSendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO;
    if (envSendTo) {
      return envSendTo;
    }
    // No conversion ID configured
    return null;
  }, [config.googleAdsConversionId]);

  return {
    config,
    loading,
    getSendTo,
    conversionId: getSendTo(),
  };
}

/**
 * Get the Google Ads conversion send_to value
 * Can be called outside of React components
 */
export async function getGoogleAdsConversionId(): Promise<string | null> {
  const config = await fetchAnalyticsConfig();
  
  // Priority 1: Backoffice value
  if (config.googleAdsConversionId) {
    return config.googleAdsConversionId;
  }
  
  // Priority 2: Environment variable
  const envSendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO;
  if (envSendTo) {
    return envSendTo;
  }
  
  return null;
}

