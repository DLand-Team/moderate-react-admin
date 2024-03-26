const Router = require("koa-router");

import { getApiListHr, addApiHr } from "./handlers";

const apiDevRouter = new Router({ prefix: "/apiDev" });

apiDevRouter.get("/getApiList", getApiListHr);

apiDevRouter.post("/addApi", addApiHr);

export default apiDevRouter;
