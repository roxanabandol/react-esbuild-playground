# Mini JBook

A browser-based code editor and bundler inspired by the JBook project from a React course, **extended and modernized** to work with current versions of `esbuild-wasm`.

Users can write and execute **JavaScript / TypeScript / TSX** code directly in the browser, including **npm package imports** and **CSS imports**.

---

## ✨ Features

- In-browser bundling using **esbuild-wasm**
- Supports JS, TS, and TSX
- Import npm packages directly from **unpkg.com**
- CSS imports supported (e.g. `bulma/css/bulma.css`)
- Fast rebuilds with **localForage caching**
- Safe code execution in an **iframe sandbox**

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

---

## 🧪 Example

```ts
import _ from "lodash";
import "bulma/css/bulma.css";

console.log(_.camelCase("Hello World"));
```
