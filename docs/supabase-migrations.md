# Migrations Supabase — MonJoël

> Liste centralisée des migrations SQL à exécuter dans le dashboard Supabase pour activer toutes les features livrées par les vagues Mega Swarm.

À exécuter dans l'ordre. Chaque bloc est idempotent (utilise `IF NOT EXISTS` ou `ON CONFLICT`).

---

## ⚠️ État réel BDD vérifié (2026-04-29)

Audit Mehdi sur dashboard Supabase :

| Élément | État | Note |
|---|---|---|
| Table `interventions` | ✅ EXISTE — schéma matche le code à 100% | Aucune modif nécessaire |
| Table `leads` | ✅ EXISTE — colonnes `user_id` (uuid), `urgency`, `urgency_label` présentes | Le code ignorait `urgency_label` — peut être consommé plus tard |
| Table `artisans` | ✅ EXISTE | Schéma à confirmer mais probable match |
| Table `recruitment_applications` | ✅ EXISTE | Colonne `notes` à vérifier (utilisée par le code) |
| Table `site_assets` | ✅ EXISTE | Schéma + policies à vérifier |
| Tables `content`, `partners`, `seo_pages`, `site_config`, `analytics_config` | ✅ EXISTENT | OK |
| RLS sur `leads` | ❌ DÉSACTIVÉ (vu dans le screenshot) | À activer en prod |
| Bucket Storage `media` | ❓ À VÉRIFIER | Critique pour upload `/admin/medias` |

**Conséquence** : la majorité des migrations dans ce doc **n'ont plus à être exécutées**. Voir section "Migrations restantes" ci-dessous.

---

## ✅ Migrations restantes (à exécuter UNIQUEMENT après confirmation audit)

À ce stade (29/04/2026, 18h), il reste à confirmer :

1. **Bucket Storage `media`** existe ? Sinon le créer.
2. **Policies RLS** sur `site_assets` permettent-elles : SELECT public + INSERT/UPDATE/DELETE auth ?
3. **Colonne `notes`** sur `recruitment_applications` ?
4. **Activer RLS** sur `leads` + `interventions` + `artisans` avec policies appropriées (uniquement avant deploy prod).
5. **Table `audit_logs`** — à créer pour activer le drawer "Historique" du lead. Voir bloc SQL section 6 ci-dessous. Le code est déjà branché : `lib/audit-logs.ts` (insert best-effort, swallow `42P01`) et `lib/hooks/admin-queries.ts → useLeadAuditLogs()` (lecture, retourne `[]` si table absente). Sans la migration, l'UI affiche simplement "Pas d'événements".

Tant que ces points ne sont pas validés, **NE PAS** exécuter les migrations ci-dessous.

---

## 📚 Référence — migrations de plein schéma (déjà exécutées en majorité)

---

## 1. Bucket Storage `media` + table `site_assets` (refonte visuelle)

**Pourquoi** : permet à Mehdi d'uploader images/vidéos via `/admin/medias` et de les assigner aux 12 slots du site.

```sql
-- Créer le bucket (si l'interface Supabase n'a pas déjà été utilisée)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  52428800,
  array[
    'image/jpeg', 'image/png', 'image/webp', 'image/avif',
    'video/mp4', 'video/webm'
  ]
)
on conflict (id) do nothing;

-- Storage policies : public read, auth write
create policy "Public can view media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Authenticated can upload to media"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Authenticated can update own media"
  on storage.objects for update
  using (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Authenticated can delete own media"
  on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');

-- Table site_assets : mapping slot_id → asset_url
create table if not exists site_assets (
  slot_id text primary key,
  asset_url text not null,
  alt_text text,
  uploaded_at timestamp with time zone default now(),
  uploaded_by text
);

alter table site_assets enable row level security;

-- Public read (les composants front lisent ces URLs)
create policy "Public can read site_assets"
  on site_assets for select
  using (true);

-- Auth write (admin uniquement)
create policy "Authenticated can upsert site_assets"
  on site_assets for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated can update site_assets"
  on site_assets for update
  using (auth.role() = 'authenticated');

create policy "Authenticated can delete site_assets"
  on site_assets for delete
  using (auth.role() = 'authenticated');
```

---

## 2. Colonne `email` sur `leads` (espace client)

**Pourquoi** : permet à un client connecté de voir UNIQUEMENT ses interventions (filtre par email session).

```sql
alter table leads add column if not exists email text;

-- Index pour requêtes filtrées par email côté espace client
create index if not exists idx_leads_email on leads (email) where email is not null;

-- RLS : un client ne voit que ses leads (filtrage côté DB)
-- Note : à activer seulement quand l'auth client est en place. Pour l'instant l'admin a un access global.
-- Désactiver l'ancienne policy "Allow anon write" si trop permissive.
```

À mettre à jour côté code :
- `app/api/quote/route.ts` : insérer aussi `email` dans la table leads quand le formulaire devis est soumis (ajouter un champ email dans le formulaire si pas déjà)
- `app/client/interventions/page.tsx` : `.eq("email", session.user.email)` au lieu du filtre client-side

---

## 3. Table `ratings` (espace client)

**Pourquoi** : permet aux clients de noter leurs interventions terminées (étoiles).

```sql
create table if not exists ratings (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  stars integer not null check (stars between 1 and 5),
  comment text,
  created_at timestamp with time zone default now()
);

create index if not exists idx_ratings_lead_id on ratings (lead_id);

alter table ratings enable row level security;

-- Public read (pour afficher les ratings publiquement — par ex. sur une page testimonials)
create policy "Public can read ratings"
  on ratings for select
  using (true);

-- Auth write (le client connecté insère son rating)
create policy "Authenticated can insert ratings"
  on ratings for insert
  with check (auth.role() = 'authenticated');
```

---

## 4. Colonne `notes` sur `recruitment_applications` (admin recrutement)

**Pourquoi** : permet à l'admin de prendre des notes libres sur chaque candidature dans le drawer.

```sql
alter table recruitment_applications add column if not exists notes text;
```

Côté code : la mutation `useUpdateApplicationNotes` (`lib/hooks/useRecruitment.ts`) attend déjà cette colonne.

---

## 5. Table `interventions` (espace artisan + dashboard admin)

**Pourquoi** : sépare les "missions assignées à un artisan" des "leads bruts". Permet :
- Le KPI dashboard "X artisans en intervention" (vrai count, pas figé à 0)
- L'espace artisan `/artisan/missions` (filtrer par artisan_id)
- Le tracking des étapes (en route, en cours, terminée)
- Les photos avant/après, signature, facture

```sql
create table if not exists interventions (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  artisan_id uuid references artisans(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'scheduled', 'en_route', 'in_progress', 'completed', 'cancelled')),
  scheduled_for timestamp with time zone,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  address text,
  postal_code text,
  problem_description text,
  trade text check (trade in ('plomberie', 'serrurerie', 'electricite')),
  amount_quoted numeric(10,2),
  amount_final numeric(10,2),
  client_phone text,
  client_email text,
  notes text,
  signature_url text,        -- URL de la signature client (Storage)
  photos_before text[],      -- URLs photos avant
  photos_after text[],       -- URLs photos après
  invoice_url text,          -- URL de la facture PDF
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists idx_interventions_artisan_id on interventions (artisan_id);
create index if not exists idx_interventions_status on interventions (status);
create index if not exists idx_interventions_scheduled_for on interventions (scheduled_for);

alter table interventions enable row level security;

-- Admin : tout voir / tout modifier
create policy "Authenticated can read interventions"
  on interventions for select
  using (auth.role() = 'authenticated');

create policy "Authenticated can insert interventions"
  on interventions for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated can update interventions"
  on interventions for update
  using (auth.role() = 'authenticated');

-- Trigger pour updated_at automatique
create or replace function set_interventions_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger interventions_updated_at_trigger
  before update on interventions
  for each row
  execute function set_interventions_updated_at();
```

Côté code à brancher après :
- `lib/hooks/admin-queries.ts` : remplacer le KPI #4 (artisans en intervention) par un vrai count `from interventions where status = 'in_progress'`
- `lib/hooks/artisan-queries.ts` : `useMyMissions` → fetch depuis `interventions` filtré par `artisan_id`
- Espaces artisan (`/artisan/missions`) : actions de progression d'état (pending → scheduled → en_route → in_progress → completed)

---

## 6. Table `audit_logs` (admin — historique drawer leads)

**Pourquoi** : afficher dans le drawer lead l'historique des changements (qui a contacté, quand, statut changé, etc.). Actuellement placeholder.

```sql
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  actor text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

create index if not exists idx_audit_logs_entity on audit_logs (entity_type, entity_id);
create index if not exists idx_audit_logs_created_at on audit_logs (created_at desc);

alter table audit_logs enable row level security;

create policy "Authenticated can read audit_logs"
  on audit_logs for select
  using (auth.role() = 'authenticated');

create policy "Authenticated can insert audit_logs"
  on audit_logs for insert
  with check (auth.role() = 'authenticated');
```

**État côté code (2026-04-29)** :
- ✅ Helper centralisé `lib/audit-logs.ts` (`logAudit`, `logAuditBatch`) — best-effort, swallow `42P01` / RLS errors
- ✅ Hook lecture `useLeadAuditLogs(leadId)` dans `lib/hooks/admin-queries.ts` — retourne `[]` si table absente
- ✅ Mutations `useUpdateLeadStatus`, `useUpdateLead`, `useDeleteLead`, `useBulkUpdateLeads`, `useCreateLead` insèrent un audit_log automatiquement (actions `status_changed` / `edited` / `deleted` / `created`)
- ✅ Composant `<LeadHistorySection leadId={id}/>` dans `app/admin/leads/_components/LeadDrawer.tsx` — timeline verticale violette, dot par event, badge from→to pour les changements de statut
- ⏳ À brancher quand le besoin se présente : `useUpdateApplicationStatus`, `useUpdateArtisanStatus`, etc. (même pattern via `logAudit({ entity_type: "application" | "artisan", … })`)

---

## Workflow d'exécution

1. **Aller** dans le dashboard Supabase → SQL Editor
2. **Copier-coller** chaque bloc dans l'ordre (1 → 6)
3. **Exécuter** un par un
4. **Vérifier** dans Table Editor que les tables sont créées et les policies activées
5. **Pour le bucket** `media` : si l'interface Storage refuse `insert into storage.buckets`, le créer manuellement via le bouton "New bucket" → name `media` → public ✓ → file size limit 50 MB → allowed MIME types liste ci-dessus

---

## Validation

Une fois tout exécuté, tester :

| Migration | Test |
|---|---|
| 1. media + site_assets | Upload une image via `/admin/medias`, assigner à un slot, hard-reload home → image visible |
| 2. leads.email | Soumettre formulaire devis avec email → vérifier en DB |
| 3. ratings | Connecter un client, noter une intervention terminée, vérifier insertion |
| 4. recruitment.notes | Ouvrir drawer candidature admin, ajouter note, vérifier persistance |
| 5. interventions | Insérer manuellement une intervention test, vérifier qu'elle apparaît dans `/admin` KPI artisans + `/artisan/missions` |
| 6. audit_logs | Changer le statut d'un lead, vérifier qu'une ligne audit_logs est insérée |

---

## Rollback (au cas où)

Chaque migration est réversible :

```sql
-- 6. drop table audit_logs cascade;
-- 5. drop table interventions cascade;
-- 4. alter table recruitment_applications drop column if exists notes;
-- 3. drop table ratings cascade;
-- 2. alter table leads drop column if exists email;
-- 1. drop table site_assets cascade;
--    delete from storage.buckets where id = 'media';
```

⚠️ Le rollback du bucket `media` supprime aussi tous les fichiers uploadés. Faire un export avant si nécessaire.
