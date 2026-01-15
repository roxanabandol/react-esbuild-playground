import './text-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# Header');

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      console.log(event.target);
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  return (
    <div>
      {editing ? (
        <div className="text-editor" ref={ref}>
          <MDEditor value={value} onChange={(v) => setValue(v || '')} />
        </div>
      ) : (
        <div className="text-edito card" onClick={() => setEditing(true)}>
          <div className="card-content">
            <MDEditor.Markdown source={value} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
