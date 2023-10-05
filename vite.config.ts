import { defineConfig } from "vite";
import path from "path";

import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  root: "./src/vue-src",
  build: {
    outDir: "../../dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/vue-src"),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    electron([
      {
        entry: path.resolve(__dirname, "src/electron-src/main.ts"),
      },
      {
        entry: path.resolve(__dirname, "src/electron-src/preload.ts"),
      },
    ]),
    renderer(),
  ],
});
