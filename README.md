![CI status](https://github.com/BenjaVR/node-typescript-template/actions/workflows/ci.yml/badge.svg)

# Node.js + TypeScript template

Template project for Node.js projects written in TypeScript.

## Why? ¯\\\_(ツ)\_/¯

I was tired spending the first hour(s) of every project on configuration (basically copy/pasting relevant parts of my last project).

Now I can immediately start working on my Next Big Idea™, and I hope you can do the same!

## What's included? (⌐■_■)

- 💪 **Typescript** (duh?!).

- 🏭 Relax and let **nodemon** take care of running your app.

- ✨ Keep your code clean with **editorconfig**, **prettier** and **eslint** (and those last two integrate 🤩).

- ⚡ Don't push a broken app thanks to **husky** and **lint-staged**.

  - 💡 The template includes a hook [before every commit](./.husky/pre-push), and one [before every push](./.husky/pre-push).

- ✅ Test your already flawless code with **jest**.

- ⛅ CI using **Github Actions**.

  - 💡 There is also a Github Action included [to update all the dependencies](./.github/workflows/update-deps.yml). This requires a manual trigger via the Github UI.

- 👩‍⚖️ Forget the legal issues with a **LICENSE.md**.

## Contribute ༼ つ ◕_◕ ༽つ

Do you have any questions, bug reports or feature requests? [Make sure to let me know](https://github.com/BenjaVR/node-typescript-template/issues/new)!

Pull requests to add some neat new features are always welcome. As long as they are useful.

## Using this template (╯°□°）╯︵ ┻━┻)

- [ ] The project name, author, description ... in the [package.json](./package.json).

- [ ] Run `npx npm-check-updates -u` to update all the dependencies to the latest version.

  - [ ] Note: this only updates [package.json](./package.json), please run `npm install` to make sure the lock-file is updated as well. You can do this with a manual trigger of the [update-deps.yml](./.github/workflows/update-deps.yml) action as well. Feel free to remove this action afterwards.

- [ ] The name + year of the [LICENSE](./LICENSE.md) file (or replace it completely to another type of license, check https://choosealicense.com).

- [ ] Replace this [README](./README.md) file.
