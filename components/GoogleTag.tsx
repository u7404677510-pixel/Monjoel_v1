"use client";

/**
 * GoogleTag Component - DÉSACTIVÉ
 * 
 * Ce composant était utilisé pour charger gtag.js directement.
 * 
 * MAINTENANT : Le tracking est géré par GTM (Google Tag Manager) qui est
 * chargé dans app/layout.tsx avec Consent Mode v2 et Cookiebot.
 * 
 * Ce composant est conservé mais désactivé pour éviter :
 * - Double chargement de gtag.js
 * - Conflits avec Consent Mode v2
 * - Tags qui tirent avant consentement
 * 
 * Si tu as besoin de revenir à gtag.js direct (sans GTM),
 * décommente le code ci-dessous et retire GTM de layout.tsx.
 */

// Debug mode
const DEBUG = process.env.NODE_ENV === 'development';

function debugLog(message: string, data?: Record<string, unknown>) {
  if (DEBUG) {
    console.log(
      `%c[GoogleTag]%c ${message}`,
      'background: #ea4335; color: white; padding: 2px 6px; border-radius: 3px;',
      'color: inherit;',
      data ? data : ''
    );
  }
}

export default function GoogleTag() {
  // GTM est maintenant utilisé à la place de gtag.js direct
  // Ce composant ne rend plus rien pour éviter les doublons
  
  if (DEBUG) {
    debugLog('GoogleTag component disabled - GTM is now handling all tracking via layout.tsx');
  }
  
  return null;
  
  /* 
  ============================================
  CODE ORIGINAL (désactivé) - Ne pas supprimer
  ============================================
  
  import Script from "next/script";
  import { useEffect, useState } from "react";
  import { supabase } from "@/lib/supabase";
  
  const [gtagId, setGtagId] = useState<string | null>(null);
  const [gaId, setGaId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      if (!supabase) {
        debugLog('Supabase not configured, skipping analytics config load');
        return;
      }
      try {
        const { data, error } = await supabase
          .from("analytics_config")
          .select("gtag_id, google_analytics_id")
          .single();

        if (error) throw error;
        if (data) {
          const gtag = data.gtag_id || null;
          const ga = data.google_analytics_id || null;
          
          setGtagId(gtag);
          setGaId(ga);
          
          debugLog('Config loaded from Supabase', {
            gtagId: gtag || '(not set)',
            gaId: ga || '(not set)',
          });
        }
      } catch (err) {
        console.error("Error loading analytics config:", err);
        debugLog('Error loading config', { 
          error: err instanceof Error ? err.message : String(err) 
        });
      }
    }
    loadConfig();
  }, []);

  // Don't render anything if no tracking ID is configured
  if (!gtagId && !gaId) {
    debugLog('No tracking IDs configured, not rendering scripts');
    return null;
  }

  const primaryId = gtagId || gaId;

  const handleScriptLoad = () => {
    setIsLoaded(true);
    debugLog('✅ gtag.js script loaded successfully', {
      primaryId,
      gtagAvailable: typeof window !== 'undefined' && typeof window.gtag === 'function',
    });
  };

  const handleScriptError = () => {
    debugLog('❌ Failed to load gtag.js script');
  };

  return (
    <>
      <Script
        id="gtag-base"
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {\`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          \${gtagId ? \`gtag('config', '\${gtagId}');\` : ''}
          \${gaId && gaId !== gtagId ? \`gtag('config', '\${gaId}');\` : ''}
        \`}
      </Script>
    </>
  );
  */
}
