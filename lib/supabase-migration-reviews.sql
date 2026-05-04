-- =============================================
-- MIGRATION : Table avis clients (GMB + autres sources)
-- Date : 2026-05-04
-- =============================================
--
-- Contexte : refonte SEO post-désindexation. Pour réinjecter un
-- aggregateRating Schema.org LÉGITIME (et non fictif comme avant), on
-- s'appuie sur des avis VÉRIFIÉS depuis Google My Business (et autres
-- sources futures : Trustpilot, Pages Jaunes, etc.).
--
-- Règle d'or : Schema.org aggregateRating n'est émis QUE si on a ≥10
-- avis vérifiés dans cette table. Sinon, le schema est omis (pas de
-- mensonge à Google).
--
-- À exécuter dans l'éditeur SQL Supabase.

-- ============================================
-- Table reviews (avis individuels)
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Source de l'avis
  -- 'gmb' = Google My Business (à fetcher via API)
  -- 'pagesjaunes' = Pages Jaunes (manuel pour l'instant)
  -- 'trustpilot' = Trustpilot
  -- 'manual' = saisi à la main par l'admin (avec preuve scannée)
  source VARCHAR(50) NOT NULL CHECK (source IN ('gmb', 'pagesjaunes', 'trustpilot', 'manual')),

  -- ID externe (review ID GMB, etc.) pour éviter les doublons à la sync
  source_id VARCHAR(255),

  -- Auteur
  author_name VARCHAR(255) NOT NULL,
  author_initial CHAR(1), -- "Marie L." → initial "M" pour anonymisation publique
  author_avatar_url TEXT,

  -- Géolocalisation (si dispo)
  city_slug VARCHAR(100),     -- ex: "paris-11"
  quartier VARCHAR(100),       -- ex: "Bastille" (optionnel, parfois mentionné dans review)

  -- Contenu
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  service_type VARCHAR(50),    -- 'plombier' | 'serrurier' | 'electricien' (si déductible)

  -- Réponse Joël
  replied BOOLEAN DEFAULT false,
  reply_text TEXT,
  replied_at TIMESTAMP WITH TIME ZONE,
  replied_by VARCHAR(100),

  -- Métadonnées
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Modération
  verified BOOLEAN DEFAULT false,    -- true uniquement si confirmé authentique (admin)
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'hidden', 'flagged')),
  hidden_reason TEXT,

  -- Index unique pour éviter doublons à la re-sync
  CONSTRAINT reviews_source_id_unique UNIQUE (source, source_id)
);

-- Index pour requêtes courantes
CREATE INDEX IF NOT EXISTS idx_reviews_status_published ON reviews(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_city_slug ON reviews(city_slug) WHERE status = 'approved';
CREATE INDEX IF NOT EXISTS idx_reviews_verified_published ON reviews(verified, published_at DESC) WHERE verified = true;

-- ============================================
-- Table aggregate_rating_cache (cache calculé)
-- ============================================
-- Évite de recalculer la moyenne à chaque page render.
-- Refresh nightly via /api/cron/reviews-aggregate-refresh.
CREATE TABLE IF NOT EXISTS aggregate_rating_cache (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- single-row table
  total_count INTEGER NOT NULL DEFAULT 0,
  verified_count INTEGER NOT NULL DEFAULT 0,
  average_rating NUMERIC(3, 2) NOT NULL DEFAULT 0.00,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Breakdown par métier
  plombier_count INTEGER DEFAULT 0,
  plombier_average NUMERIC(3, 2) DEFAULT 0.00,
  serrurier_count INTEGER DEFAULT 0,
  serrurier_average NUMERIC(3, 2) DEFAULT 0.00,
  electricien_count INTEGER DEFAULT 0,
  electricien_average NUMERIC(3, 2) DEFAULT 0.00
);

INSERT INTO aggregate_rating_cache (id, total_count, verified_count, average_rating)
VALUES (1, 0, 0, 0.00)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- RLS (Row Level Security)
-- ============================================
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE aggregate_rating_cache ENABLE ROW LEVEL SECURITY;

-- Lecture publique : seulement les avis approved + verified
CREATE POLICY "Allow public read approved reviews" ON reviews
  FOR SELECT USING (status = 'approved' AND verified = true);

-- Lecture publique : aggregate cache toujours
CREATE POLICY "Allow public read aggregate" ON aggregate_rating_cache
  FOR SELECT USING (true);

-- Écriture : seulement service_role (admin) — à durcir avec auth.uid() quand
-- on aura une vraie auth admin. Pour l'instant: anon = bloqué en write.
-- (Ne PAS répliquer le pattern "Allow anon write" du schema actuel pour
--  les reviews : c'est sensible et faux peut être créé par un attaquant.)

-- ============================================
-- Function helper : recalcule l'aggregate cache
-- ============================================
-- À appeler après chaque INSERT/UPDATE de reviews via trigger ou cron.
CREATE OR REPLACE FUNCTION refresh_aggregate_rating_cache()
RETURNS void AS $$
BEGIN
  UPDATE aggregate_rating_cache
  SET
    total_count = (SELECT COUNT(*) FROM reviews WHERE status = 'approved'),
    verified_count = (SELECT COUNT(*) FROM reviews WHERE status = 'approved' AND verified = true),
    average_rating = COALESCE((SELECT ROUND(AVG(rating)::numeric, 2) FROM reviews WHERE status = 'approved' AND verified = true), 0.00),
    plombier_count = (SELECT COUNT(*) FROM reviews WHERE status = 'approved' AND verified = true AND service_type = 'plombier'),
    plombier_average = COALESCE((SELECT ROUND(AVG(rating)::numeric, 2) FROM reviews WHERE status = 'approved' AND verified = true AND service_type = 'plombier'), 0.00),
    serrurier_count = (SELECT COUNT(*) FROM reviews WHERE status = 'approved' AND verified = true AND service_type = 'serrurier'),
    serrurier_average = COALESCE((SELECT ROUND(AVG(rating)::numeric, 2) FROM reviews WHERE status = 'approved' AND verified = true AND service_type = 'serrurier'), 0.00),
    electricien_count = (SELECT COUNT(*) FROM reviews WHERE status = 'approved' AND verified = true AND service_type = 'electricien'),
    electricien_average = COALESCE((SELECT ROUND(AVG(rating)::numeric, 2) FROM reviews WHERE status = 'approved' AND verified = true AND service_type = 'electricien'), 0.00),
    last_updated = NOW()
  WHERE id = 1;
END;
$$ LANGUAGE plpgsql;

-- Trigger : refresh cache après chaque mutation de reviews
CREATE OR REPLACE FUNCTION trigger_refresh_aggregate_cache()
RETURNS trigger AS $$
BEGIN
  PERFORM refresh_aggregate_rating_cache();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS reviews_aggregate_cache_refresh ON reviews;
CREATE TRIGGER reviews_aggregate_cache_refresh
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH STATEMENT
  EXECUTE FUNCTION trigger_refresh_aggregate_cache();
