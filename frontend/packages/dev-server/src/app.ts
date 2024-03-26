import Koa from "Koa";
import bodyparser from "koa-bodyparser";
import json from "koa-json";
import logger from "koa-logger";
import onerror from "koa-onerror";
import views from "koa-views";
import {
	apiDevRouter,
	pageDevRouter,
	qiniuRouter,
	rootRouter,
	storeDevRouter,
} from "./apis";
import devHelper from "./helper/devHelper";

devHelper.toWatchFlies();
const routerArr = [
	qiniuRouter,
	rootRouter,
	apiDevRouter,
	pageDevRouter,
	storeDevRouter,
];
const app = new Koa();

// 一旦添加了 koa-onerror 中间件，当应用程序发生错误时，
// 它将被捕获并处理，确保应用程序的稳定性，并提供错误信息给开发者进行调试。
onerror(app);

// middlewares
app.use(
	bodyparser({
		enableTypes: ["json", "form", "text"],
	}),
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
	views(__dirname + "/views", {
		extension: "ejs",
	}),
);

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
		} else {
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

export default app;
