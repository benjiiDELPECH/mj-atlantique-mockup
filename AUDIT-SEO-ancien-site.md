# Audit SEO — site actuel mj-atlantique.fr (2026-06-25)

> Notation du site existant contre `GRILLE-SEO.md`. Données vérifiées par inspection
> (curl) des pages Accueil + Étude, robots.txt, sitemap.xml. Certains points (fiche
> Google, avis, Core Web Vitals précis) sont estimés — marqués « à confirmer ».
> Stack : Atlantic Log / Gemweb (Apache Tapestry 5.3.8, Bootstrap 3, jQuery, owl.carousel).

## Score : 26 / 48 = **54 %** → bande « Présent mais mal classé »

| Famille | Score | Détail |
|---|---|---|
| 1. Technique & indexabilité | **9/10** | HTTPS ✅ · sitemap.xml ✅ (787 URLs) · robots.txt ✅ · **canonical absent** |
| 2. On-page & balises | **4/10** | **titres génériques** · OG absent · 3 H1/page · alt partiels |
| 3. Contenu & sémantique | **5/8** | vrai contenu ✅ · maillage interne faible · pas de pages par intention optimisées |
| 4. SEO local | **3/10** | NAP présent · **schema LocalBusiness absent** · GBP/avis à confirmer |
| 5. Performance & mobile | **4/6** | mobile ✅ · stack legacy (jQuery/owl) → CWV à mesurer |
| 6. Données structurées & pilotage | **1/4** | **0 donnée structurée** · Google Analytics ✅ (GSC à confirmer) |

## Ce qui va déjà (le CMS Gemweb le fournit)
- **HTTPS** (redirection http→https), **sitemap.xml** (787 URLs, dont toutes les annonces d'actifs), **robots.txt**, **mobile** (viewport), **langue** déclarée, **Google Analytics** installé, méta-description présente.
→ Les **fondations techniques sont saines**. Le problème est ailleurs.

## Ce qui cloche (et qui fait perdre des positions)
1. ❌ **Titres de pages génériques** — « DELPHINE RAYMOND : Accueil », « …Etude ». **Aucun mot-clé métier ni ville.** C'est le levier n°1 pour ressortir sur « mandataire judiciaire La Rochelle / Perpignan » → aujourd'hui Google n'a pas l'info. *(le plus impactant)*
2. ❌ **Zéro donnée structurée** (aucun `schema.org`) → ni Google ni les IA ne « comprennent » l'entité (cabinet, 2 adresses, horaires). Tue le SEO local **et** l'AEO.
3. ❌ **Zéro Open Graph** → aperçus cassés au partage (mail, LinkedIn).
4. ❌ **3 `<h1>` par page** (devrait être 1) → hiérarchie brouillée.
5. ❌ **Pas de `canonical`** → risque de duplicate (surtout avec 787 pages d'actifs).
6. ⚠️ **Maillage interne faible** (≈13 liens sur l'accueil) ; **alt** manquants (3 images/6).
7. ⚠️ **Stack legacy** (Tapestry/Bootstrap 3/jQuery/owl) → Core Web Vitals probablement moyens (à mesurer).

## À confirmer (audit complet)
- **Fiche Google Business Profile** des 2 études (créée ? vérifiée ? à jour ?) — décisif en local.
- **Avis Google** (volume, récence).
- **Search Console** (propriété vérifiée, couverture).
- **Core Web Vitals** réels (PageSpeed Insights).
- **Backlinks** (annuaires juridiques, Infogreffe…).

## 3 quick wins prioritaires
1. **Titres par page** avec « mandataire judiciaire + ville » (gain SEO local immédiat, 0 risque).
2. **Données structurées LocalBusiness/LegalService** (2 études, horaires) → Google + IA comprennent l'entité.
3. **Open Graph** (aperçus de partage propres).

## Comparaison avec la maquette refondue
| | Site actuel | Nouvelle maquette |
|---|---|---|
| Score SEO | **54 %** | **~71 %** |
| Titres optimisés | ❌ | ✅ |
| Données structurées | ❌ 0 | ✅ LegalService + 2 adresses |
| Open Graph | ❌ | ✅ |
| FAQ structurée (AEO) | ❌ | ✅ FAQPage 7 Q |
| llms.txt / bots IA | ❌ | ✅ |

> Conclusion : le site actuel n'est pas « cassé » — sa **technique est correcte** — mais il
> laisse sur la table les leviers qui font **ranker un cabinet local** (titres, données
> structurées, local). La refonte les active. C'est un argumentaire factuel, et une base de
> **prestation SEO** facturable (audit + corrections + suivi).
