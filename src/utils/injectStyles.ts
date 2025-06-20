export const injectOverlayFallbackStyles = () => {
  if (document.querySelector("[data-perfkit-style]")) return;

  console.warn(
    "[PerfKit] overlay.css not imported! Injecting fallback inline styles. For best appearance, import: nextjs-perfkit/styles/overlay.css"
  );

  const style = document.createElement("style");
  style.setAttribute("data-perfkit-style", "true");
  style.innerHTML = `
    .perfkit-overlay {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: rgba(30, 30, 30, 0.95);
        border: 1px solid #444;
        border-radius: 10px;
        padding: 12px;
        font-family: monospace;
        font-size: 14px;
        color: #fff;
        z-index: 9999;
        width: 280px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .perfkit-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .perfkit-header h4 {
        margin: 0;
        font-size: 16px;
        color: #00d8ff;
    }

    .perfkit-toggle {
        background: none;
        border: none;
        color: #ccc;
        font-size: 16px;
        cursor: pointer;
    }

    .perfkit-body {
        margin-top: 12px;
    }

    .perfkit-section {
        margin-bottom: 16px;
    }

    .perfkit-section h5 {
        margin: 0 0 6px;
        font-size: 14px;
        color: #fff;
    }

    .perfkit-section button {
        background: #444;
        color: white;
        border: none;
        padding: 6px 10px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 4px;
    }

    .perfkit-section button:hover {
        background: #666;
    }

    .perfkit-log-preview {
        margin-top: 8px;
        max-height: 120px;
        overflow-y: auto;
        background: #111;
        border: 1px solid #555;
        border-radius: 6px;
        padding: 6px;
        font-size: 12px;
        color: #0f0;
    }
  `;
  document.head.appendChild(style);
};
