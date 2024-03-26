const Router = require("koa-router");
import { getPageListApiHr, addPageApiHr } from "./handlers";

const pageDevRouter = new Router({ prefix: "/pageDev" });

// 获得页面列表
pageDevRouter.get("/getPageList", getPageListApiHr);

// 创建页面
pageDevRouter.post("/addPage", addPageApiHr);


export default pageDevRouter;
