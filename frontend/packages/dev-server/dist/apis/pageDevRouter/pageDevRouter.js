"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const devHelper_1 = __importDefault(require("@/helper/devHelper"));
const handlers_1 = require("./handlers");
devHelper_1.default.toWatchFlies();
const pageDevRouter = new Router({ prefix: "/pageDev" });
// 获得页面列表
pageDevRouter.get("/getPageList", handlers_1.getPageListApiHr);
// 创建页面
pageDevRouter.post("/addPage", handlers_1.addPageApiHr);
exports.default = pageDevRouter;
//# sourceMappingURL=pageDevRouter.js.map