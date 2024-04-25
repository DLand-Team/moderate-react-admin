"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const handlers_1 = require("./handlers");
const apiDevRouter = new Router({ prefix: "/apiDev" });
apiDevRouter.get("/getApiList", handlers_1.getApiListHr);
apiDevRouter.post("/addApi", handlers_1.addApiHr);
exports.default = apiDevRouter;
//# sourceMappingURL=apiDevRouter.js.map