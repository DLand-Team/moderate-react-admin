"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devHelper_1 = __importDefault(require("@/helper/devHelper"));
const uuid_1 = require("uuid");
const getStoreApiHr = async (ctx) => {
    const { name } = ctx.request.body;
    const matches = devHelper_1.default.getStoreList(name);
    ctx.response.body = {
        status: 1,
        code: "200",
        data: {
            list: matches.map((item) => {
                return {
                    id: (0, uuid_1.v4)(),
                    name: item,
                };
            }),
        },
    };
};
exports.default = getStoreApiHr;
//# sourceMappingURL=getStoreListHr.js.map