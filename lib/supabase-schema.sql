-- =============================================
-- SCHEMA SUPABASE POUR JOËL
-- Exécute ce script dans l'éditeur SQL de Supabase
-- =============================================

-- Table de configuration générale du site
CREATE TABLE IF NOT EXISTS site_config (
  id SERIAL PRIMARY KEY,
  phone_number VARCHAR(20) DEFAULT '01 41 69 10 08',
  primary_color VARCHAR(10) DEFAULT '#7055A7',
  secondary_color VARCHAR(10) DEFAULT '#9E76EC',
  show_testimonials BOOLEAN DEFAULT true,
  show_quiz BOOLEAN DEFAULT true,
  show_phone BOOLEAN DEFAULT true,
  show_cta_phone BOOLEAN DEFAULT true,
  show_cta_devis BOOLEAN DEFAULT true,
  cta_devis_url VARCHAR(255) DEFAULT 'https://app.monjoel.fr',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insérer la configuration par défaut
INSERT INTO site_config (phone_number, primary_color, secondary_color, cta_devis_url)
VALUES ('01 41 69 10 08', '#7055A7', '#9E76EC', 'https://app.monjoel.fr')
ON CONFLICT DO NOTHING;

-- Table du contenu éditable
CREATE TABLE IF NOT EXISTS content (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  page VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insérer le contenu par défaut
INSERT INTO content (id, title, page, content) VALUES
  ('hero-title', 'Titre Hero', 'Accueil', 'Dépannage d''Urgence à Prix Fixes - Fini les Arnaques !'),
  ('hero-subtitle', 'Sous-titre Hero', 'Accueil', 'Serrurier • Plombier • Électricien'),
  ('stop-arnaques-title', 'Titre Anti-arnaque', 'Stop Arnaques', 'Les arnaques au dépannage, c''est terminé.'),
  ('cta-text', 'Texte CTA principal', 'Global', 'Obtenir mon devis maintenant')
ON CONFLICT (id) DO NOTHING;

-- Table des partenaires
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table SEO par page
CREATE TABLE IF NOT EXISTS seo_pages (
  id VARCHAR(100) PRIMARY KEY,
  page_slug VARCHAR(100) NOT NULL,
  page_name VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  keywords TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insérer les pages SEO par défaut
INSERT INTO seo_pages (id, page_slug, page_name, title, description, keywords) VALUES
  ('home', '', 'Accueil', 'Joël | Dépannage sans arnaques - Plomberie, Serrurerie, Électricité', 'Trouvez un artisan de confiance. Devis instantané, prix fixe.', 'dépannage, plomberie, serrurerie, électricité'),
  ('plomberie', 'plomberie', 'Plomberie', 'Plombier d''urgence | Joël - Dépannage sans arnaques', 'Fuite d''eau, canalisation bouchée ? Prix fixe garanti.', 'plombier, fuite eau, canalisation'),
  ('serrurerie', 'serrurerie', 'Serrurerie', 'Serrurier d''urgence | Joël - Dépannage sans arnaques', 'Porte claquée ? Prix fixe garanti.', 'serrurier, porte claquée, serrure'),
  ('electricite', 'electricite', 'Électricité', 'Électricien d''urgence | Joël - Dépannage sans arnaques', 'Panne de courant ? Prix fixe garanti.', 'électricien, panne courant, électricité'),
  ('stop-arnaques', 'stop-arnaques', 'Stop Arnaques', 'Stop aux arnaques | Joël', 'Découvrez comment éviter les arnaques au dépannage.', 'arnaque, dépannage, protection')
ON CONFLICT (id) DO NOTHING;

-- Table configuration Analytics
CREATE TABLE IF NOT EXISTS analytics_config (
  id SERIAL PRIMARY KEY,
  google_analytics_id VARCHAR(50),
  google_ads_id VARCHAR(50),
  google_ads_conversion_id VARCHAR(100),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insérer la config analytics par défaut
INSERT INTO analytics_config (id) VALUES (1) ON CONFLICT DO NOTHING;

-- Table des leads (demandes de devis)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem VARCHAR(100) NOT NULL,
  problem_label VARCHAR(255),
  trade VARCHAR(50),
  postal_code VARCHAR(10),
  phone VARCHAR(20) NOT NULL,
  source VARCHAR(50) DEFAULT 'website_quote_form',
  status VARCHAR(20) DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherche rapide par statut et date
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Table des candidatures recrutement
CREATE TABLE IF NOT EXISTS recruitment_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  trades TEXT[] NOT NULL,
  zone TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_recruitment_status ON recruitment_applications(status);
CREATE INDEX IF NOT EXISTS idx_recruitment_created_at ON recruitment_applications(created_at DESC);

-- =============================================
-- POLITIQUES DE SÉCURITÉ (RLS)
-- =============================================

-- Activer RLS sur toutes les tables
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Politique pour lecture publique (le site peut lire)
CREATE POLICY "Allow public read" ON site_config FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON content FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON partners FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON seo_pages FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON analytics_config FOR SELECT USING (true);

-- Politique pour écriture (pour l'admin - à sécuriser avec auth plus tard)
CREATE POLICY "Allow anon write" ON site_config FOR ALL USING (true);
CREATE POLICY "Allow anon write" ON content FOR ALL USING (true);
CREATE POLICY "Allow anon write" ON partners FOR ALL USING (true);
CREATE POLICY "Allow anon write" ON seo_pages FOR ALL USING (true);
CREATE POLICY "Allow anon write" ON analytics_config FOR ALL USING (true);
CREATE POLICY "Allow anon write" ON leads FOR ALL USING (true);

ALTER TABLE recruitment_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON recruitment_applications FOR SELECT USING (true);
CREATE POLICY "Allow anon write" ON recruitment_applications FOR ALL USING (true);

