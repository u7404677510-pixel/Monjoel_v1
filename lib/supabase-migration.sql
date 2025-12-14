-- Migration: Ajouter les colonnes CTA à site_config
-- Exécute ce SQL dans la console Supabase

-- Ajouter les nouvelles colonnes si elles n'existent pas
ALTER TABLE site_config 
ADD COLUMN IF NOT EXISTS show_cta_phone BOOLEAN DEFAULT true;

ALTER TABLE site_config 
ADD COLUMN IF NOT EXISTS show_cta_devis BOOLEAN DEFAULT true;

ALTER TABLE site_config 
ADD COLUMN IF NOT EXISTS cta_devis_url VARCHAR(255) DEFAULT 'https://app.monjoel.com';

-- Mettre à jour la ligne existante avec les valeurs par défaut
UPDATE site_config 
SET 
  show_cta_phone = COALESCE(show_cta_phone, true),
  show_cta_devis = COALESCE(show_cta_devis, true),
  cta_devis_url = COALESCE(cta_devis_url, 'https://app.monjoel.com')
WHERE id = 1;

