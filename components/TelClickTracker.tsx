"use client";

import { useEffect, useRef, useCallback } from "react";
import { handleTelClick } from "@/lib/tracking/ads";

// Fallback environment variable
const ENV_SEND_TO = process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO || null;

// Debug mode
const DEBUG = process.env.NODE_ENV === 'development';

function debugLog(message: string, data?: Record<string, unknown>) {
  if (DEBUG) {
    console.log(
      `%c[TelClickTracker]%c ${message}`,
      'background: #34a853; color: white; padding: 2px 6px; border-radius: 3px;',
      'color: inherit;',
      data ? data : ''
    );
  }
}

/**
 * Fetch the Google Ads conversion ID from Supabase
 * This is done outside of React to avoid unnecessary re-renders
 */
async function fetchConversionId(): Promise<string | null> {
  try {
    // Dynamic import to avoid issues with SSR
    const { supabase } = await import("@/lib/supabase");
    
    // If supabase is not configured, return null
    if (!supabase) {
      debugLog('Supabase not configured, skipping conversion ID fetch');
      return null;
    }
    
    const { data, error } = await supabase
      .from("analytics_config")
      .select("google_ads_conversion_id")
      .single();

    if (error) {
      debugLog('Error fetching conversion ID from Supabase', { error: error.message });
      return null;
    }

    const conversionId = data?.google_ads_conversion_id || null;
    debugLog('Fetched conversion ID from Supabase', { 
      conversionId: conversionId || '(not configured)',
      hasEnvFallback: !!ENV_SEND_TO,
    });
    
    return conversionId;
  } catch (err) {
    debugLog('Exception fetching conversion ID', { 
      error: err instanceof Error ? err.message : String(err) 
    });
    return null;
  }
}

/**
 * Get the final send_to value (Supabase > Env > null)
 */
async function getSendTo(): Promise<string | null> {
  // First try Supabase
  const supabaseValue = await fetchConversionId();
  if (supabaseValue) {
    return supabaseValue;
  }
  
  // Fallback to env var
  if (ENV_SEND_TO) {
    debugLog('Using env var fallback for send_to', { sendTo: ENV_SEND_TO });
    return ENV_SEND_TO;
  }
  
  debugLog('⚠️ No send_to configured (neither Supabase nor env var)');
  return null;
}

/**
 * TelClickTracker - Global component that tracks all tel: link clicks
 * 
 * This component installs a document-level click listener (capture phase)
 * that intercepts all clicks on tel: links and triggers Google Ads conversions.
 * 
 * Features:
 * - Works on all tel: links across the entire site
 * - Handles dynamically added links
 * - Fetches send_to from Supabase backoffice or env var fallback
 * - Does not block normal navigation
 * - Works reliably on mobile (opens dialer after tracking)
 */
export default function TelClickTracker() {
  const sendToRef = useRef<string | null>(null);
  const isMountedRef = useRef(true);
  const isInitializedRef = useRef(false);

  // Click handler - memoized to avoid recreating
  const handleClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    
    // Check if the click is on a tel: link or inside one
    const anchor = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
    
    if (!anchor) {
      // Not a tel: link, let it pass through
      return;
    }

    debugLog('Tel link clicked', {
      href: anchor.href,
      sendTo: sendToRef.current || '(not configured)',
      placement: anchor.dataset.placement || 'auto-detected',
    });

    // It's a tel: link - handle it
    handleTelClick(event, sendToRef.current);
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    // Initialize the tracker
    const init = async () => {
      if (isInitializedRef.current) return;
      isInitializedRef.current = true;

      const sendTo = await getSendTo();
      
      if (isMountedRef.current) {
        sendToRef.current = sendTo;
        
        debugLog('TelClickTracker initialized', {
          sendTo: sendTo || '(not configured)',
          gtagAvailable: typeof window !== 'undefined' && typeof window.gtag === 'function',
        });
      }
    };

    init();

    // Add listener in capture phase to catch all tel: clicks before any other handlers
    document.addEventListener('click', handleClick, true);

    // Also listen for touch events on mobile (for better reliability)
    document.addEventListener('touchend', handleClick as EventListener, true);

    return () => {
      isMountedRef.current = false;
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('touchend', handleClick as EventListener, true);
    };
  }, [handleClick]);

  // This component doesn't render anything
  return null;
}
