const Router = require("koa-router");
import devHelper from "@/helper/devHelper";
import { getPageListApiHr, addPageApiHr } from "./handlers";

devHelper.toWatchFlies();
const pageDevRouter = new Router({ prefix: "/pageDev" });

// 获得页面列表
pageDevRouter.get("/getPageList", getPageListApiHr);

// 创建页面
pageDevRouter.post("/addPage", addPageApiHr);

export default pageDevRouter;
