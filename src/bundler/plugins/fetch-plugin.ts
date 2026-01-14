 
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {

      // =====================
      // 1️. ENTRY FILE
      // =====================
      build.onLoad({ filter: /^index\.js$/, namespace: 'a' }, async () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      // =====================
      // 2. CACHE
      // =====================
      build.onLoad({ filter: /.*/, namespace: 'a' }, async (args) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedResult) {
          return cachedResult;
        }
      });


      // =====================
      // 3. CSS FILES
      // =====================
      build.onLoad({ filter: /\.css$/, namespace: 'a' }, async (args) => {
    
        const { data, request } = await axios.get(args.path);

        const contents = `
          const style = document.createElement('style');
          style.innerText = ${JSON.stringify(data)};
          document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx', // rezultatul e JS
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });

      // =====================
      // 4. JS / TS FILES
      // =====================
      build.onLoad({ filter: /.*/, namespace: 'a' }, async (args) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};


// CS TESTING PURPOSES ONLY
// import 'bulma/css/bulma.css';

// const button = document.createElement('button');
// button.className = 'button is-primary';
// button.innerText = 'Hello Bulma';
// document.body.appendChild(button);


// import 'tiny-test-pkg'
// import 'bulma/css/bulma.css';