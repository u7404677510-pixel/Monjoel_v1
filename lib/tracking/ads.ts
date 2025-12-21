/**
 * Google Ads Conversion Tracking Utility
 * 
 * This module handles tracking of Google Ads conversions for tel: link clicks.
 * It works with gtag.js (NOT GTM) and ensures the dialer opens reliably on mobile.
 */

// Type declarations for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

export interface TrackingOptions {
  sendTo: string | null;
  telHref: string;
  placement?: string;
}

// Debug mode - only in development
const DEBUG = process.env.NODE_ENV === 'development';

function debugLog(message: string, data?: Record<string, unknown>) {
  if (DEBUG) {
    console.log(
      `%c[Google Ads Tracking]%c ${message}`,
      'background: #4285f4; color: white; padding: 2px 6px; border-radius: 3px;',
      'color: inherit;',
      data ? data : ''
    );
  }
}

/**
 * Check if gtag is available and ready
 */
function isGtagReady(): boolean {
  return typeof window !== 'undefined' && 
         typeof window.gtag === 'function' &&
         Array.isArray(window.dataLayer);
}

/**
 * Wait for gtag to be available (with timeout)
 */
function waitForGtag(timeout: number = 2000): Promise<boolean> {
  return new Promise((resolve) => {
    if (isGtagReady()) {
      resolve(true);
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (isGtagReady()) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        debugLog('Timeout waiting for gtag to be ready');
        resolve(false);
      }
    }, 100);
  });
}

/**
 * Opens the phone dialer with the given tel: href
 */
function openDialer(telHref: string): void {
  debugLog('Opening dialer', { telHref });
  window.location.href = telHref;
}

/**
 * Track a Google Ads conversion and then open the dialer
 * 
 * This function:
 * 1. Prevents the default link behavior
 * 2. Sends the conversion event to Google Ads via gtag
 * 3. Opens the dialer after the event is sent (or after a timeout fallback)
 * 4. If gtag is not available, opens the dialer immediately
 * 
 * @param options - The tracking options
 */
export async function trackAdsConversionAndCall(options: TrackingOptions): Promise<void> {
  const { sendTo, telHref, placement } = options;

  debugLog('Conversion tracking triggered', {
    sendTo: sendTo || '(not configured)',
    telHref,
    placement: placement || 'unknown',
    gtagAvailable: isGtagReady(),
    currentPage: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
  });

  // If no sendTo, just open dialer
  if (!sendTo) {
    debugLog('No send_to configured, opening dialer directly');
    openDialer(telHref);
    return;
  }

  // Wait for gtag to be available (max 500ms to not block UX)
  const gtagReady = await waitForGtag(500);
  
  if (!gtagReady || !window.gtag) {
    debugLog('gtag not available after waiting, opening dialer directly');
    openDialer(telHref);
    return;
  }

  // Track that we've attempted to send the conversion
  let conversionSent = false;

  // Event callback - called when the conversion is successfully sent
  const eventCallback = () => {
    if (!conversionSent) {
      conversionSent = true;
      debugLog('✅ Conversion sent successfully via event_callback, opening dialer', {
        sendTo,
        placement,
      });
      openDialer(telHref);
    }
  };

  // Fallback timeout - ensures the dialer opens even if gtag fails or is slow
  const fallbackTimeout = setTimeout(() => {
    if (!conversionSent) {
      conversionSent = true;
      debugLog('⚠️ Fallback timeout reached (400ms), opening dialer anyway', {
        sendTo,
        placement,
      });
      openDialer(telHref);
    }
  }, 400);

  try {
    // Send the conversion event
    debugLog('📤 Sending conversion event to Google Ads', {
      send_to: sendTo,
      event: 'conversion',
    });

    window.gtag('event', 'conversion', {
      send_to: sendTo,
      event_callback: () => {
        clearTimeout(fallbackTimeout);
        eventCallback();
      },
    });
  } catch (error) {
    debugLog('❌ Error sending conversion event', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    clearTimeout(fallbackTimeout);
    if (!conversionSent) {
      conversionSent = true;
      openDialer(telHref);
    }
  }
}

/**
 * Handle a click on a tel: link
 * 
 * This function is designed to be called from an event listener.
 * It prevents the default behavior, tracks the conversion, and opens the dialer.
 * 
 * @param event - The click event
 * @param sendTo - The Google Ads send_to value
 * @param placement - Optional placement identifier for debugging
 */
export function handleTelClick(
  event: MouseEvent,
  sendTo: string | null,
  placement?: string
): void {
  const target = event.target as HTMLElement;
  const anchor = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;

  if (!anchor) return;

  const telHref = anchor.href;

  // Prevent default tel: behavior
  event.preventDefault();
  event.stopPropagation();

  // Determine placement from element or attribute
  const detectedPlacement = placement || 
    anchor.dataset.placement || 
    getPlacementFromElement(anchor);

  // Track and call
  trackAdsConversionAndCall({
    sendTo,
    telHref,
    placement: detectedPlacement,
  });
}

/**
 * Try to determine the placement of the CTA from the element's context
 */
function getPlacementFromElement(element: HTMLElement): string {
  // Check for data attribute
  if (element.dataset.placement) {
    return element.dataset.placement;
  }

  // Try to determine from closest section or known parent
  const section = element.closest('section');
  if (section) {
    if (section.id) return section.id;
    const sectionClass = section.className;
    if (sectionClass.includes('hero')) return 'hero';
    if (sectionClass.includes('cta')) return 'cta';
  }

  // Check if in header or footer
  if (element.closest('header')) return 'header';
  if (element.closest('footer')) return 'footer';
  if (element.closest('nav')) return 'navigation';

  // Check page path
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.includes('serrurier')) return `serrurier-page`;
    if (path.includes('plombier') || path.includes('plomberie')) return `plomberie-page`;
    if (path.includes('electricien') || path.includes('electricite')) return `electricite-page`;
    if (path.includes('contact')) return `contact-page`;
  }

  return 'unknown';
}

/**
 * For use in Tag Assistant debugging - call this from console to test
 */
export function testConversion(sendTo: string): void {
  if (typeof window === 'undefined') {
    console.error('This function must be called in a browser');
    return;
  }

  console.log('Testing conversion with send_to:', sendTo);
  
  if (!window.gtag) {
    console.error('gtag is not available');
    return;
  }

  window.gtag('event', 'conversion', {
    send_to: sendTo,
    event_callback: () => {
      console.log('✅ Test conversion sent successfully!');
    },
  });
}

// Expose to window for debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as unknown as Record<string, unknown>).testGoogleAdsConversion = testConversion;
}
