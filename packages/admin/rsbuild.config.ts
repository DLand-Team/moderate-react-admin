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
});
