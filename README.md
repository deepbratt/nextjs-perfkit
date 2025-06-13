# 🧠 Next.js PerfKit

A lightweight DevTools-style performance analyzer for **Next.js + TypeScript** apps.
Track rendering time, memory usage, network latency, prop changes, and more — all from your browser.

![PerfKit UI Example](https://user-images.githubusercontent.com/example/perfkit-ui.png) <!-- Add screenshot later -->

---

## 🚀 Features

- 🔥 Heatmap of slow components (based on render duration)
- 🧠 Memory usage alerts
- 🌐 Network latency tracker (intercepts all fetch requests)
- ⚙️ DevTools overlay UI (toggle memory, reload, hide)
- 🔄 Re-render debugger (based on prop changes)
- 📦 Exportable logs for team analysis (coming soon)

---

## 📦 Installation

```bash
npm install nextjs-perfkit
# or
yarn add nextjs-perfkit
```

---

## 🛠️ Usage

### 1. Add DevTools to your app

```ts
// pages/_app.tsx or in useEffect of a layout
import { initPerfKit } from "nextjs-perfkit/src/DevToolsOverlay";

useEffect(() => {
  initPerfKit();
}, []);
```

### 2. Track Component Render Duration

```tsx
import { useRenderHeatmap } from "nextjs-perfkit/src/hooks/useRenderHeatmap";

const MyComponent = () => {
  useRenderHeatmap("MyComponent");

  return <div data-perf-label="MyComponent">Hello World</div>;
};
```

### 3. Debug Prop Changes

```tsx
import { usePropDebugger } from "nextjs-perfkit/src/hooks/usePropDebugger";

const MyComponent = (props) => {
  usePropDebugger(props);
  return <div>Content</div>;
};
```

---

## 📂 Folder Structure

```
nextjs-perfkit/
├── src/
│   ├── hooks/
│   │   ├── useRenderHeatmap.ts
│   │   └── usePropDebugger.ts
│   ├── utils/
│   │   ├── trackMemory.ts
│   │   └── trackNetwork.ts
│   └── DevToolsOverlay.tsx
├── styles/
│   └── overlay.css
└── README.md
```

---

## 📊 DevTools UI

Open the floating UI in your browser:

- ✅ Track memory usage
- 🔄 Reload page
- ❌ Hide panel

You can trigger this in your root layout or `_app.tsx` using:

```ts
initPerfKit();
```

---

## 🧪 Full Example: Using PerfKit in a Next.js Page

```tsx
"use client";
import { useEffect } from "react";
import { useMemoryTracker } from "@perfkit/devtools";
import { useRenderHeatmap } from "@perfkit/devtools";
import { usePropDebugger } from "@perfkit/devtools";
import {
  registerAlertHandler,
  checkMemoryUsage,
  trackNetworkRequest,
} from "@perfkit/devtools";
import { downloadLogs } from "@perfkit/devtools";

export default function Home() {
  useRenderHeatmap("Home");
  useMemoryTracker(3000); // check memory every 3 seconds
  usePropDebugger({ example: "value" });

  useEffect(() => {
    registerAlertHandler((msg, type, meta) => {
      console.warn(`[ALERT - ${type}]`, msg, meta);
    });

    setInterval(() => checkMemoryUsage(), 5000);
    trackNetworkRequest("/api/test");
  }, []);

  return (
    <main>
      <h1>Hello PerfKit</h1>
      <button onClick={downloadLogs}>Download Logs</button>
    </main>
  );
}
```

## 📚 Utility Highlights

### `useMemoryTracker(intervalMs?: number)`

Tracks memory usage via `performance.memory` and logs it regularly.
🚨 Triggers an alert if heap usage exceeds a defined threshold (default: 100MB).

---

### `useRenderHeatmap(label: string)`

Measures render duration of a component and outlines it with a visual border if slow.
📏 Useful for identifying visual bottlenecks.

---

### `usePropDebugger(props)`

Logs changed props that cause a re-render.
🔍 Helps debug unnecessary re-renders in components.

---

### `registerAlertHandler(callback)`

Registers a custom global alert handler.
💡 Use this to display toast messages or logs when memory/network thresholds are crossed.

---

### `trackNetworkRequest(url: string)`

Monitors fetch calls and tracks repeated calls to the same endpoint within a short window (10s by default).
📡 Prevents performance issues caused by over-fetching.

---

### `downloadLogs()`

Exports all collected logs (render, memory, network, etc.) as a downloadable `.json` file.
📝 Perfect for team debugging or offline analysis.

## 🛠 Future Roadmap

## 📢 Alerts & Thresholds

- Memory usage > 100MB → ⚠️ alert in UI
- Fetch calls → ⏱️ duration log in console
- Render time > 16ms → 🔴 red outline

---

## 👥 Contributing

1. Fork the repo
2. Clone locally: `git clone https://github.com/deepbratt/nextjs-perfkit.git`
3. Install deps: `npm install`
4. Test with a Next.js sample project

---

## 📄 License

MIT License © 2025 [deepbratt]

![npm](https://img.shields.io/npm/v/nextjs-perfkit)
![downloads](https://img.shields.io/npm/dm/nextjs-perfkit)
![license](https://img.shields.io/npm/l/nextjs-perfkit)
