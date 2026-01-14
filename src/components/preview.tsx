import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // HTML-ul iframe-ului
  const html = `
    <html>
      <head></head>
      <body>
        <div id="root" style="font-family: monospace;"></div>
        <script>
          const root = document.getElementById('root');

          // Salvăm referințele originale
          const originalLog = console.log;
          const originalError = console.error;

          // Funcție pentru a scrie în div
          const appendToRoot = (type, args) => {
            const el = document.createElement('div');
            el.style.color = type === 'error' ? 'red' : 'black';
            el.textContent = args.join(' ');
            root.appendChild(el);
          };

          // Redirecționăm console.log și console.error
          console.log = (...args) => {
            originalLog(...args);             // în DevTools
            appendToRoot('log', args);       // în iframe
            parent.postMessage({ type: 'log', data: args }, '*'); // către parent
          };

          console.error = (...args) => {
            originalError(...args);
            appendToRoot('error', args);
            parent.postMessage({ type: 'error', data: args }, '*');
          };

          // Ascultăm codul venit prin postMessage
          window.addEventListener('message', (event) => {
            root.innerHTML = ''; // curățăm outputul anterior
            try {
              eval(event.data);
            } catch (err) {
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'log') {
        console.log(...event.data.data);
      }
      if (event.data?.type === 'error') {
        console.error(...event.data.data);
      }
    };

    window.addEventListener('message', handleMessage);

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.srcdoc = html;

      iframe.onload = () => {
        iframe.contentWindow?.postMessage(code, '*');
      };
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts"
      srcDoc={html}
      title="Code execution preview"
      style={{
        width: '100%',
        height: '300px',
        border: '1px solid #ccc',
        fontFamily: 'monospace',
      }}
    />
  );
};

export default Preview;
