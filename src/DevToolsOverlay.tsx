import React, { useEffect, useState } from 'react';
import '../styles/overlay.css';
import { trackMemory } from './utils/trackMemory';
import { interceptNetwork } from './utils/trackNetwork';

export const DevToolsOverlay = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    trackMemory();
    interceptNetwork();
  }, []);

  return visible ? (
    <div className="perfkit-overlay">
      <h4>🚀 PerfKit DevTools</h4>
      <button onClick={() => trackMemory()}>Check Memory</button>
      <button onClick={() => location.reload()}>🔄 Reload</button>
      <button onClick={() => setVisible(false)}>❌ Close</button>
    </div>
  ) : null;
};

export const initPerfKit = () => {
  const mount = document.createElement('div');
  document.body.appendChild(mount);
  import('react-dom').then(({ createRoot }) => {
    const root = createRoot(mount);
    root.render(<DevToolsOverlay />);
  });
};
