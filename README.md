# Mini JBook

A browser-based code editor and bundler inspired by the JBook project from a React course, **extended and modernized** to work with current versions of `esbuild-wasm` and React 18+.

Users can write and execute **JavaScript / TypeScript / TSX** code directly in the browser, including **npm package imports** and **CSS imports**. It also includes **code formatting** with Prettier.

---

## ✨ Features

- In-browser bundling using **esbuild-wasm**
- Supports **JS, TS, and TSX**
- Import npm packages directly from **unpkg.com**
- CSS imports supported (e.g., `bulma/css/bulma.css`)
- Fast rebuilds with **localForage caching**
- Safe code execution in an **iframe sandbox**
- **Monaco Editor** integration for syntax highlighting, auto-indentation, and code editing
- **Code formatting** with Prettier (configurable tab width, single quotes, semicolons, etc.)

---

## 🔧 Key Differences from the Course Version

- Replaced deprecated `startService()` with `esbuild.initialize()`
- Uses `stdin` instead of `entryPoints` (browser-compatible)
- Custom esbuild plugins for:
  - npm module resolution
  - HTTP fetching
  - CSS injection via `<style>` tags
- Fixed WebAssembly and runtime errors from newer esbuild versions
- Added client-side caching for fetched files
- Integrated **Monaco Editor** for a modern code editing experience
- Added **Prettier** formatting button for editor content
- Tab size configured to **2 spaces** for better code style consistency

---

## 🧪 Example Usage

```ts
import _ from 'lodash';
import 'bulma/css/bulma.css';

console.log(_.camelCase('Hello World'));
```

## 🚀 Getting Started

Follow these steps to run the Mini JBook project locally:

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/mini-jbook.git
cd mini-jbook
```

### 2. Install dependencies

```bash
npm install
```

### 2. Start de development server

```bash
npm start
```
