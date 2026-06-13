import type { PremiumPageContent } from "../types";

export const content: PremiumPageContent = {
  trade: "plombier",
  citySlug: "aubervilliers",
  serviceSlug: "ballon-eau-chaude",
  authorPersona: "rene-salvador",
  publishedAt: "2026-06-09",
  updatedAt: "2026-06-09",
  metaTitle: "Ballon eau chaude Aubervilliers (93300) dès 129€ — 24h/24",
  metaDescription:
    "Ballon d'eau chaude en panne à Aubervilliers ? Dépannage dès 129€ TTC, prix fixe annoncé avant, 0 majoration nuit & week-end. 24h/24 : 01 41 69 10 08.",
  h1: "Ballon d'eau chaude à Aubervilliers : 40 ans d'hydraulique pour comprendre votre panne (et payer le juste prix)",
  introParagraph: `### Une douche froide n'est jamais un hasard

Je m'appelle René. J'ai passé quarante ans à EDF, de 1978 à 2018, à m'occuper d'hydraulique — des pompes, des réseaux, de la pression. Aujourd'hui retraité, je tiens des permanences bénévoles à l'UFC-Que Choisir, où je reçois chaque mois des gens qui ont payé 900€ pour une panne de ballon qui en valait 130. Cette page est née de ces permanences.

Aubervilliers, je la connais bien : **88 365 habitants** selon les populations légales **INSEE 2023** (en vigueur au 1er janvier 2026), un parc de logements parmi les plus contrastés d'Île-de-France, et une eau — celle de la Marne, traitée à l'usine de **Neuilly-sur-Marne** pour le compte du **SEDIF** — que le contrôle sanitaire classe parmi les **eaux dures**. Autrement dit : du calcaire. Et le calcaire, pour un ballon d'eau chaude, c'est l'usure programmée. Votre cumulus des Quatre-Chemins ou de La Maladrerie ne tombe pas en panne par malchance ; il tombe en panne parce que la physique a fait son travail, lentement, dans le silence de votre cellier.

### Ce que vous trouverez ici

Je vais vous expliquer, posément, ce que l'eau d'ici fait à votre cuve ; les cinq pannes que je croise le plus souvent et ce qu'elles signifient vraiment ; les vérifications gratuites à faire **avant** d'appeler qui que ce soit ; comment décider entre réparer et remplacer ; et les trois arnaques types que je vois passer en permanence — avec leurs parades.

Et si au bout du compte il faut un artisan, sachez ceci : le réseau Joël intervient à Aubervilliers **dès 129€ TTC**, avec un **prix fixe annoncé avant l'intervention**, **24h/24 et sans aucune majoration de nuit ni de week-end**, au **01 41 69 10 08**. C'est le modèle que je défends depuis toujours : on annonce, puis on intervient. Jamais l'inverse.`,
  sections: [
    {
      anchor: "eau-marne-calcaire-ballon-aubervilliers",
      title: "Ce que l'eau de la Marne dépose dans votre cuve : le calcaire expliqué simplement",
      body: `Commençons par le commencement, comme on me l'a appris en 1978 : avant de parler de la panne, on parle du fluide. L'eau qui sort de vos robinets à Aubervilliers est une eau de rivière. Elle est prélevée dans la **Marne**, traitée à l'usine de **Neuilly-sur-Marne**, puis distribuée par **Veolia Eau d'Île-de-France** pour le compte du **SEDIF**, le Syndicat des Eaux d'Île-de-France, qui dessert la commune. C'est une eau parfaitement potable, très surveillée. Mais elle a une caractéristique qui nous intéresse au premier chef : sa **dureté**.

La dureté, c'est la concentration en calcium et en magnésium, mesurée en degrés français — un degré français représente 10 milligrammes de carbonate de calcium par litre. Les relevés du contrôle sanitaire publiés par le ministère de la Santé classent l'eau distribuée à Aubervilliers parmi les **eaux dures**, comme l'essentiel de l'eau de la Marne en Île-de-France — généralement entre 20 et 30 degrés français selon les campagnes de mesure. Le SEDIF lui-même communique sur son projet de filtration membranaire destiné, à terme, à distribuer une eau moins calcaire : c'est dire si le sujet est réel, et reconnu par le distributeur.

Maintenant, la physique — et je vous promets qu'elle est simple. Le carbonate de calcium a une particularité contre-intuitive : **il est moins soluble dans l'eau chaude que dans l'eau froide**. La plupart des choses se dissolvent mieux à chaud ; lui, c'est l'inverse. Conséquence directe : dans votre ballon, là où l'eau est chauffée à 55-65°C, le calcaire précipite. Il se dépose en priorité sur la pièce la plus chaude du système — la **résistance** — puis sédimente au fond de la cuve, année après année, en une couche de boue calcaire que personne ne voit jamais.

Ce dépôt a trois effets, et les trois vous coûtent de l'argent. Premier effet : le tartre est un **isolant thermique**. Une résistance gainée de calcaire doit chauffer plus longtemps pour produire la même eau chaude — votre facture d'électricité grimpe sans que rien ne semble avoir changé. Deuxième effet : cette même résistance, qui travaille plus fort et évacue mal sa chaleur, **vieillit prématurément** jusqu'au jour où elle claque. Troisième effet : la boue calcaire au fond de la cuve réduit le volume d'eau chaude réellement disponible — vous avez acheté 200 litres, vous en chauffez peut-être 160.

Ajoutez à cela la question de l'**anode en magnésium**. C'est une pièce sacrificielle : elle se corrode volontairement, par un phénomène électrochimique, pour protéger l'acier de la cuve. Dans une eau dure et minéralisée, elle se consume à son rythme — et quand elle est épuisée, c'est la cuve elle-même qui commence à rouiller. Une cuve percée ne se répare pas. Jamais. Quiconque vous propose de « ressouder une cuve » vous raconte une histoire.

Voilà pourquoi je dis aux gens que je reçois : à Aubervilliers, un ballon n'est pas un appareil qu'on installe et qu'on oublie. C'est un réservoir sous pression qui livre une guerre lente contre l'eau qui le remplit. Bien entretenu — détartré périodiquement, anode contrôlée — il tient quinze ans. Ignoré, il en tient huit, et il choisit toujours le matin de janvier pour vous lâcher.`,
    },
    {
      anchor: "cinq-pannes-ballon-physique",
      title: "Les cinq pannes que je croise, et ce que la physique en dit",
      body: `En quarante ans de réseaux et huit ans de permanences consommateurs, j'ai fini par constater que les pannes de ballon se rangent presque toutes dans cinq tiroirs. Connaître le tiroir, c'est déjà savoir si l'intervention vaut 129€ ou 600€ — et donc repérer immédiatement celui qui voudrait vous facturer le second prix pour le premier problème.

**Panne n°1 : plus d'eau chaude du tout.** Trois suspects, par ordre de probabilité. D'abord le **contacteur jour/nuit** de votre tableau électrique : s'il est resté coincé ou si votre abonnement heures creuses a changé, le ballon ne reçoit tout simplement plus de courant. Ça se vérifie en deux minutes et ça ne coûte rien — j'y reviens dans la section suivante. Ensuite le **thermostat**, qui s'est mis en sécurité ou a rendu l'âme : pièce à quelques dizaines d'euros. Enfin la **résistance**, étouffée par le tartre dont je vous parlais : c'est la panne classique de l'eau dure albertivillarienne. Aucun de ces trois cas ne justifie de remplacer le ballon.

**Panne n°2 : une eau tiède, ou de moins en moins d'eau chaude.** C'est la signature du calcaire. Soit la résistance entartrée n'arrive plus à monter la température, soit la couche de sédiments a mangé le volume utile de la cuve, soit le thermostat fatigue. Un détartrage complet avec contrôle de l'anode redonne en général une seconde jeunesse à l'appareil. Le bon réflexe, pas le remplacement.

**Panne n°3 : le groupe de sécurité qui goutte.** Là, j'arrête tout le monde, parce que c'est le malentendu le plus rentable pour les margoulins. L'eau, en chauffant de 15 à 65°C, **se dilate** — d'environ 2 à 3 % de son volume. Pour un ballon de 200 litres, cela fait quelques litres qui doivent bien aller quelque part. Le groupe de sécurité est précisément conçu pour évacuer ce surplus : **un goutte-à-goutte pendant les heures de chauffe est normal**. C'est le signe que la pièce fait son travail. En revanche, un écoulement **continu, jour et nuit**, signale autre chose : soit un groupe usé dont le clapet ne ferme plus, soit une pression de réseau trop élevée — au-delà de 4 à 5 bars, il faut envisager un réducteur de pression. Mon vieux réflexe d'hydraulicien : la pression, ça se mesure avant de se discuter. Un manomètre à 15€ sur un robinet vous donne la réponse.

**Panne n°4 : une eau brunâtre ou une odeur désagréable au robinet d'eau chaude seulement.** Si l'eau froide est claire et l'eau chaude colorée, le problème est dans le ballon : anode épuisée, corrosion qui démarre dans la cuve, sédiments brassés. C'est le signal d'alarme le plus sérieux des cinq. À ce stade, un diagnostic honnête doit trancher : si la cuve est attaquée, on planifie un remplacement — sereinement, sans urgence fabriquée, tant qu'elle ne fuit pas.

**Panne n°5 : le disjoncteur qui saute quand le ballon chauffe.** Typiquement une résistance blindée dont la gaine s'est fissurée — souvent à cause, encore, du tartre qui a créé des points de surchauffe. Le courant fuit vers la terre, le différentiel coupe. C'est une panne franche, bien identifiable, qui se règle par le remplacement de la résistance. Surtout, ne « forcez » jamais en réarmant en boucle : le différentiel vous protège, laissez-le faire son métier.

Vous remarquerez une constante : **quatre pannes sur cinq se réparent**, pour une fraction du prix d'un ballon neuf. Retenez bien cette proportion. Elle est exactement inverse de celle qu'annoncent certains dépanneurs pressés.`,
    },
    {
      anchor: "verifications-avant-appel-ufc",
      title: "Avant de décrocher votre téléphone : les trois vérifications de mes permanences",
      body: `À chaque permanence UFC-Que Choisir, je donne la même petite liste. Elle ne demande aucun outil, aucune compétence, aucun risque — et elle évite environ un dépannage sur cinq. Prenez cinq minutes, dans l'ordre.

**Vérification n°1 : le contacteur heures creuses.** Ouvrez votre tableau électrique. Cherchez un petit module avec trois positions : **0 / Auto / 1** (ou « marche forcée »). En position Auto, le ballon ne chauffe que la nuit, pendant les heures creuses de votre abonnement. Basculez-le sur **1**, attendez deux à trois heures, et ouvrez un robinet d'eau chaude. Si l'eau revient, votre ballon va très bien : c'est le contacteur, le compteur ou votre abonnement qui mérite attention. J'ai vu des gens à deux doigts de payer un ballon neuf pour un contacteur resté sur 0 après une coupure de courant. Pendant que vous y êtes, vérifiez que le **disjoncteur dédié au chauffe-eau** (généralement 16 ou 20 ampères) est bien enclenché.

**Vérification n°2 : la manœuvre du groupe de sécurité.** Sous ou à côté de votre ballon, repérez le groupe de sécurité — ce petit appareillage en laiton avec une molette rouge ou noire. Tournez doucement la molette d'un quart de tour : de l'eau doit s'écouler franchement dans le siphon, puis s'arrêter net quand vous refermez. Cette manœuvre, à faire **une fois par mois**, chasse les dépôts qui empêchent le clapet de bien fermer. Si la molette est bloquée ou si l'écoulement ne s'arrête plus, vous avez identifié votre coupable — et c'est une réparation modeste, pas un drame.

**Vérification n°3 : le contexte.** Posez-vous trois questions de bon sens. L'eau froide arrive-t-elle normalement partout ? (Si non, le problème est en amont — réseau, vanne, voire chantier dans la rue : à Aubervilliers, entre le prolongement des transports et les opérations de rénovation urbaine, les travaux de voirie ne manquent pas.) Vos voisins ont-ils de l'eau chaude, si vous êtes en production collective ? (Dans bien des immeubles de La Maladrerie ou des cités gérées par les bailleurs, l'eau chaude est collective : la panne relève alors du gestionnaire, pas de votre portefeuille.) Et enfin : avez-vous reçu un avis de coupure que personne n'a lu dans le hall ?

Si après tout cela l'eau chaude manque toujours, alors oui, il faut un professionnel. Et c'est là que je vous transmets la règle d'or de mes permanences : **exigez le prix avant la visite, pas après**. Le réseau Joël annonce **129€ TTC** pour un dépannage de ballon d'eau chaude à Aubervilliers — déplacement, diagnostic et intervention compris — au **01 41 69 10 08**, à n'importe quelle heure, **sans majoration de nuit, de dimanche ni de jour férié**. Quand le prix est posé d'avance, le rapport de force s'inverse : c'est vous qui décidez, plus personne ne peut improviser une facture dans votre cuisine.

Un dernier mot pour les plus bricoleurs : ne démontez jamais vous-même une résistance ou un thermostat sans avoir coupé le disjoncteur dédié **et** vérifié l'absence de tension. Un ballon, c'est de l'eau et de l'électricité dans le même mètre cube. Les deux font très bon ménage avec la prudence, et très mauvais ménage entre eux.`,
    },
    {
      anchor: "quartiers-aubervilliers-parc-ballons",
      title: "Des Quatre-Chemins au Fort : le parc de ballons albertivillarien, quartier par quartier",
      body: `On ne dépanne pas un ballon de la même façon partout. Quarante ans de terrain m'ont appris à lire une ville par ses logements — et Aubervilliers est l'une des communes les plus contrastées que je connaisse en Seine-Saint-Denis. Les fiches de quartiers publiées par la ville en mai 2025 dressent un tableau précis ; je vous le traduis en langage de chauffe-eau.

**Villette – Quatre-Chemins**, au sud-est, le long de l'avenue de la République et autour du métro Quatre-Chemins (ligne 7), c'est le plus gros morceau : plus de **9 600 logements**, dont environ 2 800 logements sociaux et — chiffre qui dit tout — plus de **1 100 logements recensés dans le parc privé potentiellement indigne** (données ville d'Aubervilliers, mai 2025). Concrètement, on y trouve beaucoup de petits immeubles anciens découpés en logements modestes, avec des ballons de 50 à 100 litres installés dans des cuisines ou des cagibis, souvent vieillissants, parfois posés sur des fixations fatiguées. C'est le quartier où je recommande le plus de faire contrôler l'âge de l'appareil : un ballon de quinze ans suspendu au-dessus d'un coin cuisine, dans une eau dure, c'est un dégât des eaux en sursis. Le quartier fait l'objet d'un projet de renouvellement urbain (NPNRU), mais le parc privé, lui, vieillit à son rythme.

**La Maladrerie – Émile Dubois**, à l'est, c'est une autre histoire : l'ensemble emblématique des années 1970, environ **3 121 logements dont 1 940 logements sociaux** selon les mêmes fiches municipales. Là, deux mondes cohabitent : des logements réhabilités par vagues successives, et des installations d'origine où le ballon électrique a déjà été remplacé une ou deux fois depuis la construction. Dans le parc social, réflexe absolu avant toute dépense : **appelez d'abord votre bailleur**. La production d'eau chaude collective et les équipements d'origine relèvent souvent de lui, pas de vous.

**Le centre-ville et la Mairie**, autour de la rue du Moutier et de l'avenue Victor Hugo, mélangent immeubles anciens de faubourg, pavillons de brique et résidences récentes. Depuis le **31 mai 2022**, le prolongement de la **ligne 12** y a ouvert deux stations — **Aimé Césaire** et **Mairie d'Aubervilliers** — qui mettent Saint-Lazare à une vingtaine de minutes (données RATP). Pour nous, dépanneurs et hydrauliciens, cette desserte a un effet très concret : un artisan du réseau circule vite dans ce secteur, que ce soit par le métro des hommes ou par l'A86 et le périphérique pour les fourgons.

**Le Landy et Cristino Garcia**, à l'ouest vers la Plaine Saint-Denis et le canal Saint-Denis, ainsi que le **Fort d'Aubervilliers** au nord-est (ligne 7), concentrent les programmes neufs. Dans ces résidences récentes, les pannes précoces existent — un thermostat défaillant, un groupe de sécurité mal tari — mais elles relèvent souvent de la **garantie du constructeur ou de la décennale du promoteur**. Avant de payer quoi que ce soit dans un logement de moins de dix ans, demandez un diagnostic écrit : c'est votre pièce maîtresse pour faire jouer la garantie. Joël remet systématiquement ce constat avec sa facture.

Enfin, les **Quartiers Nord** — Vallès-La Frette, Cochennec — et le tissu pavillonnaire qui subsiste entre les grands ensembles abritent quantité de ballons de 200 à 300 litres en cave ou en cellier, parfois d'âge canonique. Aux propriétaires de ces pavillons, je redis mon conseil de toujours : notez l'année d'installation au feutre sur la cuve. La mémoire d'un appareil, c'est le début de sa maintenance — et la fin des diagnostics fantaisistes.`,
    },
    {
      anchor: "reparer-ou-remplacer-ballon",
      title: "Réparer ou remplacer ? Le raisonnement d'un retraité qui n'a rien à vous vendre",
      body: `C'est LA question qu'on me pose en permanence, et c'est celle où se joue l'essentiel de votre argent. Je n'ai aucun ballon à vous vendre ; voici donc le raisonnement nu, celui que j'applique pour ma propre maison.

**Le critère n°1, c'est la cuve.** Tout le reste — résistance, thermostat, groupe de sécurité, anode, joint de bride — se remplace pièce par pièce, pour des montants raisonnables. La cuve, non. Si elle est percée, si l'eau chaude sort durablement rouillée, si une auréole humide apparaît sous la jaquette de l'appareil lui-même (et non au groupe de sécurité), la messe est dite : on remplace. Dans tous les autres cas, la réparation mérite d'être chiffrée d'abord.

**Le critère n°2, c'est l'âge.** Un ballon électrique vit en moyenne dix à quinze ans — plutôt dix dans une eau dure comme la nôtre quand il n'a jamais été détartré, plutôt quinze quand il a été suivi. Ma règle de bon père de famille : avant 8 ans, on répare presque toujours ; après 12 ans, on compare honnêtement le coût de la réparation au coût du remplacement ; entre les deux, c'est l'état de l'anode et de la cuve qui tranche. Un artisan sérieux vous montre la pièce déposée et vous explique — pas de pièce montrée, pas de confiance accordée.

**Le critère n°3, c'est la technologie de la résistance.** Si vous remplacez un appareil à Aubervilliers, ce détail vaut de l'or : préférez une résistance **stéatite**, logée dans un fourreau, à la résistance **thermoplongée** en contact direct avec l'eau. Dans notre eau de la Marne, la stéatite s'entartre beaucoup moins vite, et surtout elle se remplace **sans vidanger le ballon** — une demi-heure de travail au lieu d'une demi-journée. Les modèles à protection dynamique de l'anode (dits ACI hybride) sont également pensés pour les eaux agressives ou calcaires. C'est le genre d'arbitrage qu'un vendeur pressé ne prend jamais le temps d'expliquer.

**Le critère n°4, c'est le dimensionnement.** Comptez en gros 50 litres par personne pour un usage avec douches. Un couple n'a pas besoin d'un 300 litres : c'est de l'eau qu'on chauffe pour rien, et dans une eau dure, c'est aussi une surface d'entartrage supplémentaire. À l'inverse, un ballon sous-dimensionné qu'on pousse à 70°C pour « tenir la journée » précipite le calcaire à toute vitesse. La bonne température de consigne se situe entre **55 et 60°C** : assez chaud pour la sécurité sanitaire, pas assez pour transformer votre cuve en carrière de craie.

Côté chiffres, parlons net, parce que c'est ma marque de fabrique. Chez Joël, à Aubervilliers : **dépannage de ballon dès 129€ TTC** (diagnostic, déplacement et main-d'œuvre compris, prix annoncé au téléphone avant toute visite) ; détartrage complet avec contrôle d'anode autour de **189€** ; remplacement complet d'un ballon standard posé **à partir de 649€** fourniture comprise, sur devis écrit. Et toujours la même règle, qui devrait être celle de toute la profession : **le prix ne bouge pas entre l'annonce et la facture**, et il ne bouge pas davantage un dimanche à minuit qu'un mardi à 14h. Zéro majoration, point final. Le numéro : **01 41 69 10 08**.

Un dernier calcul de vieil ingénieur pour finir : un détartrage à 189€ tous les quatre ou cinq ans coûte moins cher que les 10 à 20 % de surconsommation électrique d'une résistance entartrée — et il double presque l'espérance de vie de l'appareil. L'entretien n'est pas une dépense. C'est la seule économie qui ne demande aucun sacrifice.`,
    },
    {
      anchor: "arnaques-ballon-aubervilliers-parades",
      title: "Les arnaques au ballon vues de ma permanence : trois scénarios, trois parades",
      body: `Huit ans de bénévolat à l'UFC-Que Choisir m'ont fait une bibliothèque mentale de dossiers. Les victimes changent, les quartiers changent, mais les scénarios, eux, se répètent avec une régularité d'horloge. En voici trois, vécus, et la parade pour chacun.

**Scénario n°1 : la cuve « percée » diagnostiquée en trente secondes.** Une dame me montre sa facture : 1 850€ pour un ballon remplacé en urgence un samedi soir. Le motif invoqué ? « Cuve percée, danger immédiat. » En réalité, son groupe de sécurité gouttait pendant la chauffe — vous savez maintenant que c'est le fonctionnement **normal** de la dilatation. On lui a remplacé un appareil de six ans qui aurait eu besoin d'une pièce à quelques dizaines d'euros. La parade : toute fuite ne vient pas de la cuve. Exigez qu'on vous montre **d'où** l'eau sort. Une cuve réellement percée fuit par la jaquette de l'appareil, en continu, eau froide comme eau chaude. Un écoulement au groupe de sécurité pendant la chauffe, c'est de la physique, pas une avarie.

**Scénario n°2 : le prix d'appel fantôme.** « Dépannage chauffe-eau 49€ » sur le prospectus ou l'annonce en ligne. Sur place, le ton change : « c'est plus grave que prévu », « il faut tout changer », et la note grimpe à 600, 900, parfois 1 400€ avec des suppléments de nuit inventés. Sachez deux choses. D'abord, depuis l'arrêté du 24 janvier 2017, un professionnel du dépannage à domicile doit vous remettre un **devis écrit avant toute intervention, quel que soit le montant** — le vieux seuil de 150€ de l'arrêté de 1990 a été supprimé au 1er avril 2017, ne laissez personne vous le ressortir. Quelqu'un qui commence à démonter sans rien vous faire signer est donc déjà en faute. Ensuite, un prix d'appel très bas n'est pas une aubaine : c'est un hameçon, et vous êtes le poisson. Comparez avec un opérateur qui annonce un prix ferme et complet : 129€ TTC tout compris se compare très favorablement à « 49€ » qui en deviennent 900.

**Scénario n°3 : la pression du danger.** « Madame, avec l'électricité, vous risquez l'incendie cette nuit. » J'ai entendu cette phrase dans des dizaines de dossiers. Elle vise à vous faire signer vite, cher, et sans réfléchir. Mon conseil, le plus important de toute cette page : **personne ne signe quoi que ce soit sous la peur**. Si un risque électrique existe vraiment, la mise en sécurité est simple et je viens de vous l'apprendre : on coupe le disjoncteur dédié du ballon, et le danger immédiat disparaît. Vous avez alors tout le temps de comparer, d'appeler un proche, de vérifier le SIRET de l'entreprise sur sirene.fr — trente secondes qui démasquent la plupart des sociétés-écrans.

Et si le mal est fait ? Vous n'êtes pas démuni. Pour un contrat signé à domicile, vous disposez en principe d'un **délai de rétractation de 14 jours**. Signalez les pratiques abusives sur **signal.conso.gouv.fr**, la plateforme de la DGCCRF. Et poussez la porte d'une association de consommateurs — c'est gratuit, et croyez un bénévole : nous aimons ces dossiers-là.

Vous comprenez maintenant pourquoi je défends le modèle du prix fixe annoncé avant intervention. Quand Joël vous dit **129€ TTC** au téléphone, au **01 41 69 10 08**, ce montant est posé avant que l'artisan ne monte dans son fourgon — il n'y a plus de place pour le théâtre du « c'est plus grave que prévu ». Et quand l'enseigne s'engage sur **zéro majoration nuit, week-end et jours fériés**, elle supprime l'autre levier favori des margoulins : la facturation de votre détresse horaire. Une panne d'eau chaude à 22h un dimanche aux Quatre-Chemins vaut exactement le même prix qu'un mercredi matin au centre-ville. C'est ainsi que les choses devraient fonctionner partout. En attendant, c'est déjà ainsi qu'elles fonctionnent ici.`,
    },
  ],
  vraisPrix: [
    {
      service: "Dépannage ballon d'eau chaude (résistance, thermostat, contacteur)",
      prixJoel: 129,
      prixArnaqueur: "49€ annoncé → 450-900€ facturé",
      pourquoi:
        "Quatre pannes de ballon sur cinq se réparent : thermostat en sécurité, résistance entartrée, contacteur défaillant. Joël annonce 129€ TTC au téléphone — déplacement, diagnostic et main-d'œuvre compris — et ce prix ne bouge pas sur la facture. Les prix d'appel à 49€ des annonces en ligne servent d'hameçon : une fois sur place, le « diagnostic » gonfle la note à plusieurs centaines d'euros.",
    },
    {
      service: "Remplacement du groupe de sécurité (pièce NF et vidange comprises)",
      prixJoel: 129,
      prixArnaqueur: "39€ annoncé → 350-600€ facturé",
      pourquoi:
        "Un groupe de sécurité qui coule en continu se remplace en moins d'une heure, pièce normalisée comprise. Attention au grand classique : faire passer le goutte-à-goutte normal de la dilatation pendant la chauffe pour une « fuite grave » justifiant un remplacement complet du ballon. Exigez qu'on vous montre d'où l'eau sort avant d'accepter quoi que ce soit.",
    },
    {
      service: "Détartrage complet de la cuve + contrôle de l'anode magnésium",
      prixJoel: 189,
      prixArnaqueur: "59€ annoncé → 500-1200€ facturé",
      pourquoi:
        "Dans l'eau dure de la Marne distribuée à Aubervilliers (SEDIF/Veolia), un détartrage tous les 4-5 ans rend sa capacité au ballon, fait baisser la facture électrique et prolonge nettement la vie de l'appareil. Joël facture autour de 189€ TTC l'opération complète avec vidange et contrôle d'anode. Certains opérateurs facturent chaque étape séparément — vidange, ouverture de bride, joint, remontage — jusqu'à quadrupler le total.",
    },
    {
      service: "Remplacement complet d'un ballon électrique 150-200 L posé",
      prixJoel: 649,
      prixArnaqueur: "« devis sur place » → 1800-3200€ facturé",
      pourquoi:
        "Quand la cuve est réellement percée ou l'appareil en fin de vie, comptez à partir de 649€ TTC fourniture et pose comprises pour un modèle standard de qualité, sur devis écrit avant travaux — obligatoire quel que soit le montant depuis l'arrêté du 24 janvier 2017, qui a supprimé l'ancien seuil de 150€. Méfiez-vous des remplacements « d'urgence » à 2 000€ et plus pour un matériel d'entrée de gamme : le prix du même appareil se vérifie en ligne en cinq minutes.",
    },
    {
      service: "Dépannage ballon la nuit, le dimanche ou un jour férié",
      prixJoel: 129,
      prixArnaqueur: "majoration « urgence » +50 à +100% → 600-1400€ facturé",
      pourquoi:
        "Les pannes d'eau chaude choisissent rarement les heures ouvrables. Chez Joël, le tarif est identique 24h/24 et 7j/7 : 129€ TTC un dimanche à minuit comme un mardi à 14h, sans aucune majoration de nuit, de week-end ni de jour férié. La « majoration d'urgence » est pourtant le levier favori des opérateurs douteux : elle monétise votre détresse, pas un surcoût réel.",
    },
  ],
  faqLocale: [
    {
      question:
        "Plus d'eau chaude ce matin aux Quatre-Chemins : je dois appeler tout de suite ou vérifier quelque chose d'abord ?",
      answer:
        "Vérifiez d'abord, ça ne coûte rien. Ouvrez votre tableau électrique, repérez le contacteur jour/nuit (positions 0/Auto/1) et basculez-le sur 1 (marche forcée), puis vérifiez que le disjoncteur dédié au chauffe-eau est enclenché. Attendez deux à trois heures : si l'eau chaude revient, le ballon va bien. Si rien ne change, appelez Joël au 01 41 69 10 08 — dépannage dès 129€ TTC, prix annoncé avant la visite.",
    },
    {
      question:
        "Mon groupe de sécurité goutte sous le ballon dans mon appartement du centre-ville : c'est grave ?",
      answer:
        "Pas forcément. Un goutte-à-goutte pendant les heures de chauffe est normal : l'eau se dilate en chauffant (2 à 3 % de son volume) et le groupe évacue le surplus. En revanche, un écoulement continu jour et nuit signale un groupe usé ou une pression de réseau trop élevée — au-delà de 4-5 bars, un réducteur de pression s'impose. Le remplacement du groupe, pièce et vidange comprises, est une intervention modeste : ne laissez personne en faire un prétexte pour remplacer tout le ballon.",
    },
    {
      question:
        "L'eau d'Aubervilliers est-elle vraiment calcaire ? À quelle fréquence détartrer mon ballon ?",
      answer:
        "Oui. L'eau distribuée à Aubervilliers vient de la Marne, traitée à l'usine de Neuilly-sur-Marne pour le SEDIF, et le contrôle sanitaire la classe parmi les eaux dures — le SEDIF prépare d'ailleurs une filtration membranaire pour distribuer à terme une eau moins calcaire. Dans ces conditions, un détartrage complet avec contrôle de l'anode tous les 4 à 5 ans est un bon rythme : il restitue la capacité de la cuve, réduit la consommation électrique et prolonge nettement la vie de l'appareil.",
    },
    {
      question:
        "Je suis locataire à La Maladrerie : le remplacement du ballon, c'est pour moi ou pour le propriétaire ?",
      answer:
        "Le remplacement d'un ballon vétuste ou hors service incombe au propriétaire : c'est un équipement du logement, pas de l'entretien courant. Le locataire prend en charge l'entretien ordinaire (manœuvre mensuelle du groupe de sécurité, petits joints). Dans le parc social de La Maladrerie, contactez d'abord votre bailleur : la production d'eau chaude y est parfois collective et relève alors entièrement de lui. Documentez la panne par écrit et gardez la facture détaillée si une intervention urgente s'impose.",
    },
    {
      question:
        "Un plombier peut-il intervenir la nuit ou le dimanche à Aubervilliers sans majoration ?",
      answer:
        "Oui. Le réseau Joël intervient à Aubervilliers 24h/24 et 7j/7, dimanches et jours fériés compris, sans aucune majoration : le dépannage ballon reste à 129€ TTC à 23h un samedi comme en pleine semaine. La ville est rapide d'accès pour les artisans du secteur — A86 au nord, périphérique au sud, et depuis le 31 mai 2022 le métro 12 dessert Aimé Césaire et Mairie d'Aubervilliers en plus de la ligne 7 aux Quatre-Chemins et au Fort. Numéro : 01 41 69 10 08.",
    },
    {
      question:
        "J'habite une résidence neuve au Fort d'Aubervilliers et mon ballon est déjà en panne : dois-je payer la réparation ?",
      answer:
        "Pas si vite. Dans un logement de moins de dix ans, une panne précoce du ballon peut relever de la garantie du constructeur, de la garantie biennale sur les équipements, voire de la décennale du promoteur. Avant tout paiement, demandez un diagnostic écrit identifiant la cause : c'est la pièce qui vous permettra de faire jouer ces garanties. Joël remet systématiquement ce constat avec sa facture détaillée — un document utile aussi pour votre syndic ou votre assurance.",
    },
  ],
  temoignages: [
    {
      auteur: "Fatoumata D.",
      quartierOuRue: "Quatre-Chemins, avenue de la République",
      date: "2026-05-20",
      rating: 5,
      serviceRendered: "Remplacement résistance entartrée sur ballon 100 L",
      texte:
        "Plus d'eau chaude depuis deux jours dans notre appartement des Quatre-Chemins. Le plombier de Joël a testé le contacteur, puis diagnostiqué la résistance morte, complètement entartrée — il me l'a montrée une fois déposée. Prix annoncé au téléphone, prix payé : 129€. Il m'a aussi réglé le thermostat à 57°C en m'expliquant pourquoi. Sérieux et pédagogue.",
    },
    {
      auteur: "Marek W.",
      quartierOuRue: "La Maladrerie",
      date: "2026-03-08",
      rating: 5,
      serviceRendered: "Détartrage complet + remplacement anode magnésium",
      texte:
        "Ballon de 9 ans qui ne donnait plus que de l'eau tiède. Au lieu de me vendre un appareil neuf, l'artisan a proposé un détartrage complet : il a sorti une couche de calcaire impressionnante du fond de la cuve et changé l'anode usée. 189€ comme convenu, et l'eau chaude est revenue comme au premier jour. Un dimanche matin, sans supplément.",
    },
    {
      auteur: "Nadège P.",
      quartierOuRue: "Centre-ville, rue du Moutier",
      date: "2026-01-27",
      rating: 4,
      serviceRendered: "Remplacement groupe de sécurité qui fuyait en continu",
      texte:
        "Mon groupe de sécurité coulait jour et nuit. Un premier dépanneur trouvé sur internet voulait changer tout le ballon pour 1 600€. Joël a remplacé le groupe et mesuré ma pression de réseau, un peu élevée, en me conseillant un réducteur sans me forcer la main. Intervention propre, tarif annoncé respecté. Quatre étoiles seulement pour les 40 minutes d'attente, mais je rappellerai.",
    },
  ],
  internalLinks: [
    {
      url: "/plombier/aubervilliers",
      anchor: "plombier à Aubervilliers : toutes nos interventions 24h/24",
      contexte: "Pour les autres pannes de plomberie dans la commune.",
    },
    {
      url: "/plombier/saint-denis",
      anchor: "plombier à Saint-Denis, de la Plaine au centre",
      contexte: "Le réseau couvre aussi la commune voisine, côté Plaine et Landy.",
    },
    {
      url: "/plombier/pantin",
      anchor: "plombier à Pantin, le long du canal",
      contexte: "Intervention identique de l'autre côté des Quatre-Chemins.",
    },
    {
      url: "/plomberie",
      anchor: "tous les services de plomberie du réseau Joël en Île-de-France",
    },
    {
      url: "/plomberie/tarifs",
      anchor: "la grille tarifaire complète, affichée avant intervention",
    },
  ],
  tags: [
    "aubervilliers",
    "93300",
    "seine-saint-denis",
    "ballon-eau-chaude",
    "chauffe-eau",
    "cumulus",
    "plombier",
    "eau-dure",
    "calcaire",
    "sedif",
    "groupe-securite",
    "detartrage",
    "anode-magnesium",
    "resistance-steatite",
    "quatre-chemins",
    "la-maladrerie",
    "centre-ville",
    "fort-d-aubervilliers",
    "landy",
    "metro-12",
    "urgence-24h",
  ],
};
