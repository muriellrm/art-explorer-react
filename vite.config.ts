/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss(), svgr({ svgrOptions: {} })],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      exclude: [
        "src/*.tsx",
        "*.config.{ts,tsx,js,cjs}",
        ".tsbuild/*",
        "dist",
        "src/@types",
        "src/styles",
        "src/config",
        "src/utils/*.ts",
        "src/utils/logging/index.ts",
        "src/utils/env/index.ts",
        "src/routes",
        "src/pages/Home/resolver.ts",
      ],
    },
  },
});
