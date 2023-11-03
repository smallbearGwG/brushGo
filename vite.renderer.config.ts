import { defineConfig } from 'vite';
import path from "node:path"

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main_window: path.join(__dirname, "index.html")
            }
        }
    }
});
