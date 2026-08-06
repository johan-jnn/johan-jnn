---
id: 5f793341-9359-43c8-adb2-d2e466095865
overview:
  cover: /content/projects/jemibou/command_list.png
  slug: jemibou
  name: Jemibou
  description: Robot Discord multi-fonctions avec dashboard web
  date: 2021-06-27
  category: 0032d7dc-bdb9-4b11-8b05-9df8e2ef0aaa
  tags:
    - nodejs
    - discord
    - dashboard
presentation:
  title: Jemibou - Robot Discord multi-fonctions
  subtitle: Robot Discord multi-fonctions avec sa propre base de données JSON et
    son dashboard web, configurable serveur par serveur
related_projects:
  - 1b35a217-2bf9-42c6-a165-76684cd1bce6
---
**Jemibou** est l'un des robots Discord les plus avancés que j'ai développés. Il embarque sa propre base de données interne (basée sur du JSON ou les message d'un salon discord défini) et un site web relié directement à son comportement, permettant de personnaliser le robot indépendamment pour chaque serveur Discord sur lequel il est installé.

Le robot n'est plus actif aujourd'hui, mais reste consultable en vidéo ci-dessous.



## Un salon Discord comme premier dashboard

Avant même d'avoir un site web, la version 1.5.0 de Jemibou utilisait une idée un peu insolite : un **salon Discord dédié servait de panneau de configuration**. Le principe :

1. Un salon est assigné aux paramètres du robot sur le serveur.
2. Chaque paramètre s'y modifie en écrivant `<nom_du_paramètre> = <valeur_du_paramètre>`.
3. Le robot lit et applique directement le contenu de ce salon.

L'avantage : aucune base de données à héberger, Discord faisant lui-même office de stockage. L'inconvénient : la lecture de tous les messages d'un salon pour en extraire les paramètres est lente. C'est ce qui a motivé la création d'un vrai site web avec dashboard — sans pour autant retirer cette fonctionnalité historique du robot.

## Le site web

### Page d'accueil

Le header met en avant des statistiques en direct : nombre de serveurs, nombre d'utilisateurs gérés et temps de fonctionnement (uptime) du robot.

![](/content/projects/jemibou/header.png)

### Liste des commandes

La liste des commandes disponibles et leur description sont récupérées dynamiquement depuis le robot pour rester toujours à jour.

![Liste des commandes du robot](/content/projects/jemibou/command_list.png)

Quelques commandes notables : `settings` pour configurer le robot, `roletoall` pour attribuer un rôle à tous les membres, `search` pour interroger Google/Wikipédia/GitHub en une seule commande, `customfont` pour styliser du texte, ou encore `game` pour jouer directement depuis Discord — le robot comptait une vingtaine de commandes au total, de la modération (`ban`, `kick`, `clear`) aux utilitaires (`translate`, `poll`, `avatar`).

### Footer

Le footer présente le développeur ainsi que le dernier changelog du robot, récupéré dynamiquement depuis un fichier `changelog.md`.

![Footer avec le dernier changelog du robot](/content/projects/jemibou/latest_changelog.png)

## Le dashboard

Le site sert avant tout de dashboard pour configurer le comportement du robot par serveur : préfixe des commandes, liste de mots interdits, messages de bienvenue et d'au revoir (avec choix du salon, variables dynamiques, rôles attribués automatiquement, et possibilité de désactivation).

![Interface du dashboard, écran 1](/content/projects/jemibou/screen1.png)
![Interface du dashboard, écran 2](/content/projects/jemibou/screen2.png)
![Interface du dashboard, écran 3](/content/projects/jemibou/screen3.png)

### Connexion et sélection du serveur

L'accès au dashboard se fait via l'authentification Discord de l'utilisateur, qui récupère ainsi la liste des serveurs où il a les permissions nécessaires pour configurer le robot.

![Interface de connexion via Discord](/content/projects/jemibou/discord_connection.png)

La liste des serveurs affichée dépend ensuite de trois cas : serveur non accessible à l'utilisateur (masqué), robot absent du serveur (mis en avant différemment, redirige vers l'ajout du robot), ou serveur normalement configurable (accès direct au dashboard).

![Liste des serveurs Discord de l'utilisateur](/content/projects/jemibou/server_selection.png)

Seconde vidéo de présentation, centrée sur le dashboard :



## Outils utilisés


| Outil/Framework | Rôle |
| ---------------------------- | --------------------------------------- |
| Node.js / JavaScript | Robot Discord et serveur du site |
| discord.js | Interaction avec l'API Discord |
| Base de données JSON interne | Stockage des configurations par serveur |


## Code source

Le code source de Jemibou est disponible sur GitHub : [github.com/Flymeth/Jemibou](https://github.com/Flymeth/Jemibou).