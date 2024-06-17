/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    css: true,
    globals: true,
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_BASE_URL, // Adjust to your Spring Boot backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) =>
          path.replace(/^\/api/, "/credit-card-inquiries-service/api/v1"), // Adjust path to match backend
      },
    },
  },
});
