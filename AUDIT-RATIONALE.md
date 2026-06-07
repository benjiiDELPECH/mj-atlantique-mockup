# Refonte mj-atlantique.fr — Rationale & audit

Cadre d'analyse : **les 4 axes de crédibilité de B.J. Fogg** (Stanford Web Credibility) —
*Présumée* (suppositions a priori), *Réputation* (ce que des tiers disent), *Surface*
(première impression visuelle), *Gagnée* (expérience vécue dans le temps) — complétés par
la **Prominence-Interpretation Theory** (on juge ce qui est saillant).

Constat de départ : l'ancien site tient **uniquement sur la crédibilité GAGNÉE** (clients qui
connaissent déjà Delphine). Pour un **nouveau** visiteur (dirigeant en difficulté, à froid),
il n'y a pas de crédibilité gagnée → il juge sur les 3 autres axes, et c'est là que ça casse.

---

## Grille 1 — Ce qui est BIEN sur l'ancien site (à GARDER)

| Élément | Pourquoi c'est bien | Appui |
|---|---|---|
| **Carrousel d'images d'ambiance** (La Rochelle / Canigou, à message fixe) | Donne de la vie + un sentiment de territoire (2 ressorts) ; perçu comme plus soigné et plus fiable | **Aesthetic-Usability Effect** (Kurosu & Kashimura 1995 / NN-g) ; **prototypicité → confiance** (ScienceDirect 2023) ; mouvement = stimulus pré-attentif ; « signes de vie » |
| **Wordmark doré « mj-atlantique.fr »** | Marque reconnue, mémorisable, déjà associée à l'étude | Crédibilité **présumée** (familiarité de marque), fluence de traitement |
| **Navigation par profil** (Salarié / Dirigeant / Créancier / Reprise) | Bon modèle mental : le visiteur se reconnaît | Standard du métier (Me Capel, MJA, Étude JP) ; *match système / monde réel* |
| **Contact · Plan · Glossaire** visibles | Accès clairs, repères présents | Heuristique de visibilité de la navigation |
| **Liens institutionnels** (Infogreffe, IFPPC, AGS, études partenaires) | Caution par des tiers | Crédibilité **réputation** (Fogg) — *mais mal placés, cf. Grille 2* |

> Note carrousel : la recherche qui « descend » les carrousels vise les **carrousels de CONTENU**
> (slides-CTA concurrents) — NN-g *Auto-Forwarding*, stats Erik Runyon (~1 % de clics, 84 % sur la
> slide 1). Un carrousel **d'ambiance à message fixe** n'a pas ces défauts : rien d'essentiel n'est
> caché en slide 2. C'est cette version-là qu'on garde.

---

## Grille 2 — Ce qui n'est PAS BIEN sur l'ancien site (à CORRIGER)

| Problème | Axe Fogg touché | Appui |
|---|---|---|
| Fond marron/gris + texte vert ; couleurs incohérentes (bleu en haut, vert/marron au milieu) ; **> 2 couleurs** | Surface | Aesthetic-Usability Effect (laid → jugé moins fiable) ; Lidwell, *max ~3 couleurs fonctionnelles* |
| **Trop de tailles de police** différentes | Surface | Hiérarchie typographique ; cohérence visuelle |
| La home **ne joue pas son rôle** : « accompagnement » noyé avec « système novateur / i-Agent » | Présumée | **Prominence-Interpretation** (Fogg) : le mauvais élément est saillant |
| Séparateurs **`@@@@` / `*****`** littéraux | Surface | Lignes directrices Fogg : la négligence visible détruit la crédibilité |
| **Liens institutionnels en bas, à l'étroit**, espace non occupé | Réputation | Caution tierce sous-exploitée (Fogg) |
| **Pas d'identité humaine** (aucune photo/mot de Delphine) | Présumée / Surface | Benchmark : Me Capel met photo + citation signée ; les visages augmentent l'engagement et la confiance |
| **Mur de texte centré, pas de CTA, pas de hiérarchie** | Surface / Présumée | Hiérarchie visuelle, lecture en F |
| **Pas responsive** (Gemweb 2008) | Surface | ~50 %+ du trafic web est mobile |

---

## Re-audit des 2 propositions (vs la grille)

Légende : ✅ corrigé · ➕ gardé/amélioré · ⚠️ reste à faire

| Critère | Ancien | **A — 17e (modernité)** | **B — 17-or (fidélité)** |
|---|---|---|---|
| **Surface — couleurs** | ❌ 3+ couleurs incohérentes | ✅ 2 familles (bleu + doré), tokens partagés | ✅ idem |
| **Surface — typo** | ❌ tailles anarchiques | ✅ Spectral (serif) + Inter, échelle | ✅ idem |
| **Surface — finitions** | ❌ `@@@`, à-plat | ✅ texture discrète, ombres, focus visible | ✅ idem |
| **Carrousel d'ambiance** (à garder) | ➕ présent mais fin/coupé | ➕ **hero plein écran**, message fixe, voile navy | ➕ **bandeau 300px**, cadré sujet |
| **Wordmark doré** (à garder) | ➕ présent | ✕ remplacé par monogramme « R » | ➕ **conservé** (c'est sa raison d'être) |
| **Présumée — la home joue son rôle** | ❌ brouillé | ✅ autorité (« désignée par le Tribunal ») en **h1 géant** | ✅ bande crédibilité juste sous le carrousel |
| **Réputation — caution tierce** | ⚠️ liens en bas | ✅ bande CNAJMj + désignation visibles ; ⚠️ liens partenaires à ajouter | ✅ idem ; ⚠️ idem |
| **Identité humaine** | ❌ absente | ✅ bloc Delphine (photo + citation) | ✅ idem |
| **Navigation par profil** | ➕ menu | ➕ 4 portes + « Accéder à mon espace » | ➕ idem |
| **Responsive / mobile** | ❌ cassé | ✅ nav scroll horizontal, WCAG AA+ | ✅ idem |
| **Gagnée** (clients existants) | ➕ ok (hors site) | ➕ inchangé | ➕ inchangé |

### Reste à faire sur les DEUX (avant prod)
- ⚠️ **Photo réelle de Delphine** (emplacement prêt) + **n° d'inscription CNAJMj** (preuve vérifiable, réputation).
- ⚠️ **Bandeau notif non-bloquant** pour les avis en cours (idée reprise du « système novateur » de l'ancien site, mais en bandeau qui n'empêche pas de voir le reste — cf. l'« avis créanciers » d'etudejp.fr).
- ⚠️ Remonter les **liens institutionnels** (Infogreffe, AGS, IFPPC) dans une zone dédiée (axe réputation).

---

## Références (à conserver)

- B.J. Fogg — *Stanford Web Credibility* & *Prominence-Interpretation Theory* (4 types de crédibilité).
- Kurosu & Kashimura (1995) / NN-g — **Aesthetic-Usability Effect** : https://www.nngroup.com/articles/aesthetic-usability-effect/
- **Prototypicalité → confiance** (ScienceDirect, 2023) : https://www.sciencedirect.com/science/article/pii/S107158192300112X
- NN-g — **Auto-Forwarding Carousels Annoy Users** : https://www.nngroup.com/articles/auto-forwarding/
- Erik Runyon — **Carousel Interaction Stats** (Notre Dame) : https://erikrunyon.com/2013/01/carousel-interaction-stats/
- Iyengar & Lepper (2000) — *jam study* / Schwartz, *Paradox of Choice* / **loi de Hick** (justifie l'envoi de 2 propositions, pas plus).
- Lidwell et al. — *Universal Principles of Design* (couleurs fonctionnelles, aesthetic-usability).
