# Changelog

All notable changes to this project will be documented in this file.

## [1.0.12] - 2025-06-17

### Fixed

- Ensured React and ReactDOM are always treated as peer dependencies, never bundled, to prevent "ReactCurrentDispatcher" and "ReactCurrentOwner" errors.
- Rollup config now uses only ESM output, with all React-related imports marked as external (including `react/jsx-runtime` and `react-dom/client`).
- Removed all CommonJS (`@rollup/plugin-commonjs`) usage for a pure ESM build.
- Fixed `exports is not defined` by supporting only ESM output, matching Next.js 15+ requirements.
- Added `"type": "module"` to `package.json` for ESM compatibility.
- Removed self-dependency from `dependencies` in `package.json`.
- Added `tslib` as the only runtime dependency.
- Ensured no accidental bundling of React or ReactDOM in the output.
- Added instructions and code for safe client-only initialization of PerfKit in Next.js App Router using a `"use client"` component.

### Changed

- Updated `package.json` to support React 16+ and Next.js 13+ via peer dependencies.
- Updated `rollup.config.js` to use ESM syntax and import JSON via `createRequire` for Node 18+ compatibility.
- Updated `tsconfig.json` for correct ESM and type output.
- Improved `.npmignore` to exclude source, examples, and config files from npm package.

### Added

- Example usage in a Next.js 15+ app in the `examples/next-app` folder.
- Example `"use client"` component for initializing PerfKit only on the client:
  ```tsx
  // src/app/ClientPerfKit.tsx
  "use client";
  import { useEffect } from "react";
  export function ClientPerfKit() {
    useEffect(() => {
      if (process.env.NODE_ENV === "development") {
        import("nextjs-perfkit").then(({ initPerfKit }) => {
          initPerfKit();
        });
      }
    }, []);
    return null;
  }
  ```

---

## [1.0.8] - 2025-06-17

### Added

- Rollup build system for bundling the TypeScript package.
- Dual output: CommonJS (`dist/cjs`) and ESModule (`dist/esm`) builds.
- `dev` script for local development with Rollup in watch mode.

### Changed

- Updated `package.json` to include `main` and `module` fields for modern bundlers.
- Updated `README.md` to document new build outputs and import instructions.

### Fixed

- Build and output directory conflicts between TypeScript and Rollup.

---

## [1.0.7] - 2024-XX-XX

- Previous release details...
