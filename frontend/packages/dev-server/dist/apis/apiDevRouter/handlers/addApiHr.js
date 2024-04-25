"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devHelper_1 = __importDefault(require("@/helper/devHelper"));
const addApiHr = async (ctx) => {
    const { name } = ctx.request.body; //获取post提交的数据
    devHelper_1.default.toRegistApi(name);
    devHelper_1.default.toBuildApi(name);
    ctx.response.body = {
        status: 1,
        code: "200",
        data: {},
    };
};
exports.default = addApiHr;
//# sourceMappingURL=addApiHr.js.map