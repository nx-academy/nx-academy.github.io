# NX Academy Source code

## Welcome to NX Academy 👋!

You are about to read the documentation for the 

Here are the main information you need to remember:
- NX Academy uses Astro JS.
- We try to avoid using as much as possible JavaScript on the client side.
- We don't use a CSS framework. We rely instead on Vanilla CSS.
- We try to be as accessible as possible.
- Appart from this README, all the content is written in French.


## How to Run this Project on your Computer?

### Prerequisites

- [Node.JS](https://nodejs.org/fr) - 20.10 is recommended (We tried Bun, it didn't work).
- [Npm](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager) - 10.2 is recommended.

### Commands

Once you have cloned the repo, the following commands should be available. They are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


### Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.


## Contributing?
