# Configuration Tracking - Joël

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CHARGEMENT PAGE                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  1. CONSENT MODE V2 DEFAULTS (script Cookiebot)             │
│     - ad_storage: denied                                    │
│     - ad_user_data: denied                                  │
│     - ad_personalization: denied                            │
│     - analytics_storage: denied                             │
│     - ads_data_redaction: true                              │
│     - url_passthrough: false                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  2. COOKIEBOT CMP                                           │
│     - Affiche bannière de consentement                      │
│     - Mode: auto-blocking                                   │
│     - Envoie consent update à Google                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  3. GOOGLE TAG MANAGER (GTM)                                │
│     - Container: GTM-NFKDT6QC                               │
│     - Gère: GA4, Google Ads, Conversions                    │
│     - Respecte les signaux de consentement                  │
└─────────────────────────────────────────────────────────────┘
```

## IDs de Tracking

| Service | ID | Description |
|---------|-----|-------------|
| GTM | `GTM-NFKDT6QC` | Google Tag Manager container |
| Google Ads | `AW-17805011663` | Compte Google Ads Joël |
| Google Tag | `GT-5MCRKCLP` | Google Tag (unifié) |
| Cookiebot | `c1addd46-5bcb-4d18-835f-4db63cde7755` | CMP pour consentement |

## Variables d'Environnement

Ajouter sur Vercel (Settings → Environment Variables) :

```bash
# Cookiebot CMP
NEXT_PUBLIC_COOKIEBOT_ID=c1addd46-5bcb-4d18-835f-4db63cde7755

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-NFKDT6QC
```

### Variables optionnelles (fallback pour conversions)

```bash
# Si tu veux un fallback pour les conversions hors GTM
NEXT_PUBLIC_GOOGLE_ADS_SEND_TO=AW-17805011663/XXXXXX
```

## Mapping Cookiebot → Google Consent

| Catégorie Cookiebot | Signal Google | Description |
|---------------------|---------------|-------------|
| Necessary | `security_storage` | Toujours granted |
| Preferences | `functionality_storage` | Stockage fonctionnel |
| Statistics | `analytics_storage` | Google Analytics |
| Marketing | `ad_storage`, `ad_user_data`, `ad_personalization` | Google Ads |

## Fichiers Modifiés

### `app/layout.tsx`
- Consent Mode v2 defaults (ligne ~45)
- Script Cookiebot (ligne ~70)
- GTM head script (ligne ~80)
- GTM noscript fallback (ligne ~110)

### `components/GoogleTag.tsx`
- Désactivé pour éviter double chargement avec GTM
- Code conservé en commentaire si besoin de revenir à gtag direct

### `components/TelClickTracker.tsx`
- Toujours actif pour tracker les clics sur tel:
- Envoie les conversions via gtag (qui est chargé par GTM)

## Test de Validation

### Avant déploiement (localhost)

1. Lancer le site en local : `npm run dev`
2. Ouvrir http://localhost:3000 en navigation privée
3. Vérifier que la bannière Cookiebot apparaît
4. Ouvrir DevTools → Console : vérifier les logs `[GoogleTag]`

### Après déploiement

1. **Test bannière** :
   - Ouvrir le site en navigation privée
   - La bannière Cookiebot doit apparaître

2. **Test cookies (avant consentement)** :
   - DevTools → Application → Cookies
   - Aucun cookie `_ga`, `_gid`, `_gcl` ne doit être présent

3. **Test "Accepter"** :
   - Cliquer sur "Accepter" dans la bannière
   - Les cookies Google doivent apparaître
   - Dans la console, vérifier les hits GA4

4. **Test "Refuser"** :
   - Rafraîchir en navigation privée
   - Cliquer sur "Refuser"
   - Aucun cookie marketing ne doit être posé
   - Google utilise la modélisation (cookieless)

5. **Test Google Tag Assistant** :
   - Installer l'extension Chrome "Tag Assistant"
   - Vérifier que Consent Mode est détecté
   - Vérifier les signaux : `ad_storage`, `analytics_storage`, etc.

### Test des conversions

1. **Clic téléphone** :
   - Cliquer sur un lien tel:
   - Vérifier dans DevTools → Network qu'un hit conversion part
   - Vérifier dans Google Ads → Conversions (délai 24-48h)

## Diagnostic : "Budget consommé sans conversions"

| Symptôme | Cause probable | Solution |
|----------|----------------|----------|
| 0 conversions | Consent Mode bloque tout | Vérifier que GTM a les bons triggers de consentement |
| Conversions en double | gtag + GTM chargés | Vérifier que GoogleTag.tsx est désactivé |
| Conversions sans appels réels | Bots/fraud | Activer reCAPTCHA ou filtres IP |
| Conversions décalées | Délai attribution | Normal, attendre 24-48h |
| Consent Mode "non détecté" | Script mal ordonné | Vérifier ordre dans layout.tsx |

## Configuration GTM Recommandée

Dans Google Tag Manager, assure-toi d'avoir :

### Tags requis
1. **Google Tag (GT-5MCRKCLP)** - Configuration principale
2. **Conversion Linker** - Pour le suivi cross-domain
3. **Google Ads Conversion** - Pour chaque action de conversion

### Triggers recommandés
- `Consent Initialization - All Pages` pour le tag de config
- `Page View` avec condition de consentement pour GA4
- `Click - tel:` pour les conversions appel

### Variables de consentement
- Utiliser les built-in consent checks de GTM
- Ou créer des variables basées sur `Cookiebot.consent`

## Support

- **Cookiebot** : https://support.cookiebot.com/
- **GTM** : https://support.google.com/tagmanager
- **Consent Mode** : https://developers.google.com/tag-platform/security/guides/consent
