# 🚀 PerfKit DevTools

**Frontend-Only Performance Analyzer for Next.js + TypeScript Applications**

> Real-time DevTools-style diagnostics for rendering, memory, network performance, and re-renders. Built for modern React/Next.js apps.

---

## 📦 Installation

```bash
npm install @perfkit/devtools
```

or

```bash
yarn add @perfkit/devtools
```

---

## 🧠 Features

- 🔍 **Component Render Time Tracking**
- 🔥 **Heatmap Overlay** for slow components
- 🧠 **Re-render Debugging** (with prop change annotations)
- 📈 **Memory Usage & Leak Detection**
- 🌐 **Network Request Profiling**
- 📤 **Export & Upload Logs** for team insights
- 🚨 **Alerts** for memory spikes & repeated calls
- 🧪 **DevTools Overlay** with visual toggles

---

## ⚙️ Quick Setup

### 1. Enable the tool in development mode

In `pages/_app.tsx`:

```tsx
if (process.env.NODE_ENV === 'development') {
  require('@perfkit/devtools').initPerfKit();
}
```

---

### 2. Use in Components

```tsx
import { useRenderHeatmap, usePropDebugger } from '@perfkit/devtools';

const MyComponent = ({ name }) => {
  useRenderHeatmap('MyComponent');
  usePropDebugger({ name }); // logs changed props causing re-render
  return <div>{name}</div>;
};
```

---

## 🖥️ DevTools Overlay

A floating panel appears in development with options to:

- Toggle heatmaps
- Export performance logs
- Upload logs to your team dashboard
- Display memory/network alerts

---

## 📤 Log Upload Example

```ts
import { uploadLogs } from '@perfkit/devtools';

await uploadLogs('https://your-server/upload');
```

---

## 🚨 Smart Alerts

Get notified when:

- Memory usage exceeds thresholds
- Same network call is repeated rapidly

---

## 📁 Folder Structure

```bash
nextjs-perfkit/
├── src/
│   ├── hooks/                # React hooks (heatmap, debugger)
│   ├── utils/                # Memory, render, network, upload
│   └── DevToolsOverlay.tsx   # Floating UI
├── styles/                   # Overlay styling
├── examples/next-app         # Demo Next.js integration
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🧪 Example Integration

```tsx
import { useRenderHeatmap } from '@perfkit/devtools';

export default function Sidebar({ title }) {
  useRenderHeatmap('Sidebar');
  return <div>{title}</div>;
}
```

---

## 🧪 Full Example: Using PerfKit in a Next.js Page

```tsx
'use client';
import { useEffect } from 'react';
import { useMemoryTracker } from '@perfkit/devtools';
import { useRenderHeatmap } from '@perfkit/devtools';
import { usePropDebugger } from '@perfkit/devtools';
import {
  registerAlertHandler,
  checkMemoryUsage,
  trackNetworkRequest
} from '@perfkit/devtools';
import { downloadLogs } from '@perfkit/devtools';

export default function Home() {
  useRenderHeatmap('Home');
  useMemoryTracker(3000); // check memory every 3 seconds
  usePropDebugger({ example: 'value' });

  useEffect(() => {
    registerAlertHandler((msg, type, meta) => {
      console.warn(`[ALERT - ${type}]`, msg, meta);
    });

    setInterval(() => checkMemoryUsage(), 5000);
    trackNetworkRequest('/api/test');
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

- [ ] Browser extension
- [ ] Side-by-side session comparison
- [ ] Cloud sync (S3/GCP)
- [ ] Integration with monitoring tools

---

## 🙌 Contributing

Pull requests are welcome! Please open an issue first to discuss what you’d like to change.

---

## 📄 License

[MIT](./LICENSE)

---

Built with ❤️ to help developers ship faster.
