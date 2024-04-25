"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pathHelper_1 = __importDefault(require("@/helper/pathHelper"));
const request_1 = require("@/utils/request");
const fs_1 = __importDefault(require("fs"));
const getPageListApiHr = async (ctx) => {
    const { plugins } = await request_1.request.get(`https://gitee.com/qanglee/moderate-plugins/raw/master/config.json`);
    // 获取一下当前项目，安装的插件列表
    const pluginsInstalled = fs_1.default
        .readdirSync(pathHelper_1.default.adminPlugins)
        .filter((item) => {
        return item.includes("plugin");
    });
    plugins.forEach((item) => {
        item.isInstalled = pluginsInstalled.includes(item.name);
    });
    ctx.response.body = {
        status: 1,
        code: "200",
        data: {
            code: "200",
            list: plugins,
        },
    };
};
exports.default = getPageListApiHr;
//# sourceMappingURL=getPluginListHr.js.map