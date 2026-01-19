-- Migration: Ajouter les colonnes CTA à site_config
-- Exécute ce SQL dans la console Supabase

-- Ajouter les nouvelles colonnes si elles n'existent pas
ALTER TABLE site_config 
ADD COLUMN IF NOT EXISTS show_cta_phone BOOLEAN DEFAULT true;

ALTER TABLE site_config 
ADD COLUMN IF NOT EXISTS show_cta_devis BOOLEAN DEFAULT true;

ALTER TABLE site_config 
ADD COLUMN IF NOT EXISTS cta_devis_url VARCHAR(255) DEFAULT 'https://app.monjoel.fr';

-- Mettre à jour la ligne existante avec les valeurs par défaut
UPDATE site_config 
SET 
  show_cta_phone = COALESCE(show_cta_phone, true),
  show_cta_devis = COALESCE(show_cta_devis, true),
  cta_devis_url = COALESCE(cta_devis_url, 'https://app.monjoel.fr')
WHERE id = 1;

-- =====================================================
-- Migration: Ajouter gtag_id à analytics_config
-- =====================================================

ALTER TABLE analytics_config 
ADD COLUMN IF NOT EXISTS gtag_id VARCHAR(50);

-- Mettre à jour avec l'ID Google Tag par défaut (vide)
UPDATE analytics_config 
SET gtag_id = COALESCE(gtag_id, '')
WHERE id = 1;

