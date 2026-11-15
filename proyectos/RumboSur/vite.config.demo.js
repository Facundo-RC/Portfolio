// Build estático (SPA) para publicar la demo en GitHub Pages: `npm run build:demo`.
import { fileURLToPath } from "node:url";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/Portfolio/proyectos/RumboSur/demo/",
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: { outDir: "demo-build" },
  plugins: [
    tanstackStart({
      srcDirectory: "src",
      spa: { enabled: true, prerender: { outputPath: "/index" } },
    }),
    react(),
  ],
});
