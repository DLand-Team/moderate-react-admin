import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";

export default defineConfig({
  source: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [pluginReact()],
  server: {
    proxy: {
      "/devApi": {
        target: "http://localhost:8681",
        pathRewrite: { "^/api": "" },
      },
      // 若依的后端接口
      "/admin-api": {
        target: "http://172.24.112.52:48080",
      },
    },
  },
});
