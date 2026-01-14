import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const el = document.getElementById('root')!;
const root = ReactDOM.createRoot(el);

const App = () => {
  const ref = useRef<typeof esbuild | null>(null);
  const iframe =  useRef<any>();
  const [input, setInput] = useState('');

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

    iframe.current.srcdoc = html;

    // Bundle the code
    const result = await ref.current.build({
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
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html= `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            const root = document.getElementById('root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
        }, false);
        </script>
      </body>
    </html> 
  `

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
      <iframe ref={iframe} sandbox='allow-scripts' srcDoc={html} title="Code execution preview"></iframe>
    </div>
  );
};

root.render(<App />);
