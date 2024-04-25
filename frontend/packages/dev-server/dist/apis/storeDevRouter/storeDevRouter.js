"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const handlers_1 = require("./handlers");
const storeDevRouter = new Router({ prefix: "/storeDev" });
storeDevRouter.get("/getStoreList", handlers_1.getStoreListHr);
storeDevRouter.post("/addStore", handlers_1.addStoreHr);
exports.default = storeDevRouter;
//# sourceMappingURL=storeDevRouter.js.map