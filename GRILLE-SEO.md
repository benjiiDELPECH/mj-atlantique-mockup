# Grille de vérification SEO — feuille réutilisable

> Check-list pour vérifier/auditer le référencement d'un site (avant mise en ligne
> ou audit d'un existant). Chaque critère noté **0 / 1 / 2** (0 = absent/KO ·
> 1 = partiel · 2 = bon). Pensée pour des **sites de proximité** (cabinets, études,
> pros locaux) où le **SEO local** pèse le plus.

## Mode d'emploi (~30 min)
1. **Outils** : Google Search Console, PageSpeed Insights (Core Web Vitals), Rich Results Test (données structurées), test mobile-friendly, un crawler (Screaming Frog / site:domaine sur Google).
2. Noter chaque critère **0/1/2**.
3. Additionner → % = score ×100 / 48.
4. Situer dans la bande, remplir le **bloc de sortie** (verdict + 3 quick wins).

## Barème : 24 critères × 2 = **48 pts**
| Bande | % | Lecture |
|---|---|---|
| **Invisible** | < 40 % | Non indexé / non optimisé — ne ressort sur rien |
| **Présent mais mal classé** | 40–60 % | Indexé, mais battu par les confrères |
| **Correctement optimisé** | 60–80 % | Solide, quelques leviers à activer |
| **Compétitif (local)** | > 80 % | Optimisé, prêt à dominer les requêtes locales |

---

## 1. Technique & indexabilité  *( /10 )*
| # | Critère | On vérifie | Note |
|---|---|---|---|
| 1.1 | **HTTPS** | Site servi en HTTPS, certificat valide, pas de mixed content | _/2 |
| 1.2 | **Indexation** | `site:domaine.fr` renvoie les pages ; Search Console sans erreurs de couverture | _/2 |
| 1.3 | **sitemap.xml** | Présent, à jour, soumis à Search Console | _/2 |
| 1.4 | **robots.txt** | Présent, ne bloque pas par erreur ; pas de `noindex` accidentel en prod | _/2 |
| 1.5 | **URLs & canonical** | URLs propres/lisibles, une `<link rel=canonical>` par page, pas de duplicate d'URL | _/2 |

## 2. On-page & balises  *( /10 )*
| # | Critère | On vérifie | Note |
|---|---|---|---|
| 2.1 | **Title** | Unique par page, ~50–60 caractères, mot-clé + marque + ville | _/2 |
| 2.2 | **Meta description** | Unique, ~150 car., incitative (n'influence pas le rang mais le clic) | _/2 |
| 2.3 | **H1 & hiérarchie** | Un seul `<h1>` par page, structure Hn logique | _/2 |
| 2.4 | **Images (alt)** | `alt` descriptif, fichiers nommés, images compressées | _/2 |
| 2.5 | **Open Graph / partage** | `og:title/description/image` (aperçu propre en lien/réseaux) | _/2 |

## 3. Contenu & sémantique  *( /8 )*
| # | Critère | On vérifie | Note |
|---|---|---|---|
| 3.1 | **Mots-clés cibles** | Requêtes métier + ville présentes naturellement dans titres/textes | _/2 |
| 3.2 | **Contenu suffisant & unique** | Vraies pages de contenu (pas que des liens), pas de duplicate | _/2 |
| 3.3 | **Maillage interne** | Liens entre pages pertinents, ancres parlantes | _/2 |
| 3.4 | **Pages par intention** | Une page par service/domaine (capte les requêtes spécifiques) | _/2 |

## 4. SEO local  *( /10 )* — décisif pour un pro de proximité
| # | Critère | On vérifie | Note |
|---|---|---|---|
| 4.1 | **Google Business Profile** | Fiche créée, **vérifiée**, complète (horaires, photos, catégorie) | _/2 |
| 4.2 | **NAP cohérent** | Nom-Adresse-Téléphone **identiques** site / fiche Google / annuaires | _/2 |
| 4.3 | **Page contact géolocalisée** | Adresse complète + carte + horaires par implantation | _/2 |
| 4.4 | **Schema LocalBusiness/LegalService** | Données structurées d'établissement (adresse, geo, openingHours) | _/2 |
| 4.5 | **Avis** | Avis Google présents et récents ; sollicitation organisée | _/2 |

## 5. Performance & mobile (Core Web Vitals)  *( /6 )*
| # | Critère | On vérifie | Note |
|---|---|---|---|
| 5.1 | **Mobile-friendly** | Responsive, lisible et cliquable sur ~390 px | _/2 |
| 5.2 | **Vitesse / CWV** | LCP < 2,5 s · CLS < 0,1 · INP < 200 ms (PageSpeed, données terrain) | _/2 |
| 5.3 | **Poids des pages** | Images optimisées (WebP/compression), pas de scripts inutiles | _/2 |

## 6. Données structurées & pilotage  *( /4 )*
| # | Critère | On vérifie | Note |
|---|---|---|---|
| 6.1 | **Schema.org Organization + Breadcrumb** | Balisage validé au Rich Results Test, sans erreur | _/2 |
| 6.2 | **Search Console + analytics** | Installés, propriété vérifiée, suivi positions/clics en place | _/2 |

---

## Bloc de sortie (à remplir)
- **Score** : ___ / 48 = ___ %
- **Verdict** : ☐ Invisible ☐ Présent mais mal classé ☐ Correctement optimisé ☐ Compétitif
- **3 quick wins** :
  1. …
  2. …
  3. …

## Pièges fréquents
- `noindex` ou `robots.txt` **oubliés en prod** après une recette → site invisible du jour au lendemain.
- **Migration de domaine sans redirections 301** → perte du référencement acquis.
- **NAP incohérent** (adresse différente entre site et fiche Google) → brouille le SEO local.
- Title/description **dupliqués** sur toutes les pages (CMS par défaut).
- Confondre **meta description** (taux de clic) et **facteur de rang** (elle n'en est pas un).

## Spécifique professions réglementées (cabinets / études)
- **SEO local = priorité n°1** : Google Business Profile + NAP + avis avant tout le reste.
- Mots-clés type « **[métier] + [ville]** » (ex. « mandataire judiciaire La Rochelle »).
- Données structurées **LegalService** plutôt que générique.
- Déontologie : pas de promesse de résultat dans les title/description.
