import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import path from "path";

export default defineConfig({
	html: {
		template: "./index.html",
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, "./src"),
			plugins: path.resolve(__dirname, "./plugins"),
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
				target: "http://111.229.110.163:48080",
				// target: "http://127.0.0.1:48080",
			},
		},
	},
});
