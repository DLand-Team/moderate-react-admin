import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer({
            filename: "report.html",
            open: true,
            gzipSize: true,
            brotliSize: true,
        }),
        viteCompression(),
    ],
    resolve: {
        alias: [
            {
                find: /^src(.+)/,
                replacement: path.join(process.cwd(), "src/$1"),
            },
            {
                find: /^plugins(.+)/,
                replacement: path.join(process.cwd(), "plugins/$1"),
            },
        ],
    },
    server: {
        port: 8032,
        host: "0.0.0.0",
        proxy: {
            "/gitee": {
                target: "https://gitee.com",
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/gitee/, ""); },
            },
            "/pdfWorkerCdn": {
                target: "https://cdnjs.cloudflare.com",
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/pdfWorkerCdn/, ""); },
            },
            "/res": {
                target: "https://qiniu.moderate.run",
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/res/, ""); },
            },
            "/api": {
                target: "http://localhost:8681",
                changeOrigin: true, // 允许跨域
            },
            "/devApi": {
                target: "http://localhost:8681",
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/devApi/, ""); },
            },
            "/admin-api": {
                target: "http://172.24.153.225:48080",
                changeOrigin: true, // 允许跨域
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                // key自定义 value[] 插件同步package.json名称 或 src/相对路径下的指定文件 （自己鼠标点击进去可以看manualChunks ts类型）
                manualChunks: {
                    react: [
                        "react",
                        "react-dom",
                        "react-router-dom",
                        "history",
                        "dayjs",
                    ],
                    antd: ["antd", "@ant-design/icons"],
                    lodash: ["lodash-es", "lodash"],
                    axios: ["axios"],
                    "vendor-mian": [
                        "@dnd-kit/core",
                        "@dnd-kit/modifiers",
                        "@dnd-kit/sortable",
                        "@dnd-kit/utilities",
                        "framer-motion",
                        "qs",
                        "i18next",
                        "i18next-browser-languagedetector",
                        "i18next-http-backend",
                        "react-i18next",
                        "react-responsive",
                        "redux-eazy",
                    ],
                },
            },
        },
    },
});
