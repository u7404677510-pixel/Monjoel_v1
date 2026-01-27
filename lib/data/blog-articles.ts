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

📞 **Besoin d'un plombier maintenant ?** Appelez le 01 72 68 22 02
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

📞 **Porte claquée ?** Appelez le 01 72 68 22 02 - Intervention en 30 min
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

📞 **Disjoncteur qui saute ?** Appelez le 01 72 68 22 02 - Électricien 24h/24
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

📞 **Besoin d'un serrurier honnête ?** Appelez le 01 72 68 22 02
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

📞 **Un plombier de confiance ?** Appelez le 01 72 68 22 02
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
