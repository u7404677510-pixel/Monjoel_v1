# Admin /medias — Setup Supabase

Page : `/admin/medias`. Permet à un admin connecté d'uploader des images / vidéos
et de les assigner à un emplacement précis du site (Hero homepage, Hero plomberie,
sections deep dive, etc.).

Deux ressources Supabase à créer **une fois** dans le dashboard du projet
(SQL editor) :

1. Bucket Storage `media`
2. Table `site_assets`

## 1. Bucket Storage `media`

Crée le bucket via l'UI Supabase :

- Storage → New bucket
- Name : `media`
- Public : **oui** (les URLs publiques sont consommées par le site front)
- File size limit : 50 MB
- Allowed MIME types (optionnel mais recommandé) :
  `image/jpeg, image/png, image/webp, image/avif, video/mp4, video/webm`

Puis applique les **RLS policies** ci-dessous (Storage → Policies → bucket `media`) :

```sql
-- Lecture publique (pour que les <img> et <video> du site front fonctionnent)
create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'media');

-- Écriture / suppression réservée aux utilisateurs authentifiés
-- (le backoffice /admin a un middleware d'auth Supabase déjà en place)
create policy "media_authenticated_write"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "media_authenticated_delete"
  on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "media_authenticated_update"
  on storage.objects for update
  using (bucket_id = 'media' and auth.role() = 'authenticated');
```

## 2. Table `site_assets`

À coller dans **SQL editor** :

```sql
-- Mapping slot_id → URL de l'asset uploadé
create table if not exists public.site_assets (
  slot_id     text primary key,
  asset_url   text not null,
  alt_text    text,
  uploaded_at timestamp with time zone default now(),
  uploaded_by text
);

-- RLS : lecture publique (le hook useSiteAsset lit côté client front),
-- écriture réservée aux authentifiés.
alter table public.site_assets enable row level security;

create policy "site_assets_public_read"
  on public.site_assets for select
  using (true);

create policy "site_assets_authenticated_write"
  on public.site_assets for insert
  with check (auth.role() = 'authenticated');

create policy "site_assets_authenticated_update"
  on public.site_assets for update
  using (auth.role() = 'authenticated');

create policy "site_assets_authenticated_delete"
  on public.site_assets for delete
  using (auth.role() = 'authenticated');

-- Index trivial pour cache busting éventuel
create index if not exists site_assets_uploaded_at_idx
  on public.site_assets (uploaded_at desc);
```

## 3. Variables d'environnement

`.env.local` (déjà en place dans le projet) :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## 4. Vérification

1. Lance `npm run dev`
2. Navigue sur `/admin/medias` (logué admin)
3. Drag-drop une image, elle doit apparaître dans la galerie
4. Clique "Assigner" → choisir "Hero plomberie" → l'image apparaît avec badge `custom`
5. La table `site_assets` contient une ligne `slot_id = "hero-plomberie"`

## 5. Architecture front

Côté site public, les composants Hero/Sections lisent leur asset via :

```ts
import { useSiteAsset } from "@/lib/hooks/useSiteAssets";

const hero = useSiteAsset("hero-plomberie", "/images/hero-plombier.jpg");
// hero.url = URL custom uploadée OU fallback /public/...
// hero.alt = texte alt configuré au moment de l'assignation
```

Aucune donnée privée ne transite, aucun secret n'est exposé : les URLs Supabase
publiques sont conçues pour être servies au navigateur. Le bucket reste read-only
pour les anonymes, l'écriture est verrouillée par RLS.

## 6. Liste des slots prédéfinis

Source de vérité : `lib/data/site-asset-slots.ts`. Un slot = une "case" identifiée
dans laquelle on peut placer un visuel. Pour ajouter un nouvel emplacement,
éditer ce fichier puis brancher le composant front via `useSiteAsset(newSlotId, fallback)`.

| Catégorie            | Slots                                                                |
| -------------------- | -------------------------------------------------------------------- |
| Homepage             | `home-hero-video`, `home-hero-poster`, `home-services-{plomberie,serrurerie,electricite}` |
| Hero métier          | `hero-{plomberie,serrurerie,electricite}`                            |
| Sections génériques  | `section-{diagnostic,intervention,artisans,antiarnaque}`             |
