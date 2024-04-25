"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const devHelper_1 = __importDefault(require("@/helper/devHelper"));
const pathHelper_1 = __importDefault(require("@/helper/pathHelper"));
const fs_1 = __importDefault(require("fs"));
// import { request } from "@/utils/request";
const child_process_1 = require("child_process");
const request_1 = require("@/utils/request");
const files = fs_1.default.readdirSync(pathHelper_1.default.pluginsCache + "/" + "moderate-plugin-markdown");
if (files.includes("providers")) {
    const providerFiles = (_a = fs_1.default
        .readdirSync(pathHelper_1.default.pluginsCache +
        "/" +
        "moderate-plugin-markdown/providers")) === null || _a === void 0 ? void 0 : _a.map((item) => {
        return item.replace(".tsx", "");
    });
    console.log(providerFiles);
}
console.log(files);
const addPluginHandler = async (ctx) => {
    const { url, type = "pnpm" } = ctx.request.body; //获取post提交的数据
    const pluginName = url.split("/").at(-1).replace(".git", "");
    const pluginCachePath = pathHelper_1.default.pluginsCache + "/" + pluginName;
    const { dependencies } = await request_1.request.get(`${url}/raw/master/config.json`);
    // 第一步下载，git下载，可以版本控制
    {
        const cmd = `git clone ${url}.git ${pluginName}`;
        const cwd = pathHelper_1.default.pluginsCache;
        await new Promise((resolve) => {
            (0, child_process_1.exec)(cmd, { cwd }, function (error, _, stderr) {
                if (error) {
                    console.log(stderr);
                }
                resolve(`run ${cwd} successfully`);
            });
        });
    }
    // 第二步拷贝，将插件文件拷贝到前端项目中的plugins中
    {
        //todo 检查一下是否存在
        const pluginPath = pathHelper_1.default.pluginsCache + "/" + pluginName;
        const targetPath = pathHelper_1.default.adminPlugins + "/" + pluginName;
        fs_1.default.cpSync(pluginPath, targetPath, { recursive: true });
    }
    {
        // 第二步安装依赖
        const depStr = Object.entries(dependencies)
            .map(([moduleName, moduleVersion]) => {
            return `${moduleName}@${moduleVersion}`;
        })
            .join(" ");
        const cmd = `${type} add ${depStr}`;
        const cwd = pathHelper_1.default.webPath;
        await new Promise((resolve) => {
            (0, child_process_1.exec)(cmd, { cwd }, function (error, _, stderr) {
                if (error) {
                    console.log(stderr);
                }
                resolve(`run ${cwd} successfully`);
            });
        });
    }
    // 第三步 注册
    {
        // 分析目录信息:获得了
        // pagePath：用来注册page使用
        // pageName：用来配置路由
        let result = {};
        devHelper_1.default.readDirForPluginInfoLoop(pluginCachePath + "/pages", result);
        const pageCode = devHelper_1.default.toFromat(fs_1.default.readFileSync(pathHelper_1.default.webRouterNamePath).toString());
        const regex = /export enum NAME {([\s\S]*?)}/;
        const match = pageCode.match(regex);
        let newResult = {};
        // 首先排除一下主路由配置中存在的。
        for (let i in result) {
            if (!(match === null || match === void 0 ? void 0 : match[1].includes(i))) {
                newResult[i] = result[i];
            }
        }
        result = newResult;
        Object.values(result).forEach((item) => {
            item.pagePath = item.pagePath.replace(pathHelper_1.default.pluginsCache, "plugins");
        });
        for (let i in result) {
            const { pageName, pagePath, isHasIndexPage } = result[i];
            let pathNew = `../${pageName}/pages`;
            const newRouteItem = {
                id: pageName,
                meta: {
                    title: pageName,
                },
                isNoAuth: true,
            };
            if (isHasIndexPage) {
                newRouteItem.component =
                    devHelper_1.default.capitalizeFirstLetter(pageName);
            }
            devHelper_1.default.toRegisterPluginPage({
                newItem: newRouteItem,
                path: pathNew,
                pageName: pageName,
                isPlugin: true,
                pagePath: pagePath,
                pluginConfig: {},
                isHasIndexPage,
            });
        }
    }
    // 分析page以外的资源：provider
    {
        // 通过plugin的位置读出来内部是否存在provider
        devHelper_1.default.toRegisterProvider();
    }
    ctx.response.body = {
        status: 1,
        code: "200",
        data: {
        // pageStruct,
        // routerStr,
        },
    };
};
exports.default = addPluginHandler;
//# sourceMappingURL=addPluginHr.js.map