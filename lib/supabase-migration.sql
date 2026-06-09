-- =============================================
-- MIGRATION SECURITE JOEL — RLS durcissement + RBAC (rôles)
-- Exécute ce script dans Supabase > SQL Editor, EN ENTIER, AVANT de déployer.
--
-- IDEMPOTENT : ce script peut être ré-exécuté sans erreur, quel que soit
-- l'état actuel de la base (chaque CREATE POLICY est précédé d'un DROP IF
-- EXISTS). Indispensable car l'ancienne version contenait une erreur de
-- syntaxe ("FOR INSERT UPDATE DELETE") qui faisait rollback tout le script
-- en transaction — donc on ne peut PAS supposer qu'elle a été appliquée.
--
-- Modèle de sécurité :
--   • anon (clé NEXT_PUBLIC_SUPABASE_ANON_KEY) = visiteur public du site
--   • authenticated (JWT après login Supabase Auth) = client OU artisan OU admin
--   • service_role (clé serveur SUPABASE_SERVICE_ROLE_KEY) = bypass RLS total
--
-- ⚠️  POINT CLÉ — pourquoi `auth.role() = 'authenticated'` NE SUFFIT PAS :
--   Les 3 portails (/admin, /artisan, /client) partagent le MÊME pool
--   Supabase Auth, et /client utilise un OTP d'inscription OUVERT. N'importe
--   quel visiteur peut donc s'auto-inscrire → devient 'authenticated'. Si on
--   gate la lecture des leads sur 'authenticated', ce visiteur lit TOUS les
--   leads (fuite PII : téléphones, codes postaux, problèmes, notes).
--   => On distingue les rôles via `public.profiles.role` + `public.is_admin()`.
--      Un client ne voit que SES leads (user_id = auth.uid() OU email =
--      auth.email()) ; seul un `admin` voit/modifie tout.
-- =============================================


-- ─────────────────────────────────────────────────────────────────────────
-- 0. RÔLES : table profiles + is_admin() + provisioning auto des comptes
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT,
  role       TEXT NOT NULL DEFAULT 'client'
             CHECK (role IN ('admin', 'artisan', 'client')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated, service_role;

-- Identifie un admin SANS déclencher la RLS de profiles (SECURITY DEFINER :
-- s'exécute en tant que propriétaire de la fonction, qui bypass la RLS de la
-- table → pas de récursion quand is_admin() est appelée DANS une policy).
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- À chaque nouvel inscrit Supabase Auth → profil 'client' par défaut.
-- (Un visiteur auto-inscrit via l'OTP de /client ne peut donc JAMAIS être
--  admin sans la promotion manuelle ci-dessous.)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'client')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill : crée un profil 'client' pour les comptes déjà existants.
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'client' FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- ⚠️  ÉTAPE MANUELLE OBLIGATOIRE — promouvoir le(s) compte(s) admin.
--     Sans ça, PERSONNE ne pourra lire les leads ni éditer le contenu /admin.
--     Adapte la liste d'emails à TES comptes admin réels :
UPDATE public.profiles SET role = 'admin'
WHERE email IN ('contact@monjoel.fr');   -- 👈 ÉDITE-MOI

-- (Optionnel) aligner le rôle 'artisan' sur la table artisans, si elle existe.
DO $$
BEGIN
  IF to_regclass('public.artisans') IS NOT NULL THEN
    UPDATE public.profiles p SET role = 'artisan'
    FROM public.artisans a
    WHERE lower(p.email) = lower(a.email) AND p.role = 'client';
  END IF;
END $$;

-- RLS profiles : chacun lit SON profil ; seul l'admin gère les rôles.
-- (Un non-admin ne peut PAS s'auto-promouvoir : seule la policy admin couvre
--  INSERT/UPDATE/DELETE. Le provisioning passe par le trigger SECURITY DEFINER.)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_self_or_admin" ON public.profiles;
CREATE POLICY "profiles_select_self_or_admin" ON public.profiles
  FOR SELECT USING (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "profiles_admin_write" ON public.profiles;
CREATE POLICY "profiles_admin_write" ON public.profiles
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());


-- ─────────────────────────────────────────────────────────────────────────
-- 1. RLS activé partout (no-op si déjà activé)
-- ─────────────────────────────────────────────────────────────────────────
ALTER TABLE site_config              ENABLE ROW LEVEL SECURITY;
ALTER TABLE content                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages                ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_config         ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment_applications ENABLE ROW LEVEL SECURITY;

-- Colonnes de liaison client sur leads (idempotent — la SELECT policy plus
-- bas en dépend, donc on les ajoute AVANT de créer les policies).
ALTER TABLE leads ADD COLUMN IF NOT EXISTS user_id       UUID REFERENCES auth.users(id);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS email         TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS urgency       TEXT DEFAULT 'urgent';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS urgency_label TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at    TIMESTAMPTZ DEFAULT NOW();

-- Attribution marketing (R9) : savoir d'où vient chaque lead pour piloter Google
-- Ads (gclid → import de conversions hors ligne) et lire le SEO/UTM. Alimenté
-- par /api/quote depuis lib/attribution.ts (capture côté client).
ALTER TABLE leads ADD COLUMN IF NOT EXISTS gclid        TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS gbraid       TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS wbraid       TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_source   TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_medium   TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_term     TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_content  TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS landing_page TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS referrer     TEXT;

CREATE INDEX IF NOT EXISTS idx_leads_user_id    ON leads (user_id)    WHERE user_id    IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_email      ON leads (email)      WHERE email      IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_gclid      ON leads (gclid)      WHERE gclid      IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON leads (utm_source) WHERE utm_source IS NOT NULL;

-- ─────────────────────────────────────────────────────────────────────────
-- 2. Supprimer TOUTES les anciennes politiques trop permissives
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow anon write"  ON leads;
DROP POLICY IF EXISTS "Allow anon write"  ON site_config;
DROP POLICY IF EXISTS "Allow anon write"  ON content;
DROP POLICY IF EXISTS "Allow anon write"  ON partners;
DROP POLICY IF EXISTS "Allow anon write"  ON seo_pages;
DROP POLICY IF EXISTS "Allow anon write"  ON analytics_config;
DROP POLICY IF EXISTS "Allow anon write"  ON recruitment_applications;

-- FUITE PII : la lecture publique des candidatures (nom/email/téléphone des
-- postulants) n'a jamais été voulue. On la supprime — l'admin lit via is_admin().
DROP POLICY IF EXISTS "Allow public read" ON recruitment_applications;

-- ─────────────────────────────────────────────────────────────────────────
-- 3. Leads — SELECT scopé client/admin + INSERT public + write admin
--    C'EST LE FIX CENTRAL DE LA FUITE.
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "admin_select_leads"        ON leads;
DROP POLICY IF EXISTS "leads_select_own_or_admin" ON leads;
CREATE POLICY "leads_select_own_or_admin" ON leads
  FOR SELECT USING (
    public.is_admin()
    OR (user_id IS NOT NULL AND user_id = auth.uid())
    OR (email   IS NOT NULL AND email   = auth.email())
  );

-- Un artisan peut lire le lead RATTACHÉ À UNE DE SES interventions (et lui
-- seul) — nécessaire pour afficher le contact/problème client sur SA facture
-- (/artisan/facture/[id]). Policy permissive (OR avec celle ci-dessus) : elle
-- n'élargit l'accès qu'aux leads des interventions dont il est propriétaire,
-- jamais au lot complet.
DROP POLICY IF EXISTS "leads_artisan_read_own_interventions" ON leads;
CREATE POLICY "leads_artisan_read_own_interventions" ON leads
  FOR SELECT USING (
    id IN (
      SELECT i.lead_id FROM interventions i
      WHERE i.artisan_id IN (
        SELECT a.id FROM artisans a WHERE a.email = auth.email()
      )
    )
  );

DROP POLICY IF EXISTS "public_insert_leads" ON leads;
DROP POLICY IF EXISTS "leads_public_insert" ON leads;
CREATE POLICY "leads_public_insert" ON leads
  FOR INSERT WITH CHECK (true);   -- /api/quote insère via la clé anon

DROP POLICY IF EXISTS "admin_update_leads" ON leads;
DROP POLICY IF EXISTS "leads_admin_update" ON leads;
CREATE POLICY "leads_admin_update" ON leads
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_leads" ON leads;
DROP POLICY IF EXISTS "leads_admin_delete" ON leads;
CREATE POLICY "leads_admin_delete" ON leads
  FOR DELETE USING (public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────
-- 4. Candidatures recrutement — INSERT public + gestion admin (pas de read public)
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "admin_select_recruitment" ON recruitment_applications;
CREATE POLICY "admin_select_recruitment" ON recruitment_applications
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "public_insert_recruitment" ON recruitment_applications;
CREATE POLICY "public_insert_recruitment" ON recruitment_applications
  FOR INSERT WITH CHECK (true);   -- /api/recruitment insère via la clé anon

DROP POLICY IF EXISTS "admin_update_recruitment" ON recruitment_applications;
CREATE POLICY "admin_update_recruitment" ON recruitment_applications
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_recruitment" ON recruitment_applications;
CREATE POLICY "admin_delete_recruitment" ON recruitment_applications
  FOR DELETE USING (public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────
-- 5. Tables de config — lecture publique (policy "Allow public read"
--    conservée) + écriture réservée à l'admin.
--    FOR ALL is_admin() couvre INSERT/UPDATE/DELETE ; le SELECT public reste
--    permis par la politique permissive "Allow public read" (OR logique).
--    NB : remplace l'ancien "FOR INSERT UPDATE DELETE" (syntaxe INVALIDE) ET
--    l'ancien gate "authenticated" (qui laissait un client éditer le site).
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "admin_write_site_config" ON site_config;
CREATE POLICY "admin_write_site_config" ON site_config
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_write_content" ON content;
CREATE POLICY "admin_write_content" ON content
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_write_partners" ON partners;
CREATE POLICY "admin_write_partners" ON partners
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_write_seo" ON seo_pages;
CREATE POLICY "admin_write_seo" ON seo_pages
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_write_analytics" ON analytics_config;
CREATE POLICY "admin_write_analytics" ON analytics_config
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────
-- 6. Cache Search Console (dashboard /admin/seo) — données admin.
--    L'ancienne "Allow service write FOR ALL USING (true)" ouvrait en fait
--    la LECTURE ET L'ÉCRITURE à anon (FOR ALL inclut SELECT). On ferme :
--    lecture réservée à l'admin ; les écritures se font via la clé
--    service_role (lib/seo/seo-cache.ts), qui bypass RLS — donc aucune policy
--    d'écriture n'est nécessaire pour anon/authenticated.
-- ─────────────────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF to_regclass('public.seo_search_console_cache') IS NOT NULL THEN
    ALTER TABLE seo_search_console_cache ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow service write" ON seo_search_console_cache;
    DROP POLICY IF EXISTS "admin_read_gsc_cache" ON seo_search_console_cache;
    CREATE POLICY "admin_read_gsc_cache" ON seo_search_console_cache
      FOR SELECT USING (public.is_admin());
  END IF;
END $$;

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

DROP POLICY IF EXISTS "admin_manage_artisans" ON artisans;
CREATE POLICY "admin_manage_artisans" ON artisans
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "artisan_read_own" ON artisans;
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

DROP POLICY IF EXISTS "admin_manage_interventions" ON interventions;
CREATE POLICY "admin_manage_interventions" ON interventions
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Artisan peut voir ses propres interventions
DROP POLICY IF EXISTS "artisan_read_own_interventions" ON interventions;
CREATE POLICY "artisan_read_own_interventions" ON interventions
  FOR SELECT USING (
    artisan_id IN (SELECT id FROM artisans WHERE email = auth.email())
  );

-- Artisan peut mettre à jour ses propres interventions
DROP POLICY IF EXISTS "artisan_update_own_interventions" ON interventions;
CREATE POLICY "artisan_update_own_interventions" ON interventions
  FOR UPDATE USING (
    artisan_id IN (SELECT id FROM artisans WHERE email = auth.email())
  ) WITH CHECK (
    artisan_id IN (SELECT id FROM artisans WHERE email = auth.email())
  );

-- Client peut voir les interventions liées à SES leads.
DROP POLICY IF EXISTS "interventions_client_read" ON interventions;
CREATE POLICY "interventions_client_read" ON interventions
  FOR SELECT USING (
    lead_id IN (
      SELECT id FROM leads
      WHERE (user_id IS NOT NULL AND user_id = auth.uid())
         OR (email   IS NOT NULL AND email   = auth.email())
    )
  );

-- =============================================
-- VÉRIFICATION POST-MIGRATION
-- =============================================
-- A) Connecté en tant que CLIENT lambda (clé anon + session OTP) :
--      SELECT public.is_admin();    -- attendu : false
--      SELECT count(*) FROM leads;  -- attendu : nombre de SES leads (PAS le total)
--    Connecté en tant qu'ADMIN promu :
--      SELECT public.is_admin();    -- attendu : true
--      SELECT count(*) FROM leads;  -- attendu : total
--
-- B) Aucune policy ne doit laisser anon écrire/lire en grand. Cette requête
--    DOIT renvoyer 0 ligne ('true' n'est légitime qu'en SELECT/INSERT public) :
--      SELECT tablename, policyname, cmd, qual, with_check
--      FROM pg_policies
--      WHERE schemaname = 'public' AND qual = 'true'
--        AND cmd IN ('ALL', 'DELETE', 'UPDATE')
--      ORDER BY tablename;
--
-- C) Vue d'ensemble :
--      SELECT tablename, policyname, cmd, qual, with_check
--      FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename, cmd;

-- =============================================
-- COMPTES ADMIN — À créer dans Supabase Auth
-- =============================================
-- 1. Supabase Dashboard > Authentication > Users > "Add user"
-- 2. Email : contact@monjoel.fr (ou ton email) + mot de passe fort
-- 3. Re-lance le UPDATE de la section 0 pour le passer role = 'admin'
--    (ou ajoute-le à la liste d'emails AVANT d'exécuter ce script).
-- 4. Connexion via /admin/login.
--
-- NB sécurité : le rôle vit dans public.profiles, plus dans un simple
-- "authenticated". Ouvrir l'inscription publique (déjà le cas sur /client)
-- ne donne donc AUCUN accès admin — un nouvel inscrit est 'client' par défaut.

-- ─────────────────────────────────────────────────────────────────────────
-- HORS PÉRIMÈTRE — mêmes patterns USING(true) à auditer séparément :
--   • docs/supabase-migrations.md → vérifier les policies de `ratings` /
--     `site_assets` (lecture/écriture potentiellement trop ouvertes).
-- ─────────────────────────────────────────────────────────────────────────


-- =============================================
-- RATE LIMIT anti-spam (R8) — flood des endpoints de capture
-- =============================================
-- Objectif : empêcher le flood de faux leads sur /api/quote, /api/contact et
-- /api/recruitment SANS jamais bloquer un vrai lead. Zéro nouvelle infra : on
-- réutilise Postgres/Supabase via une table de hits + une fonction comptée.
--
-- Côté app, lib/rate-limit.ts appelle check_rate_limit() en FAIL-OPEN : si la
-- migration n'est pas encore appliquée (fonction absente) ou si l'appel RPC
-- échoue, l'app AUTORISE la demande. Cette table/fonction n'est donc qu'un
-- bonus de défense — jamais un point de blocage dur.
--
-- IDEMPOTENT : create table if not exists + create or replace function.
-- ─────────────────────────────────────────────────────────────────────────

-- Un enregistrement = un hit horodaté pour une clé (ex: "quote:ip:1.2.3.4"
-- ou "contact:email:jean@x.fr"). On compte les hits récents dans la fenêtre.
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key        TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour que le COUNT de la fenêtre glissante reste rapide même avec
-- beaucoup de hits (lookup par (key, created_at)).
CREATE INDEX IF NOT EXISTS idx_rate_limits_key_created
  ON public.rate_limits (key, created_at);

-- check_rate_limit : compte les hits de p_key dans les p_window_seconds
-- dernières secondes, enregistre le hit courant, puis renvoie :
--   • true  → SOUS la limite (demande AUTORISÉE)
--   • false → limite ATTEINTE/dépassée (demande à REJETER avec un 429)
--
-- SECURITY DEFINER : s'exécute en tant que propriétaire (postgres) afin que
-- anon/authenticated puissent compter+insérer sans qu'on ait besoin d'ouvrir
-- des policies d'écriture sur public.rate_limits (la table reste fermée par
-- défaut sous RLS, voir plus bas).
--
-- NB : on insère le hit courant AVANT le COUNT puis on compare au seuil. Le
-- hit courant est donc inclus dans le compte → la limite est atteinte quand
-- le compte dépasse p_max (le p_max-ième hit passe, le (p_max+1)-ième est
-- rejeté). On purge aussi à la volée les vieux hits de la clé (housekeeping).
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_key            TEXT,
  p_max            INT,
  p_window_seconds INT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INT;
BEGIN
  -- Garde-fou : des paramètres invalides ne doivent jamais bloquer un lead.
  IF p_key IS NULL OR p_max IS NULL OR p_max <= 0 OR p_window_seconds IS NULL OR p_window_seconds <= 0 THEN
    RETURN TRUE;
  END IF;

  -- Housekeeping : purge les hits de CETTE clé sortis de la fenêtre.
  DELETE FROM public.rate_limits
  WHERE key = p_key
    AND created_at < NOW() - make_interval(secs => p_window_seconds);

  -- Enregistre le hit courant.
  INSERT INTO public.rate_limits (key) VALUES (p_key);

  -- Compte les hits restants dans la fenêtre (inclut le hit courant).
  SELECT count(*) INTO v_count
  FROM public.rate_limits
  WHERE key = p_key
    AND created_at >= NOW() - make_interval(secs => p_window_seconds);

  -- true si on est SOUS ou ÉGAL à la limite, false si on l'a dépassée.
  RETURN v_count <= p_max;
END;
$$;

-- RLS : la table reste fermée (aucune policy) → anon/authenticated ne peuvent
-- ni lire ni écrire directement. Tout passe par la fonction SECURITY DEFINER.
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Les 3 routes appellent l'RPC avec la clé anon (quote/recruitment) ou
-- service_role (contact) — on autorise donc l'exécution aux trois rôles.
GRANT EXECUTE ON FUNCTION public.check_rate_limit(TEXT, INT, INT)
  TO anon, authenticated, service_role;
