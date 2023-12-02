import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const aliases = [`components`, `context`, `assets`, `pages`, `lib`, "hooks"];

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "VITE_",
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: aliases.map((alias) => ({
      find: `@${alias}`,
      replacement: path.resolve(__dirname, `src/${alias}`),
    })),
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./__tests__/setup",
  },
});
