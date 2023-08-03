import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron([
      {
        entry: "src/electron/main.ts",
      },
      {
        entry: "src/electron/preload.ts",
      },
    ]),
    renderer(),
  ],
});
