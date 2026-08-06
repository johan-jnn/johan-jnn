---
id: b6f8acd8-b2ce-4413-b0af-898196181421
overview:
  cover: /content/projects/creative-coding/akaru-cover.png
  slug: creative-coding
  name: Creative Coding
  description: Interactions et animations front-end complexes
  date: 2024-08-19
  category: d9c7dacf-49cc-4075-b488-b15e0efd4451
  tags:
    - gsap
    - vuejs
    - reactjs
    - sass
    - animation
presentation:
  title: Creative Coding - Interactions et animations complexes
  subtitle: Explorations en creative coding — recréations personnelles
    d'interactions de studios web et réalisations professionnelles aux
    animations complexes (alternance chez adb-léon)
---
Cette page regroupe mes explorations autour du **creative coding** et des animations web complexes, sous deux formes différentes : des recréations personnelles d'interactions repérées sur des sites de studios créatifs, et des réalisations professionnelles menées durant mon alternance chez **adb-léon**, où le designer avec qui je travaillais ne manquait jamais d'imagination côté animations.

## Recréations d'interactions de studios créatifs

Deux courtes expérimentations personnelles, réalisées à quelques semaines d'intervalle en août et septembre 2024. Le principe est le même pour les deux : repérer une interaction visuelle marquante sur le site d'un studio créatif, puis la recréer moi-même de zéro pour en comprendre le fonctionnement technique (animations, structure, performances).

### Scroll horizontal — inspiré du studio Akaru

L'idée m'est venue en découvrant le [site du studio Akaru](https://akaru.fr) : un scroll qui se déroule horizontalement plutôt que verticalement, avec des animations au défilement.

![Aperçu du scroll horizontal recréé](/content/projects/creative-coding/akaru-cover.png)

Pour rester fidèle aux technologies du site d'origine, j'ai utilisé **Vue.js** (avec Vite), **GSAP** pour les animations et le système de scroll horizontal, et **SASS** pour le style.

- Code source : [github.com/johan-jnn/horizontal-scroll](https://github.com/johan-jnn/horizontal-scroll)
- Démo : [h3ccd9-5173.csb.app](https://h3ccd9-5173.csb.app/)
- Article détaillé : [johan-janin.com/blog/recode-design-2-akaru-studio](https://johan-janin.com/blog/recode-design-2-akaru-studio)

### Système de cartes déplaçables — inspiré du studio Beaucoup

Même démarche pour cette seconde expérimentation, inspirée cette fois du [site du studio Beaucoup](https://beaucoup.studio) : une grille de "cartes" positionnables et redimensionnables selon des points de rupture (breakpoints).

![Aperçu de la grille de cartes recréée](/content/projects/creative-coding/beaucoup-overview.png)

Stack utilisée : **React** (avec Vite), **GSAP** pour les animations et le déplacement des cartes, **SASS** pour le style.

#### La grille

Un composant `Grid` centralise le comportement de la grille (taille forcée en largeur/hauteur, ou calcul automatique) à partir d'un tableau de "tiles" :

```js
<Grid
  tiles={[LogoTile, MainHeader, Content, QRCodes, Stats]}
  behavior={{ auto_size: "height" }}
/>
```

#### Les cartes et leurs breakpoints

Chaque carte hérite d'une classe utilitaire `TileBuilder` définissant sa position et sa taille (`box: { location, size }`) pour un ou plusieurs `breakpoints`, permettant à la grille de rester responsive selon la largeur/hauteur de son conteneur (ou de la fenêtre) :

```ts
interface BreakPoint {
  width?: { min?: number; max?: number };
  height?: { min?: number; max?: number };
  relativeTo?: "container" | "window" | (string & {});
  name?: string;
  box: TileBox; // { location: {x, y}, size: {width, height} }
}
```

- Code source : [github.com/johan-jnn/tiles-grid](https://github.com/johan-jnn/tiles-grid)
- Démo : [ktgqgn-5173.csb.app](https://ktgqgn-5173.csb.app/)
- Article détaillé : [johan-janin.com/blog/recode-design-1-beaucoup-studio](https://johan-janin.com/blog/recode-design-1-beaucoup-studio)

## Animations complexes en clientèle — alternance chez adb-léon

Durant mon alternance chez adb-léon, une part importante de mon travail a consisté à intégrer les animations imaginées par le designer de l'agence sur les sites de plusieurs clients. Contrairement aux deux recréations personnelles ci-dessus, il ne s'agit pas ici de recréer un effet existant, mais de faire vivre des idées originales avec **GSAP** et **ScrollTrigger**, sur un socle back-end PHP maison commun à tous ces sites.

### Insolites

Site en cours de publication (lien à venir une fois en ligne).

- **Transitions de page animées** : le site n'est pas une SPA, mais en donne l'illusion. Chaque clic sur un lien interne précharge en amont la couleur de thème de la page de destination via une petite API interne, puis anime un cache plein écran de cette couleur pendant la navigation, avant de révéler la nouvelle page.
- **Hero épinglé et scrubbed** : sur la page d'accueil, le scroll fait glisser le logo hors du cadre puis épingle le visuel principal à l'écran, jusqu'à ce que le footer (logo du client en SVG) vienne le repousser hors du champ — plusieurs `ScrollTrigger` chaînés pour un enchaînement fluide.

![](/content/projects/creative-coding/insolites-metiers.png)

### UNIQ (mobilier urbain)

[uniq-mobilierurbain.fr](https://uniq-mobilierurbain.fr/)

- **Empilement d'images épinglées au scroll** : chaque catégorie de produits (abris, mobilier urbain, signalétique) est associée à une image qui se fixe à l'écran pendant son défilement, la suivante venant la recouvrir en fondu — un effet de pile qui rythme la découverte des catégories.
- **Transition en clip-path** : juste avant la section suivante, un `clip-path` piloté par une variable CSS referme progressivement la pile d'images au fil du scroll.

### Atelier Thierry Roche

[atelierthierryroche.fr](https://www.atelierthierryroche.fr/)

- **Révélation d'un média via le texte d'un titre** : un vidéo est joué et visible uniquement au niveau du texte de la section, qui au scroll se révèle pour laisser place à l'entièreté du média.

### Myral

[myral-pro.com](https://www.myral-pro.com/)

- **Révélation par masque SVG animé** : la forme du logo de Myral, épinglée à l'écran, s'ouvre progressivement au scroll pour révéler le contenu en dessous, comme un obturateur d'appareil photo.
- **Compteurs animés** : les statistiques chiffrées s'incrémentent de 0 jusqu'à leur valeur finale au moment où elles entrent dans le viewport, avec un formatage des nombres à la française.

## À propos de ces réalisations

Les deux recréations personnelles étaient conçues dès le départ comme des exercices ponctuels, pas comme des produits à maintenir : chaque dépôt contient la version finale de l'exercice.

Les quatre sites clients, eux, sont des réalisations professionnelles livrées dans le cadre de mon alternance chez adb-léon : je n'en ai pas la propriété et n'interviens plus dessus — ils sont présentés ici uniquement pour la dimension animation/interaction sur laquelle j'ai travaillé.