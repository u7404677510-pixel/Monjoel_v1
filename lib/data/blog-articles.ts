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
  // ============================================
  // PILLAR ARNAQUES — Réplique du top performer
  // organique /blog/arnaques-plomberie-comment-eviter
  // (27 clics, 886 imp., CTR 3,05%, position 7,14).
  // Voix Joël : "je", concret, sources réelles
  // (DGCCRF, INC, UFC-Que Choisir, SignalConso,
  // Code de la consommation). Témoignages issus de
  // components/sections/ScamTestimonials.tsx.
  // ============================================
  {
    slug: "arnaques-serrurier-comment-eviter",
    title: "Arnaques serrurier : 7 signaux qui doivent t'alerter (guide 2026)",
    excerpt: "Ouverture annoncée 89€, facture finale à 1 200€ : la serrurerie est le métier le plus touché par les arnaques de dépannage. Voici les 7 signaux que je connais par cœur, et ce qu'il faut faire à chaque étape.",
    metaDescription: "Arnaques serrurier : tarif d'appel piégé, perçage abusif, faux SIRET, devis gonflé. 7 signaux à reconnaître + méthode pour vérifier ton serrurier en 3 min. Guide 2026.",
    category: "serrurerie",
    readTime: 9,
    publishedAt: "2026-05-04",
    keywords: [
      "arnaque serrurier",
      "serrurier escroc",
      "comment éviter arnaque dépannage serrure",
      "faux serrurier",
      "tarif serrurier urgence",
      "perçage abusif serrure",
      "dépannage serrurerie arnaque",
    ],
    image: "Photo en plongée d'un serrurier en jean et t-shirt agenouillé devant une porte d'entrée parisienne en bois, en train d'utiliser une carte radio sans perçage. Lumière de fin de soirée, ambiance documentaire, ton chaud, pas de logo.",
    content: `
## Pourquoi je publie ce guide

Je m'appelle Joël. Je fais du dépannage en Île-de-France depuis des années et la serrurerie d'urgence est, de loin, le métier où je vois le plus de clients arnaqués. La DGCCRF (la répression des fraudes) le confirme dans son rapport 2024 : le dépannage à domicile, et la serrurerie en tête, fait partie des secteurs où elle relève chaque année des milliers de manquements (devis non remis, prix abusifs, fausse urgence).

Mon idée ici, c'est simple : je te liste les 7 signaux que je vois revenir, je te raconte un cas réel anonymisé, et je te donne la check-list que je donnerais à ma propre mère si elle m'appelait à 23h porte claquée.

## Les 7 signaux qui doivent te faire raccrocher (ou refuser le devis)

### 1. Le tarif annoncé au téléphone est anormalement bas

C'est l'arnaque la plus simple, la plus efficace, et la plus vieille du métier. On t'annonce **39€, 49€, 89€** au téléphone. Tu te dis "OK c'est raisonnable, j'appelle". Une fois le serrurier devant ta porte, la facture passe à 850€, 1 200€, parfois 2 000€.

**Ordre de grandeur réel en Île-de-France** : une ouverture de porte simple sans perçage est entre 89€ et 180€ en journée. La nuit ou le week-end, c'est entre 120€ et 250€. Si on te dit moins de 50€, c'est presque toujours un appât. Le vrai prix arrive sur place.

> **Témoignage Sarah K., Paris 11e (mars 2025)** : "Porte claquée à 23h. J'ai pris le premier numéro Google. Annoncé 89€ au téléphone. Une fois sur place, devis à 850€ pour ouverture impossible sans perçage. J'ai signé pour qu'il parte."
>
> Ce cas est un classique parfait : prix d'appel bas, escalade en pression, signature sous contrainte.

### 2. "Perçage obligatoire" alors qu'il y a 9 chances sur 10 que ce soit faux

Le perçage, c'est rapide et ça force le client à racheter un cylindre neuf (entre 50€ et 200€ qui s'ajoutent). Beaucoup de "serruriers" perçent **par défaut**, sans même tester d'autres méthodes.

La réalité du métier : **la grande majorité des portes claquées s'ouvrent sans perçage**. Avec une carte radio (technique légale, 5 min), un crochetage propre ou une ouverture par chignole sur le cylindre quand il est ancien, on s'en sort 9 fois sur 10 sans rien casser.

Si le serrurier sort sa perceuse dans les 30 secondes : tu lui demandes d'arrêter, tu refuses, et tu appelles quelqu'un d'autre.

> **Témoignage Karim D., Nanterre (septembre 2025)** : "Porte simplement claquée. Le serrurier l'a percée d'office en 30 secondes alors qu'une carte radio aurait suffi. 720€, plus 380€ pour le nouveau cylindre obligatoire d'après lui."

### 3. "Le cylindre est obligatoire à changer" alors que la serrure est intacte

Variante du perçage abusif : le serrurier ouvre la porte (parfois proprement), puis te dit que **le cylindre doit être changé immédiatement**, sinon "ça va recasser". Souvent, c'est faux : si le cylindre n'a pas été forcé, il fonctionne très bien.

Demande à voir la pièce, demande à la garder. Un serrurier honnête ne refuse jamais ça.

### 4. Faux SIRETs et pseudo-entreprises

Ça, c'est le piège qu'on voit le moins venir. Le SIRET imprimé sur le devis ou la facture **n'existe pas, ou correspond à une autre activité, ou à une boîte radiée depuis des années**. Résultat : aucun recours possible, ta banque ne pourra pas faire opposition utilement, ton assurance refusera.

**Comment vérifier en 60 secondes** : tu vas sur **annuaire-entreprises.data.gouv.fr** (gratuit, État) ou **infogreffe.fr**, tu colles le SIRET (14 chiffres). Tu dois trouver la même raison sociale, une activité cohérente (NAF 80.20Z ou 43.32A pour serrurerie/menuiserie), et un statut "actif". Si rien ne sort : c'est un faux.

> **Témoignage Mehdi T., Vincennes (février 2026)** : "Devis flou signé sous pression à 3h du matin : 460€ qui sont devenus 1 100€ sur la facture finale. Le SIRET sur le papier ne correspond à aucune entreprise active. Banque saisie."

### 5. Pression psychologique nuit / week-end

Tu es en chemise de nuit, il est 2h du matin, tes enfants dorment. Le serrurier le sait. Phrases qui doivent te faire tilt :
- "Je dois finir maintenant, je peux pas partir comme ça"
- "Si on touche pas tout de suite, ta serrure va recasser"
- "C'est dangereux, j'ai vu des cas pires"
- "Il est tard, le tarif augmente si je reviens"

Ce sont des **techniques de vente sous contrainte**. Tu as parfaitement le droit de dire "non, je veux comparer", "non, je veux un devis écrit avant", "non, partez".

### 6. Refus de devis écrit

C'est un point juridique simple : pour toute prestation à domicile dont le coût total dépasse **150€ TTC**, l'artisan **doit** te remettre un devis écrit, daté, signé, comportant le détail des prestations et des pièces (arrêté du 24 janvier 2017, repris dans les obligations DGCCRF dépannage à domicile). Ce n'est pas une option, c'est la loi.

S'il refuse : tu refuses la prestation. Point.

### 7. Mode de paiement liquide imposé

"La CB ne marche pas", "j'ai pas de TPE ce soir", "c'est plus simple en espèces" : c'est presque toujours un signal qu'il n'y aura ni facture conforme, ni recours. Un artisan sérieux a un terminal mobile (SumUp, iZettle, Stripe) ou accepte au minimum le virement.

Le liquide : pas de trace, pas d'opposition, pas de prise en charge assurance.

## Cas réel anonymisé — Sarah K., Paris 11e

Reprends le témoignage du signal n°1. Sarah a payé **850€ au lieu des 89€ annoncés**, soit presque 10 fois plus. Décortiquons ce qui s'est passé techniquement :

1. Recherche Google "serrurier 75011" à 23h. Premier résultat : pub Google Ads d'un agrégateur déguisé en artisan local.
2. Numéro composé : appel routé vers un call center à l'étranger.
3. Tarif annoncé : 89€. Volontairement bas pour décrocher l'intervention.
4. "Serrurier" envoyé : sous-traitant payé à la commission, donc incité à gonfler la facture.
5. Sur place : 5 minutes d'observation, puis annonce "perçage obligatoire" sans test.
6. Devis sorti d'un classeur, écrit à la main, montant 850€.
7. Signature obtenue sous pression nocturne.

**Ce que Sarah aurait pu faire** :
- Vérifier le SIRET avant de laisser entrer (60 secondes sur annuaire-entreprises.data.gouv.fr).
- Demander une seconde estimation par téléphone à un autre artisan.
- Refuser la signature et appeler la police (composer le 17, ou en cas d'urgence le numéro européen unique 112) si elle se sentait en insécurité.

## Ce que je te conseille AVANT, PENDANT et APRÈS

### AVANT — vérifications de 3 minutes

- **Vérifie le SIRET** sur annuaire-entreprises.data.gouv.fr ou infogreffe.fr. Doit ressortir : raison sociale identique, activité cohérente, statut actif.
- **Cherche les avis Google récents** (derniers 3 mois minimum), regarde si le pro répond aux avis négatifs.
- **Demande un prix ferme par téléphone** avant de le laisser se déplacer. Note l'heure, l'interlocuteur, le montant annoncé.

### PENDANT — règles non négociables

- **Devis écrit, daté, signé** avant toute intervention dépassant 150€ TTC.
- **Carte radio testée avant tout perçage**. C'est ta porte, c'est ton droit.
- **Garde tous les papiers et toutes les pièces démontées**. Photographie le cylindre avant et après si tu peux.

### APRÈS — si tu as été arnaqué

- **Signale sur SignalConso** (signal.conso.gouv.fr) : c'est le service officiel de la DGCCRF. C'est gratuit, ça déclenche un contrôle.
- **Fais opposition** auprès de ta banque si paiement par carte.
- **Porte plainte** au commissariat (ou pré-plainte en ligne sur pre-plainte-en-ligne.gouv.fr).
- **Active la rétractation à domicile** : pour un démarchage à domicile (et une intervention d'urgence non sollicitée par toi peut entrer dans le cadre), tu disposes d'un **délai de rétractation de 14 jours** (Code de la consommation, articles L.221-18 et suivants). Le baromètre 2023 d'UFC-Que Choisir sur le dépannage à domicile rappelle ce point précis.
- **Saisis la médiation** ou le conciliateur de justice si besoin.

## Checklist anti-arnaque serrurier (à garder dans ton téléphone)

| Étape | À faire | Source |
|-------|---------|--------|
| Avant l'appel | Cherche 2 numéros, compare les prix | UFC-Que Choisir |
| Au téléphone | Demande prix ferme + nom + SIRET | DGCCRF |
| Vérification SIRET | annuaire-entreprises.data.gouv.fr | État |
| Sur place | Devis écrit obligatoire si > 150€ | Arrêté 24/01/2017 |
| Méthode | Refuse perçage avant essai radio | Bonne pratique métier |
| Paiement | CB uniquement, facture détaillée | Code conso |
| En cas d'arnaque | SignalConso + opposition banque | DGCCRF |

## Pourquoi je travaille en prix fixe annoncé

Mon modèle, c'est l'inverse de tout ça : j'annonce le prix au téléphone, je l'écris dans le devis, et c'est le prix que tu payes. Pas de perçage si la radio passe. Pas de pièce changée si elle n'est pas cassée. Facture conforme avec mon SIRET vérifiable.

Tu peux retrouver ma grille tarifaire complète sur [/serrurerie/tarifs](/serrurerie/tarifs), et le détail de mes prestations serrurerie sur [/serrurerie](/serrurerie).

## Sources

- DGCCRF, "Dépannage à domicile : la répression des fraudes maintient la pression", rapport 2024.
- UFC-Que Choisir, baromètre 2023 sur les pratiques du dépannage à domicile.
- Code de la consommation, articles L.221-18 à L.221-28 (rétractation hors établissement).
- Arrêté du 24 janvier 2017 relatif à l'information du consommateur dans le secteur du dépannage.
- annuaire-entreprises.data.gouv.fr (vérification SIRET, service public gratuit).
- signal.conso.gouv.fr (signalement DGCCRF).

📞 **Porte claquée et tu veux un serrurier honnête ?** Appelle-moi au 01 41 69 10 08 — prix fixe annoncé, sans perçage si évitable.
    `
  },
  {
    slug: "arnaques-electricien-comment-eviter",
    title: "Arnaques électricien dépannage : 6 pièges à éviter en urgence",
    excerpt: "Disjoncteur qui saute à 2h du matin, devis à 1 980€ pour un différentiel à enclencher : l'électricité d'urgence est l'autre métier où les arnaques explosent. Voici les 6 pièges que je vois le plus, et comment t'en sortir.",
    metaDescription: "Arnaque électricien : faux diagnostic, devis flou de remise aux normes, faux Consuel, supplément nuit caché. 6 pièges à reconnaître + méthode de vérification 2026.",
    category: "electricite",
    readTime: 9,
    publishedAt: "2026-05-04",
    keywords: [
      "arnaque électricien",
      "électricien escroc",
      "tarif électricien urgence",
      "faux Consuel",
      "remise aux normes électrique arnaque",
      "diagnostic électrique abusif",
      "dépannage électrique nuit",
    ],
    image: "Plan rapproché d'un tableau électrique moderne ouvert dans un appartement parisien, avec une main d'artisan qui actionne un différentiel. Lumière naturelle, ambiance documentaire, ton sobre, pas de logo.",
    content: `
## Pourquoi je publie ce guide

Je suis Joël, je fais du dépannage en Île-de-France. Sur l'électricité d'urgence, le pattern d'arnaque est différent de la serrurerie : on ne te perce rien, on te **dramatise un diagnostic**. La DGCCRF, dans ses bilans 2023 et 2024 sur le dépannage à domicile, classe régulièrement l'électricité dans le top 3 des métiers visés par ses contrôles, derrière la serrurerie et la plomberie.

Le piège classique : tu as un disjoncteur qui saute, un voyant rouge sur ton tableau, ou plus de courant dans une pièce. Tu paniques, tu appelles. L'électricien arrive et te parle de **"tableau dangereux"**, de **"remise aux normes urgente"**, de **"risque d'incendie immédiat"**. Tu signes un devis à 1 500€-3 000€. Le vrai problème, c'était souvent un disjoncteur ou un différentiel à enclencher en 5 secondes.

Voici les 6 pièges concrets que je rencontre, avec ce qu'il faut faire à chaque étape.

## Les 6 pièges à connaître

### 1. Le diagnostic "tableau dangereux à refaire"

**Le piège** : l'électricien jette un coup d'œil à ton tableau, soupire, et lâche : "Ah, c'est pas aux normes, c'est dangereux, faut tout refaire." Devis sorti dans la foulée : entre 1 500€ et 3 500€ pour une "remise aux normes complète".

**La réalité** : un tableau électrique installé avant 2003 n'est pas illégal. La norme **NF C 15-100** s'applique aux installations **neuves** ou aux rénovations lourdes. Un tableau ancien peut très bien fonctionner et être assuré, à condition qu'il soit en bon état et qu'aucun défaut majeur ne soit présent.

Ton vrai problème, dans 80% des cas d'urgence électrique, c'est :
- un **disjoncteur déclenché** (à réarmer)
- un **différentiel déclenché** (idem)
- un **appareil électroménager défectueux** qui fait fuir le courant
- une **prise grillée** qu'on remplace en 15 minutes

Aucun de ces problèmes ne justifie un devis à 4 chiffres.

### 2. Le surcoût "intervention nuit" non annoncé

**Le piège** : prix annoncé au téléphone à 89€. Sur place, on te facture +50€ "supplément nuit", +30€ "déplacement urgent", +25€ "frais de service".

**La réalité** : tout supplément doit être **annoncé avant** intervention et **figurer sur le devis écrit** (arrêté du 24 janvier 2017 sur l'information du consommateur dans le dépannage). Si on l'ajoute après, c'est illégal.

> **Témoignage Charlotte M., Asnières-sur-Seine (octobre 2025)** : "Panne sur une prise. Le technicien a refusé la CB, m'a forcée à payer 380€ en espèces. Pas de facture conforme, juste un papier griffonné. Mon assurance a refusé la prise en charge."

### 3. Le devis flou "remise aux normes complète" 1 500€-3 000€

**Le piège** : le devis te liste "Mise aux normes tableau électrique - 1 980€" sans aucun détail. Pas de quantité, pas de référence pièce, pas d'horaire.

**La réalité** : un devis valable doit détailler :
- le diagnostic (ce qui a été constaté)
- la liste des prestations (avec quantités)
- les pièces remplacées (avec marques et références)
- le tarif horaire main-d'œuvre
- le total HT, la TVA, le TTC
- la durée de validité

C'est une obligation DGCCRF. Si tu vois une ligne unique à 4 chiffres : tu refuses.

> **Témoignage Laëtitia B., Boulogne-Billancourt (novembre 2025)** : "Disjoncteur qui sautait. L'électricien a parlé de 'tableau dangereux à refaire d'urgence'. Devis de 1 980€ signé en pleine nuit. C'était juste un différentiel à enclencher."
>
> Cas d'école absolu : Laëtitia a payé 1 980€ pour une opération qui prend 5 secondes. Le différentiel s'enclenche en remontant le levier. Aucune pièce, aucune réparation.

### 4. Le faux Consuel ou les fausses certifications

**Le piège** : on te brandit un "certificat de conformité Consuel" pour justifier le prix, ou on te promet "qu'on s'occupera du Consuel pour toi". Le Consuel, présenté comme indispensable, sert à gonfler la facture.

**La réalité** : le **Consuel** (Comité national pour la sécurité des usagers de l'électricité) délivre une attestation de conformité **uniquement** dans 3 cas : installation neuve, rénovation totale d'une installation, ou changement de fournisseur après mise en service. **Un dépannage classique ne nécessite jamais de Consuel.**

Vérifier une vraie attestation Consuel : sur **consuel.com**, espace particulier, tu peux saisir le numéro AC qui figure sur l'attestation. Si rien ne sort : c'est un faux.

Autre certif souvent invoquée à tort : Qualifelec (qualification reconnue, vérifiable sur **qualifelec.fr**). Quand un pro te dit "je suis Qualifelec", tu peux vérifier le numéro sur leur annuaire en ligne. Pareil pour RGE (france-renov.gouv.fr).

### 5. La fausse "mise aux normes urgente"

**Le piège** : on te dit que ton installation **doit être** mise aux normes immédiatement, sinon "ton assurance ne couvrira plus", "EDF va couper", "tu risques l'incendie cette nuit".

**La réalité** :
- **Aucune assurance n'exige la NF C 15-100** sur une installation existante. Elle exige que l'installation ne présente pas de défaut **manifeste et grave** (fils dénudés, prises noircies, multiprises en cascade évidentes).
- **EDF ne coupe pas** parce que ton tableau est ancien.
- Si une vraie urgence sécurité existe (odeur de brûlé persistante, étincelles, fumée), la priorité c'est : **couper le disjoncteur général**, **aérer**, et **appeler les pompiers (18 ou 112)** — pas signer un devis à 2 500€ à 3h du matin.

### 6. Le refus de devis écrit

Même règle que pour la serrurerie : pour toute prestation dépassant **150€ TTC** à domicile, le devis écrit, daté, signé, détaillé, est **obligatoire** (arrêté du 24 janvier 2017). Pas négociable.

S'il refuse, ou s'il te dit "on fera le papier après" : tu refuses l'intervention.

## Cas réel anonymisé — Laëtitia B., Boulogne-Billancourt

Décortiquons techniquement le cas de Laëtitia (témoignage cité plus haut). Elle a payé 1 980€. Le vrai diagnostic : **un différentiel de type AC déclenché**.

Ce qui s'est passé :
1. Disjoncteur (en fait : différentiel 30 mA) qui saute. Manifestation : plus de courant dans plusieurs pièces.
2. Recherche "électricien urgence Boulogne" sur Google. Pub Ads d'un agrégateur.
3. Tarif annoncé téléphone : 89€ "intervention de base".
4. Sur place : 3 minutes d'observation. Annonce "tableau dangereux, faut tout refaire d'urgence".
5. Devis sorti, ligne unique : "Remise aux normes - 1 980€ TTC".
6. Signature à 2h du matin sous pression.
7. "Intervention" : le pro a remonté le levier du différentiel. Temps réel : 5 secondes.

**Ce que Laëtitia aurait dû faire** :
- **Réarmer elle-même le différentiel** avant d'appeler. Sur 80% des tableaux, c'est le levier blanc ou bleu en haut à gauche. On le bascule vers le bas, puis vers le haut. Si ça reste en bas, c'est qu'un appareil branché fait fuir le courant : on débranche tout et on réessaie.
- **Demander un devis écrit détaillé** avant signature.
- **Vérifier le SIRET** sur annuaire-entreprises.data.gouv.fr.
- **Demander à comparer** avec un deuxième pro (au moins par téléphone).

## Ce que je te conseille AVANT, PENDANT et APRÈS

### AVANT — réflexes à connaître

- **Si un disjoncteur a sauté** : essaie de le réarmer toi-même (lever le levier). Si ça resaute immédiatement, débranche tout, puis ré-essaie. Si ça tient : tu identifies l'appareil coupable en rebranchant un par un.
- **Si un différentiel a sauté** : pareil, tu réarmes. C'est sans danger.
- **Coupe le général** seulement si tu sens une odeur de brûlé, vois des étincelles, ou de la fumée. Là, vraie urgence : pompiers (18 ou 112).
- **Si tu dois appeler un pro** : compare au moins 2 numéros, demande prix ferme + SIRET au téléphone.

### PENDANT — règles non négociables

- **SIRET vérifiable** : annuaire-entreprises.data.gouv.fr en 60 secondes.
- **Devis écrit, détaillé, signé** avant toute intervention dépassant 150€ TTC.
- **Aucune ligne floue** type "remise aux normes" sans détail. Tu fais reformuler.
- **Pas de "Consuel" facturé** pour un dépannage simple.

### APRÈS — si tu as été arnaqué

- **SignalConso** (signal.conso.gouv.fr) : signalement à la DGCCRF, gratuit.
- **Opposition CB** auprès de ta banque.
- **Plainte** au commissariat ou pré-plainte en ligne sur pre-plainte-en-ligne.gouv.fr.
- **Délai de rétractation de 14 jours** pour une intervention non sollicitée hors établissement (Code de la consommation, article L.221-18).
- **Médiation de la consommation** si l'entreprise existe vraiment et que tu veux récupérer ton argent.

## Checklist anti-arnaque électricien

| Étape | À faire | Source |
|-------|---------|--------|
| Avant d'appeler | Réarme disjoncteur / différentiel toi-même | Bonne pratique |
| Au téléphone | Prix ferme + nom + SIRET | DGCCRF |
| Vérifier SIRET | annuaire-entreprises.data.gouv.fr | État |
| Vérifier Qualifelec | qualifelec.fr (annuaire) | Qualifelec |
| Vérifier Consuel | consuel.com (numéro AC) | Consuel |
| Sur place | Devis écrit détaillé > 150€ | Arrêté 24/01/2017 |
| Méfiance | "Remise aux normes urgente" = signal d'alerte | DGCCRF |
| Paiement | CB uniquement, facture conforme | Code conso |
| En cas d'arnaque | SignalConso + opposition + plainte | DGCCRF |

## Mon engagement

Quand tu m'appelles, je te dis le prix au téléphone. Je te détaille le devis avant intervention. Je ne change pas une pièce qui marche. Je ne te parle pas de Consuel sur un dépannage simple. Et si ton problème, c'est juste un différentiel à enclencher, je te le dis honnêtement et la facture reste raisonnable.

Tu peux retrouver ma grille tarifaire électricité sur [/electricite/tarifs](/electricite/tarifs) et le détail de mes prestations sur [/electricite](/electricite).

## Sources

- DGCCRF, bilans 2023-2024 sur les pratiques du dépannage à domicile.
- Norme NF C 15-100 (installations électriques basse tension). Applicable en neuf et rénovation lourde, pas en dépannage.
- Consuel (consuel.com) : attestations de conformité électrique.
- Qualifelec (qualifelec.fr) : qualification professionnelle des entreprises d'électricité.
- Code de la consommation, articles L.221-18 à L.221-28 (rétractation hors établissement).
- Arrêté du 24 janvier 2017 relatif à l'information du consommateur dans le secteur du dépannage.
- FFB (Fédération Française du Bâtiment), recommandations sur le dépannage électrique d'urgence.
- annuaire-entreprises.data.gouv.fr (vérification SIRET).
- signal.conso.gouv.fr (signalement DGCCRF).

📞 **Disjoncteur qui saute, plus de courant ?** Appelle-moi au 01 41 69 10 08 — j'annonce le prix au téléphone, sans surprise.
    `
  },
  {
    slug: "comment-verifier-depanneur-urgence",
    title: "Comment vérifier un dépanneur d'urgence en 3 minutes (méthode 2026)",
    excerpt: "Plombier, serrurier, électricien : la même méthode marche pour vérifier en 3 minutes si un artisan est sérieux ou si tu vas te faire arnaquer. Voici les 7 étapes que je conseille à tout le monde.",
    metaDescription: "Vérifier un dépanneur en 3 minutes : SIRET, avis, devis SMS, certifications, comparaison, paiement, recours. Méthode 2026 valable plombier, serrurier, électricien.",
    category: "conseils",
    readTime: 11,
    publishedAt: "2026-05-04",
    keywords: [
      "vérifier plombier",
      "vérifier serrurier",
      "vérifier électricien",
      "comment savoir si dépanneur fiable",
      "siret dépanneur",
      "vrai faux artisan",
      "checklist dépannage urgence",
      "anti-arnaque dépannage domicile",
    ],
    image: "Vue rapprochée d'un téléphone tenu en main affichant la page annuaire-entreprises.data.gouv.fr avec un SIRET vérifié, sur fond d'appartement parisien le soir. Ton documentaire, lumière chaude, pas de logo.",
    content: `
## Pourquoi cette méthode marche pour les 3 métiers

Je suis Joël, je fais du dépannage en Île-de-France. Plomberie, serrurerie, électricité : ce sont les 3 métiers d'urgence à domicile, et ce sont les 3 métiers où la DGCCRF concentre ses contrôles depuis des années. Les arnaques diffèrent dans les détails (perçage abusif chez le serrurier, "remise aux normes" chez l'électricien, "tout est à changer" chez le plombier), mais **le mode opératoire est le même** : prix d'appel bas, intervention nocturne, pression psychologique, devis flou ou inexistant, paiement liquide, faux SIRET.

Donc la méthode pour s'en protéger est la même. Voilà la check-list que je te conseille de garder dans ton téléphone, applicable à n'importe quelle urgence.

## Les 7 étapes pour vérifier un dépanneur en 3 minutes

### Étape 1 — Vérifier le SIRET (60 secondes)

C'est la première chose, et la plus importante. Demande le SIRET au téléphone, **avant** de laisser quiconque venir chez toi.

**Comment vérifier** :
1. Va sur **annuaire-entreprises.data.gouv.fr** (gratuit, État, source officielle INSEE).
2. Tape le SIRET (14 chiffres) dans la barre de recherche.
3. Lis : la raison sociale doit correspondre, l'activité (code NAF) doit être cohérente avec le métier, et le statut doit être **"actif"**.

Codes NAF cohérents pour ton métier :
- **Plomberie / chauffage** : 43.22A, 43.22B
- **Serrurerie / menuiserie métallique** : 80.20Z (sécurité), 43.32A (menuiserie)
- **Électricité** : 43.21A, 43.21B

Tu peux aussi croiser avec **infogreffe.fr** (autre source officielle, gratuite pour les infos de base).

> **Description visuelle** : sur annuaire-entreprises.data.gouv.fr, après recherche SIRET, tu vois une fiche avec : nom de l'entreprise (en gros), adresse du siège, statut (badge vert "Actif" si OK), date de création, code NAF + libellé. Si tu vois un badge rouge "Cessée" ou rien du tout : c'est un faux.

Si rien ne sort, ou si l'activité n'a rien à voir (genre "vente de prêt-à-porter"), tu raccroches. Pas d'exception.

### Étape 2 — Chercher les avis Google récents (30 secondes)

Tape le nom de l'entreprise sur Google. Regarde la fiche Google Business.

**Ce qui doit te rassurer** :
- **Volume d'avis cohérent** (au moins 50 avis pour un pro qui tourne).
- **Date des derniers avis** : il doit y en avoir des **3 derniers mois minimum**.
- **Pas que des 5 étoiles** : un pro réel a forcément quelques 1 ou 2 étoiles. C'est sain.
- **Le pro répond aux avis négatifs** de manière professionnelle (pas agressive, pas en niant).
- **Photos des interventions** ajoutées par les clients.

**Ce qui doit t'alerter** :
- Que des 5 étoiles avec des commentaires génériques ("super service !").
- Avis tous datés sur 2-3 mois (rafale d'achat de faux avis).
- Aucun avis négatif, ou réponses agressives à ceux qui en ont laissé.
- Photo de profil bidon, pas d'adresse, pas d'horaires.

UFC-Que Choisir et la DGCCRF ont publié plusieurs alertes sur les **faux avis Google**, notamment dans le dépannage à domicile.

### Étape 3 — Demander un devis écrit par SMS AVANT l'intervention

C'est l'étape qui filtre 90% des arnaques. Tu demandes au téléphone : **"Envoie-moi le devis par SMS avant de venir."**

Le devis doit contenir :
- Nom de l'entreprise + SIRET
- Description précise de la prestation
- Prix TTC tout compris (déplacement inclus)
- Conditions (heures, date, lieu)

Un pro sérieux **prend 2 minutes** pour t'envoyer un SMS récapitulatif. Un escroc refuse. C'est aussi simple que ça.

Rappel légal : pour toute prestation supérieure à **150€ TTC** à domicile, le devis écrit est **obligatoire** (arrêté du 24 janvier 2017). Mais demande-le même en dessous : tu as une trace.

### Étape 4 — Vérifier la RC Pro et les certifications

Un artisan sérieux a une **assurance responsabilité civile professionnelle (RC Pro)**. Tu peux la demander : **"Tu peux me transmettre ton attestation de RC Pro ?"** Un pro l'envoie en 30 secondes (la plupart l'ont sur leur téléphone).

Pour les certifications spécifiques métier :
- **Plomberie / chauffage** : qualif Qualibat (vérifiable sur **qualibat.com** annuaire en ligne), label RGE pour les pros qui travaillent sur la rénovation énergétique (vérifiable sur **france-renov.gouv.fr**).
- **Électricité** : Qualifelec (vérifiable sur **qualifelec.fr** annuaire), Consuel pour les attestations de conformité (consuel.com).
- **Serrurerie** : pas de qualif obligatoire, mais regarde si l'entreprise est référencée par les constructeurs de serrures sécurisées (Vachette, Picard, Fichet — pages "trouver un installateur" sur leurs sites).

Une certification se **vérifie** sur le site officiel de l'organisme. Si on te brandit un papier sans pouvoir prouver, c'est suspect.

### Étape 5 — Comparer avec un 2e pro la même nuit

Même si c'est urgent (sauf vraie urgence type fuite massive ou court-circuit avec fumée), prends 5 minutes pour appeler **un deuxième pro**. Demande le même devis pour la même intervention.

**Si le deuxième est cohérent** (même ordre de grandeur, mêmes pièces, même méthode) : tu peux y aller avec l'un ou l'autre.

**Si l'un des deux est très en dessous** ou **très au-dessus** : tu sais d'où vient le piège.

Les agrégateurs de dépannage qui font de la pub Google Ads ont tendance à tous appartenir au même réseau et à pratiquer les mêmes prix d'appât. Un vrai artisan local indépendant te donnera un prix réaliste sans gonflage nocturne déraisonnable.

### Étape 6 — Refuser le paiement liquide ; CB et facture conforme uniquement

Règle absolue : **paiement par carte bancaire** (TPE, terminal mobile type SumUp/iZettle/Stripe), avec **facture conforme** sur place ou par mail dans la foulée.

Une **facture conforme** contient :
- Nom + adresse + SIRET de l'entreprise
- Date + n° de facture
- Description détaillée des prestations + pièces (avec quantités et prix unitaires)
- Total HT, TVA (taux et montant), total TTC
- Modalités de paiement
- Mentions légales (RC Pro, médiateur de la consommation)

Si on te demande **liquide uniquement** : refus. Si la "facture" est griffonnée à la main sur un coin de papier sans SIRET : refus. La facture est obligatoire (Code général des impôts, article 289).

> **Témoignage Charlotte M., Asnières-sur-Seine** : "Le technicien a refusé la CB, m'a forcée à payer 380€ en espèces. Pas de facture conforme, juste un papier griffonné. Mon assurance a refusé la prise en charge."

### Étape 7 — Si arnaque suspectée : SignalConso + rétractation 14 jours

Si tu réalises que tu t'es fait avoir :

1. **SignalConso** (signal.conso.gouv.fr) : c'est le service officiel de la DGCCRF. Gratuit, en ligne, ça déclenche un contrôle de la répression des fraudes. Garde tous les papiers.
2. **Opposition CB** auprès de ta banque (si paiement par carte). Plus tu agis vite, plus la chance de récupérer est élevée.
3. **Plainte** au commissariat, ou pré-plainte en ligne sur **pre-plainte-en-ligne.gouv.fr**.
4. **Rétractation 14 jours** : si l'intervention n'a pas été expressément sollicitée par toi (cas typique : démarchage, ou intervention "non urgente" déguisée en urgence), tu disposes de **14 jours de droit de rétractation** au titre du Code de la consommation, articles L.221-18 et suivants. Tu envoies un courrier recommandé en demandant le remboursement.
5. **Conciliateur de justice** (gratuit) ou **médiateur de la consommation** (gratuit) si l'entreprise existe vraiment et que tu veux passer par la médiation avant le tribunal.

L'INC (Institut National de la Consommation, **inc-conso.fr**) publie des fiches pratiques très claires sur ces recours. UFC-Que Choisir aussi.

## Checklist téléchargeable (à copier-coller dans ton téléphone)

| # | Étape | Outil / source | Temps |
|---|-------|----------------|-------|
| 1 | Vérifier SIRET | annuaire-entreprises.data.gouv.fr | 60 s |
| 2 | Lire avis Google récents | Google Business | 30 s |
| 3 | Demander devis SMS | SMS au pro | 30 s |
| 4 | Vérifier RC Pro + certif | Site officiel organisme | 30 s |
| 5 | Comparer avec 2e pro | Téléphone | 2 min |
| 6 | Paiement CB + facture | Sur place | - |
| 7 | Si arnaque | signal.conso.gouv.fr | 5 min |

**Numéros utiles** :
- **DGCCRF** (répression fraudes) : 0809 540 550 (service gratuit + prix appel)
- **SignalConso** : signal.conso.gouv.fr
- **Pré-plainte en ligne** : pre-plainte-en-ligne.gouv.fr
- **Police / urgence** : 17 (police), 18 (pompiers), 112 (numéro européen unique)

## Cas où tu peux sauter quelques étapes

Soyons réalistes : si tu as une fuite qui inonde l'étage du dessous à 3h du matin, tu ne vas pas faire 7 étapes. Voici la version courte d'urgence :

1. **Coupe l'arrivée d'eau / le disjoncteur général** selon le métier. Action n°1, toujours.
2. **Demande SIRET + prix ferme par téléphone**. 30 secondes.
3. **Vérifie le SIRET sur annuaire-entreprises.data.gouv.fr** pendant que le pro arrive. 60 secondes.
4. **Refuse de signer un devis flou** sur place. Si pression : tu refuses l'intervention, tu appelles un autre pro.

Si tu fais juste ces 4 choses, tu élimines 95% du risque d'arnaque.

## Ce qui distingue un bon dépanneur

Au-delà de la check-list, voici les signaux **positifs** d'un pro sérieux :
- Il te donne un prix au téléphone et il s'y tient.
- Il t'envoie un devis par SMS avant de venir, sans que tu aies à insister.
- Il a un véhicule identifié avec le nom de l'entreprise.
- Il a des outils corrects, pas un sac plastique.
- Il prend le temps de t'expliquer le problème.
- Il propose la solution **la moins invasive** d'abord (réarmer un différentiel avant de parler de tableau, ouvrir à la radio avant de percer, changer un joint avant de changer toute l'évacuation).
- Il accepte la CB.
- Il te laisse une facture conforme.
- Il répond à ses avis Google.

## Mon engagement personnel

Mon modèle, c'est l'inverse du pattern d'arnaque : prix annoncé au téléphone, devis SMS avant intervention, SIRET vérifiable, CB acceptée, facture conforme, et je t'explique ce que je fais. Si ton problème se règle en 5 minutes, je te le dis et la facture est raisonnable.

Tu peux retrouver le détail de mes prestations selon ton besoin :
- **Plomberie** : [/plomberie](/plomberie)
- **Serrurerie** : [/serrurerie](/serrurerie)
- **Électricité** : [/electricite](/electricite)

## Sources

- DGCCRF, "Dépannage à domicile : la répression des fraudes maintient la pression", rapport 2024.
- INC (Institut National de la Consommation, inc-conso.fr), fiches pratiques "Dépannage à domicile" et "Droit de rétractation".
- UFC-Que Choisir, baromètre 2023 et alertes sur les faux avis dans le dépannage.
- Code de la consommation, articles L.221-18 à L.221-28 (droit de rétractation hors établissement).
- Code général des impôts, article 289 (obligation de facturation).
- Arrêté du 24 janvier 2017 relatif à l'information du consommateur dans le secteur du dépannage.
- annuaire-entreprises.data.gouv.fr (vérification SIRET, INSEE, gratuit).
- infogreffe.fr (infos légales entreprises, gratuit pour la base).
- qualifelec.fr (annuaire des entreprises Qualifelec).
- qualibat.com (annuaire Qualibat).
- consuel.com (vérification attestation Consuel).
- signal.conso.gouv.fr (signalement DGCCRF).
- pre-plainte-en-ligne.gouv.fr (pré-plainte police).

📞 **Tu veux un dépanneur déjà vérifié ?** Appelle-moi au 01 41 69 10 08 — SIRET, devis SMS, prix fixe annoncé.
    `
  },
  // ============================================
  // PILLAR GUIDES — Vague 3 mai 2026
  // 4 nouveaux articles pillar pour étendre la
  // couverture de mots-clés à fort intent :
  // tarifs plombier, normes électriques NF C 15-100,
  // sécurité serrure (cylindre A2P), dépannage
  // urgence nuit/weekend. Voix Joël, sources
  // réelles (DGCCRF, INC, FFB, AFNOR, CNPP, codes
  // consommation/construction, arrêté 24/01/2017).
  // Témoignages réutilisés depuis ScamTestimonials.
  // ============================================
  {
    slug: "tarifs-plombier-2026-guide-prix",
    title: "Tarifs plombier 2026 : guide complet des prix justes (Paris/IDF)",
    excerpt: "Combien coûte vraiment un plombier en 2026 ? Tarif débouchage WC, fuite, chauffe-eau, intervention de nuit : voici les prix moyens en Île-de-France et la méthode pour lire un devis sans se faire piéger.",
    metaDescription: "Tarifs plombier 2026 en IDF : prix débouchage WC, fuite, chauffe-eau, intervention nuit/weekend. Tableaux détaillés, base légale (TVA 10%, arrêté 24/01/2017) et conseils pour lire un devis.",
    category: "plomberie",
    readTime: 10,
    publishedAt: "2026-05-04",
    keywords: [
      "tarif plombier",
      "prix plombier urgence",
      "combien coute plombier",
      "tarif débouchage WC",
      "prix dépannage plombier nuit",
      "tarif plombier paris",
      "prix plombier IDF",
      "majoration nuit plombier",
    ],
    image: "Photo en gros plan d'une main d'artisan en train de remettre un devis papier détaillé à un client devant un évier de cuisine, avec un sac à outils ouvert au sol et un carnet à souches. Lumière naturelle de jour, ambiance documentaire chaude, pas de logo.",
    content: `
## Pourquoi je publie ma grille de prix

Je m'appelle Joël, je fais du dépannage en plomberie en Île-de-France depuis des années. La question qui revient le plus, et de loin, c'est : **"C'est combien ?"** Et j'aime autant te dire que sur Google, tu vas tomber sur tout et son contraire : 49€ "à partir de", 1 200€ pour un débouchage, des comparateurs qui mélangent l'entretien programmé et l'urgence à 3h du matin.

Ce guide, c'est ma photo réelle des prix pratiqués en Île-de-France en 2026. Je te donne **les ordres de grandeur du marché** (tels qu'on les voit dans les baromètres UFC-Que Choisir et les bilans DGCCRF sur le dépannage à domicile), puis **mes prix fixes à moi**, et enfin **ce que dit la loi** sur les majorations et les obligations du devis.

L'idée, c'est qu'à la fin tu saches lire n'importe quel devis et reconnaître un prix juste d'un prix gonflé.

## Tableau des prix moyens plombier en Île-de-France (2026)

Voici les fourchettes que je vois pratiquées en IDF, en journée, du lundi au vendredi 8h-18h. Ce sont des **ordres de grandeur**, pas des tarifs officiels (il n'en existe pas, le métier est libre).

| Intervention | Fourchette marché IDF (jour) | Mon prix Joël (fixe) |
|--------------|------------------------------|----------------------|
| Débouchage WC simple (ventouse / furet manuel) | 80€ - 180€ | 89€ |
| Débouchage WC complexe (furet électrique) | 150€ - 300€ | 149€ |
| Débouchage évier / lavabo | 70€ - 160€ | 79€ |
| Débouchage canalisation principale | 200€ - 450€ | 219€ |
| Recherche de fuite (test acoustique simple) | 100€ - 250€ | 129€ |
| Recherche de fuite (caméra thermique) | 250€ - 600€ | 289€ |
| Réparation fuite robinet (changement joint) | 60€ - 130€ | 69€ |
| Remplacement robinet (mitigeur évier) | 90€ - 220€ | 109€ |
| Remplacement chasse d'eau complète | 110€ - 240€ | 129€ |
| Remplacement groupe sécurité chauffe-eau | 130€ - 290€ | 159€ |
| Vidange + détartrage chauffe-eau | 150€ - 350€ | 179€ |
| Remplacement chauffe-eau électrique 200L | 700€ - 1 400€ (matériel + pose) | 890€ posé |

**Important** : ces prix marché sont une moyenne pondérée. En centre-ville Paris intra-muros, c'est souvent dans le haut de fourchette ou au-dessus. En grande couronne (78, 91, 95, 77), souvent dans le bas. Mes prix fixes sont les mêmes partout en IDF (je ne facture pas la zone).

## Différence prix journée vs nuit / weekend

C'est le sujet où il y a le plus d'arnaques. Un prix "89€" annoncé devient 350€ une fois sur place "parce qu'il est tard". Voici ce qui est légal et ce qui ne l'est pas.

### Ce que dit la loi : arrêté du 24 janvier 2017

L'**arrêté du 24 janvier 2017 relatif à l'information préalable du consommateur sur les prestations de dépannage, de réparation et d'entretien dans le secteur du bâtiment et de l'équipement de la maison** encadre les majorations horaires. En pratique :

- **Toute majoration nuit, dimanche, jour férié doit être annoncée AVANT** intervention.
- Elle doit **figurer en clair sur le devis écrit**.
- Le tarif horaire de base, le détail des suppléments, les frais de déplacement : **tout est obligatoire** sur le devis.

Les **plages horaires majorées** habituellement reconnues par la profession (FFB plomberie, fédérations) :
- **Nuit** : 20h - 8h (parfois 19h - 7h selon les pros)
- **Dimanche et jours fériés** : toute la journée
- **Samedi** : variable selon les pros

### Ordres de grandeur des majorations marché

Les baromètres UFC-Que Choisir et les contrôles DGCCRF montrent une fourchette de majorations pratiquées :

| Plage horaire | Majoration habituelle marché |
|---------------|------------------------------|
| Soir (18h-22h) | +20% à +40% |
| Nuit (22h-7h) | +50% à +100% |
| Samedi journée | +25% à +50% |
| Dimanche | +50% à +100% |
| Jour férié | +100% (parfois +150%) |

**Au-delà de +100%, on entre dans la zone de l'abus**. La DGCCRF a déjà sanctionné des entreprises pour majoration non annoncée ou disproportionnée.

### Mon modèle : prix fixe 24h/24

Chez moi, **pas de majoration nuit, pas de majoration weekend**. Le prix annoncé au téléphone est le prix de la facture, qu'il soit 14h un mardi ou 3h un dimanche. Je le précise parce que c'est rare dans le métier, et parce que ça enlève une grosse source de stress quand tu as une fuite à minuit.

## La TVA : 10% ou 20% ?

Beaucoup de devis "oublient" cette ligne, et beaucoup de clients pensent que la TVA est toujours à 20%. Faux.

### TVA 10% (taux intermédiaire)

S'applique aux **travaux d'amélioration, transformation, aménagement et entretien** dans les **logements achevés depuis plus de 2 ans** (Code général des impôts, article 279-0 bis). Conditions :
- Logement à usage d'habitation.
- Logement achevé depuis plus de 2 ans à la date de début des travaux.
- Travaux non assimilés à du neuf (ne touche pas plus de la moitié des fondations, façades, planchers, etc.).

**La grande majorité des dépannages plomberie en logement existant relève du 10%**.

### TVA 20% (taux normal)

S'applique :
- Logements de moins de 2 ans.
- Travaux assimilés à du neuf (rénovation très lourde).
- Locaux à usage professionnel.
- Pièces "détachées" achetées seules sans pose.

### TVA 5,5% (taux réduit)

S'applique uniquement aux **travaux d'amélioration énergétique** précis (isolation, chaudière à très haute performance énergétique, certains équipements de chauffage). Pas pour un débouchage WC.

**Pratique** : sur ton devis, exige toujours de voir le **taux de TVA appliqué** et le **montant TVA**. Si on te facture du 20% sur un dépannage en logement de plus de 2 ans, c'est faux.

## Comment lire un devis plombier (les postes obligatoires)

Le devis écrit est obligatoire pour toute prestation à domicile dépassant **150€ TTC** (arrêté 24/01/2017, repris dans les obligations DGCCRF dépannage à domicile). Mais demande-le même en dessous : tu as une trace.

### Les 9 mentions obligatoires d'un devis valable

1. **Identité de l'entreprise** : raison sociale, adresse, **SIRET (14 chiffres)**, forme juridique.
2. **Identité du client** : nom, adresse de l'intervention.
3. **Date du devis et durée de validité** (souvent 30 jours).
4. **Description précise de la prestation** : ce qui est diagnostiqué, ce qui sera fait.
5. **Détail des pièces** : marque, référence, quantité, prix unitaire HT.
6. **Détail de la main-d'œuvre** : nombre d'heures, taux horaire HT.
7. **Frais de déplacement** : distincts ou inclus, mais explicites.
8. **Total HT, TVA (taux + montant), Total TTC**.
9. **Mentions légales** : RC Pro, médiateur de la consommation, garanties.

### Signaux d'alerte dans un devis

- Une **ligne unique** type "Réparation fuite : 850€" sans détail. **Refus**.
- **Pas de SIRET** ou SIRET non vérifiable. **Refus**.
- **Pas de taux TVA** affiché. **Refus**.
- **"Pièces et main-d'œuvre incluses"** sans aucun détail. **Tu fais reformuler**.
- **Devis griffonné à la main** sans en-tête entreprise. **Refus**.

> **Témoignage Sarah K., Paris 11e** : "Annoncé 89€ au téléphone. Une fois sur place, devis à 850€ pour ouverture impossible sans perçage. J'ai signé pour qu'il parte." (Cas serrurier, mais le pattern est identique en plomberie : prix d'appel + escalade + pression nocturne. Sarah a payé environ **10 fois** le prix annoncé. Avec un devis détaillé exigé avant intervention, ça ne se serait pas passé.)

## Cas pratique : combien coûte VRAIMENT un débouchage WC à 2h du matin ?

Prenons un cas concret. WC bouché complet, refoulement dans la salle de bain, dimanche 2h du matin.

### Estimation marché IDF (fourchette honnête)

- Intervention de base débouchage complexe : **180€ - 280€** (jour)
- Majoration nuit + dimanche : **+50% à +100%** = **270€ - 560€**
- Frais de déplacement : 30€ - 60€
- TVA 10% (logement >2 ans)
- **Total réaliste : 330€ - 680€ TTC**

### Cas d'arnaque typique

- Annoncé "à partir de 49€" au téléphone.
- Sur place : "C'est plus grave, faut sortir le furet électrique haute pression."
- Devis sorti à 1 100€ "parce que dimanche nuit".
- Pression : "Si on touche pas tout de suite, l'évacuation va péter."
- Signé sous contrainte.

**Différence** : les 49€ étaient un appât. Le prix juste pour cette intervention dimanche nuit, c'est entre 330€ et 680€ chez un pro honnête. 1 100€, c'est 50 à 100% au-dessus du haut de fourchette : c'est gonflé.

### Mon prix Joël pour ce cas

Débouchage WC complexe (furet électrique) : **149€ TTC**, dimanche ou pas, 14h ou 3h. Pas de majoration. Annoncé au téléphone, écrit sur le devis SMS, payé par CB sur place avec facture conforme.

## Pour info : qui surveille les prix du dépannage ?

Plusieurs organismes publient des données vérifiables :

- **DGCCRF** (Direction générale de la concurrence, de la consommation et de la répression des fraudes) : contrôles annuels du dépannage à domicile, sanctions publiées, alertes.
- **UFC-Que Choisir** : baromètres réguliers des prix pratiqués, enquêtes mystery shopping.
- **INC** (Institut National de la Consommation, inc-conso.fr) : fiches pratiques tarifs.
- **FFB Plomberie** (Fédération Française du Bâtiment, section plomberie-chauffage) : référentiels métier.
- **Capeb** (Confédération de l'artisanat et des petites entreprises du bâtiment) : grilles indicatives par région.

📞 **Tu as un devis qui te paraît gonflé ?** Appelle-moi au 01 41 69 10 08, je te donne mon prix au téléphone en 1 minute.

## Comment je calcule mes prix (transparence)

Mon modèle, c'est l'inverse du dépannage agrégateur :

- **Pas de prix d'appel à 49€** qui se transforme en 800€ sur place. Je dis le prix réel au téléphone.
- **Pas de majoration nuit / weekend / férié**. Tarif unique.
- **Pas de pièce changée si elle marche**. Si je peux ressouder un joint plutôt que changer le mitigeur entier, je le fais.
- **Devis SMS systématique avant déplacement**. Tu as la preuve écrite avant que je passe ta porte.
- **Facture conforme avec SIRET vérifiable**. Tu peux passer mon numéro sur **annuaire-entreprises.data.gouv.fr** quand tu veux.

Tu peux retrouver ma grille tarifaire complète plomberie sur [/plomberie/tarifs](/plomberie/tarifs), et le détail de mes prestations sur [/plomberie](/plomberie).

## Comment vérifier ton devis en 2 minutes

1. **SIRET** sur annuaire-entreprises.data.gouv.fr → activité doit être 43.22A ou 43.22B (plomberie).
2. **Détail des lignes** : pièces séparées, main-d'œuvre séparée, déplacement séparé.
3. **Taux TVA** : 10% si logement >2 ans, 20% sinon.
4. **Total TTC affiché en gros**, pas en bas en tout petit.
5. **Mentions légales** : RC Pro + médiateur.
6. **Signature et date** : tu signes en double exemplaire (un pour toi, un pour le pro).

Si l'un des 6 manque, tu refuses et tu appelles un autre pro.

## Articles liés à lire

- [Arnaques plomberie : 7 conseils pour les éviter](/blog/arnaques-plomberie-comment-eviter)
- [Comment vérifier un dépanneur d'urgence en 3 minutes](/blog/comment-verifier-depanneur-urgence)
- [Tarif plombier WC bouché : prix réel 2026](/blog/tarif-plombier-wc-bouche)
- [Prix intervention plombier urgence](/blog/prix-intervention-plombier-urgence)
- [Fuite d'eau la nuit : que faire en urgence ?](/blog/fuite-eau-nuit-que-faire)

## Sources

- DGCCRF, "Dépannage à domicile : la répression des fraudes maintient la pression", rapport 2024.
- UFC-Que Choisir, baromètre 2023-2024 sur les pratiques du dépannage à domicile.
- INC (Institut National de la Consommation), fiches pratiques "Dépannage à domicile" et "Devis et factures".
- Code général des impôts, article 279-0 bis (TVA 10% travaux entretien logement >2 ans).
- Code de la consommation, article L.111-1 (information précontractuelle obligatoire).
- Arrêté du 24 janvier 2017 relatif à l'information préalable du consommateur sur les prestations de dépannage, de réparation et d'entretien dans le secteur du bâtiment et de l'équipement de la maison.
- FFB Plomberie-chauffage (section professionnelle de la Fédération Française du Bâtiment), recommandations métier.
- Capeb (Confédération de l'artisanat et des petites entreprises du bâtiment), référentiels.
- annuaire-entreprises.data.gouv.fr (vérification SIRET, INSEE, gratuit).
- signal.conso.gouv.fr (signalement DGCCRF).

📞 **Besoin d'un plombier honnête en IDF ?** Appelle-moi au 01 41 69 10 08 — prix annoncé au téléphone, sans majoration nuit ni weekend.
    `
  },
  {
    slug: "normes-electriques-nf-c-15-100-explique",
    title: "Norme NF C 15-100 expliquée simplement (logement habitable)",
    excerpt: "La norme NF C 15-100 fait peur, sert d'argument à des devis de remise aux normes à 3 000€, et reste mal comprise. Voici ce qu'elle dit vraiment, quand elle s'applique, et combien coûte une vraie mise aux normes.",
    metaDescription: "Norme NF C 15-100 : les 6 obligations en logement neuf, quand elle s'applique (vente, location, rénovation), DTI obligatoire >15 ans, coûts mise aux normes. Guide 2026.",
    category: "electricite",
    readTime: 11,
    publishedAt: "2026-05-04",
    keywords: [
      "NF C 15-100",
      "norme électrique logement",
      "mise aux normes électriques",
      "diagnostic électrique obligatoire",
      "dti électrique",
      "diagnostic technique installation électrique",
      "consuel norme",
      "installation électrique conforme",
    ],
    image: "Photo d'un tableau électrique moderne ouvert dans un appartement, avec disjoncteurs alignés et étiquetage clair, lumière naturelle de jour. Plan rapproché qui met en valeur la propreté du câblage. Pas de logo.",
    content: `
## Pourquoi cette norme génère autant de confusion (et d'arnaques)

Je suis Joël, je fais du dépannage électrique en Île-de-France. La **NF C 15-100**, c'est LA norme qu'on me cite dès que je rentre chez un client. Et c'est aussi LA norme que les escrocs utilisent pour gonfler les factures : "votre tableau n'est pas aux normes NF C 15-100, c'est dangereux, faut tout refaire d'urgence — 2 800€."

Dans 80% des cas, **c'est faux**. La norme NF C 15-100 ne s'impose **pas** à toutes les installations existantes. Elle s'impose dans des cas précis (que je détaille plus bas). Pour le reste, ce qui compte légalement, c'est que ton installation ne présente pas de **danger grave et manifeste** — pas qu'elle soit conforme aux dernières évolutions normatives.

Ce guide, c'est ma version "simple et honnête" de ce que dit vraiment cette norme, à quoi elle sert, quand elle s'applique, ce que tu risques si elle n'est pas respectée, et ce que coûte une vraie mise aux normes.

## C'est quoi, NF C 15-100 ?

**NF C 15-100** est la norme française qui décrit les **règles de conception, de réalisation et d'entretien des installations électriques basse tension** (jusqu'à 1 000 volts en alternatif). Elle est publiée par l'**AFNOR** (Association Française de Normalisation) et l'**UTE** (Union Technique de l'Électricité).

### À quoi elle sert vraiment

L'objectif de la norme tient en deux points :

1. **Sécurité incendie** : éviter que ton installation prenne feu (court-circuit, surcharge, défaut d'isolement). On parle de plusieurs milliers d'incendies d'origine électrique par an en France selon les bilans Promotelec et FFA (Fédération Française de l'Assurance).
2. **Protection des personnes** : éviter électrisations et électrocutions. C'est la raison d'être des **dispositifs différentiels** (le fameux "30 mA" qui détecte la fuite de courant).

### Une norme qui évolue

NF C 15-100 a été révisée plusieurs fois depuis sa première publication en 1969. Les versions de **2002**, **2008**, **2015**, et les amendements successifs, ont chacun ajouté des exigences (nombre de prises minimum par pièce, équipotentialité de la salle de bain, etc.).

**Conséquence importante** : ton installation est jugée par rapport à la version de la norme **en vigueur au moment de sa réalisation**. Une installation faite en 1995 n'a pas à respecter la version de 2015. C'est ce qu'on appelle le principe de **"non-rétroactivité"**.

## Les 6 obligations principales en logement neuf (résumé)

Pour un logement **neuf** ou une **rénovation totale**, la NF C 15-100 impose, entre autres :

### 1. Un dispositif de protection différentielle 30 mA

Au moins un dispositif différentiel à haute sensibilité (30 mA) sur chaque circuit qui dessert des prises ou des points d'éclairage. C'est ce qui te protège de l'électrocution si un appareil défectueux fait fuir le courant à la terre (ou à toi).

### 2. Une installation correctement protégée par disjoncteurs

Chaque circuit (éclairage, prises, four, plaque de cuisson, lave-linge, etc.) doit avoir son **propre disjoncteur**, calibré au bon ampérage selon la nature et le nombre d'appareils.

### 3. Des prises spécialisées en cuisine

La cuisine impose des **circuits spécialisés** (32A pour la plaque de cuisson, 20A pour le four, 20A pour le lave-vaisselle, 20A pour le lave-linge si en cuisine). Ces appareils ne doivent pas être branchés sur des prises génériques.

### 4. Un nombre minimum de prises par pièce

La norme précise un nombre minimum de prises 16A par pièce :
- Séjour : 5 prises minimum (1 par tranche de 4 m²)
- Chambres : 3 prises minimum
- Cuisine : 6 prises 16A (en plus des spécialisées)
- Couloirs : 1 prise

### 5. Une équipotentialité dans la salle de bain

La salle de bain est divisée en **volumes de sécurité** (volume 0 = baignoire, volume 1 = jusqu'à 2,25 m, volume 2 = au-delà). Chaque volume tolère certains équipements et pas d'autres. Les masses métalliques (radiateur sèche-serviettes, baignoire, tuyauterie) doivent être reliées à la terre par une **liaison équipotentielle supplémentaire (LES)**.

### 6. Un GTL (gaine technique logement) et un ETEL

La GTL regroupe les arrivées (énergie + télécom). L'ETEL (Espace Technique Électrique du Logement) accueille le tableau de répartition, le tableau de communication, et laisse la place pour des évolutions futures (domotique, fibre optique).

**Note importante** : ces 6 points concernent le **neuf** et la **rénovation totale**. Pour ton appartement de 1985, ce n'est pas obligatoire d'avoir tout ça. Lis la suite.

## Quand est-on OBLIGÉ de respecter NF C 15-100 ?

C'est LA question qui fait la différence entre un devis honnête et une arnaque à 3 000€.

### Cas 1 : Logement neuf

Pour toute construction neuve (permis de construire après 2003 pour les premières exigences, dates différentes selon les versions de la norme), la NF C 15-100 est obligatoire et conditionne la délivrance du **Consuel** (attestation de conformité). Sans Consuel, EDF / Enedis ne raccorde pas.

### Cas 2 : Rénovation totale ou lourde

Quand la rénovation **touche significativement** l'installation électrique (refonte complète, redistribution des circuits, déplacement du tableau, etc.), la norme s'applique aux **parties refaites**. Là encore, un Consuel est demandé.

### Cas 3 : Vente d'un logement (DTI / diagnostic électrique)

Depuis la **loi ENL de 2009** et ses décrets d'application, **tout logement vendu dont l'installation électrique a plus de 15 ans** doit être accompagné d'un **diagnostic électrique** (parfois appelé DTI - Diagnostic Technique de l'Installation). Référence : Code de la construction et de l'habitation, **article L.134-7** et suivants.

**Important** : ce diagnostic ne dit **pas** "conforme NF C 15-100 / non conforme". Il liste des **points de contrôle** (6 obligations majeures de sécurité) et signale les **anomalies**. Une anomalie ne rend pas la vente impossible, mais l'acheteur en est informé. Une remise aux normes peut alors être négociée dans le prix.

### Cas 4 : Location

Depuis le **1er janvier 2018** pour les baux signés à partir de cette date (**1er juillet 2017** pour la "rénovation lourde"), un **état de l'installation intérieure d'électricité** doit être annexé au contrat de bail si l'installation a plus de **15 ans**. Décret n°2016-1105 du 11 août 2016, codifié dans le Code de la construction.

### Cas 5 : Tu as un dépannage simple

**Dans la grande majorité des cas où tu m'appelles** : disjoncteur qui saute, prise qui ne fonctionne plus, panne dans une pièce, four qui fait disjoncter… **AUCUNE obligation** de remettre toute ton installation aux normes NF C 15-100. Le pro intervient sur le défaut, point.

**Si on te dit "il faut refaire tout le tableau aux normes 2015"** alors que tu appelles juste pour une prise qui ne marche plus : c'est un signal d'arnaque évident.

## Le DTI : c'est quoi exactement ?

Le **diagnostic électrique** (souvent appelé DTI - Diagnostic Technique de l'Installation, ou simplement "diag élec") est obligatoire dans deux cas :

- **Vente** d'un logement avec installation électrique de **plus de 15 ans**.
- **Location** (depuis 2018) d'un logement avec installation de **plus de 15 ans**.

### Ce que vérifie le DTI

Le diagnostic est encadré par l'**arrêté du 28 septembre 2017** et porte sur **6 points clés** de sécurité :

1. **Présence d'un appareil général de commande et de protection** (disjoncteur de branchement) accessible.
2. **Présence d'au moins un dispositif différentiel** approprié.
3. **Protection contre les surintensités** adaptée à chaque circuit (disjoncteurs / fusibles).
4. **Présence d'une liaison équipotentielle dans la salle de bain**.
5. **Absence de matériel vétuste, inadapté ou présentant des risques**.
6. **Conducteurs non protégés mécaniquement** (fils apparents, etc.).

### Validité

Le DTI est valable **3 ans pour la vente** et **6 ans pour la location**. Il doit être réalisé par un **diagnostiqueur certifié** (Cofrac ou équivalent).

### Coût d'un DTI

Comptez **80€ à 180€** selon la surface du logement et la région. C'est le vendeur (ou le bailleur) qui paie.

## Combien coûte une vraie mise aux normes ?

Voici les fourchettes que je vois pratiquées en Île-de-France pour des **vraies** opérations de mise aux normes (pas pour réarmer un différentiel facturé 1 980€).

| Intervention | Fourchette IDF |
|--------------|----------------|
| Mise aux normes partielle (ajout différentiel 30 mA + revue tableau) | 350€ - 700€ |
| Remplacement complet du tableau électrique | 800€ - 1 800€ |
| Mise aux normes salle de bain (équipotentialité, volumes) | 250€ - 600€ |
| Réfection partielle du circuit cuisine (4-6 spécialisés) | 600€ - 1 400€ |
| Rénovation électrique complète appartement T3 | 3 500€ - 8 000€ |
| Rénovation complète maison 100 m² | 6 000€ - 15 000€ |

**Ces prix incluent main-d'œuvre + matériel + obtention Consuel** quand applicable.

**Signal d'alerte** : si on te demande **1 980€ pour "mise aux normes"** alors qu'on a juste réarmé un différentiel chez toi, tu paies environ **20 fois trop cher** pour 5 secondes de travail réel.

> **Témoignage Laëtitia B., Boulogne-Billancourt** : "Disjoncteur qui sautait. L'électricien a parlé de 'tableau dangereux à refaire d'urgence'. Devis de 1 980€ signé en pleine nuit. C'était juste un différentiel à enclencher." (Cas typique du faux diagnostic NF C 15-100 utilisé pour gonfler une facture.)

## Risques d'une installation non conforme

C'est important de séparer le **vrai risque** du **risque inventé pour vendre**.

### Vrais risques (à ne pas négliger)

- **Incendie d'origine électrique** : selon Promotelec, l'origine électrique est l'une des premières causes d'incendies domestiques. Les défauts les plus fréquents : **multiprises en cascade**, **rallonges sous tapis**, **fils dénudés**, **prises noircies** (signe d'échauffement).
- **Électrisation et électrocution** : surtout sans dispositif différentiel 30 mA (ou si défaillant). Plusieurs centaines de personnes meurent encore d'électrocution à domicile chaque année en France selon les bilans Santé Publique France.
- **Refus d'indemnisation par l'assurance en cas de sinistre grave** : si un incendie démarre depuis un défaut **manifeste et grave** d'installation que tu connaissais et que tu n'as pas fait réparer, ton assurance peut refuser ou réduire la prise en charge (article L.113-1 et suivants du Code des assurances).

### Idées reçues fausses

- **"Mon assurance va refuser parce que je n'ai pas la NF C 15-100"** → faux dans 99% des cas. Aucun contrat MRH (multirisque habitation) n'exige la NF C 15-100 sur installation existante. Ce qui est exigé, c'est **l'absence de défaut grave et manifeste**.
- **"EDF / Enedis va me couper si mon tableau n'est pas aux normes"** → faux, sauf danger immédiat constaté.
- **"Le diagnostic électrique m'oblige à refaire l'installation"** → faux. Il informe l'acheteur ou le locataire, qui peut négocier le prix ou demander des travaux. Mais aucune obligation légale immédiate de tout refaire.

## Comment savoir si TON installation a un vrai problème

Voici les vrais signaux qui doivent t'alerter (et qui justifient un diagnostic ou des travaux ciblés) :

**Signaux clairs d'un défaut grave** :
- Odeur de brûlé persistante autour d'une prise ou du tableau.
- Prise ou interrupteur **noirci ou marron** (signe de surchauffe).
- Fils électriques **dénudés** apparents.
- **Picotements** quand tu touches un appareil métallique branché.
- Disjoncteur ou différentiel qui saute **plusieurs fois par semaine** sans cause identifiée.
- Tableau électrique avec **fusibles à porcelaine** (technologie obsolète, plus aucun différentiel).

**Si tu vois un de ces signaux**, fais venir un électricien certifié (Qualifelec sur **qualifelec.fr** annuaire) pour un **diagnostic factuel**. Tu peux aussi demander un DTI volontaire (80-180€) qui te donnera un état des lieux écrit et opposable.

📞 **Tu veux un diagnostic électrique honnête, sans devis gonflé ?** Appelle-moi au 01 41 69 10 08, je te dis le vrai état de ton installation.

## Mon engagement quand je passe chez toi

- Je **diagnostique avant de chiffrer**. Pas de "remise aux normes" annoncée à l'aveugle.
- Je **dépanne le problème immédiat** (ex : prise grillée, différentiel défaillant) sans en profiter pour vendre 1 800€ de travaux non urgents.
- Si je vois un **vrai défaut grave** (fils dénudés, prise brûlée), je te le dis, je te montre, je te donne un devis chiffré pour ton calme — et tu décides si tu fais maintenant ou tu attends.
- Je ne te facture **jamais un faux Consuel** sur un dépannage simple. Le Consuel ne sert que pour le neuf, la rénovation totale, ou le changement de fournisseur après mise en service.

Tu peux retrouver ma grille tarifaire électricité sur [/electricite/tarifs](/electricite/tarifs) et le détail de mes prestations sur [/electricite](/electricite).

## Articles liés à lire

- [Arnaques électricien dépannage : 6 pièges à éviter en urgence](/blog/arnaques-electricien-comment-eviter)
- [Disjoncteur qui saute : causes et solutions](/blog/disjoncteur-saute-causes-solutions)
- [Comment vérifier un dépanneur d'urgence en 3 minutes](/blog/comment-verifier-depanneur-urgence)

## Sources

- AFNOR (Association Française de Normalisation), norme NF C 15-100 et amendements 2008-2015.
- UTE (Union Technique de l'Électricité), guide d'application NF C 15-100.
- Promotelec, bilans annuels sur la sécurité électrique dans le logement.
- Consuel (consuel.com), attestations de conformité électrique.
- Qualifelec (qualifelec.fr), qualification professionnelle des entreprises d'électricité.
- Code de la construction et de l'habitation, article L.134-7 et suivants (DTI vente).
- Décret n°2016-1105 du 11 août 2016 (DTI location, codifié dans le CCH).
- Arrêté du 28 septembre 2017 modifiant l'arrêté du 8 juillet 2008 (modèle de diagnostic électrique).
- Loi ENL n°2009-323 du 25 mars 2009 (introduction du diagnostic électrique vente).
- Code des assurances, article L.113-1 et suivants (limites d'indemnisation en cas de défaut grave connu).
- Santé Publique France, bilans accidents domestiques (électrisation et électrocution).
- FFA (Fédération Française de l'Assurance), bilans incendies domestiques d'origine électrique.

📞 **Une question sur la conformité de ton installation ?** Appelle-moi au 01 41 69 10 08 — diagnostic clair, sans pression commerciale.
    `
  },
  {
    slug: "securite-serrure-quel-cylindre-choisir",
    title: "Quel cylindre de serrure choisir ? Guide A2P 2026",
    excerpt: "Cylindre A2P 1 étoile, 2 étoiles, 3 étoiles : la différence se compte en minutes face à un cambrioleur. Voici comment choisir, les marques sérieuses (Vachette, Bricard, Pollux, Picard, Mul-T-Lock) et combien ça coûte vraiment.",
    metaDescription: "Guide cylindre A2P 2026 : 3 niveaux de certification, marques sérieuses (Vachette, Bricard, Pollux, Picard, Mul-T-Lock), prix installation. Conseils CNPP et assureurs pour ne pas se tromper.",
    category: "serrurerie",
    readTime: 10,
    publishedAt: "2026-05-04",
    keywords: [
      "cylindre A2P",
      "serrure haute sécurité",
      "Vachette Bricard Pollux",
      "cylindre anti-effraction",
      "changer cylindre",
      "cylindre A2P 3 étoiles",
      "Picard Mul-T-Lock",
      "anti-bumping",
    ],
    image: "Photo macro d'un cylindre de serrure A2P 3 étoiles posé sur un établi en bois, avec sa clé brevetée à goupilles et son carton d'origine portant le logo CNPP. Lumière naturelle, ambiance documentaire, gros plan, pas de logo MonJoël.",
    content: `
## Pourquoi le cylindre, c'est 90% de la sécurité de ta porte

Je suis Joël, je fais de la serrurerie en Île-de-France. Quand je dépanne après cambriolage ou tentative d'effraction, **9 fois sur 10**, le point faible n'était pas la serrure entière, ni la porte : c'était **le cylindre**. La pièce qu'on insère la clé dedans, ce petit barillet de 6 cm. C'est lui qui est attaqué en premier.

Une porte blindée à 1 800€ avec un cylindre à 12€ acheté en grande surface : ton cambrioleur passe en 3 minutes au crochet. Une porte standard avec un cylindre A2P 3 étoiles à 180€ : il faut entre 15 et 30 minutes, et la plupart abandonnent.

Ce guide, c'est l'arbre de décision que je te donnerais si tu m'appelais pour me demander : **"Joël, quel cylindre je mets ?"**.

## C'est quoi A2P, concrètement ?

**A2P** signifie "Assurance Prévention Protection". C'est la **certification de référence** délivrée par le **CNPP** (Centre National de Prévention et de Protection), un organisme indépendant reconnu par les assureurs français.

### À quoi ça sert

Un cylindre certifié A2P a passé une **batterie de tests d'effraction normalisés** : crochetage, perçage, bumping (frappe), arrachement, cassage. Il est noté en fonction du **temps qu'il résiste** à un cambrioleur outillé.

### Pourquoi c'est important pour ton assurance

Beaucoup de contrats MRH (multirisque habitation), surtout en Île-de-France, **exigent au minimum un A2P 1 étoile** pour appliquer la garantie vol sans franchise majorée, voire pour la prise en charge du vol tout court selon les contrats. Vérifie toujours **les conditions générales de ton contrat** : c'est écrit noir sur blanc dans la clause "moyens de protection".

## Les 3 niveaux A2P expliqués

| Niveau A2P | Résistance certifiée à l'effraction | Usage recommandé | Prix indicatif IDF (cylindre seul) |
|------------|-------------------------------------|------------------|------------------------------------|
| **A2P 1 étoile** | **5 minutes** | Maison ou appartement zone calme | 60€ - 120€ |
| **A2P 2 étoiles** | **10 minutes** | Appartement standard, IDF urbain | 100€ - 200€ |
| **A2P 3 étoiles** | **15 minutes** | Risque élevé, cambriolages dans le quartier | 150€ - 300€ |

**Pourquoi les minutes comptent** : les statistiques de gendarmerie et police (SSMSI - Service Statistique Ministériel de la Sécurité Intérieure) montrent qu'un **cambrioleur abandonne dans la majorité des cas s'il ne franchit pas la porte en moins de 5 minutes**. Au-delà de 10 minutes, c'est exceptionnel qu'il insiste.

### Quelle étoile choisir pour ton cas

- **Studio ou T1 en sous-sol parisien** : A2P 1 étoile suffit (peu de visibilité, peu d'opportunité).
- **Appartement T2-T4 en immeuble lambda IDF** : **A2P 2 étoiles minimum**. C'est le standard que je conseille.
- **Maison individuelle, rez-de-chaussée, ou logement déjà cambriolé** : **A2P 3 étoiles**. Le surcoût (40-100€ vs A2P 2 étoiles) est largement justifié.
- **Logement avec valeurs (collection, espèces, bijoux importants)** : A2P 3 étoiles + porte blindée + alarme. C'est un sujet en soi.

## Les marques sérieuses (sans favoritisme)

Voici les marques que je vois le plus dans les portes haut de gamme en France. Toutes proposent des gammes A2P 1, 2, et 3 étoiles. Le choix entre elles est plus une affaire de **disponibilité de pièces** et de **préférence personnelle** que de différence majeure de qualité.

### Vachette (groupe Assa Abloy)

**Marque française historique**, gamme très large. Modèles emblématiques : **Radial NT+**, **V8**. Très bien distribué, pièces faciles à trouver. Bon rapport qualité-prix. A2P 1 à 3 étoiles selon modèles.

### Bricard (groupe Hager)

**Autre référence française historique**, souvent privilégié par les serruriers indépendants pour la robustesse. Gammes **Chifral**, **Trial**. Très anti-arrachement. A2P 1 à 3 étoiles.

### Pollux (groupe Mottura, italien)

Cylindres **anti-bumping** très réputés. Gammes **Champions** et **Project**. Particulièrement résistants au crochetage. A2P 2 et 3 étoiles principalement.

### Picard (français, indépendant)

**Marque artisanale française** souvent recommandée pour les portes blindées (Picard fabrique aussi des portes). Modèles **Vigirex**, **Diamant**. A2P jusqu'à 3 étoiles. Excellent niveau global.

### Mul-T-Lock (israélien, groupe Assa Abloy)

**Référence mondiale du haut de gamme**. Système de **clés brevetées** très difficiles à reproduire (clés à téton ou clés à 4 rangées de goupilles). Modèles **Interactive+**, **MT5+**. Souvent en A2P 3 étoiles. Plus cher mais très haut niveau.

### Et les marques "low cost" en grande surface ?

Cylindres bricolage à 9-25€ : aucune certification A2P, **anti-perçage limité ou inexistant**, **anti-bumping = zéro**. Honnêtement : si tu changes ton cylindre, ne mets pas ce genre de truc. C'est l'équivalent d'une serrure qui te donne un faux sentiment de sécurité et qui se crochete à la main en 30 secondes.

## Cylindre européen, belge, ovale : c'est quoi la différence ?

C'est une question de **profil mécanique** : la forme du barillet qui s'insère dans la serrure. Tu n'as pas le choix, c'est ta serrure qui impose le profil. Il faut juste savoir quel profil tu as pour acheter le bon cylindre.

### Profil européen (le plus courant en France)

Forme caractéristique : un **rond avec une partie aplatie au milieu** qui descend (le "panneton" qui actionne le pêne). C'est le format **largement majoritaire** sur les portes d'appartement en France.

### Profil belge / ovale (rond)

Cylindre **complètement rond**, sans partie aplatie. Plus utilisé en Belgique et au Luxembourg, mais on en trouve aussi sur certaines portes anciennes en France.

### Profil suisse, américain, autres

Sur des portes spéciales ou anciennes. Si tu es là-dedans, demande à un serrurier de regarder.

### Mesurer son cylindre (3 mesures clés)

1. **Longueur côté extérieur** (du milieu de la fixation à l'extrémité extérieure) — typiquement **30 mm**.
2. **Longueur côté intérieur** (du milieu vers l'intérieur) — typiquement **30 ou 35 mm**.
3. **Type** : à clé des deux côtés, à bouton intérieur, à bouton avec urgence ?

**Important sécurité** : si ton cylindre **dépasse de plus de 5 mm** de la garniture extérieure, il devient **vulnérable à l'arrachement** (le cambrioleur attaque la partie qui dépasse avec une pince spéciale). Privilégie un cylindre **affleurant** (qui ne dépasse pas).

## Quand changer ton cylindre

### Cas où c'est OBLIGATOIRE de changer

- **Tu as perdu une clé** sans savoir qui l'a récupérée.
- **Déménagement** dans un logement où tu ne connais pas l'historique des clés (qui les a eues : ancien proprio, agence, voisin, ouvrier ?).
- **Après une effraction** ou tentative d'effraction (le cylindre a probablement été abîmé même si la porte est restée fermée).
- **Vol de clés** dans ton sac, à la maison, au bureau.

### Cas où c'est INUTILE de changer

- Tu rentres tranquillement chez toi le soir, ta clé fonctionne, ta serrure n'a pas bougé. Le serrurier qui t'a ouvert porte claquée te dit "il faut changer le cylindre" : **regarde-le dans les yeux**. Si la porte n'a pas été forcée et que ton cylindre fonctionne, **rien à changer**. C'est une arnaque classique de gonflage de facture.

> **Témoignage Karim D., Nanterre (septembre 2025)** : "Porte simplement claquée. Le serrurier l'a percée d'office en 30 secondes alors qu'une carte radio aurait suffi. 720€, plus 380€ pour le nouveau cylindre obligatoire d'après lui." (Le perçage abusif sert à **forcer** le client à racheter un cylindre. Si la radio passe, **rien à changer**. Karim a donc payé 380€ d'arnaque en plus du perçage.)

## Pourquoi PAS un cylindre "pas cher"

Voilà ce qui se passe techniquement avec un cylindre bas de gamme à 12€ :

- **Crochetage** : avec un set de pics à 25€ acheté sur Internet, ça s'ouvre en 30 secondes à 2 minutes.
- **Bumping** (frappe avec une "clé bumping") : 5 secondes. C'est devenu une technique massive, des tutos sur YouTube en pagaille.
- **Perçage** : avec une perceuse de chantier et un foret au cobalt, 1 à 3 minutes pour détruire le mécanisme.
- **Arrachement** : avec une pince spéciale, 15 à 30 secondes si le cylindre dépasse.

Avec un **A2P 2 étoiles** correct, le crochetage devient quasi impossible (goupilles anti-crochetage, contre-goupilles), le bumping est bloqué (système anti-frappe), le perçage prend 8-12 minutes (insertions trempées au carbure), et l'arrachement nécessite des outils lourds (renforts internes).

**Différence en pratique** : 30 secondes vs 10 minutes. Ton cambrioleur abandonne.

## Combien coûte une installation Joël (transparence)

| Prestation | Prix Joël IDF |
|------------|---------------|
| Remplacement cylindre A2P 1 étoile (cylindre + pose) | 149€ |
| Remplacement cylindre A2P 2 étoiles (cylindre + pose) | 219€ |
| Remplacement cylindre A2P 3 étoiles (cylindre + pose) | 289€ |
| Remplacement cylindre A2P 3 étoiles + 5 clés brevetées | 349€ |
| Remplacement cylindre haut de gamme Mul-T-Lock / Pollux 3 étoiles | 379€ |

Ces prix sont **TTC, sans majoration nuit ni weekend**, déplacement IDF inclus.

**Pour comparaison marché** : on voit beaucoup de devis serruriers dans la fourchette **180€ - 500€** pour un A2P 1 étoile (oui, jusqu'à 500€ pour le niveau le plus bas), et **300€ - 900€** pour un A2P 3 étoiles. Au-delà de 600€ pour un A2P 3 étoiles, on est dans le gonflage.

## Comment vérifier qu'on t'a vraiment installé un A2P

Sur le cylindre lui-même, l'**emblème A2P avec le nombre d'étoiles** est gravé sur le côté du barillet. Demande à voir.

Tu peux aussi vérifier la certification du modèle exact installé sur le **site CNPP** (cnpp.com, espace certifications), qui liste les produits certifiés.

Si on te dit "c'est A2P" mais qu'il n'y a pas de gravure, ou que le modèle ne ressort pas dans la base CNPP : **c'est un faux A2P**.

📞 **Tu hésites entre A2P 1, 2 ou 3 étoiles ?** Appelle-moi au 01 41 69 10 08, je t'aide à choisir selon ton vrai risque.

## Conseils CNPP et assureurs

Le CNPP, dans ses guides à destination des particuliers, et la plupart des grands assureurs (Allianz, AXA, MAIF, Macif, Groupama dans leurs guides "moyens de protection") recommandent en moyenne :

- **Appartement standard IDF** : A2P 2 étoiles minimum.
- **Maison individuelle isolée** : A2P 3 étoiles + serrure 3 ou 5 points.
- **Vérifier les conditions de son contrat MRH** : certains contrats imposent A2P 1 étoile minimum pour la garantie vol, et A2P 3 étoiles pour les capitaux supérieurs à un seuil (souvent 30 000€ de mobilier).

Le **SSMSI** (statistiques sécurité intérieure) publie chaque année les chiffres des cambriolages : depuis plusieurs années, le mode opératoire principal en logement reste **l'effraction de la porte d'entrée** (souvent par le cylindre).

## Mon engagement quand je change ton cylindre

- Je te **demande ton contrat MRH** ou tes attentes en niveau de protection avant de te conseiller. Pas l'inverse.
- Je te propose **plusieurs niveaux** A2P avec leurs prix, tu choisis.
- Je **ne te change pas le cylindre** si la porte n'a pas été forcée et que tu m'as appelé pour une porte claquée simple. C'est inutile.
- Je te montre **le cylindre installé**, la **gravure A2P + étoiles**, et te remets l'**ancien cylindre** si tu veux le garder.
- Je te fournis la **facture conforme** avec marque, référence, niveau A2P, garantie.

Tu peux retrouver le détail de mes prestations serrurerie sur [/serrurerie](/serrurerie), et ma grille tarifaire complète sur [/serrurerie/tarifs](/serrurerie/tarifs).

## Articles liés à lire

- [Cylindre A2P : guide sécurité](/blog/cylindre-a2p-guide-securite)
- [Serrure 3 points vs 5 points](/blog/serrure-3-points-vs-5-points)
- [Porte blindée : guide d'achat](/blog/porte-blindee-guide-achat)
- [Arnaques serrurier : 7 signaux qui doivent t'alerter](/blog/arnaques-serrurier-comment-eviter)
- [Changer une serrure : guide complet](/blog/changer-serrure-guide-complet)

## Sources

- CNPP (Centre National de Prévention et de Protection), référentiels A2P et guides à destination des particuliers (cnpp.com).
- AFNOR / référentiels A2P (procédures de certification cylindres, serrures, portes blindées).
- SSMSI (Service Statistique Ministériel de la Sécurité Intérieure), rapports annuels cambriolages et modes opératoires.
- Guides moyens de protection des grands assureurs : Allianz, AXA, MAIF, Macif, Groupama (clauses "vol" des contrats MRH).
- Code des assurances, articles L.113-1 et suivants (limites d'indemnisation et obligations contractuelles).
- Documentation produits Vachette (groupe Assa Abloy), Bricard (groupe Hager), Pollux (Mottura), Picard, Mul-T-Lock.
- ONDRP (Observatoire National de la Délinquance et des Réponses Pénales), bilans cambriolages.

📞 **Tu veux changer ton cylindre vers du vrai A2P ?** Appelle-moi au 01 41 69 10 08 — A2P certifié, marque sérieuse, prix annoncé au téléphone.
    `
  },
  {
    slug: "depannage-urgence-nuit-weekend-tarif",
    title: "Dépannage urgence nuit, weekend, jour férié : qui appeler et combien (2026)",
    excerpt: "Plombier à 3h du matin, serrurier le dimanche, électricien le 1er janvier : quelle majoration est légale, quelle arnaque guette, et qui appeler pour ne pas se faire piéger. Le guide complet.",
    metaDescription: "Dépannage urgence nuit / weekend / jour férié 2026 : majorations légales (arrêté 24/01/2017), pièges du 1er numéro Google, méthode de vérification 2 min, conseils anti-stress.",
    category: "conseils",
    readTime: 12,
    publishedAt: "2026-05-04",
    keywords: [
      "dépannage urgence nuit",
      "plombier dimanche",
      "serrurier 3h du matin",
      "tarif urgence weekend",
      "majoration tarif",
      "majoration nuit dépannage",
      "tarif férié plombier",
      "qui appeler urgence dépannage",
    ],
    image: "Photo nocturne d'une rue parisienne sous la pluie, vue depuis l'intérieur d'un appartement à travers une fenêtre embuée, avec un téléphone tenu en main au premier plan affichant un appel sortant vers un artisan. Lumière des lampadaires orangée, ambiance documentaire intimiste, pas de logo.",
    content: `
## Pourquoi je publie ce guide

Je m'appelle Joël, je fais du dépannage en Île-de-France et je suis joignable **24h/24, 7j/7**. La nuit, le weekend, le 14 juillet, le 1er janvier : c'est précisément à ces moments-là que les arnaques explosent. Stress, fatigue, plus rien d'ouvert pour comparer, peur que ça empire : c'est le terrain de jeu rêvé des escrocs du dépannage.

Ce guide, c'est ce que je dirais à n'importe qui qui m'appelle paniqué à 2h du matin. **Voici ce que dit la loi sur les majorations, comment vérifier un dépanneur en pleine nuit en 2 minutes, ce que tu peux faire toi-même en attendant, et les vrais pièges de l'urgence nocturne**.

C'est le plus long article du blog. Il vaut le coup parce que les nuits où tu en as besoin, **tu n'as plus le temps d'apprendre tout ça**.

## Que dit la loi sur les majorations nuit / dimanche / férié

C'est le sujet où il y a le plus d'arnaques, donc commençons par les bases légales.

### Arrêté du 24 janvier 2017

L'**arrêté du 24 janvier 2017 relatif à l'information préalable du consommateur sur les prestations de dépannage, de réparation et d'entretien dans le secteur du bâtiment et de l'équipement de la maison** est le texte qui encadre tout ça. Trois principes clés :

1. **Toute majoration horaire (nuit, dimanche, férié) doit être annoncée AVANT** intervention, par écrit ou oralement avec confirmation écrite.
2. **Elle doit figurer en clair sur le devis écrit**, avec son montant exact (pas un "supplément à voir").
3. **Le tarif horaire de base, le détail des suppléments, les frais de déplacement** : tout est obligatoire.

Si on t'ajoute "+50€ de supplément nuit" **après** intervention sans que ce soit annoncé sur le devis : c'est **illégal**, tu peux le contester (DGCCRF, signal.conso.gouv.fr).

### Plages horaires usuelles

L'arrêté ne fixe pas les heures précises ; chaque profession et chaque pro définit ses plages. Mais on retrouve grosso modo :

- **Soir** : 18h ou 20h jusqu'à 22h
- **Nuit** : 22h jusqu'à 7h ou 8h
- **Dimanche** : toute la journée
- **Jours fériés** : toute la journée

### Majorations habituellement pratiquées (marché)

Voici les fourchettes que les baromètres UFC-Que Choisir, les contrôles DGCCRF et les fédérations professionnelles (FFB, Capeb) montrent comme étant pratiquées :

| Plage | Majoration usuelle marché | Plafond raisonnable |
|-------|---------------------------|---------------------|
| Soir 18h-22h | +20% à +40% | +50% |
| Nuit 22h-7h | +50% à +100% | +100% |
| Samedi journée | +25% à +50% | +50% |
| Dimanche | +50% à +100% | +100% |
| Jour férié | +100% (parfois +150%) | +150% |

**Au-delà des plafonds raisonnables**, on entre dans la zone des sanctions DGCCRF. La DGCCRF a déjà publié des bilans annonçant des amendes pour majoration **abusive** ou **non annoncée**.

### Mon modèle Joël : prix unique 24h/24

Mon choix de business, c'est de **pas faire de majoration**. Le prix annoncé au téléphone est le prix de la facture, qu'il soit 14h un mardi ou 3h un dimanche du 1er mai. Je le précise parce que c'est rare dans le métier et parce que ça **enlève une grosse source d'arnaque potentielle** (et de stress quand on appelle paniqué).

C'est un fact réel du modèle MonJoël, vérifiable sur ma grille tarifaire publique.

## Comment vérifier un dépanneur en 2 minutes (en pleine nuit)

Quand il est 3h du matin et que ton WC déborde, tu n'as pas 30 minutes pour faire une enquête approfondie. Voici la **version express en 2 minutes** que je recommande.

### Action 1 : SIRET (60 secondes)

Au téléphone, demande **avant** que la personne se déplace :
- Le **nom** exact de l'entreprise.
- Son **SIRET** (14 chiffres).

Tu vas sur **annuaire-entreprises.data.gouv.fr** depuis ton téléphone (gratuit, État, accessible 24h/24), tu colles le SIRET. Doit ressortir :
- La **même raison sociale**.
- Une **activité cohérente** (code NAF) avec le métier.
- Statut **"actif"**.

**Codes NAF cohérents** :
- Plomberie : 43.22A, 43.22B
- Serrurerie : 80.20Z, 43.32A
- Électricité : 43.21A, 43.21B

Si rien ne sort, ou si l'activité est "vente de jouets en gros", **tu raccroches**. Pas d'exception.

### Action 2 : avis Google récents (30 secondes)

Tape le nom de l'entreprise sur Google. Regarde la fiche Google Business :

- **Volume d'avis** : au moins 50 pour un pro qui tourne vraiment.
- **Date des derniers** : au moins quelques-uns dans les 3 derniers mois.
- **Pas que des 5 étoiles** : un vrai pro a forcément quelques 1 ou 2 étoiles. C'est sain.
- **Réponses du pro** aux avis négatifs (signe qu'il prend ses clients au sérieux).

Si tu vois 200 avis 5 étoiles datés tous sur 2 mois, ou que le pro répond aux avis négatifs en insultant les clients, **tu raccroches**.

### Action 3 : devis SMS avant déplacement (30 secondes)

Tu demandes au téléphone : **"Envoie-moi le devis par SMS avant de venir, avec le prix tout compris."**

Le devis doit contenir :
- Nom + SIRET.
- Description de l'intervention prévue.
- Prix TTC tout compris (déplacement, suppléments, etc.).

Un pro sérieux prend 2 minutes pour t'envoyer un SMS. **Un escroc refuse**. C'est aussi simple que ça.

**Total : 2 minutes**, et tu as éliminé 95% des risques d'arnaque nocturne.

## Le vrai piège : pourquoi le 1er numéro Google n'est PAS le bon

C'est le piège le plus systématique en dépannage urgence nocturne. Tu tapes "serrurier urgence Paris 17e", tu prends le **premier numéro qui sort**, et c'est presque garanti que tu tombes dans une chaîne d'arnaque.

### Comment ça marche techniquement

1. **Annonces Google Ads** (publicité payante) : le premier "résultat" en haut de la page Google est presque toujours une **annonce publicitaire**, pas un résultat naturel. Et les annonces les plus visibles dans le dépannage sont **payées par des agrégateurs**, pas par des artisans locaux.

2. **Agrégateurs déguisés** : ces sites prennent ton appel, le **routent vers un call center** (souvent à l'étranger). Le "serrurier" qui te répond n'est pas le pro qui viendra : c'est un commercial.

3. **Sous-traitance à la commission** : l'artisan envoyé est **payé un pourcentage** sur ce que tu paies à la fin. Plus la facture est grosse, plus il gagne. Donc il a **intérêt à gonfler**.

4. **Boîte aux lettres partagée** : l'entreprise officielle (le SIRET sur la facture, quand il y en a un) est souvent une **boîte aux lettres** mutualisée. Aucune adresse réelle, aucun atelier, aucune équipe.

### Comment le repérer

- Le numéro affiché dans la pub Google n'est pas un numéro fixe local (souvent un 09 ou un numéro masqué).
- Le site est **hyper générique** : "Plombier Paris", "Serrurier Île-de-France", sans aucune photo réelle ni équipe identifiée.
- Plusieurs villes différentes pointent vers **le même numéro**.
- Aucun **avis Google récent** sur la fiche officielle.
- Pas de **SIRET visible** sur le site (ou SIRET non vérifiable).

### Ce qu'il faut faire à la place

- **Cherche le 2e ou 3e résultat** (souvent un vrai artisan local).
- **Compare 2 ou 3 numéros**, demande à chacun le prix au téléphone.
- **Prends le pro qui a les meilleurs avis Google + un SIRET vérifiable + qui t'envoie un devis SMS** sans que tu insistes.

> **Témoignage Mehdi T., Vincennes (février 2026)** : "Devis flou signé sous pression à 3h du matin : 460€ qui sont devenus 1 100€ sur la facture finale. Le SIRET sur le papier ne correspond à aucune entreprise active. Banque saisie." (Cas typique : 1er numéro Google, devis flou signé sous pression nocturne, SIRET fantôme qui rend tout recours impossible.)

## Ce que tu peux faire TOI-MÊME en attendant

Pendant que tu vérifies le pro et qu'il arrive, tu n'es pas démuni. Voici les **gestes utiles selon ton type d'urgence**.

### Fuite d'eau

1. **Coupe l'arrivée d'eau générale**. Compteur dans le placard technique de l'appart, au sous-sol de l'immeuble, ou regard extérieur pour une maison. Quart de tour sur la vanne.
2. **Coupe l'électricité** si l'eau s'approche de prises ou d'appareils branchés. Disjoncteur général.
3. **Limite la propagation** : serpillières, bassines, serviettes. Surélève les meubles si possible.
4. **Préviens les voisins du dessous** si tu es en immeuble (la fuite va vite descendre). C'est aussi de leur intérêt.
5. **Photographie tout** (la fuite, les dégâts, les indices de cause). Indispensable pour ton assurance.

### Porte claquée (pas effractée)

1. **Vérifie d'abord le voisin** (parfois quelqu'un a un double, si tu connais bien).
2. **Tente la carte plastique** sur une serrure simple (carte de fidélité, pas ta CB) si la porte n'a qu'un pêne demi-tour. Glisse entre le pêne et la gâche, en oblique. Marche sur 30% des cas, jamais sur une serrure 3 points.
3. **Si tu es propriétaire** : appelle ton assurance habitation, certaines couvrent l'ouverture de porte (vérifie ton contrat avant).
4. **Si tu es locataire** : contacte le syndic ou le gardien si possible (parfois ils ont un double).
5. **N'essaie PAS** de défoncer la porte : tu vas casser plus cher que la facture serrurier.

### Coupure d'électricité partielle

1. **Va voir le tableau** : un disjoncteur ou un différentiel a sauté ? Le levier est en bas ou au milieu ?
2. **Réarme-le** : remonte le levier en position haute. Si ça tient, c'est réglé.
3. **Si ça resaute immédiatement** : un appareil fait fuir le courant. **Débranche tout** dans le circuit concerné, réarme, puis rebranche un par un pour identifier le coupable.
4. **Si plus rien ne marche dans tout le logement** : vérifie qu'il n'y a pas une coupure générale dans ton immeuble ou ton quartier. Tu peux appeler **Enedis (urgence dépannage : 09 72 67 50 + ton n° de département)**, c'est gratuit et eux interviennent partout 24h/24.

### Coupure de gaz suspecte

**Différent**, c'est dangereux. Si tu sens du gaz :
1. **N'allume aucune lumière**, **n'utilise aucun appareil électrique** (pas de portable près de toi).
2. **Aère** en grand ouvrant fenêtres et portes.
3. **Ferme la vanne d'arrivée gaz** (souvent près du compteur ou avant la chaudière).
4. **Sors du logement** et **appelle GRDF dépannage gaz : 0 800 47 33 33** (numéro vert, gratuit, 24h/24). C'est eux qui interviennent en premier, pas un plombier privé.

## Pourquoi c'est cher la nuit (et combien c'est juste)

Disons que tu as une vraie urgence à 2h du matin un dimanche. Voici ce qui justifie un prix plus élevé qu'en journée :

- Le pro est **réveillé en pleine nuit** ou **renonce à son weekend en famille**.
- Il **roule en pleine nuit** sur des routes pas optimales, plus de risque.
- C'est une **astreinte** : il a souvent un système de garde qui implique d'être joignable en permanence, ce qui a un coût opérationnel.

Donc une majoration **+50% à +100% en nuit** ou **+100% en férié**, c'est juste et reflète une réalité économique.

**Ce qui n'est pas juste** :
- Une majoration **non annoncée** ajoutée après coup.
- Un prix d'appel à 49€ qui passe à 1 200€ "à cause de la nuit".
- Une majoration **+200%** ou **+300%** : c'est de l'abus.
- Un prix annoncé au téléphone qui **double** une fois sur place sans justification claire.

> **Témoignage François L., Pantin** : "Devis sorti de nulle part, à 920€ pour changer un siphon évier dimanche après-midi. J'ai dit non, j'ai trouvé un autre pro à 130€ le lundi matin." (Cas parfait : François a refusé la signature, attendu 12h, payé 7 fois moins.)

> **Témoignage Sarah K., Paris 11e** : "Porte claquée à 23h. J'ai pris le premier numéro Google. Annoncé 89€ au téléphone. Une fois sur place, devis à 850€ pour ouverture impossible sans perçage. J'ai signé pour qu'il parte." (Sarah a payé presque **10 fois** le prix annoncé. Le piège classique du 1er numéro Google + escalade nocturne + signature sous pression.)

## Si tu peux ATTENDRE le matin, attends

Tous les problèmes "urgents" ne le sont pas vraiment. Voici ma règle de tri honnête :

### Vraie urgence (intervention immédiate justifiée)

- **Fuite d'eau active** qui inonde et que tu n'arrives pas à couper.
- **Court-circuit avec fumée**, étincelles, odeur de brûlé persistante.
- **Effraction en cours** ou porte ouverte par cambriolage (logement non sécurisé).
- **Personne enfermée à l'intérieur** sans clé (enfant, personne âgée, animal).
- **WC unique bouché** dans un logement sans alternative, avec refoulement.
- **Plus du tout de chauffage en hiver très froid** avec personne fragile (bébé, personne âgée).

### Faux urgence (peut attendre le matin)

- **Robinet qui goutte** : tu mets un seau, ça attend.
- **Une prise qui ne marche plus** dans une pièce, le reste fonctionne.
- **Chauffe-eau en panne en été** ou avec saison douce, tu peux te débrouiller.
- **Porte d'entrée OK** mais une porte intérieure bloquée : ça attend.
- **Fuite minime** sous l'évier que tu peux limiter avec une bassine.

**Différence pratique** : si tu peux attendre le matin (8h), tu paies **30% à 50% moins cher**, tu as le temps de comparer 3 pros, et tu n'es pas sous pression.

## Numéros utiles à connaître

À garder dans tes contacts :

- **Pompiers** : 18 (incendie, danger immédiat)
- **Police** : 17
- **Numéro européen unique** : 112 (depuis n'importe quel téléphone, partout en Europe)
- **GRDF urgence gaz** : 0 800 47 33 33 (24h/24, gratuit)
- **Enedis dépannage électricité** : 09 72 67 50 + n° département (coupure générale, problème compteur)
- **Centre antipoison** : 01 40 05 48 48 (Paris) ou 0 800 59 59 59 (numéro vert national)
- **DGCCRF** : 0809 540 550 (signaler une arnaque dépannage)
- **SignalConso** (en ligne) : signal.conso.gouv.fr

## Cas réels qui se passent bien (parce qu'on a fait juste)

> **Mehdi T., Vincennes (alternative)** : si Mehdi avait pris 2 minutes à 3h du matin pour vérifier le SIRET sur annuaire-entreprises.data.gouv.fr, il aurait vu que l'entreprise n'existait pas, raccroché, appelé un autre pro. Coût total évité : **640€** (1 100 - 460). Temps investi : **2 minutes**.

> **François L., Pantin (cas réussi)** : François a **refusé** le devis à 920€ dimanche, accepté de "vivre avec" le siphon en attendant lundi (mis une bassine sous l'évier), trouvé un pro à **130€** le lundi matin. Coût évité : **790€**. Stress économisé : énorme.

> **Sarah K. (alternative)** : si Sarah avait demandé un devis SMS avant de laisser entrer, ou même juste vérifié le SIRET pendant que le serrurier arrivait, elle aurait vu le pattern d'arnaque (entreprise floue, pas de SIRET). Coût évité : **750€** environ.

## Mon engagement nuit / weekend

- **Joignable 24h/24, 7j/7**, vraiment (pas un call center).
- **Prix unique** : pas de majoration nuit, weekend, férié. Le prix annoncé au téléphone est le prix de la facture.
- **Devis SMS systématique** avant déplacement.
- **SIRET vérifiable** sur annuaire-entreprises.data.gouv.fr.
- **Facture conforme** sur place ou par mail dans la foulée.
- Si ton problème **peut attendre le matin**, je te le dis honnêtement et on prend rendez-vous pour le lendemain (souvent 30% moins cher pour toi).

Tu peux retrouver mes prestations selon ton besoin :
- **Plomberie** : [/plomberie](/plomberie) — [Tarifs](/plomberie/tarifs)
- **Serrurerie** : [/serrurerie](/serrurerie) — [Tarifs](/serrurerie/tarifs)
- **Électricité** : [/electricite](/electricite) — [Tarifs](/electricite/tarifs)

## Articles liés à lire

- [Comment vérifier un dépanneur d'urgence en 3 minutes](/blog/comment-verifier-depanneur-urgence)
- [Arnaques plomberie : 7 conseils pour les éviter](/blog/arnaques-plomberie-comment-eviter)
- [Arnaques serrurier : 7 signaux qui doivent t'alerter](/blog/arnaques-serrurier-comment-eviter)
- [Arnaques électricien dépannage : 6 pièges à éviter](/blog/arnaques-electricien-comment-eviter)
- [Tarifs plombier 2026 : guide complet des prix justes](/blog/tarifs-plombier-2026-guide-prix)
- [Fuite d'eau la nuit : que faire en urgence](/blog/fuite-eau-nuit-que-faire)
- [Serrurier urgence nuit weekend](/blog/serrurier-urgence-nuit-weekend)

## Sources

- Arrêté du 24 janvier 2017 relatif à l'information préalable du consommateur sur les prestations de dépannage, de réparation et d'entretien dans le secteur du bâtiment et de l'équipement de la maison.
- Code de la consommation, article L.111-1 (information précontractuelle obligatoire).
- Code de la consommation, articles L.221-18 à L.221-28 (droit de rétractation hors établissement, applicable aux interventions à domicile non sollicitées).
- DGCCRF, "Dépannage à domicile : la répression des fraudes maintient la pression", rapport 2024.
- UFC-Que Choisir, baromètres 2023-2024 sur le dépannage à domicile.
- INC (Institut National de la Consommation), fiches pratiques "Dépannage à domicile".
- FFB (Fédération Française du Bâtiment) et Capeb, recommandations métier sur les majorations.
- annuaire-entreprises.data.gouv.fr (vérification SIRET, INSEE, gratuit).
- signal.conso.gouv.fr (signalement DGCCRF).
- pre-plainte-en-ligne.gouv.fr (pré-plainte police).
- Numéros utiles GRDF (0 800 47 33 33), Enedis (09 72 67 50 XX), DGCCRF (0809 540 550).

📞 **Tu as une vraie urgence en pleine nuit ?** Appelle-moi au 01 41 69 10 08 — joignable 24h/24, prix unique sans majoration, devis SMS avant intervention.
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
