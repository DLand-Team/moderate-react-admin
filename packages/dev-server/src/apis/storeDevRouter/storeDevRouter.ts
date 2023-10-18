const Router = require("koa-router");

import { getStoreListHr, addStoreHr } from "./handlers";

const storeDevRouter = new Router({ prefix: "/storeDev" });

storeDevRouter.get("/getStoreList", getStoreListHr);

storeDevRouter.post("/addStore", addStoreHr);

export default storeDevRouter;
