import type { PremiumPageContent } from "../types";

export const content: PremiumPageContent = {
  trade: "electricien",
  citySlug: "croissy-sur-seine",
  authorPersona: "karim-benali",
  publishedAt: "2026-06-09",
  updatedAt: "2026-06-09",
  metaTitle: "Électricien Croissy-sur-Seine — Joël 59€, urgence 24h/24",
  metaDescription:
    "Électricien à Croissy-sur-Seine 24h/24 : prise HS dès 59€ TTC, prix fixe annoncé avant intervention, 0 majoration nuit & week-end. 01 41 69 10 08.",
  h1: "Électricien à Croissy-sur-Seine : lire un siècle d'installations, des villas de la Grenouillère aux résidences de la boucle",
  introParagraph: `Croissy-sur-Seine tient sur un peu plus de trois kilomètres carrés, calés dans la boucle de la Seine entre Chatou, Le Vésinet, Le Pecq et le pont de Bougival. Le dossier complet de l'INSEE (recensement 2022) y dénombre **10 580 habitants**, avec une particularité que peu de Croissillons connaissent : **31,1 % des logements de la commune ont été construits entre 1971 et 1990**, et environ **15 % datent d'avant 1945**. Pour un électricien, ces deux chiffres valent tous les discours. Ils signifient qu'un logement croissillon sur trois est né avant la généralisation du différentiel haute sensibilité 30 mA, et qu'un sur sept a connu l'époque des fusibles à broches et des conducteurs sous tube acier.

Je suis ingénieur électricien, diplômé de Centrale Paris, passé par six ans de bureau d'études puis quatre ans d'expertise judiciaire sur les sinistres électriques pour la Cour d'appel de Paris. Je forme aujourd'hui des installateurs dans le cadre de la qualification Qualifelec. Cette page n'est pas une brochure : c'est un cours accéléré sur l'électricité du parc croissillon, écrit pour que vous compreniez ce qui se passe derrière votre tableau avant de laisser entrer qui que ce soit chez vous.

Elle s'adresse à trois lecteurs. Celui dont la prise de la cuisine vient de rendre l'âme dans une résidence des années 1980 proche de la gare Chatou-Croissy. Celui dont le disjoncteur saute chaque soir dans une meulière des abords des berges. Et celui qui, après une recherche paniquée sur son téléphone, s'apprête à composer le numéro d'une plateforme de racolage qui transformera 59€ de réparation en 600€ de facture.

Le réseau Joël applique à Croissy-sur-Seine deux règles simples, et il ne déroge à aucune des deux : un **prix fixe annoncé avant intervention** — dès **59€ TTC** pour une prise ou un interrupteur hors service — et **zéro majoration de nuit, de week-end ou de jour férié**. Le numéro : **01 41 69 10 08**, 24h/24.`,
  sections: [
    {
      anchor: "parc-croissillon-quatre-generations-electriques",
      title: "Quatre générations électriques : ce que le recensement révèle des murs de Croissy",
      body: `Quand je forme de jeunes installateurs, je leur répète qu'une installation électrique se lit comme une carotte géologique : chaque époque de construction dépose sa strate, avec ses matériaux, ses protections et ses faiblesses propres. À Croissy-sur-Seine, le recensement INSEE 2022 fournit la coupe stratigraphique complète, et elle mérite qu'on s'y arrête avant de parler de pannes.

**Strate 1 — avant 1919 (10,2 % du parc).** Ce sont les villas de villégiature et les maisons du vieux village, héritières de l'époque où la commune était encore « la reine des marchés de Paris » pour son maraîchage, avant que les impressionnistes ne viennent peindre la Grenouillère. L'électricité y est arrivée après coup, posée en apparent puis reprise par couches successives. On y trouve encore, derrière des cloisons rénovées, des conducteurs à l'isolant fatigué, des dominos enfouis dans le plâtre et des circuits dont plus personne ne sait où ils passent.

**Strate 2 — 1919-1945 (4,9 %).** Pavillons d'entre-deux-guerres, souvent en meulière. Installations d'origine modestes (deux ou trois circuits pour toute la maison), presque toujours reprises depuis, mais rarement en totalité : la cuisine a été refaite, pas les chambres.

**Strate 3 — 1946-1990 (45,2 % à elles deux, dont 31,1 % pour la seule période 1971-1990).** C'est le cœur du sujet croissillon. Les résidences collectives et les pavillons de cette génération — la plus représentée de la commune, et de loin — ont été câblés proprement, selon les règles de leur temps. Le problème n'est pas la qualité d'exécution : c'est que les règles ont changé. La mise à la terre n'a été exigée dans toutes les pièces qu'à partir de 1991, et le différentiel 30 mA généralisé sur les circuits de prises qu'avec l'édition 2002 de la norme NF C 15-100. Un appartement croissillon de 1982 jamais retouché est donc, par construction, en retard de deux révisions normatives.

**Strate 4 — après 1990 (39,8 %).** Programmes récents, globalement conformes aux éditions modernes de la norme, passés par le visa du Consuel. Les pannes y existent, mais elles relèvent du composant défaillant ou de l'appareil branché, presque jamais de l'infrastructure.

Dernier chiffre utile : **60,9 % des résidences principales de Croissy sont occupées par leur propriétaire** (INSEE 2022). C'est important, car le propriétaire occupant est celui qui décide — et finance — une mise à niveau. Toute la pédagogie de cette page vise à ce que cette décision se prenne sur des faits mesurés, pas sous la pression d'un opérateur de passage qui agite le mot « vétuste » sans avoir sorti un seul appareil de mesure.`,
    },
    {
      anchor: "vieux-croissy-meulieres-villas-berges",
      title: "Boulevard Hostachy, route du Roi, berges de la Grenouillère : diagnostiquer un siècle de reprises",
      body: `Le vieux Croissy — le boulevard Hostachy et ses commerces, les rues autour de l'église Saint-Léonard, le secteur de la route du Roi, les abords du domaine Chanorier et le chemin qui longe la Seine vers l'ancienne Grenouillère — concentre le bâti le plus ancien de la commune. C'est aussi celui où le diagnostic électrique demande le plus de méthode, parce qu'on n'y répare pas une installation : on y répare la superposition de quatre ou cinq campagnes de travaux étalées sur un siècle.

Concrètement, voici ce que je trouve dans une villa croissillonne du début du XXe siècle jamais rénovée en totalité. Un tableau de répartition moderne, posé dans les années 1990 ou 2000, qui donne une fausse impression de neuf. En aval, des circuits récents côté cuisine et salle de bains, câblés en 1,5 et 2,5 mm² avec leur conducteur de terre. Et puis, dans les chambres ou les combles, des tronçons bien plus anciens raccordés au passage : conducteurs d'une autre époque, boîtes de dérivation invisibles, prises deux pôles sans terre. Le tout fonctionne — jusqu'au jour où l'isolant d'un vieux tronçon cède, et où le différentiel se met à déclencher sans qu'on comprenne pourquoi.

La cause produit l'effet, et l'effet désigne la méthode. Sur ce bâti, un dépannage sérieux ne se fait pas au testeur de prise à 10€ : il se fait au mégohmmètre, l'appareil qui mesure la résistance d'isolement d'un circuit et dit, chiffre à l'appui, si un câble est sain ou en fin de vie. C'est la différence entre « votre installation est dangereuse, il faut tout refaire » — phrase favorite des opérateurs douteux — et « le circuit des chambres présente un isolement dégradé sur huit mètres, on remplace ce tronçon, le reste tient ».

Le baromètre de l'association Promotelec, établi à partir de l'analyse de 400 000 diagnostics dans des logements construits avant 2009, estime que **plus de 80 % des installations de plus de quinze ans présentent au moins une anomalie**. Je cite ce chiffre pour deux raisons. D'abord parce qu'il est vrai, et qu'il justifie qu'on fasse contrôler une installation ancienne. Ensuite parce que les margoulins l'utilisent à l'envers : une « anomalie » au sens du diagnostic — une prise sans terre dans un couloir, par exemple — n'est pas un danger imminent. Entre l'anomalie statistique et le risque réel, il y a une mesure, une hiérarchie et un devis détaillé. C'est exactement ce que l'artisan Joël qui intervient chez vous doit vous fournir, et c'est compris dans le prix annoncé au téléphone, au 01 41 69 10 08.`,
    },
    {
      anchor: "residences-1971-1990-presque-conforme",
      title: "Résidences 1971-1990 : la génération du « presque conforme »",
      body: `Près d'un logement croissillon sur trois appartient à cette génération (31,1 % du parc selon l'INSEE 2022) : les résidences et pavillons sortis de terre entre 1971 et 1990, du côté de la gare Chatou-Croissy comme dans les rues calmes qui descendent vers la Seine. C'est la génération que j'appelle « presque conforme », et le mot « presque » mérite d'être décortiqué, parce que c'est lui qui explique 90 % des appels que reçoit le réseau Joël sur la commune.

Prenons un appartement type de 1980. À la livraison : un tableau de marque sérieuse (Legrand, Merlin Gerin, Schneider selon les années), des circuits correctement dimensionnés pour l'époque, une terre présente dans la cuisine et la salle d'eau. Ce qui manque, ce n'est pas la qualité, c'est ce que la norme n'exigeait pas encore. Pas de différentiel 30 mA en tête des circuits de prises — il ne sera généralisé qu'avec l'édition 2002 de la NF C 15-100. Une terre parfois non distribuée dans les pièces sèches — elle ne devient obligatoire partout qu'en 1991. Et des calibres pensés pour les usages de 1980 : une cuisine alimentée en 16 A suffisait à un réfrigérateur et une cafetière, pas à l'attelage moderne four + plaque + lave-vaisselle + bouilloire.

Cause, effet, solution — dans cet ordre. La cause : un circuit sollicité au-delà de son dimensionnement d'origine. L'effet : un disjoncteur (ou pire, un fusible) qui coupe à répétition, généralement le soir entre 19h et 21h, au moment où tout fonctionne en même temps. La solution : pas le réarmement compulsif, qui fatigue l'appareillage et masque le symptôme, mais la création d'un circuit dédié au bon calibre, ou la répartition de la charge sur deux départs. C'est une intervention d'une demi-journée au plus, chiffrée par écrit avant le premier coup de tournevis.

Deux points spécifiques aux copropriétés de cette génération méritent un mot. Premièrement, la colonne montante : tout ce qui se trouve en amont de votre disjoncteur de branchement relève du réseau public ou des parties communes, pas de votre installation privative — inutile de payer un intervenant pour un problème qui se traite côté gestionnaire de réseau ou syndic. Deuxièmement, la fausse urgence du « tableau à changer en entier » : dans la majorité des cas que j'audite, l'ajout d'interrupteurs différentiels 30 mA en tête et le remplacement des éléments fatigués suffisent à remettre l'installation à un niveau de sécurité moderne, pour un budget trois à cinq fois inférieur à la refonte intégrale qu'on aura tenté de vous vendre. Joël établit les deux chiffrages, les explique ligne à ligne, et vous laisse choisir à froid.`,
    },
    {
      anchor: "seine-humidite-caves-differentiels",
      title: "La Seine au bout du jardin : humidité, caves et déclenchements en série",
      body: `On ne peut pas écrire une page d'électricien sur Croissy-sur-Seine sans parler du fleuve. La commune occupe le creux de la boucle, ses berges courent du pont de Bougival jusqu'aux limites du Pecq, et une partie du territoire riverain est concernée par le risque de crue, comme l'ensemble des communes de la vallée couvertes par un plan de prévention du risque inondation. Pour l'électricien, cette géographie a une traduction très concrète : l'humidité est ici une cause de panne à part entière, au même titre que la vétusté ou la surcharge.

Le mécanisme physique est simple à comprendre. Un différentiel 30 mA fonctionne comme un comptable scrupuleux : il compare en permanence le courant qui part vers vos circuits et celui qui en revient. Si la différence dépasse 30 milliampères, c'est qu'une partie du courant s'échappe — vers la terre, à travers un isolant dégradé ou un milieu humide — et il coupe. L'humidité d'une cave en bord de Seine, d'une buanderie en sous-sol ou d'une boîte de dérivation extérieure mal protégée crée exactement ce chemin de fuite. D'où le scénario classique que me décrivent les Croissillons des rues proches des berges : un différentiel qui déclenche par temps de pluie ou en période de nappe haute, puis se réarme sans difficulté une fois le temps sec revenu. Ce n'est ni un hasard ni un fantôme : c'est une fuite de courant intermittente, localisable circuit par circuit avec un contrôleur d'isolement.

Trois règles pratiques pour les caves et sous-sols croissillons. Un : tout appareillage en local humide doit présenter un indice de protection adapté — IP44 au minimum, davantage en cas de projection ou d'immersion possible — et les prises de cave « bricolées » sur une rallonge agrafée au mur sont à proscrire. Deux : une pompe de relevage, fréquente dans les sous-sols proches du fleuve, mérite son circuit dédié protégé par son propre différentiel 30 mA, pour qu'un défaut sur la pompe ne prive pas tout le logement de courant — précisément la nuit où vous en avez besoin. Trois : après une inondation, même partielle, on ne réarme jamais un tableau sur des circuits qui ont été noyés avant un contrôle d'isolement. L'eau se retire, les sels et l'oxydation restent, et c'est dans les semaines qui suivent que les défauts apparaissent.

L'intervention Joël sur ce type de panne suit toujours le même protocole : coupure générale, mesures d'isolement départ par départ, identification du ou des circuits fuyards, remise en service de tout ce qui est sain pour que le logement reste habitable, puis chiffrage écrit de la réparation du tronçon en défaut. Prix fixe annoncé avant le déplacement, de jour comme de nuit — la crue ne choisit pas ses horaires, la facture ne s'en ressent pas.`,
    },
    {
      anchor: "intervention-croissy-prix-fixe-zero-majoration",
      title: "59€ annoncés, 59€ facturés : la mécanique d'une intervention Joël à Croissy",
      body: `Expliquons le prix comme j'explique un schéma unifilaire : en montrant ce qu'il y a dedans. Le tarif d'appel du réseau Joël à Croissy-sur-Seine est de **59€ TTC** pour le remplacement d'une prise ou d'un interrupteur hors service. Ce montant comprend le déplacement, la main-d'œuvre, la fourniture standard et la facture détaillée avec SIRET et TVA. Il est annoncé au téléphone, avant l'intervention, et il ne bouge plus. Les autres interventions suivent la même logique : recherche de cause sur un disjoncteur qui saute dès 79€, diagnostic complet de panne avec rapport dès 89€, localisation de court-circuit dès 99€, sécurisation ou remplacement d'un module de tableau dès 129€. Aucun de ces montants ne prend un centime de plus le dimanche à 3h du matin : **zéro majoration nuit, week-end et jours fériés**, c'est l'engagement structurel du réseau, pas un geste commercial.

Comment tient-on un tel prix là où d'autres facturent dix fois plus ? Par la géographie et par l'absence d'intermédiaire. Croissy est à dix minutes de La Défense par le RER A (gare Chatou-Croissy, sur la branche de Saint-Germain-en-Laye), reliée à Rueil-Malmaison et à la rive gauche par le pont de Bougival, adossée à Chatou et au Vésinet. Les artisans du réseau positionnés sur cette portion des Yvelines et sur les Hauts-de-Seine voisins atteignent la commune en 20 à 35 minutes selon l'heure. Pas de centrale opaque qui prélève sa commission, pas de sous-traitance en cascade : un artisan identifié, un prix construit sur le coût réel d'une intervention courte, et du volume régulier sur un secteur dense.

Pour qui ces deux engagements — prix fixe et zéro majoration — changent-ils concrètement la donne à Croissy ? Pour les commerçants du boulevard Hostachy d'abord : une vitrine ou une réserve plongée dans le noir un samedi en fin de journée, c'est du chiffre d'affaires qui s'évapore à chaque quart d'heure, et c'est précisément le moment que choisissent les opérateurs douteux pour tripler leurs tarifs. Pour les familles ensuite, nombreuses dans cette commune résidentielle qui accueille notamment la British School of Paris : une panne un dimanche soir, veille de classe, ne devrait jamais coûter plus cher que la même panne un mardi matin. Pour les propriétaires des résidences de la boucle enfin, qui peuvent demander un second avis chiffré avant d'accepter une « rénovation urgente » proposée par un inconnu.

Un dernier mot sur les délais, parce qu'on me pose toujours la question : oui, l'urgence vraie existe en électricité. Une odeur de chaud au tableau, un appareillage qui crépite, un disjoncteur de branchement qui refuse de se réarmer : on coupe tout et on appelle le 01 41 69 10 08, à toute heure. Pour le reste — une prise muette, un circuit qui lâche par intermittence — l'urgence est de ne pas signer n'importe quoi, pas d'intervenir dans le quart d'heure.`,
    },
    {
      anchor: "decoder-devis-electricien-methode-qualifelec",
      title: "Décoder un devis d'électricien : la check-list d'un formateur Qualifelec",
      body: `Les communes aisées de la boucle de Seine sont une cible de choix pour les officines du faux dépannage : pouvoir d'achat élevé, forte proportion de propriétaires, bâti ancien qui rend crédible n'importe quel discours alarmiste. J'ai examiné assez de dossiers en expertise judiciaire pour connaître le scénario par cœur, et je préfère vous donner la grille de lecture plutôt que de vous faire peur.

Le mécanisme commence toujours par un prix d'appel irréel — 29€ ou 39€ — affiché par une plateforme anonyme bien référencée. L'intervenant arrive, regarde le tableau trente secondes, et prononce les mots-clés : « vétuste », « plus aux normes », « risque d'incendie ». Suit un devis verbal à plusieurs milliers d'euros, à accepter « tout de suite, parce que c'est dangereux ». Notez le ressort : on ne vous vend pas une réparation, on vous vend un soulagement. C'est efficace, et c'est précisément pour cela que la parade doit être procédurale, pas émotionnelle.

Voici la check-list que j'enseigne, cinq vérifications avant toute signature. **1° L'identité** : un nom, un SIRET vérifiable en ligne sur l'annuaire Sirene — une « société » qui n'existe que sur un autocollant n'existe pas. **2° Le devis écrit préalable** : la réglementation du dépannage à domicile (arrêté du 24 janvier 2017 sur l'information des consommateurs pour les prestations de dépannage, réparation et entretien dans le bâtiment) impose une information écrite sur les prix avant travaux ; un professionnel qui s'en affranchit vous dit déjà qui il est. **3° Le détail ligne à ligne** : fournitures désignées précisément (marque, calibre, quantité), main-d'œuvre et déplacement séparés, TVA apparente. « Remise en conformité tableau : 2 800€ » sur une ligne unique n'est pas un devis, c'est un montant. **4° La justification technique** : exigez la mesure qui fonde chaque préconisation. Un isolement se chiffre en mégohms, une terre en ohms, une surcharge en ampères. Pas de mesure, pas de travaux. **5° Le droit au délai** : hors danger immédiat avéré, rien n'oblige à décider sur le palier. Un second avis au 01 41 69 10 08 coûte un appel ; le défaut de second avis, lui, se chiffre couramment en milliers d'euros.

Rappelez-vous la statistique Promotelec citée plus haut : plus de 80 % des installations de plus de quinze ans présentent au moins une anomalie. Les fraudeurs prospèrent sur cette réalité, parce qu'ils trouveront toujours quelque chose à montrer du doigt. La question n'est jamais « y a-t-il une anomalie ? » — il y en a probablement une chez vous comme chez moi. La question est : laquelle, mesurée comment, hiérarchisée par qui, et corrigée à quel prix écrit. Si vous avez déjà été victime d'une facturation abusive à Croissy ou ailleurs, signalez-la sur signal.conso.gouv.fr : la DGCCRF instruit ces dossiers, et chaque signalement documente un peu mieux ces réseaux.`,
    },
  ],
  vraisPrix: [
    {
      service: "Prise ou interrupteur hors service (remplacement)",
      prixJoel: 59,
      prixArnaqueur: "29€ annoncé → 250-480€ facturé",
      pourquoi:
        "Remplacer un mécanisme de prise ou d'interrupteur défaillant prend 15 à 25 minutes, fourniture standard comprise. Joël facture 59€ TTC tout inclus à Croissy-sur-Seine, prix annoncé au téléphone avant le déplacement. Les plateformes de racolage attirent avec un tarif d'appel à 29€ puis facturent la « recherche de panne », le déplacement et des fournitures gonflées.",
    },
    {
      service: "Disjoncteur qui saute (recherche de cause et remise en service)",
      prixJoel: 79,
      prixArnaqueur: "39€ annoncé → 300-550€ facturé",
      pourquoi:
        "Identifier pourquoi un disjoncteur déclenche — surcharge, défaut d'appareil, circuit fatigué — demande une démarche méthodique, pas un réarmement à l'aveugle. Joël facture 79€ TTC l'intervention complète, explication comprise. Méfiez-vous des opérateurs qui transforment un déclenchement banal en « remplacement de tableau urgent ».",
    },
    {
      service: "Panne électrique générale (diagnostic complet avec rapport)",
      prixJoel: 89,
      prixArnaqueur: "49€ annoncé → 350-700€ facturé",
      pourquoi:
        "Un vrai diagnostic comprend l'examen du tableau, les mesures (isolement, terre, continuité) et un rapport qui hiérarchise les anomalies. Joël facture 89€ TTC tout compris. Les officines facturent chaque mesure comme une prestation séparée pour multiplier la note par cinq.",
    },
    {
      service: "Court-circuit (localisation circuit par circuit)",
      prixJoel: 99,
      prixArnaqueur: "39€ annoncé → 480-900€ facturé",
      pourquoi:
        "La localisation d'un court-circuit se fait départ par départ, au contrôleur d'isolement, jusqu'à identifier le tronçon ou l'appareil en cause. Joël facture 99€ TTC la recherche complète. Dans le bâti ancien du vieux Croissy, c'est l'intervention la plus détournée par les facturations abusives, sous prétexte de « réfection complète ».",
    },
    {
      service: "Tableau électrique (sécurisation, remplacement d'un module défaillant)",
      prixJoel: 129,
      prixArnaqueur: "59€ annoncé → 600-1500€ facturé",
      pourquoi:
        "Remplacer un disjoncteur divisionnaire ou un interrupteur différentiel défaillant se traite en moins d'une heure. Joël facture dès 129€ TTC fourniture standard comprise. Le remplacement intégral du tableau, lui, ne se décide jamais sur le palier : il se justifie par des mesures et se chiffre par un devis écrit détaillé.",
    },
  ],
  faqLocale: [
    {
      question:
        "Ma villa près des berges de la Grenouillère date de 1905 : faut-il tout refaire ou peut-on réparer circuit par circuit ?",
      answer:
        "Dans l'immense majorité des cas, on répare par tronçons. Une villa ancienne du bord de Seine cumule plusieurs campagnes de travaux : certains circuits sont récents et sains, d'autres conservent des conducteurs en fin de vie. La bonne méthode consiste à mesurer l'isolement de chaque départ au mégohmmètre, puis à remplacer uniquement les tronçons dégradés et à ajouter les protections différentielles 30 mA manquantes. La refonte intégrale ne s'impose que si les mesures la justifient — et cette justification doit figurer, chiffres à l'appui, sur le devis écrit.",
    },
    {
      question:
        "Mon différentiel saute les jours de pluie dans ma maison proche du chemin de halage : est-ce lié à la Seine ?",
      answer:
        "Très probablement, oui — indirectement. L'humidité d'une cave, d'une boîte de dérivation extérieure ou d'un circuit enterré crée un chemin de fuite du courant vers la terre ; dès que la fuite dépasse 30 mA, le différentiel coupe, c'est son travail. Le phénomène intermittent (déclenchement par temps humide, calme par temps sec) est la signature classique de ce défaut dans les rues proches des berges. Il se localise circuit par circuit au contrôleur d'isolement. Joël facture cette recherche 99€ TTC, prix annoncé avant intervention.",
    },
    {
      question:
        "Une panne un dimanche soir à Croissy-sur-Seine coûte-t-elle vraiment le même prix qu'en semaine ?",
      answer:
        "Oui, strictement. Le réseau Joël n'applique aucune majoration de nuit, de week-end ou de jour férié : la prise hors service facturée 59€ TTC un mardi matin est facturée 59€ TTC un dimanche à 23h. C'est un engagement structurel du réseau, vérifiable au moment de l'appel puisque le prix est annoncé au téléphone avant le déplacement, au 01 41 69 10 08. Les artisans positionnés sur la boucle et les communes voisines atteignent Croissy en 20 à 35 minutes.",
    },
    {
      question:
        "Mon pavillon du secteur route du Roi a encore des fusibles à porcelaine : est-ce dangereux et combien coûte la mise à niveau ?",
      answer:
        "Ce n'est pas un danger immédiat en soi — des fusibles correctement calibrés protègent contre les surintensités — mais c'est le marqueur d'une installation antérieure aux protections différentielles modernes, donc sans garde-fou contre les fuites de courant et les risques d'électrisation. La mise à niveau raisonnable consiste à poser des interrupteurs différentiels 30 mA en tête et à remplacer les fusibles par des disjoncteurs : comptez généralement entre 800€ et 2 000€ TTC selon le nombre de circuits, après une étude chiffrée dès 199€, déduite du montant des travaux si vous les confiez à Joël.",
    },
    {
      question:
        "Ma cave a pris l'eau lors d'une crue : puis-je réarmer le tableau moi-même une fois l'eau retirée ?",
      answer:
        "Non, pas sur les circuits qui ont été immergés. L'eau de crue dépose des sels conducteurs et amorce une oxydation qui dégrade durablement l'isolement : un circuit noyé peut sembler fonctionner puis créer un défaut des semaines plus tard. Le protocole correct : laisser le ou les circuits concernés coupés, faire mesurer leur isolement, remettre en service ce qui est sain et remplacer l'appareillage immergé (avec un indice de protection adapté, IP44 minimum en local humide). Joël intervient à Croissy 24h/24, y compris en période de crue, au même tarif qu'en temps normal.",
    },
    {
      question:
        "Je suis locataire d'un appartement boulevard Hostachy : la prise qui a grillé est-elle à ma charge ou à celle du propriétaire ?",
      answer:
        "Tout dépend de la cause. L'entretien courant (interrupteur cassé par l'usage, prise descellée) relève du locataire ; la vétusté et la non-conformité de l'installation relèvent du propriétaire. Une prise qui grille sans choc ni mésusage, sur une installation des années 1970-1980 jamais rénovée, pointe presque toujours vers la vétusté. Le rapport remis lors de l'intervention Joël (diagnostic 89€ TTC) précise la cause constatée : c'est exactement la pièce qu'il vous faut pour répartir la charge entre locataire et bailleur sans conflit.",
    },
  ],
  temoignages: [
    {
      auteur: "Hélène B.",
      quartierOuRue: "boulevard Hostachy",
      date: "2026-05-12",
      rating: 5,
      serviceRendered: "Remplacement d'un interrupteur hors service",
      texte:
        "Interrupteur du séjour mort un vendredi soir, dans notre appartement du boulevard Hostachy. Prix annoncé au téléphone : 59€. L'électricien est arrivé en une demi-heure depuis Chatou, a remplacé le mécanisme, vérifié le circuit, et la facture était exactement de 59€ TTC, détaillée avec SIRET et TVA. Aucune tentative de me vendre autre chose. Rare.",
    },
    {
      auteur: "Marc-Antoine D.",
      quartierOuRue: "route du Roi",
      date: "2026-02-18",
      rating: 5,
      serviceRendered: "Disjoncteur qui sautait tous les soirs",
      texte:
        "Dans notre meulière du secteur route du Roi, le disjoncteur sautait chaque soir vers 20h. L'artisan Joël a identifié une surcharge sur le circuit cuisine d'origine (installation de 1978) et m'a tout expliqué avec ses mesures à l'appui. Recherche de cause facturée 79€ comme annoncé, puis devis écrit pour un circuit dédié au four, que j'ai accepté une semaine plus tard, sans aucune pression. Pédagogie impeccable.",
    },
    {
      auteur: "Nadège L.",
      quartierOuRue: "rue de l'Écluse, côté berges",
      date: "2026-04-03",
      rating: 4,
      serviceRendered: "Recherche de fuite de courant après un épisode pluvieux",
      texte:
        "Différentiel qui déclenchait à chaque grosse pluie dans notre maison près des berges. L'électricien a testé les circuits un par un et trouvé un défaut d'isolement sur la ligne de la cave, côté pompe de relevage. Recherche facturée 99€ TTC comme convenu, un dimanche matin, sans majoration. Je retire une étoile uniquement pour le créneau initialement annoncé, décalé d'une heure — mais prévenu par téléphone, et le travail était irréprochable.",
    },
  ],
  internalLinks: [
    {
      url: "/electricien/rueil-malmaison",
      anchor: "électricien à Rueil-Malmaison",
      contexte:
        "De l'autre côté de la Seine, nos artisans couvrent aussi Rueil-Malmaison avec les mêmes engagements de prix fixe.",
    },
    {
      url: "/electricien/versailles",
      anchor: "électricien à Versailles",
      contexte:
        "Le réseau Joël intervient dans toutes les Yvelines, notamment à Versailles, sans majoration nuit ni week-end.",
    },
    {
      url: "/electricite",
      anchor: "tous nos dépannages électricité en Île-de-France",
      contexte:
        "Retrouvez l'ensemble des interventions d'électricité du réseau Joël et leurs prix annoncés avant intervention.",
    },
    {
      url: "/plomberie",
      anchor: "dépannage plomberie 24h/24",
      contexte:
        "Cave humide, fuite ou pompe de relevage en panne : le réseau Joël couvre aussi la plomberie sur la boucle de Seine.",
    },
    {
      url: "/serrurerie",
      anchor: "dépannage serrurerie sans majoration",
      contexte:
        "Mêmes règles anti-arnaque en serrurerie : prix fixe annoncé au téléphone, zéro majoration nuit et week-end.",
    },
  ],
  tags: [
    "croissy-sur-seine",
    "78290",
    "yvelines",
    "electricien",
    "boucle-de-seine",
    "boulevard-hostachy",
    "route-du-roi",
    "grenouillere",
    "chanorier",
    "berges-de-seine",
    "rer-a",
    "chatou-croissy",
    "pont-de-bougival",
    "meuliere",
    "residences-1971-1990",
    "nf-c-15-100",
    "differentiel-30ma",
    "fuite-de-courant",
    "zone-inondable",
    "prise-interrupteur-hs",
    "qualifelec",
    "promotelec",
    "urgence-24h",
  ],
};
