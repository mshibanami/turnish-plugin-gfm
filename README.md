# turnish-plugin-gfm

[![Test](https://github.com/mshibanami/turnish-plugin-gfm/actions/workflows/test.yml/badge.svg)](https://github.com/mshibanami/turnish-plugin-gfm/actions/workflows/test.yml)
[![NPM version](https://img.shields.io/npm/v/turnish-plugin-gfm.svg?style=flat)](https://www.npmjs.org/package/turnish-plugin-gfm)

A [Turnish](https://github.com/mshibanami/turnish) plugin which adds GitHub Flavored Markdown extensions.

This is originally based on [@joplin/turndown-plugin-gfm](https://github.com/laurent22/joplin/tree/dev/packages/turndown-plugin-gfm) by [Laurent Cozic](https://github.com/laurent22), which is a fork of [turndown-plugin-gfm](https://github.com/domchristie/turndown-plugin-gfm) by [Dom Christie](https://github.com/domchristie).

## turnish-plugin-gfm vs @joplin/turndown-plugin-gfm

0538bf0

## Installation

npm:

```sh
npm install turnish-plugin-gfm
```

yarn:

```sh
yarn add turnish-plugin-gfm
```

pnpm:

```sh
pnpm add turnish-plugin-gfm
```

Browser:

```html
<script src="https://cdn.jsdelivr.net/npm/turnish-plugin-gfm@latest/dist/index.iife.js"></script>
```

## Usage

For Node.js:

```js
const TurnishService = require('turnish')
const turnishPluginGfm = require('turnish-plugin-gfm')

const gfm = turnishPluginGfm.gfm
const turnishService = new TurnishService()
turnishService.use(gfm)
const markdown = turnishService.turnish('<strike>Hello world!</strike>')
```

ES module import (Node with ESM, bundlers, or browsers supporting modules):

```js
import TurnishService from 'turnish'
import turnishPluginGfm from 'turnish-plugin-gfm'

const gfm = turnishPluginGfm.gfm
const turnishService = new TurnishService()
turnishService.use(gfm)
const markdown = turnishService.turnish('<strike>Hello world!</strike>')
```

turnish-plugin-gfm is a suite of plugins which can be applied individually. The available plugins are as follows:

- `strikethrough` (for converting `<strike>`, `<s>`, and `<del>` elements)
- `tables`
- `taskListItems`
- `gfm` (which applies all of the above)

So for example, if you only wish to convert tables:

```js
const tables = require('turnish-plugin-gfm').tables
const turndownService = new TurndownService()
turndownService.use(tables)
```

## License

[MIT](LICENSE)

- Copyright (c) 2026- Manabu Nakazawa
- Copyright (c) 2025-2026 Laurent22
- Copyright (c) 2017-2025 Dom Christie

This is originally based on [@joplin/turndown-plugin-gfm](https://github.com/laurent22/joplin/tree/dev/packages/turndown-plugin-gfm) (commit: `0538bf0`) by [Laurent Cozic](https://github.com/laurent22), which is a fork of [turndown-plugin-gfm](https://github.com/domchristie/turndown-plugin-gfm) by [Dom Christie](https://github.com/domchristie). All of them are licensed under the MIT License.
