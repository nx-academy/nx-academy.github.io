---
layout: ../../layouts/CheatSheetsLayout.astro

title: Comprendre l'utilisation de module next-image avec Storybook & TypeScript
description:
  Découvrez comment utiliser le composant "next/image" dans Storybook avec
  TypeScript, en configurant Storybook pour afficher correctement les images
  Next.js.

imgAlt:
  Un ingénieur travaillant sur le pontage de pipeline en extérieur, pixel art
imgSrc: /images/cheatsheets/ingenieur-pontage-pipeline.webp

author: Lionel
kind: Fiche technique
level: Intermédiaire
publishedDate: 11/30/2024
---

<article>

# Utilisation du composant "next/image" avec Storybook et TypeScript 📕🛠️📘

![Un ingénieur travaillant sur le pontage de pipeline en extérieur, pixel art](/images/cheatsheets/ingenieur-pontage-pipeline.webp)

## Problématique 🚨

Lorsque j'ai débuté un projet NextJS avec TypeScript et Storybook, j'ai très
vite été confronté à un soucis très embêtant lors du rendu de composant
utilisant next/image dans Storybook.

Storybook semble incapable de trouver l'image qui est importé statiquement
depuis le dossier static **/public/images** dans l'arborescence de base de
l'application.

Ce qui génère ce problème est très simple, lorsque vous lancez Storybook avec la
commande terminal `npm run storybook`sur le serveur qui lui attribué (6006 par
défault), le processus de `build` de Storybook ne passe pas par le
`build process`de NextJS durant lequel les `URLs` et `PATHs` sont créés et
injectés dans le code.

Vous obtenez donc un composant dépourvu d'image dans votre story ou une erreur
de compilation lors du lancement de storybook.

Ce petit désagrément m'a finalement pris la journée entière pour trouver une
solution !

## Bootstrapping 🚀

Au moment de démarrer votre projet en suivant la documentation de NextJS et de
Storybook, Votre configuration de base devrait ressembler à ceci :

### Fichier main.ts dans votre dossier ./storybook/ 📄

```ts
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  storys: ["../src/**/*.mdx", "../src/**/*.storys.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  typescript: {
    check: false,
    checkOptions: {},
    skipCompiler: false,
  },
};
export default config;
```

### Fichier preview.ts dans votre dossier ./storybook/ 📄

```ts
import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

En l'état actuel des choses, lorsque vous tenterez de `build` votre story, cela
ne fonctionnera pas pour les raisons citées plus avant.

Vous remarquerez que dans la configuration ⚙️ ci-dessus, il n'est pas
explicitement clair dans les paramètres établis pour storybook comment gérer ce
cas de figure.

> ... Comment on fait alors ? 🤔💭

## Override de next/image pour Storybook 🎯

Pour régler ce problème, nous allons modifier les fichiers
./storybook/preview.ts & ./storybook/main.ts afin d'expliquer clairement à
Storybook comment accéder aux images ciblées.

### Fichier main.ts dans votre dossier ./storybook/ 📄

Nous allons d'abord spécifier à Storybook les chemins d'accès aux images en
ajoutant le `path` cible directement dans le fichier main.ts. dans la propriéte
`staticDirs`.

```ts
import type { StorybookConfig } from "@storybook/nextjs";
import * as path from "path";

const config: StorybookConfig = {
  storys: ["../src/**/*.mdx", "../src/**/*.storys.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: path.resolve(__dirname, "../next.config.js"),
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
  // On spécifier le path à suivre pour permettre à storybook de trouver les images.
  staticDirs: [
    { from: path.resolve(__dirname, "../public/images"), to: "/images" },
  ],
  typescript: {
    check: false,
    checkOptions: {},
    skipCompiler: false,
  },
};

export default config;
```

> ... Maintenant Storybook où chercher...

### Fichier preview.ts dans votre dossier ./storybook/ 📄

Nous allons ensuite importer au dessus du document les propriétés de
`next/image` et ensuite vérifier si next/image.default est configurable et
redéfinit pour permettre `l'override` de `next/image` pour Storybook.

```ts
import React from "react";
import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import * as nextImage from "next/image";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
  },
};

// Vérifie si nextImage.default est déjà configurable et redéfinit seulement si possible
if (Object.getOwnPropertyDescriptor(nextImage, "default")?.configurable) {
  // Override next/image pour Storybook
  Object.defineProperty(nextImage, "default", {
    configurable: true,
    value: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
      React.createElement("img", props),
  });
}

export default preview;
```

> ... Comment ça marche ??? 🔬

Ce code remplace temporairement le composant next/image par une balise HTML
native <img> dans Storybook. Cela permet de contourner le fonctionnement de base
qui provoque le dysfonctionnement mentionné plus haut lorsque Storybook tente
d'accéder aux images avec un processus de build ne lui permettant pas de gérer
next/image nativement.

Cette méthode nous permet également de ne pas devoir configurer des fonctions
supplémentaires de Next.js.

## Application dans votre story 🧩📕🪄

Il ne vous reste plus qu'à spécifier le `path` adéquat de votre fichier
`***.stories.tsx` dans la proriété `args` de votre `story`.

```ts
import { Meta, StoryObj } from "@storybook/react";
import Logo from "../components/Logo/Logo";

const meta: Meta<typeof Logo> = {
  title: "Components/Logo",
  component: Logo,
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Main: Story = {
  args: {
    src: "/images/Logo.webp", // <==  Path adapté à la configuration pour le rendu d'image
    alt: "Logo Dietetic",
    width: 75,
    height: 75,
  },
};
```

## En résumé 📝

L'utilisation de next/image avec Storybook nécessite une configuration
supplémentaire, car Storybook n'utilise pas le processus de build de Next.js. En
configurant les fichiers Storybook et en remplaçant next/image par une balise
<img>, vous pouvez faire en sorte que les images soient correctement rendues.
Cette approche réduit les conflits et les erreurs de compilation dans Storybook
lors du développement de composants utilisant des images statiques.

## Ressources

- [Storybook - Images, fonts, and assets](https://storybook.js.org/docs/configure/integration/images-and-assets)
- [NextJS - API Reference / Components / <Image>](https://nextjs.org/docs/pages/api-reference/components/image)
- [How to Use the Next.js Image Component in Storybook](https://dev.to/jonasmerlin/how-to-use-the-next-js-image-component-in-storybook-1415)
- [Next-Image with StorybookJS](https://xenox.dev/next-image-with-storybookjs/)
