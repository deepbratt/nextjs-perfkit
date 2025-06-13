
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
import { initPerfKit } from 'nextjs-perfkit/src/DevToolsOverlay';

useEffect(() => {
  initPerfKit();
}, []);
```

### 2. Track Component Render Duration

```tsx
import { useRenderHeatmap } from 'nextjs-perfkit/src/hooks/useRenderHeatmap';

const MyComponent = () => {
  useRenderHeatmap("MyComponent");

  return <div data-perf-label="MyComponent">Hello World</div>;
};
```

### 3. Debug Prop Changes

```tsx
import { usePropDebugger } from 'nextjs-perfkit/src/hooks/usePropDebugger';

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

## 📢 Alerts & Thresholds

- Memory usage > 100MB → ⚠️ alert in UI
- Fetch calls → ⏱️ duration log in console
- Render time > 16ms → 🔴 red outline

---

## 👥 Contributing

1. Fork the repo
2. Clone locally: `git clone https://github.com/yourname/nextjs-perfkit.git`
3. Install deps: `npm install`
4. Test with a Next.js sample project

---

## 📄 License

MIT License © 2025 [YourName]
