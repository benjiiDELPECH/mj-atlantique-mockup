# Grille de vérification AEO / GEO — feuille réutilisable

> **AEO** (Answer Engine Optimization) / **GEO** (Generative Engine Optimization) :
> optimiser pour être **extrait et cité** par les moteurs de réponse IA
> (ChatGPT, Perplexity, Google AI Overviews/SGE, Claude, Copilot, assistants vocaux),
> pas seulement classé dans les liens bleus.
> Complément de `GRILLE-SEO.md` : le SEO amène le trafic ; l'AEO amène la **citation**.
> Chaque critère noté **0 / 1 / 2**.

## SEO vs AEO — en une ligne
| | SEO | AEO / GEO |
|---|---|---|
| Cible | Liste de liens (SERP) | Réponse générée par une IA |
| Gagne qui… | se classe en page 1 | est **cité comme source** |
| Comportement | l'utilisateur clique | souvent **zero-click** |
| Leviers clés | balises, backlinks, perf | **données structurées, contenu answer-first, autorité, clarté de l'entité** |

## Barème : 18 critères × 2 = **36 pts**
| Bande | % | Lecture |
|---|---|---|
| **Ignoré des IA** | < 40 % | Jamais cité, contenu non extractible |
| **Parfois cité** | 40–60 % | Extractible par endroits, autorité faible |
| **Source régulière** | 60–80 % | Souvent repris sur les requêtes métier |
| **Référence citée** | > 80 % | L'IA cite ce site comme LA source du sujet |

---

## 1. Données structurées pour l'extraction  *( /8 )*
| # | Critère | On vérifie | Note |
|---|---|---|---|
| 1.1 | **FAQPage / QAPage** | Questions-réponses balisées en `schema.org/FAQPage` | _/2 |
| 1.2 | **Organization / LegalService** | Entité balisée (nom, adresses, `sameAs`, domaine d'expertise) | _/2 |
| 1.3 | **Person (auteur) & expertise** | Auteur identifié + qualifications (`Person`, `knowsAbout`, `hasCredential`) | _/2 |
| 1.4 | **HowTo / Article + dates** | Procédures en `HowTo`, articles datés (`datePublished`/`dateModified`) | _/2 |

## 2. Contenu « answer-first »  *( /8 )*
| # | Critère | On vérifie | Note |
|---|---|---|---|
| 2.1 | **Titres = questions** | H2/H3 formulés comme de vraies questions (« Comment déclarer une créance ? ») | _/2 |
| 2.2 | **Réponse en tête** | La réponse courte d'abord (2-3 phrases), le détail ensuite | _/2 |
| 2.3 | **Définitions claires** | Termes métier définis nettement (l'IA adore citer une définition) | _/2 |
| 2.4 | **Extractibilité** | Listes, tableaux, étapes numérotées, paragraphes courts (chunks autonomes) | _/2 |

## 3. Clarté de l'entité & autorité (E-E-A-T)  *( /8 )*
| # | Critère | On vérifie | Note |
|---|---|---|---|
| 3.1 | **Entité non ambiguë** | NAP cohérent + une page « à propos » factuelle et stable | _/2 |
| 3.2 | **`sameAs` / présence croisée** | Liens vers Google Business, LinkedIn, annuaires officiels (Infogreffe, liste nationale…) | _/2 |
| 3.3 | **Expertise affichée** | Profession réglementée, ancienneté, périmètre — signaux d'autorité explicites | _/2 |
| 3.4 | **Fraîcheur & exactitude** | Contenu à jour, daté, factuel (l'IA évite les sources périmées/floues) | _/2 |

## 4. Accès des moteurs IA & couverture  *( /12 )*
| # | Critère | On vérifie | Note |
|---|---|---|---|
| 4.1 | **Politique bots IA** | `robots.txt` décide explicitement GPTBot / Google-Extended / PerplexityBot / ClaudeBot / CCBot (autoriser = être citable) | _/2 |
| 4.2 | **`llms.txt`** | Fichier `/llms.txt` qui résume le site + pointe les pages clés (standard émergent) | _/2 |
| 4.3 | **Contenu en HTML** | Texte rendu côté serveur, pas planqué dans du JS (les crawlers IA lisent surtout le HTML) | _/2 |
| 4.4 | **Intentions conversationnelles** | Vraies questions longue traîne du métier couvertes (FAQ dédiée) | _/2 |
| 4.5 | **Langage naturel** | Formulations proches de l'oral / des prompts réels | _/2 |
| 4.6 | **Citabilité** | Chiffres, sources, mentions légales vérifiables → l'IA cite ce qui est sourçable | _/2 |

---

## Bloc de sortie
- **Score** : ___ / 36 = ___ %
- **Verdict** : ☐ Ignoré ☐ Parfois cité ☐ Source régulière ☐ Référence citée
- **3 quick wins** : 1… 2… 3…

## Pièges
- Croire que **SEO = AEO** : un site bien classé mais sans FAQ structurée ni entité claire n'est **pas** cité par les IA.
- **Bloquer tous les bots IA** sans le vouloir (ou par défaut) → invisibilité totale côté réponses génératives.
- Contenu **noyé dans du JS** → non lu par les crawlers IA.
- Réponses **trop longues / marketing** → l'IA préfère extraire une réponse courte et factuelle.

## Spécifique mandataire judiciaire (fort potentiel AEO)
Questions à couvrir en FAQ structurée (`FAQPage`) :
- « Comment déclarer une créance ? **Délai légal** ? » (2 mois à compter du jugement d'ouverture)
- « Mon employeur est en liquidation : **mes salaires sont-ils payés** ? » (rôle de l'**AGS**)
- « Différence entre **sauvegarde, redressement et liquidation** ? »
- « Qu'est-ce qu'un **mandataire judiciaire** vs un administrateur judiciaire ? »
- « Comment **reprendre une entreprise / des actifs** en procédure collective ? »
→ Réponse courte d'abord + lien vers l'action (déclarer ma créance / actifs à céder).
