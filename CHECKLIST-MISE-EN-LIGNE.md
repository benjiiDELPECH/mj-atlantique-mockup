# Checklist de mise en ligne — recette de sortie

> **v2 — 6 août 2026.** À repasser AVANT chaque livraison, sur tous les sites.
> But : ne livrer **aucune saloperie** — lien mort, donnée inventée, faille RGPD, détail amateur.
> Règle d'or : **aucune donnée affichée sans source vérifiée** (adresse, tél, chiffre, claim).
> Auteur : Benjamin Delpech. Journal des versions en fin de feuille.
>
> ≠ de `GRILLE-AUDIT-WEB.md` (elle, c'est pour *gagner* le deal en notant l'ancien site).
>
> **Règle de la v2 : une case ne se coche pas « à l'œil ».** Chaque contrôle porte le geste
> exact qui le valide — une commande, un outil, une action. Une case cochée sans le geste
> est un mensonge à soi-même.

## Mode d'emploi

Coche chaque ligne. Tout ce qui est **🔴 bloquant** doit être vert avant la mise en ligne.
Les **🟠 finitions** peuvent partir en V1.1 si le client presse, mais on les note.

**Le §0 se passe AVANT de dessiner quoi que ce soit**, pas au moment de livrer. C'est la
leçon du cas #0 : la question « qui peut déployer » posée à la livraison a coûté cinq semaines.

---

## 0. 🔴 Faisabilité de livraison — À PASSER EN PREMIER, avant la première maquette

- [ ] **Sur quoi tourne le site actuel ?** `curl -s <url> | grep -oE '<meta name="generator"[^>]*>|Gemweb|WordPress|Wix|Shopify'`
      → plateforme fermée d'un éditeur métier, ou hébergement libre ?
- [ ] **Le livrable, c'est quoi exactement ?** Un site déployé par moi · un thème remis à un éditeur · des fichiers remis au client. **Écrit noir sur blanc avant de facturer.**
- [ ] **Qui a la main, nommément ?** Domaine (registrar + qui a le compte) · hébergement · déploiement. Un nom et un email par ligne, pas « l'agence ».
- [ ] **Combien d'URLs existantes sont en jeu ?** `curl -s <url>/sitemap.xml | grep -c "<loc>"` → toute URL qui disparaît doit être redirigée en `301`.
- [ ] **Si l'intégration dépend d'un tiers** : son interlocuteur est identifié, et un délai a été donné **avant** que je commence.

> ⚠️ Si le déploiement dépend d'un tiers dont on n'a ni le nom ni le délai, ce n'est pas un
> NO-GO — mais ça change ce qu'on vend. Le devis dit alors « remise d'un thème », pas
> « mise en ligne », et le forfait de suivi ne démarre qu'à la publication effective.

## 1. 🔴 Données & contenu — « zéro invention »

- [ ] Chaque **adresse** affichée est copiée de la source officielle (pas de mémoire, pas de supposition).
- [ ] Chaque **téléphone** a été composé. Il sonne.
- [ ] Chaque **email** affiché a reçu un message de test. **Il n'a pas rebondi.**
      *(Cas #0 : `gauthier.jouve@…` a rebondi en 550 — l'adresse figurait dans les contacts du projet et n'existait pas.)*
- [ ] Chaque **chiffre** (années d'exercice, nb de collaborateurs, délais légaux) est sourcé, et la source est notée.
- [ ] Aucun **claim réglementé** non validé par le référent métier (« gratuit », « n°1 », délais).
- [ ] **Orthographe des noms propres** (titulaire, ville, raison sociale) vérifiée caractère par caractère.
- [ ] Mentions imposées par la profession présentes, et **les mentions interdites retirées**.
      *(Cas #0 : le n° CNAJMJ devait être supprimé — la titulaire ignorait en avoir un.)*

## 2. 🔴 Liens & URL — « rien de mort, rien d'étranger »

- [ ] **Tous les liens externes en 200.** Geste :
      `grep -oE 'https?://[^"]+' index.html | sort -u | while read u; do printf "%s %s\n" "$(curl -s -o /dev/null -w '%{http_code}' -m 10 "$u")" "$u"; done | grep -v '^200'`
      → la sortie doit être vide.
- [ ] Tous les liens internes et ancres (`#contact`…) pointent vers une cible existante.
- [ ] Les liens vers le **back-office** ouvrent la bonne page **par profil** (testés un par un, connecté et déconnecté).
- [ ] Aucun `href="#"` ni `href=""` oublié.
- [ ] Liens externes en `target=_blank` → `rel="noopener noreferrer"`.
- [ ] 🆕 **L'URL elle-même ne contient le nom d'aucun autre client.**
      *(Cas réel : des maquettes envoyées à des avocats de Perpignan étaient servies depuis
      `…/mj-atlantique-mockup/…` — le nom d'une étude de La Rochelle. Le destinataire le lit
      avant même d'ouvrir la page.)*

## 3. 🔴 RGPD & juridique (exigence forte sur les cabinets)

- [ ] **Polices auto-hébergées** — aucun appel à `fonts.googleapis.com` (jurisprudence CNIL/DE).
      Geste : `grep -rn "fonts.googleapis\|fonts.gstatic" .` → doit être vide.
- [ ] Aucun tracker tiers non déclaré (pas de GA / Maps / embed qui pose un cookie sans consentement).
- [ ] Page **Mentions légales** accessible et à jour (éditeur, directeur de publication, hébergeur, SIRET/RCS).
- [ ] **Politique de confidentialité** si formulaire ou donnée collectée.
- [ ] Formulaires : pas d'envoi de donnée perso sans base légale ni mention.

## 4. 🟠 SEO & partage — « pro au premier regard »

- [ ] `<title>` **unique par page**, avec métier + ville.
      Geste : `for p in $PAGES; do curl -s $p | grep -oE '<title>[^<]*'; done | sort | uniq -d` → vide.
- [ ] `<meta name="description">` présente (~150 car.), différente par page.
- [ ] **Favicon** présent (pas l'icône par défaut).
- [ ] **Open Graph** (`og:title`, `og:description`, `og:image`) → aperçu propre en mail et LinkedIn.
      Geste : coller l'URL dans un brouillon de mail et regarder l'aperçu.
- [ ] `lang` correct sur `<html>`, `canonical` posée.
- [ ] Données structurées valides (`LocalBusiness` / `LegalService`, une par implantation, avec horaires).

## 5. 🔴 Responsive & rendu

- [ ] **390 px** : rien ne déborde, pas de scroll horizontal, textes lisibles.
- [ ] **768 px** et desktop large.
- [ ] **Téléphones cliquables** (`tel:`) et emails (`mailto:`) — friction zéro sur mobile.
- [ ] Images dimensionnées et compressées (pas de 4 Mo en hero) ; `alt` sur les images informatives.
- [ ] Le site reste correct **sans JS** (parallaxe, accordéons → dégradation propre).

## 6. 🟠 Accessibilité — minimum décent

- [ ] Lighthouse › Accessibility ≥ **90**.
- [ ] Contraste suffisant, en particulier texte blanc sur photo (voile assez dense).
- [ ] **Focus clavier visible** (`:focus-visible`) sur liens et boutons — testé à la tabulation.
- [ ] Icônes décoratives ignorées du lecteur d'écran ; icônes porteuses de sens → `aria-label`.
- [ ] Un seul `<h1>` par page, puis `h2`/`h3` dans l'ordre.

## 7. 🟠 Technique & perf

- [ ] Console navigateur **sans erreur** (404 d'asset, JS qui jette).
- [ ] HTTPS forcé, aucun mixed-content.
- [ ] Lighthouse › Performance (mobile) ≥ **80**.
- [ ] `robots.txt` conforme au souhait du client — **une préproduction est en `noindex`**.
- [ ] 🆕 **Aucune version concurrente du site n'est indexable en même temps.** Deux sites au
      même contenu tous deux visibles → Google en choisit un et on perd sur les deux.

## 8. 🔴 Livraison & passation

- [ ] **Aperçu validé par le référent métier unique** (1 passe, pas 3 canaux).
- [ ] Version livrée **taguée** dans le dépôt (`git tag livraison-<client>-vN`).
- [ ] Handoff écrit : « pour toute modification, un mail » — pas de CMS sur une vitrine.
- [ ] Accès et sauvegardes clarifiés — *déjà répondu au §0, on vérifie juste que rien n'a changé*.
- [ ] 🆕 **Preuve de mise en ligne, depuis l'extérieur.** Choisir une **phrase-témoin** propre à
      la nouvelle version et la chercher sur le site public :
      `curl -s <url> | grep -c "<phrase-témoin>"` → doit renvoyer ≥ 1.
      *(Cas #0 : la phrase-témoin était « chef d'entreprise », qui remplaçait « dirigeant ».
      Cinq semaines après la livraison, le site public affichait encore « dirigeant » — la
      preuve, en une commande, que rien n'était en ligne. Personne ne l'avait vérifiée.)*
- [ ] 🆕 **Date de mise en ligne inscrite** — c'est elle qui fait courir le forfait de suivi.
      Tant qu'elle est vide, le compteur n'a pas démarré, et le client doit le savoir.
- [ ] **Témoignage demandé** une fois le client satisfait.

---

## Bloc de sortie (à remplir par site)

```
SITE            : ____________________     VERSION LIVRÉE : ______
PHRASE-TÉMOIN   : ____________________     vérifiée en ligne : ☐
DATE GO-LIVE    : ____________________     ← démarre le forfait de suivi
QUI A DÉPLOYÉ   : ____________________

🔴 BLOQUANTS RESTANTS : _____________________________________
🟠 FINITIONS V1.1     : _____________________________________

RÉFÉRENT VALIDANT : _______________   TÉMOIGNAGE : ☐ demandé ☐ reçu
```

---

## Journal des versions

**v2 — 06/08/2026**
- **§0 Faisabilité de livraison** créé et placé **avant la première maquette** : plateforme réelle du client, nature exacte du livrable, qui a la main nommément, nombre d'URLs en jeu. En v1 la question « qui héberge, qui a la main » existait — mais en §8, à la livraison. Trop tard : dans le cas #0, elle a coûté cinq semaines.
- **Geste de validation écrit pour chaque contrôle** (commandes `curl`/`grep`, seuils Lighthouse chiffrés). En v1 les cases se cochaient à l'appréciation.
- **Preuve de mise en ligne par phrase-témoin** — le contrôle qui manquait : une commande dit si le site livré est réellement publié. Dans le cas #0, personne ne l'a fait pendant cinq semaines.
- **Date de go-live inscrite**, parce qu'elle fait courir le forfait de suivi.
- Email affiché → **test d'envoi obligatoire** (une adresse du projet rebondissait en 550).
- **L'URL ne doit contenir le nom d'aucun autre client** (défaut réel constaté sur les maquettes de prospection).
- **Aucune version concurrente indexable** en même temps.
- Seuils chiffrés : Lighthouse Accessibility ≥ 90, Performance ≥ 80.
- Mentions **interdites** ajoutées à côté des mentions obligatoires.

**v1 — 22/06/2026** — création.
