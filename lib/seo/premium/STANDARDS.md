# Standard SEO Ultra Premium — monjoel.fr

> Décision : **Option C — vision long terme ultra premium fact-checked**
> Date : 27 avril 2026

## ⚠️ FAITS JURIDIQUES À NE JAMAIS SE TROMPER (vérifiés Légifrance/INC/FFB)

Erreurs récurrentes constatées sur 115 pages (corrigées le 09/06/2026). Tout agent rédacteur/vérificateur DOIT respecter ceci :

1. **Devis obligatoire — AUCUN seuil de montant.** L'**arrêté du 24 janvier 2017** (en vigueur 01/04/2017) impose la remise d'un devis détaillé **avant TOUTE prestation** de dépannage/réparation/entretien dans le bâtiment, **quel que soit le montant, urgence comprise**. Il a **supprimé** le seuil de 150 € de l'ancien arrêté du 2 mars 1990. ❌ Ne JAMAIS écrire « devis obligatoire au-delà de 150 € / 100 € ».
2. **Déclaration catastrophe naturelle = 30 jours** à compter de la publication de l'arrêté au JO (loi n° 2021-1837, depuis le 01/01/2023). ❌ Plus « 10 jours ». (Sinistre hors cat-nat : 5 jours ouvrés.)
3. **Rétractation 14 j** : l'exception « travaux urgents » (art. L221-28 8° code conso) joue de plein droit pour la réparation urgente **expressément sollicitée** (pas besoin d'écrit), et ne couvre PAS les prestations additionnelles vendues sur place.
4. **Médiateur de la consommation** (art. R616-1) : coordonnées sur le **site / CGV / bon de commande**, PAS sur la facture.
5. **Litige facture ≤ 10 000 €** : **tribunal judiciaire** (chambre de proximité), sans avocat ; conciliation préalable obligatoire ≤ 5 000 €. Le **juge des contentieux de la protection** ne couvre PAS les litiges de dépannage (seulement crédit conso, baux, surendettement).

## Niveau de qualité par type de page

### Pages `/[trade]/[ville]` — extension géographique
**Mode : Premium signé, fact-check léger**
- Persona signataire (1 des 10) avec voix reconnaissable
- ≥ 2 400 mots de contenu rédactionnel original
- AVANT rédaction, l'agent fait :
  - 1 `WebSearch` : "[ville] population INSEE 2024-2026"
  - 1 `WebSearch` : "[ville] dureté eau" (plombier) OU "[ville] cambriolage statistiques 2024" (serrurier) OU "[ville] norme installation électrique" (électricien)
  - 1 `WebFetch` sur l'une des sources officielles ci-dessous
- Sources citées en filigrane dans le texte (ex : "selon les chiffres SSMSI 2024", "données Eau de Paris", "INSEE recensement 2024")

### Pages `/[trade]/[ville]/[service]` — pages de conversion critique
**Mode : Premium fact-checked obligatoire**
- Persona signataire avec voix reconnaissable
- ≥ 3 000 mots de contenu rédactionnel original
- AVANT rédaction, l'agent fait :
  - 3-4 `WebSearch` ciblées (population + statistique principale + prix marché concurrents + norme/réglementation 2024-2026)
  - 2-3 `WebFetch` sur sources officielles (INSEE, SSMSI, mairie locale, AFNOR, fournisseur d'eau)
- Sources citées explicitement avec dates (au moins 4-6 mentions de sources dans le texte)
- Section "Sources et méthodologie" en pied de page facultative pour les pages les plus critiques

## Sources officielles de référence (à utiliser EN PRIORITÉ)

### Démographie / urbanisme
- INSEE : <https://www.insee.fr/fr/statistiques>
- Mairie de la ville (`https://www.{nom-ville}.fr` — vérifier que le site existe)
- Préfecture (`https://www.{departement}.gouv.fr`)
- ADIL (Agence Départementale d'Information sur le Logement)

### Plomberie
- Eau de Paris : <https://www.eaudeparis.fr>
- SEDIF (Syndicat des Eaux d'Île-de-France) : <https://www.sedif.com>
- Veolia : <https://www.eau-services.com>
- Suez : <https://www.toutsurmoneau.fr>
- DGS / qualité de l'eau : <https://orobnat.sante.gouv.fr>

### Serrurerie / sécurité
- SSMSI (Service Statistique Ministériel de la Sécurité Intérieure) : <https://www.interieur.gouv.fr/Interstats>
- CNPP (normes A2P) : <https://www.cnpp.com>
- Police nationale / Gendarmerie : statistiques cambriolages par département/commune
- AFNOR (norme NF EN 1303 cylindres, NF EN 12209 serrures)

### Électricité
- Norme NF C 15-100 (AFNOR) : <https://www.afnor.org>
- Consuel : <https://www.consuel.com>
- Promotelec : <https://www.promotelec.com>
- ENEDIS / fournisseurs

### Anti-arnaque (toutes activités)
- DGCCRF / SignalConso : <https://signal.conso.gouv.fr>
- 60 Millions de Consommateurs
- UFC-Que Choisir
- Médiateur de la consommation

## Services BANNIS du programme Premium

Liste maintenue dans `lib/seo/premium/registry.ts` constante `BLOCKED_SERVICES`.

| Service | Raison |
|---------|--------|
| `reproduction-cles` | Décision business 2026-04-27 — pas de focus stratégique sur ce produit. Toutes les pages reproduction-cles sont supprimées et le filtre runtime ignore tout fichier futur de ce type. |

## Workflow de promotion d'une page non-Premium → Premium

Quand Google Search Console montre qu'une page `/[trade]/[ville]/[service]` (en `noindex` actuellement) reçoit ≥ 3 clics réguliers, on la promeut Premium :
1. Vérifier qu'elle n'est pas dans `BLOCKED_SERVICES`
2. Lancer un agent en mode **fact-checked** (mode page service)
3. Wire dans registry → automatiquement indexable + dans le sitemap

## Audit récurrent

Chaque trimestre :
- Vérifier que les statistiques citées sont à jour (re-passer un agent vérificateur)
- Bumper `updatedAt` si modifs
- Vérifier les positions GSC : si une page premium chute, audit sémantique
- Vérifier les liens externes / sources citées (URL valides)

## Métriques cibles

- **Court terme (1 mois)** : sortir de la spirale de désindexation. 50+ pages Premium.
- **Moyen terme (3 mois)** : 100-150 pages Premium, recovery progressive Google.
- **Long terme (6-12 mois)** : 200-400 pages Premium fact-checked, position moyenne <15 sur les keywords cibles.
