"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const pathHelper_1 = __importDefault(require("./pathHelper"));
const ejs_1 = __importDefault(require("ejs"));
const sync_1 = __importDefault(require("@prettier/sync"));
const path_1 = __importDefault(require("path"));
const config_json_1 = __importDefault(require("@/templates/storeTemplate/config.json"));
const config_json_2 = __importDefault(require("@/templates/apiTemplate/config.json"));
const config_json_3 = __importDefault(require("@/templates/template1/config.json"));
const lodash_1 = require("lodash");
const chokidar = require("chokidar");
const beautifyOptions = {
    parser: "typescript",
    arrowParens: "always",
    bracketSameLine: false,
    bracketSpacing: true,
    semi: true,
    experimentalTernaries: false,
    singleQuote: false,
    jsxSingleQuote: false,
    quoteProps: "as-needed",
    trailingComma: "all",
    singleAttributePerLine: false,
    htmlWhitespaceSensitivity: "css",
    vueIndentScriptAndStyle: false,
    proseWrap: "preserve",
    insertPragma: false,
    printWidth: 65,
    requirePragma: false,
    tabWidth: 2,
    useTabs: false,
    embeddedLanguageFormatting: "auto",
};
class devHelper {
    constructor() {
        this.plguinTreeData = {};
        this.beautifyOptions = beautifyOptions;
        this.isCreate = false;
        this.toFromat = (str) => {
            return sync_1.default.format(str, beautifyOptions);
        };
        // 获取路由数据中的routeArr的数组字符
        this.getRouteArrStr = (pageCode) => {
            const routeArrRegex = /];\n*?\/\/\s*?MODERATE_AUTO_4:END/;
            const matches = routeArrRegex.exec(pageCode);
            return matches;
        };
        this.getRouteArrPos = (pageCode) => {
            const routeArrRegex = /const\s*?routeArr\s*?:\s*?RouteItem\[\]\s*?=\s*?(\[[\s\S]*?\];*)/;
            const matches = routeArrRegex.exec(pageCode);
            return matches;
        };
        this.getPageExport = (pageCode) => {
            const regex = /export\s*?const\s*?pageList\s*?=\s*?\{\s*?([\s\S]*?)\s*?\}/;
            const matches = pageCode.match(regex);
            let str = matches[1];
            const regex1 = /\b\w+\b/g;
            const exportList = [...str.matchAll(regex1)].map((item) => item[0]);
            return [matches, exportList];
        };
        this.getRouteStructStr = (routerConfigPath = "") => {
            const pageCode = fs_1.default
                .readFileSync(routerConfigPath || pathHelper_1.default.webRouterStructPath)
                .toString();
            let oldStructStr = pageCode.match(/\/\/\s*?MODERATE_AUTO:START([\s\S]*?)\/\/ MODERATE_AUTO:END/g)[0];
            return oldStructStr;
        };
        // 获得理由config字典
        this.getRouteConfig = (path = "") => {
            const pageCode = fs_1.default
                .readFileSync(path || pathHelper_1.default.webRouterConfigPath)
                .toString();
            let configStr = pageCode.split("=")[1].replace(/\n|\t/g, "");
            let result = {};
            eval("let i18n = {t: (str) => {return `'%i18n.t('${str}')%'`}};let PLUGIN_ROUTE_INFO_CONFIG = {};result = " +
                configStr);
            return result;
        };
        // 注册页面信息
        this.toRegistePage = (newItem, path, pageName) => {
            const namePath = pathHelper_1.default.webRouterNamePath;
            const configPath = pathHelper_1.default.webRouterConfigPath;
            const pagePath = pathHelper_1.default.webPageIndexPath;
            // 写入路由配置数据文件内容
            {
                const pageCode = fs_1.default.readFileSync(namePath).toString();
                let newCode = pageCode;
                // 第一步：注册name
                const regex = /export enum NAME {([\s\S]*?)}/;
                const match = pageCode.match(regex);
                if (match) {
                    if (match[1]) {
                        const enumContent = match[1].trim();
                        // 如果enumContent的结尾时逗号，那么就不需要加逗号了
                        if (enumContent.endsWith(",")) {
                            newCode = newCode.replace(match[1], enumContent + "\n" + "  " + pageName + "\n");
                        }
                        else {
                            newCode = newCode.replace(match[1], enumContent + ",\n" + " " + pageName + "\n");
                        }
                    }
                }
                fs_1.default.writeFileSync(namePath, this.toFromat(newCode));
            }
            {
                const pageCode = fs_1.default.readFileSync(configPath).toString();
                // 第二步骤：注册路由
                // 获得路由数据
                let routeConfig = this.getRouteConfig();
                routeConfig[pageName] = newItem;
                // 做个记号，然后替换
                routeConfig["end"] = "end";
                let configStr = pageCode.split("=");
                configStr[1] = JSON.stringify(routeConfig).replace(`"end":"end"`, "...PLUGIN_ROUTE_INFO_CONFIG");
                let newRoutesStr = `\n${configStr.join("=")}\n`;
                let newCode = newRoutesStr;
                let str = this.toFromat(newCode);
                str = str
                    .replace(/\"\'\%/g, "")
                    .replace(/\%\'\"/g, "")
                    .replace(/\'/g, '"');
                fs_1.default.writeFileSync(configPath, str);
            }
            // 写入组件表
            {
                const pageIndexCode = fs_1.default.readFileSync(pagePath).toString();
                const [matchExport, exportList] = this.getPageExport(pageIndexCode);
                exportList.push(newItem.component);
                let updateString = exportList.join(",");
                updateString = updateString.replace("pluginsPages", "...pluginsPages");
                let newCode = pageIndexCode.replace(matchExport[1], updateString);
                // 加个lazyComopnent
                let lazyStr = `const ${newItem.component} = lazy(() => import("${path}/${pageName}"));`;
                newCode = newCode.replace("MODERATE_AUTO_PAGE_LAZY_IMPORT:END", `//${pageName} \n` +
                    lazyStr +
                    " \n //MODERATE_AUTO_PAGE_LAZY_IMPORT:END");
                fs_1.default.writeFileSync(pagePath, this.toFromat(newCode).replace(/\'/g, '"'));
            }
        };
        // 注册插件页面信息
        this.toRegisterPluginPage = ({ newItem, pageName, pagePath, isHasIndexPage, }) => {
            const namePath = pathHelper_1.default.pluginRouterNamePath;
            const routeConfigPath = pathHelper_1.default.pluginRouterConfigPath;
            const pageIndexPath = pathHelper_1.default.pluginPageIndexPath;
            // 第一步：注册name
            {
                const pageCode = this.toFromat(fs_1.default.readFileSync(namePath).toString());
                let newCode = pageCode;
                const regex = /export enum PLUGIN_ROUTE_NAME {([\s\S]*?)}/;
                const match = pageCode.match(regex);
                if (match) {
                    if (match[1]) {
                        const enumContent = match[1].trim();
                        // 如果enumContent的结尾时逗号，那么就不需要加逗号了
                        if (enumContent.endsWith(",") || !enumContent) {
                            newCode = newCode.replace(match[1], enumContent + "\n" + "  " + pageName + "\n");
                        }
                        else {
                            newCode = newCode.replace(match[1], enumContent + ",\n" + " " + pageName + "\n");
                        }
                    }
                    else {
                        newCode = pageCode.replace(match[0], `export enum PLUGIN_ROUTE_NAME {${pageName}=10000}`);
                    }
                }
                fs_1.default.writeFileSync(namePath, this.toFromat(newCode));
            }
            // 第二步骤：注册路由
            {
                const pageCode = fs_1.default.readFileSync(routeConfigPath).toString();
                // 获得路由数据
                let routeConfig = this.getRouteConfig(pathHelper_1.default.pluginRouterConfigPath);
                routeConfig[pageName] = newItem;
                // 做个记号，然后替换
                let configStr = pageCode.split("=");
                configStr[1] = JSON.stringify(routeConfig);
                let newRoutesStr = `\n${configStr.join("=")}\n`;
                let newCode = newRoutesStr;
                let str = this.toFromat(newCode);
                str.replace(/\"\'\%/g, "")
                    .replace(/\%\'\"/g, "")
                    .replace(/\'/g, '"');
                fs_1.default.writeFileSync(routeConfigPath, str);
            }
            // 写入组件表
            if (isHasIndexPage) {
                // 读插件目录，分析页面，然后在page表里进行注册
                const pageIndexCode = fs_1.default.readFileSync(pageIndexPath).toString();
                // 加个lazyComopnent
                let lazyStr = `const ${pageName} = lazy(() => import("${pagePath}"));`;
                // 注入引入组件的代码
                let newCode = pageIndexCode
                    .replace("//>>>PAGE_INPORT_SIGN<<<//", lazyStr + " \n //>>>PAGE_INPORT_SIGN<<<//")
                    .replace("//>>>PAGE_SIGN<<<//", pageName + " \n //>>>PAGE_SIGN<<<//");
                fs_1.default.writeFileSync(pageIndexPath, this.toFromat(newCode).replace(/\'/g, '"'));
            }
        };
        this.toRegisterProvider = () => { };
        // 注册仓库信息
        this.toRegistStore = (name) => {
            const input = fs_1.default.readFileSync(pathHelper_1.default.webStoresIndexPath).toString();
            const regex2 = /MODERATE_AUTO_STORES_1:START([\s\S]+?)\/\/\s*?MODERATE_AUTO_STORES_1:END/;
            const matchStores = input.match(regex2);
            const regex = /\/\/ MODERATE_AUTO_STORES_1:START/g;
            const newStoreDeclaration = `import ${name} from "./${name}/${name}";\n`;
            let newCode = input.replace(regex, `${newStoreDeclaration}$&`);
            const matches = this.getStoreList(name);
            let newStores = matches
                .filter((item) => {
                return item;
            })
                .map((item) => {
                return `  ${item}`;
            })
                .join(",\n");
            const str = "\nconst stores = {\n" + newStores + "\n};\n";
            newCode = newCode.replace(matchStores[1], str);
            fs_1.default.writeFileSync(pathHelper_1.default.webStoresIndexPath, newCode);
        };
        // 注册api信息
        this.toRegistApi = (name) => {
            const input = fs_1.default.readFileSync(pathHelper_1.default.webApisIndexPath).toString();
            const regex2 = /MODERATE_AUTO_APIS_1:START([\s\S]+?)\/\/\s*?MODERATE_AUTO_APIS_1:END/;
            const matchStores = input.match(regex2);
            const matches = this.getApiList(name);
            let newApis = matches
                .filter((item) => {
                return item;
            })
                .map((item) => {
                return `\nexport { default as ${item} } from "./${item}"`;
            })
                .join(";");
            let newCode = input.replace(matchStores[1], newApis + "\n");
            fs_1.default.writeFileSync(pathHelper_1.default.webApisIndexPath, newCode);
        };
        // 创建页面
        this.toBuildPage = ({ pagePath, pageName, isOutlet, }) => {
            let sourcePath = path_1.default.resolve(__dirname, "../templates/template1");
            let filePath = path_1.default.resolve(pathHelper_1.default.webPagesPath, pagePath, pageName);
            fs_1.default.cpSync(sourcePath + "/res", filePath, { recursive: true });
            for (const fileItem of config_json_3.default.fileList) {
                const { extraName } = fileItem;
                const animalKotlin = ejs_1.default.compile(fs_1.default.readFileSync(path_1.default.resolve(sourcePath, `./ejs/${fileItem.template}`), "utf8"), { strict: true });
                let fileName = `index.${fileItem.type}`;
                // 将pageName的首字母大写
                this.writeFile(filePath + fileItem.path, `/${fileName}`, animalKotlin({
                    ...fileItem,
                    pageName: pageName.replace(/^\S/, (s) => s.toUpperCase()),
                    name: pageName + extraName,
                    isOutlet: isOutlet,
                }));
            }
        };
        this.toBuildStore = (name) => {
            let sourcePath = path_1.default.resolve(__dirname, "../templates/storeTemplate");
            let storePath = path_1.default.resolve(pathHelper_1.default.webStoresPath);
            let filePath = path_1.default.resolve(pathHelper_1.default.webPagesPath, storePath, name);
            for (const fileItem of config_json_1.default.fileList) {
                const animalKotlin = ejs_1.default.compile(fs_1.default.readFileSync(path_1.default.resolve(sourcePath, `./ejs/${fileItem.template}`), "utf8"), { strict: true });
                this.writeFile(filePath, `/${name}.${fileItem.type}`, animalKotlin({
                    ...fileItem,
                    typeName: name.replace(/^\S/, (s) => s.toUpperCase()),
                    name: name,
                }));
            }
        };
        this.toBuildApi = (name) => {
            let sourcePath = path_1.default.resolve(__dirname, "../templates/apiTemplate");
            let filePath = path_1.default.resolve(pathHelper_1.default.webApisPath);
            for (const fileItem of config_json_2.default.fileList) {
                const animalKotlin = ejs_1.default.compile(fs_1.default.readFileSync(path_1.default.resolve(sourcePath, `./ejs/${fileItem.template}`), "utf8"), { strict: true });
                // 将pageName的首字母大写
                this.writeFile(filePath, `/${name}.${fileItem.type}`, animalKotlin({
                    ...fileItem,
                    typeName: name.replace(/^\S/, (s) => s.toUpperCase()),
                    name: name,
                }));
            }
        };
        // 创建路由结构数据
        this.toCreateRouteStructData = (routerTreePath, pagePath) => {
            const pageCode = fs_1.default.readFileSync(routerTreePath).toString();
            let oldStructStr = this.getRouteStructStr(routerTreePath);
            // 创建路由数据，通过分析目录结构
            const routeStructData = this.createRouteStructDataByDir(pagePath);
            let newCode = pageCode
                .replace(oldStructStr, routeStructData)
                .replace(/\n+$/, "");
            fs_1.default.writeFileSync(routerTreePath, newCode.replace(/\'/g, '"'));
        };
        this.writeFile = function (filePath, filename, newContent) {
            if (!fs_1.default.existsSync(filePath)) {
                fs_1.default.mkdirSync(filePath);
            }
            try {
                const oldContent = fs_1.default.readFileSync(filename, "utf8");
                if (oldContent == newContent) {
                    return;
                }
            }
            catch (err) { }
            fs_1.default.writeFileSync(filePath + filename, newContent);
        };
        this.readFilrDirLoop = (path, data) => {
            try {
                const files = fs_1.default.readdirSync(path);
                files.forEach((file) => {
                    const stats = fs_1.default.statSync(path + "/" + file);
                    // 判断是否是文件夹
                    if (!stats.isFile() && file !== "components") {
                        data[file] = {};
                        this.readFilrDirLoop(path + "/" + file, data[file]);
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        };
        this.readDirForPluginInfoLoop = (path, data) => {
            try {
                const files = fs_1.default.readdirSync(path);
                files.forEach((file) => {
                    const stats = fs_1.default.statSync(path + "/" + file);
                    // 判断是否是文件夹
                    if (!stats.isFile() && file !== "components") {
                        const subFiles = fs_1.default.readdirSync(path + "/" + file);
                        console.log(subFiles);
                        let isHasIndexPage = subFiles.some((item) => {
                            return item == "index.tsx";
                        });
                        data[file] = {
                            pagePath: path + "/" + file,
                            pageName: file,
                            isHasIndexPage,
                        };
                        this.readDirForPluginInfoLoop(path + "/" + file, data);
                    }
                });
            }
            catch (err) { }
        };
        this.readDirForPageLoop = (path, data) => {
            try {
                const files = fs_1.default.readdirSync(path);
                files.forEach((file) => {
                    const stats = fs_1.default.statSync(path + "/" + file);
                    // 判断是否是文件夹
                    if (!stats.isFile() && file !== "components") {
                        data[file] = {};
                        this.readFilrDirLoop(path + "/" + file, data[file]);
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        };
        this.readFileDirForPagesLoop = (path, data) => {
            try {
                const files = fs_1.default.readdirSync(path);
                files.forEach((file) => {
                    const stats = fs_1.default.statSync(path + "/" + file);
                    // 判断是否是文件夹
                    if (!stats.isFile() && file.includes("plugin-")) {
                        let temp = {};
                        let pluginPath = path + "/" + file;
                        this.readFilrDirLoop(pluginPath, temp);
                        if ("pages" in temp) {
                            data[file] = pluginPath + "/pages";
                        }
                    }
                });
                console.log(data);
            }
            catch (err) {
                console.log(err);
            }
        };
        this.createRouteStructDataByDir = (path) => {
            let data = {};
            this.readFilrDirLoop(path, data);
            data = (0, lodash_1.merge)(data, this.plguinTreeData);
            let newCode = `// MODERATE_AUTO:START \n export const ROUTE_STRUCT_CONFIG: RoutesStructDataItem[] = ${this.convertToRouteStructConfig(data)} \n // MODERATE_AUTO:END`;
            return this.toFromat(newCode);
        };
        this.convertToRouteStructConfigLoop = (treeData) => {
            let routeStruct = [];
            for (const key in treeData) {
                if (treeData.hasOwnProperty(key) && key.endsWith("Page")) {
                    const element = treeData[key];
                    let id = `ROUTE_ID.${key}`;
                    let temp = {
                        id: id,
                    };
                    if (element && Object.keys(element).length > 0) {
                        const children = this.convertToRouteStructConfigLoop(element);
                        if (children.length > 0) {
                            temp.children = children;
                        }
                    }
                    routeStruct.push(temp);
                }
            }
            return routeStruct;
        };
        this.getStoreList = (name) => {
            const input = fs_1.default.readFileSync(pathHelper_1.default.webStoresIndexPath).toString();
            // 插入
            const regex2 = /MODERATE_AUTO_STORES_1:START([\s\S]+?)\/\/\s*?MODERATE_AUTO_STORES_1:END/;
            const matchStores = input.match(regex2);
            const matches = [];
            const regex3 = /(\w+Store),*/g;
            let match;
            if (matchStores[1]) {
                while ((match = regex3.exec(matchStores[1]))) {
                    matches.push(match[1]);
                }
                matches.push(name);
            }
            // 去掉空值
            return matches.filter((item) => item);
        };
        this.getApiList = (name) => {
            const input = fs_1.default.readFileSync(pathHelper_1.default.webApisIndexPath).toString();
            // 插入
            const regex2 = /MODERATE_AUTO_APIS_1:START([\s\S]+?)\/\/\s*?MODERATE_AUTO_APIS_1:END/;
            const matchStores = input.match(regex2);
            const matches = [];
            const regex3 = /export\s*{.*?\bas\s*(\w+)\s*}/g;
            let match;
            if (matchStores[1]) {
                while ((match = regex3.exec(matchStores[1]))) {
                    matches.push(match[1]);
                }
                matches.push(name);
            }
            // 去掉空值
            return matches.filter((item) => item);
        };
        this.convertToRouteStructConfig = (data) => {
            return JSON.stringify(this.convertToRouteStructConfigLoop(data)).replace(/\"/g, "");
        };
        // 创建项目的主路由结构
        this.toreWriteRouteStructData = () => {
            this.toCreateRouteStructData(pathHelper_1.default.webRouterStructPath, pathHelper_1.default.webPagesPath);
        };
        // 创建插件路由的结构
        this.toreWritePluginRouteStructData = () => {
            this.isCreate = true;
            // page的目录是多个有几个插件就有几个
            let pluginPagesPathArr = {};
            this.readFileDirForPagesLoop(pathHelper_1.default.adminPlugins, pluginPagesPathArr);
            let result = {};
            Object.values(pluginPagesPathArr).forEach((pluginPagesPath) => {
                let data = {};
                this.readFilrDirLoop(pluginPagesPath, data);
                result = (0, lodash_1.merge)(result, data);
            });
            return result;
        };
        this.toWatchFlies = async () => {
            // 监听文件改变
            const watcher = chokidar.watch(pathHelper_1.default.webPagesPath, {
                ignored: /[\/\\]\./,
                ignoreInitial: false,
            });
            // 监听添加文件夹
            // 监听删除文件夹
            // 监听删除文件
            watcher
                .on("raw", async () => {
                this.plguinTreeData = this.toreWritePluginRouteStructData();
                this.toreWriteRouteStructData();
            })
                .on("ready", async () => {
                this.plguinTreeData = this.toreWritePluginRouteStructData();
                this.toreWriteRouteStructData();
            });
        };
        this.toWatchPluginsFlies = async () => {
            const watcher = chokidar.watch(pathHelper_1.default.adminPlugins, {
                ignored: /[\/\\]\./,
                ignoreInitial: false,
            });
            // 监听添加文件夹
            // 监听删除文件夹
            // 监听删除文件
            watcher
                .on("raw", async () => {
                this.plguinTreeData = this.toreWritePluginRouteStructData();
                this.toreWriteRouteStructData();
            })
                .on("ready", async () => {
                this.plguinTreeData = this.toreWritePluginRouteStructData();
                this.toreWriteRouteStructData();
            });
        };
    }
    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
exports.default = new devHelper();
//# sourceMappingURL=devHelper.js.map