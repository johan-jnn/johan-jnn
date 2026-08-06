---
id: b679f1e5-daee-452b-84f7-af61f60911c0
overview:
  cover: /content/projects/tech-paf/homepage.png
  slug: tech-paf
  name: Site Web Tech-Paf
  description: Site full-stack du BDE Tech-Paf
  date: 2024-10-06
  category: 20aca93e-88af-4880-b7d3-eb528b9da7a6
  tags:
    - sveltekit
    - stripe
    - supabase
    - notion
    - api
presentation:
  title: Site Web Tech-Paf - Site du BDE de mon école
  subtitle: Site full-stack du BDE Tech-Paf (My Digital School Lyon) — connexion
    Google, inscription aux événements, paiement en ligne...
related_projects:
  - 9a3972ba-675c-4c44-8748-f8ffd4ed3e0e
  - b6f8acd8-b2ce-4413-b0af-898196181421
---
**Tech-Paf** est l'ancien BDE (Bureau des Étudiants) de **My Digital School Lyon**. En tant que membre du bureau et responsable du site web, j'ai conçu et développé de A à Z la plateforme officielle destinée à centraliser la vie étudiante du campus : actualités, événements et inscriptions.

![Page d'accueil du site Tech-Paf](/content/projects/tech-paf/homepage.png)

## Fonctionnalités principales

### Connexion et compte utilisateur

Les étudiants se connectent directement avec leur compte Google. Une fois authentifiés, ils peuvent compléter leur profil (notamment leur numéro de téléphone) pour ne manquer aucune actualisation importante liée aux événements auxquels ils sont inscrits.

### Calendrier et inscription aux événements

Un calendrier interactif liste l'ensemble des événements du BDE. Les utilisateurs connectés peuvent s'y inscrire en un clic ; leurs inscriptions sont enregistrées dans **Supabase** et consultables/modifiables à tout moment.

![Calendrier des événements](/content/projects/tech-paf/calendar.png)

La page dédiée à un événement récapitule ses informations (lieu, horaires, description) et permet de s'y inscrire directement.

![Page détaillée d'un événement](/content/projects/tech-paf/event_page.png)

### Événements payants

Certains événements nécessitent un paiement pour valider l'inscription. L'intégration de **Stripe** permet aux étudiants de régler directement depuis le site, sans sortir du parcours d'inscription.

![Dashboard Stripe des paiements](/content/projects/tech-paf/stripe.png)

### Blog et actualités piloté par Notion

Plutôt que de développer un éditeur de contenu, les articles de blog et les événements sont rédigés dans **Notion** par les membres du bureau, puis récupérés dynamiquement par un **Back-end For Front-end (BFF)** qui les transforme en pages du site.

![Espace Notion utilisé comme CMS](/content/projects/tech-paf/notion.png)

![Page d'un article de blog](/content/projects/tech-paf/blog.png)

## Outils utilisés


| Outil/Framework | Rôle |
| --------------- | -------------------------------------------------------------- |
| Svelte | Interface du site |
| Supabase | Base de données (comptes, inscriptions aux événements) |
| Stripe | Paiement en ligne des événements payants |
| Notion | CMS pour les articles de blog et la description des événements |
| Netlify | Hébergement et déploiement |


## Pourquoi le projet est à l'arrêt

Le site a été développé pour le mandat du BDE Tech-Paf dont je faisais partie. Une fois ce mandat terminé et le bureau renouvelé, je n'avais plus la responsabilité du site. Le développement s'est arrêté début 2025, à la fin de mon implication dans l'association.

## Code source

Le code source du site est disponible sur GitHub : [github.com/johan-jnn/tech-paf-bde-website](https://github.com/johan-jnn/tech-paf-bde-website).