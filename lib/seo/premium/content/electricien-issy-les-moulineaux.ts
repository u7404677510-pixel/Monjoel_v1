import type { PremiumPageContent } from "../types";

export const content: PremiumPageContent = {
  trade: "electricien",
  citySlug: "issy-les-moulineaux",
  authorPersona: "karim-benali",
  publishedAt: "2026-04-27",
  updatedAt: "2026-04-27",
  metaTitle: "Électricien Issy-les-Moulineaux 92130 — Joël dès 59€ TTC, 24h/24",
  metaDescription:
    "Électricien à Issy-les-Moulineaux : RT2012/RE2020, IRVE, domotique, tableau, NF C 15-100. Prix fixe dès 59€ TTC, annoncé avant. Joël 01 41 69 10 08, 24h/24.",
  h1: "Électricien à Issy-les-Moulineaux (92130) : le guide pédagogique signé Karim Benali",
  introParagraph:
    "À Issy-les-Moulineaux, j'interviens sur ce qui est probablement le bâti le plus hétérogène de toute la petite couronne ouest. D'un côté, les programmes neufs RT2012 puis RE2020 qui ont poussé en quinze ans sur le Val-de-Seine, sur l'Île-Saint-Germain et autour du Fort d'Issy : domotique préinstallée, GTL conforme, parasurtenseur d'origine, prises commandées, parfois borne IRVE en sous-sol. De l'autre, les vieux pavillons des Hauts-d'Issy et les petits collectifs des années 60 du quartier des Épinettes, où je trouve encore des tableaux à fusibles porcelaine, des prises sans terre, et des installations qu'aucun amendement de la NF C 15-100 n'a jamais traversées. Entre les deux, des centaines de logements rénovés à des époques très différentes — certains avec un soin remarquable, d'autres avec un bricolage qui me donne du travail. Je suis Karim Benali, ingénieur électricien diplômé de Centrale Paris en 2008, ancien expert judiciaire pour la Cour d'Appel de Paris sur les sinistres électriques, formateur Qualifelec sur la mise aux normes résidentielles. Cette page, je l'ai pensée comme un cours pédagogique à la disposition des Isséens — pour que vous compreniez ce qui se passe quand votre tableau RT2012 commence à déclencher dès que vous branchez la voiture, quand votre box internet fait griller une multiprise, quand votre installation domotique se met à dialoguer dans le vide. Mon but : vous permettre, quand vous appellerez Joël au 01 41 69 10 08, de savoir exactement ce que l'électricien doit chercher, et combien cela doit coûter. Le tarif Joël démarre à 59 € TTC pour un remplacement de prise standard, annoncé avant l'intervention, sans majoration nuit, week-end ou jour férié. Pas de mauvaise surprise, pas de devis à 700 € pour ce qui aurait dû en coûter 90. Lisez tranquillement, ou en urgence : dans les deux cas vous y gagnerez du temps, de la sécurité et probablement de l'argent.",
  sections: [
    {
      anchor: "bati-electrique-issy",
      title: "Cinq générations de bâti électrique à Issy : ce que je trouve réellement dans les tableaux",
      body:
        "Issy-les-Moulineaux a connu en vingt-cinq ans une mutation urbaine sans équivalent dans les Hauts-de-Seine. Quand je décris à un confrère le profil électrique de la commune, je distingue cinq générations clairement identifiables, et chacune raconte une époque réglementaire différente.\n\n**Génération 1 — l'ancien village industriel (avant 1960)**, principalement aux Hauts-d'Issy, autour de la rue du Général-Leclerc et de la rue Hoche. Petits pavillons d'ouvriers, anciens ateliers reconvertis, immeubles de rapport. Tableaux d'origine quand ils n'ont pas été repris : porte-fusibles porcelaine, conducteurs sous gaine torsadée, parfois encore alimentation 110 V trouvée dans des combles non rénovés. Aucune mise à la terre généralisée. Liaisons équipotentielles inexistantes en salle de bain. Sur ces installations, la première intervention que je propose n'est pas une réparation mais un diagnostic complet — parce qu'on ne touche pas un fil sans avoir cartographié l'ensemble.\n\n**Génération 2 — les ensembles pavillonnaires et collectifs des années 60-80**, secteur Épinettes, rue Ernest-Renan, rue Jules-Guesde, certaines copropriétés du quartier Centre. Tableaux métalliques avec porte-fusibles à cartouches, parfois un seul interrupteur différentiel 30 mA en tête (souvent ajouté tardivement), conducteurs cuivre 1,5 mm² ou 2,5 mm² selon les circuits. Mise à la terre par piquet de jardin ou par conducteur de protection collectif d'immeuble, oxydé à 90 % du temps. C'est la génération que je rencontre le plus souvent quand un acquéreur récent me sollicite après lecture du DT-Élec.\n\n**Génération 3 — les rénovations massives des années 90-2000**, partout dans Issy mais particulièrement dans le quartier Centre et autour de la rue Aristide-Briand. Tableaux modulaires sur rail DIN, généralement deux interrupteurs différentiels 30 mA, disjoncteurs divisionnaires courbe C, étiquetage parfois fait, parfois oublié. Conformes à l'amendement A1 ou A2 de la NF C 15-100, donc aux normes de leur époque mais pas aux exigences actuelles (notamment sur le nombre minimum de circuits et sur la protection foudre).\n\n**Génération 4 — les programmes RT2012 (2013-2021)**, c'est le vrai marqueur d'Issy moderne. Val-de-Seine (Microsoft France, Bouygues, TF1), résidences neuves de l'Île-Saint-Germain, Fort d'Issy avec ses ZAC (Zone d'Aménagement Concerté). Tableaux modulaires de grande capacité (souvent 4 rangées), GTL (Gaine Technique Logement) verticale conforme, plusieurs interrupteurs différentiels dont au moins un type A obligatoire pour les plaques induction, parasurtenseur de type 2 obligatoire en zone foudre (Issy n'est pas zone obligatoire, mais beaucoup de constructeurs l'ont posé en série), prises commandées dans les chambres, RJ45 et coaxial dans la GTL. Domotique préinstallée fréquente : KNX, Hager Tebis, Schneider Wiser, Legrand MyHome.\n\n**Génération 5 — les programmes RE2020 (2022-2026)**, encore minoritaires mais en croissance forte sur les dernières opérations du Fort d'Issy et du Val-de-Seine sud. Mêmes exigences que RT2012 sur l'électricité, mais avec une attention nouvelle aux usages bas carbone : pré-équipement IRVE systématique (gaine et alimentation amont jusqu'à l'emplacement de stationnement), pompes à chaleur électriques pour le chauffage, ballons thermodynamiques. Le tableau de génération 5 que j'ouvre est généralement impeccable… *quand il est neuf*. Mais à 5 ans, les premiers défauts apparaissent sur les modules domotiques non maintenus.",
    },
    {
      anchor: "panne-tableau-rt2012",
      title: "Mon tableau RT2012 du Val-de-Seine déclenche depuis l'installation : que se passe-t-il ?",
      body:
        "C'est le motif d'appel numéro 1 qu'on me transmet sur Issy depuis trois ans. Un acquéreur prend possession d'un appartement neuf ou récent dans le Val-de-Seine, sur l'Île-Saint-Germain ou au Fort d'Issy, et au bout de quelques semaines un interrupteur différentiel commence à tomber sans raison apparente. Voici les cinq causes que j'identifie systématiquement, dans l'ordre de fréquence sur ce parc neuf isséen.\n\n**Cause 1 — Le différentiel type AC au lieu du type A sur le circuit plaques induction (35 % des cas).** La NF C 15-100 amendement A5 impose un interrupteur différentiel de type A (sensible aux courants continus pulsés) pour le circuit des plaques de cuisson induction, et pour le circuit lave-linge. Or je trouve encore régulièrement, sur des tableaux RT2012 livrés vers 2014-2017, des modules type AC posés par défaut. Quand l'utilisateur branche une plaque induction moderne avec onduleur, le différentiel AC se met à voir des courants continus qu'il ne sait pas lire correctement, et déclenche pour rien — ou pire, ne déclenche pas quand il le faudrait. Solution : remplacement du module par un type A. Coût Joël indicatif : 129 € TTC pose comprise.\n\n**Cause 2 — Le défaut d'isolement progressif d'un appareil neuf (25 % des cas).** Je sais, ça surprend qu'un appareil neuf fuie. Mais sur les ballons thermodynamiques et les pompes à chaleur, qui équipent désormais presque tous les logements RE2020 d'Issy, les compresseurs sont gourmands en courants de fuite résiduels. Cumulés à la longueur des câbles d'alimentation entre tableau et appareil, on dépasse parfois les 30 mA de seuil sans qu'il y ait défaut réel. Diagnostic au mégohmmètre obligatoire pour distinguer un vrai défaut d'isolement d'un courant de fuite normal en limite de seuil.\n\n**Cause 3 — Le module domotique qui décroche (15 % des cas).** Beaucoup de tableaux RT2012/RE2020 d'Issy embarquent une box domotique (KNX, Wiser, Tebis) qui pilote les volets roulants, les prises commandées, parfois le chauffage. Quand cette box plante (mise à jour ratée, surtension, vieillissement firmware), elle peut envoyer des ordres erratiques sur le bus, et le tableau se met à déclencher de façon incompréhensible. Diagnostic spécifique : interrogation du bus avec un outil dédié (ETS pour KNX), reset de la box, parfois remplacement du contrôleur central. Joël intervient sur les principales solutions du marché.\n\n**Cause 4 — La borne IRVE installée en aval sans circuit dédié (15 % des cas).** Phénomène en explosion à Issy : avec la part croissante de véhicules électriques (les parkings du Val-de-Seine sont très équipés), les particuliers font installer une wallbox 7,4 kW ou 11 kW en aval de leur tableau existant. Quand l'installateur a branché sans créer de circuit dédié, ou avec un calibre sous-dimensionné, ou sans le différentiel type B obligatoire pour les bornes triphasées, le tableau souffre. Charger sa voiture la nuit déclenche le différentiel à 3h du matin, on se réveille sans courant. Reprise complète du circuit IRVE avec différentiel adapté : 380 à 850 € TTC selon configuration, prix annoncé avant.\n\n**Cause 5 — L'effet cumulatif des appareils en veille sur un même différentiel (10 % des cas).** Logement neuf isséen typique : box internet + télé connectée + console + chargeur ordinateur + machine à café connectée + assistant vocal + multiprise USB. Chaque appareil tire individuellement quelques milliampères de courant de fuite résiduel à travers son alimentation à découpage. Cumulés sur un même différentiel 30 mA, on arrive à 22-28 mA *en permanence*, à la limite du seuil. Au moindre événement supplémentaire (allumage du sèche-linge), on dépasse. Solution : redistribuer les circuits entre plusieurs interrupteurs différentiels, ce que la conception d'origine du tableau avait souvent prévu mais que personne n'a câblé correctement.",
    },
    {
      anchor: "irve-borne-recharge-issy",
      title: "Installer une borne de recharge IRVE chez soi à Issy : ce qu'il faut savoir avant de payer",
      body:
        "Avec la densité de cadres travaillant dans la Tech Vallée isséenne (Microsoft, Cisco, Cap Gemini, Bouygues, Sodexo, et toute la French Tech installée Val-de-Seine), la commune est probablement l'une des plus avancées de France sur la motorisation électrique. Conséquence : je reçois plusieurs demandes par semaine d'installation de borne IRVE (Infrastructure de Recharge pour Véhicule Électrique) en parking privatif d'immeuble ou en pavillon. Voici ce que la pédagogie m'oblige à expliquer avant d'accepter le devis.\n\n**Première règle — IRVE n'est pas un mot fourre-tout.** Le décret 2017-26 distingue trois niveaux d'équipement. Le **mode 1** (prise standard 16 A) est interdit pour la recharge VE en France depuis 2017, sauf pour de très petits véhicules (vélos, trottinettes). Le **mode 2** (chargeur embarqué dans le câble du véhicule, prise renforcée Green'Up) est toléré pour la recharge occasionnelle, mais dangereux en usage permanent : la prise chauffe, le contact se dégrade, c'est une cause majeure d'incendie de tableau. Le **mode 3** (borne dédiée installée à demeure, type wallbox) est la seule solution conforme et durable pour un usage quotidien. Tout installateur qui vous propose mode 1 ou mode 2 sur un usage permanent est hors clous.\n\n**Deuxième règle — la qualification IRVE est obligatoire.** Depuis le décret 2017-26, seul un électricien titulaire de la qualification IRVE (mention IRVE niveau 1, 2 ou 3 selon la puissance) peut installer une borne supérieure à 3,7 kW. Les artisans Joël couvrant Issy disposent tous de la qualification IRVE niveau 1 (pour les bornes domestiques 7,4 et 11 kW), et le réseau mobilise un partenaire IRVE 2 pour les copropriétés équipées en triphasé. Vérifiez systématiquement la qualification : c'est un document opposable, indispensable pour faire jouer votre garantie décennale et obtenir l'éligibilité aux aides (crédit d'impôt, prime ADVENIR).\n\n**Troisième règle — la protection différentielle type B pour le triphasé.** Une wallbox monophasée 7,4 kW (32 A) peut généralement se contenter d'un différentiel type A 30 mA dédié. Mais dès qu'on passe en triphasé (11 ou 22 kW), il faut un **différentiel type B** capable de détecter les courants de défaut continus lisses générés par l'électronique de la borne. Ces différentiels coûtent cher (180 à 350 € le module seul), mais sont absolument incontournables. Économiser dessus, c'est risquer une électrocution non détectée et une perte totale de garantie en cas de sinistre.\n\n**Quatrième règle — le circuit dédié obligatoire depuis le tableau.** La borne IRVE doit avoir son propre départ dans le tableau divisionnaire, son propre disjoncteur, sa propre section de câble (au minimum 6 mm² pour 7,4 kW, 10 mm² pour 11 kW triphasé). Brancher une wallbox sur une prise existante en cuisine ou en garage est une faute professionnelle grave, et c'est pourtant ce que je découvre dans environ un cas sur cinq quand on m'appelle pour 'remettre en route une borne qui ne marche plus'. La cause est presque toujours là.\n\n**Cinquième règle — le compteur Linky et la puissance souscrite.** Brancher une wallbox 11 kW chez vous quand votre puissance souscrite est à 9 kVA, c'est garantir des disjonctions à chaque démarrage de charge. Avant tout devis IRVE, il faut un audit de vos appels de courant simultanés. Joël fait cet audit dans le devis (gratuit), et oriente si nécessaire vers une augmentation de puissance auprès de votre fournisseur (ce qui est facturé par Enedis hors prestation Joël, environ 150 à 250 € selon le passage triphasé éventuel).\n\nFourchette de prix Joël pour une borne IRVE résidentielle à Issy, fourniture et pose comprises, prix annoncé avant : **890 à 1 950 € TTC** pour une wallbox 7,4 kW monophasée en pavillon ou parking privatif accessible, **1 600 à 3 200 € TTC** pour une wallbox 11 kW triphasée nécessitant la création d'un circuit dédié long et la pose d'un différentiel type B. Devis chiffré sur place, garantie décennale, attestation Consuel pour les opérations qui le requièrent.",
    },
    {
      anchor: "domotique-tableau-domotique",
      title: "Domotique RT2012/RE2020 : les pannes que je vois quand le smart home cesse d'être smart",
      body:
        "Issy a une particularité : la domotique préinstallée d'origine est devenue presque la norme dans les programmes neufs depuis 2014. Ce qui était il y a dix ans une option de luxe est aujourd'hui un standard sur les programmes Bouygues Immobilier, Vinci Immobilier, Cogedim, Nexity qui jalonnent le Val-de-Seine et le Fort d'Issy. Conséquence : je suis devenu, presque par accident, un dépanneur domotique. Pédagogie avant tout : la domotique électrique d'un logement n'est pas un gadget, c'est une couche logicielle posée sur l'installation électrique normale. Quand elle plante, le diagnostic n'est ni purement électrique ni purement informatique : il faut comprendre les deux.\n\n**Les trois principaux protocoles que je trouve à Issy.** Le **KNX**, standard européen ouvert et robuste, présent sur les programmes haut de gamme du Val-de-Seine (notamment chez certains promoteurs allemands ou suisses). Câblage bus dédié sur paire torsadée, longévité 25-30 ans, mais maintenance qui demande un outil spécifique (ETS, logiciel propriétaire de l'association KNX) et une formation. Le **Hager Tebis**, fréquent sur les programmes RT2012 français standards, équivalent fonctionnel propriétaire, plus simple à dépanner mais moins évolutif. Le **Schneider Wiser** et le **Legrand MyHome**, hybrides filaires/sans-fil, courants sur les rénovations 2018-2024 du Fort d'Issy. Chacun a ses pannes typiques.\n\n**Panne 1 — La passerelle (gateway) qui ne répond plus.** C'est la cause numéro 1 de défaillance domotique sur les tableaux RT2012 isséens de plus de 5 ans. La passerelle est le composant qui fait le pont entre le bus domotique et l'application smartphone. Au bout de 5-7 ans, le firmware n'est plus mis à jour par le fabricant (cycle de vie commercial), la passerelle se déconnecte progressivement du cloud, l'application affiche 'hors ligne' en permanence. Diagnostic : test du bus en local avec un PC raccordé en USB, vérification de la table de routage, parfois flashage manuel d'un firmware antérieur stable. Solution lourde : remplacement de la passerelle (compter 350 à 950 € TTC selon protocole, fourniture comprise).\n\n**Panne 2 — Le module variateur DALI qui décroche.** L'éclairage piloté DALI (Digital Addressable Lighting Interface) équipe beaucoup de logements neufs isséens. Le DALI est un bus dédié pour piloter individuellement chaque luminaire LED. Quand un module DALI dans le tableau lâche, c'est tout un groupe d'éclairage qui se met à clignoter ou à rester en demi-puissance. Diagnostic : test au polariseur DALI, identification du module défaillant, remplacement. Joël intervient à partir de 149 € TTC par module remplacé.\n\n**Panne 3 — La prise commandée qui se met à pulser.** Les prises commandées (allumage piloté depuis un interrupteur ou depuis un scénario domotique) embarquent un relais miniaturisé dans le boîtier. Au bout de 50 000 à 100 000 cycles d'enclenchement, le relais commence à coller ou à vibrer. Symptôme : la prise s'allume et s'éteint d'elle-même à intervalle aléatoire. Remplacement du module prise commandée : 89 à 130 € TTC pose comprise.\n\n**Panne 4 — Le scénario qui s'exécute sans raison.** Cas plus rare mais frustrant : un scénario domotique (par exemple 'extinction générale 23h') s'enclenche à des heures aberrantes. Cause habituelle : la pile de l'horloge interne de la passerelle est morte, le système rebascule sur un horaire par défaut codé en usine. Remplacement de pile : 35 € TTC, ou recalibrage NTP si la passerelle est connectée internet.\n\n**Mon conseil aux propriétaires de logement domotisé à Issy** : tenez un carnet d'entretien numérique de votre installation domotique au même titre que de votre chaudière. Notez les références exactes (marque, modèle, version firmware) de votre passerelle, de vos modules, de vos protocoles. Le jour où ça plante, l'électricien que vous appelez gagne 30 à 60 minutes de diagnostic, soit autant de moins sur la facture.",
    },
    {
      anchor: "surcharge-box-internet-multiprise",
      title: "Pourquoi votre box internet fait griller la multiprise du salon (et comment l'éviter)",
      body:
        "Cas de figure isséen ultra-fréquent, surtout dans les studios et T2 du quartier Centre et de l'avenue Bourgain. L'utilisateur empile derrière son canapé : box internet, télévision connectée, console PS5 ou Xbox, chargeur ordinateur, lampe d'appoint, parfois un chargeur de téléphone qui passe la nuit, le tout sur une multiprise de supermarché à 6 € achetée il y a sept ans. Au bout d'un an ou deux d'usage continu, la multiprise se met à sentir le chaud, l'odeur devient âcre, parfois on entend un grésillement à l'intérieur, et un beau jour elle fond ou prend feu. Pédagogiquement, expliquons pourquoi.\n\n**Ce que tire vraiment une 'box' en consommation moyenne.** Une box opérateur classique tire 15 à 25 W en service permanent, avec des pics à 40 W lors des téléchargements massifs ou des usages TV+internet simultanés. La télévision LED 55 pouces consomme 80 à 130 W en usage. La PS5 ou Xbox Series X tire 200 à 220 W en jeu intensif. L'ordinateur portable en charge tire 65 à 100 W. Cumulés simultanément, on est à 380-475 W, soit 1,7 à 2,1 A à 230 V. C'est *bien en deçà* de la capacité de la multiprise (généralement marquée 16 A / 3 680 W maximum). Donc en théorie, aucun problème.\n\n**En pratique, pourquoi ça chauffe ?** Trois facteurs cumulés. Premier : les **alimentations à découpage** de tous ces appareils génèrent ce qu'on appelle des courants de pointe — ils ne tirent pas un courant lisse à 230 V mais des impulsions brèves à très haute intensité, qui font chauffer plus que ne l'indiquerait la mesure de puissance moyenne. Deuxième : les **contacts internes** d'une multiprise bas de gamme sont en laiton fin, dimensionnés au plus juste pour leur tension nominale ; à l'usage continu, ils s'oxydent, le contact se dégrade, la résistance de contact augmente, et c'est cette résistance qui produit la chaleur (effet Joule, P = R × I²). Troisième : la **multiprise elle-même** est généralement raccordée par un cordon souple de section 0,75 ou 1 mm², qui chauffe lui aussi quand l'intensité passe en continu.\n\n**Ce que je recommande aux Isséens en studio ou T2 du quartier Centre.** Premier réflexe : *jeter* toute multiprise qui sent même légèrement chaud quand on la touche après quelques heures d'usage. C'est l'alerte numéro un, et personne ne devrait l'ignorer. Deuxième : remplacer par une multiprise marquée NF, certifiée pour 16 A en continu, avec parasurtenseur intégré (joules de protection ≥ 1 000 J pour une box internet, ≥ 1 500 J pour les TV/consoles). Troisième : vérifier que le circuit prises sur lequel on branche cette multiprise n'est pas déjà saturé par d'autres usages (lave-linge, frigo, sèche-linge tirent eux aussi sur le tableau).\n\n**Le vrai problème de fond, dans 30 % des cas isséens** : le studio ou T2 ne dispose que de 4 à 6 prises électriques au total, alors que l'occupant a besoin de brancher 12 à 15 appareils. Solution durable : créer un circuit prises dédié pour le coin TV/multimédia, avec 4 prises encastrées 16 A en bonne section et le tout protégé par son propre disjoncteur courbe C 16 A. Coût Joël indicatif : 240 à 480 € TTC selon longueur de câble et complexité de cheminement, tout compris, prix annoncé avant. Et là, plus jamais de multiprise qui fond derrière le canapé.",
    },
    {
      anchor: "quartiers-issy-pannes-typiques",
      title: "Pannes typiques par quartier d'Issy-les-Moulineaux : ce que je vois sur le terrain",
      body:
        "Issy-les-Moulineaux fait 4,25 km², ce qui en fait l'une des communes les plus densément peuplées des Hauts-de-Seine. Mais derrière cette densité homogène, six grands secteurs présentent chacun un profil électrique distinct.\n\n**Centre — autour de la mairie d'Issy et du métro Mairie d'Issy.** Mix entre petits collectifs des années 60-80 et programmes mixtes plus récents. Pannes typiques : tableaux à demi-rénovés (deux générations de modules cohabitent dans le même coffret, parfois avec des conducteurs aluminium côté ancien et cuivre côté neuf, sans manchons de raccordement adaptés), prises de cuisine sous-dimensionnées pour des plaques induction modernes, éclairages d'escalier d'immeuble avec minuteries défaillantes. Sur la rue du Général-Leclerc et la rue Aristide-Briand, je vois beaucoup de copropriétés où le TGBT collectif n'a jamais été repris depuis la construction.\n\n**Val-de-Seine — bordure ouest, le long de la Seine, secteur Microsoft / Bouygues / TF1.** Le cœur du Issy moderne. Bâti exclusivement RT2012 et RE2020, immeubles de bureau immense et copropriétés résidentielles haut de gamme. Pannes typiques : différentiels type AC à reprendre en type A sur circuits induction et lave-linge, modules domotique fatigués (passerelles KNX ou Wiser de plus de 5 ans), bornes IRVE installées en aval de tableaux non préparés, prises commandées défectueuses. C'est aussi le secteur où je vois le plus de demandes d'audit avant achat : prudence justifiée des acquéreurs sur un parc neuf-récent.\n\n**Île-Saint-Germain — l'île de la Seine, exclusivement résidentielle.** Programmes de prestige des années 2010-2020, copropriétés très entretenues, services collectifs lourds (chauffage commun, ventilation collective, ascenseurs nombreux). Pannes typiques : interface entre installation privative et services collectifs (chauffage à eau alimenté électriquement via vannes pilotées qui meurent), ballons thermodynamiques en fin de vie sur les premiers programmes 2012, surconsommation cachée par défaut d'isolement progressif des résistances. Demande aussi en domotique avancée (volets pilotés, scénarios complexes).\n\n**Fort d'Issy — quartier sud, ZAC neuve construite sur le site de l'ancien fort militaire.** Quartier 100 % neuf depuis 2008-2010, RT2012 puis RE2020, géothermie de quartier, fibre optique partout. Pannes typiques : les premières installations RT2012 du Fort (livrées 2010-2014) commencent à montrer leurs premiers défauts d'usure (différentiels qui déclenchent à 25 mA au lieu de 30, modules domotique à remplacer), pré-équipement IRVE des parkings souvent à activer (gaine et câble présents mais wallbox à poser et déclarer), problèmes ponctuels sur les pompes à chaleur partagées entre logements.\n\n**Les Hauts-d'Issy — partie haute de la commune, vers Vanves.** Bâti hétérogène : pavillons anciens, petits collectifs des années 70, quelques programmes neufs récents en interstices. Pannes typiques : tableaux des années 70-80 jamais ou peu repris, mises à la terre par piquets de jardin oxydés, conducteurs aluminium fragiles aux jonctions cuivre, salles de bain sans liaison équipotentielle. C'est dans ce secteur que je traite le plus d'authentiques mises aux normes, et où le diagnostic préalable est indispensable.\n\n**Les Épinettes — secteur nord-est, vers Boulogne.** Bâti années 60-80 essentiellement, copropriétés avec syndic actif, pavillons résiduels. Pannes typiques : disjoncteurs d'abonné sous-dimensionnés (encore beaucoup de 30 A monophasé alors que les usages réels demandent 9 ou 12 kVA), tableaux à fusibles à cartouches encore présents dans environ 1 logement sur 5 que j'ouvre, surcharges récurrentes en fin de journée.\n\nDans les six cas, le réflexe Joël est le même : appel au 01 41 69 10 08, description du symptôme, prix annoncé avant déplacement, intervention sous 20 à 30 minutes en moyenne dans Issy (la commune est petite et les artisans Joël sont positionnés sur l'axe Vanves-Boulogne-Issy-Meudon-Clamart, ils circulent vite). Pas de majoration soir, nuit, week-end ou jour férié.",
    },
    {
      anchor: "dt-elec-vente-issy",
      title: "DT-Élec et vente d'un appartement à Issy : ce qui est obligatoire et ce qui ne l'est pas",
      body:
        "Voilà un sujet qui crée beaucoup de confusions à Issy, particulièrement dans le marché de seconde main du Val-de-Seine et du Fort d'Issy où des logements de moins de quinze ans changent fréquemment de propriétaire. Soyons précis pédagogiquement.\n\n**Ce qui est obligatoire pour vendre un logement à Issy.** Le DT-Élec (Diagnostic Technique d'Installation Intérieure d'Électricité) est obligatoire dans deux cas : si l'installation électrique a plus de 15 ans, ou si l'installation a été modifiée significativement après l'achat précédent sans Consuel récent. Pour un logement RT2012 livré en 2014, le DT-Élec n'est donc pas requis avant 2029. Pour un logement RT2012 livré en 2008-2009, il l'est dès aujourd'hui. Le diagnostiqueur (un professionnel certifié, distinct de l'électricien) vérifie 87 points de contrôle issus de la NF C 16-600, et établit un rapport opposable annexé à l'acte de vente.\n\n**Ce que le DT-Élec ne fait pas.** Il *ne juge pas* la conformité à la NF C 15-100 actuelle. Il vérifie la sécurité par rapport à six exigences fondamentales (présence d'appareil général de coupure et de protection, dispositif différentiel, mise à la terre, protection des conducteurs, etc.). Une installation peut être ancienne mais sûre selon ces critères : elle obtient alors un rapport sans anomalie majeure. Inversement, une installation neuve mal conçue peut présenter des anomalies sur le DT-Élec.\n\n**Ce qui n'est jamais obligatoire pour la vente.** La mise aux normes elle-même n'est pas une condition de vente. Aucune loi n'oblige le vendeur à effectuer des travaux avant cession, même en présence d'anomalies au DT-Élec. L'acheteur prend connaissance, il peut négocier le prix en conséquence ou non, il peut décider d'effectuer les travaux après acquisition ou non. Toute pression d'un agent immobilier ou d'un acheteur en sens contraire est juridiquement infondée. Si vous êtes vendeur à Issy et qu'on vous demande de refaire le tableau avant signature, sachez que c'est de la négociation, pas une obligation légale.\n\n**Ce qui devient obligatoire dans trois cas concrets isséens.** Premier : la rénovation totale ou semi-totale du logement (vous abattez plusieurs cloisons, refaites l'électricité, changez le tableau). Vous tombez alors dans le champ d'application complet de la NF C 15-100 amendement A5, et le Consuel sera exigé pour la mise sous tension. Deuxième : le **changement de destination** d'un local — fréquent à Issy où d'anciens locaux d'activité du Val-de-Seine ou des Épinettes sont transformés en habitation, ou inversement. Le Consuel exige la conformité totale avant raccordement Enedis. Troisième : la présence d'un danger grave et immédiat caractérisé par expertise judiciaire, assurance ou rapport diagnostic d'urgence — cas heureusement rare.\n\n**Mon conseil pédagogique aux acquéreurs et vendeurs isséens.** Lisez sérieusement le DT-Élec. S'il signale des anomalies, demandez à Joël un devis de mise aux normes ciblée *avant* la signature. Vous saurez exactement combien coûteront les travaux nécessaires, et vous pourrez intégrer ce chiffre dans votre négociation au lieu de subir un devis surévalué après. Fourchette indicative pour un T3 isséen moyen sur installation des années 80 à reprendre intelligemment : 600 à 1 400 € TTC. Pour un T3 RT2012 dont le DT-Élec signale juste un type AC à remplacer en type A : 129 € TTC. Pour un loft converti en habitation depuis un local d'activité (cas Val-de-Seine sud), le Consuel obligatoire et les éventuelles reprises peuvent monter à 2 500-4 500 € TTC. Tout dépend de l'état réel, et un vrai diagnostic préalable l'établit en 90 minutes.",
    },
    {
      anchor: "auto-diagnostic-securite",
      title: "Sécurité électrique chez soi : ce que vous pouvez vérifier vous-même, ce qu'il ne faut jamais toucher",
      body:
        "À Issy comme ailleurs, la pédagogie consiste à équiper l'utilisateur sans l'inviter à devenir électricien clandestin. Voici la liste claire, à conserver, de ce que vous pouvez faire vous-même en toute sécurité, et de ce qui doit absolument rester aux mains d'un professionnel certifié.\n\n**Ce que vous pouvez faire sans risque.** Réarmer un disjoncteur qui a déclenché, après avoir débranché l'appareil suspect (généralement le dernier appareil mis en service avant la coupure). Tester vos interrupteurs différentiels en appuyant sur le bouton T (Test) une fois par mois — si le module ne déclenche pas, il est probablement défectueux et doit être remplacé. Vérifier visuellement votre tableau : marques de chauffe (jaunissement autour d'une vis, traces noires, plastiques fondus), modules cassés ou fissurés, étiquetage absent ou effacé, poussière accumulée (la poussière conduit l'humidité et favorise les courts-circuits). Compter vos circuits et noter ce que chacun protège — c'est précieux le jour où l'électricien intervient. Identifier visuellement les générations de prises : prises 2 broches sans terre = installation pré-1969 jamais reprise, à signaler en priorité. Mesurer la tension d'une prise avec un multimètre numérique basique : 230 V ± 10 % entre phase et neutre, c'est conforme. Vérifier qu'aucune prise ni interrupteur ne chauffe au toucher après quelques heures d'usage.\n\n**Ce que vous ne devez jamais toucher.** Ouvrir un boîtier de prise ou d'interrupteur pour rebrancher un fil — sauf si vous avez préalablement coupé le disjoncteur divisionnaire correspondant *et* vérifié l'absence de tension avec un VAT (Vérificateur d'Absence de Tension), pas un simple tournevis testeur dont le voyant peut mentir. Remplacer un disjoncteur — sauf à savoir lire un schéma de tableau, distinguer phase et neutre, et respecter rigoureusement le calibre et la courbe d'origine. Modifier la configuration du tableau : ajout d'un module, déplacement de circuit, modification de routage — strictement interdit hors électricien qualifié, parce que vous n'avez aucune visibilité sur l'impact en cas de court-circuit ou de défaut. Travailler sur le tableau d'abonné Enedis (en amont de votre disjoncteur de branchement) : c'est la responsabilité du distributeur, et toucher relève d'une infraction. Toucher quoi que ce soit dans une installation humide (salle de bain où il y a eu une fuite, gaine technique inondée, sous-sol après une infiltration) sans coupure générale préalable et vérification VAT.\n\n**Le scénario que je documente régulièrement comme expert.** Particulier qui veut remplacer une prise en autonomie. Coupe ce qu'il pense être le bon disjoncteur. Le tableau est mal étiqueté ou pas étiqueté du tout (fréquent à Issy sur les rénovations 2000-2010). Il dévisse la prise, son tournevis touche la phase encore active, choc électrique. La règle est simple, et je la répète à chaque formation Qualifelec : **avant de toucher, on isole. Avant d'isoler, on identifie. Avant d'identifier, on coupe le général. Et même là, on vérifie avec un VAT.** Cette règle, qui vient du compagnonnage électricien depuis 80 ans, sauve des vies.\n\n**Le réflexe en cas d'incident.** Vous sentez une odeur de brûlé dans une pièce, une prise chauffe anormalement, vous voyez de la fumée près d'un tableau ou d'un appareil : *coupez immédiatement le disjoncteur d'abonné* (le gros interrupteur en tête de tableau), n'essayez pas d'isoler le circuit défaillant, débranchez visiblement les appareils si vous le pouvez en sécurité, et appelez Joël au 01 41 69 10 08. Le risque d'incendie différé est réel : un échauffement non traité peut couver plusieurs heures avant départ de feu. Diagnostic et mise en sécurité dès 99 € TTC, prix annoncé avant, intervention 24h/24 sans majoration nuit ou week-end.",
    },
  ],
  vraisPrix: [
    {
      service: "Remplacement de prise ou interrupteur HS (logement neuf ou ancien)",
      prixJoel: 59,
      prixArnaqueur: "29€ annoncé → 290-460€ facturé (faux supplément accès, fausse fourniture spécifique)",
      pourquoi:
        "Le coût matière d'une prise standard NF est de 3 à 8 €, jusqu'à 15 € pour une prise commandée domotique récente. La pose en logement neuf RT2012/RE2020 demande la même méthode qu'en ancien : coupure du divisionnaire, vérification VAT, démontage, remontage, test. Joël annonce 59 € TTC pose comprise pour ce service, fourniture standard incluse. Au-delà de 100 €, demandez justification écrite avant intervention.",
    },
    {
      service: "Diagnostic différentiel qui déclenche sur tableau RT2012",
      prixJoel: 79,
      prixArnaqueur: "39€ annoncé → 380-650€ facturé (faux changement de tableau facturé sans justification)",
      pourquoi:
        "Sur un tableau RT2012 ou RE2020, le diagnostic d'un différentiel qui déclenche demande méthode : isolation circuits un par un, mesure d'isolement au mégohmmètre, test du module au pinceau différentiel, vérification du type (AC vs A) et de l'adéquation au circuit protégé. Joël diagnostique pour 79 € TTC, prix annoncé avant. Si la cause est un module type AC à reprendre en type A, remplacement à 129 € TTC, sans facturer une refonte complète injustifiée.",
    },
    {
      service: "Court-circuit avec mise en sécurité immédiate (urgence)",
      prixJoel: 99,
      prixArnaqueur: "49€ annoncé → 480-780€ facturé (faux composants, majoration nuit pourtant interdite si non annoncée)",
      pourquoi:
        "Sur court-circuit avec dégagement de fumée ou plastique fondu, intervention 24h/24 chez Joël à 99 € TTC tout compris, sans majoration nuit, week-end ou jour férié. Identification du circuit, isolation, réparation ou condamnation provisoire, remise sous tension du reste de l'installation, recommandations. La jurisprudence interdit toute majoration nuit non annoncée préalablement, méfiez-vous des prestataires qui appliquent cette pratique.",
    },
    {
      service: "Création circuit dédié IRVE (borne wallbox 7,4 kW résidentielle)",
      prixJoel: 890,
      prixArnaqueur: "Forfait flou 2 800-4 500€ pour pose simple monophasée",
      pourquoi:
        "Une wallbox 7,4 kW monophasée installée sur un parking privatif de pavillon ou copropriété d'Issy avec accès simple, électricien Joël qualifié IRVE, comprend : la wallbox certifiée (250-450 € matière), le différentiel type A 30 mA dédié (90 €), le disjoncteur 32 A courbe C dédié (40 €), la section de câble adéquate 6 mm² (80-150 € selon longueur), la pose et le raccordement (200-350 €), l'attestation et la déclaration. Total 890 à 1 950 € TTC. Au-delà de 2 200 €, demandez le détail. Pour une 11 kW triphasée avec différentiel type B, comptez 1 600-3 200 € TTC.",
    },
    {
      service: "Mise aux normes ciblée (logement ancien Hauts-d'Issy ou Épinettes)",
      prixJoel: 199,
      prixArnaqueur: "Forfait opaque 3 500-5 800€ pour soi-disant 'tout reprendre'",
      pourquoi:
        "Sur les installations anciennes des Hauts-d'Issy, des Épinettes ou du quartier Centre, une mise aux normes intelligente coûte de 199 € (cas simple : ajout d'un différentiel 30 mA en tête) à 1 400 € TTC (création de plusieurs circuits dédiés, mise à la terre, étiquetage, liaison équipotentielle salle de bain). La refonte intégrale au-delà de 3 000 € ne se justifie que si le diagnostic démontre point par point une vétusté généralisée — exigez systématiquement ce diagnostic écrit.",
    },
    {
      service: "Dépannage module domotique (KNX, Wiser, Tebis, MyHome)",
      prixJoel: 149,
      prixArnaqueur: "Tarification horaire opaque, durée artificiellement allongée, remplacement total facturé",
      pourquoi:
        "Sur les tableaux domotiques RT2012/RE2020 d'Issy, beaucoup de pannes se règlent par diagnostic ciblé et remplacement d'un seul module : un variateur DALI, une prise commandée fatiguée, une pile d'horloge passerelle. Joël intervient à partir de 149 € TTC pour le diagnostic et la première intervention modulaire. Le remplacement complet d'une passerelle (350 à 950 € TTC selon protocole) ne se justifie qu'après preuve qu'elle est en cause, jamais en première intention.",
    },
  ],
  faqLocale: [
    {
      question: "Mon tableau RT2012 livré en 2015 dans le Val-de-Seine déclenche depuis qu'on a installé une plaque induction : pourquoi ?",
      answer:
        "Très probablement parce que le différentiel qui protège le circuit cuisson est de type AC (sensible aux courants alternatifs uniquement), alors que la NF C 15-100 amendement A5 impose un type A (sensible aussi aux courants continus pulsés) pour les plaques induction modernes. Sur les premiers tableaux RT2012 livrés 2013-2017, beaucoup d'installateurs ont posé du type AC par défaut. Quand vous branchez une plaque induction avec onduleur, le module type AC voit des courants continus qu'il ne sait pas analyser correctement et déclenche pour rien — ou pire, ne déclenche pas en cas de défaut réel. Joël remplace le module par un type A pour 129 € TTC, prix annoncé avant.",
    },
    {
      question: "Je veux installer une borne IRVE chez moi en pavillon aux Hauts-d'Issy : quelle est la procédure ?",
      answer:
        "Quatre étapes. Première : audit gratuit Joël sur place pour vérifier la puissance souscrite (souvent à augmenter de 9 à 12 kVA), le calibre du tableau, la longueur de câble jusqu'à l'emplacement de stationnement, la possibilité technique (présence d'une gaine, accès au tableau). Deuxième : devis fixe annoncé avant, comprenant la wallbox certifiée, le différentiel type A dédié (ou type B si triphasé), le disjoncteur, la section de câble adéquate, la pose, l'attestation. Fourchette : 890 à 1 950 € TTC pour une 7,4 kW monophasée, 1 600 à 3 200 € TTC pour une 11 kW triphasée. Troisième : intervention sous 5 à 10 jours selon disponibilité matériel. Quatrième : déclaration éventuelle au Consuel pour les puissances supérieures à 11 kW. Joël est qualifié IRVE niveau 1 et 2, garantie décennale, éligibilité prime ADVENIR documentée.",
    },
    {
      question: "Mon installation domotique KNX du Fort d'Issy s'affiche 'hors ligne' depuis trois semaines : que faire ?",
      answer:
        "Ne touchez à rien dans le tableau. Le KNX (Konnex Standard) est un protocole bus dédié qui demande des outils spécifiques pour le diagnostic, notamment le logiciel ETS de l'association KNX. Trois causes possibles. Première (la plus fréquente) : la passerelle qui fait le pont entre le bus KNX et votre application smartphone est tombée — firmware planté, alimentation faible, ou simplement vieillissement (les passerelles KNX ont une durée de vie commerciale de 6 à 10 ans). Deuxième : un module sur le bus s'est mis en court-circuit et bloque le dialogue. Troisième : votre box internet a changé d'IP et la passerelle a perdu sa configuration. Joël diagnostique pour 149 € TTC, prix annoncé avant, et propose si nécessaire le remplacement de la passerelle (350-950 € TTC selon modèle).",
    },
    {
      question: "Mon ballon thermodynamique RE2020 fait sauter le différentiel chaque nuit dans mon T3 de l'Île-Saint-Germain : pourquoi ?",
      answer:
        "Très probablement un cumul de courants de fuite résiduels normaux (compresseur de pompe à chaleur, électronique de régulation) qui dépasse les 30 mA en limite de seuil. Sur les ballons thermodynamiques de génération 2012-2018, c'est devenu un problème connu, particulièrement quand le différentiel qui protège le circuit est partagé avec d'autres usages forts. Diagnostic Joël au mégohmmètre pour distinguer un vrai défaut d'isolement (à traiter d'urgence, garantie constructeur si appareil de moins de 5 ans) d'un cumul normal de fuites (à régler en redistribuant les circuits sur plusieurs différentiels, ou en passant à un différentiel 100 mA sélectif amont). Coût diagnostic : 79 € TTC, prix annoncé avant.",
    },
    {
      question: "J'ai vu sur mon DT-Élec d'avant-vente 'absence de différentiel 30 mA' : c'est grave ?",
      answer:
        "Oui, c'est une anomalie majeure. Sans interrupteur différentiel 30 mA, vous n'avez aucune protection contre l'électrisation : un défaut d'isolement sur un appareil métallique met le boîtier sous tension à 230 V, et toute personne qui le touche est traversée par un courant potentiellement mortel. C'est la première mise aux normes que je recommande systématiquement, à Issy comme ailleurs. Coût Joël : à partir de 199 € TTC pour l'ajout d'un interrupteur différentiel 30 mA en tête de tableau, fourniture et pose comprises, prix annoncé avant. Sur un appartement aux Hauts-d'Issy ou aux Épinettes des années 70 sans aucun différentiel, c'est l'investissement de sécurité numéro un — bien plus important que de refaire l'esthétique du tableau.",
    },
    {
      question: "Le DT-Élec annonce 'liaison équipotentielle non vérifiée' pour ma salle de bain : qu'est-ce que ça signifie ?",
      answer:
        "Pédagogiquement : tous les éléments métalliques de votre salle de bain (canalisation eau froide, eau chaude, vidange, baignoire ou cabine de douche, sèche-serviettes électrique) doivent être reliés entre eux par un fil de cuivre vert/jaune de section 2,5 ou 6 mm² (selon configuration), et ce maillage doit être raccordé à la terre. C'est la liaison équipotentielle locale, prévue par la NF C 15-100 article 701. Son rôle : éviter qu'en cas de défaut sur un élément, vous touchiez simultanément un élément sous tension et un élément à la terre, ce qui vous traverserait. Sur les Hauts-d'Issy et certaines copropriétés des Épinettes, je découvre régulièrement que cette liaison a été coupée lors d'un remplacement de baignoire ou n'a jamais été posée. Reprise Joël : 180 à 380 € TTC selon accès, prix annoncé avant.",
    },
    {
      question: "Je suis locataire à Issy, mon disjoncteur saute tous les soirs : qui doit payer le dépannage ?",
      answer:
        "En principe, le décret 87-712 sur les réparations locatives place l'entretien courant des prises et interrupteurs à la charge du locataire, mais les défaillances liées à la vétusté de l'installation, au tableau électrique, aux différentiels et au câblage restent à la charge du propriétaire. Concrètement : si votre disjoncteur saute parce qu'un de vos appareils est en défaut, c'est vous. Si c'est parce que le tableau est ancien et que les différentiels sont en bout de course, c'est le propriétaire. Le diagnostic Joël (79 € TTC) permet d'établir la cause par écrit, ce qui est essentiel pour la conversation avec votre bailleur. Si la cause est imputable au logement, vous pouvez demander remboursement par lettre recommandée avec accusé de réception au propriétaire.",
    },
    {
      question: "Combien de temps Joël met pour intervenir à Issy en cas d'urgence ?",
      answer:
        "En moyenne 20 à 30 minutes entre l'appel au 01 41 69 10 08 et la sonnette à votre porte. Issy fait 4,25 km², les artisans Joël couvrant le secteur sont positionnés sur les communes voisines (Vanves, Boulogne-Billancourt, Meudon, Clamart, 15e arrondissement de Paris). En heure de pointe le soir (18-20h en semaine), le délai peut s'étirer à 45-60 minutes selon les axes (la rue du Général-Leclerc et le pont d'Issy sont souvent saturés). Pour les urgences réelles (court-circuit avec fumée, odeur de brûlé persistante, plus aucun courant général), nous priorisons et nous communiquons par téléphone une estimation de délai au moment de l'appel. Pas d'intervention facturée si nous arrivons après le délai annoncé.",
    },
    {
      question: "Mon syndic m'annonce une mise aux normes du TGBT collectif de mon immeuble du Val-de-Seine : qui paye ?",
      answer:
        "Le TGBT (Tableau Général Basse Tension) collectif est une partie commune. Il se trouve dans le local technique en sous-sol ou au pied de l'ascenseur, et distribue le courant aux compteurs individuels. Les travaux sont donc votés en assemblée générale et financés par le budget travaux de la copropriété, au prorata de vos tantièmes. À ne pas confondre avec votre tableau divisionnaire personnel, qui est en partie privative et à votre charge exclusive. Ordre de grandeur sur un immeuble Val-de-Seine de 80-120 logements : la mise aux normes TGBT collectif coûte entre 12 000 et 35 000 € TTC selon complexité (simple ajout différentiel ou refonte complète), soit 100 à 450 € par logement. Demandez plusieurs devis comparatifs à votre syndic — c'est votre droit de copropriétaire.",
    },
    {
      question: "Mes voisins du Val-de-Seine et moi avons eu un disjoncteur qui sautait la même nuit après un orage : que s'est-il passé ?",
      answer:
        "Très probablement une surtension réseau injectée par Enedis suite à l'orage. La foudre tombe sur une ligne aérienne ou un transformateur de quartier, génère un pic de tension qui se propage dans la grappe d'immeubles raccordée, et chaque installation absorbe ce pic à sa façon. Si votre tableau est équipé d'un parasurtenseur de type 2 (obligatoire en zone foudre depuis l'amendement A5 NF C 15-100, optionnel ailleurs mais souvent posé en série sur les programmes RT2012 récents), il a écrêté la surtension et un disjoncteur en aval a déclenché par sécurité. C'est en réalité une bonne nouvelle : votre installation a fonctionné. Si vous n'avez pas de parasurtenseur, je recommande son ajout sur les programmes Val-de-Seine (Issy étant proche de la Seine, exposition aux orages plus marquée que la moyenne francilienne). Coût Joël : 189 € TTC pour la pose d'un parasurtenseur type 2 en tête de tableau, prix annoncé avant.",
    },
    {
      question: "Pourquoi mes prises USB intégrées se mettent à chauffer dans mon T2 récent du Fort d'Issy ?",
      answer:
        "Les prises avec ports USB intégrés (5 V continu) tirent leur alimentation directement sur le 230 V derrière la plaque, via un transformateur miniature à découpage. Ce transformateur a un rendement de 70 à 85 %, et la chaleur résiduelle reste piégée dans le boîtier d'encastrement. Si vous laissez en permanence un appareil branché en charge (téléphone qui passe la nuit, tablette en charge continue), vous maintenez le transformateur en sollicitation, et la chaleur s'accumule. Sur les programmes Fort d'Issy livrés avec des boîtiers d'encastrement standards (parfois trop petits pour ces modules), la dissipation thermique est insuffisante et les composants vieillissent vite. Solution : débrancher les chargeurs USB lorsque les appareils sont chargés (geste qui économise aussi de l'énergie en veille), et faire vérifier par Joël si la chauffe persiste — il peut s'agir d'un défaut interne du module USB (à remplacer 89-130 € TTC).",
    },
    {
      question: "Ma facture Linky a doublé depuis que j'utilise ma borne IRVE : c'est normal ?",
      answer:
        "Mathématiquement oui. Une voiture électrique moyenne (40-55 kWh de batterie) consomme 12 à 18 kWh aux 100 km. À 15 000 km/an, vous ajoutez 1 800 à 2 700 kWh par an à votre consommation domestique, soit 360 à 540 € par an au tarif Bleu réglementé d'environ 0,20 €/kWh (tarif heures pleines 2026). Conseils Joël pour optimiser. Premier : programmer la borne pour ne charger qu'en heures creuses (généralement 22h-6h selon contrat) — économie 30 à 40 % sur cette consommation spécifique. Deuxième : vérifier que votre puissance souscrite est ajustée à votre usage réel ; un dépassement permanent crée une majoration. Troisième : vérifier que votre installation ne présente pas de défaut d'isolement caché (consommation à vide hors charge VE) — diagnostic Joël 89 € TTC, prix annoncé avant.",
    },
  ],
  temoignages: [
    {
      auteur: "Sophie et Antoine D.",
      quartierOuRue: "rue Hoche (Val-de-Seine)",
      date: "2026-04-08",
      rating: 5,
      serviceRendered: "Diagnostic différentiel RT2012 qui sautait à l'allumage de la plaque induction",
      texte:
        "Notre tableau RT2012 livré en 2016 nous lâchait dès qu'on lançait la plaque induction. On a appelé Joël après le passage de deux autres entreprises qui voulaient nous refaire le tableau pour 4 200 €. Karim — pas le rédacteur de la page, un de ses confrères Joël — est arrivé en 25 minutes, a identifié en 15 minutes que le différentiel posé d'origine était de type AC au lieu de type A obligatoire pour l'induction, et nous a remplacé le module pour 129 € TTC tout compris, prix annoncé au téléphone avant déplacement. Plus aucun problème depuis. Honnête et compétent.",
    },
    {
      auteur: "Mehdi K.",
      quartierOuRue: "Île-Saint-Germain (résidence neuve)",
      date: "2026-02-22",
      rating: 5,
      serviceRendered: "Installation borne IRVE 11 kW triphasée en parking privatif",
      texte:
        "Acheté un Tesla Model Y, besoin d'une wallbox 11 kW triphasée à mon emplacement de parking privatif. J'ai fait quatre devis : 3 800 €, 4 200 €, 4 600 € et celui de Joël à 2 380 € TTC tout compris (wallbox, différentiel type B, disjoncteur, section de câble 10 mm² sur 18 mètres, pose, attestation pour ADVENIR). L'électricien Joël qualifié IRVE 2 a fait le travail en une demi-journée, propre, gaine encastrée le long du chemin de câble existant. Je recharge ma voiture toutes les nuits depuis trois mois, zéro problème. Devis tenu au centime près.",
    },
    {
      auteur: "Caroline L.",
      quartierOuRue: "rue du Général-Leclerc (Centre)",
      date: "2026-03-14",
      rating: 5,
      serviceRendered: "Mise aux normes ciblée tableau de 1978 lors d'un achat",
      texte:
        "Acheté un appartement aux Hauts-d'Issy avec un tableau d'origine de 1978, le DT-Élec annonçait 9 anomalies. Trois autres entreprises voulaient me facturer entre 4 500 et 6 200 € pour 'tout refaire'. Joël a diagnostiqué et m'a expliqué qu'on pouvait faire une mise aux normes ciblée : ajout d'un différentiel 30 mA en tête, création d'un circuit dédié plaque induction, reprise de la liaison équipotentielle salle de bain, étiquetage complet. Total facturé : 1 180 € TTC, exactement le devis. Travaux faits en une journée. Vraie pédagogie tout au long, vraiment des artisans honnêtes.",
    },
    {
      auteur: "Pierre-Yves R.",
      quartierOuRue: "Fort d'Issy (résidence RE2020)",
      date: "2026-01-29",
      rating: 5,
      serviceRendered: "Dépannage passerelle KNX hors ligne depuis 4 semaines",
      texte:
        "Notre passerelle KNX du Fort d'Issy était hors ligne depuis un mois, l'application smartphone affichait 'déconnecté', les volets ne se commandaient plus et le scénario du matin ne s'enclenchait pas. Le syndic m'a orienté vers Joël qui a un partenaire qualifié domotique. Diagnostic en 45 minutes avec ETS sur le bus, identification d'un firmware corrompu après une mise à jour ratée, reflashage manuel de la passerelle. Total : 220 € TTC, devis annoncé avant intervention. Tout est revenu en ordre depuis. Bien meilleur que le service du fabricant qui me proposait juste de remplacer la passerelle pour 1 100 €.",
    },
    {
      auteur: "Karima T.",
      quartierOuRue: "rue Ernest-Renan (Épinettes)",
      date: "2026-03-30",
      rating: 5,
      serviceRendered: "Court-circuit nocturne avec odeur de brûlé un dimanche",
      texte:
        "Un dimanche à 23h, gros bruit dans la cuisine, plus aucun courant et une odeur de brûlé qui montait dans tout l'appartement. Je n'ai même pas hésité, j'ai appelé Joël au 01 41 69 10 08, l'électricien était chez moi à 23h32, prix annoncé au téléphone : 99 € TTC sans majoration nuit ou dimanche, pas un centime de plus. Diagnostic rapide : la prise du four avait grillé, mauvais contact ancien suite au déménagement précédent. Mise en sécurité immédiate, remplacement du module et vérification du circuit. Facture exactement comme annoncée. Le contraste avec ce qu'on voit sur les arnaques est frappant.",
    },
    {
      auteur: "Vincent et Léa C.",
      quartierOuRue: "avenue Bourgain (Centre)",
      date: "2026-02-14",
      rating: 5,
      serviceRendered: "Création d'un circuit dédié coin TV-multimédia",
      texte:
        "Studio dans une copropriété ancienne avenue Bourgain, on avait fait fondre deux multiprises en six mois derrière le canapé : box, télé, console, chargeurs PC et téléphone, le tout sur une seule prise. Joël nous a tiré un circuit dédié 16 A depuis le tableau jusqu'au coin télé, avec quatre prises encastrées et son propre disjoncteur. Devis annoncé avant : 380 € TTC tout compris. Travail fait en quatre heures, peinture pas abîmée, plus aucun problème depuis cinq mois. Et la prochaine multiprise qu'on achète on prendra une certifiée NF, leçon retenue.",
    },
  ],
  internalLinks: [
    {
      url: "/electricite",
      anchor: "Tous les services électricité Joël en Île-de-France",
      contexte: "vue d'ensemble du métier",
    },
    {
      url: "/electricite/tarifs",
      anchor: "Grille tarifaire complète électricien Joël",
      contexte: "tous les prix fixes annoncés avant intervention",
    },
    {
      url: "/electricien/panne-electrique",
      anchor: "Panne électrique : guide diagnostic et intervention",
      contexte: "comprendre une panne avant l'appel",
    },
    {
      url: "/electricien/disjoncteur-saute",
      anchor: "Disjoncteur qui saute : 5 causes et solutions",
      contexte: "diagnostic des disjoncteurs récurrents",
    },
    {
      url: "/electricien/tableau-electrique",
      anchor: "Tableau électrique : dépannage et remplacement",
      contexte: "tableau ancien à reprendre ou tableau RT2012/RE2020 à réajuster",
    },
    {
      url: "/electricien/prise-interrupteur-hs",
      anchor: "Prise ou interrupteur HS : intervention dès 59 €",
      contexte: "remplacement rapide et conforme NF C 15-100",
    },
    {
      url: "/electricien/court-circuit",
      anchor: "Court-circuit : intervention urgente et mise en sécurité",
      contexte: "le réflexe quand ça sent le brûlé",
    },
    {
      url: "/electricien/mise-aux-normes",
      anchor: "Mise aux normes NF C 15-100 : ce qui est vraiment obligatoire",
      contexte: "distinguer obligation réelle et discours commercial",
    },
    {
      url: "/blog/arnaques-plomberie-comment-eviter",
      anchor: "Comment éviter les arnaques aux dépannages d'urgence",
      contexte: "mécanismes type des arnaques au dépannage",
    },
    {
      url: "/stop-arnaques",
      anchor: "Stop aux arnaques : la charte Joël",
      contexte: "engagements anti-arnaque écrits noir sur blanc",
    },
    {
      url: "/a-propos",
      anchor: "Qui sommes-nous, Joël",
      contexte: "le réseau d'artisans certifiés et la philosophie marque",
    },
    {
      url: "/contact",
      anchor: "Contacter Joël ou demander un rappel",
      contexte: "formulaire et numéro 24h/24",
    },
  ],
  tags: [
    "issy-les-moulineaux",
    "92130",
    "electricien",
    "rt2012",
    "re2020",
    "irve",
    "borne-recharge-vehicule-electrique",
    "domotique",
    "knx",
    "tableau-electrique",
    "differentiel-type-a",
    "nf-c-15-100",
    "val-de-seine",
    "fort-d-issy",
    "ile-saint-germain",
    "hauts-d-issy",
    "epinettes",
    "karim-benali",
  ],
};
