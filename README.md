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
