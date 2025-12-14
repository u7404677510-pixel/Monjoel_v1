import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface SiteConfig {
  id: number;
  phone_number: string;
  primary_color: string;
  secondary_color: string;
  show_testimonials: boolean;
  show_quiz: boolean;
  show_phone: boolean;
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

