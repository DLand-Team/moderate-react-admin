const Router = require("koa-router");
import devHelper from "@/helper/devHelper";
import {
	getPluginListHr,
	addPluginHr,
	getPluginDetailHr,
	removePluginHandler,
} from "./handlers";
const pluginDevRouter = new Router({ prefix: "/pluginDev" });

devHelper.toWatchPluginsFlies();
// 获得页面列表
pluginDevRouter.get("/getPluginList", getPluginListHr);

// 添加插件
pluginDevRouter.post("/addPlugin", addPluginHr);

// 添加插件
pluginDevRouter.post("/removePlugin", removePluginHandler);

//获取插件详情
pluginDevRouter.post("/getPlugin", getPluginDetailHr);

export default pluginDevRouter;
