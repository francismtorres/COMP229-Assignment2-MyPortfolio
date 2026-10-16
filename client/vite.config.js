import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration (Week 3 slides): sets the bundle entry point to src/main.jsx.
// The "proxy" block forwards API calls made by the React app to the Express server,
// so the front end can call fetch("/api/contacts") without CORS or hard-coded ports.
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000",
    },
  },
});
