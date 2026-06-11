import type { PremiumPageContent } from "../types";

export const content: PremiumPageContent = {
  trade: "plombier",
  citySlug: "coulommiers",
  serviceSlug: "ballon-eau-chaude",
  authorPersona: "mehdi-karim",
  publishedAt: "2026-06-09",
  updatedAt: "2026-06-09",
  metaTitle: "Ballon eau chaude Coulommiers : dépannage dès 129€, 24h/24",
  metaDescription:
    "Ballon d'eau chaude en panne à Coulommiers ? Diagnostic et dépannage dès 129€ TTC, 0 majoration nuit ni week-end, prix fixe annoncé avant. 01 41 69 10 08.",
  h1: "Ballon d'eau chaude à Coulommiers : ce que l'eau de la Brie fait vraiment à votre cumulus",
  introParagraph: `Un mardi de fin d'hiver, j'arrive chez un client dans le quartier de Vaux, à Coulommiers. Pavillon des années 80, ballon de 200 litres dans le cellier, plus d'eau chaude depuis trois jours. La veille, un dépanneur trouvé sur internet lui avait annoncé la couleur : cuve morte, remplacement complet, 1 850 euros. Le client a eu le bon réflexe : il a demandé un deuxième avis. J'ai sorti le multimètre, mesuré la résistance, déposé le capot. Verdict : résistance entartrée, thermostat de sécurité déclenché. Une heure et demie de travail, un détartrage, une résistance neuve. Le ballon est reparti pour des années.

Je m'appelle Mehdi Karim, plombier-chauffagiste depuis 28 ans, formé chez les Compagnons du Devoir. Des ballons d'eau chaude, j'en ai diagnostiqué des milliers, du cumulus de studette au préparateur de chaufferie collective. Et je peux vous dire une chose : à Coulommiers, ville de presque 16 000 habitants selon l'INSEE (populations légales 2022, recensement publié fin 2024), le premier ennemi de votre ballon n'est ni la marque ni l'âge. C'est l'eau. Le contrôle sanitaire de l'ARS classe l'eau distribuée ici parmi les eaux dures, avec un titre hydrotimétrique relevé entre 15 et 30 °f selon les secteurs. Concrètement : du calcaire qui se dépose sur la résistance et au fond de la cuve, chauffe après chauffe.

Cette page, je l'ai écrite pour les Columériens — du centre ancien traversé par les bras du Grand Morin jusqu'aux pavillons de Vaux et aux immeubles des Templiers. Vous y trouverez ma méthode de diagnostic, ma grille de décision réparer/remplacer, les vrais prix, et les pièges à éviter. Le réseau Joël intervient à Coulommiers **dès 129€ TTC**, avec un **prix fixe annoncé avant intervention** et **0 majoration nuit, week-end ou jour férié**, au **01 41 69 10 08**.`,
  sections: [
    {
      anchor: "eau-dure-coulommiers-usure-ballon",
      title: "Une eau entre 15 et 30 °f : pourquoi les ballons columériens s'usent plus vite",
      body: `Quand j'arrive chez un client à Coulommiers, la première chose que je regarde, ce n'est pas le ballon. C'est la bouilloire de la cuisine. Si elle est blanchie par le tartre, je sais déjà à quoi ressemble la résistance du cumulus. Et à Coulommiers, les bouilloires parlent.

Reprenons les faits. La dureté d'une eau se mesure en degrés français (°f) : c'est sa teneur en calcium et en magnésium. En dessous de 15 °f, l'eau est douce. Au-dessus de 25 °f, elle est franchement dure. Les relevés du contrôle sanitaire (données ARS publiées sur le portail du ministère de la Santé) situent l'eau de Coulommiers **entre 15 et 30 °f selon les secteurs et les périodes** : une eau dure, typique de la Brie et de ses nappes calcaires. C'est l'eau des forages de la plaine des Capucins et de la source de la Roche qui alimente la ville, distribuée par la SAUR pour le compte de Coulommiers Pays de Brie Agglomération.

Pourquoi ça concerne directement votre ballon ? Parce que le calcaire précipite avec la chaleur. Plus l'eau chauffe, plus le carbonate de calcium se dépose — d'abord sur la résistance, qui est l'élément le plus chaud, ensuite au fond de la cuve, en couche compacte. Une résistance engainée de tartre chauffe de plus en plus mal : le tartre isole, le temps de chauffe s'allonge, la consommation électrique grimpe, et la résistance finit par surchauffer localement jusqu'à griller ou faire déclencher la sécurité. En 28 ans de métier, j'ai sorti des résistances de ballons briards qui ressemblaient à des stalagmites. Certaines avaient cinq ans à peine.

Il y a tout de même une bonne nouvelle locale, et elle mérite d'être citée parce qu'elle est rare : la ville a mis en service en 2022 une **unité de traitement de l'eau potable avenue de Rebais** — un chantier d'environ 13,6 millions d'euros, subventionné à 60 % par le Département de Seine-et-Marne et l'Agence de l'eau, d'après les informations publiées par la mairie de Coulommiers. Sa filière de traitement à la chaux (coagulation, floculation, décantation, puis filtres à sable) réduit la dureté de l'eau des forages : c'est de la décarbonatation, autrement dit du calcaire retiré avant qu'il n'arrive chez vous.

Attention toutefois à deux choses. Un : réduire la dureté ne veut pas dire eau douce — on reste sur une eau calcaire, simplement moins agressive qu'avant. Deux : votre ballon, lui, a peut-être dix ans de dépôts accumulés *avant* 2022. L'usine neuve ne détartre pas l'existant. Le tartre qui tapisse votre cuve y restera tant que personne ne l'en sortira. C'est exactement pour ça que le diagnostic, à Coulommiers plus qu'ailleurs, doit toujours précéder le devis.`,
    },
    {
      anchor: "diagnostic-panne-ballon-methode",
      title: "Plus d'eau chaude : ma méthode de diagnostic, dans l'ordre, sans rien démonter au hasard",
      body: `Un ballon d'eau chaude, électriquement parlant, c'est simple : une cuve, une résistance, un thermostat, un groupe de sécurité, et souvent un contacteur heures creuses au tableau. Quand il n'y a plus d'eau chaude, la panne se cache dans l'un de ces cinq éléments. Le travail du plombier, c'est de trouver lequel — par la mesure, pas au pifomètre. Un Compagnon vous dirait la même chose : on ne condamne jamais une cuve sans avoir mesuré la résistance.

Voici comment je procède, étape par étape, chez un client columérien.

**D'abord, j'écoute.** Eau complètement froide ou juste tiède ? Depuis quand ? Le disjoncteur a-t-il sauté ? Y a-t-il eu une coupure de courant récente, des travaux ? Cinq minutes de questions m'évitent souvent trente minutes de fausses pistes. Une eau tiède qui se refroidit de semaine en semaine raconte une histoire (résistance qui s'entartre) très différente d'une eau glacée du jour au lendemain (alimentation coupée, sécurité déclenchée).

**Ensuite, le tableau électrique.** Je vérifie le disjoncteur dédié au ballon et le contacteur jour/nuit. Beaucoup de pannes "de ballon" à Coulommiers sont en réalité des pannes de contacteur heures creuses : le petit boîtier qui enclenche la chauffe la nuit reste bloqué, le ballon ne reçoit plus de courant, et tout le monde accuse le cumulus. Test simple : position "marche forcée". Si l'eau chauffe en forcé mais pas en automatique, le ballon est innocent.

**Puis, le ballon lui-même, courant coupé.** Disjoncteur sur off — on ne travaille jamais sous tension sur un capot de cumulus. Je dépose le capot, je contrôle le thermostat et son bouton de sécurité réarmable : s'il a déclenché, je cherche *pourquoi* avant de réarmer, parce qu'une sécurité qui saute signale presque toujours une résistance entartrée qui surchauffe. Je mesure la résistance à l'ohmmètre : une valeur cohérente, c'est une résistance vivante ; un circuit ouvert, elle est grillée ; une fuite à la terre, et c'est elle qui fait disjoncter votre différentiel.

**Enfin, l'hydraulique.** Le groupe de sécurité (taré à 7 bars) : goutte-t-il en continu, même hors chauffe ? Est-il entartré, grippé ? Et la cuve : des traces de rouille ou d'humidité sous la jaquette, une flaque récurrente sous le ballon en dehors de l'évacuation du groupe ? Là, et seulement là, on parle de cuve percée.

Ce diagnostic complet prend 30 à 45 minutes. Chez Joël, il est compris dans l'intervention, **dès 129€ TTC dépannage inclus** pour les pannes courantes — et le prix vous est annoncé au téléphone, avant que l'artisan ne monte dans son fourgon. Pas après, pas "selon ce qu'on trouve". Avant. C'est le principe, et il ne souffre aucune exception, à 14h un jeudi comme à 2h du matin un dimanche.`,
    },
    {
      anchor: "reparer-ou-remplacer-grille-decision",
      title: "Réparer ou remplacer : la grille de décision que j'applique (et que personne ne devrait vous cacher)",
      body: `La question à 1 500 euros, c'est celle-là. Et c'est précisément sur elle que se jouent la plupart des abus : faire passer une panne réparable pour une condamnation définitive. Voici ma grille, celle que j'applique sur le terrain à Coulommiers, et que je vous donne pour que vous puissiez vérifier ce qu'on vous raconte.

**Cas n°1 : la cuve fuit. On remplace, point.** Une cuve, c'est de l'acier émaillé. Quand la corrosion l'a percée — fuite par le bas de la jaquette, rouille sur le calorifuge, flaque qui revient — aucune réparation ne tient. On ne ressoude pas une cuve émaillée, et quiconque vous propose un "colmatage" vous vend du vent. Remplacement, sur devis ferme, avec le modèle, la capacité et la pose détaillés noir sur blanc.

**Cas n°2 : tout le reste se répare.** Résistance grillée ou entartrée, thermostat mort, sécurité qui déclenche, groupe de sécurité qui coule, contacteur heures creuses bloqué, anode consumée : ce sont des pièces. Elles se changent, pour une fraction du prix d'un ballon neuf. Sur un ballon de moins de 8 ans, la réparation est presque toujours le bon choix économique. Entre 10 et 15 ans, je regarde l'état général : si la cuve est saine et l'anode encore présente, une résistance neuve prolonge la vie du ballon de plusieurs années.

**L'âge seul ne condamne rien.** J'ai vu à Coulommiers des cumulus de 18 ans en pleine forme dans des celliers secs de Vaux, et des ballons de 7 ans finis dans des caves humides du centre ancien. Ce qui compte : l'état de la cuve, la fréquence des pannes, l'anode. Une anode magnésium, c'est la pièce sacrificielle qui se corrode à la place de la cuve ; quand elle est consumée et qu'on ne la remplace pas, la cuve prend le relais — et là, le compte à rebours démarre.

**Si on remplace, on remplace intelligemment.** Dans une ville d'eau dure comme Coulommiers, je déconseille la résistance blindée, en contact direct avec l'eau : c'est elle qui s'entartre le plus vite. Je préconise la **résistance stéatite**, logée dans un fourreau émaillé à l'abri de l'eau — elle se change d'ailleurs sans vidanger la cuve — ou mieux, un ballon à **protection ACI hybride**, dont l'anode à courant imposé protège durablement la cuve contre la corrosion. Pour la capacité, la règle d'usage reste une cinquantaine de litres par occupant : un 200 litres pour un foyer de quatre, un 150 pour un couple. Surdimensionner, c'est chauffer de l'eau pour rien ; sous-dimensionner, c'est la douche froide le dimanche soir.

Mon client de Vaux, celui du devis à 1 850 euros ? Sa cuve était saine. Résistance stéatite neuve, détartrage, contrôle de l'anode : il a payé moins du sixième de ce qu'on voulait lui facturer. Sa seule erreur aurait été de ne pas demander un deuxième avis.`,
    },
    {
      anchor: "bati-coulommiers-vaux-templiers-centre-ancien",
      title: "Centre ancien, Vaux, Templiers, hameaux : où vivent les ballons de Coulommiers",
      body: `On ne dépanne pas un ballon de la même façon selon l'endroit où il est posé. Et à Coulommiers, le bâti est tout sauf uniforme. La ville s'étire sur une dizaine de kilomètres carrés, du fond de la vallée du Grand Morin jusqu'au plateau briard, et chaque secteur a ses configurations — donc ses pannes types.

**Le centre ancien, le long des bras du Grand Morin.** Le cœur historique de Coulommiers s'est construit sur la rivière et ses dérivations — le Grand Morin, la Fausse Rivière — entre la place du marché, le parc des Capucins et la Commanderie des Templiers, l'un des ensembles templiers les mieux conservés du nord de la Loire (fondé vers 1172-1173, pour les amateurs d'histoire). Côté plomberie, ça veut dire des maisons de ville anciennes, des caves et des rez-de-chaussée proches de la nappe, de l'humidité ambiante. Les ballons installés en cave y vieillissent mal : groupe de sécurité oxydé, raccords corrodés, jaquette piquée de rouille. Autre réalité du bâti ancien : les escaliers étroits. Descendre un 200 litres mort et remonter le neuf dans une cage d'escalier du XVIIIe, ça se prépare — c'est aussi pour ça qu'un devis sérieux se fait après avoir vu (ou compris) la configuration, pas au doigt mouillé.

**Les Templiers, au nord.** Entre le centre historique et le hameau du Theil, le quartier des Templiers aligne le bâti collectif des décennies d'après-guerre ; il fait aujourd'hui l'objet de réflexions de renouvellement urbain (il a été retenu dans la consultation nationale "Quartiers de demain", fiche de site 2024). Dans ces immeubles, le ballon vit en placard, dans la cuisine ou l'entrée. Pannes types : contacteur heures creuses fatigué, groupe de sécurité qui goutte sur le voisin du dessous, ballon d'origine jamais détartré. L'avantage du collectif : l'accès est simple et l'intervention rapide.

**Vaux et le pavillonnaire.** Au sud et à l'ouest, les lotissements pavillonnaires des années 1970-1990 — le quartier de Vaux en tête, desservi par les lignes A et B du Coul'Bus — logent leurs cumulus au cellier, au garage, parfois dans les combles. Configurations saines et accessibles, mais attention aux ballons de combles : une cuve qui lâche là-haut, c'est un dégât des eaux qui traverse toute la maison. Si votre ballon a plus de douze ans et habite sous votre toit, faites contrôler la cuve avant qu'elle ne décide à votre place.

**Les hameaux et le plateau.** Vers le Theil et les écarts briards, on trouve les longères et fermes réhabilitées : grandes capacités, réseaux longs, et de l'eau qui vient des mêmes nappes calcaires. Le tartre n'épargne personne ici.

Pour la couverture : Coulommiers est en bout de branche de la **ligne P du Transilien** (Paris-Est à environ une heure) et reliée à l'ouest francilien par la D934. Les artisans Joël du secteur est de la Seine-et-Marne couvrent la ville et ses hameaux, du quartier de la gare à l'hôpital René-Arbeltier, 24h/24 — au même tarif le dimanche qu'un mardi après-midi.`,
    },
    {
      anchor: "vrais-prix-arnaque-cumulus-condamne",
      title: "Les vrais prix à Coulommiers — et l'arnaque du cumulus condamné d'office",
      body: `Parlons argent, franchement, parce que c'est là que les Columériens se font plumer. Le scénario, je l'entends plusieurs fois par mois : annonce en ligne alléchante — "dépannage chauffe-eau 49€" —, technicien qui arrive sans outillage de mesure, trois regards sur le ballon, et la sentence tombe : "la cuve est morte, il faut tout changer". Devis griffonné : 1 900 à 2 800 euros pour un ballon d'entrée de gamme posé, payable de préférence tout de suite. Aucune mesure de la résistance, aucun contrôle du thermostat, aucune trace écrite du diagnostic. Dans une ville où le calcaire fait effectivement souffrir les ballons, l'argument "c'est foutu, c'est le calcaire" passe d'autant plus facilement. C'est ce qui a failli arriver à mon client de Vaux.

Voici comment le réseau Joël travaille à Coulommiers, et pourquoi je peux mettre ces chiffres par écrit :

- **Diagnostic + dépannage courant : dès 129€ TTC.** Déplacement, diagnostic complet à l'appareil de mesure, et réparation des pannes simples (réarmement sécurité après identification de la cause, remplacement de thermostat, reprise de raccord). Le tarif vous est annoncé au téléphone, avant l'intervention.
- **Détartrage et remplacement de résistance : annoncé avant, autour de 189€ TTC** selon le modèle (blindée ou stéatite) — pièces comprises, pas de "supplément découverte" une fois le capot ouvert.
- **Remplacement de groupe de sécurité : dès 89€ TTC.**
- **Remplacement complet d'un ballon : sur devis ferme, écrit, détaillé** — marque, capacité, type de résistance, reprise des raccords, enlèvement de l'ancien. Le devis signé est le prix payé.
- **0 majoration, jamais.** Ni la nuit, ni le week-end, ni les jours fériés. Le 129€ de 15h reste 129€ à minuit.

Et vos armes légales, parce qu'elles existent : l'**arrêté du 24 janvier 2017** impose au professionnel du dépannage à domicile la remise d'un devis avant travaux — quelqu'un qui commence à démonter sans rien vous faire signer est déjà en faute. Exigez une facture avec SIRET et détail des prestations. Vérifiez l'entreprise sur sirene.fr, trente secondes suffisent. En cas d'abus, signalez sur signal.conso.gouv.fr (la plateforme de la DGCCRF) — les dossiers s'y accumulent et finissent par aboutir. Et retenez le réflexe qui sauve : **avant d'accepter un remplacement, demandez la valeur mesurée de la résistance.** Un professionnel honnête vous la donne en ohms, sans se vexer. Un arnaqueur change de sujet.`,
    },
    {
      anchor: "entretien-ballon-eau-dure-duree-vie",
      title: "Faire durer son ballon dans une ville d'eau dure : quatre gestes, deux réglages",
      body: `Un ballon bien traité dépasse les quinze ans, même à Coulommiers. Un ballon livré à lui-même dans une eau à 25 °f tient parfois moitié moins. La différence ne coûte presque rien — la voici, du geste mensuel à la décision d'équipement.

**Réglage n°1 : la température, entre 50 et 55 °C.** C'est le compromis sanitaire et anticalcaire. En dessous de 50 °C, l'eau stagnante du ballon devient un terrain favorable aux bactéries, légionelles en tête. Au-dessus de 55-60 °C, le calcaire précipite nettement plus vite et la résistance s'engaine de tartre à vue d'œil. Beaucoup de ballons sortent d'usine réglés trop haut ; le curseur se trouve sous le capot — si vous n'êtes pas à l'aise avec un capot de cumulus, faites-le ajuster lors d'un passage d'entretien, ça prend cinq minutes.

**Geste n°1 : manœuvrer le groupe de sécurité une fois par mois.** Un quart de tour de la molette, l'eau s'évacue franchement, on referme. Ce geste chasse les dépôts du clapet et évite qu'il ne se grippe ou ne s'entartre en position fermée. Au passage, sachez lire ses symptômes : quelques gouttes pendant la chauffe, c'est normal (l'eau se dilate, le groupe évacue la surpression) ; un filet continu même ballon froid, c'est un clapet fatigué ou une pression de réseau trop haute — et ça se règle, parfois avec un simple réducteur de pression.

**Geste n°2 : le détartrage tous les deux à trois ans.** Vidange, ouverture, extraction du tartre de la cuve, contrôle de l'anode magnésium, remplacement du joint de bride. Sur une eau dure, c'est l'opération qui change tout : j'ai sorti plusieurs kilos de tartre de cuves columériennes qui n'avaient jamais été ouvertes. Une cuve propre, c'est une chauffe plus rapide, une facture d'électricité plus basse et une résistance qui dure.

**Geste n°3 : surveiller les signaux faibles.** Une eau qui met de plus en plus de temps à chauffer, un bruit de bouilloire ou de crépitement pendant la chauffe (c'est la vapeur qui se fraye un chemin dans le tartre), une eau brunâtre au premier tirage du matin (corrosion qui démarre), le différentiel qui saute quand le ballon s'enclenche (résistance qui fuit à la terre) : chacun de ces signes mérite un diagnostic avant de devenir une panne complète un dimanche soir.

**Et l'adoucisseur ?** Question fréquente depuis que la ville a investi dans sa décarbonatation. Mon avis de terrain : depuis la mise en service de l'unité de traitement en 2022, l'eau columérienne est moins chargée qu'avant, et l'adoucisseur n'est plus un réflexe automatique. Il garde son intérêt dans les secteurs où le TH reste haut et pour les grosses consommations — mais c'est un appareil qui exige son propre entretien (sel, désinfection, contrôle du réglage) ; mal suivi, il cause plus de problèmes qu'il n'en résout. Faites mesurer votre TH réel au robinet avant d'investir, pas sur catalogue.

Et si malgré tout l'eau chaude vous lâche : le **01 41 69 10 08** répond 24h/24, le prix est fixé avant l'intervention, et il ne bougera pas — c'est le contrat, à Coulommiers comme partout où le réseau Joël intervient.`,
    },
  ],
  vraisPrix: [
    {
      service: "Diagnostic + dépannage ballon d'eau chaude à Coulommiers",
      prixJoel: 129,
      prixArnaqueur: "49€ annoncé → 480-900€ facturé",
      pourquoi:
        "Une panne d'eau chaude courante (thermostat, sécurité déclenchée, contacteur heures creuses) se diagnostique à l'appareil de mesure en 30-45 minutes et se règle dans la foulée. Joël annonce dès 129€ TTC au téléphone, déplacement et diagnostic compris, du centre ancien aux Templiers et à Vaux. Le 49€ d'appel des plateformes sert d'hameçon : une fois sur place, la facture gonfle de 'suppléments' inventés.",
    },
    {
      service: "Détartrage de cuve + remplacement de résistance (eau dure de la Brie)",
      prixJoel: 189,
      prixArnaqueur: "69€ annoncé → 600-1 100€ facturé",
      pourquoi:
        "Avec un TH relevé entre 15 et 30 °f à Coulommiers, la résistance est la première victime du calcaire. La remplacer (stéatite de préférence) en détartrant la cuve et en contrôlant l'anode coûte autour de 189€ TTC pièces comprises, annoncé avant ouverture du capot. Méfiez-vous des 'détartrages haute pression' facturés au triple sans que la résistance ait jamais été mesurée à l'ohmmètre.",
    },
    {
      service: "Remplacement du groupe de sécurité qui fuit en continu",
      prixJoel: 89,
      prixArnaqueur: "39€ annoncé → 350-650€ facturé",
      pourquoi:
        "Un groupe de sécurité entartré ou au clapet fatigué se remplace en moins d'une heure, raccords compris : dès 89€ TTC chez Joël, même tarif le dimanche. Certains opérateurs profitent d'un simple goutte-à-goutte pour vendre un ballon complet 'par précaution'. Quelques gouttes pendant la chauffe sont normales ; seul un écoulement continu ballon froid justifie le remplacement de la pièce — pas du cumulus.",
    },
    {
      service: "Remplacement complet d'un ballon électrique 200 L (cuve percée)",
      prixJoel: 690,
      prixArnaqueur: "'forfait pose 99€' annoncé → 1 900-2 800€ facturés",
      pourquoi:
        "Quand la cuve est réellement percée, le remplacement s'impose — mais sur devis ferme et détaillé : marque, capacité, type de résistance (stéatite ou ACI hybride recommandés en eau dure), dépose de l'ancien. Chez Joël, comptez à partir de 690€ TTC posé selon modèle et configuration (les escaliers étroits du centre ancien, ça se prévoit). Le devis signé est la facture finale : zéro ligne ajoutée après coup.",
    },
  ],
  faqLocale: [
    {
      question:
        "La nouvelle usine de traitement de l'eau de l'avenue de Rebais a-t-elle réglé le problème du calcaire à Coulommiers ?",
      answer:
        "Elle l'a réduit, pas supprimé. L'unité mise en service en 2022 décarbonate l'eau des forages par traitement à la chaux : l'eau distribuée est moins dure qu'avant. Mais elle reste calcaire (TH relevé entre 15 et 30 °f selon les secteurs au contrôle sanitaire), et surtout, le tartre accumulé dans votre ballon avant 2022 y est toujours. Un cumulus de plus de cinq ou six ans jamais ouvert mérite un détartrage et un contrôle d'anode.",
    },
    {
      question:
        "Mon ballon fait sauter le disjoncteur différentiel dans mon pavillon du quartier de Vaux : c'est grave ?",
      answer:
        "C'est le symptôme classique d'une résistance blindée percée par le tartre : l'eau entre en contact avec l'élément chauffant et fuit à la terre, le différentiel coupe. Ce n'est pas une condamnation du ballon — la résistance se remplace, et c'est l'occasion de passer en stéatite, mieux armée contre l'eau dure briarde. Surtout, ne neutralisez jamais le différentiel pour 'faire tenir' : il vous protège de l'électrocution. Appelez le 01 41 69 10 08, diagnostic à l'ohmmètre dès 129€ TTC.",
    },
    {
      question:
        "Plus d'eau chaude le matin, mais elle revient quand je mets le compteur en 'marche forcée' : le ballon est mort ?",
      answer:
        "Probablement pas. Si la chauffe fonctionne en marche forcée mais pas en automatique, le coupable est presque toujours le contacteur heures creuses de votre tableau électrique, pas le cumulus. C'est une panne fréquente dans les logements des Templiers et du centre, où les tableaux d'origine ont de l'âge. La marche forcée est un excellent test à faire avant d'appeler — et si c'est bien le contacteur, l'intervention est simple et le prix annoncé avant.",
    },
    {
      question:
        "Mon ballon est dans une cave humide du centre ancien, près des bras du Grand Morin : que surveiller ?",
      answer:
        "L'humidité des caves du centre historique attaque l'extérieur du ballon : groupe de sécurité oxydé, raccords corrodés, jaquette rouillée. Surveillez les traces de rouille sous l'appareil et manœuvrez le groupe de sécurité chaque mois pour éviter qu'il ne se grippe. Si un remplacement s'annonce, signalez l'accès (escalier étroit, cave voûtée) dès l'appel : le devis ferme en tient compte, et il n'y aura pas de 'supplément manutention' surprise le jour J.",
    },
    {
      question:
        "Le ballon lâche un dimanche soir à Coulommiers : je paie une majoration week-end ?",
      answer:
        "Non. C'est l'engagement central du réseau Joël : 0 majoration nuit, week-end ou jour férié. Le dépannage ballon d'eau chaude reste dès 129€ TTC un dimanche à 22h comme un mardi à 14h, et le prix est annoncé au téléphone avant le départ de l'artisan. Les artisans du secteur est de la Seine-et-Marne couvrent Coulommiers et ses hameaux 24h/24 au 01 41 69 10 08. Méfiez-vous des '+50 % le week-end' : c'est précisément là que les factures dérapent.",
    },
    {
      question:
        "Je suis locataire à Coulommiers : le dépannage du ballon, c'est pour moi ou pour le propriétaire ?",
      answer:
        "L'entretien courant revient au locataire : manœuvre du groupe de sécurité, remplacement de joints, détartrage périodique (décret n° 87-712 sur les réparations locatives). Le remplacement du ballon ou d'une pièce hors d'usage par vétusté — résistance morte, cuve percée, thermostat HS — revient au propriétaire. En pratique : prévenez-le par écrit avant l'intervention, et demandez à l'artisan de noter la cause sur la facture. Le constat 'cuve percée par corrosion' de Joël sert de justificatif pour la prise en charge.",
    },
  ],
  temoignages: [
    {
      auteur: "Pascal D.",
      quartierOuRue: "Quartier de Vaux",
      date: "2026-02-11",
      rating: 5,
      serviceRendered: "Détartrage + remplacement résistance stéatite",
      texte:
        "Un premier dépanneur m'annonçait le ballon mort et 1 800€ de remplacement. L'artisan Joël a mesuré la résistance devant moi, sorti un seau de tartre de la cuve et posé une stéatite neuve. Prix annoncé au téléphone, respecté à l'euro. L'eau chaude est revenue le soir même et chauffe plus vite qu'avant.",
    },
    {
      auteur: "Nathalie R.",
      quartierOuRue: "Centre-ville, rue Gabriel-Péri",
      date: "2026-04-26",
      rating: 5,
      serviceRendered: "Dépannage ballon un dimanche (contacteur heures creuses)",
      texte:
        "Plus d'eau chaude un dimanche matin. Au téléphone, on m'a fait tester la marche forcée : l'eau chauffait, donc contacteur en cause. Intervention l'après-midi même, contacteur changé, et surtout aucune majoration dimanche — j'avoue que je n'y croyais pas avant de voir la facture. Sérieux et pédagogue.",
    },
    {
      auteur: "Jean-Marc T.",
      quartierOuRue: "Quartier des Templiers",
      date: "2026-01-08",
      rating: 4,
      serviceRendered: "Remplacement ballon 150 L, cuve percée",
      texte:
        "Cuve rouillée qui fuyait sur le palier, ballon d'origine de l'immeuble. Devis ferme détaillé avant travaux, ballon ACI hybride posé proprement, ancien cumulus évacué. Petit délai d'attente pour la pose (deux jours, pièce à commander), d'où la quatrième étoile, mais zéro surprise sur le prix et un vrai travail soigné.",
    },
  ],
  internalLinks: [
    { url: "/plomberie", anchor: "tous les services plomberie du réseau Joël en Île-de-France" },
    {
      url: "/plombier/melun",
      anchor: "plombier à Melun, préfecture de Seine-et-Marne",
      contexte: "Le réseau couvre tout le 77, de la Brie au sud du département.",
    },
    {
      url: "/plombier/chelles",
      anchor: "plombier à Chelles, dans le nord de la Seine-et-Marne",
    },
    {
      url: "/plombier/pontault-combault",
      anchor: "plombier à Pontault-Combault",
    },
    {
      url: "/electricite",
      anchor: "dépannage électricité 24h/24 (contacteur heures creuses, tableau)",
      contexte: "Quand la panne d'eau chaude vient du tableau électrique et pas du ballon.",
    },
  ],
  tags: [
    "coulommiers",
    "77120",
    "seine-et-marne",
    "ballon-eau-chaude",
    "cumulus",
    "chauffe-eau",
    "calcaire",
    "eau-dure",
    "detartrage",
    "resistance-steatite",
    "groupe-securite",
    "vaux",
    "templiers",
    "grand-morin",
    "urgence-24h",
  ],
};
