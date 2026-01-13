import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const el = document.getElementById('root')!;
const root = ReactDOM.createRoot(el);

const App = () => {
  const ref = useRef<typeof esbuild | null>(null);
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // Initialize esbuild
  useEffect(() => {
    const startService = async () => {
      if (!ref.current) {
        await esbuild.initialize({
          wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.19/esbuild.wasm',
          worker: true,
        });
        ref.current = esbuild;
      }
    };
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) return;

    // Bundle the code
    const result = await ref.current.build({
      // entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(), 
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      stdin: {
        contents: input,
        loader: 'tsx', // support TSX/JSX
        resolveDir: '/',
        sourcefile: 'index.js',
      },
    });

    // Display bundled code
    setCode(result.outputFiles[0].text);
    try {
      eval(result.outputFiles[0].text)
    }catch (err) {
      console.error(err);
    } 

    // Run the bundled code in an iframe sandbox
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '200px';
    document.body.appendChild(iframe);
    (iframe.contentWindow as any).eval(result.outputFiles[0].text);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Mini JBook</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your JS/TSX code here, e.g. import _ from 'lodash'"
        style={{ width: '100%', height: 150, fontSize: 14 }}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={onClick}>Submit</button>
      </div>
      <h3>Bundled Output:</h3>
      <pre style={{ marginTop: 10, background: '#f0f0f0', padding: 10 }}>
        {code}
      </pre>
      <iframe sandbox='' srcDoc={html}></iframe>
    </div>
  );
};

const html = `
<h1>Local HTML doc</h1>`  

root.render(<App />);
