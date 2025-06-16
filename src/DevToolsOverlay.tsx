import React, { useState, useEffect, useRef } from "react";
import { trackMemoryUsage } from "./utils/trackMemory";
import { interceptNetwork } from "./utils/trackNetwork";
import { downloadLogs, getLogs } from "./utils/uploadLogs";
import { injectOverlayFallbackStyles } from "./utils/injectStyles";

export const DevToolsOverlay = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  // Drag to move overlay
  const dragData = useRef<{
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);

  useEffect(() => {
    trackMemoryUsage();
    interceptNetwork();
    setLogs(getLogs());
  }, []);

  // Drag handlers for moving overlay
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    let isDragging = false;
    let startX = 0,
      startY = 0,
      startLeft = 0,
      startTop = 0;
    const header = overlay.querySelector(".perfkit-header") as HTMLElement;
    if (!header) return;
    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains("perfkit-toggle"))
        return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = overlay.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      document.body.style.userSelect = "none";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      overlay.style.left = `${startLeft + dx}px`;
      overlay.style.top = `${startTop + dy}px`;
      overlay.style.right = "auto";
      overlay.style.bottom = "auto";
    };
    const onMouseUp = () => {
      isDragging = false;
      document.body.style.userSelect = "";
    };
    header.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      header.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      className="perfkit-overlay"
      ref={overlayRef}
      style={{ resize: "both", overflow: "auto" }}
    >
      <div className="perfkit-header">
        <h4>🚀 PerfKit</h4>
        <button
          className="perfkit-toggle"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand" : "Collapse"}
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
  injectOverlayFallbackStyles();
  const container = document.createElement("div");
  document.body.appendChild(container);
  import("react-dom/client").then(({ createRoot }) => {
    const root = createRoot(container);
    root.render(<DevToolsOverlay />);
  });
};
