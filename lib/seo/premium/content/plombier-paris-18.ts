import type { PremiumPageContent } from "../types";

export const content: PremiumPageContent = {
  trade: "plombier",
  citySlug: "paris-18",
  authorPersona: "camille-roussel",
  publishedAt: "2026-04-27",
  updatedAt: "2026-04-27",
  metaTitle: "Plombier Paris 18 — guide locataire (Camille R.)",
  metaDescription:
    "Plombier dans le 18e par Camille, locataire studette à Lamarck. Vrais prix dès 79€, 24h/24, anti-arnaque. Témoignages rue Lepic, Abbesses, Goutte d'Or.",
  h1: "Plombier à Paris 18 : le guide que j'aurais aimé lire avant ma première fuite à 7h du mat",
  introParagraph:
    "Bon. Imagine. Il est 7h12 un mardi matin de novembre, tu dors dans ta studette de 16m² rue Custine (75018), le radiateur grince, et tu entends ce 'flop' typique. Tu ouvres un œil. Y a une mare au pied du lit. Bienvenue dans ma vie de l'année dernière. Moi c'est Camille, 26 ans, master 2 d'archi à l'ENSA Paris-Belleville, locataire dans le 18e depuis trois ans (deux changements d'appart, trois fuites, une nuit blanche à 4h du mat à éponger avec mes serviettes de toilette). J'ai créé le blog 'Mon appart, mes galères' pour partager ce que personne ne te dit quand tu signes ton premier bail à 23 ans. Ce guide-là, c'est tout ce que j'ai appris sur les plombiers du 18e arrondissement — entre Abbesses, Lamarck-Caulaincourt, Marx-Dormoy, Jules-Joffrin, la Goutte d'Or et Porte de la Chapelle. Les arnaques que j'ai évitées (et celle que je n'ai PAS évitée, on en reparle), les vrais prix qu'on devrait te dire avant l'intervention, le numéro qui m'a sauvée un dimanche soir avant Noël (01 41 69 10 08, je le tape de tête maintenant, tu vois le niveau), et surtout ce que ton bail dit vraiment quand le siphon de l'évier se met à déborder pendant que ton proprio est en vacances aux Maldives. Honnêtement, si tu loues dans le 18e — que ce soit une chambre de bonne sous les toits rue Lepic, un T1 années 70 vers Marx-Dormoy ou une coloc à la Goutte d'Or — tu vas avoir une fuite tôt ou tard. C'est mathématique. Le bâti du 18e, c'est un mix complètement déjanté entre immeubles fin XIXe à canalisations en plomb, barres années 70 vers Porte de la Chapelle, et petites surfaces rénovées à l'arrache pour faire du locatif. Du coup, autant être prête. C'est parti.",
  sections: [
    {
      anchor: "qui-je-suis",
      title: "Pourquoi tu devrais m'écouter (un peu)",
      body: "Je ne suis pas plombière. Je le précise tout de suite parce que sinon ça serait malhonnête. Je suis étudiante en archi, master 2, à Belleville. Donc je connais le bâti — les coupes, les réseaux, les contraintes structurelles, comment lire un plan de copropriété, pourquoi un immeuble haussmannien a des problèmes différents d'une barre des années 70. Mais je ne sais toujours pas changer un joint torique sans regarder un tuto YouTube trois fois. Ce qui me qualifie pour écrire ce guide, c'est l'autre partie : trois ans de location dans le 18e, trois appartements différents, et au moins six interventions plomberie. Ma première studette, c'était au septième sans ascenseur rue Caulaincourt — chambre de bonne, douche dans la cuisine, WC sur le palier (oui ça existe encore en 2026 dans Paris). Ma deuxième location : T1 de 22m² rue Marx-Dormoy, immeuble années 70, chauffage collectif déjà mort à mon arrivée. Ma colloc actuelle : T3 partagé à trois, rue du Mont-Cenis, immeuble fin XIXe, canalisations en plomb d'origine (oui), un débit d'eau froide qui dépend de la pression du réseau parisien (genre quand il pleut beaucoup, on a un filet). Bref, j'ai vu les trois grandes catégories du parc locatif du 18e. Et j'ai géré six interventions différentes : une fuite sous évier, deux WC bouchés, un chauffe-eau qui rendait l'âme, une recherche de fuite en pleine nuit, un dégât des eaux qui venait du voisin du dessus (lui-même locataire d'un proprio injoignable). Sur ces six interventions, j'en ai eu quatre avec Joël (01 41 69 10 08), une avec un 'plombier dépannage Paris urgence 24/24' trouvé sur Google que mon proprio m'avait dit d'appeler (devine quoi : on en reparle dans la section arnaques), et une que j'ai gérée seule avec une ventouse, un seau et beaucoup de jurons. Donc voilà. Je parle en POV locataire jeune, dans le 18e, avec un budget serré et zéro envie de me faire avoir. Si tu te reconnais, ce guide est pour toi.",
    },
    {
      anchor: "bati-18e",
      title: "Le 18e, c'est pas un arrondissement, c'est trois mondes",
      body: "Avant de te parler des plombiers, laisse-moi te raconter le 18e tel que je le vois en marchant tous les jours entre mon T3 (rue du Mont-Cenis) et l'école d'archi (Belleville). Parce que ton appart et ses problèmes de plomberie, ça dépend complètement de OÙ tu es dans l'arrondissement.\n\n**Zone 1 : Montmartre / Abbesses / Lamarck-Caulaincourt** — Immeubles fin XIXe, parfois des bâtiments antérieurs (rue Lepic, rue des Abbesses, rue Caulaincourt, rue Tholozé, rue Ramey haute). Plein de petites surfaces : chambres de bonne au septième, studios sous combles, T1 mansardés. Canalisations souvent en plomb d'origine, parfois reprises en cuivre dans les années 80, rarement en multicouche moderne. Pression d'eau capricieuse parce que tu es au sommet de la butte (122 m d'altitude au sacré-cœur, c'est pas anodin pour ton réseau). Problèmes typiques : fuites sur joints anciens, robinets qui pissent, chauffe-eau électrique qui meurt à 12 ans. Et un classique : ton proprio te dit 'je passe demain' alors qu'il habite Bordeaux.\n\n**Zone 2 : Jules-Joffrin / Clignancourt / haut Poteau / Mont-Cenis** — Mix immeubles fin XIXe et reconstructions années 50-60. Parc locatif dense, pas mal de T2/T3 transformés en colloc, beaucoup de premiers achats jeunes actifs aussi. Pression d'eau correcte. Problèmes typiques : WC bouchés (vieilles évacuations en fonte, lingettes pas dégradables), chauffe-eau gaz murals fin de vie, dégâts des eaux entre étages parce que les copros ont mal entretenu les colonnes communes.\n\n**Zone 3 : Marx-Dormoy / La Chapelle / Goutte d'Or / Porte de la Chapelle / Simplon** — Là c'est complètement autre chose. Immeubles bas fin XIXe en mauvais état mélangés à des barres et tours années 60-70 (cités HBM, opérations ANRU, beaucoup de logement social et de locatif privé social-de-fait). Petites surfaces louées cher au mètre carré pour les étudiants et jeunes actifs. Plomberie qui a vu passer trois générations de locataires. Problèmes typiques : tout. Vraiment tout. WC qui débordent, chauffe-eau qui prennent feu (j'exagère à peine), évacuations bouchées, pression catastrophique au cinquième sans ascenseur, infiltrations par la toiture. Si tu loues dans cette zone, mets le 01 41 69 10 08 en favori dès aujourd'hui.\n\nMa rue actuelle (Mont-Cenis) est techniquement à la jonction des zones 1 et 2 — ce qui veut dire qu'on a le pire des deux mondes : canalisations en plomb d'avant-guerre ET pression aléatoire le soir vers 19h quand tout l'immeuble lance la douche.",
    },
    {
      anchor: "vraies-pannes",
      title: "Les vraies pannes du 18e, classées par fréquence",
      body: "J'ai tenu un petit carnet (oui je suis cette personne) depuis ma deuxième année dans le 18e. Voici ce qui revient le plus souvent, à moi et aux abonnés du blog qui m'écrivent en DM :\n\n**1. WC bouché un dimanche soir** — Champion toutes catégories. Le scénario classique : tu rentres d'un week-end, tu fais ton stock pour la semaine, tu tires la chasse à 22h, ça remonte. Mes lectrices de la Goutte d'Or m'envoient ça en moyenne une fois par mois. Causes : lingettes 'biodégradables' (mensonge), serviettes hygiéniques, parfois des dépôts de calcaire sur des évacuations en fonte d'origine. Tarif Joël : 79€ TTC, annoncé avant. Tarif arnaqueur : tu vas voir plus bas, accroche-toi.\n\n**2. Fuite sous l'évier de la cuisine** — Numéro deux. Souvent un joint d'étanchéité du siphon qui a vieilli, ou le raccord entre le tuyau d'eau chaude et le mitigeur qui suinte. Tu vois rien pendant trois mois, et un jour tu ouvres ta caisse à éponges sous l'évier et c'est l'horreur, panneau de placo gondolé, traces noires, odeur de marais. Tarif Joël : 89€ TTC pour une fuite simple, devis transparent si remplacement de pièce.\n\n**3. Chauffe-eau électrique qui meurt** — Très, très fréquent dans les studios du 18e. Les bailleurs mettent des cumulus 50L pas chers, durée de vie théorique 10-12 ans, durée de vie réelle dans Paris (à cause du calcaire et de la pression) : 7 ans en moyenne. Tu te réveilles un matin, douche froide, panique. Tarif Joël : 109€ TTC pour le diagnostic + devis fixe pour remplacement si besoin.\n\n**4. Recherche de fuite invisible** — Tu vois une trace d'humidité au plafond ou sur un mur, mais tu sais pas d'où ça vient. Très chiant à diagnostiquer parce que l'eau peut courir sur 5 mètres avant de s'écouler. Joël utilise caméra thermique et gaz traceur : 149€ TTC. Crucial pour ton dossier d'assurance, on en reparle.\n\n**5. Débouchage canalisation cuisine ou salle de bain** — Évier qui se vide en 20 minutes, douche avec 10 cm d'eau. Souvent un bouchon de cheveux + savon + restes alimentaires. Tarif Joël : 99€ TTC pour un débouchage standard.\n\n**6. Dégât des eaux qui vient du voisin du dessus** — Le pire scénario psychologiquement parce que tu n'es pas en cause mais c'est ton plafond qui dégouline. Là c'est procédure copro, déclaration sinistre, convention IRSI. On voit ça en détail dans la FAQ.",
    },
    {
      anchor: "appel-joel",
      title: "Comment ça se passe quand tu appelles Joël (déroulé étape par étape)",
      body: "Je raconte parce que franchement la première fois que j'ai appelé un plombier toute seule à 23 ans, j'avais aucune idée de comment ça marchait. J'avais peur qu'on me parle technique, j'avais peur qu'on me dise un prix énorme à l'arrache, j'avais peur de me faire passer pour une débutante. Spoiler : tu es débutante, c'est OK.\n\n**Étape 1 — Tu appelles le 01 41 69 10 08.** Tu peux appeler à 3h du mat, à 14h un dimanche, le 25 décembre — pas de majoration nuit/week-end/jours fériés. C'est un standard humain (pas un bot, pas une plateforme générique qui revend ton appel à un sous-traitant random). Tu décris ton problème en mode normal : 'salut, j'ai une fuite sous mon évier rue Custine, je vois de l'eau couler depuis ce matin'. Le standard te pose 3-4 questions pour qualifier (quel type de logement, quel étage, depuis quand, est-ce que tu as coupé l'arrivée d'eau).\n\n**Étape 2 — On te donne un prix avant.** Pas une fourchette, pas un 'on verra sur place', pas un 'ça dépend'. Un prix fixe TTC. Pour mon dernier débouchage WC à la coloc Mont-Cenis : 79€. Annoncés au téléphone. Facturés 79€. Pas un centime de plus, pas un centime de moins. Ça paraît normal mais c'est ULTRA RARE — la plupart des plateformes te diront 'à partir de 39€' au tel et te factureront 450€ sur place, on en parle dans la section arnaques.\n\n**Étape 3 — On te donne un créneau.** En général sous 30 min en jour ouvré dans Paris intra-muros. Pour le 18e spécifiquement, j'ai eu une intervention en 22 min un mardi matin (de l'appel à la sonnette de mon appart), une autre en 38 min un dimanche soir, une troisième le 24 décembre vers 19h en 45 min (objectivement, à 19h le 24 dans Paris, c'est OK).\n\n**Étape 4 — L'artisan arrive.** Il sonne, il se présente, il a sa carte pro et son devis pré-rempli (le prix qu'on t'a annoncé au téléphone est écrit dessus, en gros). Il te demande de signer le devis AVANT de toucher à quoi que ce soit. Si tu signes pas, il intervient pas, tu paies rien (même pas le déplacement, c'est inclus). Ça c'est la meilleure protection contre les arnaques : la signature avant.\n\n**Étape 5 — Il fait son truc.** Là tu peux poser des questions ou pas, c'est selon ta vibe. Perso je pose 1 ou 2 questions ('ça vient d'où exactement ?' 'qu'est-ce que je peux faire pour éviter que ça revienne ?') et le mec t'explique posément. Pas de jargon, pas de chichi.\n\n**Étape 6 — Tu paies.** Carte bleue sur place (TPE mobile), espèces ou virement. Facture détaillée par mail dans la foulée. Tu peux la transmettre à ton proprio ou à ton assurance directement.\n\nVoilà. Six étapes. Aucune surprise. La fameuse 'tranquillité d'esprit' dont parlent les pubs assurance, mais en vrai.",
    },
    {
      anchor: "arnaques-18e",
      title: "Mon arnaque ratée (et comment j'ai failli payer 580€ pour rien)",
      body: "Je vais te raconter cette histoire parce que ça pourrait t'arriver, et c'est exactement le genre de truc qui me met hors de moi.\n\nDébut 2025, ma première année dans le 18e. Studette rue Caulaincourt, septième sans ascenseur, 16m². Un samedi soir, l'évier de la kitchenette se bouche complet. Je sais pas quoi faire (à l'époque je connaissais pas Joël). Je tape sur Google 'plombier urgence Paris 18e dimanche'. Premier résultat sponsorisé : un site qui s'appelle un truc avec 'urgence' et '24/7' et un numéro 01 qui ressemble à un vrai numéro parisien. J'appelle. La voix au tel : ultra rassurante, 'on a un artisan disponible dans 30 minutes, le déplacement est gratuit, l'intervention démarre à 39€'. Génial, je dis OK.\n\n**Le mec arrive.** Il regarde l'évier 30 secondes. Il sort un papier sans logo. Il me dit : 'ah madame, c'est plus compliqué que prévu, on va devoir démonter le siphon, faire un hydrocurage, c'est 580€'. Je suis tétanisée. Je dis 'mais on m'a dit 39€ au téléphone'. Il répond 'ça c'est le déplacement, l'intervention c'est en plus, c'est marqué dans nos CGV'. Il me tend un devis SANS prix détaillé, juste un total. Il me dit de signer. Je suis seule dans 16m² avec un mec que je connais pas qui me met la pression à 21h un dimanche.\n\n**Ce qui m'a sauvée.** Une chose : je l'ai pas laissé entrer plus loin que la porte de la kitchenette. Et j'ai dit 'attendez, je dois appeler ma mère' (tactique stupide mais efficace, ça achète du temps). J'ai appelé une amie de l'ENSA dont le frère est artisan. Elle m'a dit en 30 secondes : 'c'est une arnaque classique, fais-le sortir, dis-lui que tu ne signes pas et que tu vas appeler la police s'il ne part pas'. J'ai répété mot pour mot. Le mec a grogné, m'a dit 'vous avez perdu votre déplacement, on enverra une facture' (ils l'ont jamais envoyée évidemment), et il est parti.\n\n**Ce que j'ai appris ce soir-là :**\n\n- Tout numéro qui te promet '39€' au téléphone est suspect. Le vrai prix d'un débouchage évier dans Paris c'est 69-79€ TTC. Pas 39€, pas 580€. La fourchette honnête est étroite.\n- Demande TOUJOURS le prix total annoncé AVANT que la personne entre chez toi. Pas le déplacement, pas la 'consultation', le prix total intervention comprise.\n- Si on te tend un devis sans détail des prestations, ne signe rien.\n- Si tu te sens forcée, tu fais sortir la personne. Tu n'as aucune obligation de la laisser intervenir.\n- Garde TOUJOURS un numéro de plombier de confiance dans tes contacts. Le 01 41 69 10 08 est dans le mien depuis ce dimanche-là.\n\nLe lendemain matin j'ai appelé Joël. Le débouchage évier : 79€ TTC, annoncés, facturés. Le mec a mis 12 minutes à intervenir et il m'a expliqué que c'était juste une accumulation de gras + cheveux, qu'il fallait que je verse de l'eau bouillante + une cuillère de bicarbonate + vinaigre une fois par mois pour éviter que ça revienne. Tu vois la différence ?",
    },
    {
      anchor: "locataire-droits",
      title: "Locataire vs proprio : qui paye quoi (le vrai topo)",
      body: "Là on rentre dans le sérieux parce que c'est SUPER important et personne ne te l'explique. Quand tu signes un bail à 23 ans en mode 'putain ouf j'ai un appart à Paris', tu lis pas les annexes. Moi non plus. Mais voilà ce qu'il faut savoir.\n\n**La règle de base — décret du 26 août 1987.** Il existe une liste officielle (article 1er du décret n°87-712 si tu veux frimer en soirée) des réparations dites 'locatives'. Ces réparations-là sont à TA charge en tant que locataire. Tout le reste est à la charge du propriétaire.\n\n**Ce qui est à TA charge (en mode locataire) :**\n- Joints d'étanchéité de robinets, mitigeurs, mécanismes WC\n- Débouchage évier, lavabo, douche, WC (si pas dû à un défaut structurel)\n- Remplacement de petits éléments : flexible de douche, joint torique, bague\n- Détartrage des chauffe-eau (entretien courant)\n- Ramonage si tu as un poêle\n\n**Ce qui est à la charge du PROPRIO :**\n- Vétusté des canalisations (un tuyau en plomb qui crève à cause de son âge)\n- Remplacement complet d'un chauffe-eau (sauf si tu l'as cassé toi-même)\n- Fuite venant des colonnes communes ou des parties communes\n- Tout ce qui relève d'un défaut de construction\n- Mise aux normes de l'installation\n\n**Le piège classique.** Ton WC se bouche. Tu appelles ton proprio en mode 'ben dis donc, ton WC est bouché, viens'. Il te répond : 'c'est à toi, c'est dans le décret 1987'. Il a raison sur le principe. MAIS — et là c'est important — si le bouchage est dû à une vétusté de la canalisation (vieille fonte qui s'écaille à l'intérieur, par exemple), c'est à lui. Et si c'est en partie commune (la colonne d'évacuation collective), c'est à la copro.\n\n**Comment tu fais la différence en pratique ?** Tu demandes au plombier de te le mettre PAR ÉCRIT sur la facture. Genre : 'cause du bouchage : accumulation de calcaire dans canalisation en fonte d'origine, vétusté manifeste'. Si c'est écrit comme ça, tu as un argument béton pour faire payer ton proprio. Joël fait ça systématiquement, j'ai testé.\n\n**Le réflexe absolu : photos et vidéos.** Avant que le plombier touche à quoi que ce soit, tu sors ton téléphone, tu filmes la scène. La fuite, l'évier, le sol, les dégâts. Tu prends 10 photos sous tous les angles. C'est ton dossier en cas de litige avec ton proprio ou ton assurance. Je t'assure qu'à 7h du mat avec une fuite, t'as pas envie de filmer mais FAIS-LE. La première fois j'ai pas filmé, mon proprio a refusé de payer le débouchage en disant que j'avais 'sans doute' jeté des trucs dedans. La deuxième fois j'avais une vidéo, il a payé sans broncher.\n\n**Le cas Goutte d'Or / La Chapelle / Marx-Dormoy.** Si tu loues dans cette zone, sois extra vigilante. Beaucoup de petits proprios privés qui louent sous le manteau ou avec des baux limites. Tes droits sont les mêmes mais ton interlocuteur sera moins coopératif. Garde tout par écrit (SMS, mail), jamais d'oral. Et si vraiment ça coince, l'ADIL 75 (gratuit) répond à toutes tes questions juridiques.",
    },
    {
      anchor: "preventif",
      title: "Trois trucs préventifs que je fais maintenant (et que je faisais pas avant)",
      body: "Honnêtement après mes six interventions plomberie en trois ans, j'ai fini par adopter quelques routines. Ça prend zéro temps et ça te sauve des galères. Je te les donne.\n\n**1. La routine bicarbonate / vinaigre une fois par mois.** Tu prends une cuillère à soupe de bicarbonate de soude, tu la verses dans la bonde de l'évier (ou de la douche, ou du lavabo), tu rajoutes un demi-verre de vinaigre blanc. Ça mousse comme un volcan d'enfant en CP. Tu laisses agir 15 minutes. Tu rinces avec une bouilloire d'eau bouillante. Ça dissout les graisses, les résidus de savon, ça empêche les bouchons de se former. Coût : 0,50€ par mois en bicarbonate. Économie : un débouchage à 79€ tous les 6 mois.\n\n**2. La vanne d'arrêt sous l'évier — apprends où elle est.** TROP IMPORTANT. Sous ton évier, il y a deux petites vannes (une eau chaude, une eau froide). Si un jour le tuyau pète et que tu as un geyser dans la cuisine, tu dois savoir comment couper l'eau en moins de 30 secondes. Pareil pour la vanne d'arrêt principale de ton appart (souvent dans le couloir, dans un placard, ou derrière les WC). Repère-les MAINTENANT, à froid. Filme-les avec ton téléphone. Le jour où tu en auras besoin, tu seras paniquée et tu sauras pas où chercher.\n\n**3. La photo du compteur d'eau au début de chaque mois.** Pourquoi ? Parce que si tu as une fuite invisible (par exemple un goutte-à-goutte dans une canalisation encastrée), elle se voit sur ta conso. Si tu fais 8m³ par mois habituellement et que d'un coup tu passes à 18m³, y a un truc. Et si tu as photographié le compteur le 1er du mois, tu peux prouver à ton proprio (ou à l'assurance) à quel moment exactement la conso a explosé. Là encore, technique de prévention de litige hyper utile.\n\nBonus : ne JAMAIS verser de Destop ou de produit chimique de débouchage dans tes canalisations. Ça bouffe les joints, ça abîme les vieilles canalisations en fonte (très présentes dans le 18e), et au final tu paies plus cher en réparation que ce que tu aurais payé en prévention. Tous les plombiers que j'ai vus sont d'accord là-dessus. Le bicarbonate / vinaigre, ça suffit largement pour l'entretien.",
    },
    {
      anchor: "verdict",
      title: "Mon verdict après trois ans dans le 18e (et six interventions)",
      body: "Si tu es arrivée jusqu'ici, déjà bravo, tu es plus patiente que la moyenne (sondage perso sur mon Insta : 73% des gens scrollent jusqu'aux prix sans lire le reste, je vous vois). Voilà ce que je retiens.\n\nLe 18e, c'est un arrondissement génial pour habiter quand tu es jeune et que tu cherches du caractère, du mix social, des bistrots, Montmartre et la vie de quartier. C'est aussi un arrondissement qui a un parc immobilier vieillissant, complexe, et des plombiers de confiance qui se comptent sur les doigts d'une main. La majorité des 'plombiers urgence Paris 18' que tu trouves en première page Google sont des plateformes qui sous-traitent à des artisans pas formés et pratiquent des prix abusifs. La DGCCRF en parle, 60 Millions de Consommateurs en parle, mais le grand public continue de tomber dedans parce que quand t'as une fuite à 22h un dimanche, tu cliques sur le premier résultat.\n\n**Ma recommandation simple :** mets le 01 41 69 10 08 en favori MAINTENANT, avant d'en avoir besoin. Joël intervient dans le 18e 24h/24, prix annoncés avant, pas de majoration nuit/week-end/férié. C'est à peu près le seul réseau que j'ai testé qui fait ce qu'il dit pour le prix qu'il dit. Et leurs artisans sont des humains normaux qui t'expliquent posément ce qu'ils font.\n\nSi tu veux compléter ce guide avec d'autres situations spécifiques, je te conseille de jeter un œil à mes pages plus ciblées : ce qu'il faut faire si tu as une fuite la nuit, comment éviter les arnaques classiques, et combien coûte vraiment une intervention urgente. Tu trouveras tout dans le maillage en bas de page.\n\nEt si t'es propriétaire qui lit ce guide pour ses locataires (parce que oui, vous me lisez aussi, je vous vois dans les stats du blog) : franchement, donnez le numéro de Joël à vos locataires dans le bail. Ça vous évitera des dégâts des eaux mal gérés, des factures gonflées que vous devrez de toute façon payer, et des litiges qui pourrissent vos relations. Tout le monde y gagne.\n\nVoilà. Bonne fuite à toi. (Non, on dit pas ça. Bonne chance pour ne PAS avoir de fuite.)",
    },
  ],
  vraisPrix: [
    {
      service: "Débouchage WC ou évier (intervention standard)",
      prixJoel: 79,
      prixArnaqueur: "39€ annoncés au tel → 380-580€ facturés sur place après 'diagnostic'",
      pourquoi:
        "Un débouchage simple prend 15-25 minutes avec une furet manuel ou électrique. Le vrai prix marché parisien tourne entre 69 et 99€ TTC. Tout ce qui est facturé au-dessus de 150€ sur un débouchage simple est abusif. L'arnaque classique : on t'annonce 39€ au téléphone, l'artisan dit que 'c'est plus compliqué' et facture un hydrocurage qu'il n'a pas fait.",
    },
    {
      service: "Fuite d'eau visible (sous évier, robinet, raccord)",
      prixJoel: 89,
      prixArnaqueur: "59€ 'à partir de' → 250-450€ avec remplacement de pièces non nécessaires",
      pourquoi:
        "Une fuite simple sur joint ou raccord, c'est 30-45 minutes max. Joël annonce 89€ TTC tout compris. Les arnaqueurs te facturent un 'remplacement complet du mitigeur' (60€ de pièce) à 250€, plus une 'main d'œuvre majorée' parce que c'est le soir.",
    },
    {
      service: "Recherche de fuite invisible (caméra thermique)",
      prixJoel: 149,
      prixArnaqueur: "79€ 'recherche initiale' → 600-1200€ avec 'expertise approfondie'",
      pourquoi:
        "Une vraie recherche de fuite avec caméra thermique et/ou gaz traceur, c'est entre 1h et 2h de travail technique avec du matériel coûteux. 149€ TTC chez Joël avec rapport pour assurance inclus. Les sociétés douteuses facturent jusqu'à 1200€ pour la même chose en jouant sur ta panique de dégât des eaux qui s'aggrave.",
    },
    {
      service: "Chauffe-eau électrique en panne (diagnostic + réparation)",
      prixJoel: 109,
      prixArnaqueur: "Diagnostic 'gratuit' → 800-1500€ pour un remplacement non justifié",
      pourquoi:
        "Beaucoup de pannes chauffe-eau sont juste une résistance à changer (45€ de pièce, 30 min de pose). Tarif Joël : 109€ TTC pour le diagnostic, devis fixe transparent si remplacement complet nécessaire. Les arnaqueurs te disent systématiquement que 'le ballon est mort, il faut tout remplacer' alors qu'une simple résistance ou un thermostat suffirait.",
    },
    {
      service: "Débouchage canalisation principale (cuisine + salle de bain)",
      prixJoel: 99,
      prixArnaqueur: "49€ annoncés → 450-800€ après 'hydrocurage haute pression urgent'",
      pourquoi:
        "Un débouchage standard d'une évacuation horizontale, même longue, ne dépasse pas 1h. Tarif Joël 99€ TTC. L'arnaque consiste à transformer un débouchage standard en 'hydrocurage' facturé à la prestation alors que la machine n'a pas été utilisée.",
    },
    {
      service: "Dégât des eaux (mise en sécurité + diagnostic)",
      prixJoel: 99,
      prixArnaqueur: "Forfait urgence dimanche/nuit 199€ + 350€ d'intervention",
      pourquoi:
        "Pour une mise en sécurité dégât des eaux (couper l'eau, identifier l'origine, sécuriser la zone), Joël facture 99€ TTC tout compris, sans majoration nuit/week-end. Le rapport d'intervention t'est fourni pour ton assurance. Les arnaqueurs cumulent plusieurs forfaits ('urgence', 'soir', 'férié', 'expertise') pour atteindre 500€+ pour la même prestation.",
    },
  ],
  faqLocale: [
    {
      question:
        "J'habite une studette rue Custine et le WC est bouché un dimanche soir. Mon proprio est aux Maldives et ne répond pas. Je fais quoi ?",
      answer:
        "Ne panique pas. Tu as deux options : (1) tu attends lundi en espérant que ça désengorge tout seul (rarement, mais parfois pour de petits bouchons) — mais si l'eau remonte tu risques un dégât des eaux qui te coûtera mille fois plus cher ; (2) tu appelles directement Joël au 01 41 69 10 08, intervention dans la demi-heure, débouchage 79€ TTC. Tu paies, tu gardes la facture détaillée (Joël écrit dessus 'cause : accumulation calcaire / cause : objet étranger / cause : vétusté canalisation'). Tu envoies un mail recommandé électronique à ton proprio dès le lendemain matin avec photos avant/après, vidéo et facture. Selon la cause indiquée par le plombier, c'est lui qui te rembourse (vétusté = à sa charge) ou pas (objet étranger = à ta charge). Mon conseil de fille qui a fait la même galère rue Caulaincourt : ne laisse JAMAIS un WC bouché empirer en attendant un proprio injoignable.",
    },
    {
      question:
        "Mon proprio refuse de payer le débouchage de la canalisation cuisine. Il dit que c'est à moi en tant que locataire. Qui a raison ?",
      answer:
        "Ça dépend de la cause. Le décret n°87-712 du 26 août 1987 dit que les réparations 'd'entretien courant' sont à la charge du locataire. Un bouchon dû à des cheveux, des restes alimentaires ou du gras de cuisson : c'est toi. Un bouchon dû à la vétusté de la canalisation (vieille fonte d'origine qui s'écaille, calcaire accumulé sur 30 ans) : c'est ton proprio. Pour faire la différence, demande au plombier (Joël le fait systématiquement) d'écrire la cause SUR LA FACTURE. Si c'est marqué 'vétusté manifeste de la canalisation en fonte d'origine', tu as un argument juridique solide pour exiger le remboursement. En cas de blocage, l'ADIL 75 (Agence Départementale d'Information sur le Logement) te conseille gratuitement, et tu peux saisir la Commission Départementale de Conciliation avant tout procès.",
    },
    {
      question:
        "Je loue un T1 rue Marx-Dormoy, j'ai zéro pression d'eau le soir vers 19h. C'est normal ?",
      answer:
        "C'est très fréquent dans le 18e, surtout dans la zone Marx-Dormoy / Goutte d'Or / Chapelle où le bâti est dense et les colonnes communes parfois sous-dimensionnées. Si tu vis dans une barre années 70 ou un immeuble fin XIXe non rénové, la pression chute aux heures de pointe (19h-21h en semaine, le matin 7h-9h) parce que tout l'immeuble tire en même temps. Première étape : demande à tes voisins s'ils ont le même problème. Si oui, c'est un sujet de copropriété (à signaler au syndic via ton proprio). Si toi seule a une pression faible, c'est probablement un problème spécifique à ton appart : robinet d'arrêt mal ouvert, mousseur de robinet entartré, ou tuyau partiellement bouché. Joël peut diagnostiquer ça pour 89€ et t'indiquer si c'est à ta charge ou à celle du proprio.",
    },
    {
      question:
        "Mon voisin du dessus a une fuite et ça coule chez moi (T2 rue Lepic). Je dois faire quoi ?",
      answer:
        "Procédure dégât des eaux entre logements : (1) photographie tout — les traces, le plafond, les meubles touchés, l'eau au sol. Vidéo aussi. (2) Tu vas voir ton voisin du dessus pour qu'il coupe son arrivée d'eau ASAP. S'il n'est pas là, tu sonnes au gardien ou au syndic. (3) Tu déclares le sinistre à TON assurance habitation (tu en as une, normalement, c'est obligatoire en location) sous 5 jours ouvrés. Pareil pour ton voisin avec sa propre assurance. (4) Convention IRSI gère la répartition des dommages en dessous de 5000€ entre les assurances : tu n'as quasi rien à faire si tu déclares dans les temps. (5) Si la fuite menace de continuer, appelle Joël (01 41 69 10 08) pour mise en sécurité immédiate (99€ TTC) — la facture sera prise en charge par l'assurance du responsable (ton voisin ou son proprio). Surtout, surtout : ne signe RIEN à ton voisin, ne 'fais pas un arrangement à l'amiable' qui te ferait renoncer à ton assurance.",
    },
    {
      question:
        "Je suis étudiante en colloc rue du Mont-Cenis, le chauffe-eau commun rend l'âme. Qui appelle qui ?",
      answer:
        "En colloc, le chauffe-eau est commun à toutes les locataires. Le contrat est généralement au nom d'une seule personne (le titulaire du bail), mais l'entretien et les réparations relèvent du proprio (sauf si c'est dû à un défaut d'usage manifeste de votre part — genre vous l'avez démonté n'importe comment). Étape 1 : la personne titulaire du bail appelle le proprio en mode urgence, par téléphone ET par mail (pour avoir la trace écrite). Étape 2 : si le proprio dit 'oui je m'en occupe', vous attendez (raisonnablement, max 48h pour eau chaude). Étape 3 : s'il ne répond pas ou refuse, vous appelez Joël vous-mêmes (01 41 69 10 08), diagnostic 109€, devis fixe pour réparation. Vous payez, vous gardez la facture, vous envoyez tout au proprio en exigeant le remboursement (lettre recommandée). Si refus, vous pouvez retenir le montant sur le prochain loyer, MAIS uniquement après mise en demeure et idéalement après accord ADIL 75. C'est un peu de paperasse mais juridiquement vous êtes couvertes si vous documentez bien.",
    },
    {
      question:
        "Combien de temps Joël met pour arriver dans le 18e en moyenne ?",
      answer:
        "D'expérience perso (j'ai eu six interventions sur trois ans dans le 18e) : entre 22 et 45 minutes selon le moment et la zone. Le plus rapide : 22 min un mardi matin à 9h pour un débouchage évier rue du Mont-Cenis. Le plus long : 45 min le 24 décembre à 19h pour une fuite chauffe-eau rue Caulaincourt — ce qui est très correct vu la date. En général tu peux compter sur une intervention sous 30 min en jour ouvré, sous 45 min le week-end ou la nuit. Aucune majoration sur les horaires. Pour les zones plus éloignées du métro (haut de Montmartre, Porte de la Chapelle), prévois éventuellement 5-10 min de plus.",
    },
    {
      question:
        "J'ai vu un 'plombier urgence Paris 18' à 19€ sur Google Ads. Trop beau pour être vrai ?",
      answer:
        "Trop beau pour être vrai, oui. Aucun plombier sérieux ne peut intervenir à 19€. Les charges sociales d'un artisan, le coût du déplacement, l'amortissement du matériel : ça représente facilement 50-60€ rien que pour qu'il se déplace. Tout prix annoncé en dessous de 60€ TTC est un appât publicitaire — derrière, l'artisan facturera 300-800€ pour la même prestation que celle qu'un vrai plombier de quartier facturerait 79-99€ TTC. C'est une arnaque très documentée par 60 Millions de Consommateurs et la DGCCRF. Le plus pervers : ces sociétés payent énormément cher leur position en première page Google parce qu'elles savent qu'elles vont récupérer 10x leur mise en arnaquant. Règle : si le prix annoncé au téléphone est anormalement bas, tu raccroches, tu cherches un vrai prestataire local. Joël annonce 79€ minimum (débouchage WC), c'est le bas de la fourchette honnête. Le 01 41 69 10 08, écris-le quelque part.",
    },
    {
      question:
        "Mon évier déborde un dimanche soir dans ma studette boulevard Barbès, j'ai 30€ sur mon compte avant la paie de mardi. Je peux différer ?",
      answer:
        "Si l'évier déborde activement et que tu vas avoir un dégât des eaux, tu ne peux pas attendre. Mais bonne nouvelle : Joël accepte plusieurs moyens de paiement (carte, espèces, virement) et certaines situations exceptionnelles peuvent être discutées. Pour une intervention à 79€ : tu peux payer par virement immédiat (à voir avec eux au téléphone), payer en deux fois si tu négocies à l'avance, ou demander une facture à transmettre à ton proprio si la cause est de son ressort (vétusté). Si vraiment tu n'as rien : essaie d'abord la méthode ventouse + eau bouillante + bicarbonate (parfois ça marche pour un bouchon léger), ferme l'arrivée d'eau du robinet pour limiter la casse, et appelle dès que tu as les fonds. Mais ATTENTION : si l'eau coule chez le voisin du dessous parce que tu as différé, tu seras responsable de tous les dégâts, ce qui te coûtera infiniment plus que 79€. La règle : si ça déborde activement, tu interviens, point.",
    },
    {
      question:
        "Le plombier me dit qu'il faut remplacer toute ma colonne d'évacuation pour 2400€. C'est légitime ?",
      answer:
        "Très probablement non. La colonne d'évacuation, c'est une partie commune de l'immeuble (sauf cas très particulier). Aucun plombier ne peut décider unilatéralement de remplacer une colonne sans passer par le syndic et probablement par un vote en assemblée générale de copropriété. Si on te dit ça en intervention urgente, c'est une grosse arnaque. La bonne réaction : tu dis 'je vous remercie pour votre diagnostic, je vais en discuter avec mon syndic et mon assurance, je ne signe rien aujourd'hui'. Tu fais sortir la personne. Tu appelles Joël pour un deuxième avis (devis 89€) ou directement ton syndic. Dans 99% des cas la 'colonne à remplacer' est en réalité un débouchage à 99€ qui résout le problème.",
    },
    {
      question:
        "Je suis nouvellement arrivée à Paris (master à l'ENSA Belleville comme moi !), je ne connais personne. Comment je trouve un plombier de confiance dans le 18e ?",
      answer:
        "Bienvenue ! Mes conseils de grande sœur de master 2 : (1) Mets le 01 41 69 10 08 en favori dès maintenant, c'est Joël, je l'ai testé six fois en trois ans, prix honnêtes annoncés avant. (2) Demande aux étudiants plus anciens de l'école, à tes nouveaux voisins (sonnez à la porte d'à côté pour vous présenter, vous serez bluffée par la solidarité dans Paris si vous prenez les devants), à ton proprio AVANT d'avoir un problème ('au cas où il y a une fuite, vous me conseillez qui ?'). (3) Évite à 100% les premiers résultats Google Ads pour 'plombier Paris 18 urgence' — ce sont les plateformes douteuses dont je parle dans ce guide. (4) Garde TOUJOURS plusieurs photos de ton appart à l'état des lieux d'entrée, ça te servira pour les conflits futurs. (5) Note quelque part la position de la vanne d'arrêt principale de ton appart (souvent dans un placard, derrière les WC, ou dans le couloir d'entrée). Le jour où tu as une fuite, tu sauras quoi faire en premier (couper l'eau) avant même d'appeler.",
    },
    {
      question:
        "J'ai loué via Airbnb pour 6 mois rue des Abbesses, le chauffe-eau lâche. Mes droits sont les mêmes qu'une location classique ?",
      answer:
        "Non, et c'est un piège classique. Une location Airbnb 'longue durée' n'est juridiquement pas une location classique soumise à la loi de 1989 — c'est un contrat commercial entre toi et l'hôte, régi par les CGU d'Airbnb et le Code civil. Concrètement : (1) Ton 'proprio' (l'hôte Airbnb) est responsable de la mise à disposition d'un logement en bon état, donc il doit fournir l'eau chaude. (2) Pour les réparations, c'est encadré par le contrat Airbnb, pas par le décret 1987. Première étape : tu contactes l'hôte via la messagerie Airbnb (TOUJOURS via la plateforme, jamais directement, pour avoir la trace). Tu lui demandes d'intervenir sous 24h. S'il ne répond pas, tu signales le problème à Airbnb support qui peut soit forcer l'hôte, soit te reloger, soit te rembourser au prorata. Si l'hôte t'envoie son plombier perso, vérifie qu'il est sérieux (pas une plateforme arnaque). Si tu dois intervenir toi-même en urgence (dégât imminent), appelle Joël (01 41 69 10 08), garde la facture, et demande remboursement à l'hôte via Airbnb après coup.",
    },
    {
      question:
        "Joël a quoi de plus que les autres ? Sincèrement ?",
      answer:
        "Sincèrement (et je suis pas payée pour ça, j'ai juste testé six fois) : le truc qui change tout c'est le prix annoncé AVANT et tenu APRÈS. Tu sais combien tu vas payer en raccrochant le téléphone. Pas une fourchette, pas un 'ça dépend', un chiffre. Et c'est ce chiffre qui apparaît sur la facture. Plus la disponibilité 24h/24 sans majoration nuit/week-end/jours fériés, ce qui veut dire que tu paies pareil un mardi 11h ou un dimanche 23h. Plus les artisans certifiés (pas des sous-traitants random d'une plateforme). Plus les factures détaillées avec mention de la cause de la panne (vital pour les locataires en conflit avec leur proprio). Plus, je l'ai constaté plusieurs fois, des artisans qui prennent 5 min pour t'expliquer comment éviter que ça se reproduise. C'est pas du marketing, c'est du métier fait sérieusement. Dans un secteur (l'urgence plomberie parisienne) où 60% des prestataires sont au mieux médiocres et au pire des escrocs, c'est précieux.",
    },
  ],
  temoignages: [
    {
      auteur: "Léa M.",
      quartierOuRue: "rue Lepic (Abbesses)",
      date: "2026-03-14",
      rating: 5,
      serviceRendered: "Débouchage WC",
      texte:
        "WC bouché un samedi soir vers 22h, moi en mode panique parce que je recevais ma mère le lendemain matin (elle vit en province, vient à Paris une fois par an). J'avais sauvegardé le numéro depuis le blog de Camille (merci !). Plombier sur place en 28 min. Annoncé 79€ TTC au téléphone, facturé 79€ TTC. Le mec a regardé mon mécanisme, m'a expliqué qu'il fallait remplacer le flotteur dans 2-3 mois pour éviter une nouvelle galère, m'a dit comment faire. Bref, j'ai pu accueillir ma mère le lendemain dans un appart fonctionnel et elle ne s'est aperçue de rien. Studette mansardée rue Lepic, six étages sans ascenseur, le mec a monté tout son matos sans broncher.",
    },
    {
      auteur: "Hugo D.",
      quartierOuRue: "rue Marx-Dormoy (La Chapelle)",
      date: "2026-02-08",
      rating: 5,
      serviceRendered: "Fuite sous évier",
      texte:
        "Locataire d'un T1 années 70 vers Marx-Dormoy, j'ai découvert une fuite sous l'évier en allant chercher mon aspirateur — placard pourri, eau partout, ça suintait depuis sans doute des semaines. J'ai appelé un dimanche matin à 9h, intervention sous 35 min. Diagnostic en 2 minutes : raccord d'eau chaude qui avait cédé, joint en fin de vie. Réparation 89€ TTC comme annoncé. Le plombier a écrit sur la facture 'défaillance joint d'origine, vétusté' — j'ai envoyé la facture à mon proprio qui m'a remboursé sans broncher (alors qu'il aurait pu chipoter). Sans cette mention écrite je crois pas qu'il aurait payé. Bonus : le mec m'a montré comment couper l'eau au cas où ça revient.",
    },
    {
      auteur: "Inès T.",
      quartierOuRue: "rue du Poteau (Jules-Joffrin)",
      date: "2026-01-27",
      rating: 5,
      serviceRendered: "Recherche de fuite",
      texte:
        "Étudiante en pharma (Pasteur), je loue une chambre meublée chez l'habitant rue du Poteau. Trace d'humidité au plafond de la salle de bain qui s'agrandissait depuis 3 semaines. Ma proprio (qui vit dans le même appart) ne savait pas quoi faire. J'ai proposé qu'on appelle Joël, elle a accepté. Recherche fuite 149€ TTC, caméra thermique, le plombier a localisé la fuite en 40 min sans rien casser : c'était une infiltration depuis l'appart du dessus (canalisation d'eau chaude). Rapport écrit fourni le jour même, on a pu déclarer le sinistre à l'assurance de la copro avec un dossier béton. Sans le rapport caméra je sais pas comment on aurait prouvé l'origine. Très pro, très posé.",
    },
    {
      auteur: "Maxime R.",
      quartierOuRue: "rue Caulaincourt (Lamarck)",
      date: "2025-12-19",
      rating: 5,
      serviceRendered: "Chauffe-eau en panne",
      texte:
        "Réveil un mardi matin, douche glacée, panique parce que je commençais un nouveau taf le jeudi et il me fallait absolument une douche chaude pour la veille. T1 mansardé rue Caulaincourt, chauffe-eau électrique 50L vieux de 9 ans. Diagnostic Joël à 109€ TTC : résistance HS, à remplacer. Devis fixe pour le remplacement complet (résistance + main d'œuvre + déplacement) 187€ TTC, annoncés avant. Intervention dans la foulée le mardi après-midi. Eau chaude rétablie le soir. Mon proprio (Bordeaux) a remboursé sans discuter en voyant la facture détaillée. C'est ma première année à Paris, je découvrais comment ça marche, j'avais peur de me faire avoir, c'était nickel.",
    },
    {
      auteur: "Fatou C.",
      quartierOuRue: "rue Custine (Jules-Joffrin)",
      date: "2026-04-02",
      rating: 5,
      serviceRendered: "Débouchage canalisation cuisine",
      texte:
        "Locataire d'un T2 partagé en colloc, deux étudiantes, on cuisine beaucoup. L'évier s'est mis à se vider en une demi-heure. On a essayé bicarbonate / vinaigre / eau bouillante (merci les conseils du blog !) pendant deux jours, ça a pas marché. Appel Joël, intervention en 25 min un samedi après-midi. Le mec a sorti son furet électrique, débouchage propre en 15 min. 99€ TTC comme annoncé. Il nous a expliqué qu'on avait laissé trop de gras de cuisson partir dans l'évier (oups), nous a montré comment éviter, on a acheté une grille filtre dans la foulée. Recommandé à toutes mes copines de la colloc.",
    },
    {
      auteur: "Karim B.",
      quartierOuRue: "rue Ramey (Lamarck)",
      date: "2026-03-25",
      rating: 5,
      serviceRendered: "Fuite WC",
      texte:
        "Jeune actif, premier appart à moi (en location) à 27 ans, T1 rénové rue Ramey. Bruit d'écoulement permanent dans les WC qui me rendait fou la nuit. J'ai laissé traîner trois semaines avant d'appeler (mauvaise idée, ma facture d'eau a explosé). Joël intervention le jeudi soir vers 19h30 (pas de majoration, pareil qu'en journée). Diagnostic immédiat : mécanisme de chasse défectueux, flotteur en fin de vie, eau qui s'écoulait en continu vers la cuvette. Réparation 79€ TTC pièce et main d'œuvre. Le mec m'a expliqué que ce mécanisme aurait dû être changé par le proprio à l'état des lieux (c'était un mécanisme de 12 ans), donc j'ai pu envoyer la facture à mon proprio avec mention 'vétusté manifeste' — remboursé sous 10 jours. Honnêtement, sans ce guide, j'aurais probablement payé moi-même.",
    },
  ],
  internalLinks: [
    {
      url: "/plomberie",
      anchor: "tous nos services plomberie",
      contexte: "panorama complet des interventions disponibles à Paris et en Île-de-France",
    },
    {
      url: "/plomberie/tarifs",
      anchor: "grille tarifaire plomberie complète",
      contexte: "tous les prix Joël annoncés noir sur blanc, à vérifier avant tout appel",
    },
    {
      url: "/plombier/fuite-eau",
      anchor: "intervention fuite d'eau",
      contexte: "guide spécifique pour toute fuite, du robinet qui pisse au tuyau qui pète",
    },
    {
      url: "/plombier/wc-bouches",
      anchor: "débouchage WC en urgence",
      contexte: "le grand classique du dimanche soir, gestion étape par étape",
    },
    {
      url: "/plombier/recherche-fuite",
      anchor: "recherche de fuite invisible",
      contexte: "caméra thermique, gaz traceur, rapport pour ton assurance",
    },
    {
      url: "/plombier/chauffe-eau-panne",
      anchor: "chauffe-eau qui rend l'âme",
      contexte: "le drame de la douche froide à 7h du matin, diagnostic et solutions",
    },
    {
      url: "/plombier/debouchage-canalisation",
      anchor: "débouchage canalisation",
      contexte: "évier, douche, lavabo : techniques pro sans produit chimique",
    },
    {
      url: "/blog/arnaques-plomberie-comment-eviter",
      anchor: "guide anti-arnaque plomberie",
      contexte: "le mécanisme exact des arnaques '39€' et comment ne jamais tomber dedans",
    },
    {
      url: "/blog/fuite-eau-nuit-que-faire",
      anchor: "fuite d'eau la nuit, que faire",
      contexte: "le mode d'emploi pour gérer une fuite à 3h du mat sans paniquer",
    },
    {
      url: "/blog/prix-intervention-plombier-urgence",
      anchor: "vrais prix d'une intervention urgence plombier",
      contexte: "comparatif détaillé des prix marché vs prix arnaque dans Paris",
    },
    {
      url: "/stop-arnaques",
      anchor: "notre engagement anti-arnaque",
      contexte: "tout ce qu'on fait pour casser les pratiques abusives du secteur",
    },
    {
      url: "/contact",
      anchor: "nous contacter",
      contexte: "le 01 41 69 10 08 ou un message en ligne, on répond rapide",
    },
  ],
  tags: [
    "paris-18",
    "plombier",
    "locataire",
    "etudiant",
    "studette",
    "montmartre",
    "abbesses",
    "lamarck",
    "goutte-dor",
    "jules-joffrin",
    "marx-dormoy",
    "urgence-24h",
    "anti-arnaque",
    "vrais-prix",
    "camille-roussel",
  ],
};
