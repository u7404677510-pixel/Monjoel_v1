import { createClient, SupabaseClient } from '@supabase/supabase-js';

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

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
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

