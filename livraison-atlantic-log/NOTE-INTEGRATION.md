# Note d'intégration — refonte du site de la SCP Delphine RAYMOND

**Destinataire** : équipe technique Atlantic Log
**Auteur** : Benjamin Delpech — benjamin.delpech66@gmail.com
**Date** : 6 août 2026 · **Version du paquet** : 2
**Objet** : livraison du thème graphique et description du travail d'intégration attendu

---

## 1. Ce qui est livré

| Fichier | Rôle |
|---|---|
| `charte-mj-atlantique.css` | Feuille de thème : tokens de couleur, typographie, traitement du hero, des cartes d'entrée, de la navigation et du pied de page. |
| `fonts/` | Raleway auto-hébergée — 2 fichiers `.woff2` (68 Ko au total) + la feuille `@font-face`. Licence SIL OFL 1.1, redistribution autorisée. |
| Maquette de référence | https://benjiidelpech.github.io/mj-atlantique-mockup/ — rendu cible, validé par Me RAYMOND. |

La maquette est un rendu statique de démonstration. **Elle n'a pas vocation à être mise en ligne telle quelle** : le site de l'étude doit rester servi par Gemweb, puisqu'il publie les mandats et les actifs depuis Gemarcur.

---

## 2. Constat technique — le point qui conditionne tout le reste

En comparant l'instance de l'étude à une autre instance Gemweb en production, deux gabarits distincts apparaissent :

| | `mj-atlantique.fr` | `pascual-beatrice.fr` |
|---|---|---|
| Version Gemweb | **4.3.1** | 4.3.0 |
| Gabarit | historique | moderne |
| Structure | `#header`, `#bigMenu`, `#sidebar`, `#content-wrap`, `#footer-wrap` | `.main-navigation`, `section`, `footer` |
| Balises HTML5 | aucune | oui |
| Cartes d'entrée (`.espace-gros-carres` / `.boxed-content`) | **absentes** | **présentes** |
| Hero photo plein écran (`.pictureBcg`) | **absent** | **présent** |

*(Relevé par inspection des pages publiques le 06/08/2026.)*

**Conséquence :** l'étude est sur une version récente de Gemweb mais sur l'habillage historique. Les deux composants qui portent l'essentiel de la refonte validée par Me RAYMOND — **les cartes d'entrée par profil** et **le bandeau photo** — sont natifs du gabarit moderne et n'existent pas sur son instance.

**C'est une bonne nouvelle :** rien n'est à développer. Ces composants tournent déjà en production chez vous, sur une autre étude. Il s'agit d'un changement d'habillage, pas d'un développement spécifique.

---

## 3. Le travail d'intégration, en deux étapes

### Étape 1 — bascule de l'instance sur le gabarit moderne *(côté Atlantic Log)*

Passage de `mj-atlantique.fr` (et `mj-perpignan.fr`) sur le gabarit déjà utilisé par d'autres études.

Points d'attention :
- **Conserver l'intégralité des URLs existantes.** Le sitemap déclare 787 URLs, majoritairement des annonces d'actifs à céder. Ce sont les pages qui font venir les repreneurs : toute URL qui change doit être redirigée en `301`, sinon la visibilité acquise est perdue.
- Conserver la recherche mandat et la recherche actif à l'identique.
- Conserver l'accès à l'espace authentifié (`#loginform`).

### Étape 2 — application du thème *(fichier fourni)*

`charte-mj-atlantique.css` se pose **après** `app/config/css/styles.css`. Il ne modifie aucun markup : il ne fait que surcharger des sélecteurs natifs à partir de variables CSS.

Idéalement, son contenu **remplace la portion « thème client »** de `styles.css` plutôt que d'être chargé en plus.

Sélecteurs visés (tous natifs du gabarit moderne) :

| Zone | Sélecteur |
|---|---|
| Navigation | `.main-navigation`, `.navbar-nav > li > a` |
| Bandeau photo | `section.pictureBcg img`, `section.pictureBcg::after` |
| Titres du bandeau | `section.presentation h1`, `h3` |
| Cartes d'entrée | `.espace-gros-carres a .boxed-content` |
| Titres de blocs | `[class*="webinfo-"] h1`, `h3` |
| Formulaire de connexion | `#loginform` |
| Pied de page | `footer`, `.copyright` |

---

## 4. Points à confirmer de votre côté

1. **Chemin d'accès aux polices.** La feuille n'appelle **aucun service externe** : les polices sont fournies auto-hébergées dans `fonts/` (choix délibéré — la jurisprudence CNIL et la décision LG München I 3 O 17493/20 sanctionnent le chargement de Google Fonts depuis leur CDN, un risque inutile pour une étude). Il nous faut simplement savoir **où déposer le dossier `fonts/`** sur votre arborescence : la feuille y renvoie en relatif (`@import url('./fonts/raleway.css')`), à ajuster selon votre structure.
2. **Préfixe de page.** La feuille cible `.accueil-accueil section.pictureBcg` avec une règle de repli sans préfixe. Merci de confirmer la convention réelle du gabarit.
3. **Cartes photo / carrousel.** Si le gabarit expose des cartes de type `owl-carousel`, indiquez-nous les sélecteurs : le traitement graphique correspondant reste à caler.
4. **Photographie du bandeau.** À fournir par l'étude. La maquette utilise une image libre de droits à titre d'illustration.

---

## 5. Contenus validés par l'étude, à reprendre

Retours de Me RAYMOND du 28/06/2026, déjà intégrés à la maquette :

- « dirigeant » → **« chef d'entreprise »**
- « désignée par la justice » → **« désignée par les tribunaux »**
- Équipe : **10 collaborateurs** ; Me RAYMOND **installée depuis 2007**, diplômée en 2005
- **Ne pas afficher** le numéro d'inscription CNAJMJ

Éléments de référencement présents dans la maquette et à conserver à l'intégration : titre de page unique par rubrique incluant le métier et la ville, données structurées `LegalService` avec les deux établissements et leurs horaires, balises Open Graph, `canonical`.

---

## 6. Interlocuteurs

| | |
|---|---|
| Étude de La Rochelle | Cédric GARRIGUES — cedric.garrigues@mj-atlantique.fr |
| Étude de Perpignan | Gauthier JOUVE — **contact@mj-perpignan.fr** |
| Décision | Me Delphine RAYMOND |
| Technique / cette note | Benjamin Delpech — benjamin.delpech66@gmail.com |

> ⚠️ L'adresse `gauthier.jouve@mj-atlantique.fr` est rejetée par le serveur (`550 adresse introuvable`). Utiliser `contact@mj-perpignan.fr`.

---

## 7. Ce que nous attendons pour avancer

Une seule réponse suffit à débloquer le dossier :

1. La bascule sur le gabarit moderne est-elle réalisable sur cette instance, et sous quel délai ?
2. Si oui, à qui transmettons-nous la feuille de thème, et sous quelle forme la souhaitez-vous — fichier séparé, ou portion de `styles.css` à intégrer ?
3. Si la bascule n'est pas envisageable à court terme, nous adapterons la feuille au gabarit historique : dites-le nous, c'est un travail distinct que nous prendrons en charge.
