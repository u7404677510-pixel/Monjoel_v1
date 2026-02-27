-- =============================================
-- MIGRATION SECURITE JOEL — Phase 1
-- Exécute ce script dans Supabase > SQL Editor
-- =============================================

-- 1. Supprimer les anciennes politiques trop permissives
DROP POLICY IF EXISTS "Allow anon write" ON leads;
DROP POLICY IF EXISTS "Allow anon write" ON site_config;
DROP POLICY IF EXISTS "Allow anon write" ON content;
DROP POLICY IF EXISTS "Allow anon write" ON partners;
DROP POLICY IF EXISTS "Allow anon write" ON seo_pages;
DROP POLICY IF EXISTS "Allow anon write" ON analytics_config;
DROP POLICY IF EXISTS "Allow anon write" ON recruitment_applications;

-- 2. Leads — lecture admin + écriture publique (formulaires site)
CREATE POLICY "admin_select_leads" ON leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "public_insert_leads" ON leads
  FOR INSERT
  WITH CHECK (true);  -- Le site peut créer des leads sans auth

CREATE POLICY "admin_update_leads" ON leads
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_leads" ON leads
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- 3. Candidatures recrutement — lecture admin + écriture publique
CREATE POLICY "admin_select_recruitment" ON recruitment_applications
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "public_insert_recruitment" ON recruitment_applications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin_update_recruitment" ON recruitment_applications
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 4. Site config — lecture publique + écriture admin
CREATE POLICY "admin_write_site_config" ON site_config
  FOR ALL
  USING (auth.role() = 'authenticated');

-- 5. Content — lecture publique (pour le site) + écriture admin
CREATE POLICY "admin_write_content" ON content
  FOR INSERT UPDATE DELETE
  USING (auth.role() = 'authenticated');

-- 6. Partners — lecture publique + écriture admin
CREATE POLICY "admin_write_partners" ON partners
  FOR INSERT UPDATE DELETE
  USING (auth.role() = 'authenticated');

-- 7. SEO — lecture publique + écriture admin
CREATE POLICY "admin_write_seo" ON seo_pages
  FOR INSERT UPDATE DELETE
  USING (auth.role() = 'authenticated');

-- 8. Analytics — lecture publique + écriture admin
CREATE POLICY "admin_write_analytics" ON analytics_config
  FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================
-- NOUVELLES TABLES — Phase 2
-- =============================================

-- Artisans du réseau
CREATE TABLE IF NOT EXISTS artisans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT NOT NULL,
  trades TEXT[] NOT NULL DEFAULT '{}',
  zones TEXT[] NOT NULL DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_intervention')),
  rating DECIMAL(3,2) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  total_interventions INTEGER DEFAULT 0,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_artisans_status ON artisans(status);
CREATE INDEX IF NOT EXISTS idx_artisans_trades ON artisans USING gin(trades);

ALTER TABLE artisans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_manage_artisans" ON artisans
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "artisan_read_own" ON artisans
  FOR SELECT USING (email = auth.email());

-- Interventions (lien leads ↔ artisans)
CREATE TABLE IF NOT EXISTS interventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  artisan_id UUID REFERENCES artisans(id) ON DELETE SET NULL,
  trade TEXT,
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'en_route', 'in_progress', 'completed', 'cancelled')),
  price DECIMAL(10,2),
  client_rating INTEGER CHECK (client_rating >= 1 AND client_rating <= 5),
  client_comment TEXT,
  notes TEXT,
  address TEXT,
  postal_code TEXT,
  urgency TEXT DEFAULT 'urgent' CHECK (urgency IN ('urgent', 'today', 'planned')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_interventions_status ON interventions(status);
CREATE INDEX IF NOT EXISTS idx_interventions_artisan ON interventions(artisan_id);
CREATE INDEX IF NOT EXISTS idx_interventions_lead ON interventions(lead_id);
CREATE INDEX IF NOT EXISTS idx_interventions_scheduled ON interventions(scheduled_at);

ALTER TABLE interventions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_manage_interventions" ON interventions
  FOR ALL USING (auth.role() = 'authenticated');

-- Artisan peut voir ses propres interventions
CREATE POLICY "artisan_read_own_interventions" ON interventions
  FOR SELECT USING (
    artisan_id IN (SELECT id FROM artisans WHERE email = auth.email())
  );

-- Artisan peut mettre à jour le statut de ses propres interventions
CREATE POLICY "artisan_update_own_interventions" ON interventions
  FOR UPDATE USING (
    artisan_id IN (SELECT id FROM artisans WHERE email = auth.email())
  );

-- Lier les leads aux users Supabase Auth
ALTER TABLE leads ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS urgency TEXT DEFAULT 'urgent';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS urgency_label TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- =============================================
-- COMPTES ADMIN — À créer dans Supabase Auth
-- =============================================
-- 1. Dans Supabase Dashboard > Authentication > Users
-- 2. Cliquer "Add user"
-- 3. Email: contact@monjoel.fr (ou votre email)
-- 4. Mot de passe: choisir un mot de passe fort (jamais joel2024admin !)
-- 5. Cliquer "Create user"
-- Le compte peut ensuite se connecter via /admin/login
