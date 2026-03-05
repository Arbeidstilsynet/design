import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    css: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
