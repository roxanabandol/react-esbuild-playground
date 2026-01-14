import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: Promise<void> | null = null;

const bundle = async (rawCode: string) => {
  if (!service) {
    service = esbuild.initialize({
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.19/esbuild.wasm',
      worker: true,
    });
  }
  await service;

  const result = await esbuild.build({
    stdin: {
      contents: rawCode,
      loader: 'tsx',
      resolveDir: '/',
      sourcefile: 'index.tsx',
    },
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    },
  });

  return result.outputFiles[0].text;
};

export default bundle;
