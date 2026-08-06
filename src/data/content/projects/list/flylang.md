---
id: b488bea1-0fdf-47a0-8e11-7699e597134c
overview:
  cover: /content/projects/flylang/scoped_returns.jpeg
  slug: flylang
  name: Flylang
  description: Mon propre langage de programmation
  date: 2023-02-26
  category: f8045d2d-44de-44a4-9b64-30342192d780
  tags:
    - rust
    - typescript
    - interpreteur
    - compilateur
presentation:
  title: Flylang
  subtitle: Mon propre langage de programmation, d'abord interprété en NodeJS,
    aujourd'hui réécrit en Rust
---
Depuis que je code, j'ai toujours voulu créer mon propre langage de programmation. **Flylang** est le résultat de cette envie : un langage haut niveau, avec ses propres types, fonctions, classes et structures de contrôle, dont le tout premier interpréteur a été écrit... en NodeJS (pas le choix le plus orthodoxe pour créer un langage, mais assumé).

![](/content/projects/flylang/compiler.jpeg)

## Aperçu de la syntaxe

Flylang se veut minimaliste tout en restant expressif. Quelques particularités :

- Les commentaires s'écrivent entre deux `|`, ou après un `||` pour commenter le reste d'une ligne.
- Les variables se déclarent avec `nom: valeur`, et deviennent constantes avec `nom:: valeur`.
- Les fonctions se déclarent avec `fn nom(arg1, arg2, ...code...)` et supportent un `return` explicite pour sortir d'un scope nommé.

```1c
fn add2Numbers(nb1, nb2,
    return nb1 + nb2
)
myage: add2Numbers(17, 1)
```

Le langage va jusqu'à supporter les classes et l'héritage :

```1c
cs Myclass(
    fn(arg1, arg2,
        me.arg1: arg1
        me.arg2: arg2
    ),
    fn printArg1(
        return std.out(me.arg1)
    )
)

cs Subclass(Myclass,
    fn(
        Myclass(15, "hello")
    )
)
```

![](/content/projects/flylang/scoped_returns.jpeg)

La version originale incluait également un système de modules natifs (`maths`, `process`, `random`, ...) et un mode "console" interactif (`flylang` sans argument) pour exécuter du code directement dans le terminal.

## Outils utilisés (version originale)


| Outil | Rôle |
| -------------------- | ------------------------------------------------------- |
| Node.js / TypeScript | Implémentation de l'interpréteur, du lexer et du parser |


## Réécriture en Rust

Le projet n'est **pas à l'arrêt** : je suis en train de réécrire Flylang intégralement en **Rust**, principalement pour de meilleures performances que l'implémentation NodeJS d'origine.

L'objectif à terme dépasse le simple interpréteur : je souhaite que Flylang puisse être **compilé vers d'autres langages via un système d'add-ons** — l'idée étant, par exemple, de pouvoir écrire un programme une seule fois puis de générer sa version dans plusieurs langages différents (utile entre autres pour des comparaisons de performance entre langages).

La réécriture avance par étapes :

- **Lexer** : quasiment terminé (littéraux, scopes nommés, modifiers, mots-clés, boucles, opérations, déclarations de variables, objets/tableaux).
- **Parser** : bien avancé (définitions et appels de fonctions, classes, if/else, boucles, breakers, `use`...), à l'exception de la visibilité des membres de classe (privé/protégé/statique) encore à faire.
- **Analyser** et **Optimizer** : pas encore commencés.

## Outils utilisés (réécriture Rust)


| Outil/Crate | Rôle |
| ----------- | ------------------------------------------ |
| Rust | Langage d'implémentation de l'interpréteur |
| clap | Interface en ligne de commande |
| regex | Analyse lexicale |
| toml | Fichiers de configuration (`flylang.toml`) |


## Code source

- Version originale (NodeJS, figée) : [github.com/Flymeth/flylang-src](https://github.com/Flymeth/flylang-src)
- Réécriture en cours (Rust) : [github.com/johan-jnn/flylang](https://github.com/johan-jnn/flylang)

