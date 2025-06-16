const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const pkg = require("./package.json");

module.exports = [
  {
    input: "src/index.ts",
    output: {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
      exports: "named",
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", outDir: "dist/cjs" }),
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      dir: "dist/esm",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", outDir: "dist/esm" }),
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  },
];
