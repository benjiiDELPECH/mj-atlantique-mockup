# Grille d'audit web — feuille réutilisable

> Outil d'audit express (~20 min) pour évaluer le site d'un prospect, le noter, et
> sortir un verdict + 3 quick wins. Chaque critère est adossé à une source (à citer
> en rendez-vous : ça transforme « j'aime pas » en diagnostic).
> Auteur : Benjamin Delpech.

## Mode d'emploi (20 min)

1. **Test des 5 secondes** (à froid) : ouvre la home, ferme l'onglet au bout de 5 s.
   Note ce que tu as retenu : *qui ? quoi ? quelle action ?* Si tu ne sais pas → ça commence mal.
2. **Scan desktop** puis **scan mobile** (DevTools, ~390 px).
3. **Note chaque critère 0 / 1 / 2** (0 = absent/KO · 1 = partiel · 2 = bon).
4. Additionne, convertis en %, situe dans la **bande de verdict**.
5. Remplis le **bloc de sortie** (verdict + 3 quick wins) — c'est ce que tu montres au prospect.

## Barème : 22 critères × 2 = **44 pts** → % = score ×100/44

| Bande | % | Lecture |
|---|---|---|
| **Amateur** | < 40 % | Refonte nécessaire |
| **Fonctionnel mais daté** | 40–60 % | Tient, mais perd les nouveaux prospects |
| **Pro** | 60–80 % | Crédible, quelques finitions |
| **Référence** | > 80 % | Niveau cabinet/marque établie |

---

## La grille

### 1. Crédibilité — les 4 axes de Fogg  *( /8 )*
| # | Critère | On vérifie | Note | Appui |
|---|---|---|---|---|
| 1.1 | **Surface** | Au 1ᵉʳ regard, ça « a l'air sérieux/pro » | _/2 | Aesthetic-Usability Effect (Kurosu & Kashimura 95) ; 46 % jugent sur le design seul (Stanford-Makovsky 02) |
| 1.2 | **Présumée** | En <5 s on comprend *qui / quoi* ; signaux a priori (secteur, marque connue) | _/2 | Fogg — *presumed credibility* (stéréotypes) |
| 1.3 | **Réputation** | Caution tierce visible : labels, ordre, annuaire, avis, partenaires | _/2 | Fogg — *reputed credibility* |
| 1.4 | **Gagnée** | Preuves d'expérience : ancienneté, cas, témoignages, chiffres | _/2 | Fogg — *earned credibility* |

### 2. Première impression & hiérarchie  *( /6 )*
| # | Critère | On vérifie | Note | Appui |
|---|---|---|---|---|
| 2.1 | **Test des 5 s** | Valeur + action comprises sans scroll | _/2 | Prominence-Interpretation (Fogg) |
| 2.2 | **Focal point unique** | Un point d'attention clair, pas de « sapin de Noël » | _/2 | Hiérarchie visuelle (Lidwell) |
| 2.3 | **Above-the-fold** | Proposition + 1 CTA visibles d'emblée | _/2 | F-pattern, eye-tracking |

### 3. Identité & confiance  *( /6 )*
| # | Critère | On vérifie | Note | Appui |
|---|---|---|---|---|
| 3.1 | **Qui est derrière** | Nom, **photo**, courte bio de la personne | _/2 | Benchmark + signaux humains |
| 3.2 | **Preuves vérifiables** | Sources, n° d'inscription, mentions légales, adresse | _/2 | Stanford Guideline #1 (faciliter la vérification) |
| 3.3 | **Réassurance** | Garanties, « sans engagement », confidentialité, RGPD | _/2 | Trustworthiness (Fogg) |

### 4. Système visuel  *( /8 )*
| # | Critère | On vérifie | Note | Appui |
|---|---|---|---|---|
| 4.1 | **Palette** | ≤ ~3 couleurs fonctionnelles, cohérentes (pas de bleu+vert+marron) | _/2 | Lidwell, *max 3 couleurs* |
| 4.2 | **Typo** | Échelle limitée (≤ 5-6 tailles), police adaptée, lisible | _/2 | Morris 2012 ; Dyson 2004 |
| 4.3 | **Espacement** | Whitespace macro + micro, ça respire | _/2 | Boulton (ALA 2007) — *more whitespace = premium* |
| 4.4 | **Finitions** | Zéro coquille / lien mort / emoji-en-logo / `@@@@` | _/2 | Stanford Guideline #10 |

### 5. Contenu & parcours  *( /8 )*
| # | Critère | On vérifie | Note | Appui |
|---|---|---|---|---|
| 5.1 | **Proposition de valeur** | Une phrase dit clairement le bénéfice | _/2 | Clarté > exhaustivité |
| 5.2 | **Parcours par intention** | Entrées par profil/besoin (l'utilisateur se reconnaît) | _/2 | Match système / monde réel |
| 5.3 | **CTA hiérarchisés** | Primaire (monétisable) dominant > secondaire > tertiaire | _/2 | NN/g — hiérarchie des actions |
| 5.4 | **Densité** | Pas de mur de texte ; contenu à jour | _/2 | Loi de Hick (trop = paralysie) |

### 6. Accessibilité & technique  *( /8 )*
| # | Critère | On vérifie | Note | Appui |
|---|---|---|---|---|
| 6.1 | **Contraste** | Texte/fond ≥ AA (4.5:1 ; 3:1 grand) | _/2 | WCAG 2.1 |
| 6.2 | **Clavier / focus** | Navigable au clavier, focus visible | _/2 | WCAG 2.4.7 |
| 6.3 | **Responsive** | Propre sur mobile (~390 px), pas de débordement | _/2 | ~50 %+ trafic mobile |
| 6.4 | **Perf & médias** | Chargement rapide, images optimisées, `prefers-reduced-motion` si anim | _/2 | Core Web Vitals ; WCAG 2.2.2 |

---

## Bloc de sortie (à montrer au prospect)

```
SITE : ___________________________      DATE : ________

SCORE : ____ / 44  →  ____ %   →  BANDE : ______________

EN 5 SECONDES, ON COMPREND : ______________________________

TOP 3 QUICK WINS (impact ↑ / effort ↓)
1. ____________________________________________
2. ____________________________________________
3. ____________________________________________

L'ATOUT À GARDER : ________________________________________
```

> Astuce commerciale : ne sors jamais une liste de défauts. Sors **1 atout à garder**
> + **3 quick wins**. Le prospect doit se sentir aidé, pas jugé (cf. crédibilité de
> surface : on est gentil ET expert = trustworthiness × expertise).
