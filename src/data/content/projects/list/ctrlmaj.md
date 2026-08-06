---
id: c4419443-013a-46c4-9da5-844255a14be8
overview:
  cover: /content/projects/ctrlmaj/page-listing.png
  slug: ctrlmaj
  name: CtrlMaj
  description: CMS sur-mesure Laravel & Filament pour l'agence Adb-Léon
  date: 2025-05-19
  category: e80f7790-bfc0-4c1e-bf89-ada2c191d589
  tags:
    - laravel
    - filament
    - php
    - cms
    - vite
presentation:
  title: CtrlMaj - Le CMS de l'agence Adb-Léon
gallery:
  - /content/projects/ctrlmaj/routing-system.png
  - /content/projects/ctrlmaj/request-workflow.png
related_projects:
  - b488bea1-0fdf-47a0-8e11-7699e597134c
  - b6f8acd8-b2ce-4413-b0af-898196181421
---
## Description

CtrlMaj est le CMS interne de l'agence web **[Adb-Léon](https://adb-leon.fr)**, où j'ai été accueilli en tant que stagiaire puis alternant. Basé sur **Laravel 12** et **Filament 4**, il est pensé pour accélérer la création de sites vitrines multi-langues tout en restant assez flexible pour des projets plus complexes.

Le CMS existait avant mon arrivée sous une première version conçue par [Mathias Bouvier](https://www.linkedin.com/in/mathias-bouvier-6025a893/). Après avoir mené des entretiens avec les développeurs, intégrateurs et chefs de projet de l'agence, ainsi qu'un audit complet de l'ancien CMS (20+ tables, 47 fonctionnalités à conserver, 32 problèmes identifiés), j'ai rédigé un cahier des charges de 15 pages puis **entièrement recréé CtrlMaj à partir de zéro**, seul, de la conception à la mise en production, dans le cadre de mon alternance.

![Tableau de bord](/content/projects/ctrlmaj/dashboard.png)

## L'agence Adb-Léon

**[Adb-Léon](https://adb-leon.fr)** est l'agence web qui m'a accueilli en stage puis en alternance. Elle conçoit des sites vitrines pour ses clients, et utilisait jusque-là un CMS propriétaire vieillissant pour les produire : code legacy difficile à maintenir, expérience développeur médiocre, performances limitées (scores Lighthouse parfois inférieurs à 70) et absence de standardisation entre les projets. C'est ce constat qui a motivé la refonte complète du CMS que je leur ai livrée avec CtrlMaj.

## Principes clés

### Pages génériques vs contenu

Chaque page du site est représentée par une entrée générique (métadonnées, langues disponibles, relations vers d'autres pages) reliée à une table de contenu spécifique à son type. Cela permet au back-office de lister l'ensemble des pages d'un site sans avoir à charger des structures de données différentes à chaque fois.

### Trois types de pages de contenu

- **Singletons** : pages uniques (ex : "À propos", "Contact"), avec gestion de brouillons via un champ d'activation.
- **Duplicables** : pages multiples au contenu variable (ex : "Actualités", "Réalisations").
- **Catégories** : pages conteneurs regroupant d'autres pages (ex : un "Blog" contenant des articles).

![Liste des projets](/content/projects/ctrlmaj/page-listing.png)

![Edition d'un projet](/content/projects/ctrlmaj/page-edition.png)

## Fonctionnalités principales

- **Multi-langues natif** : chaque page peut exister dans plusieurs langues, avec ses propres métadonnées.
- **Génération de code via Artisan** : des commandes dédiées permettent de créer rapidement des resources, pages et clusters Filament (ex : `make:cms-menu`).
- **Snapshots** : sauvegarde et restauration de l'état du contenu d'un site, utile pour récupérer un projet existant sans repartir de zéro.
- **Intégration Vite** : compilation moderne des assets front-end (TypeScript, SCSS) directement liée à Laravel.
- **Déploiement outillé** : le projet embarque sa propre configuration de déploiement (Deployer) et ses workflows GitHub Actions.

![Commandes pour créer des pages](/content/projects/ctrlmaj/content-commands.png)

![Configuration de la homepage](/content/projects/ctrlmaj/page-configurations.png)

## Outils utilisés


| Outil/Framework | Rôle |
| --------------- | -------------------------------- |
| Laravel 12 | Structure générale du projet |
| Filament 4 | Génération du back-office |
| Blade | Templating des pages HTML |
| Vite | Compilation des assets front-end |


## Chiffres clés

- **~20 semaines** de développement (conception, cœur du CMS, générateurs de code, snapshots, optimisations, documentation, formation de l'équipe)
- **10+ commandes Artisan** dédiées à la génération de code

## Perspectives futures

CtrlMaj reste en développement actif au sein d'Adb-Léon, avec des évolutions régulières du back-office et des templates fournis aux intégrateurs de l'agence. Parmi les pistes envisagées : un système de plugins pour étendre le CMS projet par projet, et à plus long terme une éventuelle ouverture du projet.

## Code source

Le code source de CtrlMaj est hébergé sur un dépôt GitHub privé, propriété d'Adb-Léon : [github.com/Leonlacom/ctrlmaj](https://github.com/Leonlacom/ctrlmaj).