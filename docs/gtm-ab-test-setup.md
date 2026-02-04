# Guide Configuration GTM - A/B Test

Ce guide détaille la configuration Google Tag Manager pour le système A/B test du site monjoel.fr.

## Prérequis

- Accès au compte GTM : `GTM-NFKDT6QC`
- Accès au compte GA4 : `G-77JMV6XZ63`
- Accès optionnel à Google Ads : `AW-17805011663`

---

## Étape 1 : Créer les Variables

Aller sur https://tagmanager.google.com → Conteneur `GTM-NFKDT6QC` → **Variables** → **Nouvelle**

### Variable 1 : ab_test_id

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | DLV - ab_test_id |
| **Type** | Variable de couche de données |
| **Nom de la variable** | ab_test_id |
| **Version de la couche de données** | Version 2 |

### Variable 2 : ab_variant

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | DLV - ab_variant |
| **Type** | Variable de couche de données |
| **Nom de la variable** | ab_variant |
| **Version de la couche de données** | Version 2 |

### Variable 3 : ab_trade

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | DLV - ab_trade |
| **Type** | Variable de couche de données |
| **Nom de la variable** | ab_trade |
| **Version de la couche de données** | Version 2 |

### Variable 4 : ab_placement

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | DLV - ab_placement |
| **Type** | Variable de couche de données |
| **Nom de la variable** | ab_placement |
| **Version de la couche de données** | Version 2 |

---

## Étape 2 : Créer les Déclencheurs (Triggers)

Aller sur **Déclencheurs** → **Nouveau**

### Trigger 1 : AB Test - Attribution

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | CE - AB Test Assigned |
| **Type** | Événement personnalisé |
| **Nom de l'événement** | ab_test_assigned |
| **Ce déclencheur se déclenche sur** | Tous les événements personnalisés |

### Trigger 2 : AB Test - Vue

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | CE - AB Test View |
| **Type** | Événement personnalisé |
| **Nom de l'événement** | ab_test_view |
| **Ce déclencheur se déclenche sur** | Tous les événements personnalisés |

### Trigger 3 : AB Test - Conversion

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | CE - AB Test Conversion |
| **Type** | Événement personnalisé |
| **Nom de l'événement** | ab_test_conversion |
| **Ce déclencheur se déclenche sur** | Tous les événements personnalisés |

---

## Étape 3 : Créer les Tags

Aller sur **Tags** → **Nouveau**

### Tag 1 : GA4 - AB Test Assigned

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | GA4 Event - AB Test Assigned |
| **Type** | Google Analytics : Événement GA4 |
| **Tag de configuration** | Sélectionner votre tag de configuration GA4 existant |
| **Nom de l'événement** | ab_test_assigned |

**Paramètres de l'événement** (cliquer "Ajouter une ligne") :

| Nom du paramètre | Valeur |
|------------------|--------|
| test_id | {{DLV - ab_test_id}} |
| variant | {{DLV - ab_variant}} |
| trade | {{DLV - ab_trade}} |

**Déclenchement** : CE - AB Test Assigned

---

### Tag 2 : GA4 - AB Test View

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | GA4 Event - AB Test View |
| **Type** | Google Analytics : Événement GA4 |
| **Tag de configuration** | Sélectionner votre tag de configuration GA4 existant |
| **Nom de l'événement** | ab_test_view |

**Paramètres de l'événement** :

| Nom du paramètre | Valeur |
|------------------|--------|
| test_id | {{DLV - ab_test_id}} |
| variant | {{DLV - ab_variant}} |
| trade | {{DLV - ab_trade}} |

**Déclenchement** : CE - AB Test View

---

### Tag 3 : GA4 - AB Test Conversion

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | GA4 Event - AB Test Conversion |
| **Type** | Google Analytics : Événement GA4 |
| **Tag de configuration** | Sélectionner votre tag de configuration GA4 existant |
| **Nom de l'événement** | ab_test_conversion |

**Paramètres de l'événement** :

| Nom du paramètre | Valeur |
|------------------|--------|
| test_id | {{DLV - ab_test_id}} |
| variant | {{DLV - ab_variant}} |
| trade | {{DLV - ab_trade}} |
| placement | {{DLV - ab_placement}} |

**Déclenchement** : CE - AB Test Conversion

---

### Tag 4 (Optionnel) : Google Ads - AB Test Conversion

| Paramètre | Valeur |
|-----------|--------|
| **Nom** | Google Ads - AB Test Conversion |
| **Type** | Suivi des conversions Google Ads |
| **ID de conversion** | AW-17805011663 |
| **Libellé de conversion** | ab_test_phone_call (à créer dans Google Ads) |

**Déclenchement** : CE - AB Test Conversion

---

## Étape 4 : Tester avec le Mode Preview

1. Cliquer sur **Prévisualiser** dans GTM
2. Entrer l'URL : `https://monjoel.fr/serrurerie`
3. La page s'ouvre avec le debug GTM
4. Vérifier les événements dans le panneau de gauche :
   - `ab_test_assigned` doit apparaître (1ère visite uniquement)
   - `ab_test_view` doit apparaître
5. Cliquer sur le numéro de téléphone
6. Vérifier que `ab_test_conversion` apparaît

### Vérification des données

Cliquer sur chaque événement et vérifier dans l'onglet **Variables** :

| Variable | Exemple de valeur |
|----------|-------------------|
| DLV - ab_test_id | serrurerie-landing-2026 |
| DLV - ab_variant | A, B ou C |
| DLV - ab_trade | serrurerie |
| DLV - ab_placement | hero-cta (pour conversion) |

---

## Étape 5 : Publier

1. Cliquer sur **Soumettre** (en haut à droite)
2. Nommer la version : "A/B Test Landing Pages - v1"
3. Cliquer sur **Publier**

---

## Étape 6 : Configurer GA4 pour l'analyse

### 6.1 Vérifier la réception des événements

1. Aller sur GA4 → **Temps réel**
2. Vérifier que les événements `ab_test_view` et `ab_test_conversion` apparaissent

### 6.2 Marquer ab_test_conversion comme conversion

1. GA4 → **Admin** → **Événements**
2. Trouver `ab_test_conversion`
3. Activer le toggle "Marquer comme conversion"

### 6.3 Créer une Exploration personnalisée

1. GA4 → **Explorer** → **Créer une exploration vide**
2. **Dimensions** : Ajouter `variant`, `trade`, `test_id`
3. **Métriques** : Ajouter `Utilisateurs`, `Conversions`, `Taux de conversion`
4. **Configuration** :
   - Lignes : `variant`
   - Colonnes : `trade`
   - Valeurs : `Taux de conversion`
5. **Filtres** : `test_id` contient "landing-2026"

---

## Analyse des Résultats

### Durée recommandée

- **Minimum** : 2 semaines
- **Recommandé** : 4 semaines
- **Condition** : Au moins 100 conversions par variante par métier

### Signification statistique

Pour déterminer un gagnant, le taux de conversion doit :
- Être supérieur de plus de 10% (relatif)
- Avoir une confiance statistique > 95%

### Outils utiles

- [Calculateur A/B Test](https://abtestguide.com/calc/)
- [VWO Significance Calculator](https://vwo.com/tools/ab-test-significance-calculator/)

---

## Forcer une variante (Debug)

Ajouter `?ab_variant=B` à l'URL pour forcer une variante :

```
https://monjoel.fr/serrurerie?ab_variant=A
https://monjoel.fr/serrurerie?ab_variant=B
https://monjoel.fr/serrurerie?ab_variant=C
```

Le cookie sera mis à jour et la variante persistera.

---

## Désactiver le test

Pour désactiver le test et afficher toujours la variante A :

1. Modifier `lib/ab-test/config.ts`
2. Passer `active: false` pour le métier concerné

```typescript
serrurerie: {
  id: "serrurerie-landing-2026",
  variants: [...],
  active: false, // ← Désactivé
},
```
