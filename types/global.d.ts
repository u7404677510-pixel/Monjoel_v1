// Types globaux pour le projet

// Google Tag Manager dataLayer et gtag
interface Window {
  dataLayer: Record<string, unknown>[];
  gtag?: (
    command: "event" | "config" | "js" | "set" | "consent",
    targetId: string,
    config?: Record<string, unknown>
  ) => void;
}
