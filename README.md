# 🚀 nextjs-perfkit

**Frontend performance analytics and DevTools UI for Next.js + React apps.**
Track render times, memory usage, network performance, prop changes, and export logs for team insights — all from a floating overlay.

---

![npm](https://img.shields.io/npm/v/nextjs-perfkit)
![downloads](https://img.shields.io/npm/dm/nextjs-perfkit)
![license](https://img.shields.io/npm/l/nextjs-perfkit)

---

## 📦 Installation

```bash
npm install nextjs-perfkit
```

---

## 🎨 CSS Styling

You must import the overlay CSS manually in your Next.js `_app.tsx` file:

```ts
import "nextjs-perfkit/styles/overlay.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

> ⚠️ If you forget to include this, the overlay will inject fallback inline styles with a warning.

---

## 🚀 Quick Start

```ts
import { initPerfKit } from "nextjs-perfkit";

if (process.env.NODE_ENV === "development") {
  initPerfKit(); // initializes DevTools floating panel
}
```

---

## 🧪 Example Usage

```tsx
"use client";
import { useEffect } from "react";
import {
  useRenderHeatmap,
  useMemoryTracker,
  usePropDebugger,
  registerAlertHandler,
  checkMemoryUsage,
  trackNetworkRequest,
  downloadLogs,
} from "nextjs-perfkit";

export default function Home() {
  useRenderHeatmap("HomePage");
  useMemoryTracker(3000);
  usePropDebugger({ propA: "value" });

  useEffect(() => {
    registerAlertHandler((msg, type, meta) => {
      console.warn(`[ALERT - ${type}]`, msg, meta);
    });

    setInterval(() => {
      checkMemoryUsage();
    }, 5000);

    trackNetworkRequest("/api/example");
  }, []);

  return (
    <main data-perf-label="HomePage">
      <h1>🚀 Hello PerfKit</h1>
      <button onClick={downloadLogs}>📥 Download Logs</button>
    </main>
  );
}
```

---

## 📚 Utility Highlights

### `useMemoryTracker(intervalMs?: number)`

Tracks memory usage via `performance.memory` and logs it regularly.
🚨 Triggers an alert if heap usage exceeds a defined threshold (default: 100MB).

### `useRenderHeatmap(label: string)`

Measures render duration of a component and outlines it with a visual border if slow.
📏 Useful for identifying visual bottlenecks.

### `usePropDebugger(props)`

Logs changed props that cause a re-render.
🔍 Helps debug unnecessary re-renders in components.

### `registerAlertHandler(callback)`

Registers a custom global alert handler.
💡 Use this to display toast messages or logs when memory/network thresholds are crossed.

### `trackNetworkRequest(url: string)`

Monitors fetch calls and tracks repeated calls to the same endpoint within a short window (10s by default).
📡 Prevents performance issues caused by over-fetching.

### `downloadLogs()`

Exports all collected logs (render, memory, network, etc.) as a downloadable `.json` file.
📝 Perfect for team debugging or offline analysis.

---

## 📑 Types

You can import type-safe log definitions like so:

```ts
import type { PerfLogEntry } from "nextjs-perfkit/types";
```

---

## 📤 Exportable Logs

PerfKit collects structured logs from memory, network, and render events.
You can export them using:

```ts
import { downloadLogs } from "nextjs-perfkit";

downloadLogs(); // Triggers a JSON download
```

---

## 🛠 Project Structure

```
src/
├── hooks/              # useRenderHeatmap, useMemoryTracker, usePropDebugger
├── utils/              # trackMemory, network, alerts, logging
├── types.ts            # exported types
├── DevToolsOverlay.tsx # floating overlay component
├── index.ts            # main entry exports
styles/
├── overlay.css         # external UI styles
```

---

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

## 📝 License

MIT © 2025 [Deep Bratt](https://github.com/deepbratt)

---

Made with ❤️ for frontend performance engineering.
