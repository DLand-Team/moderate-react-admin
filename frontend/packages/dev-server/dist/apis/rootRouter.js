"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = Router();
router.get("/", async (ctx) => {
    await ctx.render("index", {
        title: "Hello Koa 2!",
    });
});
router.get("/string", async (ctx) => {
    ctx.body = "koa2 string";
});
router.get("/json", async (ctx) => {
    ctx.body = {
        title: "koa2 json",
    };
});
exports.default = router;
//# sourceMappingURL=rootRouter.js.map