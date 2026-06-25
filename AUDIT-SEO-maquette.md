# Audit SEO de la maquette — état au 2026-06-25

> ✅ **MISE À JOUR (quick wins structurels appliqués)** : robots.txt + sitemap.xml + `canonical`
> par page + **schema `LegalService`** (2 études, JSON-LD validé) + `og:image` absolue +
> meta description propre à `etude.html`. **Nouveau score estimé : ~34/48 = 71 %**
> (« Correctement optimisé »). Restent les items **client/contenu** (Google Business, NAP réel,
> avis, Search Console). Le détail ci-dessous reflète l'état AVANT correctifs.

---


> Notation de la maquette actuelle (index / proposition-5 / etude) contre `GRILLE-SEO.md`.
> ⚠️ C'est une **maquette sans contenus réels** : les items « SEO local » et « contenu »
> dépendent des infos client (cf. `DEMANDE-CONTENUS.md`) — ils ne sont pas des défauts de conception.

## Score : 24 / 48 = **50 %** → bande « Présent mais mal classé »

| Famille | Score | Détail |
|---|---|---|
| 1. Technique & indexabilité | **5/10** | HTTPS ✅(2) · indexation 1 · **sitemap 0** · **robots.txt 0** · canonical 1 |
| 2. On-page & balises | **7/10** | title 2 · meta desc 1 · H1 2 · alt 1 · OG 1 |
| 3. Contenu & sémantique | **5/8** | mots-clés 2 · contenu unique 1 · maillage 1 · pages/intention 1 |
| 4. SEO local | **1/10** | GBP 0 · NAP 0 · page contact 1 · **schema LegalService 0** · avis 0 |
| 5. Performance & mobile | **6/6** | mobile-friendly 2 · CWV 2 · poids 2 |
| 6. Données structurées & pilotage | **0/4** | **ld+json 0** · Search Console/analytics 0 |

## Ce qui va bien
- **Performance / mobile** : statique, responsive, images compressées, aucun JS bloquant → CWV a priori bons.
- **Balises de base** : `<title>` avec *métier + ville + marque*, 1 `<h1>` par page, `meta description`, `lang="fr"`, 6 balises Open Graph, `theme-color`.
- **Mots-clés** bien placés dans les titres (« mandataires judiciaires · La Rochelle / Perpignan »).

## Corrigeable MAINTENANT (structurel, notre main) 🔧
1. **`robots.txt` + `sitemap.xml`** à la racine → indexation propre. *(famille 1)*
2. **`<link rel="canonical">`** par page → évite le duplicate. *(famille 1)*
3. **Données structurées `LegalService`** (Organization + adresses des 2 études, `openingHours`, `geo`) en `ld+json` → **levier n°1 du SEO local**. *(familles 4 & 6)*
4. **`og:image` en URL absolue** (aujourd'hui relatif `v/img/…` → aperçu de partage cassé). *(famille 2)*
5. **meta description propre à `etude.html`** (elle a hérité de celle de la home). *(famille 2)*
6. Hero en **`background-image`** : aucune image `<img>` indexable → ajouter au moins une image de contenu avec `alt` le moment venu. *(famille 2)*

## En attente des CONTENUS / du CLIENT 🕓 (cf. DEMANDE-CONTENUS.md)
- **Google Business Profile** des 2 études (créer/vérifier) — *décisif*.
- **NAP réel & cohérent** (adresses/tél exacts 17 & 66) — aujourd'hui placeholders.
- **Avis Google**.
- **Search Console + analytics** : à installer une fois le domaine `dossier`/`mj-atlantique.fr` câblé.
- Migration : **redirections 301** depuis le site Gemweb actuel + préserver les **MX**.

## 3 quick wins prioritaires
1. **Injecter le schema `LegalService`** (les 2 études) + `robots.txt` + `sitemap.xml` + `canonical` → on passe la famille 1 à ~9/10 et la 6 à 2/4 sans attendre le client.
2. **Fiche Google Business** des 2 études (action côté étude) → le plus gros gain réel sur « mandataire judiciaire + ville ».
3. **og:image absolue + meta desc par page** → partages propres + fin du duplicate.

> Note : ces 6 points structurels feraient passer la maquette de **50 %** à ~**70–75 %**
> (« Correctement optimisé ») **avant même** d'avoir les contenus réels.
