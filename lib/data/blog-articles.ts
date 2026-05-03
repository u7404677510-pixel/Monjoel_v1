/**
 * Articles de blog - Contenu SEO pour requêtes informationnelles
 */

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  category: "plomberie" | "serrurerie" | "electricite" | "conseils";
  readTime: number; // minutes
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  keywords: string[];
  content: string; // Markdown content
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "fuite-eau-nuit-que-faire",
    title: "Fuite d'eau la nuit : que faire en urgence ?",
    excerpt: "Découvrez les réflexes à adopter immédiatement en cas de fuite d'eau nocturne et comment limiter les dégâts avant l'arrivée du plombier.",
    metaDescription: "Fuite d'eau la nuit ? Voici les gestes d'urgence à faire immédiatement : couper l'eau, limiter les dégâts, appeler un plombier 24h/24. Guide complet.",
    category: "plomberie",
    readTime: 5,
    publishedAt: "2026-01-10",
    keywords: ["fuite eau nuit", "urgence plomberie", "que faire fuite eau", "plombier nuit"],
    content: `
## Les premiers réflexes en cas de fuite d'eau la nuit

Une fuite d'eau qui survient en pleine nuit est une situation stressante. Voici les étapes à suivre immédiatement pour limiter les dégâts.

### 1. Coupez l'arrivée d'eau principale

La première chose à faire est de **couper l'eau au compteur général**. Celui-ci se trouve généralement :
- Dans un placard technique de votre appartement
- Au sous-sol ou dans le local technique de l'immeuble
- À l'extérieur de votre maison (regard enterré)

### 2. Coupez l'électricité si nécessaire

Si l'eau s'approche de prises électriques ou d'appareils branchés, **coupez le disjoncteur principal** par sécurité. L'eau et l'électricité ne font pas bon ménage.

### 3. Limitez la propagation de l'eau

- Placez des serpillières et des bassines sous la fuite
- Utilisez des serviettes pour absorber l'eau
- Surélevez les meubles et objets au sol si possible

### 4. Identifiez la source de la fuite

Essayez de localiser d'où vient la fuite :
- Robinet qui fuit
- Tuyau percé ou joint défaillant
- Chauffe-eau qui déborde
- Canalisation bouchée qui refoule

### 5. Appelez un plombier d'urgence

Une fuite d'eau nocturne nécessite souvent une intervention rapide. Chez **Joël**, nos plombiers interviennent **24h/24** en Île-de-France avec un prix fixe annoncé avant intervention.

## Faut-il attendre le lendemain ?

**Non**, si la fuite est importante. Les dégâts des eaux peuvent :
- Endommager vos sols et plafonds
- Créer des infiltrations chez vos voisins
- Favoriser l'apparition de moisissures
- Faire grimper votre facture d'eau

Une intervention rapide coûte souvent moins cher que les réparations liées aux dégâts des eaux.

## Combien coûte un plombier la nuit ?

Les tarifs de nuit sont généralement majorés de 30 à 50% par rapport aux tarifs de jour. Chez Joël, nous pratiquons un **prix fixe garanti** :
- Dépannage fuite simple : à partir de 89€
- Recherche de fuite : à partir de 129€
- Remplacement robinet : à partir de 69€

**Le prix est annoncé avant l'intervention**, sans surprise.

## Conclusion

En cas de fuite d'eau la nuit, gardez votre calme, coupez l'eau et l'électricité si nécessaire, puis appelez un professionnel. Plus vous agissez vite, moins les dégâts seront importants.

📞 **Besoin d'un plombier maintenant ?** Appelez le 01 41 69 10 08
    `
  },
  {
    slug: "ouvrir-porte-claquee-sans-serrurier",
    title: "Porte claquée : comment l'ouvrir sans serrurier ?",
    excerpt: "Vous avez claqué votre porte ? Découvrez les méthodes pour tenter de l'ouvrir vous-même et quand faire appel à un serrurier professionnel.",
    metaDescription: "Porte claquée ? 5 méthodes pour essayer d'ouvrir votre porte avant d'appeler un serrurier. Techniques, risques et prix d'une ouverture de porte.",
    category: "serrurerie",
    readTime: 6,
    publishedAt: "2026-01-12",
    keywords: ["porte claquée", "ouvrir porte", "serrurier urgence", "ouverture porte"],
    content: `
## Porte claquée : les solutions avant d'appeler un serrurier

Vous avez claqué votre porte et vos clés sont restées à l'intérieur ? Avant d'appeler un serrurier, voici quelques solutions à tenter.

### Vérifiez toutes les ouvertures

Avant toute chose, faites le tour de votre logement :
- **Fenêtre entrouverte** au rez-de-chaussée ou accessible
- **Porte de service** ou porte de garage communicante
- **Balcon accessible** depuis un voisin (avec son accord)

⚠️ **Attention** : ne prenez jamais de risques pour votre sécurité !

### La technique de la radiographie (carte bancaire)

Cette méthode ne fonctionne que sur les serrures à pêne biseauté (serrures basiques) :

1. Glissez une carte rigide entre la porte et le chambranle
2. Inclinez la carte vers le pêne
3. Poussez en même temps que vous actionnez la poignée

**Limites** : Cette technique ne fonctionne pas sur :
- Les portes blindées
- Les serrures multipoints
- Les portes fermées à clé (pas seulement claquées)

### Contacter un voisin ou le gardien

Si vous habitez en immeuble :
- Le gardien peut parfois vous aider ou a un double des clés
- Un voisin peut vous prêter des outils ou son téléphone
- Le syndic peut avoir un passe en cas d'urgence

### Quand appeler un serrurier ?

Il est temps de faire appel à un professionnel si :
- Aucune autre entrée n'est possible
- La porte est blindée ou équipée d'une serrure sécurisée
- Vous avez besoin d'entrer rapidement (urgence médicale, enfant seul, etc.)

### Prix d'une ouverture de porte claquée

Les tarifs varient selon le type de serrure :

| Type d'ouverture | Prix moyen |
|------------------|------------|
| Ouverture simple (pêne claqué) | 89€ - 120€ |
| Ouverture serrure multipoints | 120€ - 180€ |
| Ouverture avec perçage | 150€ - 250€ |

Chez **Joël**, le prix est fixe et annoncé **avant l'intervention**. Pas de mauvaise surprise !

### Comment éviter que ça se reproduise ?

- **Double de clés** : Confiez un double à un voisin de confiance ou un proche
- **Serrure à verrouillage** : Installez une serrure qui ne se verrouille qu'avec la clé
- **Boîtier à code** : Un petit coffre à clé à l'extérieur (pour maison individuelle)

## Conclusion

Une porte claquée n'est pas toujours une urgence coûteuse. Mais si vous ne pouvez pas l'ouvrir vous-même, faites appel à un serrurier sérieux qui annonce son prix avant d'intervenir.

📞 **Porte claquée ?** Appelez le 01 41 69 10 08 - Intervention en 30 min
    `
  },
  {
    slug: "disjoncteur-saute-causes-solutions",
    title: "Disjoncteur qui saute : causes et solutions",
    excerpt: "Votre disjoncteur saute régulièrement ? Découvrez les causes possibles et comment résoudre ce problème électrique courant.",
    metaDescription: "Disjoncteur qui saute ? Découvrez les 7 causes principales et les solutions pour résoudre ce problème. Guide complet par un électricien.",
    category: "electricite",
    readTime: 7,
    publishedAt: "2026-01-15",
    keywords: ["disjoncteur saute", "panne électrique", "électricien urgence", "court-circuit"],
    content: `
## Pourquoi mon disjoncteur saute-t-il ?

Un disjoncteur qui saute régulièrement est un signal d'alerte. Voici les causes les plus fréquentes et comment y remédier.

### 1. Surcharge électrique

C'est la cause la plus courante. Votre installation électrique a une **puissance maximale** (en kVA). Si vous branchez trop d'appareils en même temps, le disjoncteur coupe pour protéger l'installation.

**Solutions :**
- Débranchez les appareils non essentiels
- Évitez d'utiliser plusieurs appareils gourmands en même temps (four, lave-linge, chauffage électrique)
- Envisagez d'augmenter la puissance de votre abonnement EDF

### 2. Court-circuit

Un court-circuit survient quand deux fils (phase et neutre) entrent en contact direct. Cela crée une surintensité dangereuse.

**Signes d'un court-circuit :**
- Odeur de brûlé
- Étincelles
- Noircissement autour d'une prise ou d'un interrupteur

**Solution :** Faites intervenir un électricien immédiatement.

### 3. Défaut d'isolement

L'isolant d'un câble peut s'abîmer avec le temps, l'humidité ou les rongeurs. Le courant "fuit" alors vers la terre.

**Solution :** Un électricien peut localiser le défaut avec un mégohmmètre.

### 4. Appareil défectueux

Un appareil électroménager en fin de vie peut provoquer des fuites de courant ou des courts-circuits.

**Test simple :**
1. Débranchez tous les appareils
2. Réarmez le disjoncteur
3. Rebranchez les appareils un par un
4. Celui qui fait sauter le disjoncteur est le coupable

### 5. Disjoncteur défaillant

Le disjoncteur lui-même peut être défaillant, surtout s'il est ancien.

**Signes de disjoncteur fatigué :**
- Il saute sans raison apparente
- Il est difficile à réarmer
- Il chauffe anormalement

### 6. Installation vétuste

Les installations de plus de 30 ans ne sont souvent plus aux normes actuelles. La capacité peut être insuffisante pour les usages modernes.

**Solution :** Une mise aux normes peut être nécessaire.

### 7. Humidité

L'eau et l'électricité ne font pas bon ménage. Une infiltration peut créer des défauts d'isolement.

## Que faire quand le disjoncteur saute ?

1. **Identifiez quel disjoncteur a sauté** (général ou divisionnaire)
2. **Débranchez les appareils** sur le circuit concerné
3. **Réarmez le disjoncteur** en le remettant sur ON
4. Si ça resaute, **appelez un électricien**

## Quand faire appel à un électricien ?

- Le disjoncteur refuse de se réarmer
- Vous sentez une odeur de brûlé
- Le problème se reproduit régulièrement
- Vous ne trouvez pas la cause

## Prix d'un dépannage électrique

| Intervention | Prix moyen |
|--------------|------------|
| Diagnostic disjoncteur | 79€ |
| Remplacement disjoncteur | 119€ |
| Recherche de défaut | 99€ |
| Mise aux normes tableau | à partir de 199€ |

📞 **Disjoncteur qui saute ?** Appelez le 01 41 69 10 08 - Électricien 24h/24
    `
  },
  {
    slug: "prix-serrurier-tarifs-2026",
    title: "Prix serrurier 2026 : tarifs et conseils pour éviter les arnaques",
    excerpt: "Combien coûte un serrurier en 2026 ? Découvrez les vrais tarifs du marché et nos conseils pour éviter les arnaques.",
    metaDescription: "Prix serrurier 2026 : ouverture de porte de 89€ à 250€, changement serrure dès 119€. Grille tarifaire complète et conseils anti-arnaque.",
    category: "serrurerie",
    readTime: 8,
    publishedAt: "2026-01-20",
    updatedAt: "2026-01-27",
    keywords: ["prix serrurier", "tarif serrurier", "cout ouverture porte", "arnaque serrurier"],
    content: `
## Prix serrurier 2026 : la grille tarifaire complète

Vous avez besoin d'un serrurier mais vous craignez les arnaques ? Voici les vrais prix du marché pour vous aider à y voir clair.

### Ouverture de porte : les tarifs

| Type d'ouverture | Prix en journée | Prix nuit/WE |
|------------------|-----------------|--------------|
| Porte claquée (pêne simple) | 89€ - 120€ | 120€ - 160€ |
| Porte fermée à clé | 120€ - 180€ | 160€ - 220€ |
| Porte blindée | 150€ - 250€ | 200€ - 350€ |
| Ouverture avec perçage | 150€ - 220€ | 200€ - 300€ |

**À noter :** Le perçage détruit le cylindre qui devra être remplacé (+ 50€ à 150€).

### Changement de serrure et cylindre

| Prestation | Prix (fourniture incluse) |
|------------|---------------------------|
| Changement cylindre standard | 119€ - 180€ |
| Changement cylindre A2P* | 180€ - 300€ |
| Changement serrure complète | 180€ - 350€ |
| Serrure multipoints 3 points | 250€ - 450€ |
| Serrure multipoints 5 points | 400€ - 700€ |

*Cylindre certifié résistant à l'effraction

### Blindage de porte

| Type de blindage | Prix |
|------------------|------|
| Blindage de porte existante | 590€ - 1200€ |
| Porte blindée (pose incluse) | 1500€ - 3500€ |
| Barre de sécurité | 150€ - 300€ |

### Ce qui fait varier les prix

1. **L'heure d'intervention** : nuit et week-end = + 30 à 50%
2. **Le type de serrure** : plus elle est sécurisée, plus c'est cher
3. **La méthode** : sans perçage < avec perçage
4. **La zone géographique** : Paris > Banlieue
5. **L'urgence** : intervention immédiate = plus cher

## Comment éviter les arnaques ?

### Les signaux d'alerte

🚨 **Méfiez-vous si :**
- Le prix annoncé au téléphone est anormalement bas
- Le serrurier refuse de donner un prix ferme avant d'intervenir
- Il insiste pour remplacer la serrure alors que ce n'est pas nécessaire
- Le prix final est très supérieur au devis
- Il n'a pas de facture ou refuse d'en faire une

### Les bonnes pratiques

✅ **Faites ceci :**
- Demandez un devis ferme avant intervention
- Vérifiez les avis en ligne (Google, Pages Jaunes)
- Exigez une facture détaillée
- Payez par carte si possible (trace)
- Comparez plusieurs devis si ce n'est pas urgent

### Les prix "trop beaux pour être vrais"

Si un serrurier vous annonce 39€ pour une ouverture de porte, méfiance ! Une fois sur place, la facture peut atteindre 300€, 500€ ou plus avec des prétextes :
- "C'est plus compliqué que prévu"
- "Il faut changer la serrure"
- "Frais de déplacement non inclus"

## Joël : prix fixe garanti

Chez Joël, notre engagement est simple :
- **Prix annoncé = prix payé**
- Pas de frais cachés
- Devis gratuit avant intervention
- Facturation transparente

📞 **Besoin d'un serrurier honnête ?** Appelez le 01 41 69 10 08
    `
  },
  {
    slug: "arnaques-plomberie-comment-eviter",
    title: "Arnaques plomberie : 7 conseils pour les éviter",
    excerpt: "Découvrez les techniques des plombiers malhonnêtes et comment vous protéger contre les arnaques en dépannage plomberie.",
    metaDescription: "Arnaques plomberie : les 7 techniques des escrocs et nos conseils pour les éviter. Protégez-vous avec ce guide complet.",
    category: "conseils",
    readTime: 6,
    publishedAt: "2026-01-25",
    keywords: ["arnaque plombier", "plombier malhonnête", "éviter arnaques", "dépannage plomberie"],
    content: `
## Les arnaques les plus courantes en plomberie

Le secteur du dépannage à domicile est malheureusement touché par des pratiques malhonnêtes. Voici comment les reconnaître et vous en protéger.

### 1. Le prix d'appel trompeur

**La technique :** Le plombier annonce 49€ au téléphone, mais une fois sur place, la facture explose.

**Comment ça marche :**
- "C'est plus grave que prévu"
- "Il faut changer la pièce"
- "Intervention de nuit = supplément"

**Solution :** Exigez un devis ferme et détaillé AVANT l'intervention.

### 2. Le remplacement abusif

**La technique :** Le plombier insiste pour remplacer une pièce en bon état.

**Exemples fréquents :**
- Changement complet du robinet pour un simple joint
- Remplacement du chauffe-eau pour une résistance à changer
- Nouveau siphon pour un simple débouchage

**Solution :** Demandez à voir la pièce "défectueuse" et faites vérifier par un autre professionnel en cas de doute.

### 3. Les frais cachés

**La technique :** Le devis ne mentionne pas tous les frais.

**Frais souvent ajoutés à la fin :**
- Déplacement (non mentionné)
- Main d'œuvre (en plus des pièces)
- "Urgence" ou "horaires décalés"
- TVA "oubliée" dans le devis HT

**Solution :** Demandez un prix TTC, tout compris, par écrit.

### 4. L'absence de facture

**La technique :** Le plombier refuse de faire une facture ou la fait à un nom fantaisiste.

**Pourquoi c'est grave :**
- Pas de garantie sur l'intervention
- Impossible de faire jouer l'assurance
- Pas de recours en cas de problème

**Solution :** Refusez de payer sans facture. C'est obligatoire et légal.

### 5. La pression psychologique

**La technique :** Le plombier crée un sentiment d'urgence pour vous faire accepter n'importe quoi.

**Phrases typiques :**
- "Si on ne fait pas ça maintenant, votre immeuble va être inondé"
- "C'est dangereux, il faut intervenir tout de suite"
- "Je ne peux pas partir comme ça, c'est ma responsabilité"

**Solution :** Gardez votre calme. Une vraie urgence, c'est de l'eau qui coule partout, pas un robinet qui goutte.

### 6. Le faux plombier

**La technique :** Un escroc se fait passer pour un artisan qualifié.

**Signes révélateurs :**
- Pas de numéro SIRET vérifiable
- Pas de véhicule professionnel identifié
- Paiement en liquide uniquement
- Pas de devis écrit

**Solution :** Vérifiez le numéro SIRET sur societe.com et demandez une pièce d'identité.

### 7. Le "diagnostic payant"

**La technique :** Le plombier facture un diagnostic avant de donner un devis.

**Ce qui est normal :**
- Un devis gratuit est standard dans le métier
- Le diagnostic fait partie du devis

**Solution :** Refusez les diagnostics payants. Un professionnel sérieux établit un devis gratuit.

## Comment choisir un bon plombier ?

### Les critères de confiance

✅ **Un bon plombier :**
- Donne un prix ferme au téléphone ou sur place
- Fournit un devis écrit avant intervention
- A des avis vérifiables en ligne
- Accepte le paiement par carte
- Fournit une facture détaillée
- A un numéro SIRET valide

### Les réflexes à avoir

1. **Comparez les devis** (si ce n'est pas urgent)
2. **Vérifiez les avis Google**
3. **Demandez le prix TTC total**
4. **Exigez une facture**
5. **Payez par carte quand possible**

## Joël : l'anti-arnaque par nature

Chez Joël, nous avons fait de la transparence notre marque de fabrique :
- Prix fixe annoncé et respecté
- Devis gratuit et sans engagement
- Facture détaillée systématique
- Artisans vérifiés et notés

📞 **Un plombier de confiance ?** Appelez le 01 41 69 10 08
    `
  },
  // ============================================
  // NOUVEAUX ARTICLES SEO SERRURERIE (Ahrefs)
  // ============================================
  {
    slug: "comment-ouvrir-porte-claquee",
    title: "Comment ouvrir une porte claquée ? Guide complet 2026",
    excerpt: "Porte claquée et clés à l'intérieur ? Découvrez toutes les méthodes pour ouvrir votre porte, du système D à l'appel d'un serrurier.",
    metaDescription: "Porte claquée ? 7 méthodes pour l'ouvrir : technique radio, carte, voisin, serrurier. Prix réels et conseils anti-arnaque. Guide complet.",
    category: "serrurerie",
    readTime: 8,
    publishedAt: "2026-02-01",
    keywords: ["porte claquée", "comment ouvrir porte claquée", "ouvrir porte sans clé", "porte fermée clé intérieur"],
    content: `
## Porte claquée : les 7 méthodes pour l'ouvrir

Vous avez claqué votre porte et vos clés sont restées à l'intérieur ? Pas de panique. Voici toutes les solutions, de la plus simple à l'appel d'un professionnel.

### Méthode 1 : Vérifiez les autres accès

Avant tout, faites le tour de votre logement :
- **Fenêtre entrouverte** accessible (rez-de-chaussée, balcon)
- **Porte de service** ou garage communicant
- **Voisin avec passe** (rare mais possible en copropriété)

⚠️ **Ne prenez jamais de risques pour votre sécurité !**

### Méthode 2 : La technique de la carte (radio)

Cette méthode ne fonctionne que sur les **serrures à pêne demi-tour** (serrures basiques non verrouillées à clé).

**Comment faire :**
1. Prenez une carte plastique rigide (carte de fidélité, pas votre CB !)
2. Glissez-la entre la porte et le chambranle, au niveau du pêne
3. Inclinez-la vers le pêne et poussez
4. En même temps, actionnez la poignée et poussez la porte

**Ça ne marche PAS si :**
- La porte est fermée à clé (pas juste claquée)
- Vous avez une serrure multipoints
- La porte est blindée
- Le pêne n'est pas biseauté

### Méthode 3 : Appellez le gardien ou syndic

En copropriété, le gardien peut parfois :
- Avoir un double de vos clés
- Vous prêter un passe pour les parties communes
- Contacter un serrurier agrée par le syndic

### Méthode 4 : Demandez à un voisin de confiance

Si vous avez confié un double de clé à un voisin, c'est le moment de l'appeler ! Sinon, il peut peut-être :
- Vous prêter son téléphone
- Vous donner accès à son balcon si les vôtres communiquent

### Méthode 5 : Appelez un proche avec un double

Si un ami ou membre de la famille a un double, c'est la solution la plus simple et la moins chère.

### Méthode 6 : Faites appel à un serrurier

Quand les autres méthodes échouent, il est temps d'appeler un professionnel.

**Prix d'une ouverture de porte claquée :**

| Type de serrure | Méthode | Prix moyen |
|----------------|---------|------------|
| Serrure simple | Sans perçage | 89€ - 120€ |
| Serrure 3 points | Sans perçage | 120€ - 160€ |
| Porte blindée | Selon méthode | 150€ - 250€ |
| Avec perçage | + cylindre neuf | 150€ - 220€ |

### Méthode 7 : Le serrurier en urgence 24h/24

Si c'est la nuit ou le week-end, les tarifs peuvent être majorés. Chez **Joël**, le prix reste le même 24h/24, sans majoration.

## Comment éviter les arnaques ?

### Les signaux d'alerte

🚨 **Fuyez si :**
- Le prix au téléphone est inférieur à 50€ (irréaliste)
- Pas de devis avant intervention
- Le serrurier veut percer immédiatement sans essayer d'autres méthodes
- Paiement en liquide uniquement exigé

### Les bons réflexes

✅ **Faites ceci :**
- Demandez un prix ferme au téléphone
- Vérifiez les avis Google
- Exigez un devis écrit avant intervention
- Payez par carte bancaire

## Combien de temps pour ouvrir une porte claquée ?

- **Serrure simple, technique radio :** 5-10 minutes
- **Serrure multipoints, crochetage :** 15-30 minutes
- **Porte blindée, perçage :** 30-60 minutes

## Conclusion

Une porte claquée n'est pas une fatalité coûteuse. Essayez d'abord les méthodes simples, et si vous devez appeler un serrurier, choisissez-en un qui annonce son prix à l'avance.

📞 **Porte claquée ?** Appelez le 01 41 69 10 08 - Ouverture dès 89€, intervention 30 min
    `
  },
  {
    slug: "changer-serrure-guide-complet",
    title: "Changer une serrure soi-même : guide étape par étape",
    excerpt: "Apprenez à changer votre serrure vous-même : cylindre, serrure complète, outils nécessaires et pièges à éviter.",
    metaDescription: "Changer serrure soi-même : guide complet avec photos. Cylindre, serrure 3 points, outils, étapes. Quand appeler un pro ? Tout savoir.",
    category: "serrurerie",
    readTime: 10,
    publishedAt: "2026-02-02",
    keywords: ["changer serrure", "remplacer serrure", "changer cylindre", "changer barillet", "serrure porte entrée"],
    content: `
## Changer une serrure : ce que vous pouvez faire vous-même

Changer une serrure n'est pas toujours une tâche complexe. Selon le type de changement, vous pouvez économiser le coût de la main-d'œuvre.

### Ce que vous pouvez faire seul

✅ **Accessible aux bricoleurs débutants :**
- Changement de cylindre (barillet)
- Remplacement d'une serrure simple à encastrer
- Changement de poignée de porte

⚠️ **Réservé aux bricoleurs confirmés :**
- Installation d'une serrure multipoints
- Changement de serrure sur porte blindée
- Ajustement du bâti de porte

### Outils nécessaires

- Tournevis plat et cruciforme
- Mètre et crayon
- Nouveau cylindre ou serrure
- Vis de fixation (souvent fournies)

## Changer un cylindre : le tutoriel

Le cylindre (ou barillet) est la partie de la serrure où vous insérez la clé. C'est le changement le plus simple.

### Étape 1 : Mesurez votre cylindre actuel

Avant d'acheter, mesurez :
- **Longueur totale** : de bout en bout
- **Position de la vis** : la distance de chaque côté
- **Diamètre** : généralement 17mm (standard européen)

### Étape 2 : Retirez l'ancien cylindre

1. Ouvrez la porte
2. Repérez la vis de fixation sur la tranche de la porte (au niveau du pêne)
3. Dévissez-la complètement
4. Insérez votre clé et tournez légèrement (10-15°)
5. Tirez le cylindre vers vous

### Étape 3 : Installez le nouveau cylindre

1. Insérez le nouveau cylindre (clé insérée et légèrement tournée)
2. Alignez le trou de vis avec celui de la serrure
3. Revissez la vis de fixation
4. Testez avec toutes les clés fournies

### Étape 4 : Testez porte ouverte ET fermée

Vérifiez que :
- La clé tourne facilement
- Le pêne s'engage bien dans la gâche
- La porte se ferme et s'ouvre sans forcer

## Changer une serrure complète

C'est plus complexe qu'un simple cylindre.

### Quand changer la serrure complète ?

- Le mécanisme interne est cassé
- Vous voulez passer à une serrure multipoints
- La serrure est trop ancienne (+ de 20 ans)
- Après un cambriolage (serrure forcée)

### Les étapes

1. **Démontez l'ancienne serrure** : retirez les vis de fixation visibles
2. **Mesurez l'entraxe** : distance entre les trous de fixation
3. **Achetez une serrure aux mêmes dimensions** (ou prévoyez des modifications)
4. **Installez la nouvelle serrure** : alignez, vissez, testez

## Quand appeler un serrurier ?

### Appelez un pro si :

- Votre porte est blindée
- Vous installez une serrure multipoints pour la première fois
- Les dimensions ne correspondent pas
- Vous n'êtes pas sûr de vous

### Prix d'un changement par un pro

| Prestation | Prix moyen |
|------------|------------|
| Changement cylindre | 120€ |
| Changement serrure simple | 180€ |
| Serrure 3 points | 250€ - 400€ |
| Serrure 5 points | 400€ - 700€ |

## Les erreurs à éviter

🚫 **Ne faites pas ça :**
- Acheter un cylindre sans mesurer l'ancien
- Forcer si le mécanisme coince
- Oublier de tester porte fermée
- Jeter l'ancien cylindre avant d'avoir testé le nouveau

## Conclusion

Changer un cylindre est accessible à tous. Pour une serrure complète ou multipoints, évaluez vos compétences et n'hésitez pas à faire appel à un pro si vous doutez.

📞 **Besoin d'un serrurier ?** Appelez le 01 41 69 10 08 - Changement serrure dès 149€
    `
  },
  {
    slug: "eviter-arnaques-serrurier",
    title: "Arnaques serrurier : 10 techniques des escrocs et comment s'en protéger",
    excerpt: "Les arnaques au serrurier sont légion. Découvrez les techniques des escrocs et nos conseils pour les éviter.",
    metaDescription: "Arnaque serrurier : les 10 techniques des escrocs. Prix d'appel trompeur, perçage abusif, devis non respecté. Comment s'en protéger ? Guide.",
    category: "serrurerie",
    readTime: 9,
    publishedAt: "2026-02-03",
    keywords: ["arnaque serrurier", "serrurier malhonnête", "éviter arnaque serrurier", "serrurier escroc"],
    content: `
## Les arnaques serrurier : un fléau bien réel

Chaque année, des milliers de Français se font arnaquer par de faux serruriers. Voici les techniques les plus courantes et comment vous en protéger.

### Technique 1 : Le prix d'appel irréaliste

**Comment ça marche :**
Le "serrurier" annonce 39€ ou 49€ au téléphone. Une fois sur place, la facture explose : "C'est plus compliqué que prévu", "Il faut changer la serrure", etc.

**Le vrai prix :** Une ouverture de porte simple coûte minimum 89€ en région parisienne.

### Technique 2 : Le perçage systématique

**Comment ça marche :**
Le serrurier perce immédiatement le cylindre sans essayer d'autres méthodes. Résultat : vous devez payer le cylindre neuf en plus.

**La réalité :** 80% des portes claquées s'ouvrent sans perçage.

### Technique 3 : Le remplacement abusif

**Comment ça marche :**
"Votre serrure est fichue, il faut la remplacer." Alors qu'un simple déblocage ou changement de cylindre suffirait.

**Astuce :** Demandez à voir le problème et gardez les pièces "défectueuses".

### Technique 4 : Le devis oral modifié

**Comment ça marche :**
Le devis donné au téléphone n'est jamais respecté. Sur place, les prix doublent ou triplent.

**Protection :** Exigez un devis écrit AVANT l'intervention.

### Technique 5 : La menace voilée

**Comment ça marche :**
"Je ne peux pas partir sans terminer le travail", "C'est dangereux de rester comme ça", etc.

**Réponse :** Vous avez le droit de refuser une prestation. Appelez la police si nécessaire.

### Technique 6 : Le faux serrurier

**Comment ça marche :**
Un escroc sans qualification se fait passer pour un artisan. Pas de SIRET, pas de facture, travail bâclé.

**Vérification :** Demandez le numéro SIRET et vérifiez sur societe.com

### Technique 7 : Le paiement en liquide uniquement

**Comment ça marche :**
Le "serrurier" n'accepte que les espèces. Pas de trace, pas de recours possible.

**Règle d'or :** Un vrai professionnel accepte la carte bancaire.

### Technique 8 : L'urgence fabriquée

**Comment ça marche :**
"Vous ne pouvez pas rester dehors", "Vos enfants sont seuls", etc. L'escroc exploite votre stress.

**Conseil :** Gardez votre calme. Comparez les devis si possible.

### Technique 9 : Les frais cachés

**Comment ça marche :**
Le devis ne mentionne pas tous les frais : déplacement, nuit, pièces, etc. Ils apparaissent sur la facture finale.

**Protection :** Demandez le prix TTC tout compris, par écrit.

### Technique 10 : Le faux numéro local

**Comment ça marche :**
Le numéro affiché semble local (01, 02...) mais renvoie vers un call center qui dispatche des arnaqueurs.

**Vérification :** Privilégiez les entreprises avec pignon sur rue ou recommandées.

## Comment se protéger ?

### Les bons réflexes

1. **Demandez un prix ferme** au téléphone
2. **Vérifiez les avis Google** (attention aux faux avis)
3. **Exigez un devis écrit** avant toute intervention
4. **Refusez le perçage** sans essai préalable
5. **Payez par carte** pour garder une trace
6. **Gardez les pièces** remplacées

### En cas d'arnaque

Si vous êtes victime :
- **Portez plainte** au commissariat
- **Contactez la DGCCRF** (répression des fraudes)
- **Faites opposition** si paiement par carte
- **Signalez sur signal.conso.gouv.fr**

## Joël : l'anti-arnaque

Chez Joël, notre modèle repose sur la transparence :
- Prix fixe annoncé = prix payé
- Devis écrit avant intervention
- Pas de perçage inutile
- Paiement par carte accepté
- 947 avis vérifiés

📞 **Un serrurier de confiance ?** Appelez le 01 41 69 10 08
    `
  },
  {
    slug: "serrure-3-points-vs-5-points",
    title: "Serrure 3 points vs 5 points : laquelle choisir ?",
    excerpt: "3 points, 5 points, 7 points... Quelle serrure multipoints choisir pour votre porte d'entrée ? Comparatif complet.",
    metaDescription: "Serrure 3 points ou 5 points ? Comparatif complet : sécurité, prix, assurance, installation. Quelle serrure multipoints pour votre porte ?",
    category: "serrurerie",
    readTime: 7,
    publishedAt: "2026-02-03",
    keywords: ["serrure 3 points", "serrure 5 points", "serrure multipoints", "serrure 7 points", "sécurité porte"],
    content: `
## Serrure multipoints : c'est quoi exactement ?

Une serrure multipoints verrouille votre porte à plusieurs endroits simultanément, contrairement à une serrure simple qui ne ferme qu'un point.

### Comment ça fonctionne ?

Quand vous tournez la clé :
- **3 points** : verrouillage haut, milieu, bas
- **5 points** : + 2 points latéraux (gauche et droite)
- **7 points** : + 2 points supplémentaires

Plus il y a de points, plus la porte est difficile à forcer.

## Comparatif 3 points vs 5 points vs 7 points

| Critère | 3 points | 5 points | 7 points |
|---------|----------|----------|----------|
| Sécurité | ★★★☆☆ | ★★★★☆ | ★★★★★ |
| Prix | 189€ - 350€ | 299€ - 550€ | 449€ - 800€ |
| Assurance | Souvent suffisant | Recommandé | Premium |
| Installation | Simple | Moyenne | Complexe |
| Pour qui ? | Appartement | Maison, RDC | Commerce, bijouterie |

## 3 points : pour qui ?

### Idéal si :
- Vous habitez en appartement (étages élevés)
- Votre budget est limité
- Vous avez déjà une porte standard
- Votre assurance n'exige que 3 points

### Limites :
- Protection moyenne contre l'effraction
- Les points latéraux (côtés) ne sont pas verrouillés

## 5 points : le meilleur compromis

### Idéal si :
- Vous habitez en maison individuelle
- Vous êtes au rez-de-chaussée
- Votre assurance l'exige
- Vous voulez une sécurité renforcée

### Avantages :
- Points latéraux = résistance au pied-de-biche
- Bon rapport sécurité/prix
- Souvent exigé par les assurances

## 7 points : la sécurité maximale

### Idéal si :
- Vous avez des objets de valeur
- Vous êtes souvent absent (vacances longues)
- Vous êtes un commerce (bijouterie, etc.)
- Vous voulez le maximum de sécurité

### Inconvénients :
- Prix élevé
- Installation complexe
- Parfois surdimensionné pour un particulier

## Et la certification A2P ?

La certification A2P garantit la résistance à l'effraction :
- **A2P*** : résiste 5 minutes
- **A2P**** : résiste 10 minutes
- **A2P****** : résiste 15 minutes

### Notre conseil

Une serrure 3 points A2P* offre souvent une meilleure protection qu'une 5 points non certifiée.

## Ce qu'exigent les assurances

La plupart des assurances demandent :
- Minimum **3 points de fermeture**
- Parfois certification **A2P** (vérifiez votre contrat)

**Attention :** Sans serrure conforme, votre assurance peut refuser de vous indemniser en cas de cambriolage !

## Combien coûte l'installation ?

| Type | Prix serrure | Pose | Total |
|------|-------------|------|-------|
| 3 points standard | 150€ - 250€ | 80€ | 230€ - 330€ |
| 3 points A2P* | 200€ - 350€ | 80€ | 280€ - 430€ |
| 5 points standard | 200€ - 400€ | 120€ | 320€ - 520€ |
| 5 points A2P** | 350€ - 550€ | 120€ | 470€ - 670€ |

## Notre recommandation

**Pour un appartement (hors RDC) :** 3 points A2P*
**Pour une maison ou RDC :** 5 points A2P*
**Pour un commerce :** 5 points A2P** minimum

📞 **Besoin d'un conseil personnalisé ?** Appelez le 01 41 69 10 08 - Devis gratuit
    `
  },
  {
    slug: "cylindre-a2p-guide-securite",
    title: "Cylindre A2P : tout savoir sur cette norme de sécurité",
    excerpt: "Qu'est-ce qu'un cylindre A2P ? Pourquoi le choisir ? Quel niveau (*, **, ***) pour votre porte ? Guide complet.",
    metaDescription: "Cylindre A2P : guide complet. C'est quoi, pourquoi, quel niveau choisir ? A2P*, A2P**, A2P***. Prix, marques, installation. Tout savoir.",
    category: "serrurerie",
    readTime: 8,
    publishedAt: "2026-02-04",
    keywords: ["cylindre a2p", "cylindre haute sécurité", "barillet a2p", "serrure anti-effraction", "cylindre sécurisé"],
    content: `
## C'est quoi un cylindre A2P ?

A2P signifie **Assurance Prévention Protection**. C'est une certification française délivrée par le CNPP qui garantit qu'un cylindre résiste aux tentatives d'effraction.

### Les 3 niveaux A2P

| Niveau | Résistance | Usage recommandé |
|--------|------------|------------------|
| A2P* | 5 minutes | Appartement standard |
| A2P** | 10 minutes | Maison, RDC, locaux pro |
| A2P*** | 15 minutes | Bijouterie, coffre-fort |

### Ce qui est testé

Un cylindre A2P résiste à :
- **Crochetage** : ouverture avec outils de serrurier
- **Perçage** : destruction par foret
- **Bumping** : technique avec clé spéciale
- **Arrachement** : traction forcée
- **Casse** : destruction par impact

## Pourquoi choisir un cylindre A2P ?

### 1. Sécurité prouvée

Un cylindre A2P a été testé en laboratoire. Sa résistance est mesurée, pas supposée.

### 2. Exigence des assurances

Beaucoup d'assurances demandent un cylindre A2P pour couvrir les vols avec effraction. Vérifiez votre contrat !

### 3. Clés protégées

Les cylindres A2P ont généralement des clés protégées : impossible de les reproduire sans la carte de propriété.

### 4. Dissuasion

Le logo A2P sur votre cylindre peut dissuader un cambrioleur qui reconnaît cette norme.

## Quel niveau A2P choisir ?

### A2P* : le bon compromis

✅ **Idéal pour :**
- Appartement (surtout étages)
- Budget maîtrisé
- Première sécurisation

**Prix :** 80€ - 150€

### A2P** : sécurité renforcée

✅ **Idéal pour :**
- Maison individuelle
- Rez-de-chaussée
- Zone à risque

**Prix :** 120€ - 250€

### A2P*** : maximum de protection

✅ **Idéal pour :**
- Locaux professionnels
- Objets de grande valeur
- Exigence assurance haut de gamme

**Prix :** 200€ - 400€

## Les marques recommandées

### Made in France

- **Vachette** : leader français, excellent rapport qualité/prix
- **Bricard** : cylindres haut de gamme
- **Fichet** : référence luxe

### Européennes

- **Abloy** (Finlande) : technologie disque
- **Keso** (Suisse) : très haute sécurité
- **DOM** (Allemagne) : bon rapport qualité/prix

## Comment reconnaître un vrai A2P ?

### Vérifications

1. **Logo A2P** gravé sur le cylindre
2. **Numéro de certification** sur l'emballage
3. **Carte de propriété** fournie
4. **Vendeur agréé** (pas sur les marketplaces)

### Attention aux faux

Certains vendeurs affichent "équivalent A2P" ou "qualité A2P". Ce n'est PAS une certification ! Seul le logo A2P officiel compte.

## Installation : seul ou par un pro ?

### Vous pouvez le faire si :
- Vous savez mesurer votre cylindre actuel
- Vous êtes un peu bricoleur
- Votre porte n'est pas blindée

### Faites appel à un pro si :
- Porte blindée
- Doute sur les dimensions
- Vous voulez une garantie d'installation

### Prix d'installation par un serrurier

| Prestation | Prix |
|------------|------|
| Pose cylindre A2P* (fourniture incluse) | 149€ - 199€ |
| Pose cylindre A2P** | 199€ - 279€ |
| Pose cylindre A2P*** | 279€ - 399€ |

## Conclusion

Un cylindre A2P est un investissement sécurité rentable. Pour un appartement, l'A2P* suffit généralement. Pour une maison ou un rez-de-chaussée, visez l'A2P**.

📞 **Conseil personnalisé ?** Appelez le 01 41 69 10 08 - Cylindre A2P dès 149€ posé
    `
  },
  {
    slug: "serrurier-urgence-nuit-weekend",
    title: "Serrurier de nuit et week-end : tarifs et conseils",
    excerpt: "Besoin d'un serrurier la nuit ou le dimanche ? Découvrez les vrais tarifs et comment éviter les arnaques en dehors des heures ouvrées.",
    metaDescription: "Serrurier nuit et week-end : tarifs réels, majorations légitimes vs arnaques. Comment trouver un serrurier honnête 24h/24 ? Guide complet.",
    category: "serrurerie",
    readTime: 6,
    publishedAt: "2026-02-04",
    keywords: ["serrurier nuit", "serrurier dimanche", "serrurier 24h/24", "serrurier urgence nuit", "serrurier week-end"],
    content: `
## Serrurier la nuit : comment ça marche ?

Une porte claquée à 3h du matin, c'est stressant. Voici ce qu'il faut savoir pour trouver un serrurier de confiance en dehors des heures ouvrées.

### Qui travaille la nuit et le week-end ?

Deux types de serruriers :
- **Services d'urgence** : artisans organisés pour les interventions 24h/24
- **Serruriers classiques** : certains acceptent les urgences hors horaires

### Les majorations sont-elles normales ?

Oui et non.

**Majorations légitimes :**
- Nuit (21h - 7h) : + 20 à 30%
- Dimanche et jours fériés : + 20 à 30%
- Cumul nuit + dimanche : + 40 à 50% max

**Majorations abusives :**
- Doublement ou triplement du prix
- "Urgence" facturée 100€ de plus
- "Déplacement nuit" à 150€

## Les vrais tarifs nuit/week-end

| Intervention | Jour (9h-19h) | Nuit/WE |
|-------------|---------------|---------|
| Ouverture porte claquée | 89€ | 110€ - 130€ |
| Ouverture avec perçage | 150€ | 180€ - 220€ |
| Changement cylindre | 120€ | 150€ - 170€ |

**Chez Joël :** Prix identique 24h/24, sans majoration.

## Comment éviter les arnaques la nuit ?

### Les pièges courants

🚨 **Attention si :**
- Prix annoncé 2 à 3 fois supérieur au tarif jour
- Le "serrurier" n'a pas de véhicule professionnel
- Il demande un paiement en espèces uniquement
- Il veut percer sans essayer autre chose

### Les bons réflexes

✅ **Faites ceci :**
- Demandez le prix total au téléphone
- Vérifiez les avis Google
- Gardez votre calme malgré le stress
- N'hésitez pas à appeler plusieurs serruriers

## Chez Joël : pas de majoration nuit

Notre engagement : le même prix 24h/24, 7j/7.
- Ouverture porte claquée : 89€
- Même le dimanche à 3h du matin

Pourquoi ? Parce qu'une urgence ne choisit pas son heure.

📞 **Urgence de nuit ?** Appelez le 01 41 69 10 08 - Même prix 24h/24
    `
  },
  {
    slug: "porte-blindee-guide-achat",
    title: "Porte blindée : guide d'achat complet 2026",
    excerpt: "Tout savoir sur les portes blindées : prix, certifications A2P, installation, marques. Comment bien choisir sa porte blindée ?",
    metaDescription: "Porte blindée 2026 : prix (1490€ à 4000€), certification A2P BP1/BP2/BP3, marques, installation. Guide achat complet pour bien choisir.",
    category: "serrurerie",
    readTime: 10,
    publishedAt: "2026-02-04",
    keywords: ["porte blindée", "porte blindée prix", "porte blindée A2P", "blindage porte", "bloc porte blindée"],
    content: `
## Porte blindée ou blindage de porte ?

Avant d'acheter, comprenez la différence :

### Blindage de porte existante

On renforce votre porte actuelle avec :
- Tôle d'acier collée/vissée
- Serrure multipoints
- Cornières anti-dégondage
- Barre de pivot

**Prix :** 590€ à 1500€ selon le niveau

### Bloc-porte blindée

On remplace entièrement votre porte par un bloc blindé comprenant :
- Vantail blindé (porte elle-même)
- Bâti renforcé (encadrement)
- Serrure multipoints intégrée
- Seuil de sécurité

**Prix :** 1490€ à 4000€ selon certification

## Les certifications A2P BP

| Niveau | Résistance | Usage |
|--------|------------|-------|
| A2P BP1 | 5 minutes | Appartement standard |
| A2P BP2 | 10 minutes | Maison, RDC |
| A2P BP3 | 15 minutes | Commerce, objets de valeur |

### Ce qui est testé

- Enfoncement
- Dégondage
- Perçage
- Tronçonnage
- Crochetage serrure

## Combien coûte une porte blindée ?

### Prix par niveau de certification

| Certification | Prix porte | Pose | Total |
|---------------|------------|------|-------|
| Non certifiée | 800€ - 1200€ | 300€ | 1100€ - 1500€ |
| A2P BP1 | 1200€ - 2000€ | 400€ | 1600€ - 2400€ |
| A2P BP2 | 2000€ - 3000€ | 500€ | 2500€ - 3500€ |
| A2P BP3 | 3000€ - 4500€ | 600€ | 3600€ - 5100€ |

### Ce qui fait varier le prix

- Dimensions de la porte
- Niveau de certification
- Finition (bois, alu, sur mesure)
- Serrure (3 points, 5 points, 7 points)
- Options (judas, entrebâilleur)

## Les meilleures marques

### Françaises

- **Fichet** : référence luxe, prix élevé
- **Picard** : bon rapport qualité/prix
- **Point Fort Fichet** : réseau installateurs

### Européennes

- **Tordjman** : entrée de gamme qualitative
- **Dierre** (Italie) : design et sécurité
- **Vachette** : serrures excellentes

## Quelle porte pour quelle situation ?

### Appartement (étages)

**Recommandation :** Blindage de porte ou BP1
**Budget :** 600€ - 2000€

### Maison individuelle

**Recommandation :** A2P BP1 ou BP2
**Budget :** 1500€ - 3000€

### Rez-de-chaussée / zone risquée

**Recommandation :** A2P BP2 minimum
**Budget :** 2500€ - 4000€

### Commerce

**Recommandation :** A2P BP2 ou BP3
**Budget :** 3000€ - 5000€

## Installation : ce qu'il faut savoir

### Durée d'installation

- Blindage porte existante : 2-3 heures
- Bloc-porte : 3-4 heures

### Copropriété

Vérifiez le règlement de copropriété. Souvent, la face extérieure doit rester identique aux autres portes.

### Après installation

- Conservez la facture pour l'assurance
- Gardez les clés de secours chez un proche
- Faites entretenir la serrure tous les 2 ans

## Conclusion

Une porte blindée est un investissement sécurité durable. Pour un particulier, l'A2P BP1 offre généralement un excellent rapport protection/prix.

📞 **Devis porte blindée ?** Appelez le 01 41 69 10 08 - Installation dès 1490€
    `
  },
  {
    slug: "cle-cassee-serrure-que-faire",
    title: "Clé cassée dans la serrure : que faire ?",
    excerpt: "Votre clé s'est cassée dans la serrure ? Découvrez comment l'extraire vous-même et quand appeler un serrurier.",
    metaDescription: "Clé cassée dans la serrure ? 5 méthodes pour l'extraire soi-même. Si ça échoue : prix serrurier (79€). Guide complet.",
    category: "serrurerie",
    readTime: 6,
    publishedAt: "2026-02-04",
    keywords: ["clé cassée", "clé cassée serrure", "extraire clé cassée", "clé coincée serrure", "bout de clé serrure"],
    content: `
## Clé cassée : les premiers réflexes

Votre clé vient de se casser dans la serrure. Pas de panique, voici ce qu'il faut faire.

### Ce qu'il NE faut PAS faire

🚫 **Évitez absolument :**
- Forcer avec l'autre morceau de clé
- Utiliser de la colle pour "recoller"
- Enfoncer le bout cassé plus profond
- Introduire des objets au hasard

### La bonne approche

1. Restez calme
2. Évaluez la situation (bout visible ou non ?)
3. Essayez les méthodes douces
4. Appelez un pro si ça ne marche pas

## 5 méthodes pour extraire une clé cassée

### Méthode 1 : La pince à épiler (ou brucelles)

**Fonctionne si :** Le bout de clé dépasse de la serrure

1. Prenez une pince à épiler fine
2. Attrapez fermement le bout de clé
3. Tirez doucement en ligne droite
4. Ne tournez pas !

### Méthode 2 : Le crochet fin

**Fonctionne si :** Le bout est légèrement visible

1. Prenez un trombone déplié ou une épingle
2. Insérez-le à côté du bout de clé
3. Essayez d'accrocher les dents de la clé
4. Tirez délicatement vers vous

### Méthode 3 : La lame de scie à métaux

**Fonctionne si :** Vous êtes bricoleur

1. Coupez un bout de lame de scie (5 cm)
2. Les dents vers l'extérieur
3. Insérez à côté de la clé cassée
4. Les dents vont accrocher le bout de clé
5. Tirez vers vous

### Méthode 4 : L'extracteur de clé

**Le plus efficace** si vous en avez un.

C'est un outil spécialisé avec des crochets. On l'insère, on tourne légèrement et on tire.

**Prix :** 10-20€ en magasin de bricolage

### Méthode 5 : Le lubrifiant

Parfois, un peu de WD-40 ou huile fine peut aider :
1. Pulvérisez légèrement
2. Attendez 2 minutes
3. Réessayez les méthodes ci-dessus

## Quand appeler un serrurier ?

### Faites appel à un pro si :

- Aucune méthode ne fonctionne
- Le bout est complètement enfoncé
- Vous avez peur d'abîmer la serrure
- Vous êtes pressé (urgence)

### Prix d'une extraction par un pro

| Situation | Prix |
|-----------|------|
| Extraction simple | 79€ |
| Extraction + remplacement cylindre | 120€ - 150€ |
| Extraction difficile (porte blindée) | 100€ - 150€ |

## Comment éviter que ça se reproduise ?

### Les causes d'une clé qui casse

- Clé usée ou fragilisée
- Serrure grippée (manque de lubrification)
- Forcer en tournant
- Clé de mauvaise qualité (copie basse gamme)

### Prévention

- Lubrifiez votre serrure 1 fois/an
- Changez vos clés si elles sont abîmées
- N'utilisez que des copies de qualité
- Ne forcez jamais !

## Conclusion

Une clé cassée n'est pas forcément une urgence coûteuse. Essayez d'abord les méthodes douces. Si ça échoue, un serrurier peut extraire le bout rapidement.

📞 **Clé cassée ?** Appelez le 01 41 69 10 08 - Extraction dès 79€
    `
  },
  {
    slug: "assurance-serrurier-prise-en-charge",
    title: "Assurance et serrurier : ce qui est pris en charge",
    excerpt: "Votre assurance peut-elle rembourser le serrurier ? Découvrez ce qui est couvert et comment faire une demande.",
    metaDescription: "Assurance et serrurier : prise en charge, remboursement, garanties. Cambriolage, porte claquée, assistance 24h. Ce que couvre votre assurance.",
    category: "serrurerie",
    readTime: 7,
    publishedAt: "2026-02-04",
    keywords: ["assurance serrurier", "serrurier pris en charge", "assurance cambriolage", "remboursement serrurier"],
    content: `
## Assurance habitation et serrurier : ce qu'il faut savoir

Beaucoup de Français ignorent que leur assurance peut couvrir tout ou partie des frais de serrurier. Voici ce qu'il faut savoir.

## Les garanties qui couvrent le serrurier

### 1. Garantie Vol / Cambriolage

**Ce qui est couvert :**
- Remplacement de la serrure forcée
- Réparation de la porte
- Mise en sécurité immédiate

**Conditions :**
- Dépôt de plainte obligatoire
- Photos des dégâts
- Facture du serrurier

### 2. Assistance 24h/24

Beaucoup de contrats incluent une **assistance domicile** :
- Perte de clés
- Porte claquée
- Serrure bloquée

**Ce qui est couvert :**
- Intervention serrurier (souvent plafonnée à 150-300€)
- Parfois les pièces (cylindre)

**Comment l'utiliser :**
1. Appelez le numéro d'assistance (sur votre carte)
2. L'assurance envoie un serrurier partenaire
3. Vous ne payez que le dépassement éventuel

### 3. Garantie Bris de glace

Si votre porte a une vitre cassée, cette garantie peut couvrir :
- Le remplacement de la vitre
- Parfois la réparation de la serrure si endommagée

## Ce qui N'EST PAS couvert

🚫 **Généralement exclu :**
- Usure normale de la serrure
- Perte de clés (sauf assistance)
- Remplacement volontaire (pour améliorer la sécurité)
- Serrurier non agréé (selon contrats)

## Comment faire une demande de prise en charge

### En cas de cambriolage

1. **Portez plainte** au commissariat (dans les 24h)
2. **Prenez des photos** des dégâts
3. **Gardez les pièces** remplacées (serrure, cylindre)
4. **Conservez la facture** détaillée du serrurier
5. **Déclarez le sinistre** à votre assurance (sous 5 jours)

### En cas de porte claquée (assistance)

1. **Appelez le numéro d'assistance** (24h/24)
2. L'assurance **mandate un serrurier**
3. Vous montrez votre **pièce d'identité + preuve de domicile**
4. Vous payez la **franchise ou le dépassement** éventuel

## Les documents à fournir

| Situation | Documents |
|-----------|-----------|
| Cambriolage | Dépôt de plainte, photos, facture, pièces |
| Assistance perte clés | Déclaration sur l'honneur, facture |
| Serrure bloquée | Facture, descriptif de l'intervention |

## Délais de remboursement

- **Assistance** : intervention immédiate, pas de remboursement (prise en charge directe)
- **Cambriolage** : remboursement sous 30 jours en général

## Conseils pour être bien couvert

### Vérifiez votre contrat

- Montant de la garantie assistance
- Plafond de remboursement serrurerie
- Exigences sur le type de serrure (A2P ?)

### Gardez vos factures

Conservez toujours les factures de :
- Installation de serrure
- Changement de cylindre
- Tout travail sur les portes

### Faites le point avec votre assureur

Appelez votre assurance pour connaître exactement vos garanties AVANT d'en avoir besoin.

## Chez Joël : factures conformes

Toutes nos interventions donnent lieu à une **facture détaillée** :
- Mentions légales obligatoires
- Détail des prestations
- Prix TTC
- N° SIRET

Cette facture est acceptée par toutes les assurances.

📞 **Besoin d'une intervention ?** Appelez le 01 41 69 10 08 - Facture assurance fournie
    `
  },
  {
    slug: "serrurier-paris-arrondissements",
    title: "Serrurier Paris : guide par arrondissement (1er au 20e)",
    excerpt: "Serrurier à Paris ? Découvrez les spécificités par arrondissement : délais, prix, types d'interventions les plus fréquentes.",
    metaDescription: "Serrurier Paris tous arrondissements : 1er au 20e. Délais (20 min), prix (dès 89€), interventions courantes. Guide complet.",
    category: "serrurerie",
    readTime: 10,
    publishedAt: "2026-02-04",
    keywords: ["serrurier paris", "serrurier paris 15", "serrurier paris 11", "serrurier paris 18", "serrurier arrondissement"],
    content: `
## Serrurier à Paris : les spécificités

Paris est une ville dense avec des besoins spécifiques en serrurerie. Voici ce qu'il faut savoir selon votre arrondissement.

## Délais d'intervention par zone

### Centre (1er au 4e)

**Délai moyen :** 15-20 minutes
**Particularités :**
- Beaucoup d'immeubles anciens (serrures à gorges)
- Portes d'époque à préserver
- Stationnement difficile pour les artisans

### Ouest (5e au 8e, 16e, 17e)

**Délai moyen :** 20-25 minutes
**Particularités :**
- Immeubles haussmanniens
- Portes blindées fréquentes
- Clientèle exigeante

### Nord-Est (9e, 10e, 11e, 18e, 19e, 20e)

**Délai moyen :** 20-30 minutes
**Particularités :**
- Mix logements anciens et récents
- Forte densité de population
- Beaucoup de copropriétés

### Sud (12e, 13e, 14e, 15e)

**Délai moyen :** 25-30 minutes
**Particularités :**
- Grands arrondissements
- Immeubles récents (15e, 13e)
- Logements sociaux

## Interventions les plus courantes par type d'immeuble

### Immeubles haussmanniens (1850-1914)

**Problèmes fréquents :**
- Serrures à gorges anciennes
- Portes palières en bois massif
- Poignées et plaques d'époque

**Notre conseil :** Préservez le cachet avec des serrures adaptées.

### Immeubles 1950-1980

**Problèmes fréquents :**
- Serrures 3 points standard
- Cylindres usés
- Portes en bois standard

**Notre conseil :** Passez à un cylindre haute sécurité A2P.

### Immeubles récents (2000+)

**Problèmes fréquents :**
- Portes blindées d'origine
- Badges et digicodes
- Serrures multipoints haut de gamme

**Notre conseil :** Faites appel à un serrurier spécialisé.

## Tarifs par arrondissement

Les prix sont généralement **identiques** dans tout Paris intra-muros.

| Intervention | Prix |
|-------------|------|
| Ouverture porte claquée | 89€ |
| Ouverture porte blindée | 150€ - 200€ |
| Changement cylindre | 120€ |
| Changement serrure 3 pts | 250€ |

**Attention :** Certains serruriers pratiquent des majorations "zone" non justifiées.

## Nos conseils par arrondissement

### 1er au 4e (Centre historique)

Si vous avez une serrure ancienne, faites-la entretenir plutôt que remplacer. Elles sont souvent irremplaçables à l'identique.

### 8e et 16e (Quartiers chics)

Méfiez-vous des prix gonflés. Le standing de l'immeuble ne justifie pas un prix supérieur.

### 10e, 11e, 18e, 19e, 20e (Quartiers populaires)

Zone où les arnaques sont les plus fréquentes. Vérifiez toujours les avis Google avant d'appeler.

### 15e (Le plus peuplé)

Grand arrondissement = parfois délais plus longs. Privilégiez les serruriers avec plusieurs équipes.

## Joël à Paris : couverture complète

Nous intervenons dans **tous les arrondissements** :
- Délai moyen : **20 minutes**
- Prix identique partout : **89€** ouverture simple
- Disponible **24h/24**

📞 **Serrurier Paris ?** Appelez le 01 41 69 10 08 - 20 min, 89€
    `
  },
  // ============================================
  // NOUVEAUX ARTICLES SEO PLOMBERIE (Ahrefs)
  // ============================================
  {
    slug: "tarif-plombier-wc-bouche",
    title: "Tarif plombier WC bouché : prix réels 2026",
    excerpt: "Combien coûte un débouchage de WC par un plombier ? Découvrez les vrais tarifs 2026 et évitez les arnaques.",
    metaDescription: "Tarif plombier WC bouché 2026 : prix réels de 79€ à 149€. Débouchage furet, hydrocurage. Évitez les arnaques, comparez les prix.",
    category: "plomberie",
    readTime: 6,
    publishedAt: "2026-02-05",
    keywords: ["tarif plombier wc bouché", "prix débouchage wc", "wc bouché prix", "combien coute débouchage wc"],
    content: `
## Tarif débouchage WC : les vrais prix 2026

Votre WC est bouché et vous vous demandez combien ça va coûter ? Voici les tarifs réels pratiqués par les plombiers en 2026.

### Grille tarifaire débouchage WC

| Type de débouchage | Prix moyen | Durée |
|-------------------|------------|-------|
| Débouchage simple (furet manuel) | 79€ - 99€ | 30 min |
| Débouchage au furet électrique | 99€ - 129€ | 45 min |
| Hydrocurage haute pression | 149€ - 199€ | 1h |
| Débouchage + remplacement mécanisme | 129€ - 179€ | 1h |

### Ce qui fait varier le prix

1. **Profondeur du bouchon** : plus il est loin, plus c'est cher
2. **Méthode utilisée** : furet manuel < furet électrique < hydrocurage
3. **Heure d'intervention** : nuit et week-end parfois majorés
4. **Urgence** : intervention dans l'heure = possible supplément

### Prix d'appel trompeurs : attention !

🚨 **Méfiez-vous si on vous annonce :**
- Débouchage à 29€ ou 39€ (irréaliste)
- "À partir de 19€" (piège à arnaques)

**Le vrai coût minimum** d'un débouchage professionnel est d'environ 79€ (déplacement + main d'œuvre + matériel).

### Que comprend le tarif ?

Chez un plombier sérieux, le prix inclut :
- Le déplacement
- Le diagnostic
- Le débouchage
- Le nettoyage après intervention
- La garantie sur l'intervention

### Majorations légitimes

**Majorations normales :**
- Nuit (21h-7h) : + 20 à 30%
- Dimanche/férié : + 20 à 30%

**Chez Joël :** Pas de majoration, même prix 24h/24.

### Comment éviter de payer trop cher ?

1. **Demandez un devis ferme** au téléphone
2. **Vérifiez les avis Google**
3. **Refusez les "diagnostics" payants**
4. **Exigez une facture détaillée**

### WC bouché : que faire avant le plombier ?

Essayez d'abord :
- La ventouse (technique classique)
- L'eau bouillante + liquide vaisselle
- Le furet manuel (si vous en avez un)

Si ça ne marche pas, appelez un pro.

📞 **WC bouchés ?** Appelez le 01 41 69 10 08 - Débouchage dès 79€
    `
  },
  {
    slug: "wc-bouche-que-faire",
    title: "WC bouché : 5 solutions avant d'appeler le plombier",
    excerpt: "WC bouchés ? Découvrez 5 méthodes efficaces pour déboucher vos toilettes vous-même avant de faire appel à un professionnel.",
    metaDescription: "WC bouché que faire ? 5 solutions maison : ventouse, eau chaude, furet, bicarbonate. Si ça échoue, plombier dès 79€. Guide complet.",
    category: "plomberie",
    readTime: 7,
    publishedAt: "2026-02-05",
    keywords: ["wc bouché", "wc bouché que faire", "déboucher wc", "toilettes bouchées", "wc bouché remede"],
    content: `
## WC bouché : les 5 solutions à essayer

Avant d'appeler un plombier, essayez ces méthodes. Elles fonctionnent dans 70% des cas de bouchons simples.

### Méthode 1 : La ventouse (classique mais efficace)

**Quand ça marche :** Bouchon proche, papier ou matières organiques

1. Remplissez la cuvette d'eau (pas trop)
2. Placez la ventouse sur l'évacuation
3. Faites des mouvements de va-et-vient (10-15 fois)
4. Tirez d'un coup sec
5. Répétez si nécessaire

**Astuce :** Une ventouse à soufflet (forme de cloche) est plus efficace.

### Méthode 2 : Eau chaude + liquide vaisselle

**Quand ça marche :** Bouchon gras ou savonneux

1. Versez 1/2 bouteille de liquide vaisselle
2. Attendez 10 minutes
3. Versez un seau d'eau très chaude (pas bouillante !)
4. Laissez agir 15-20 minutes
5. Tirez la chasse

**Attention :** N'utilisez jamais d'eau bouillante, elle peut fissurer la porcelaine.

### Méthode 3 : Bicarbonate + vinaigre

**Quand ça marche :** Bouchon organique, mauvaises odeurs

1. Versez 1 tasse de bicarbonate de soude
2. Ajoutez 1 tasse de vinaigre blanc
3. Ça mousse ! Laissez agir 30 minutes
4. Versez de l'eau chaude
5. Tirez la chasse

### Méthode 4 : Le furet manuel

**Quand ça marche :** Bouchon profond

1. Insérez le furet dans l'évacuation
2. Faites-le avancer en tournant la manivelle
3. Quand vous sentez le bouchon, insistez
4. Retirez le furet (avec les résidus)
5. Tirez la chasse pour vérifier

**Où acheter :** Magasin de bricolage, 15-30€

### Méthode 5 : Le déboucheur enzymatique

**Quand ça marche :** Bouchon organique, entretien préventif

Contrairement aux produits chimiques, les enzymes sont :
- Non corrosifs
- Écologiques
- Efficaces sur les bouchons organiques

**Utilisation :** Versez le soir, laissez agir toute la nuit.

## Ce qu'il ne faut SURTOUT PAS faire

🚫 **Évitez :**
- **Destop et produits chimiques** : corrosifs, dangereux, abîment les canalisations
- **Continuer à tirer la chasse** : risque de débordement
- **Utiliser un cintre métallique** : peut rayer la porcelaine
- **Forcer avec un bâton** : risque d'enfoncer le bouchon

## Quand appeler un plombier ?

Faites appel à un pro si :
- Aucune méthode ne fonctionne après 1 heure
- L'eau remonte dans d'autres évacuations
- Vous sentez une odeur d'égout inhabituelle
- Le bouchon revient fréquemment

### Prix d'un débouchage professionnel

| Intervention | Prix |
|-------------|------|
| Débouchage WC simple | 79€ |
| Débouchage + nettoyage canalisation | 129€ |
| Hydrocurage (gros bouchon) | 149€ |

📞 **WC toujours bouchés ?** Appelez le 01 41 69 10 08 - Intervention en 30 min
    `
  },
  {
    slug: "prix-intervention-plombier-urgence",
    title: "Prix intervention plombier urgence 2026 : tarifs réels",
    excerpt: "Plombier en urgence : combien ça coûte vraiment ? Tarifs 2026, majorations nuit/week-end, et conseils pour éviter les arnaques.",
    metaDescription: "Prix plombier urgence 2026 : tarifs de 89€ à 250€. Majorations nuit/WE, arnaques à éviter. Guide complet des prix réels.",
    category: "plomberie",
    readTime: 7,
    publishedAt: "2026-02-05",
    keywords: ["prix plombier urgence", "tarif plombier urgence", "plombier urgence prix", "dépannage plomberie prix"],
    content: `
## Prix plombier urgence : les vrais tarifs 2026

Une urgence plomberie n'attend pas. Mais combien ça coûte vraiment ? Voici les tarifs réels pratiqués.

### Grille tarifaire urgences plomberie

| Intervention | Prix jour | Prix nuit/WE |
|-------------|-----------|--------------|
| Fuite d'eau simple | 89€ - 119€ | 110€ - 150€ |
| Fuite sur canalisation | 129€ - 179€ | 160€ - 220€ |
| Débouchage WC | 79€ - 99€ | 99€ - 130€ |
| Débouchage canalisation | 99€ - 149€ | 130€ - 190€ |
| Dégât des eaux | 99€ - 179€ | 130€ - 220€ |
| Panne chauffe-eau | 99€ - 149€ | 130€ - 190€ |

### Les majorations sont-elles normales ?

**Majorations légitimes :**
- Nuit (21h - 7h) : + 25 à 40%
- Dimanche et jours fériés : + 25 à 40%
- Cumul nuit + dimanche : + 50% maximum

**Majorations abusives :**
- Doublement ou triplement du prix
- "Frais d'urgence" de 100€+
- "Déplacement nuit" à 150€

### Chez Joël : pas de majoration

Notre engagement : **même prix 24h/24, 7j/7**.

Une urgence à 3h du matin coûte le même prix qu'à 14h. Pourquoi ? Parce qu'une fuite ne choisit pas son heure.

### Comment éviter les arnaques en urgence ?

Même stressé, gardez vos réflexes :

1. **Demandez le prix total** au téléphone
2. **Refusez les prix "à partir de"** sans montant final
3. **Vérifiez les avis Google** (même rapidement)
4. **N'acceptez pas de travaux** non prévus sans devis
5. **Gardez une trace écrite** (SMS, email)

### Les signaux d'arnaque

🚨 **Fuyez si :**
- Prix annoncé de 29€ ou 49€ (irréaliste)
- Pas de devis avant intervention
- Paiement en liquide uniquement exigé
- Le plombier veut tout remplacer

### Que faire en attendant le plombier ?

**Pour une fuite :**
1. Coupez l'eau au compteur
2. Coupez l'électricité si l'eau touche des prises
3. Épongez pour limiter les dégâts

**Pour un WC bouché :**
1. Ne tirez plus la chasse
2. Mettez des serpillières autour

**Pour une panne de chauffage :**
1. Notez le code erreur affiché
2. Vérifiez le thermostat et le disjoncteur

### Garantie sur intervention d'urgence

Une intervention d'urgence doit être garantie comme une intervention normale :
- Garantie sur la main d'œuvre
- Garantie sur les pièces remplacées
- Facture détaillée fournie

📞 **Urgence plomberie ?** Appelez le 01 41 69 10 08 - Même prix 24h/24
    `
  },
  {
    slug: "fuite-chauffe-eau-danger-que-faire",
    title: "Fuite chauffe-eau : danger et que faire ?",
    excerpt: "Votre chauffe-eau fuit ? Découvrez si c'est dangereux, les causes possibles et comment réagir rapidement.",
    metaDescription: "Fuite chauffe-eau : est-ce dangereux ? Causes (groupe de sécurité, cuve percée), que faire, prix réparation. Guide complet urgence.",
    category: "plomberie",
    readTime: 8,
    publishedAt: "2026-02-05",
    keywords: ["fuite chauffe eau", "chauffe eau qui fuit", "fuite ballon eau chaude", "chauffe eau goutte"],
    content: `
## Fuite chauffe-eau : est-ce dangereux ?

Une fuite sur votre chauffe-eau peut être bénigne ou grave. Voici comment évaluer la situation.

### Fuite "normale" vs fuite dangereuse

**Fuite normale :**
- Quelques gouttes au groupe de sécurité (pendant la chauffe)
- C'est normal ! Le groupe évacue la surpression.

**Fuite anormale :**
- Eau qui coule en continu du groupe de sécurité
- Fuite à la base du chauffe-eau
- Flaque d'eau importante
- Traces de rouille

### Les causes de fuite

#### 1. Groupe de sécurité défaillant

**Symptômes :** Eau qui coule en continu (pas juste pendant la chauffe)

**Cause :** Le groupe de sécurité est usé et ne ferme plus correctement.

**Prix réparation :** 89€ - 129€ (pièce + main d'œuvre)

#### 2. Cuve percée

**Symptômes :** Fuite à la base, traces de rouille

**Cause :** Corrosion interne (anode usée, calcaire)

**Solution :** Remplacement du chauffe-eau obligatoire

**Prix :** 400€ - 1500€ selon capacité

#### 3. Joint défectueux

**Symptômes :** Fuite au niveau de la platine ou du thermostat

**Cause :** Joint usé ou mal posé

**Prix réparation :** 79€ - 119€

#### 4. Raccords desserrés

**Symptômes :** Fuite aux arrivées/sorties d'eau

**Cause :** Raccords mal serrés ou joints usés

**Prix réparation :** 59€ - 89€

### Que faire immédiatement ?

**Étape 1 : Évaluez le danger**
- L'eau touche-t-elle des prises électriques ? → Coupez le disjoncteur
- La fuite est-elle importante ? → Coupez l'eau froide du chauffe-eau

**Étape 2 : Localisez la fuite**
- Groupe de sécurité (soupape rouge)
- Base du ballon
- Raccords entrée/sortie
- Platine de résistance

**Étape 3 : Limitez les dégâts**
- Placez une bassine sous la fuite
- Épongez l'eau stagnante
- Protégez vos affaires

**Étape 4 : Appelez un plombier**
Si la fuite est continue ou provient de la cuve, faites intervenir un pro.

### Fuite groupe de sécurité : réparable

Le groupe de sécurité est une pièce d'usure. Son remplacement est :
- Rapide (30 minutes)
- Peu coûteux (89€ - 129€)
- Préventif (évite les surpressions)

### Cuve percée : remplacement obligatoire

Malheureusement, une cuve percée ne se répare pas. Il faut remplacer le chauffe-eau.

**Signes d'une cuve en fin de vie :**
- Fuite à la base
- Traces de rouille
- Eau rougeâtre au robinet
- Chauffe-eau de plus de 10-15 ans

### Combien coûte un remplacement ?

| Capacité | Prix ballon | Pose | Total |
|----------|-------------|------|-------|
| 100L | 250€ - 400€ | 150€ | 400€ - 550€ |
| 150L | 350€ - 550€ | 150€ | 500€ - 700€ |
| 200L | 450€ - 700€ | 180€ | 630€ - 880€ |
| 300L | 600€ - 900€ | 200€ | 800€ - 1100€ |

### Prévention : comment éviter les fuites ?

- **Entretien annuel** : vidange, détartrage, vérification anode
- **Changement groupe de sécurité** : tous les 5 ans
- **Remplacement anode** : quand usée à 75%

📞 **Chauffe-eau qui fuit ?** Appelez le 01 41 69 10 08 - Diagnostic dès 89€
    `
  },
  {
    slug: "degat-des-eaux-demarches-indemnisation",
    title: "Dégât des eaux : démarches et indemnisation assurance",
    excerpt: "Victime d'un dégât des eaux ? Découvrez les démarches à suivre, le constat amiable et comment obtenir votre indemnisation.",
    metaDescription: "Dégât des eaux : démarches complètes. Constat amiable, déclaration assurance, délais, indemnisation. Guide étape par étape.",
    category: "plomberie",
    readTime: 9,
    publishedAt: "2026-02-05",
    keywords: ["dégât des eaux", "degat des eaux assurance", "constat amiable dégât des eaux", "indemnisation dégât des eaux"],
    content: `
## Dégât des eaux : les démarches étape par étape

Un dégât des eaux peut vite devenir un cauchemar administratif. Voici le guide complet pour gérer la situation.

### Étape 1 : Limitez les dégâts (immédiat)

1. **Coupez l'eau** au compteur général
2. **Coupez l'électricité** si l'eau touche des installations électriques
3. **Épongez l'eau** pour limiter la propagation
4. **Protégez vos biens** (surélevez les meubles)
5. **Prévenez les voisins** concernés (dessus, dessous)

### Étape 2 : Identifiez la cause

La cause détermine qui est responsable :

| Origine | Responsable |
|---------|-------------|
| Votre logement (robinet, tuyau) | Vous |
| Logement du dessus | Votre voisin |
| Parties communes (colonnes) | Copropriété |
| Toiture / façade | Propriétaire / Copropriété |

### Étape 3 : Faites intervenir un plombier

Appelez un plombier pour :
1. **Stopper la fuite** (priorité)
2. **Identifier précisément l'origine**
3. **Réparer si possible**
4. **Fournir une facture** (importante pour l'assurance)

**Prix moyen intervention dégât des eaux :** 99€ - 179€

### Étape 4 : Remplissez le constat amiable

Le **constat amiable de dégât des eaux** est obligatoire. Il doit être rempli :
- Par vous (partie B)
- Par le responsable présumé (partie A)
- Ou par le syndic si parties communes

**Où le trouver ?**
- Votre assurance (en ligne ou papier)
- Le syndic de copropriété
- Téléchargeable sur le site de votre assureur

**Délai :** À remplir dans les 5 jours

### Étape 5 : Déclarez le sinistre

**Délai légal :** 5 jours ouvrés maximum

**Comment déclarer ?**
- En ligne sur le site de votre assurance
- Par courrier recommandé
- Par téléphone (suivi d'un écrit)

**Documents à fournir :**
- Constat amiable signé
- Photos des dégâts (avant/après)
- Facture du plombier
- Devis de remise en état
- Liste des biens endommagés

### Étape 6 : L'expertise

Pour les dégâts importants (> 1600€), l'assurance mande un expert :
- Il évalue les dégâts
- Il vérifie la cause
- Il estime le montant d'indemnisation

**Conseil :** Conservez les éléments endommagés jusqu'à l'expertise.

### Les délais d'indemnisation

| Étape | Délai |
|-------|-------|
| Déclaration du sinistre | 5 jours |
| Envoi du constat | 5 jours |
| Expertise (si nécessaire) | 1-3 semaines |
| Proposition d'indemnisation | 30-60 jours |
| Versement | 15 jours après accord |

### Ce qui est couvert par l'assurance

**Généralement pris en charge :**
- Réparation de la cause (plomberie)
- Remise en état des locaux (peinture, parquet)
- Remplacement des biens endommagés
- Frais de recherche de fuite

**Souvent non couvert :**
- Vétusté (abattement)
- Biens non déclarés
- Dégâts causés par négligence

### Cas particuliers

**Locataire vs Propriétaire :**
- Le locataire déclare à son assurance
- Le propriétaire est prévenu
- Les deux assurances peuvent intervenir

**Copropriété :**
- Le syndic doit être informé
- L'assurance de la copropriété peut intervenir
- Un constat spécifique peut être nécessaire

### Convention IRSI : ce qu'il faut savoir

La convention IRSI (Indemnisation et Recours des Sinistres Immeuble) simplifie les démarches :
- Votre assurance vous indemnise directement
- Elle se retourne ensuite contre le responsable
- Valable pour les sinistres < 5000€ HT

📞 **Dégât des eaux ?** Appelez le 01 41 69 10 08 - Facture assurance fournie
    `
  },
  {
    slug: "plombier-pas-cher-trouver-bon",
    title: "Plombier pas cher : comment trouver le bon ?",
    excerpt: "Comment trouver un plombier pas cher et fiable ? Nos conseils pour comparer les prix sans tomber dans les arnaques.",
    metaDescription: "Plombier pas cher : comment trouver un bon artisan sans se faire arnaquer. Prix réels, comparaison, aides. Guide pratique.",
    category: "plomberie",
    readTime: 6,
    publishedAt: "2026-02-05",
    keywords: ["plombier pas cher", "plombier pas cher paris", "plombier moins cher", "tarif plombier économique"],
    content: `
## Plombier pas cher : attention aux pièges

Vous cherchez un plombier pas cher ? C'est normal de vouloir économiser, mais attention aux arnaques qui peuvent vous coûter plus cher au final.

### Les vrais tarifs plombier en 2026

| Intervention | Prix minimum réaliste |
|-------------|----------------------|
| Remplacement robinet | 69€ |
| Débouchage WC | 79€ |
| Réparation fuite | 89€ |
| Débouchage canalisation | 99€ |
| Remplacement chasse d'eau | 89€ |

**En dessous de ces prix, méfiance !**

### Pourquoi les prix "trop bas" sont suspects

Un plombier a des coûts incompressibles :
- Déplacement (essence, temps)
- Assurance professionnelle
- Outillage professionnel
- Charges sociales

**Un "plombier à 29€" ne couvre pas ses frais.** Le piège : le prix augmente une fois sur place.

### Comment vraiment économiser ?

#### 1. Comparez plusieurs devis

Pour les travaux non urgents, demandez 2-3 devis. C'est gratuit et ça vous donne une idée des prix du marché.

#### 2. Regroupez les interventions

Si vous avez plusieurs petits travaux :
- Un robinet qui goutte
- Une chasse d'eau qui coule
- Un joint à changer

Faites tout en une seule intervention : un seul déplacement = moins cher.

#### 3. Achetez les pièces vous-même

Pour certains travaux simples, vous pouvez acheter :
- Le robinet
- Le mécanisme de chasse
- Le siphon

Et payer uniquement la main d'œuvre.

#### 4. Choisissez le bon moment

Les plombiers sont moins demandés :
- En milieu de semaine (mardi, mercredi)
- En dehors des heures de pointe (10h-12h, 14h-16h)
- Hors période hivernale

Vous aurez plus de choix et potentiellement de meilleurs tarifs.

### Les aides pour les travaux de plomberie

#### MaPrimeRénov'

Pour le remplacement de chauffe-eau par un modèle performant (thermodynamique, solaire).

#### TVA réduite (10%)

Pour les travaux de réparation et amélioration dans un logement de plus de 2 ans.

#### Aides locales

Certaines mairies ou départements proposent des aides pour les personnes modestes.

### Les pièges à éviter

🚨 **Méfiez-vous de :**

- **Prix d'appel très bas** (29€, 39€) → arnaque quasi-certaine
- **"Devis gratuit sur place"** → souvent suivi de pression pour signer
- **Pas d'entreprise identifiable** → pas de recours possible
- **Paiement en espèces uniquement** → pas de trace, pas de garantie

### Comment vérifier un plombier ?

✅ **Vérifications de base :**

1. **Numéro SIRET** : vérifiez sur societe.com
2. **Avis Google** : regardez la moyenne ET les commentaires
3. **Devis écrit** : obligatoire avant intervention
4. **Assurance décennale** : demandez l'attestation

### Joël : le bon rapport qualité/prix

Chez Joël, notre engagement :
- Prix fixes et transparents
- Pas de frais cachés
- Artisans vérifiés et formés
- Satisfaction garantie ou remboursé

📞 **Besoin d'un plombier honnête ?** Appelez le 01 41 69 10 08
    `
  },
  {
    slug: "fuite-eau-avant-compteur-qui-paye",
    title: "Fuite d'eau avant compteur : qui paye ?",
    excerpt: "Fuite sur la canalisation avant le compteur d'eau : qui est responsable ? Propriétaire, locataire ou service des eaux ?",
    metaDescription: "Fuite eau avant compteur : qui paye ? Responsabilités propriétaire, locataire, service des eaux. Démarches et remboursement. Guide complet.",
    category: "plomberie",
    readTime: 7,
    publishedAt: "2026-02-05",
    keywords: ["fuite avant compteur", "fuite eau avant compteur qui paye", "responsabilité fuite eau", "canalisation avant compteur"],
    content: `
## Fuite avant ou après compteur : la différence cruciale

La position de la fuite par rapport au compteur détermine qui paye les réparations ET la surconsommation d'eau.

### Schéma de l'installation

\`\`\`
Réseau public → Vanne de branchement → Compteur → Votre installation
              ← AVANT compteur →      ← APRÈS compteur →
\`\`\`

### Qui est responsable de quoi ?

| Zone | Responsable | Qui paye |
|------|-------------|----------|
| Du réseau au compteur | Service des eaux | Service des eaux |
| Après le compteur | Propriétaire | Propriétaire (ou locataire selon bail) |

### Fuite AVANT le compteur

**Responsable :** Le service des eaux de votre commune

**Ce qui est pris en charge :**
- La réparation de la canalisation
- La main d'œuvre
- Les éventuels dégâts causés

**Ce que vous devez faire :**
1. Contacter le service des eaux de votre commune
2. Signaler la fuite (adresse, description)
3. Ils envoient une équipe pour réparer

**Délai d'intervention :** Généralement 24-48h

### Fuite APRÈS le compteur

**Responsable :** Le propriétaire du logement

**Ce qui est à votre charge :**
- La réparation par un plombier
- La surconsommation d'eau (mais voir ci-dessous)

**Qui paye vraiment ?**
- **Propriétaire occupant** : vous
- **Propriétaire bailleur** : vous (les canalisations sont à votre charge)
- **Locataire** : le propriétaire (sauf si c'est une négligence du locataire)

### Et la facture d'eau en cas de fuite ?

Bonne nouvelle : la loi Warsmann vous protège !

**Conditions pour être remboursé :**
- Fuite après compteur
- Sur canalisation (pas robinet ou WC)
- Consommation anormale détectée par le service des eaux ou par vous
- Réparation effectuée par un professionnel

**Ce qui est remboursé :**
Tout ce qui dépasse le double de votre consommation habituelle.

**Exemple :**
- Consommation normale : 100m³/an
- Consommation avec fuite : 400m³
- Remboursé : 400 - (100 x 2) = 200m³

**Démarche :**
1. Faites réparer par un plombier
2. Gardez la facture
3. Envoyez à votre service des eaux dans le mois suivant la réparation
4. Demandez l'écrêtement de votre facture

### Comment détecter une fuite avant compteur ?

**Signes révélateurs :**
- Tache humide sur la chaussée ou le trottoir
- Herbe plus verte à un endroit
- Bruit d'eau qui coule en permanence
- Pression anormalement faible chez vous

**Test simple (fuite après compteur) :**
1. Fermez tous les robinets
2. Relevez le compteur
3. Attendez 2 heures sans utiliser d'eau
4. Re-relevez le compteur
5. S'il a tourné = fuite !

### Cas particulier : la copropriété

En copropriété :
- **Parties privatives (après compteur divisionnaire)** : propriétaire du lot
- **Parties communes (colonnes montantes)** : copropriété
- **Branchement général avant compteur collectif** : service des eaux

### Que faire en cas de fuite ?

**Fuite avant compteur :**
1. Appelez le service des eaux (numéro d'urgence 24h/24)
2. Ils interviendront rapidement

**Fuite après compteur :**
1. Coupez l'eau au compteur
2. Appelez un plombier
3. Gardez la facture
4. Demandez le remboursement à votre service des eaux

📞 **Fuite d'eau ?** Appelez le 01 41 69 10 08 - Attestation pour service des eaux fournie
    `
  },
  {
    slug: "deboucher-canalisation-sans-plombier",
    title: "Déboucher une canalisation soi-même : 6 méthodes",
    excerpt: "Canalisation bouchée ? Découvrez 6 méthodes efficaces pour déboucher vous-même avant d'appeler un plombier.",
    metaDescription: "Déboucher canalisation soi-même : 6 méthodes efficaces. Ventouse, furet, bicarbonate, nettoyeur HP. Guide complet avec vidéos.",
    category: "plomberie",
    readTime: 8,
    publishedAt: "2026-02-05",
    keywords: ["déboucher canalisation", "canalisation bouchée", "deboucher tuyau", "deboucher evacuation"],
    content: `
## Canalisation bouchée : 6 méthodes pour déboucher soi-même

Avant d'appeler un plombier, essayez ces techniques. Elles fonctionnent dans 60-70% des cas de bouchons courants.

### Méthode 1 : La ventouse (classique et efficace)

**Idéal pour :** Évier, lavabo, baignoire

**Comment faire :**
1. Bouchez le trop-plein (avec un chiffon mouillé)
2. Remplissez d'eau (5 cm au-dessus de la bonde)
3. Placez la ventouse sur l'évacuation
4. Faites des mouvements de va-et-vient énergiques
5. Tirez d'un coup sec
6. Répétez 10-15 fois

**Astuce :** Enduisez le bord de la ventouse de vaseline pour une meilleure étanchéité.

### Méthode 2 : Le furet manuel

**Idéal pour :** Bouchons profonds (1-5 mètres)

**Comment faire :**
1. Retirez le siphon (si accessible)
2. Insérez le furet dans la canalisation
3. Tournez la manivelle en avançant
4. Quand vous sentez une résistance, insistez
5. Reculez et avancez pour casser le bouchon
6. Retirez le furet et rincez abondamment

**Où acheter :** Magasin de bricolage, 20-40€

### Méthode 3 : Bicarbonate + vinaigre + eau bouillante

**Idéal pour :** Bouchons gras, savonneux

**Comment faire :**
1. Versez 1/2 tasse de bicarbonate de soude
2. Ajoutez 1/2 tasse de sel (optionnel)
3. Versez 1 tasse de vinaigre blanc
4. Bouchez et laissez agir 30 minutes
5. Versez 1 litre d'eau bouillante
6. Rincez à l'eau chaude

**Précaution :** Ne mélangez JAMAIS avec des produits chimiques !

### Méthode 4 : Le nettoyeur haute pression

**Idéal pour :** Canalisations extérieures, gros bouchons

**Comment faire :**
1. Louez ou achetez un kit débouchage HP
2. Insérez la buse dans la canalisation
3. Mettez en marche progressivement
4. La pression de l'eau casse le bouchon
5. Continuez jusqu'à écoulement normal

**Location :** 30-50€/jour

### Méthode 5 : Le déboucheur à pompe (ou pompe à pression)

**Idéal pour :** Bouchons résistants à la ventouse

**Comment faire :**
1. Remplissez le réservoir d'eau
2. Placez l'embout sur l'évacuation
3. Pompez pour créer la pression
4. Libérez d'un coup

**Avantage :** Plus puissant qu'une ventouse classique
**Prix :** 15-30€

### Méthode 6 : Le démontage du siphon

**Idéal pour :** Bouchons dans le siphon (cheveux, objets)

**Comment faire :**
1. Placez une bassine sous le siphon
2. Dévissez les bagues (à la main ou avec une pince)
3. Retirez le siphon
4. Nettoyez l'intérieur (brosse, eau)
5. Remontez avec les joints en place
6. Vérifiez l'étanchéité

### Ce qu'il ne faut SURTOUT PAS faire

🚫 **À éviter absolument :**

- **Produits chimiques (Destop, etc.)** : corrosifs, dangereux, polluants
- **Acide chlorhydrique** : détruit les canalisations PVC
- **Soude caustique** : brûlures graves possibles
- **Mélanger plusieurs produits** : réactions chimiques dangereuses

### Quand appeler un plombier ?

Faites appel à un pro si :
- Aucune méthode ne fonctionne après 1-2 heures
- L'eau remonte par d'autres évacuations
- Vous sentez des odeurs d'égout
- Le bouchon est récurrent (problème structurel)
- La canalisation est enterrée ou inaccessible

### Prix d'un débouchage professionnel

| Intervention | Prix |
|-------------|------|
| Débouchage au furet | 99€ |
| Hydrocurage | 149€ - 199€ |
| Inspection caméra | 149€ |
| Débouchage + inspection | 179€ |

### Prévention : éviter les bouchons

- **Cuisine** : ne jetez pas de graisses dans l'évier
- **Salle de bain** : utilisez une grille attrape-cheveux
- **Entretien** : versez de l'eau bouillante 1x/semaine

📞 **Canalisation toujours bouchée ?** Appelez le 01 41 69 10 08 - Débouchage dès 99€
    `
  },
  // ============================================
  // NOUVEAUX ARTICLES - Scaling Plomberie
  // ============================================
  {
    slug: "evier-bouche-solutions",
    title: "Évier bouché : 5 solutions efficaces pour le déboucher",
    excerpt: "Votre évier est bouché ? Découvrez les méthodes simples et efficaces pour déboucher votre évier avant d'appeler un plombier.",
    metaDescription: "Évier bouché ? 5 solutions efficaces : ventouse, bicarbonate, furet, siphon. Guide pratique pour déboucher votre évier cuisine ou salle de bain.",
    category: "plomberie",
    readTime: 6,
    publishedAt: "2026-02-05",
    keywords: ["évier bouché", "déboucher évier", "évier cuisine bouché", "évier ne s'écoule pas", "bouchon évier"],
    content: `
## Évier bouché : les causes fréquentes

Un évier qui ne s'écoule plus est un problème courant. Avant de paniquer, identifions les causes principales.

### Pourquoi votre évier est bouché ?

**En cuisine :**
- Accumulation de graisses et huiles
- Restes alimentaires
- Marc de café (contrairement aux idées reçues, il bouche !)
- Calcaire dans les canalisations

**En salle de bain :**
- Cheveux et poils
- Savon et dentifrice
- Petits objets tombés (bouchons, bijoux)

## 5 solutions pour déboucher votre évier

### Solution 1 : L'eau bouillante

**Efficace pour :** Bouchons de graisse légers

1. Faites bouillir 2 litres d'eau
2. Versez lentement dans l'évier
3. Attendez 5 minutes
4. Recommencez si nécessaire

**Attention :** Ne pas utiliser sur des canalisations PVC anciennes (risque de déformation).

### Solution 2 : Bicarbonate + vinaigre

**Efficace pour :** Bouchons organiques

1. Versez 3 cuillères à soupe de bicarbonate dans la bonde
2. Ajoutez un verre de vinaigre blanc
3. Laissez agir 20-30 minutes (réaction effervescente)
4. Rincez à l'eau chaude

**Astuce :** Ajoutez du gros sel pour un effet décapant.

### Solution 3 : La ventouse

**Efficace pour :** Bouchons proches de la bonde

1. Bouchez le trop-plein avec un chiffon humide
2. Remplissez l'évier de 5 cm d'eau
3. Placez la ventouse sur la bonde
4. Effectuez des mouvements de pompage énergiques
5. Retirez d'un coup sec

### Solution 4 : Le furet manuel

**Efficace pour :** Bouchons plus profonds

1. Insérez le furet dans la bonde
2. Poussez jusqu'à sentir une résistance
3. Tournez la manivelle pour accrocher le bouchon
4. Tirez pour extraire ou poussez pour désagréger

**Prix :** 10-20€ en magasin de bricolage

### Solution 5 : Nettoyer le siphon

**Efficace pour :** Bouchons dans le siphon

1. Placez une bassine sous le siphon
2. Dévissez le siphon à la main
3. Videz et nettoyez l'intérieur
4. Remontez en vérifiant les joints

**Avantage :** Permet aussi de récupérer des objets tombés.

## Quand appeler un plombier ?

Faites appel à un professionnel si :
- Les méthodes maison ne fonctionnent pas
- Le bouchon est récurrent
- Plusieurs évacuations sont bouchées
- Vous sentez des odeurs d'égout

📞 **Évier toujours bouché ?** Appelez le 01 41 69 10 08 - Débouchage dès 79€
    `
  },
  {
    slug: "chasse-eau-qui-fuit-reparer",
    title: "Chasse d'eau qui fuit : comment la réparer soi-même ?",
    excerpt: "Votre chasse d'eau coule en permanence ? Découvrez comment diagnostiquer et réparer vous-même les problèmes courants.",
    metaDescription: "Chasse d'eau qui fuit ? Diagnostic et réparation : joint clapet, flotteur, mécanisme. Guide complet pour réparer votre WC sans plombier.",
    category: "plomberie",
    readTime: 7,
    publishedAt: "2026-02-05",
    keywords: ["chasse eau qui fuit", "réparer chasse eau", "chasse eau coule", "mécanisme wc", "joint chasse eau"],
    content: `
## Chasse d'eau qui fuit : pourquoi et comment réparer ?

Une chasse d'eau qui fuit peut gaspiller jusqu'à 100 litres d'eau par jour ! Voici comment diagnostiquer et réparer le problème.

### Les 3 causes principales d'une chasse qui fuit

**1. Le joint de clapet usé**
- Symptôme : L'eau coule en filet dans la cuvette
- Cause : Le joint en caoutchouc est durci ou calcifié
- Solution : Remplacer le joint (2-5€)

**2. Le flotteur mal réglé ou défaillant**
- Symptôme : L'eau coule par le trop-plein
- Cause : Flotteur trop haut ou percé
- Solution : Régler ou remplacer le flotteur

**3. Le mécanisme complet HS**
- Symptôme : Plusieurs problèmes combinés
- Cause : Mécanisme vieux de plus de 15 ans
- Solution : Remplacer le mécanisme complet (15-40€)

## Réparer une chasse d'eau étape par étape

### Étape 1 : Couper l'eau

1. Fermez le robinet d'arrêt (sous ou derrière le WC)
2. Tirez la chasse pour vider le réservoir

### Étape 2 : Accéder au mécanisme

1. Retirez le couvercle du réservoir
2. Dévissez le bouton poussoir (tournez à gauche)
3. Soulevez le couvercle

### Étape 3 : Diagnostiquer

**Test du colorant :**
1. Mettez quelques gouttes de colorant alimentaire dans le réservoir
2. Attendez 30 minutes sans tirer la chasse
3. Si l'eau de la cuvette est colorée → joint de clapet HS

**Test du flotteur :**
1. Soulevez le flotteur à la main
2. Si l'eau s'arrête de couler → réglage ou remplacement du flotteur

### Étape 4 : Réparer

**Remplacer le joint de clapet :**
1. Retirez le mécanisme (tournez à gauche d'un quart de tour)
2. Enlevez l'ancien joint
3. Nettoyez le siège
4. Posez le nouveau joint
5. Remontez le mécanisme

**Régler le flotteur :**
1. Abaissez le flotteur de 1-2 cm
2. Serrez la vis de réglage
3. Vérifiez que l'eau s'arrête 2 cm sous le trop-plein

## Quand remplacer le mécanisme complet ?

Optez pour un remplacement complet si :
- Le mécanisme a plus de 15 ans
- Plusieurs pièces sont défaillantes
- Les réparations n'ont pas fonctionné
- Vous voulez passer à un mécanisme économiseur d'eau

**Prix d'un mécanisme :**
- Entrée de gamme : 15-25€
- Milieu de gamme (Geberit) : 30-50€
- Haut de gamme (double chasse) : 50-80€

📞 **Chasse d'eau récalcitrante ?** Appelez le 01 41 69 10 08 - Réparation dès 69€
    `
  },
  {
    slug: "groupe-securite-chauffe-eau-fuite",
    title: "Groupe de sécurité qui fuit : causes et solutions",
    excerpt: "Votre groupe de sécurité coule en permanence ? Découvrez quand c'est normal, quand c'est un problème, et comment le résoudre.",
    metaDescription: "Groupe de sécurité chauffe-eau qui fuit ? Normal ou problème ? Causes, diagnostic et solutions. Quand le remplacer ? Guide complet.",
    category: "plomberie",
    readTime: 6,
    publishedAt: "2026-02-05",
    keywords: ["groupe sécurité fuit", "groupe sécurité chauffe-eau", "fuite cumulus", "remplacement groupe sécurité"],
    content: `
## Groupe de sécurité : fuite normale ou problème ?

Le groupe de sécurité est une pièce essentielle de votre chauffe-eau. Il régule la pression et évacue l'excès d'eau pendant la chauffe. Mais quand s'inquiéter d'une fuite ?

### Fuite normale vs anormale

**C'est NORMAL si :**
- Le groupe goutte pendant la chauffe (quelques gouttes)
- L'eau s'écoule dans le siphon (jusqu'à 3L par chauffe)
- Le groupe a été purgé récemment

**C'est un PROBLÈME si :**
- Le groupe coule en permanence (même hors chauffe)
- L'eau coule en filet continu
- Vous entendez un sifflement
- La pression d'eau a baissé

### Les causes d'un groupe de sécurité qui fuit trop

**1. Pression d'eau trop élevée**
- Cause : Pression réseau > 4 bars
- Solution : Installer un réducteur de pression

**2. Groupe entartré**
- Cause : Eau calcaire, groupe jamais purgé
- Solution : Purger ou remplacer le groupe

**3. Groupe défectueux**
- Cause : Usure normale (5-7 ans)
- Solution : Remplacer le groupe

**4. Vase d'expansion défaillant** (si installé)
- Cause : Membrane percée
- Solution : Remplacer le vase

### Comment purger le groupe de sécurité ?

La purge régulière (1x/mois) prolonge la durée de vie du groupe.

1. Placez un récipient sous le groupe
2. Tournez la molette de purge d'un quart de tour
3. Laissez couler l'eau quelques secondes
4. Refermez la molette

**Attention :** L'eau peut être très chaude !

### Quand remplacer le groupe de sécurité ?

Remplacez-le si :
- Il fuit en permanence malgré les purges
- Il a plus de 5-7 ans
- La molette de purge est bloquée
- Il siffle ou fait du bruit

**Prix d'un groupe de sécurité :**
- Groupe standard : 15-30€
- Groupe avec siphon intégré : 30-50€
- Pose par un plombier : 60-90€ (main d'œuvre)

### Étapes du remplacement (pour bricoleurs avertis)

1. Coupez l'eau froide du chauffe-eau
2. Coupez l'alimentation électrique
3. Vidangez le chauffe-eau (ou posez un bouchon)
4. Dévissez l'ancien groupe
5. Enroulez du téflon sur le nouveau
6. Vissez le nouveau groupe
7. Rétablissez l'eau et vérifiez l'étanchéité

📞 **Groupe de sécurité à remplacer ?** Appelez le 01 41 69 10 08 - Remplacement dès 89€
    `
  },
];

// Helper functions
export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}

export function getBlogArticlesByCategory(category: BlogArticle["category"]): BlogArticle[] {
  return blogArticles.filter((article) => article.category === category);
}

export function getLatestBlogArticles(limit: number = 5): BlogArticle[] {
  return [...blogArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
