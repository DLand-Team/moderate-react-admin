"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa_1 = __importDefault(require("Koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_onerror_1 = __importDefault(require("koa-onerror"));
const koa_views_1 = __importDefault(require("koa-views"));
const apis_1 = require("./apis");
const routerArr = [
    apis_1.qiniuRouter,
    apis_1.rootRouter,
    apis_1.apiDevRouter,
    apis_1.pageDevRouter,
    apis_1.storeDevRouter,
    apis_1.pluginDevRouter,
];
const app = new Koa_1.default();
// 一旦添加了 koa-onerror 中间件，当应用程序发生错误时，
// 它将被捕获并处理，确保应用程序的稳定性，并提供错误信息给开发者进行调试。
(0, koa_onerror_1.default)(app);
// middlewares
app.use((0, koa_bodyparser_1.default)({
    enableTypes: ["json", "form", "text"],
}));
app.use((0, koa_json_1.default)());
app.use((0, koa_logger_1.default)());
app.use(require("koa-static")(__dirname + "/public"));
app.use((0, koa_views_1.default)(__dirname + "/views", {
    extension: "ejs",
}));
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                ok: false,
                code: 401,
                msg: err.originalError
                    ? err.originalError.message
                    : err.message,
            };
        }
        else {
            throw err;
        }
    });
});
routerArr.forEach((router) => {
    app.use(router.routes());
});
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});
exports.default = app;
//# sourceMappingURL=app.js.map