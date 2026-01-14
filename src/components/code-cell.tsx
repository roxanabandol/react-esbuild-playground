import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Mini JBook</h2>
      <CodeEditor
        defaultValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={onClick}>Submit</button>
      </div>
      <h3>Bundled Output:</h3>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
