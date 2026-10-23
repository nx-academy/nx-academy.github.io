# Thème d'automne — fonctionnement & maintenance

> **Statut : implémenté (octobre 2026).** Un thème saisonnier posé par-dessus
> clair ou sombre, actif du 1er octobre au 30 novembre, avec un décor en pixel
> art qui évolue au fil de la saison. Ce document décrit comment il marche, ce
> qu'il faut savoir avant d'y toucher, et comment s'en resservir pour une autre
> saison.

---

## Ce que voit le lecteur

- Des **couleurs de sous-bois** : papier kraft et rouille en clair, brun-noir et
  orange en sombre. Le choix clair / sombre du lecteur est respecté.
- Des **branches** sous le header : grandes sur l'accueil, petites et limitées
  aux marges ailleurs (à partir de 1 280 px de large).
- Des **feuilles qui tombent** dans les marges latérales, jamais sur le texte (à
  partir de 1 300 px).
- Un **tapis de feuilles** au-dessus du footer, avec un hérisson qui dort dedans
  et un écureuil qui traverse toutes les 45 secondes environ.
- Une **saison qui avance** : les branches se dégarnissent et le tapis
  s'épaissit de semaine en semaine.
- Deux **easter eggs**, à la souris : un clic sur une branche décroche la
  feuille la plus proche ; trois clics sur le hérisson le font partir.
- Un **bouton feuille d'érable** dans le header (et dans l'overlay mobile) pour
  couper ou remettre l'automne.

## Comment ça marche

| Fichier                                 | Rôle                                                                       |
| --------------------------------------- | -------------------------------------------------------------------------- |
| `src/utils/season/index.ts`             | **Toute la logique** : calendrier, avancée, pixellisation, tapis. Testée.  |
| `src/data/autumn.ts`                    | Les sprites (feuilles, hérisson, écureuil) et le tracé des deux branches   |
| `src/types/Autumn.ts`                   | Les types du décor                                                         |
| `public/styles/theme.css`               | Les couleurs : `html.season-autumn.theme-light` et `.theme-dark`           |
| `src/styles/autumn.css`                 | Le décor : placement, animations, mouvement réduit                         |
| `src/components/AutumnSprites.astro`    | Les `<symbol>` partagés, déclarés une fois par page ; importe `autumn.css` |
| `src/components/AutumnBranches.astro`   | Les branches (`variant="large"` sur l'accueil, `"small"` ailleurs)         |
| `src/components/AutumnFall.astro`       | Les feuilles qui tombent dans les marges                                   |
| `src/components/AutumnGround.astro`     | Le tapis, le hérisson, l'écureuil, le message de départ du hérisson        |
| `src/components/AutumnEasterEggs.astro` | Le seul JS client du thème : les deux easter eggs, en vanilla              |
| `src/layouts/BaseLayout.astro`          | Le script inline qui pose les classes, et le branchement des composants    |
| `src/components/Header.astro`           | Les deux boutons feuille d'érable et leur logique                          |
| `.github/workflows/deploy.yml`          | Le build planifié du lundi (`schedule`), qui fait avancer la saison        |

### Deux moments distincts : le build et le navigateur

**Au build**, `shouldRenderAutumn(new Date())` décide si le décor est généré. Il
l'est pendant la saison et pendant les sept jours qui précèdent
(`PREVIEW_DAYS`), pour que le décor soit en ligne le 1er octobre même si le
build du lundi tombe avant. L'avancée de la saison (`autumnProgress`) fige à ce
moment l'état des branches, du tapis et de la chute.

**Dans le navigateur**, le script inline de `BaseLayout` décide si l'automne
s'affiche, avec la date du lecteur :

- pendant la saison, il pose `season-available` sur `<html>` (ce qui fait
  apparaître les boutons feuille d'érable) ;
- et `season-autumn` (ce qui applique couleurs et décor), sauf si le lecteur a
  coupé l'automne cette année.

Le décor est donc toujours généré un peu en avance et masqué tant que
`season-autumn` n'est pas posé (`.au-deco` en `display: none`). Après le 30
novembre, le navigateur coupe l'automne tout seul, même si le dernier build
contient encore le décor.

### Deux réglages indépendants

| Clé `localStorage` | Valeurs                     | Rôle                                          |
| ------------------ | --------------------------- | --------------------------------------------- |
| `theme`            | `theme-light`, `theme-dark` | Inchangée : clair ou sombre                   |
| `season`           | absente, ou `classic-AAAA`  | `classic-2026` : automne coupé pour 2026 seul |

Couper l'automne enregistre l'année. L'automne revient donc par défaut l'année
suivante, sans rien migrer.

## La saison qui avance

`autumnProgress(date)` vaut 0 le 1er octobre et 1 le 30 novembre. Trois choses
en dépendent :

- **les feuilles des branches** : chacune a un seuil `fallsAt` dans
  `src/data/autumn.ts`. Elle est dessinée tant que la saison ne l'a pas atteint.
  La feuille rousse du bout de la branche gauche a un seuil de 1,5 : c'est la
  dernière, elle tient jusqu'au bout ;
- **le tapis** : un cinquième le 1er octobre, complet le 30 novembre
  (`carpetCoverage`). Le tirage est stable (graine fixe), donc une feuille posée
  ne bouge plus d'un build à l'autre ;
- **la chute** : jusqu'à six feuilles mi-saison, une seule au début et à la fin
  (`fallingLeafCount`).

Comme le site est statique, la saison n'avance qu'au build. D'où le `schedule`
du lundi à 5 h UTC dans `deploy.yml`.

## Le pixel art

Un pixel du décor vaut 4 px à l'échelle 1 (`PIXEL`). Les sprites sont écrits à
la main dans `src/data/autumn.ts`, une chaîne par ligne, « . » pour un pixel
vide. Chaque lettre correspond à une classe CSS (`au-gold-a`, `au-hh-spike`…),
dont la couleur est définie dans `autumn.css`.

Les branches ne sont pas dessinées pixel par pixel : ce sont des courbes de
Bézier (`BranchCurve`) que `branchRects` pixellise, avec trois tons (lumière
dessus, ombre dessous). Pour modifier une branche, on déplace des points de
contrôle, en cellules.

Les rotations restent des multiples de 90° et les animations passent par
`steps()` : une rotation libre casserait la grille de pixels.

## Accessibilité et poids

- Tout le décor est en `aria-hidden`. Seul le message de départ du hérisson est
  annoncé (`role="status"`).
- Avec `prefers-reduced-motion: reduce`, rien ne bouge : la chute et l'écureuil
  disparaissent, les branches et le tapis restent, immobiles. Les easter eggs
  passent en fondu.
- Les easter eggs sont à la souris seulement, assumés comme tels.
- Coût mesuré en octobre 2026 : environ 66 Ko de HTML par page, à peu près 8 Ko
  compressés. Aucun JS client hors easter eggs.

## Pièges connus

- **Le groupe de thèmes de l'overlay mobile** contient la feuille d'érable.
  `syncThemeButtons` ne doit viser que `button[data-theme]`, sinon il remet la
  feuille à « non enfoncée » à chaque changement clair / sombre, et le bouton
  semble ne plus marcher (corrigé en octobre 2026).
- **Les offsets de Web Animations** doivent rester dans [0, 1] : `0.2 + 0.8`
  donne 1,0000000000000002 et `animate()` refuse toute l'animation. D'où le
  `Math.min(1, …)` dans le départ du hérisson.
- **Les petites branches** ne doivent jamais dépasser la marge, sinon elles
  passent sur le fil d'Ariane. Leur largeur est calculée depuis
  `(100vw - 1100px) / 2`.
- **Chrome headless** impose une largeur de fenêtre minimale : une capture à 400
  px semble rogner la page alors que le rendu réel est correct. Vérifier à 520
  px, ou en émulation mobile via le protocole de debug.

## L'an prochain, et les autres saisons

**Rien à faire pour l'automne 2027** : le calendrier est annuel, le décor sera
généré à partir du 24 septembre et le choix « automne coupé » de 2026 expirera.

Pour **désactiver le thème** sans le supprimer, le plus simple est de faire
renvoyer `false` à `shouldRenderAutumn` et de retirer le bloc « Thème d'automne
» du script inline, comme on l'a fait pour l'été (#393).

Pour **un autre thème saisonnier** (l'hiver et la neige, par exemple), le
découpage se réutilise tel quel : une classe `season-*` posée par le script
inline, des couleurs dans `theme.css`, une util de calendrier testée, des
composants de décor générés au build et masqués par défaut.
