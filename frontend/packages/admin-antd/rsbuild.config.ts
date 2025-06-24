import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import path from "path";

export default defineConfig({
	html: {
		template: "./index.html",
	},
	source: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	plugins: [pluginReact(), pluginSass()],
	server: {
		proxy: {
			"/devApi": {
				target: "http://localhost:8681",
				pathRewrite: { "^/devApi": "" },
			},
			// 若依的后端接口
			"/admin-api": {
				target: "http://localhost:48080",
			},
		},
	},
});
