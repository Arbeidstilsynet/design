import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import path, { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

interface PackageJson {
  peerDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
}

const pkg = JSON.parse(readFileSync("./package.json", "utf8")) as PackageJson;

const peerDeps = Object.keys(pkg.peerDependencies ?? {});
const dependencies = Object.keys(pkg.dependencies ?? {});
const externalDependencies = peerDeps.concat(dependencies);

export default defineConfig({
  build: {
    copyPublicDir: false,
    sourcemap: true,
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: externalDependencies,
      output: {
        banner: "'use client';",
        dir: "dist",
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    dts({
      include: ["src/**/*"],
      exclude: ["src/**/*.{test,stories}.{ts,tsx}"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
