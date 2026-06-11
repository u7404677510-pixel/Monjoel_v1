import type { PremiumPageContent } from "../types";

export const content: PremiumPageContent = {
  trade: "electricien",
  citySlug: "hondevilliers",
  serviceSlug: "prise-interrupteur-hs",
  authorPersona: "patrick-delcourt",
  publishedAt: "2026-06-09",
  updatedAt: "2026-06-09",
  metaTitle: "Prise HS à Hondevilliers (77) : électricien 59€, 24h/24",
  metaDescription:
    "Prise ou interrupteur HS à Hondevilliers (77510) : électricien dès 59€ TTC, prix fixe annoncé avant, 0 majoration nuit/week-end. 24h/24 — 01 41 69 10 08.",
  h1: "Prise ou interrupteur HS à Hondevilliers : la procédure d'un ancien gendarme, du premier geste au prix fixe",
  introParagraph: `Trente et un ans de Gendarmerie nationale, dont vingt-deux en Section de Recherches à Versailles, m'ont appris une constante : les sinistres domestiques graves commencent presque toujours par un signal faible que personne n'a traité. Une prise qui ne répond plus. Un interrupteur qui grésille. Une plaque tiède au toucher. À Hondevilliers — **256 habitants au recensement INSEE (population municipale 2023)**, 5,5 km² entre plateau briard et vallée du Petit Morin, **37 lieux-dits** dont Flagny —, ce signal faible survient dans un contexte précis : un parc composé presque exclusivement de **maisons individuelles**, souvent anciennes, où l'installation électrique a l'âge des murs.

On me demandera ce qu'un ancien gendarme vient faire sur une page d'électricité. Réponse en deux points.

**1° Le risque.** Selon l'Observatoire national de la sécurité électrique (ONSE), **20 à 35 % des incendies domestiques sont d'origine électrique**. Une prise défaillante n'est pas une simple gêne : c'est un point de départ documenté.

**2° L'arnaque.** En brigade, j'ai instruit des dizaines de dossiers de dépannage frauduleux. Les communes isolées de l'est seine-et-marnais sont une cible de choix : aucun artisan au village, des habitants qui composent le premier numéro affiché en ligne, des factures qui passent de 39€ annoncés à 600€ exigés sur place.

Cette page traite les deux menaces, dans l'ordre. Vous y trouverez : la qualification de l'incident (bénin, préoccupant, urgent), le protocole de mise en sécurité en cinq gestes, les causes récurrentes de panne dans le bâti briard, le mode opératoire des dépanneurs voyous en zone rurale, et les conditions exactes de l'intervention Joël — remplacement d'une prise ou d'un interrupteur hors service **dès 59€ TTC**, **prix fixe annoncé avant** le départ de l'artisan, **24h/24, 0 majoration** de nuit, de week-end ou de jour férié. Le numéro : **01 41 69 10 08**.

Pas de roman. Une procédure.`,
  sections: [
    {
      anchor: "reconnaissance-terrain-hondevilliers",
      title: "Reconnaissance du terrain : 256 habitants, 37 lieux-dits, un bâti dispersé qui change tout",
      body: `Avant de traiter un incident, on étudie le terrain. C'est valable pour une effraction comme pour une panne électrique.

Hondevilliers est une commune rurale de la **Communauté de communes des Deux Morin**, accrochée au-dessus de la vallée du Petit Morin, entre **Villeneuve-sur-Bellot, Sablonnières, Bassevelle et Verdelot**, à la frontière de l'Aisne (Nogent-l'Artaud est limitrophe). Le recensement INSEE donne **256 habitants (population municipale 2023)** répartis sur 5,53 km², entre 108 et 211 mètres d'altitude. Pas de continuité urbaine : un bourg resserré autour de l'église Saint-Loup-et-Saint-Gilles (édifiée dans les années 1930) et de son lavoir, puis un habitat dispersé en **hameaux et écarts** — la commune compte 37 lieux-dits administratifs, dont **Flagny**.

Conséquence directe pour l'électricité : d'après les données INSEE sur le logement, la quasi-totalité du parc est constituée de **maisons individuelles** — longères briardes en pierre meulière ou moellons enduits, anciens corps de ferme avec dépendances, pavillons des années 1970-1990 construits en bordure de bourg. Il n'y a ni colonne montante d'immeuble, ni gardien, ni syndic : chaque foyer est seul responsable de son installation, du disjoncteur de branchement jusqu'à la dernière prise de la grange.

Ce point n'est pas anecdotique. Le baromètre de l'ONSE publié en **mai 2025**, établi sur l'analyse de **400 000 diagnostics électriques obligatoires**, relève que **87,5 % des maisons individuelles** de plus de quinze ans présentent au moins une anomalie électrique — un taux supérieur à celui des appartements (79,1 %). Le profil type du logement hondevillois — maison ancienne, agrandie ou rénovée par étapes, avec atelier ou dépendance raccordés après coup — cumule précisément les facteurs que ce baromètre identifie.

Dernier élément de terrain : l'accès. Hondevilliers n'a pas de gare. La desserte passe par la **ligne de bus 33** du réseau Transdev local vers **La Ferté-sous-Jouarre** et sa gare de la **ligne P** (environ 17 km par la route, via la vallée et l'axe de la **D407**), ou par la gare de **Nogent-l'Artaud – Charly**, sur la même ligne P, de l'autre côté de la limite départementale. Pour un artisan, cela signifie une chose : personne n'est « au coin de la rue ». C'est exactement pour cela que je détaille plus bas les délais réels d'intervention — et que je vous mets en garde contre ceux qui prétendent être « basés à Hondevilliers ». Aucun dépanneur n'est basé dans un village de 256 habitants. Celui qui l'affirme ment dès la première phrase, et un interlocuteur qui ment sur sa localisation mentira sur sa facture.`,
    },
    {
      anchor: "qualification-incident-prise-interrupteur",
      title: "Qualifier l'incident : panne de confort, signal préoccupant ou urgence vraie",
      body: `Dans la gendarmerie, on n'engage pas les mêmes moyens pour un vol de mobylette et pour un home-jacking. Même logique ici : toutes les prises mortes ne se valent pas. Avant d'appeler qui que ce soit, classez votre situation dans l'un des trois niveaux suivants. Cette qualification prend deux minutes et conditionne tout le reste.

**Niveau 1 — Incident bénin.** Une prise ou un interrupteur ne répond plus. Rien d'autre : pas d'odeur, pas de trace, pas de bruit, le reste du circuit fonctionne, le disjoncteur n'a pas bougé. Cause probable : mécanisme usé, connexion desserrée derrière l'appareillage, ou appareil branché défectueux. Testez d'abord l'appareil sur une autre prise — j'ai vu des gens payer un déplacement pour un chargeur de téléphone mort. Si la prise est bien en cause, l'intervention est simple, programmable, et coûte **59€ TTC** chez Joël. Pas d'urgence, mais pas d'abandon non plus : une connexion desserrée s'échauffe, et un défaut qu'on ignore six mois devient un défaut qui s'aggrave.

**Niveau 2 — Signal préoccupant.** L'un au moins des indices suivants est présent : l'appareillage est **tiède ou chaud** au toucher ; un **grésillement** est audible à la manœuvre de l'interrupteur ; la plaque est jaunie ou le plastique dégage une odeur âcre par intermittence ; la lumière vacille quand on touche le mécanisme. Traduction : il y a un arc électrique ou un échauffement derrière la plaque. Le baromètre ONSE de mai 2025 classe le **matériel vétuste ou inadapté** parmi les anomalies les plus fréquentes (présent dans 46 % des installations anciennes contrôlées). À ce niveau : on coupe le circuit concerné au tableau et on fait intervenir sous 24 à 48 heures. Pas dans un mois.

**Niveau 3 — Urgence vraie.** Traces de **noircissement** autour de la prise, étincelle visible au branchement, odeur de brûlé persistante, disjoncteur qui saute dès qu'on rétablit le circuit, ou prise descellée avec conducteurs apparents — fréquent dans les murs anciens en plâtre des longères, où les scellements finissent par lâcher. Là, on applique le protocole complet de la section suivante, immédiatement, et on appelle dans la foulée : le **01 41 69 10 08** répond 24h/24, sans majoration de nuit. Je rappelle la donnée de cadrage de l'ONSE : 20 à 35 % des incendies domestiques sont d'origine électrique. Dans un village où le centre de secours n'est pas à trois minutes, la prévention n'est pas une option de confort. C'est la seule stratégie rationnelle.

Un point de discipline pour finir : ne vous racontez pas d'histoire pour repousser l'échéance. « Ça fait des années que ça grésille » n'est pas un argument rassurant. C'est un historique de défaut non traité.`,
    },
    {
      anchor: "protocole-mise-en-securite-cinq-gestes",
      title: "Le protocole de mise en sécurité : cinq gestes, dans cet ordre, avant toute intervention",
      body: `Voici la procédure que j'enseigne en formation sûreté résidentielle, adaptée au risque électrique. Cinq gestes. Pas six, pas trois. Dans l'ordre.

**1° Couper le circuit concerné au tableau.** Ouvrez votre tableau électrique et abaissez le disjoncteur divisionnaire qui alimente la prise ou l'interrupteur en cause. Dans les maisons anciennes d'Hondevilliers, le tableau est parfois un assemblage de plusieurs générations — porte-fusibles à cartouches d'un côté, disjoncteurs modernes de l'autre — et les circuits sont rarement étiquetés. Si vous ne savez pas identifier le bon circuit, coupez le **disjoncteur général**. Oui, toute la maison. Une coupure générale d'une heure n'a jamais blessé personne ; une prise en défaut maintenue sous tension, si.

**2° Débrancher et écarter l'appareil suspect.** Si la panne est survenue au branchement d'un appareil (radiateur d'appoint, outil d'atelier, appareil de cuisson), débranchez-le une fois le circuit coupé et ne le rebranchez nulle part ailleurs. Un appareil en court-circuit promené de prise en prise, c'est un défaut qu'on dissémine.

**3° Ne pas démonter, ne pas rafistoler.** Pas de tournevis dans l'appareillage, pas de ruban adhésif sur une plaque cassée, pas de multiprise branchée « en attendant » sur une prise qui chauffe. Dans un bâti où, selon le baromètre ONSE, **64 % des installations anciennes présentent un défaut de mise à la terre**, l'amateur qui démonte une prise travaille sans le filet de sécurité qu'il croit avoir. Le différentiel 30 mA qui devrait le protéger est parfois absent des installations d'origine. On ne joue pas sa santé contre 59€.

**4° Photographier.** Premier réflexe de gendarme, valable ici aussi : ne touchez à rien, photographiez. La prise, les traces éventuelles, le tableau, l'appareil suspect. Trois usages : le diagnostic à distance (l'artisan qui voit la photo arrive avec la bonne pièce), l'assurance habitation en cas de sinistre, et — si vous tombez sur un dépanneur indélicat — la preuve de l'état initial, opposable en cas de litige sur la réalité des travaux facturés.

**5° Appeler en décrivant les faits, pas les impressions.** Au téléphone, donnez les éléments factuels : prise ou interrupteur, pièce concernée, niveau de l'incident (bénin, préoccupant, urgent selon la grille ci-dessus), âge approximatif de l'installation, hameau ou lieu-dit exact — à Hondevilliers, « le bourg » et un écart de Flagny ne représentent pas le même temps d'approche. Chez Joël, au **01 41 69 10 08**, cette description débouche sur un **prix fixe annoncé avant le déplacement**. Si votre interlocuteur — quel qu'il soit — refuse de s'engager sur un prix au téléphone, l'appel est terminé. Cette règle simple élimine à elle seule l'essentiel des mauvaises rencontres.`,
    },
    {
      anchor: "causes-pannes-bati-briard",
      title: "Pourquoi ça lâche ici : les quatre causes que je retrouve dans les maisons de la vallée",
      body: `Une panne de prise n'est jamais un acte isolé : elle a un mobile et des circonstances. Dans le bâti d'Hondevilliers et des communes voisines de la vallée du Petit Morin, quatre causes reviennent systématiquement.

**1° Les connexions vieillissantes.** Dans une longère dont l'électricité a été posée ou reprise dans les années 1960-1980, les conducteurs sont raccordés par dominos à vis dans des boîtiers qui n'ont pas été rouverts depuis des décennies. Les cycles de chauffe (hiver) et d'humidité (la vallée n'est pas un climat sec) desserrent les vis et oxydent le cuivre. Une connexion desserrée augmente la résistance ; la résistance produit de l'échauffement ; l'échauffement dégrade l'isolant. C'est une chaîne causale lente, silencieuse, et c'est la première origine des prises qui « meurent » sans raison apparente. Le baromètre ONSE publié en mai 2025 chiffre l'ampleur du phénomène à l'échelle nationale : **82,6 % des installations de plus de quinze ans présentent au moins une anomalie**. Le parc hondevillois, presque entièrement antérieur aux années 2000, est dans le cœur de cette statistique.

**2° L'absence ou la défaillance de la terre.** Beaucoup de maisons anciennes du secteur n'ont qu'une mise à la terre partielle : ajoutée dans la cuisine et la salle d'eau lors d'une rénovation, absente des chambres et des dépendances. L'ONSE relève un **défaut de mise à la terre dans 64 % des installations anciennes** contrôlées. Une prise sans terre qui alimente un appareil à carcasse métallique — congélateur de cellier, outil d'atelier — transforme chaque défaut d'isolement en risque de contact direct. Quand un artisan Joël remplace une prise dans cette configuration, il le signale par écrit : non pour vendre un chantier, mais parce que la norme **NF C 15-100** fait de la terre le socle de la protection des personnes.

**3° L'humidité et les locaux annexes.** Granges, celliers, appentis, garages en sous-sol semi-enterré : le bâti rural briard regorge de locaux humides où l'on a tiré une ligne « provisoire » devenue définitive. L'humidité corrode les contacts, fait gonfler les boîtiers d'encastrement dans les murs en plâtre et provoque des défauts d'isolement qui font sauter le différentiel — quand il existe. Une prise extérieure ou de dépendance doit être en indice de protection adapté (IP44 minimum en extérieur) ; la prise de salon vissée sur une poutre de grange en 1985 ne l'est pas.

**4° L'usage moderne sur des circuits anciens.** Une installation dimensionnée pour deux ou trois appareils par pièce encaisse aujourd'hui box internet, congélateur supplémentaire, radiateurs d'appoint, chargeurs en série et outillage électroportatif. Les rallonges et multiprises en cascade compensent le manque de points d'alimentation — et concentrent la charge sur une seule prise murale, qui s'échauffe. Quand cette prise lâche, elle n'est pas la cause : elle est le fusible involontaire d'un circuit sous-dimensionné. La remplacer à l'identique sans poser la question de la charge, c'est traiter le symptôme. Un électricien sérieux vous le dira sur place, chiffres à l'appui, et vous laissera décider — sans pression commerciale.`,
    },
    {
      anchor: "mode-operatoire-depanneurs-voyous-zone-rurale",
      title: "Le mode opératoire des dépanneurs voyous en zone rurale : je l'ai documenté en brigade",
      body: `Parlons de la seconde menace. Pendant ma carrière, j'ai vu le dépannage frauduleux évoluer du démarchage en porte-à-porte vers le racolage numérique. Le mode opératoire en zone rurale est rodé, et les communes comme Hondevilliers — sans artisan local, avec une population de propriétaires dont une partie est âgée — cochent toutes les cases de la cible idéale. Voici la mécanique, étape par étape.

**Phase 1 : l'appât.** Vous tapez « électricien Hondevilliers » dans un moteur de recherche. Vous tombez sur des sites qui affichent « votre électricien à Hondevilliers, intervention en 20 minutes, dépannage à partir de 29€ ». Analyse factuelle : aucune entreprise d'électricité n'est domiciliée dans un village de 256 habitants, et aucun professionnel ne traverse la vallée du Petit Morin en 20 minutes depuis une base crédible. Ces sites sont des pages satellites générées en masse, qui revendent votre appel au sous-traitant disponible — souvent ni qualifié, ni assuré.

**Phase 2 : la bascule sur place.** L'intervenant arrive, démonte la prise, prend un air grave et annonce que « c'est plus sérieux que prévu » : circuit à refaire, tableau « plus aux normes », risque d'incendie imminent. La peur fait signer. Les dossiers que j'ai traités suivaient tous cette pente : 39€ annoncés au téléphone, 350 à 600€ exigés sur place pour un remplacement de prise, parfois davantage quand la victime était isolée. Le levier n'est pas technique, il est psychologique : à 21h, seul dans un écart, sans autre artisan joignable, on signe.

**Phase 3 : l'évaporation.** Paiement exigé immédiatement, de préférence en espèces ou par chèque, facture absente ou illisible, société introuvable trois mois plus tard quand la « réparation » lâche.

Contre ce mode opératoire, une check-list en quatre points — la même que je donne en formation :

**1° Prix ferme au téléphone, avant déplacement.** Pas une fourchette, pas un « à partir de ». Un montant. Le refus de s'engager vaut élimination.

**2° Devis écrit avant travaux.** L'arrêté du 24 janvier 2017 encadre l'information tarifaire du dépannage à domicile : un professionnel qui rechigne à écrire ce qu'il va facturer est en infraction avant même d'avoir ouvert sa caisse à outils.

**3° Vérification d'identité.** Nom de la société, SIRET vérifiable gratuitement en ligne (annuaire Sirene), plaque du véhicule notée. Trente secondes de vérification, c'est moins cher que 600€ de litige.

**4° En cas d'abus : ne payez pas ce qui n'a pas été convenu.** Photographiez le « travail » réalisé, exigez la facture détaillée, signalez sur **SignalConso (DGCCRF)** et déposez plainte — l'abus de faiblesse sur personne vulnérable est une infraction pénale, pas un différend commercial. Pour un contrat conclu à domicile hors devis accepté, le délai de rétractation de 14 jours s'applique.

Le réseau Joël s'est construit contre ce système : **prix fixe annoncé avant**, facture détaillée systématique, artisans identifiés. Ce n'est pas un argument publicitaire. C'est la neutralisation, point par point, du mode opératoire que je viens de décrire.`,
    },
    {
      anchor: "intervention-joel-hondevilliers-59-euros",
      title: "L'intervention Joël à Hondevilliers : 59€ TTC, délais honnêtes, périmètre exact",
      body: `Terminons par les faits contractuels. Quand vous appelez le **01 41 69 10 08** pour une prise ou un interrupteur hors service à Hondevilliers, voici précisément ce qui se passe.

**Le prix.** Le remplacement d'une prise ou d'un interrupteur défectueux est facturé **dès 59€ TTC**, déplacement, main-d'œuvre et appareillage standard compris. Ce montant vous est annoncé au téléphone, avant le départ de l'artisan, et c'est celui de la facture. Si le diagnostic sur place révèle autre chose qu'un appareillage défectueux — connexion à reprendre en boîte de dérivation, défaut sur le circuit, disjoncteur fatigué — l'artisan vous présente le tarif correspondant **avant** de toucher quoi que ce soit, et vous décidez : recherche de panne **dès 89€**, remplacement d'un disjoncteur divisionnaire **dès 79€**, traitement d'un court-circuit localisé **dès 99€**, remise en état d'un tableau vétuste **dès 129€**, mise aux normes plus large **dès 199€** sur devis détaillé. Aucun de ces montants ne se découvre après coup.

**La règle des horaires.** **0 majoration**, ni la nuit, ni le dimanche, ni les jours fériés. Le forfait de 59€ pour une prise HS vaut un mardi à 15h comme un samedi à 23h. Cette règle a une conséquence pratique que je vous recommande d'exploiter : n'attendez pas le matin en laissant un circuit douteux sous tension « pour ne pas payer le tarif de nuit ». Il n'y a pas de tarif de nuit.

**Les délais — version honnête.** Hondevilliers est à environ 17 km de La Ferté-sous-Jouarre et l'artisan dépêché viendra du secteur élargi (vallée du Petit Morin, axe D407, bassin de Coulommiers ou de La Ferté). Comptez en pratique **40 minutes à 1h15** selon l'heure, la disponibilité et le lieu-dit exact — un écart en haut du plateau n'est pas le bourg. Quiconque vous promet 20 minutes pour un village de la Brie des Morin vous ment, et je vous renvoie à la section précédente sur ce que vaut un interlocuteur qui ment. La centrale d'appel vous donne une estimation d'arrivée réaliste et l'artisan prévient en cas d'aléa de route.

**Le périmètre technique.** L'artisan remplace l'appareillage, contrôle le serrage des connexions en amont, vérifie le fonctionnement du circuit et de sa protection au tableau, et consigne ses observations sur la facture — y compris, le cas échéant, l'absence de terre ou la vétusté constatée, au regard de la norme **NF C 15-100**. Cette mention écrite a de la valeur : pour votre assurance, pour une vente future (le diagnostic électrique est obligatoire à la vente pour toute installation de plus de 15 ans), et pour planifier d'éventuels travaux à votre rythme, pas sous la contrainte.

**Ce que l'intervention n'est pas.** Pas de vente forcée de chantier de rénovation, pas de « profitez-en pour refaire le tableau » asséné dans l'entrée, pas de pièce facturée trois fois son prix. Si des travaux complémentaires sont réellement souhaitables, ils figurent sur un devis écrit que vous étudiez à tête reposée. Un défaut de niveau 1 ou 2 vous en laisse largement le temps ; un défaut de niveau 3 aura été traité dans le forfait annoncé.`,
    },
    {
      anchor: "checklist-finale-prise-hs-hondevilliers",
      title: "La check-list finale, à conserver près du tableau",
      body: `Le lecteur doit repartir avec une procédure mentale complète. La voici, condensée. Découpez-la, punaisez-la à côté du tableau électrique — dans une maison de hameau, c'est le document le plus utile après les numéros d'urgence.

**Qualification (2 minutes) :**

- Prise muette, rien d'autre → niveau 1, intervention programmable à 59€ TTC.
- Chaleur, grésillement, odeur intermittente → niveau 2, circuit coupé, intervention sous 24-48h.
- Noircissement, étincelles, disjoncteur qui retombe, odeur de brûlé persistante → niveau 3, protocole complet immédiat.

**Mise en sécurité (5 gestes, dans l'ordre) :**

- 1° Couper le circuit au tableau — le général si doute.
- 2° Débrancher l'appareil suspect, ne le rebrancher nulle part.
- 3° Ne pas démonter, ne pas rafistoler, pas de multiprise de contournement.
- 4° Photographier : prise, traces, tableau, appareil.
- 5° Appeler en décrivant les faits et le lieu-dit exact : **01 41 69 10 08**.

**Filtrage de l'intervenant (4 vérifications) :**

- Prix ferme annoncé au téléphone, avant déplacement — sinon, éliminé.
- Devis écrit avant tout travail non prévu au forfait (arrêté du 24 janvier 2017).
- Identité vérifiée : société, SIRET, véhicule.
- Facture détaillée exigée ; en cas d'abus : SignalConso, plainte, rétractation 14 jours.

**Repères de prix à Hondevilliers (réseau Joël, TTC, 0 majoration) :**

- Prise ou interrupteur HS : **dès 59€**.
- Disjoncteur divisionnaire : dès 79€.
- Recherche de panne : dès 89€.
- Court-circuit localisé : dès 99€.
- Tableau vétuste : dès 129€ ; mise aux normes : dès 199€ sur devis.

**Et en prévention**, trois habitudes qui coûtent zéro euro : rouvrir l'œil sur les appareillages de plus de vingt ans (chaleur, jeu mécanique, fissures de plaque) ; supprimer les cascades de multiprises dans les ateliers et celliers ; tester le bouton « T » de vos différentiels deux fois par an — s'il ne déclenche pas, ou si vous n'avez pas de différentiel 30 mA, faites-le constater. Le baromètre ONSE de mai 2025 le rappelle froidement : plus de huit installations anciennes sur dix présentent au moins une anomalie. La vôtre n'a aucune raison statistique d'être l'exception. La différence entre un foyer à risque et un foyer sûr, ce n'est pas la chance. C'est la procédure.`,
    },
  ],
  vraisPrix: [
    {
      service: "Remplacement d'une prise ou d'un interrupteur HS à Hondevilliers",
      prixJoel: 59,
      prixArnaqueur: "39€ annoncé → 350-600€ facturé",
      pourquoi:
        "Le remplacement d'un appareillage défectueux est une intervention maîtrisée de 20 à 40 minutes : dépose, contrôle des connexions, pose, essais. Joël l'annonce dès 59€ TTC au téléphone — déplacement, main-d'œuvre et appareillage standard compris — pour le bourg comme pour les écarts et hameaux (Flagny et les autres lieux-dits). Le « 39€ » des pages satellites est un appât : la facture est requalifiée sur place en pseudo-urgence à plusieurs centaines d'euros.",
    },
    {
      service: "Recherche de panne : prise muette, circuit partiellement mort",
      prixJoel: 89,
      prixArnaqueur: "49€ annoncé → 480-900€ facturé",
      pourquoi:
        "Quand plusieurs prises tombent en même temps, la cause est en amont : connexion défaite en boîte de dérivation, conducteur oxydé, protection fatiguée. La recherche méthodique, circuit par circuit, est annoncée dès 89€ TTC avant déplacement. Les opérateurs indélicats sautent l'étape du diagnostic et vendent d'office une « réfection de ligne » à quatre chiffres — refusez tout chantier proposé sans recherche de panne documentée.",
    },
    {
      service: "Court-circuit localisé sur un circuit de prises",
      prixJoel: 99,
      prixArnaqueur: "59€ annoncé → 600-1 200€ facturé",
      pourquoi:
        "Un court-circuit franc (le disjoncteur retombe dès le réarmement) se localise avec méthode et se traite généralement en une intervention : dès 99€ TTC annoncés avant. C'est le scénario préféré des dépanneurs voyous, parce que la coupure totale met le foyer sous pression — c'est précisément le moment où l'on signe n'importe quoi. Prix fixe au téléphone d'abord, signature ensuite. Jamais l'inverse.",
    },
    {
      service: "Remplacement d'un disjoncteur divisionnaire défaillant",
      prixJoel: 79,
      prixArnaqueur: "45€ annoncé → 400-800€ facturé",
      pourquoi:
        "Sur les tableaux hétérogènes des maisons briardes — porte-fusibles anciens côtoyant des modules récents — un divisionnaire fatigué se remplace dès 79€ TTC, calibre vérifié par rapport au circuit protégé. Le piège classique consiste à transformer ce remplacement unitaire en « remise à neuf du tableau » imposée sur-le-champ. Une refonte de tableau peut être justifiée (dès 129€ chez Joël, sur devis), mais elle se décide sur pièces, à tête reposée, pas dans l'entrée à 22h.",
    },
    {
      service: "Intervention nuit, dimanche ou jour férié à Hondevilliers",
      prixJoel: 59,
      prixArnaqueur: "39€ annoncé → 350-700€ facturé avec « majoration urgence »",
      pourquoi:
        "La « majoration de nuit » est le levier de surfacturation le plus banal du secteur : elle double ou triple une note sans aucun travail supplémentaire. Chez Joël, le forfait prise/interrupteur reste dès 59€ TTC à toute heure, week-ends et fériés compris — 0 majoration, c'est l'engagement central du réseau. Dans un village sans artisan local, cette règle vous évite le choix impossible entre un circuit douteux sous tension toute la nuit et une facture punitive.",
    },
  ],
  faqLocale: [
    {
      question:
        "Existe-t-il un électricien installé à Hondevilliers même ?",
      answer:
        "Non, et méfiez-vous de quiconque le prétend : aucune entreprise d'électricité n'est domiciliée dans une commune de 256 habitants (INSEE 2023). Les sites qui affichent « votre électricien à Hondevilliers, sur place en 20 minutes » sont des pages d'appât. Le réseau Joël dépêche un artisan du secteur élargi (vallée du Petit Morin, bassins de La Ferté-sous-Jouarre et Coulommiers), avec un prix fixe annoncé avant départ au 01 41 69 10 08 et un délai réaliste de 40 minutes à 1h15 selon l'heure et le lieu-dit.",
    },
    {
      question:
        "Ma prise a grillé dans une grange ou une dépendance : est-ce le même tarif qu'en maison ?",
      answer:
        "Oui : le forfait remplacement prise ou interrupteur reste dès 59€ TTC, que l'appareillage soit dans le séjour ou dans une dépendance. En revanche, l'artisan vérifiera l'adéquation du matériel au local : un appareillage de local humide ou extérieur doit présenter un indice de protection adapté (IP44 minimum dehors), ce que les lignes « provisoires » tirées vers les granges il y a quarante ans ne respectent presque jamais. Si un remplacement en matériel étanche s'impose, il vous est chiffré avant, pas découvert sur la facture.",
    },
    {
      question:
        "Ma maison ancienne n'a pas de terre dans les chambres : remplacer la prise suffit-il ?",
      answer:
        "Légalement, remplacer un appareillage défectueux à l'identique est possible ; techniquement, l'absence de terre reste une vulnérabilité — l'ONSE relève un défaut de mise à la terre dans 64 % des installations anciennes contrôlées (baromètre mai 2025). L'artisan Joël remplace la prise au forfait de 59€ et consigne par écrit l'état du circuit au regard de la NF C 15-100. Vous décidez ensuite, sans pression, d'une éventuelle extension de la terre — utile aussi parce que le diagnostic électrique est obligatoire à la vente pour toute installation de plus de 15 ans.",
    },
    {
      question:
        "Tout le hameau est dans le noir : panne Enedis ou panne chez moi ?",
      answer:
        "Premier réflexe : regardez chez les voisins et l'éclairage public. Si plusieurs maisons du hameau sont coupées en même temps — fréquent dans les secteurs ruraux alimentés en aérien, par vent fort ou orage —, c'est un incident réseau : appelez le service dépannage d'Enedis, l'intervention est de leur ressort et gratuite. Si vous êtes le seul foyer coupé et que votre disjoncteur de branchement est resté enclenché, le défaut est dans votre installation : là, le 01 41 69 10 08 s'applique, recherche de panne annoncée dès 89€ TTC. Ne payez jamais un dépanneur privé pour une panne de réseau public.",
    },
    {
      question:
        "Une intervention un dimanche soir à Hondevilliers est-elle majorée ?",
      answer:
        "Non. La règle du réseau Joël est sans exception : 0 majoration de nuit, de week-end et de jour férié, sur l'ensemble des communes couvertes, Hondevilliers compris. Une prise HS remplacée un dimanche à 22h coûte dès 59€ TTC, comme un mardi après-midi. Conséquence pratique : si vous êtes en présence de signaux de niveau 3 (noircissement, odeur de brûlé, disjoncteur qui retombe), n'attendez pas lundi pour « économiser » une majoration qui n'existe pas. Coupez le circuit et appelez.",
    },
    {
      question:
        "Un « électricien » m'a démarché à domicile ou laissé un prospectus alarmiste : que faire ?",
      answer:
        "Procédure simple. 1° Ne signez rien le jour même, quelle que soit l'urgence invoquée : la peur est leur outil de travail. 2° Vérifiez la société : SIRET sur l'annuaire Sirene, avis vérifiables, adresse réelle. 3° Exigez un devis écrit (arrêté du 24 janvier 2017) et comparez. 4° En cas de pression insistante, notamment sur une personne âgée du village, signalez sur SignalConso et n'hésitez pas à prévenir la gendarmerie de secteur : l'abus de faiblesse est une infraction pénale. Pour rappel, un contrat conclu hors établissement ouvre 14 jours de rétractation.",
    },
  ],
  temoignages: [
    {
      auteur: "Gérard B.",
      quartierOuRue: "hameau de Flagny",
      date: "2026-02-11",
      rating: 5,
      serviceRendered: "Remplacement d'une prise noircie dans une longère",
      texte:
        "Prise du cellier noircie avec une odeur de chaud, dans une maison des années 30 reprise par étapes. J'ai coupé le circuit comme indiqué au téléphone, envoyé les photos, et l'artisan est arrivé en un peu moins d'une heure — annoncé honnêtement vu qu'on est à Flagny, pas au bourg. Prise remplacée, connexion resserrée en amont, 59€ comme convenu au téléphone. Il a noté sur la facture l'absence de terre sur ce circuit, sans chercher à me vendre un chantier. Sérieux.",
    },
    {
      auteur: "Martine L.",
      quartierOuRue: "le bourg, près de l'église Saint-Loup-et-Saint-Gilles",
      date: "2026-04-26",
      rating: 5,
      serviceRendered: "Interrupteur qui grésillait, remplacé un dimanche",
      texte:
        "L'interrupteur du couloir grésillait depuis quelques jours et la plaque était tiède. Appel un dimanche en fin d'après-midi, en m'attendant à une majoration : rien, 59€ annoncés et facturés. L'électricien a remplacé le mécanisme, vérifié le tableau et testé le différentiel. Il m'a montré le bouton de test à actionner deux fois par an. Ma mère s'était fait facturer 480€ pour la même chose ailleurs il y a des années : la différence est parlante.",
    },
    {
      auteur: "Julien P.",
      quartierOuRue: "écart sur la route de Villeneuve-sur-Bellot",
      date: "2026-01-08",
      rating: 4,
      serviceRendered: "Prise morte + recherche de panne sur le circuit",
      texte:
        "Deux prises mortes d'un coup dans l'ancienne partie de la maison. Au téléphone, on m'a annoncé la recherche de panne à 89€ si le simple remplacement ne suffisait pas — c'était le cas : domino oxydé dans une boîte de dérivation sous l'escalier. Tout remis en service dans la matinée, facture détaillée conforme à l'annonce. Quatre étoiles car l'artisan a eu du retard à cause du brouillard sur le plateau, mais il avait prévenu par téléphone. Travail propre.",
    },
  ],
  internalLinks: [
    {
      url: "/electricien/meaux",
      anchor: "électricien à Meaux, au nord-ouest de la vallée du Petit Morin",
      contexte:
        "Le réseau couvre tout le nord Seine-et-Marne aux mêmes conditions : prix fixe annoncé avant, 0 majoration.",
    },
    {
      url: "/electricien/chelles",
      anchor: "électricien à Chelles, dans l'ouest du département",
    },
    {
      url: "/electricite",
      anchor: "l'ensemble des interventions d'électricité du réseau Joël en Île-de-France",
    },
    {
      url: "/serrurerie",
      anchor: "nos interventions de serrurerie — la sûreté du domicile, mon domaine d'origine",
    },
    {
      url: "/stop-arnaques",
      anchor: "la charte anti-arnaque complète du réseau Joël",
    },
  ],
  tags: [
    "hondevilliers",
    "77510",
    "seine-et-marne",
    "prise-interrupteur-hs",
    "electricien",
    "vallee-du-petit-morin",
    "deux-morin",
    "flagny",
    "zone-rurale",
    "nf-c-15-100",
    "onse",
    "anti-arnaque",
    "urgence-24h",
  ],
};
