import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/Meg/" : "/", // ✅ Only use /Meg/ in production
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true,
  },
}));
