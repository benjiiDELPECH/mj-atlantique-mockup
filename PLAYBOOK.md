# Playbook — Refonte de site pour professions juridiques réglementées

> Process **répétable** pour vendre + livrer une refonte de site à des cabinets
> (mandataires judiciaires, avocats, notaires, experts-comptables).
> Objectif : **moderniser la crédibilité perçue sans casser le fonctionnel.**
> Cas #0 = MJ Atlantique (Me Delphine Raymond). Auteur : Benjamin Delpech.

## L'argumentaire (le « pourquoi » à dire au prospect)
- On est jugé **en 5 secondes**, et **~46 % du jugement se fait sur le seul design** (Stanford). 
- Vos clients passent **~90 % de leur temps sur Google / Apple / Microsoft / ChatGPT** → leurs **attentes visuelles se calibrent là**. Un site aux codes 2005 (fond beige, gros boutons, carrousel clignotant) = **perte de crédibilité**, même si vous êtes excellent.
- On **aligne votre image** sur ces standards **sans toucher au fonctionnel** (espaces clients, déclarations, prise de RDV).
- Cadre objectif, pas « au feeling » : les **4 axes de crédibilité de Fogg** (surface / présumée / réputée / gagnée). Voir `GRILLE-AUDIT-WEB.md`.

## Le process en 6 étapes
| # | Étape | Sortie | Outil |
|---|---|---|---|
| 0 | **Prospection** | liste de cabinets ciblés | annuaires officiels (CNAJMj pour mandataires, Ordre des avocats, notaires.fr, annuaire OEC) |
| 1 | **Audit express (~20 min)** | score /44 + 1 atout + 3 quick wins | `GRILLE-AUDIT-WEB.md` ← **l'accroche commerciale** |
| 2 | **Benchmark sectoriel** | codes métier extraits (couleurs, accès par profil, mentions clés) | 3 références du secteur |
| 3 | **2 directions abouties** | 2 maquettes au choix (jamais page blanche) | galerie versionnée GitHub Pages |
| 4 | **Feedback canalisé** | retours validés en 1 passe | **checklist client ci-dessous** (1 seul canal !) |
| 5 | **Mise en ligne + handoff** | site livré + mentions légales | déploiement + transfert |

> ⚠️ **Leçon du cas #0** : le feedback est arrivé **éclaté** (WhatsApp + email, chiffres changeants 9→10). Pour 1 client ça passe ; **pour 10, tu te noies.** D'où la checklist ci-dessous, à faire remplir **en une fois**.

## Checklist de validation client (à faire remplir AVANT mise en ligne)
- [ ] **Direction** retenue : A / B
- [ ] **Photo** définitive (haute résolution)
- [ ] **Accroche / signature** validée mot pour mot
- [ ] **Chiffres clés** confirmés : ancienneté, taille d'équipe, nb d'implantations
- [ ] **Mentions pro** : n° d'inscription / SIREN — afficher ou non ?
- [ ] **Coordonnées** de chaque implantation (adresse, tél, email)
- [ ] **Périmètre** des services / entrées par profil
- [ ] **Nom de domaine** + qui héberge (handoff)

## Calibrage sectoriel (à NE pas oublier)
Pour une profession **judiciaire**, la crédibilité repose surtout sur la **réputée** (Tribunal, ordre, annuaire) et la **gagnée** (ancienneté, vraie adresse, vraie photo) — **pas** sur le « flashy ». Moderniser = signaler le **sérieux institutionnel**, pas le startup.
→ Corollaire : **éviter le carrousel auto-défilant** (code daté + pénalité UX). Préférer un hero sobre (cf. direction A de MJ Atlantique).

## Le vrai actif réutilisable
Ce n'est pas la peau, c'est le **squelette fonctionnel** : accès « Mon espace » par profil, déclaration en ligne (créance, etc.), prise de RDV, bloc pédagogique du métier, présentation du dirigeant. **À templatiser.**

## Cas #0 — MJ Atlantique (preuve)
Retours cliente : « un vrai plus », « **le grand bond en avant** 💪 », « bons retours de l'étude ». → **Témoignage à capturer** pour la prospection suivante.

## Règle : 1 référent métier unique côté client
Nommer **une seule personne** côté cabinet (souvent un collaborateur / stagiaire motivé) qui :
- **valide le métier** (terminologie, procédures, exactitude — crucial sur un site juridique) ;
- **centralise les retours** de l'équipe et te les transmet **en une passe**.
→ Ça résout le **feedback éclaté** (le point faible du cas #0 : retours par WhatsApp + mail + chiffres changeants). Cas #0 = **Giuliano** (stagiaire mandataire). Le titulaire (ex. Delphine) garde la décision finale (design, choix de direction) ; le référent fait le métier + le canal.

## Archi : on HABILLE le backend existant, on ne le réécrit pas
Beaucoup d'études tournent sur un **logiciel métier** (ex. Gemweb / `webmandataire.fr` / Gemarcur) qui fournit la **recherche de dossier/actif/reprise** + l'**espace connecté sécurisé** (données confidentielles, RGPD).
- La **vitrine moderne** = statique, hébergée libre (GitHub Pages / Netlify / Vercel), **indépendante**.
- Pour le fonctionnel : **on LIE** la vitrine vers les pages du backend existant (1 lien par bouton). **On ne réécrit JAMAIS** ce backend (données sensibles + RGPD + suicide commercial face à l'éditeur métier).
- **Question de validation** (au référent) : *« la recherche de dossier / l'espace connecté sont-ils vraiment utilisés, ou presque pas ? »* → décide si on lie proprement ou si on simplifie.
- 💡 **Levier de scale** : si le backend (Gemweb) est le **standard du secteur**, le même pattern de vitrine se reproduit chez tout cabinet sous ce backend → on change juste les liens + le contenu.

## Argumentaire SELON la profession (ne pas se tromper de promesse)
- **Mandataires judiciaires** : ils sont **désignés par le Tribunal**, pas choisis → vends l'**opérationnel** (déflection des contacts répétitifs créanciers/salariés) + l'**amiable** (mandat ad hoc / conciliation, le seul segment où le dirigeant choisit) + la crédibilité. **JAMAIS « on vous ramène des dossiers ».**
- **Avocats / notaires / experts-comptables** : ils **sont choisis** → là, **acquisition + crédibilité** est le pitch fort.
