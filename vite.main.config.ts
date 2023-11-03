import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue"
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'sqlite3'
      ]
    }
  },
  resolve: {
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
  plugins: [vue(), vueJsx()]
});
