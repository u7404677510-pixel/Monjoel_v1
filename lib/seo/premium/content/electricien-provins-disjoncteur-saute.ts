import type { PremiumPageContent } from "../types";

export const content: PremiumPageContent = {
  trade: "electricien",
  citySlug: "provins",
  serviceSlug: "disjoncteur-saute",
  authorPersona: "camille-roussel",
  publishedAt: "2026-06-09",
  updatedAt: "2026-06-09",
  metaTitle: "Disjoncteur qui saute à Provins ? Dépannage 79€, 24h/24",
  metaDescription:
    "Disjoncteur qui saute à Provins (ville haute, Val, Champbenoist) : causes, réflexes et dépannage dès 79€ TTC, 0 majoration nuit & week-end. 01 41 69 10 08.",
  h1: "Disjoncteur qui saute à Provins : des pans de bois de la ville haute aux barres de Champbenoist, le mode d'emploi anti-panique",
  introParagraph: `### La fois où une cité médiévale m'a laissée dans le noir

Perso, ma relation avec Provins a commencé en master 1, quand mon atelier de projet à l'ENSA nous a envoyés faire un relevé de maisons à pans de bois dans la ville haute. Trois jours sur place, un appart loué dans le Val, un mois de février glacial. Le deuxième soir : bouilloire + radiateur soufflant + sèche-cheveux. Clac. Noir total. Moi, debout dans une cuisine que je connaissais depuis 48 heures, à chercher un tableau électrique planqué derrière un manteau, avec pour seul éclairage la lampe de mon téléphone à 12%.

C'est ce soir-là que j'ai compris un truc : un disjoncteur qui saute, ce n'est presque jamais grave. Mais ne pas savoir QUOI faire dans les cinq minutes qui suivent, ça, c'est la vraie galère.

### Pourquoi cette page parle de Provins, précisément

Parce que Provins n'est pas une ville comme les autres côté électricité. Une cité inscrite au patrimoine mondial de l'UNESCO depuis décembre 2001, environ **11 800 habitants** au recensement INSEE 2022, et un parc de logements où **près d'un quart des logements date d'avant 1946** (données INSEE 2022, consultées en 2026). Traduction : des installations électriques qui ont été greffées, des décennies après, sur des murs qui n'avaient jamais été pensés pour ça. Quand ça disjoncte ici, ça ne disjoncte pas pour les mêmes raisons qu'à Marne-la-Vallée.

### Ce que tu vas trouver ici

Le test des deux minutes pour savoir ce qui a sauté (et le réarmer sans danger), les cinq coupables classiques version provinoise, les signaux qui imposent un pro, le vrai prix d'un dépannage — **dès 79€ TTC, prix fixe annoncé avant intervention, 0 majoration nuit & week-end, au 01 41 69 10 08** — et le guide qui-paie-quoi quand on est locataire. Avec, promis, au moins une anecdote gênante me concernant.`,
  sections: [
    {
      anchor: "bati-provins-grand-ecart-electrique",
      title: "Provins, le grand écart : une seule ville, quatre mondes électriques",
      body: `Avant de parler disjoncteur, il faut comprendre dans quoi il est branché. Et à Provins, honnêtement, c'est un cas d'école — au sens propre, puisque c'est littéralement ce qu'on étudie en cours d'archi.

**Monde n°1 : la ville haute, le Châtel.** Le cœur médiéval, celui des cartes postales : la tour César, la place du Châtel, les remparts du XIIIe siècle et leurs tours, les maisons à pans de bois. L'UNESCO a inscrit « Provins, ville de foire médiévale » au patrimoine mondial en décembre 2001, et la ville aligne 58 monuments historiques classés ou inscrits (source : Provins Tourisme / UNESCO). Côté électricité, ça veut dire des installations posées en surface ou glissées dans des cloisons en torchis et en plâtre, des murs d'un mètre d'épaisseur impossibles à saigner, des tableaux ajoutés là où on pouvait, et des circuits qui ont parfois cinquante ans de rallonges successives. Quand j'ai fait mon relevé, j'ai vu une gaine électrique qui longeait une poutre du XVIe siècle. Le choc des civilisations, version domestique.

**Monde n°2 : la ville basse, le Val.** En contrebas, l'ancien quartier des artisans et des foires, traversé par la Voulzie et le Durteint, ces deux petites rivières qui font le charme du quartier… et l'humidité de ses caves. Ici, on trouve les commerces, la rue de la Cordonnerie, le boulevard d'Aligre, et un bâti ancien dense où les rez-de-chaussée et les sous-sols vivent avec un taux d'humidité que n'importe quel différentiel surveille d'un œil noir. Retiens ce mot, « différentiel » : dans le Val, c'est souvent lui le héros (ou l'emmerdeur) de l'histoire.

**Monde n°3 : Champbenoist.** À l'opposé du décor médiéval, le grand ensemble construit dans les années 1960-1970, typique de cette période : barres et tours, logements traversants, et des installations électriques conçues pour les usages de l'époque — une télé, un frigo, point. Selon l'INSEE (recensement 2022), environ un tiers du parc provinois a été construit entre 1946 et 1970 : Champbenoist en est le gros morceau. Ces logements ont souvent été rafraîchis, parfois remis à niveau, mais le dimensionnement d'origine des circuits, lui, n'a pas toujours suivi l'arrivée du sèche-linge, de la plaque à induction et du chauffage d'appoint.

**Monde n°4 : le pavillonnaire et le quartier de la gare.** Autour de la gare de Provins — terminus de la ligne P du Transilien, à environ 1h25 de Paris-Est — et le long des sorties vers Sourdun ou Chalautre, des rues entières de pavillons des années 1930 aux années 1990. C'est le monde le plus « normal » électriquement, mais aussi celui où on trouve les bricolages maison les plus créatifs (le multiprise-qui-alimente-le-garage-via-la-fenêtre, grand classique).

Pourquoi je te raconte tout ça ? Parce que la cause probable de TON disjoncteur qui saute dépend énormément de ton monde. Surcharge dans un T3 de Champbenoist, humidité dans une cave du Val, circuit antique dans la ville haute : même symptôme, trois histoires différentes. Et un bon électricien — un vrai — commence toujours par te demander où tu habites et de quand date ton logement. Si celui que tu as au téléphone ne pose aucune question, c'est déjà un indice.`,
    },
    {
      anchor: "test-deux-minutes-disjoncteur-provins",
      title: "Le test des deux minutes : identifier ce qui a sauté (et réarmer sans se mettre en danger)",
      body: `Retour à ma cuisine plongée dans le noir. Ce que j'aurais aimé qu'on m'explique AVANT, le voilà, dans l'ordre exact.

**Étape 1 : trouve ton tableau, et regarde ce qui est baissé.** Le tableau électrique, c'est cette rangée (ou ces rangées) de petites manettes, souvent dans l'entrée, le cellier, ou — spécialité bâti ancien provinois — dans un placard improbable, derrière les manteaux, parfois carrément dans la cage d'escalier. Éclaire-toi au téléphone, et observe. Trois cas possibles :

- **Une seule petite manette est baissée** : c'est un disjoncteur divisionnaire. Un seul circuit a sauté (les prises de la cuisine, par exemple). Bonne nouvelle, c'est le scénario le plus simple.
- **Une manette plus large, marquée 30 mA ou avec un bouton « test », est baissée** : c'est l'interrupteur différentiel. Lui ne surveille pas la surcharge mais les fuites de courant vers la terre. S'il saute, le problème est souvent un appareil défectueux ou de l'humidité. Dans le Val, avec les caves au bord de la Voulzie, c'est un grand classique des lendemains de pluie.
- **Tout est en haut sur ton tableau, mais tu n'as quand même plus de courant** : regarde le disjoncteur général (souvent un gros boîtier séparé, parfois près du compteur). S'il est baissé, c'est toute l'installation qui a déclenché. Et s'il est EN HAUT et que tu n'as toujours rien… le problème est peut-être chez Enedis, pas chez toi — jette un œil dans la rue, si tes voisins de la place Honoré-de-Balzac sont aussi dans le noir, ce n'est pas ton tableau.

**Étape 2 : débranche avant de réarmer.** C'est LE réflexe que tout le monde zappe. Avant de remonter la manette, débranche ou éteins ce qui était en route au moment du clac : bouilloire, radiateur soufflant, fer, lave-linge. Si tu réarmes sans rien débrancher et que la cause est toujours là, ça ressaute immédiatement — et à force, tu fatigues le mécanisme pour rien.

**Étape 3 : réarme, une fois, mains sèches.** On remonte la manette d'un geste franc. Deux règles de sécurité non négociables : mains sèches, et pas pieds nus sur un sol humide (les rez-de-chaussée du Val, encore eux). Si ça tient : victoire, rebranche tes appareils UN PAR UN, à quelques minutes d'intervalle, pour démasquer le coupable. Si ça ressaute instantanément alors que tout est débranché : stop. Là, on ne insiste pas, on passe à la section « quand appeler un pro ».

**Étape 4 : note ce qui s'est passé.** Déformation de blogueuse, mais crois-moi : trente secondes de notes (quelle manette, quels appareils branchés, quelle heure, quelle météo) font gagner un temps fou à l'électricien — et t'évitent de payer du temps de diagnostic pour des infos que tu avais. Une photo du tableau avec la manette baissée, c'est encore mieux. C'est devenu mon réflexe numéro un, toutes galères confondues.

Deux minutes chrono, vraiment. Et dans la grande majorité des cas, tu viens de régler ton problème toute seule, gratuitement. Pour les autres cas, lis la suite.`,
    },
    {
      anchor: "cinq-coupables-disjoncteur-provins",
      title: "Les cinq coupables provinois (du plus banal au plus sérieux)",
      body: `Après trois appartements, deux collocs et un nombre de pannes dont je ne suis pas fière, j'ai fini par comprendre que les disjoncteurs ne sautent jamais « par hasard ». Voici le casting, adapté à la réalité locale.

**Coupable n°1 : la surcharge, alias « l'hiver provinois ».** Le scénario de ma soirée de février. Un circuit de prises est calibré pour une certaine puissance ; tu branches trop de choses dessus en même temps, le disjoncteur fait son travail et coupe. À Provins, le facteur aggravant s'appelle chauffage d'appoint : dans les logements anciens de la ville haute et du Val — souvent classés passoires côté isolation, murs anciens obligent — beaucoup d'habitants ajoutent un radiateur soufflant ou un bain d'huile l'hiver. 2 000 watts d'un coup sur un circuit des années 70 qui alimente déjà le frigo et le micro-ondes, et clac. Ce n'est pas dangereux en soi (la protection a justement fonctionné), mais si ça arrive chaque soir, ton installation te dit clairement qu'elle n'est plus dimensionnée pour ta vie. La vraie solution n'est pas de réarmer en boucle : c'est un circuit dédié ou une remise à niveau.

**Coupable n°2 : l'appareil défectueux.** La bouilloire en fin de vie, le grille-pain hérité de la coloc précédente, le lave-linge qui fuit du courant. Le test maison : tout débrancher, réarmer, rebrancher un par un. Celui qui fait tout sauter est démasqué. C'est l'enquête la plus satisfaisante du monde domestique, et elle ne coûte rien.

**Coupable n°3 : le court-circuit.** Phase et neutre qui se touchent : déclenchement instantané, parfois avec une petite étincelle ou une odeur âcre. Causes typiques : une prise fatiguée, un luminaire mal raccordé, un câble écrasé par un meuble, une souris gourmande (véridique, dans les combles d'une maison ancienne, ça arrive). Signe distinctif : ça saute À LA SECONDE où tu allumes ou branches quelque chose de précis. Là, on arrête de tester et on isole le circuit en question jusqu'au passage d'un pro.

**Coupable n°4 : l'humidité et les fuites à la terre.** Le coupable préféré du Val et des rez-de-chaussée proches de la Voulzie et du Durteint. L'humidité s'infiltre dans une prise extérieure, une cave, une applique de salle de bain, et le différentiel 30 mA déclenche — c'est exactement son rôle, il détecte le courant qui s'échappe vers la terre au lieu de rester dans le circuit. Indice qui ne trompe pas : ça saute par temps de pluie, ou quelques heures après. Ne le vis pas comme une trahison de ton installation : ce différentiel t'évite très concrètement l'électrisation.

**Coupable n°5 : le tableau vétuste.** Le plus sérieux. Fusibles à cartouches ou porcelaine, absence de différentiel 30 mA, dominos apparents, traces de chauffe : le portrait-robot d'une installation en fin de course. Et ce n'est pas une rareté : selon le baromètre 2024 de l'Observatoire national de la sécurité électrique (ONSE), **83% des logements de plus de 15 ans présentent au moins une anomalie électrique**, et 46% comportent des matériels vétustes ou inadaptés. Dans une ville où un quart du parc date d'avant 1946 (INSEE 2022), Provins coche méthodiquement toutes les cases. Le même baromètre ONSE rappelle qu'entre 20 et 35% des incendies d'habitation sont d'origine électrique : c'est LA statistique qui m'a fait arrêter de considérer un vieux tableau comme un détail vintage.

Moralité : surcharge et appareil défectueux, tu peux gérer. Court-circuit, humidité récurrente, tableau antique : c'est un métier. Et ce métier a un prix honnête — on y vient.`,
    },
    {
      anchor: "quand-appeler-electricien-provins",
      title: "Les signaux rouges : quand on pose le tournevis et qu'on prend le téléphone",
      body: `Je suis la première à défendre la débrouille. Mais l'électricité est l'un des deux domaines (avec le gaz) où je ne négocie jamais avec mes limites — un dégât des eaux abîme ton parquet, un défaut électrique peut abîmer beaucoup plus. Le baromètre ONSE 2024 recense environ 3 000 passages aux urgences par an pour électrisation en France. Voici ma liste de signaux rouges, ceux qui veulent dire « pro, maintenant ».

**Signal 1 : le disjoncteur ressaute immédiatement, tout débranché.** Si tu as fait le test des deux minutes proprement — tout débranché, réarmement franc — et que ça retombe dans la seconde, le défaut est dans l'installation elle-même : un câble, une boîte de dérivation, une prise. Tu ne le trouveras pas sans instruments de mesure, et chercher à tâtons, c'est s'exposer.

**Signal 2 : une odeur de brûlé, des traces noires, un plastique déformé.** Autour d'une prise, d'un interrupteur, ou au tableau. Ça, c'est un échauffement, et un échauffement électrique ne se calme jamais tout seul — il attend juste le bon moment. On coupe le disjoncteur général, on ne réarme PAS, et on appelle. C'est le seul scénario de cette page où je te dis : ne dors pas avec le doute.

**Signal 3 : des picotements en touchant un appareil ou un robinet.** Même légers, même « ça doit être l'électricité statique ». Non. Une sensation de courant au contact d'une masse métallique signale un défaut de terre, et c'est précisément le mécanisme des accidents domestiques graves. Différentiel ou pas, intervention rapide.

**Signal 4 : le disjoncteur saute en boucle depuis des semaines, « mais ça va, on a l'habitude ».** Le syndrome que je croise le plus souvent chez mes abonnés. On s'adapte : on évite de lancer le four et le lave-linge ensemble, on réarme deux fois par soirée, on vit avec. Sauf qu'un disjoncteur n'est pas un interrupteur : chaque déclenchement est un message. Une installation qui crie une fois par jour finit par chuchoter un jour de trop. Le diagnostic coûte moins cher que l'habitude.

**Signal 5 : ton tableau a des fusibles en porcelaine ou aucune manette marquée 30 mA.** Pas besoin de panne pour celui-là. Si ton tableau ressemble à une pièce de musée — et dans certains logements de la ville haute, il pourrait presque être inscrit à l'inventaire — fais-le regarder, même hors urgence. Surtout si tu es locataire : ça documente la situation (j'explique qui paie plus bas, et la réponse va peut-être te plaire).

**Signal 6 : tu pars travailler, les enfants rentrent avant toi, et le chauffage est sur ce circuit.** Le signal le moins technique et le plus réel. Quand l'enjeu n'est plus le confort mais l'organisation de ta journée — un congélateur plein, du télétravail, une chaudière pilotée électriquement — attendre samedi pour « voir avec un copain qui s'y connaît » coûte plus cher que les 79€ du dépannage. À Provins, où pas mal d'habitants font le trajet quotidien en ligne P vers Paris, le créneau du soir et du week-end n'est de toute façon pas un problème : zéro majoration, on en parle juste après.

Aucun de ces signaux n'est une raison de paniquer. Tous sont une raison d'arrêter de bricoler.`,
    },
    {
      anchor: "joel-provins-79-euros-prix-fixe",
      title: "79€ TTC, annoncé avant, à 3h du matin comme un mardi midi : le fonctionnement Joël à Provins",
      body: `Parlons argent, parce que c'est la vraie source d'angoisse — pas la panne. Quand mon disjoncteur a rendu l'âme dans ma première coloc, je n'avais pas peur du noir : j'avais peur du chiffre qu'on allait m'annoncer une fois le gars sur place. C'est exactement ce que le système Joël élimine.

**Le principe, en une phrase : le prix est fixé et annoncé AVANT que l'artisan parte de chez lui.** Tu appelles le **01 41 69 10 08**, tu décris la panne (disjoncteur qui saute, ce qui était branché, ton type de logement — tu vois, les notes de l'étape 4 servent déjà), et on te donne le tarif. Ce tarif-là est celui de la facture. Pas de « finalement c'est plus compliqué », pas de supplément découvert au moment de sortir la carte bleue.

Concrètement, pour un disjoncteur qui saute à Provins :

- **Dépannage disjoncteur qui saute** (identification du circuit, recherche de la cause, remise en service) : **dès 79€ TTC**, déplacement et diagnostic compris.
- **Recherche de court-circuit** circuit par circuit, avec instruments de mesure : **dès 99€ TTC**.
- **Panne électrique générale** (plus rien ne fonctionne, diagnostic complet + mise en sécurité) : **dès 89€ TTC**.
- **Tableau vétuste** : mise en sécurité et devis détaillé pour remplacement, **dès 129€ TTC** — devis écrit, à tête reposée, jamais de remplacement imposé dans l'urgence.

**Le deuxième pilier, et c'est celui qui change tout à Provins : 0 majoration nuit, week-end et jours fériés.** Le 79€ de 15h reste le 79€ de 23h45 un samedi. Pourquoi j'insiste ? Parce que la majoration nocturne est LE levier classique du dépannage abusif : le même geste technique facturé deux ou trois fois plus parce qu'il fait nuit. Quand une enseigne t'annonce « tarif majoré de 50% après 20h », pose-toi la question : le court-circuit, lui, n'a pas regardé sa montre.

**Et les délais, dans une ville à 80 km de Paris ?** Question légitime — Provins n'est pas Montrouge, et je me méfie des promesses du type « chez vous en 20 minutes » faites à une ville que l'opérateur situe vaguement « vers l'est ». Le réseau Joël fonctionne avec des artisans répartis sur la Seine-et-Marne, pas avec un camion qui partirait de Paris par la N19 à chaque appel. Lors de la prise d'appel, on t'annonce un créneau réaliste en fonction de l'artisan disponible le plus proche du Provinois — et ce créneau t'est confirmé, pas jeté en l'air pour décrocher la mission. Si tu peux sécuriser en attendant (disjoncteur général coupé en cas de doute, congélateur fermé, multiprises débranchées), on te le dit au téléphone, gratuitement.

**Dernier détail qui n'en est pas un : la facture.** Détaillée, avec SIRET, TVA, nature exacte de la prestation et cause identifiée de la panne. Si tu es locataire, ce document est de l'or : c'est lui qui établit si la panne relève de l'entretien courant (toi) ou de la vétusté (ton propriétaire). Un dépanneur qui rechigne à écrire ce qu'il a fait, c'est un dépanneur qui sait que ce qu'il a fait ne vaut pas ce qu'il a facturé.`,
    },
    {
      anchor: "anti-arnaque-qui-paie-provins",
      title: "Arnaques au dépannage et partie de ping-pong locataire/proprio : le guide de survie",
      body: `Deux sujets pour finir, et pas les moindres : comment ne pas se faire plumer, et qui doit payer. Spoiler : les deux sont liés.

**Le piège du tarif d'appel.** « Électricien Provins dès 39€ » en haut des résultats de recherche : retiens que ce chiffre est un appât, pas un prix. Le mécanisme, documenté depuis des années par la DGCCRF et les associations de consommateurs : tarif d'appel dérisoire, technicien qui « découvre » sur place une situation dramatique, devis verbal sous pression, facture finale à 350, 500, parfois 900€. Les villes moyennes comme Provins sont des cibles confortables : moins de concurrence locale qu'à Paris, des habitants qui n'ont pas trois électriciens dans leur répertoire, et un bâti ancien qui rend crédible n'importe quel diagnostic alarmiste. « Madame, avec une installation pareille, vous risquez l'incendie cette nuit » : phrase entendue par une lectrice de mon blog, pour une simple prise à remplacer.

**Tes trois boucliers légaux, à connaître par cœur :**

1. **Le devis écrit préalable est obligatoire** pour les prestations de dépannage à domicile au-delà de 150€ (arrêté du 24 janvier 2017). Pas de devis = pas de travaux. Quelqu'un qui commence à démonter ton tableau sans rien t'avoir fait signer est déjà hors des clous.
2. **La fausse urgence ne supprime pas tes droits.** Pour un contrat conclu à domicile, tu disposes en principe d'un délai de rétractation de 14 jours. Les dépanneurs véreux font signer une mention de renonciation en jouant sur la panique — lis ce que tu signes, même à 23h, même en pyjama.
3. **Les recours existent et fonctionnent** : signalement sur signal.conso.gouv.fr (DGCCRF), dossier auprès d'une association de consommateurs, et chargeback bancaire si paiement par carte. Garde tout : devis, facture, photos du tableau avant/après, échanges de messages.

Mon réflexe bonus, qui ne coûte rien : vérifier le SIRET de l'entreprise sur sirene.fr pendant que le technicien est en route. Trente secondes, et tu sais si tu as affaire à une entreprise réelle ou à une coquille créée il y a quatre mois.

**Maintenant, le ping-pong locataire/propriétaire.** Le sujet préféré de mon blog, et la question qu'on me pose à chaque panne. La règle est plus simple qu'on ne le croit :

- **À ta charge (locataire)** : l'entretien courant et les menues réparations — remplacer une ampoule, un fusible, réarmer un disjoncteur, changer un cache de prise abîmé par ton meuble. En gros : ce qui s'use par l'usage.
- **À la charge du propriétaire** : la vétusté et la mise en conformité — un tableau d'un autre âge, des circuits sous-dimensionnés d'origine, l'absence de différentiel 30 mA, des prises qui chauffent sans que tu n'y sois pour rien. Le logement loué doit être décent, et une installation électrique dangereuse ne l'est pas.
- **La zone grise** : le disjoncteur qui saute. Si c'est TON radiateur soufflant qui surcharge le circuit, c'est ton usage. Si le circuit saute parce qu'il est d'origine 1965 et que le moindre équipement moderne le dépasse, c'est la vétusté. D'où l'importance capitale de la facture qui précise la CAUSE : c'est elle qui tranche le match. À Champbenoist comme dans le Val, j'ai vu des locataires se faire rembourser intégralement un dépannage sur présentation d'une facture mentionnant « installation vétuste, non conforme aux exigences actuelles de la NF C 15-100 ».

Mon mode d'emploi : tu documentes (photos, notes), tu préviens ton propriétaire par écrit dès la première panne récurrente, tu fais intervenir un pro qui détaille sa facture, et tu transmets. Pas de conflit, pas de drama : des pièces. C'est la méthode la plus efficace que j'aie testée en six ans de location — et crois-moi, j'ai testé des méthodes nettement moins efficaces d'abord.`,
    },
  ],
  vraisPrix: [
    {
      service: "Dépannage disjoncteur qui saute (recherche de cause + remise en service)",
      prixJoel: 79,
      prixArnaqueur: "39€ annoncé → 350-600€ facturé",
      pourquoi:
        "Identifier le circuit en défaut, isoler la cause (surcharge, appareil, connexion) et remettre l'installation en service prend 30 à 60 minutes à un électricien équipé. Joël annonce dès 79€ TTC tout compris à Provins — ville haute, Val, Champbenoist, quartier gare — et ce prix est fixé au téléphone, avant le départ de l'artisan. Le « 39€ » des annonces sponsorisées ne couvre que le déplacement : la facture réelle se décide ensuite, sur place, sous pression.",
    },
    {
      service: "Recherche de court-circuit circuit par circuit",
      prixJoel: 99,
      prixArnaqueur: "49€ annoncé → 450-900€ facturé",
      pourquoi:
        "Un court-circuit se localise méthodiquement, au multimètre, circuit par circuit, jusqu'à la prise ou la boîte de dérivation en cause. Joël facture dès 99€ TTC l'intervention complète avec identification précise de l'origine. Les opérateurs douteux gonflent la note en facturant chaque test comme une prestation distincte, ou en transformant un câble à reprendre en « réfection complète urgente ».",
    },
    {
      service: "Panne électrique générale (diagnostic complet + mise en sécurité)",
      prixJoel: 89,
      prixArnaqueur: "29€ annoncé → 400-800€ facturé",
      pourquoi:
        "Quand plus rien ne fonctionne et que le général ne tient pas réarmé, il faut un diagnostic complet de l'installation et une mise en sécurité dans les règles. Joël intervient dès 89€ TTC, déplacement et diagnostic inclus, avec un rapport sur la cause — précieux pour un locataire ou pour l'assurance. Méfie-toi des diagnostics « gratuits » qui se rattrapent sur des travaux inventés.",
    },
    {
      service: "Tableau vétuste : mise en sécurité + devis de remplacement détaillé",
      prixJoel: 129,
      prixArnaqueur: "« devis offert » → 2 500-4 500€ facturés sous pression",
      pourquoi:
        "Un tableau à fusibles porcelaine sans différentiel 30 mA — fréquent dans le bâti provinois d'avant 1946 — mérite une mise en sécurité immédiate puis un devis écrit, chiffré poste par poste, à étudier à tête reposée. Joël facture dès 129€ TTC cette étape, sans jamais imposer un remplacement complet « cette nuit sinon vous risquez tout » : cette phrase est un signal d'arnaque, pas un diagnostic.",
    },
    {
      service: "Dépannage disjoncteur la nuit, le dimanche ou un jour férié à Provins",
      prixJoel: 79,
      prixArnaqueur: "59€ annoncé → 380-950€ facturé (majoration « urgence nocturne »)",
      pourquoi:
        "Les pannes choisissent rarement les heures ouvrées — surtout l'hiver, quand les chauffages d'appoint tournent en soirée. Le tarif Joël est strictement identique 24h/24 et 7j/7 : dès 79€ TTC un dimanche soir comme un mardi après-midi, zéro majoration nuit, week-end ou férié. La « majoration d'urgence » qui double ou triple la note est le levier le plus rentable du dépannage abusif : il n'existe pas chez Joël, par principe.",
    },
  ],
  faqLocale: [
    {
      question:
        "J'habite une maison à pans de bois de la ville haute et le disjoncteur saute dès que j'allume deux radiateurs : c'est grave ?",
      answer:
        "Grave, non ; révélateur, oui. Les maisons anciennes du Châtel ont des installations greffées sur un bâti qui n'a jamais été conçu pour l'électrique : circuits peu nombreux, sections de câbles modestes, peu de prises par pièce. Deux radiateurs de 1 500-2 000 W sur le même circuit dépassent simplement sa capacité, et le disjoncteur fait son travail. La solution durable est un circuit dédié au chauffage, pas le réarmement quotidien. Joël diagnostique dès 79€ TTC, prix annoncé avant, au 01 41 69 10 08.",
    },
    {
      question:
        "Mon appartement à Champbenoist disjoncte quand le sèche-linge tourne : c'est à moi de payer ou au bailleur ?",
      answer:
        "Ça dépend de la cause, et c'est la facture détaillée qui tranche. Si le circuit est sain mais que tu cumules sèche-linge + plaques + four sur la même ligne, c'est ton usage : à ta charge. Si le circuit d'origine des années 1960-1970 est sous-dimensionné pour un équipement moderne ordinaire, c'est de la vétusté : la remise à niveau revient au bailleur. Demande à l'électricien de noter la cause précise sur la facture — Joël le fait systématiquement — et transmets-la par écrit à ton bailleur ou ton gestionnaire.",
    },
    {
      question:
        "Tout mon immeuble du Val est dans le noir : j'appelle un électricien ou Enedis ?",
      answer:
        "Premier réflexe : regarde par la fenêtre. Si les voisins, les commerces de la rue de la Cordonnerie ou l'éclairage public sont aussi éteints, c'est une coupure réseau : c'est Enedis (numéro dépannage indiqué sur ta facture d'électricité), et aucun électricien privé n'y peut rien. Si toi seule es dans le noir et que ton disjoncteur général est baissé ou ne tient pas réarmé, là c'est ton installation : Joël intervient dès 89€ TTC pour une panne générale, diagnostic et mise en sécurité compris.",
    },
    {
      question:
        "Provins est à 1h25 de Paris en ligne P : un dépanneur sans majoration la nuit, c'est réaliste ici ?",
      answer:
        "Oui, parce que le réseau Joël ne fait pas partir un artisan de Paris à chaque appel : il s'appuie sur des électriciens répartis en Seine-et-Marne, dont le secteur provinois. Au téléphone (01 41 69 10 08), on t'annonce un créneau réaliste selon l'artisan disponible le plus proche — pas un « 20 minutes » de façade. Et le principe ne varie pas : le tarif annoncé est le même à 3h du matin, le dimanche et les jours fériés. 0 majoration, c'est la règle du réseau, pas une promo.",
    },
    {
      question:
        "Mon différentiel saute à chaque grosse pluie dans ma maison près de la Voulzie : c'est lié ?",
      answer:
        "Très probablement. Les rez-de-chaussée et caves de la ville basse, entre Voulzie et Durteint, vivent avec une humidité importante. Quand elle s'infiltre dans une prise de cave, une ligne extérieure ou une boîte de dérivation, le courant fuit vers la terre et le différentiel 30 mA coupe — c'est exactement son rôle de protection contre l'électrisation. Le traitement consiste à localiser le point d'entrée de l'humidité et à isoler ou déplacer l'équipement concerné. Recherche de cause dès 79€ TTC, et n'attends pas : une fuite à la terre récurrente ne se « tasse » jamais d'elle-même.",
    },
    {
      question:
        "Mon logement est dans le secteur protégé UNESCO : est-ce que ça complique le remplacement d'un tableau électrique ?",
      answer:
        "Bonne nouvelle : non, tant qu'on parle de l'intérieur. Les protections patrimoniales (abords de monuments historiques, site UNESCO inscrit depuis 2001) encadrent l'aspect extérieur du bâti — façades, toitures, menuiseries visibles — pas ton tableau électrique ni tes circuits intérieurs. Remplacer un tableau vétuste par un modèle aux normes NF C 15-100 ne demande aucune autorisation particulière. Seule nuance : dans le bâti ancien, on privilégie des cheminements en goulotte plutôt que des saignées dans des murs ou poutres anciennes — un bon artisan le sait et chiffre en conséquence, devis écrit à l'appui.",
    },
  ],
  temoignages: [
    {
      auteur: "Hélène V.",
      quartierOuRue: "Ville haute, près de la place du Châtel",
      date: "2026-02-11",
      rating: 5,
      serviceRendered: "Disjoncteur qui sautait chaque soir (surcharge chauffage)",
      texte:
        "Maison ancienne, et chaque soir d'hiver le disjoncteur sautait dès que j'allumais le radiateur d'appoint avec le four. L'électricien envoyé par Joël a identifié un circuit complètement sous-dimensionné, remis en service et tout expliqué calmement. 79€ TTC, exactement le prix annoncé au téléphone, et un devis écrit pour un circuit dédié — sans aucune pression pour signer le soir même. Ça change de ce qu'on m'avait raconté sur les dépanneurs.",
    },
    {
      auteur: "Karim L.",
      quartierOuRue: "Champbenoist",
      date: "2026-05-26",
      rating: 5,
      serviceRendered: "Recherche de court-circuit",
      texte:
        "Tout sautait dès qu'on allumait la lumière du salon. L'artisan a cherché circuit par circuit et trouvé une prise fondue derrière un meuble, qu'on ne voyait pas du tout. Remplacée dans la foulée, facture détaillée avec la cause notée noir sur blanc — utile, c'est mon bailleur qui a finalement pris en charge vu la vétusté. 99€ comme annoncé à l'appel, intervention propre et rapide.",
    },
    {
      auteur: "Mathilde P.",
      quartierOuRue: "Ville basse, boulevard d'Aligre",
      date: "2026-01-08",
      rating: 4,
      serviceRendered: "Différentiel qui sautait par temps de pluie",
      texte:
        "Notre différentiel sautait à chaque grosse pluie, on perdait le congélateur à chaque fois. L'électricien Joël a trouvé une ligne qui filait vers la cave humide et l'a isolée proprement. Prix tenu (79€, un dimanche matin, sans majoration, j'avoue que je n'y croyais pas trop). Quatre étoiles seulement parce que l'attente a été un peu plus longue qu'annoncé ce jour-là, mais le travail et la transparence, rien à dire.",
    },
  ],
  internalLinks: [
    {
      url: "/electricite",
      anchor: "tous les dépannages électricité du réseau Joël en Île-de-France",
      contexte: "Pour les autres pannes (prise HS, tableau, mise aux normes), voir",
    },
    {
      url: "/electricien/meaux",
      anchor: "électricien à Meaux, à l'autre bout de la Seine-et-Marne",
    },
    {
      url: "/electricien/egligny",
      anchor: "électricien à Égligny, entre Bassée et Provinois",
    },
    {
      url: "/electricien/hericy",
      anchor: "électricien à Héricy, en bord de Seine",
    },
    {
      url: "/plombier/provins/debouchage-wc",
      anchor: "WC bouché à Provins : les bons réflexes avant d'appeler",
      contexte: "Et parce que les galères ne préviennent pas, le guide",
    },
  ],
  tags: [
    "provins",
    "77160",
    "seine-et-marne",
    "disjoncteur-saute",
    "electricien",
    "ville-haute",
    "ville-basse",
    "le-val",
    "champbenoist",
    "unesco",
    "pans-de-bois",
    "voulzie",
    "ligne-p",
    "nf-c-15-100",
    "onse",
    "differentiel-30ma",
    "urgence-24h",
    "0-majoration",
    "locataire",
  ],
};
