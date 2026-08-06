# Grille d'audit web — feuille réutilisable

> **v2 — 6 août 2026.** Outil d'audit express (~25 min) pour évaluer le site d'un
> prospect, le noter, et sortir un verdict + 3 quick wins.
> Auteur : Benjamin Delpech. Journal des versions en fin de feuille.
>
> **Règle de la v2 : deux passages sur le même site doivent donner le même score.**
> Chaque critère porte donc son ancrage `0 / 1 / 2`, et tout critère qui se mesure
> nomme son outil. Un score obtenu « au feeling » n'est comparable à rien — ni entre
> deux prospects, ni entre un avant et un après.

## Mode d'emploi (~25 min)

1. **Test des 5 secondes** (à froid) : ouvre la home, ferme l'onglet au bout de 5 s.
   Note ce que tu as retenu : *qui ? quoi ? quelle action ?* Si tu ne sais pas → ça commence mal.
2. **Passe les 4 éliminatoires ci-dessous.** Deux minutes. Si l'un tombe, le verdict est plafonné quel que soit le total.
3. **Scan desktop**, puis **scan mobile** (DevTools, 390 px).
4. **Lance Lighthouse** (Chrome › DevTools › Lighthouse, profil mobile). Il sert aux critères 6.1, 6.3 et 6.4 — sans lui, ces trois notes ne valent rien.
5. **Note chaque critère 0 / 1 / 2** en suivant l'ancrage de sa ligne. En cas d'hésitation entre deux notes, **prends la plus basse** — la grille sert à trouver du travail à faire, pas à rassurer.
6. Additionne, convertis en %, situe dans la bande.
7. Remplis le **bloc de sortie** — c'est la seule chose que voit le prospect.
8. **Enchaîne sur `GRILLE-SEO.md` (/48).** L'audit visuel ne note pas le référencement, et c'est pourtant l'accroche qui convertit (« vous êtes invisible sur *avocat Perpignan* »). Les deux scores vont ensemble dans le bloc de sortie.

> Après l'audit, avant de chiffrer quoi que ce soit : la question de la passation
> (qui héberge, qui peut déployer) est dans `PLAYBOOK.md` et
> `CHECKLIST-MISE-EN-LIGNE.md`. Elle ne se note pas, mais elle conditionne le devis.

---

## Les 4 éliminatoires (à passer AVANT de noter)

Ce ne sont pas des critères notés : ce sont des plafonds. Un beau hero ne compense
pas un site illégal ou inutilisable.

| # | Défaut | Comment on vérifie | Plafond imposé |
|---|---|---|---|
| **E1** | Pas de HTTPS, ou mixed-content | l'URL en `http://` ne redirige pas ; cadenas barré ; console : erreurs `Mixed Content` | **40 % max** |
| **E2** | Mentions légales absentes ou introuvables | recherche dans le pied de page + `/mentions-legales` | **40 % max** |
| **E3** | Inutilisable sur mobile | 390 px : scroll horizontal, texte illisible, ou menu inatteignable | **50 % max** |
| **E4** | Donnée affichée fausse ou morte | un téléphone qui ne sonne pas, un email qui rebondit, une adresse périmée | **50 % max** |

> Un éliminatoire n'annule pas l'audit — il devient **le premier quick win**, et c'est
> souvent le plus facile à vendre : c'est factuel, ça ne se discute pas.

---

## Barème : 22 critères × 2 = **44 pts** → % = score × 100 / 44

| Bande | % | Lecture |
|---|---|---|
| **Amateur** | **< 40** | Refonte nécessaire |
| **Fonctionnel mais daté** | **40 – 59** | Tient, mais perd les nouveaux prospects |
| **Pro** | **60 – 79** | Crédible, quelques finitions |
| **Référence** | **≥ 80** | Niveau cabinet / marque établie |

*(Bornes rendues disjointes en v2 : en v1, un score de 60 % ou de 80 % tombait dans deux bandes à la fois.)*

---

## La grille

Barème par défaut : **0** = absent ou cassé · **1** = présent mais partiel · **2** = fait correctement.
Chaque ligne précise ce que ça veut dire *pour ce critère-là*.

### 1. Crédibilité — les 4 axes de Fogg  *( /8 )*

| # | Critère | 0 | 1 | 2 | Note |
|---|---|---|---|---|---|
| 1.1 | **Surface** — ça a l'air sérieux au 1ᵉʳ regard | codes visuels datés (dégradés, ombres, carrousel clignotant) | propre mais quelconque | on dirait un cabinet établi | _/2 |
| 1.2 | **Présumée** — on comprend qui/quoi en < 5 s | ni le métier ni la ville ne ressortent | l'un des deux | métier **et** implantation, sans scroll | _/2 |
| 1.3 | **Réputée** — caution tierce visible | aucune | une seule, en pied de page | ordre / annuaire / partenaires, visibles sans chercher | _/2 |
| 1.4 | **Gagnée** — preuves d'expérience | aucune | affirmations sans chiffre (« expérimenté ») | ancienneté datée, taille d'équipe, cas ou témoignages nommés | _/2 |

### 2. Première impression & hiérarchie  *( /6 )*

| # | Critère | 0 | 1 | 2 | Note |
|---|---|---|---|---|---|
| 2.1 | **Test des 5 s** — valeur + action retenues | tu ne sais dire ni qui ni quoi | tu sais qui, pas quoi faire | tu peux réciter métier + action attendue | _/2 |
| 2.2 | **Point focal unique** | 3 éléments ou plus se disputent l'œil | 2 | un seul point d'entrée évident | _/2 |
| 2.3 | **Above-the-fold** | ni proposition ni bouton d'action | l'un des deux | proposition **et** action principale visibles sans scroll | _/2 |

### 3. Identité & confiance  *( /6 )*

| # | Critère | 0 | 1 | 2 | Note |
|---|---|---|---|---|---|
| 3.1 | **Qui est derrière** | anonyme | un nom seul | nom + visage ou bio courte *(sur profession réglementée, une bio sourcée peut valoir la photo)* | _/2 |
| 3.2 | **Preuves vérifiables** | rien de vérifiable | adresse seule | adresse + inscription / SIREN + mentions légales atteignables | _/2 |
| 3.3 | **Réassurance** | aucune | une mention isolée | engagement clair (gratuité, confidentialité, RGPD) là où on décide | _/2 |

### 4. Système visuel  *( /8 )*

| # | Critère | 0 | 1 | 2 | Note |
|---|---|---|---|---|---|
| 4.1 | **Palette** | 4 teintes ou plus sans logique | 3, dont une décorative | ≤ 3, chacune porte un sens | _/2 |
| 4.2 | **Typo** | > 8 tailles, ou police illisible | 6 à 8 tailles | ≤ 5-6 tailles, échelle tenue | _/2 |
| 4.3 | **Espacement** | contenu collé aux bords | inégal selon les sections | respiration constante, macro et micro | _/2 |
| 4.4 | **Finitions** | ≥ 2 défauts visibles (coquille, lien mort, `@@@@`, emoji-logo) | 1 | aucun sur les 3 pages principales | _/2 |

### 5. Contenu & parcours  *( /8 )*

| # | Critère | 0 | 1 | 2 | Note |
|---|---|---|---|---|---|
| 5.1 | **Proposition de valeur** | absente ou creuse | présente mais générique | une phrase dit le bénéfice concret | _/2 |
| 5.2 | **Parcours par intention** | menu calqué sur l'organigramme interne | entrées métier sans nommer le visiteur | entrées par profil (« je suis salarié », « je suis créancier ») | _/2 |
| 5.3 | **CTA hiérarchisés** | aucun bouton d'action | plusieurs boutons de poids égal | un primaire dominant, le reste en retrait | _/2 |
| 5.4 | **Densité & fraîcheur** | mur de texte, ou contenu daté de > 2 ans | l'un des deux | lisible en diagonale **et** à jour | _/2 |

### 6. Accessibilité & technique  *( /8 )* — 🔧 *mesuré, pas jugé*

| # | Critère | Outil | 0 | 1 | 2 | Note |
|---|---|---|---|---|---|---|
| 6.1 | **Contraste** | 🔧 Lighthouse › Accessibility | échecs sur le texte courant | échecs sur du texte secondaire seulement | aucun échec de contraste | _/2 |
| 6.2 | **Clavier / focus** | 🔧 `Tab` sur la home, 10 tabulations | on perd le focus des yeux | focus visible mais ordre incohérent | focus visible et ordre logique | _/2 |
| 6.3 | **Responsive** | 🔧 DevTools 390 px + Lighthouse mobile | débordement horizontal | tient, mais zones tactiles trop petites | propre, rien ne déborde | _/2 |
| 6.4 | **Perf & médias** | 🔧 Lighthouse › Performance (mobile) | score < 50 | 50 – 89 | ≥ 90 | _/2 |

> Si Lighthouse n'a pas été lancé, **6.1, 6.3 et 6.4 ne se notent pas** : on inscrit
> « n.m. » (non mesuré) et le score total est annoncé **sur 38**, pas sur 44. Mieux
> vaut un score partiel honnête qu'un score complet inventé.

---

## Bloc de sortie (à montrer au prospect)

```
CABINET  : ______________________________________
URL EXACTE AUDITÉE : ____________________________
DATE     : ____________     AUDITEUR : ___________

ÉLIMINATOIRES  E1 ☐  E2 ☐  E3 ☐  E4 ☐   → plafond appliqué : ______

SCORE VISUEL : ____ / 44  →  ____ %  →  BANDE : ________________
SCORE SEO    : ____ / 48  →  ____ %        (cf. GRILLE-SEO.md)

EN 5 SECONDES, ON COMPREND : ____________________________________

L'ATOUT À GARDER : ______________________________________________

TOP 3 QUICK WINS (impact ↑ / effort ↓)
1. ______________________________________________
2. ______________________________________________
3. ______________________________________________
```

> **Astuce commerciale** : ne sors jamais une liste de défauts. Sors **1 atout à garder**
> + **3 quick wins**. Le prospect doit se sentir aidé, pas jugé — on est gentil ET
> expert (trustworthiness × expertise).
>
> **Note l'URL exacte et la date.** Sans elles, un ré-audit six mois plus tard n'est
> comparable à rien, et l'avant/après — ton meilleur argument — n'existe pas.

---

## Annexe — l'appui de chaque critère

À citer en rendez-vous : ça transforme « j'aime pas » en diagnostic. Sorti de la
feuille de travail pour ne pas alourdir la notation.

| # | Appui |
|---|---|
| 1.1 | Aesthetic-Usability Effect (Kurosu & Kashimura, 1995) ; 46 % du jugement de crédibilité se fait sur le design seul (Stanford-Makovsky, 2002) |
| 1.2 | Fogg — *presumed credibility* (stéréotypes de secteur) |
| 1.3 | Fogg — *reputed credibility* (caution de tiers) |
| 1.4 | Fogg — *earned credibility* (preuve accumulée) |
| 2.1 | Fogg — Prominence-Interpretation Theory |
| 2.2 | Lidwell — hiérarchie visuelle |
| 2.3 | F-pattern, études d'eye-tracking |
| 3.1 | Signaux humains — benchmark sectoriel |
| 3.2 | Stanford Web Credibility, Guideline #1 — faciliter la vérification |
| 3.3 | Fogg — trustworthiness |
| 4.1 | Lidwell — *max 3 couleurs* |
| 4.2 | Morris (2012) ; Dyson (2004) — lisibilité et longueur de ligne |
| 4.3 | Boulton, *A List Apart* (2007) — le blanc signale le premium |
| 4.4 | Stanford Web Credibility, Guideline #10 — l'erreur de détail coûte cher |
| 5.1 | Clarté > exhaustivité |
| 5.2 | Nielsen — correspondance système / monde réel |
| 5.3 | NN/g — hiérarchie des actions |
| 5.4 | Loi de Hick — trop de choix paralyse |
| 6.1 | WCAG 2.1 — 1.4.3 (4.5:1 ; 3:1 grand texte) |
| 6.2 | WCAG 2.1 — 2.4.7 focus visible |
| 6.3 | > 50 % du trafic est mobile |
| 6.4 | Core Web Vitals ; WCAG 2.2.2 |

---

## Journal des versions

**v2 — 06/08/2026**
- Ancrage `0 / 1 / 2` écrit pour chacun des 22 critères — la v1 définissait le barème une seule fois, globalement, ce qui rendait chaque note négociable et le score non reproductible.
- Outil nommé pour les critères mesurés (6.1, 6.3, 6.4 → Lighthouse ; 6.2 → tabulation clavier), avec la règle du score sur 38 si la mesure n'a pas été faite.
- **4 éliminatoires** ajoutés en amont de la notation : la v1 moyennait tout, si bien qu'un site sans mentions légales ou cassé sur mobile pouvait ressortir « Pro ».
- Bandes de verdict rendues disjointes (60 et 80 appartenaient à deux bandes à la fois).
- Renvoi explicite vers `GRILLE-SEO.md` : la v1 ne notait pas le référencement et n'y renvoyait pas, alors que c'est l'accroche commerciale qui convertit.
- Colonne « Appui » déplacée en annexe ; bloc de sortie enrichi de l'URL exacte, de l'auditeur, des éliminatoires et du score SEO.
- Barème inchangé (22 critères, 44 points) : les audits passés restent comparables.

**v1 — 08/06/2026** — création. Cas #0 : MJ Atlantique.
