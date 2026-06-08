import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// Lazy initialization to avoid issues during SSG build
let supabaseInstance: SupabaseClient | null = null;
let initialized = false;

function getSupabaseClient(): SupabaseClient | null {
  if (initialized) {
    return supabaseInstance;
  }

  initialized = true;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Supabase] Missing credentials, using null client');
    return null;
  }

  // Navigateur : client cookie-based (@supabase/ssr) → la session est lisible
  // côté serveur (proxy + route handlers via getUser()) ET partagée par tous
  // les clients navigateur (login, layout admin, hooks data RLS-authenticated).
  // Serveur (API routes) : client anon classique, sans session persistée, pour
  // les inserts publics (leads, recrutement…). Comportement serveur inchangé.
  supabaseInstance =
    typeof window === 'undefined'
      ? createClient(supabaseUrl, supabaseAnonKey)
      : (createBrowserClient(supabaseUrl, supabaseAnonKey) as SupabaseClient);
  return supabaseInstance;
}

// Export a getter function and a direct reference for compatibility
export const supabase = getSupabaseClient();
export { getSupabaseClient };

// Types for our database
export interface SiteConfig {
  id: number;
  phone_number: string;
  primary_color: string;
  secondary_color: string;
  show_testimonials: boolean;
  show_quiz: boolean;
  show_phone: boolean;
  show_cta_phone: boolean;
  show_cta_devis: boolean;
  cta_devis_url: string;
  updated_at: string;
}

export interface ContentItem {
  id: string;
  title: string;
  page: string;
  content: string;
  updated_at: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  active: boolean;
  order_index: number;
  created_at: string;
}

export interface SEOPage {
  id: string;
  page_slug: string;
  page_name: string;
  title: string;
  description: string;
  keywords: string;
  updated_at: string;
}

export interface AnalyticsConfig {
  id: number;
  google_analytics_id: string | null;
  google_ads_id: string | null;
  google_ads_conversion_id: string | null;
  updated_at: string;
}

export interface Lead {
  id: string;
  problem: string;
  problem_label: string;
  trade: string;
  postal_code: string;
  phone: string;
  source: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  /** Liaison au compte client (RLS). Optionnels — null pour un lead anonyme. */
  user_id?: string | null;
  email?: string | null;
  urgency?: string | null;
  urgency_label?: string | null;
}

export interface RecruitmentApplication {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  trades: string[];
  zone: string;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  request_type: 'question' | 'reclamation' | 'recrutement' | 'presse' | 'autre';
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

