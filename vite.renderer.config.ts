import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue"
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from "node:path"

export default defineConfig({
    root: "./src/renderer/",
    plugins: [vue(), vueJsx()]
});
