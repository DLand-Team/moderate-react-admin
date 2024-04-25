"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const devHelper_1 = __importDefault(require("@/helper/devHelper"));
const handlers_1 = require("./handlers");
const pluginDevRouter = new Router({ prefix: "/pluginDev" });
devHelper_1.default.toWatchPluginsFlies();
// 获得页面列表
pluginDevRouter.get("/getPluginList", handlers_1.getPluginListHr);
// 创建页面
pluginDevRouter.post("/addPlugin", handlers_1.addPluginHr);
//获取插件详情
pluginDevRouter.post("/getPlugin", handlers_1.getPluginDetailHr);
exports.default = pluginDevRouter;
//# sourceMappingURL=pluginDevRouter.js.map