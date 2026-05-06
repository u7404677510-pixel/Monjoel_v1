# Brief designer Rive — upgrade animation logo "MonJoël"

> Document à transmettre à un designer Rive freelance si Mehdi débloque le budget pour passer du semi-Pixar code-natif (Motion + SVG path drawing, qualité ~3.5/5) au full-Pixar Rive premium (state machine + interactivité, qualité ~4/5).

## Contexte

MonJoël est un service de dépannage urgence (plomberie, serrurerie, électricité) à Paris et en Île-de-France. Site Next.js 14, ~7869 pages SEO, deploy Vercel.

L'animation actuelle du wordmark sur la homepage est faite en pure-code (Motion / framer-motion). Elle fonctionne, mais on veut passer au niveau **studio premium** type opening title Pixar — avec des matériaux, une lumière, du caractère.

## Objectifs créatifs

- **Émotion** : soulagement immédiat (l'utilisateur est en panique, pas en mode wonder). Pas de hype, pas de blink-blink.
- **Charme** : cartoon retenu. Une seule micro-anticipation par lettre, easing back.out(1.7) max, durée totale ≤ 1,2s.
- **Différenciation** : un détail signature non-réplicable (le wink du "J" sur hover, le tréma rouge qui bounce).
- **Cohérence brand** : bichromie noir + rouge calibré `#E63946`, typo serif éditoriale (à proposer parmi Söhne, Cabinet Grotesk, GT Walsheim, Tobias).

## Spécifications techniques

| Item | Valeur |
|---|---|
| Format livrable | `.riv` (asset binaire Rive) |
| Runtime cible | `@rive-app/react-canvas` (web Next.js 14 App Router) |
| Poids cible | ≤ 80 KB (asset) + ~200 KB runtime WASM |
| Performance | 60 fps stable mobile mid-range, GPU-accel WebGL |
| State machine inputs | `enter` (trigger), `hover` (boolean), `replay` (trigger) |
| Reduced motion | freeze sur la frame "neutral state" via boolean input `reducedMotion` |
| Couleurs | Noir #0A0A0A, Blanc #FFFFFF, Rouge accent #E63946 |
| Texte | "MonJoël" (avec tréma sur le ë) |

## États / animations attendus

### State idle (loop 4s)
- Respiration ultra-subtile sur l'ensemble du wordmark
- Le tréma "¨" du ë vibre légèrement (3-4px d'oscillation, sinusoïdale)

### State entry (one-shot, 0.8 - 1.2s)
- Lettres entrent avec micro-anticipation (squash légère avant pose) — 12 principes Disney sur "M-o-n-J-o-ë-l"
- Easing : back.out(1.7) ou équivalent Rive (interpolation Spring)
- Stagger entre lettres : 70-90ms
- Le tréma arrive en dernier avec un mini-bounce signature

### State hover (boolean true)
- Le "J" fait un wink — squash vertical 0.85 puis stretch 1.1 puis settle
- Le tréma rouge fait un saut de joie (translate Y -4px puis retour)
- Le reste reste stable

## Ce qu'il faut éviter

- ❌ Sur-rigging cartoon : un wordmark qui rebondit 3 fois = clownesque, pas Pixar. Pixar = retenu.
- ❌ Effet de lumière "glow" / "neon" / "glitch" : on est sur un service sérieux d'urgence, pas un site gaming.
- ❌ Distorsion liquide : ça bouille, ça perd la lisibilité.
- ❌ Animation > 1,5s en entry : on perd l'utilisateur.

## Références visuelles

- Pixar opening titles (Up, Soul, Inside Out 2)
- Lottiefiles "Hero" showcase
- Wordmark Disney (subtil, retenu, premium)

## Livrables et timing attendus

| Étape | Durée | Livrable |
|---|---|---|
| Brief & moodboard validation | 0,5 j | doc + références |
| Design vectoriel du wordmark | 1 j | SVG dans Figma + courbes optimisées |
| Animation Rive (idle + entry) | 2 j | .riv preview |
| Animation Rive (hover + reduced) | 1 j | .riv complet |
| Fine-tuning + intégration test | 0,5 - 1 j | .riv final |

**Total : 4-6 jours-design.**

## Budget cible

600-900 €/j de designer Rive freelance senior → **3 000 - 5 400 € total**.

## Intégration repo MonJoël (côté dev — ne pas faire par le designer)

Le repo Next.js installera `@rive-app/react-canvas` et créera un composant `<LogoRive/>` qui remplace le `<HeroLogoAnimated/>` actuel. Lazy-load via `dynamic({ ssr: false })` scopé à `app/page.tsx` uniquement (jamais dans le RootLayout — sinon LCP pété).

Le composant code-natif actuel (`components/hero/HeroLogoAnimated.tsx`) reste comme **fallback `prefers-reduced-motion`** et **fallback Suspense error** — on ne le supprime pas.

## Contact projet

Mehdi (Joël SAS) — à compléter par lui.
