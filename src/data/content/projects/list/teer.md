---
id: b87f4336-1059-491c-9e33-ed1ac02e3bdf
overview:
  cover: /content/projects/teer/Banniere.png
  slug: teer
  name: TEER
  description: Application de messagerie instantanée façon Discord
  date: 2019-07-01
  category: 20aca93e-88af-4880-b7d3-eb528b9da7a6
  tags:
    - nodejs
    - socketio
    - pwa
presentation:
  title: TEER - Messagerie instantanée
  subtitle: Application de messagerie instantanée façon Discord, développée sans
    framework avec Node.js et Socket.IO
related_projects:
  - b679f1e5-daee-452b-84f7-af61f60911c0
  - 5f793341-9359-43c8-adb2-d2e466095865
---
**TEER** est une plateforme de messagerie instantanée, dans l'esprit de Discord, permettant d'échanger en temps réel au sein de groupes ou en messages privés. Le projet a volontairement été développé **sans aucun framework**, ni côté front-end ni côté back-end, dans le but de comprendre en profondeur le fonctionnement interne de chaque brique (protocole temps réel, gestion des connexions, persistance des données...).

![Discussion de groupe sur TEER](/content/projects/teer/group.png)

## Fonctionnalités principales

### Messagerie instantanée

Échange de messages en temps réel, aussi bien dans des groupes qu'en conversations privées entre amis.

![Conversation privée sur TEER](/content/projects/teer/private.png)

### Gestion des amis

Ajout, suppression et gestion d'une liste d'amis directement depuis l'application.

### Personnalisation du profil

Changement d'avatar pour personnaliser son profil utilisateur.

## Outils utilisés


| Outil/Technologie | Rôle |
| ----------------------- | -------------------------------------------- |
| HTML / CSS / JavaScript | Interface front-end, sans framework |
| Node.js | Serveur back-end |
| Socket.IO | Communication bidirectionnelle en temps réel |
| Module `fs` de Node.js | Base de données interne (fichiers JSON) |


## Pourquoi le projet est à l'arrêt

TEER est un projet d'apprentissage réalisé en 2019 pour explorer les technologies temps réel sans dépendre de frameworks. Il n'a jamais été déployé publiquement ni maintenu au-delà de cette phase d'expérimentation.