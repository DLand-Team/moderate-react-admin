"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devHelper_1 = __importDefault(require("@/helper/devHelper"));
const addPageHandler = async (ctx) => {
    const { name, path, isNoAuth, isOutlet = false, index = false, depands, } = ctx.request.body; //获取post提交的数据
    let pathNew = `.${path}`;
    const newItem = {
        id: name,
        meta: {
            title: name,
        },
        component: devHelper_1.default.capitalizeFirstLetter(name),
        isNoAuth,
        index,
    };
    if (depands) {
        newItem.depands = [depands.split("/").slice(-1)[0]];
    }
    devHelper_1.default.toRegistePage(newItem, pathNew, name);
    devHelper_1.default.toBuildPage({ pagePath: pathNew, pageName: name, isOutlet });
    ctx.response.body = {
        status: 1,
        code: "200",
        data: {},
    };
};
exports.default = addPageHandler;
//# sourceMappingURL=addPageHr.js.map