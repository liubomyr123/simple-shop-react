import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const publicDir = resolve(__dirname, "./public");

const root = resolve(__dirname, "./src");

const appDir = resolve(root, "./app");
const pagesDir = resolve(root, "./pages");
const componentsDir = resolve(root, "./components");
const sharedDir = resolve(root, "./shared");

const i18nDir = resolve(appDir, "./i18n/index.ts");
const configDir = resolve(appDir, "./config");
const apiDir = resolve(appDir, "./api");
const navigationDir = resolve(appDir, "./navigation");
const storeDir = resolve(appDir, "./store");
const layoutsDir = resolve(appDir, "./layouts");

// https://vitejs.dev/config/
export default defineConfig({
  publicDir,
  plugins: [react()],
  resolve: {
    alias: {
      "@src": root,
      "@app": appDir,
      "@api": apiDir,
      "@config": configDir,
      "@i18n": i18nDir,
      "@layouts": layoutsDir,
      "@navigation": navigationDir,
      "@store": storeDir,
      "@components": componentsDir,
      "@shared": sharedDir,
      "@pages": pagesDir,
    },
  },
  // dev new port
  server: {
    port: 3000,
  },
  // prod new port
  preview: {
    port: 3000,
  },
});
