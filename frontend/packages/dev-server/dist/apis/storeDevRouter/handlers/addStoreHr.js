"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devHelper_1 = __importDefault(require("@/helper/devHelper"));
const addStoreHr = async (ctx) => {
    const { name } = ctx.request.body;
    devHelper_1.default.toRegistStore(name);
    devHelper_1.default.toBuildStore(name);
    ctx.response.body = {
        status: 1,
        code: "200",
        data: {},
    };
};
exports.default = addStoreHr;
//# sourceMappingURL=addStoreHr.js.map