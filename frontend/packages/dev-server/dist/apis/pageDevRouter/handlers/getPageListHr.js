"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devHelper_1 = __importDefault(require("@/helper/devHelper"));
const uuid_1 = require("uuid");
const getPageListApiHr = async (ctx) => {
    let routesObj = devHelper_1.default.getRouteConfig();
    let pageList = Object.values(routesObj).map((item) => {
        return {
            id: (0, uuid_1.v4)(),
            name: item.id,
            path: item.path,
        };
    });
    ctx.response.body = {
        status: 1,
        code: "200",
        data: {
            code: "200",
            pageList: pageList,
        },
    };
};
exports.default = getPageListApiHr;
//# sourceMappingURL=getPageListHr.js.map