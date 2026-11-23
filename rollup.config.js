import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "esm",
    sourcemap: true,
    exports: "named",
    inlineDynamicImports: true,
  },
  plugins: [resolve(), typescript({ tsconfig: "./tsconfig.json" })],
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react-dom/client",
    "react-dom/server",
    "react-dom/server.browser",
    "react-dom/server.node",
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
};
