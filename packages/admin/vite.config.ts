import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), "node_modules/$1"),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), "src/$1"),
      },
    ],
  },
  server: {
    port: 8032,
    proxy: {
      "/api": {
        target: "http://localhost:8681",
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/admin-api": {
        target: "http://127.0.0.1:48080",
        changeOrigin: true, // 允许跨域
      },
    },
  },
});
