---
id: 9a3972ba-675c-4c44-8748-f8ffd4ed3e0e
overview:
  cover: /content/projects/desker/cover.jpg
  slug: desker
  name: Desker
  description: Extension de navigateur pour sauvegarder et synchroniser ses
    groupes d'onglets, avant l'arrivée des espaces de travail natifs
  date: 2024-10-06
  category: d0ebc84c-d7cc-4b06-8c31-106cd0e82a36
  tags:
    - wxt
    - saas
    - typescript
    - svelte
---
## Fonctionnalités principales

### Sauvegarde et organisation par "desks"

Chaque desk regroupe un ensemble d'onglets ouverts au moment de sa création. Il peut être librement réordonné, renommé et recoloré, pour retrouver rapidement le bon contexte de travail (recherche, projet, veille, etc.) sans avoir à ré-ouvrir chaque onglet manuellement.

### Restauration en un clic

Appliquer un desk rouvre l'ensemble de ses onglets tel qu'il a été sauvegardé, permettant de basculer rapidement d'un contexte de navigation à un autre.

### Synchronisation multi-appareils sans compte obligatoire

Le point différenciant de Desker : les desks se synchronisent sur tous les appareils de l'utilisateur, tout en pouvant être essayé **sans création de compte**. Un compte (et un abonnement, via les pages CGV du site) n'était nécessaire que pour débloquer la synchronisation complète.

### Interface minimaliste

Le site met en avant une interface volontairement simple, pensée pour la productivité plutôt que pour la richesse fonctionnelle.

<video loop muted autoplay playsinline>
  <source src="/content/projects/desker/presentation.webm" type="video/webm">
</video>

## Outils utilisés


| Outil/Framework | Rôle |
| --------------- | ----------------------------------------------------------------------------- |
| WXT | Framework de build pour l'extension de navigateur (compatible Chrome/Firefox) |
| Svelte | UI de l'extension (popup, options) et du site |
| SvelteKit | Structure du site vitrine et de l'espace compte/abonnement |
| TypeScript | Langage utilisé sur les deux dépôts |
| Netlify | Hébergement et déploiement du site |


## Architecture

L'extension suit la structure standard d'un projet WXT : un `background.ts` pour la logique persistante et les événements du navigateur, un `content.ts` injecté dans les pages, et des points d'entrée `popup`/`options` en Svelte pour l'interface utilisateur. La logique métier est isolée dans `src/services` avec deux modules dédiés : `desks.ts` (gestion des desks : création, édition, synchronisation) et `user.ts` (gestion du compte et de l'abonnement lié à la synchronisation).

Le site, bâti en SvelteKit, sert à la fois de vitrine marketing (page d'accueil reprise dans `desker.html`) et de back-office léger : gestion de compte, abonnement et pages légales (CGU, CGV, mentions légales), signe que le modèle économique reposait sur un plan payant pour la synchronisation.

## Pourquoi le projet est à l'arrêt

Desker n'est aujourd'hui plus maintenu. Le projet a été pensé à un moment où la gestion de groupes d'onglets persistants n'existait pas nativement dans les navigateurs. Depuis, Chrome, Firefox et Edge ont tous introduit leurs propres **espaces de travail**/groupes d'onglets sauvegardés et synchronisés en natif, rendant une extension tierce dédiée à ce seul usage redondante pour la plupart des utilisateurs. Plutôt que de continuer à maintenir une extension concurrençant des fonctionnalités désormais intégrées au navigateur, le développement de Desker s'est arrêté (dernier commit sur les deux dépôts le 23 septembre 2024).

## Code source

Le code source de Desker est disponible sur l'organisation GitHub du projet :

- [Code source de l'extension](https://github.com/Desker-App/extension)
- [Code source du site web](https://github.com/Desker-App/website)

