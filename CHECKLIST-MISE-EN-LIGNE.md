# Checklist de mise en ligne — feuille réutilisable

> Outil **go-live** : à repasser AVANT chaque livraison de site, sur tous les cabinets.
> But : ne livrer **aucune saloperie** (lien mort, donnée inventée, faille RGPD, détail amateur).
> ≠ de la `GRILLE-AUDIT-WEB.md` (elle, c'est pour *gagner* le deal en notant l'ancien site).
> Règle d'or : **aucune donnée affichée sans source vérifiée** (adresse, tél, chiffre, claim).
> Auteur : Benjamin Delpech.

## Mode d'emploi
Coche chaque ligne. Tout ce qui est **🔴 bloquant** doit être vert avant la mise en ligne.
Les **🟠 finitions** peuvent partir en V1.1 si le client presse, mais on les note.

---

## 1. 🔴 Données & contenu — « zéro invention »
- [ ] Chaque **adresse** affichée est copiée du site/source officielle (pas de mémoire, pas de supposition).
- [ ] Chaque **téléphone / email** testé : il sonne / il existe.
- [ ] Chaque **chiffre** (années d'exercice, nb de collaborateurs, délais légaux) est sourcé.
- [ ] Aucun **claim réglementé** non validé par le référent métier (ex. « gratuit », « n°1 », délais).
- [ ] **Orthographe des noms propres** (titulaire, ville, raison sociale) vérifiée caractère par caractère.
- [ ] Mentions imposées par l'ordre/la profession présentes (ex. « désigné par ordonnance », n° d'inscription).

## 2. 🔴 Liens & navigation — « rien de mort »
- [ ] **Tous** les liens externes testés → statut **200** (script : boucle `curl -o /dev/null -w "%{http_code}"`).
- [ ] Tous les liens internes / ancres (`#contacts`…) pointent vers une cible existante.
- [ ] Les liens vers le **back-office** (Gemweb / espace client) ouvrent la bonne page par profil.
- [ ] Aucun lien `href="#"` ou `href=""` oublié.
- [ ] Liens externes sensibles en `target=_blank` → `rel="noopener noreferrer"`.

## 3. 🔴 RGPD & juridique (cabinets = exigence forte)
- [ ] **Polices auto-hébergées** (pas de Google Fonts depuis le CDN Google — jurisprudence CNIL/DE).
- [ ] Aucun tracker tiers non déclaré (pas de GA/Maps/embed qui pose un cookie sans consentement).
- [ ] Page **Mentions légales** accessible + à jour (éditeur, directeur publication, hébergeur, SIRET/RCS).
- [ ] Page / mention **politique de confidentialité** si formulaire ou donnée collectée.
- [ ] Formulaires : pas d'envoi de donnée perso sans base légale + mention.

## 4. 🟠 SEO & partage — « pro au premier regard »
- [ ] `<title>` unique et descriptif (nom + métier + ville).
- [ ] `<meta name="description">` présente (~150 car.).
- [ ] **Favicon** présent (pas l'icône blanche par défaut du navigateur).
- [ ] Balises **Open Graph** (`og:title`, `og:description`, `og:image`) → joli aperçu en mail/LinkedIn.
- [ ] `lang` correct sur `<html>`. URL canonique si besoin.

## 5. 🔴 Responsive & rendu
- [ ] Test **mobile ~390 px** : rien ne déborde, pas de scroll horizontal, textes lisibles.
- [ ] Test **tablette ~768 px** et desktop large.
- [ ] **Téléphones cliquables** (`tel:`) et emails (`mailto:`) — friction zéro sur mobile.
- [ ] Images dimensionnées/optimisées (pas de 4 Mo en hero) ; `alt` sur les `<img>` informatives.
- [ ] Le site reste correct **sans JS** (parallaxe, accordéons = dégradation propre).

## 6. 🟠 Accessibilité (a11y) — minimum décent
- [ ] Contraste texte/fond suffisant (surtout texte blanc sur image → voile assez sombre).
- [ ] **Focus clavier visible** (`:focus-visible`) sur liens et boutons.
- [ ] Icônes décoratives ignorées du lecteur d'écran ; icônes porteuses de sens → `aria-label`/`<title>`.
- [ ] Ordre de titres cohérent (un seul `<h1>`, puis `h2`/`h3`).

## 7. 🟠 Technique & perf
- [ ] Console navigateur **sans erreur** (404 d'asset, JS qui jette).
- [ ] HTTPS forcé, pas de mixed-content (asset en `http://`).
- [ ] Temps de chargement raisonnable (hero compressé, polices `display=swap` ou self-host).
- [ ] `robots.txt` / indexation conforme au souhait du client (ne pas indexer une préprod).

## 8. 🔴 Livraison & passation
- [ ] **Aperçu validé par le référent métier unique** (1 passe, pas 3 canaux) — cf. PLAYBOOK.
- [ ] Version livrée **taguée** dans le repo (ex. `v/19.html` → release).
- [ ] Handoff écrit : « pour toute modif, un mail » — **pas de CMS** sur une vitrine qui pointe vers le back-office.
- [ ] Sauvegarde / accès hébergement clarifiés (qui héberge, qui a la main, renouvellement domaine).
- [ ] **Témoignage demandé** une fois le client satisfait (capital prospection).

---

## Bloc de sortie (à remplir par site)

```
Site        : ____________________      Version livrée : ______
Date go-live: ____________________
🔴 Bloquants restants : ______________________________________
🟠 Finitions V1.1     : ______________________________________
Validé par (référent) : _______________   Témoignage : ☐ demandé ☐ reçu
```
