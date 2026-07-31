# Documentation de l'API Logo

Cette API permet de générer dynamiquement mon logo au format SVG, en personnalisant ses couleurs
et sa forme via des paramètres d'URL.

Elle expose deux routes :

- [`GET /api/logo`](#get-apilogo) — génère le SVG du logo.
- [`GET /api/logo/random`](#get-apilogorandom) — redirige vers `/api/logo`
  avec des options aléatoires.

## `GET /api/logo`

Retourne le logo au format `image/svg+xml`, prêt à être affiché directement
(par exemple via une balise `<img src="/api/logo?..." />`).

### Paramètres

Tous les paramètres sont optionnels et se passent en query string.

| Paramètre    | Type            | Défaut                                           | Description                                                                |
| ------------ | --------------- | ------------------------------------------------ | -------------------------------------------------------------------------- |
| `no-shield`  | flag (présence) | absent                                           | Si présent, retire le bouclier derrière le logo.                           |
| `no-gap`     | flag (présence) | absent                                           | Si présent, retire la marge/l'espace autour du logo (viewBox plus serrée). |
| `primary`    | couleur         | `--white` si bouclier affiché, sinon `--primary` | Couleur principale du logo.                                                |
| `secondary`  | couleur         | `--black`                                        | Couleur secondaire (le point / détail) du logo.                            |
| `background` | couleur         | `transparent`                                    | Couleur de fond du SVG.                                                    |
| `shield`     | couleur         | `--primary`                                      | Couleur du bouclier. Ignoré si `no-shield` est présent.                    |

Une couleur peut être :

- une valeur CSS classique (`#ff0000`, `red`, `rgb(0 0 0)`, ...) ;
- le nom d'une variable CSS préfixé par `--` (ex. `--primary`), auquel cas
  elle sera injectée dans le SVG sous la forme `var(--primary)`. C'est ce
  que font les valeurs par défaut, afin que le logo suive automatiquement le
  thème (clair/sombre) du site sur lequel il est affiché.

#### Variables CSS disponibles

Le SVG source du logo définit lui-même un jeu de variables CSS (dans son
propre `<style>`), avec ces couleurs par défaut. Elles peuvent être
utilisées comme valeur de `primary`, `secondary`, `background` ou `shield`
(ex. `?primary=--secondary`) pour référencer l'une de ces couleurs plutôt
que d'en fournir une littérale.

| Variable      | Couleur   |
| ------------- | --------- |
| `--primary`   | `#ff7f11` |
| `--secondary` | `#00eefc` |
| `--tercary`   | `#00adf8` |
| `--black`     | `#080808` |
| `--white`     | `#fcfcfc` |

### Exemples

```
GET /api/logo
GET /api/logo?no-shield
GET /api/logo?no-gap&no-shield
GET /api/logo?primary=%23ff6600&secondary=%23000000&background=%23ffffff
GET /api/logo?shield=--accent
```

### Réponse

- `200 OK` avec le SVG du logo dans le corps de la réponse.
- Entêtes `Content-Type: image/svg+xml` et `Content-Length`.

## `GET /api/logo/random`

Ne génère pas le SVG elle-même : elle calcule des options (aléatoires ou
fournies) puis redirige vers `GET /api/logo` avec les paramètres
correspondants.

### Paramètres

| Paramètre     | Type              | Défaut                         | Description                                                                                   |
| ------------- | ----------------- | ------------------------------ | --------------------------------------------------------------------------------------------- |
| `with-shield` | `"yes"` \| `"no"` | aléatoire (50/50)              | Force ou non l'affichage du bouclier. Toute autre valeur renvoie une erreur `400`.            |
| `with-gap`    | `"yes"` \| `"no"` | aléatoire (50/50)              | Force ou non l'espacement autour du logo. Toute autre valeur renvoie une erreur `400`.        |
| `primary`     | couleur           | couleur hexadécimale aléatoire | Transmis tel quel à `/api/logo`.                                                              |
| `secondary`   | couleur           | couleur hexadécimale aléatoire | Transmis tel quel à `/api/logo`.                                                              |
| `background`  | couleur           | couleur hexadécimale aléatoire | Transmis tel quel à `/api/logo`.                                                              |
| `shield`      | couleur           | couleur hexadécimale aléatoire | Transmis tel quel à `/api/logo`.                                                              |
| `no-redirect` | flag (présence)   | absent                         | Si présent, sert directement le SVG (rewrite interne) au lieu de faire une redirection `302`. |

### Comportement

1. Détermine si le bouclier et l'espacement doivent être actifs (valeur
   fournie ou tirage aléatoire).
2. Détermine une couleur pour `primary`, `secondary`, `background` et
   `shield` (valeur fournie ou couleur hexadécimale aléatoire).
3. Construit l'URL `/api/logo` correspondante.
4. Redirige vers cette URL (`302 Found`), sauf si `no-redirect` est présent,
   auquel cas la réponse de `/api/logo` est directement renvoyée sans
   changer l'URL affichée par le client.

### Exemples

```
GET /api/logo/random
GET /api/logo/random?with-shield=yes&with-gap=no
GET /api/logo/random?no-redirect
```

### Réponse

- `302 Found` avec l'en-tête `Location` pointant vers `/api/logo?...`
  (ou `200 OK` avec le SVG si `no-redirect` est présent).
- `400 Bad Request` si `with-shield` ou `with-gap` reçoit une valeur autre
  que `yes` ou `no`.
