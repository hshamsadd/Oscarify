import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/Oscarify/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
