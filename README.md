# NX Academy Website - Source code

## Welcome to NX Academy 👋!

Thank you for taking the time to read the documentation for the NX Academy
Website.

Here are the key points you need to remember:

- NX Academy uses [Astro JS](https://astro.build/).
- We strive to minimize JavaScript usage on the client side.
- We do not use a CSS framework and instead rely on Vanilla CSS.
- We aim to be as accessible as possible.
- Apart from this README, all content is written in French.
- We are currently working on creating valuable cheatsheets, which we refer to
  in French as "Fiches techniques."
- We use Figma to help us designing the website and
  [it's accessible to everyone](https://www.figma.com/design/CMX7KkMti1EMBxIKksQl0v/Website?node-id=0-1&t=oQilfknMIs7W0XQ2-1).
  Yeah, it's pretty rough at the moment!

## How to Run this Project on your Computer?

### Prerequisites

- [Node.JS](https://nodejs.org/fr) - 24.11 is recommended (We tried Bun, it
  didn't work).
- [Npm](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager) -
  11.6 is recommended.

### Commands

Once you have cloned the repo, the following commands should be available. They
are run from the root of the project, from a terminal:

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
│   └── components/
│       └── Header.astro
│   └── layouts/
│       └── CheatSheetsLayout.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page
is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put
any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

Layouts serve as wrappers for page content, helping to keep your base code
[DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

## Contributing?

Currently, we do not accept external contributors. We are a small team working
to find the right balance. Once we achieve this balance, we will open up for
external contributions.
