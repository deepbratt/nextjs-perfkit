import React, { useState, useEffect } from "react";
import "./styles/overlay.css";
import { trackMemoryUsage } from "./utils/trackMemory";
import { interceptFetch } from "./utils/trackNetwork";
import { downloadLogs, getLogs } from "./utils/uploadLogs";

export const DevToolsOverlay = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    trackMemoryUsage();
    interceptFetch();
    setLogs(getLogs());
  }, []);

  return (
    <div className="perfkit-overlay">
      <div className="perfkit-header">
        <h4>🚀 PerfKit</h4>
        <button
          className="perfkit-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "▶️" : "🔽"}
        </button>
      </div>

      {!collapsed && (
        <div className="perfkit-body">
          <div className="perfkit-section">
            <h5>🧠 Memory</h5>
            <button onClick={trackMemoryUsage}>Check Now</button>
          </div>

          <div className="perfkit-section">
            <h5>🔥 Render & Logs</h5>
            <button onClick={downloadLogs}>Download Logs</button>
            <div className="perfkit-log-preview">
              <pre>{JSON.stringify(logs.slice(-3), null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const initPerfKit = () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  import("react-dom").then(({ createRoot }) => {
    const root = createRoot(container);
    root.render(<DevToolsOverlay />);
  });
};
