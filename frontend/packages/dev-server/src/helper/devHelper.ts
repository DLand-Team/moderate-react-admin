import { RouteItem } from "@/model";
import fs from "fs";
import pathHelper from "./pathHelper";
import ejs from "ejs";
import { Options } from "prettier";
import prettier from "@prettier/sync";
import path from "path";
import storeTemplateConfig from "@/templates/storeTemplate/config.json";
import apiTemplateConfig from "@/templates/apiTemplate/config.json";
import pageTemplateConfig from "@/templates/template1/config.json";
import { merge } from "lodash";
import { upFirstcharacter } from "@/utils";
import regHelper from "./regHelper";
import { deleteDir } from "@/utils/fsUtils";
const chokidar = require("chokidar");

const beautifyOptions: Options = {
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
	plguinTreeData = {};
	beautifyOptions = beautifyOptions;
	isCreate = false;
	capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	toFromat = (str, optionExtra: Options = {}) => {
		return prettier.format(str, { ...beautifyOptions, ...optionExtra });
	};

	// 获取路由数据中的routeArr的数组字符
	getRouteArrStr = (pageCode) => {
		const routeArrRegex = /];\n*?\/\/\s*?MODERATE_AUTO_4:END/;
		const matches = routeArrRegex.exec(pageCode);
		return matches;
	};

	getRouteArrPos = (pageCode) => {
		const routeArrRegex =
			/const\s*?routeArr\s*?:\s*?RouteItem\[\]\s*?=\s*?(\[[\s\S]*?\];*)/;
		const matches = routeArrRegex.exec(pageCode);
		return matches;
	};

	getPageExport = (pageCode) => {
		const regex =
			/export\s*?const\s*?pageList\s*?=\s*?\{\s*?([\s\S]*?)\s*?\}/;
		const matches = pageCode.match(regex);
		let str = matches[1];
		const regex1 = /\b\w+\b/g;
		const exportList = [...str.matchAll(regex1)].map((item) => item[0]);
		return [matches, exportList];
	};

	getRouteStructStr = (routerConfigPath: string = "") => {
		const pageCode = fs
			.readFileSync(routerConfigPath || pathHelper.webRouterStructPath)
			.toString();
		let oldStructStr = pageCode.match(
			/\/\/\s*?MODERATE_AUTO:START([\s\S]*?)\/\/ MODERATE_AUTO:END/g,
		)[0];
		return oldStructStr;
	};

	// 获得理由config字典
	getRouteConfig = (path: string = "") => {
		const pageCode = fs
			.readFileSync(path || pathHelper.webRouterConfigPath)
			.toString();
		let configStr = pageCode.split("=")[1].replace(/\n|\t/g, "");
		let result = {};
		eval(
			"let i18n = {t: (str) => {return `'%i18n.t('${str}')%'`}};let PLUGIN_ROUTE_CONFIG_MAP = {};result = " +
				configStr,
		);
		return result;
	};

	// 注册页面信息
	toRegistePage = (newItem, path, pageName) => {
		const namePath = pathHelper.webRouterNamePath;
		const configPath = pathHelper.webRouterConfigPath;
		const pagePath = pathHelper.webPageIndexPath;
		// 写入路由配置数据文件内容
		{
			const pageCode = fs.readFileSync(namePath).toString();
			let newCode = pageCode;
			// 第一步：注册name
			const regex = /export enum NAME {([\s\S]*?)}/;
			const match = pageCode.match(regex);
			if (match) {
				if (match[1]) {
					const enumContent = match[1].trim();
					// 如果enumContent的结尾时逗号，那么就不需要加逗号了
					if (enumContent.endsWith(",")) {
						newCode = newCode.replace(
							match[1],
							enumContent + "\n" + "  " + pageName + "\n",
						);
					} else {
						newCode = newCode.replace(
							match[1],
							enumContent + ",\n" + " " + pageName + "\n",
						);
					}
				}
			}
			fs.writeFileSync(namePath, this.toFromat(newCode));
		}
		{
			const pageCode = fs.readFileSync(configPath).toString();
			// 第二步骤：注册路由
			// 获得路由数据
			let routeConfig = this.getRouteConfig();
			routeConfig[pageName] = newItem;
			// 做个记号，然后替换
			routeConfig["end"] = "end";
			let configStr = pageCode.split("=");
			configStr[1] = JSON.stringify(routeConfig).replace(
				`"end":"end"`,
				"...PLUGIN_ROUTE_CONFIG_MAP",
			);

			let newRoutesStr = `\n${configStr.join("=")}\n`;
			let newCode = newRoutesStr;
			let str = this.toFromat(newCode);
			str = str
				.replace(/\"\'\%/g, "")
				.replace(/\%\'\"/g, "")
				.replace(/\'/g, '"');
			fs.writeFileSync(configPath, str);
		}
		// 写入组件表
		{
			const pageIndexCode = fs.readFileSync(pagePath).toString();
			const [matchExport, exportList] = this.getPageExport(pageIndexCode);
			exportList.push(newItem.component);
			let updateString: string = exportList.join(",");
			updateString = updateString.replace(
				"pluginsPages",
				"...pluginsPages",
			);
			let newCode = pageIndexCode.replace(matchExport[1], updateString);
			// 加个lazyComopnent
			let lazyStr = `const ${newItem.component} = lazy(() => import("${path}/${pageName}"));`;
			newCode = newCode.replace(
				"MODERATE_AUTO_PAGE_LAZY_IMPORT:END",
				`//${pageName} \n` +
					lazyStr +
					" \n //MODERATE_AUTO_PAGE_LAZY_IMPORT:END",
			);
			fs.writeFileSync(
				pagePath,
				this.toFromat(newCode).replace(/\'/g, '"'),
			);
		}
	};
	// 注册插件页面信息
	toRegisterPluginPage = ({
		newItem,
		pageName,
		pagePath,
		isHasIndexPage,
	}: {
		newItem;
		path: string;
		pageName: string;
		isPlugin: boolean;
		pluginConfig;
		pagePath: string;
		isHasIndexPage: boolean;
	}) => {
		const namePath = pathHelper.pluginRouterNamePath;
		const routeConfigPath = pathHelper.pluginRouterConfigPath;
		const pageIndexPath = pathHelper.pluginPageIndexPath;
		// 第一步：注册name
		{
			const pageCode = this.toFromat(
				fs.readFileSync(namePath).toString(),
			);
			let newCode = pageCode;
			const regex = /export enum PLUGIN_ROUTE_NAME {([\s\S]*?)}/;
			const match = pageCode.match(regex);
			if (match) {
				if (match[1]) {
					const enumContent = match[1].trim();
					// 如果enumContent的结尾时逗号，那么就不需要加逗号了
					if (enumContent.endsWith(",") || !enumContent) {
						newCode = newCode.replace(
							match[1],
							enumContent + "\n" + "  " + pageName + "\n",
						);
					} else {
						newCode = newCode.replace(
							match[1],
							enumContent + ",\n" + " " + pageName + "\n",
						);
					}
				} else {
					newCode = pageCode.replace(
						match[0],
						`export enum PLUGIN_ROUTE_NAME {${pageName}=10000}`,
					);
				}
			}
			fs.writeFileSync(namePath, this.toFromat(newCode));
		}
		// 第二步骤：注册路由
		{
			const pageCode = fs.readFileSync(routeConfigPath).toString();
			// 获得路由数据
			let routeConfig = this.getRouteConfig(
				pathHelper.pluginRouterConfigPath,
			);
			routeConfig[pageName] = newItem;
			// 做个记号，然后替换
			let configStr = pageCode.split("=");
			configStr[1] = JSON.stringify(routeConfig);
			let newRoutesStr = `\n${configStr.join("=")}\n`;
			let newCode = newRoutesStr;
			let str = this.toFromat(newCode);
			str = str
				.replace(/\"\'\%/g, "")
				.replace(/\%\'\"/g, "")
				.replace(/\'/g, '"');
			fs.writeFileSync(routeConfigPath, str);
		}

		// 写入组件表
		if (isHasIndexPage) {
			// 读插件目录，分析页面，然后在page表里进行注册
			const pageIndexCode = fs.readFileSync(pageIndexPath).toString();
			// 加个lazyComopnent
			let lazyStr = `const ${pageName} = lazy(() => import("${pagePath}"));`;
			// 注入引入组件的代码
			let newCode = pageIndexCode
				.replace(
					"//>>>PAGE_INPORT_SIGN<<<//",
					lazyStr + " \n //>>>PAGE_INPORT_SIGN<<<//",
				)
				.replace(
					"//>>>PAGE_SIGN<<<//",
					pageName + " \n //>>>PAGE_SIGN<<<//",
				);

			fs.writeFileSync(
				pageIndexPath,
				this.toFromat(newCode).replace(/\'/g, '"'),
			);
		}
	};
	toRemoveProvider = (pluginName: string, name: string) => {
		const reg = regHelper.matchInport(
			upFirstcharacter(name),
			`plugins/${pluginName}/providers/${name}`,
		);
		name = upFirstcharacter(name);
		const reg2 = regHelper.mathItem(name);
		let oldCode = this.toFromat(
			fs.readFileSync(pathHelper.providerConfigPath).toString(),
		);
		let newCode = oldCode.replace(reg, "").replace(reg2, "");
		fs.writeFileSync(pathHelper.providerConfigPath, this.toFromat(newCode));
		// 删除插件文件夹
		const targetPath = pathHelper.adminPlugins + "/" + pluginName;
		deleteDir(`${targetPath}`);
	};
	toRemovePluginPage = ({
		pageName,
		pluginName,
	}: {
		pluginName: string;
		pageName: string;
	}) => {
		// 干掉name
		{
			const namePath = pathHelper.pluginRouterNamePath;
			const reg2 = regHelper.mathItem(pageName);
			let oldCode = this.toFromat(fs.readFileSync(namePath).toString());
			let newCode = oldCode.replace(reg2, "");
			fs.writeFileSync(namePath, this.toFromat(newCode));
		}
		// 干掉路由配置数据
		{
			const routeConfigPath = pathHelper.pluginRouterConfigPath;
			const reg = regHelper.matchByKey(pageName);
			let oldCode = this.toFromat(
				fs.readFileSync(routeConfigPath).toString(),
			);
			let newCode = oldCode.replace(reg, "");
			fs.writeFileSync(routeConfigPath, this.toFromat(newCode));
		}
		// 干掉page
		{
			const pageIndexPath = pathHelper.pluginPageIndexPath;
			const reg = regHelper.matchLazyInport(upFirstcharacter(pageName));
			const reg2 = regHelper.mathItem(upFirstcharacter(pageName));
			let oldCode = this.toFromat(
				fs.readFileSync(pageIndexPath).toString(),
			);
			let newCode = oldCode.replace(reg, "").replace(reg2, "");
			fs.writeFileSync(pageIndexPath, this.toFromat(newCode));
		}
		// 删除插件文件夹
		const targetPath = pathHelper.adminPlugins + "/" + pluginName;
		deleteDir(`${targetPath}`);
	};
	toRegisterProvider = (pluginName: string, providerName) => {
		// 获取provider的代码
		const providerFileCode = fs
			.readFileSync(pathHelper.providerConfigPath)
			.toString();
		const importSign = "//>>>PROVIDER_INPORT_SIGN<<<//";
		const registerSign = "//>>>PROVIDER_SIGN<<<//";
		const importCode = `import { ${upFirstcharacter(providerName)} } from "plugins/${pluginName}/providers/${providerName}";`;
		let newCode = providerFileCode.replace(
			importSign,
			importCode + "\n" + importSign,
		);
		newCode = newCode.replace(
			registerSign,
			upFirstcharacter(providerName) + "\n" + registerSign,
		);
		fs.writeFileSync(
			pathHelper.providerConfigPath,
			this.toFromat(newCode).replace(/\'/g, '"'),
		);
	};

	toRegisterTheme = (pluginName: string, themeName) => {
		// 获取provider的代码
		const themeFileCode = fs
			.readFileSync(pathHelper.themeConfigPath)
			.toString();
		const importSign = "//>>>THEME_INPORT_SIGN<<<//";
		const registerSign = "//>>>THEME_SIGN<<<//";
		const importCode = `import { ${themeName} } from "plugins/${pluginName}/theme/${themeName}";`;
		let newCode = themeFileCode.replace(
			importSign,
			importCode + "\n" + importSign,
		);
		newCode = newCode.replace(
			registerSign,
			themeName + "\n" + registerSign,
		);
		fs.writeFileSync(
			pathHelper.themeConfigPath,
			this.toFromat(newCode).replace(/\'/g, '"'),
		);
	};

	toRemoveTheme = (pluginName: string, name: string) => {
		const reg = regHelper.matchInport(
			name,
			`plugins/${pluginName}/theme/${name}`,
		);
		const reg2 = regHelper.mathItem(name);
		let oldCode = this.toFromat(
			fs.readFileSync(pathHelper.themeConfigPath).toString(),
		);
		let newCode = oldCode.replace(reg, "").replace(reg2, "");
		fs.writeFileSync(pathHelper.themeConfigPath, this.toFromat(newCode));
		// 删除插件文件夹
		const targetPath = pathHelper.adminPlugins + "/" + pluginName;
		deleteDir(`${targetPath}`);
	};

	toRemoveLayout = (pluginName: string, layoutName: string) => {
		const name = upFirstcharacter(layoutName);
		const reg = regHelper.matchInport(
			name,
			`plugins/${pluginName}/layouts/${layoutName}`,
		);
		const reg2 = regHelper.mathItem(name);
		let oldCode = this.toFromat(
			fs.readFileSync(pathHelper.layoutConfigPath).toString(),
		);
		let newCode = oldCode.replace(reg, "").replace(reg2, "");
		fs.writeFileSync(pathHelper.layoutConfigPath, this.toFromat(newCode));
		// 删除插件文件夹
		const targetPath = pathHelper.adminPlugins + "/" + pluginName;
		deleteDir(`${targetPath}`);
	};
	toRegisterLayout = (pluginName: string, layoutName) => {
		// 获取provider的代码
		const lyoutFileCode = fs
			.readFileSync(pathHelper.layoutConfigPath)
			.toString();
		const importSign = "//>>>LAYOUT_INPORT_SIGN<<<//";
		const registerSign = "//>>>LAYOUT_SIGN<<<//";
		const importCode = `import { ${upFirstcharacter(layoutName)} } from "plugins/${pluginName}/layouts/${layoutName}";`;
		let newCode = lyoutFileCode.replace(
			importSign,
			importCode + "\n" + importSign,
		);
		newCode = newCode.replace(
			registerSign,
			upFirstcharacter(layoutName) + "\n" + registerSign,
		);
		fs.writeFileSync(
			pathHelper.layoutConfigPath,
			this.toFromat(newCode).replace(/\'/g, '"'),
		);
	};

	toRegisterI18n = (pluginName: string, name: string, lang: string) => {
		let langRootPath = pathHelper.webLocalesPath + `/${lang}/index.ts`;
		// 获取provider的代码
		const lyoutFileCode = fs.readFileSync(langRootPath).toString();
		const importSign = "//>>>I18n_INPORT_SIGN<<<//";
		const registerSign = "//>>>I18n_SIGN<<<//";
		const importCode = `import ${name} from "plugins/${pluginName}/i18n/${lang}/${name}.json";`;
		let newCode = lyoutFileCode.replace(
			importSign,
			importCode + "\n" + importSign,
		);
		newCode = newCode.replace(registerSign, name + "\n" + registerSign);
		fs.writeFileSync(
			langRootPath,
			this.toFromat(newCode).replace(/\'/g, '"'),
		);
	};

	// 注册仓库信息
	toRegistStore = (name: string) => {
		const input = fs.readFileSync(pathHelper.webStoresIndexPath).toString();
		const regex2 =
			/MODERATE_AUTO_STORES_1:START([\s\S]+?)\/\/\s*?MODERATE_AUTO_STORES_1:END/;
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
		fs.writeFileSync(pathHelper.webStoresIndexPath, newCode);
	};

	// 注册api信息
	toRegistApi = (name: string) => {
		const input = fs.readFileSync(pathHelper.webApisIndexPath).toString();
		const regex2 =
			/MODERATE_AUTO_APIS_1:START([\s\S]+?)\/\/\s*?MODERATE_AUTO_APIS_1:END/;
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
		fs.writeFileSync(pathHelper.webApisIndexPath, newCode);
	};

	// 创建页面
	toBuildPage = ({
		pagePath,
		pageName,
		isOutlet,
	}: {
		pagePath: string;
		pageName: string;
		isOutlet: boolean;
	}) => {
		let sourcePath = path.resolve(__dirname, "../templates/template1");
		let filePath = path.resolve(
			pathHelper.webPagesPath,
			pagePath,
			pageName,
		);
		fs.cpSync(sourcePath + "/res", filePath, { recursive: true });
		for (const fileItem of pageTemplateConfig.fileList) {
			const { extraName } = fileItem;
			const animalKotlin = ejs.compile(
				fs.readFileSync(
					path.resolve(sourcePath, `./ejs/${fileItem.template}`),
					"utf8",
				),
				{ strict: true },
			);
			let fileName = `index.${fileItem.type}`;
			this.writeFile(
				filePath + fileItem.path,
				`/${fileName}`,
				animalKotlin({
					...fileItem,
					pageName: pageName.replace(/^\S/, (s) => s.toUpperCase()),
					name: pageName + extraName,
					isOutlet: isOutlet,
				}),
			);
		}
	};

	toBuildStore = (name: string) => {
		let sourcePath = path.resolve(__dirname, "../templates/storeTemplate");
		let storePath = path.resolve(pathHelper.webStoresPath);
		let filePath = path.resolve(pathHelper.webPagesPath, storePath, name);
		for (const fileItem of storeTemplateConfig.fileList) {
			const animalKotlin = ejs.compile(
				fs.readFileSync(
					path.resolve(sourcePath, `./ejs/${fileItem.template}`),
					"utf8",
				),
				{ strict: true },
			);
			this.writeFile(
				filePath,
				`/${name}.${fileItem.type}`,
				animalKotlin({
					...fileItem,
					typeName: name.replace(/^\S/, (s) => s.toUpperCase()),
					name: name,
				}),
			);
		}
	};

	toBuildApi = (name: string) => {
		let sourcePath = path.resolve(__dirname, "../templates/apiTemplate");
		let filePath = path.resolve(pathHelper.webApisPath);
		for (const fileItem of apiTemplateConfig.fileList) {
			const animalKotlin = ejs.compile(
				fs.readFileSync(
					path.resolve(sourcePath, `./ejs/${fileItem.template}`),
					"utf8",
				),
				{ strict: true },
			);
			this.writeFile(
				filePath,
				`/${name}.${fileItem.type}`,
				animalKotlin({
					...fileItem,
					typeName: name.replace(/^\S/, (s) => s.toUpperCase()),
					name: name,
				}),
			);
		}
	};

	// 创建路由结构数据
	toCreateRouteStructData = (routerTreePath, pagePath) => {
		const pageCode = fs.readFileSync(routerTreePath).toString();
		let oldStructStr = this.getRouteStructStr(routerTreePath);
		// 创建路由数据，通过分析目录结构
		const routeStructData = this.createRouteStructDataByDir(pagePath);
		let newCode = pageCode
			.replace(oldStructStr, routeStructData)
			.replace(/\n+$/, "");
		fs.writeFileSync(routerTreePath, newCode.replace(/\'/g, '"'));
	};

	writeFile = function (filePath, filename, newContent) {
		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(filePath);
		}
		try {
			const oldContent = fs.readFileSync(filename, "utf8");
			if (oldContent == newContent) {
				return;
			}
		} catch (err) {}
		fs.writeFileSync(filePath + filename, newContent);
	};

	readFilrDirLoop = (path, data) => {
		try {
			const files = fs.readdirSync(path);
			files.forEach((file) => {
				const stats = fs.statSync(path + "/" + file);
				// 判断是否是文件夹
				if (!stats.isFile() && file !== "components") {
					data[file] = {};
					this.readFilrDirLoop(path + "/" + file, data[file]);
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	readDirForPluginInfoLoop = (path, data) => {
		try {
			const files = fs.readdirSync(path);
			files.forEach((file) => {
				const stats = fs.statSync(path + "/" + file);
				// 判断是否是文件夹
				if (!stats.isFile() && file !== "components") {
					const subFiles = fs.readdirSync(path + "/" + file);
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
		} catch (err) {}
	};

	readDirForPageLoop = (path, data) => {
		try {
			const files = fs.readdirSync(path);
			files.forEach((file) => {
				const stats = fs.statSync(path + "/" + file);
				// 判断是否是文件夹
				if (!stats.isFile() && file !== "components") {
					data[file] = {};
					this.readFilrDirLoop(path + "/" + file, data[file]);
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	readFileDirForPagesLoop = (path, data) => {
		try {
			const files = fs.readdirSync(path);
			files.forEach((file) => {
				const stats = fs.statSync(path + "/" + file);
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
		} catch (err) {
			console.log(err);
		}
	};

	createRouteStructDataByDir = (path) => {
		let data = {};
		this.readFilrDirLoop(path, data);
		data = merge(data, this.plguinTreeData);
		let newCode = `// MODERATE_AUTO:START \n export const ROUTE_STRUCT_CONFIG: RoutesStructDataItem[] = ${this.convertToRouteStructConfig(
			data,
		)} \n // MODERATE_AUTO:END`;
		return this.toFromat(newCode);
	};

	convertToRouteStructConfigLoop = (treeData) => {
		let routeStruct = [];
		for (const key in treeData) {
			if (treeData.hasOwnProperty(key) && key.endsWith("Page")) {
				const element = treeData[key];
				let id = `ROUTE_ID.${key}`;
				let temp: RouteItem = {
					id: id,
				};
				if (element && Object.keys(element).length > 0) {
					const children =
						this.convertToRouteStructConfigLoop(element);
					if (children.length > 0) {
						temp.children = children;
					}
				}
				routeStruct.push(temp);
			}
		}
		return routeStruct;
	};

	getStoreList = (name) => {
		const input = fs.readFileSync(pathHelper.webStoresIndexPath).toString();
		// 插入
		const regex2 =
			/MODERATE_AUTO_STORES_1:START([\s\S]+?)\/\/\s*?MODERATE_AUTO_STORES_1:END/;
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

	getApiList = (name) => {
		const input = fs.readFileSync(pathHelper.webApisIndexPath).toString();
		// 插入
		const regex2 =
			/MODERATE_AUTO_APIS_1:START([\s\S]+?)\/\/\s*?MODERATE_AUTO_APIS_1:END/;
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

	// 获得设置信息
	getSetting = () => {
		const str = fs.readFileSync(pathHelper.webSettingPath).toString();
		let settingData = {};
		eval("settingData = " + str);
		return settingData;
	};

	convertToRouteStructConfig = (data) => {
		return JSON.stringify(
			this.convertToRouteStructConfigLoop(data),
		).replace(/\"/g, "");
	};
	// 创建项目的主路由结构
	toreWriteRouteStructData = () => {
		this.toCreateRouteStructData(
			pathHelper.webRouterStructPath,
			pathHelper.webPagesPath,
		);
	};
	// 创建插件路由的结构
	toreWritePluginRouteStructData = () => {
		this.isCreate = true;
		// page的目录是多个有几个插件就有几个
		let pluginPagesPathArr = {};
		this.readFileDirForPagesLoop(
			pathHelper.adminPlugins,
			pluginPagesPathArr,
		);
		let result = {};
		Object.values(pluginPagesPathArr).forEach((pluginPagesPath) => {
			let data = {};
			this.readFilrDirLoop(pluginPagesPath, data);
			result = merge(result, data);
		});
		return result;
	};
	toWatchFlies = async () => {
		// 监听文件改变
		const watcher = chokidar.watch(pathHelper.webPagesPath, {
			ignored: /[\/\\]\./,
			ignoreInitial: false,
		});
		// 监听添加文件夹
		// 监听删除文件夹
		// 监听删除文件
		const handler = () => {
			this.plguinTreeData = this.toreWritePluginRouteStructData();
			this.toreWriteRouteStructData();
		};

		watcher.on("raw", handler).on("ready", async () => {
			this.plguinTreeData = this.toreWritePluginRouteStructData();
			this.toreWriteRouteStructData();
		});
	};
	toWatchPluginsFlies = async () => {
		const watcher = chokidar.watch(pathHelper.adminPlugins, {
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
	readProviders(pluginName: string): string[] {
		let pathStr = pathHelper.pluginsCache + "/" + pluginName;
		const files = fs.readdirSync(pathStr);
		if (files.includes("providers")) {
			const providerFiles = fs
				.readdirSync(pathStr + "/providers")
				.filter((item) => {
					const stats = fs.statSync(pathStr + "/providers/" + item);
					if (!stats.isDirectory()) {
						return true;
					}
				})
				?.map((item) => {
					return item.replace(".tsx", "");
				});
			console.log(providerFiles);
			return providerFiles;
		}
		return [];
	}
	readThemes(pluginName: string): string[] {
		let pathStr = pathHelper.pluginsCache + "/" + pluginName;
		const files = fs.readdirSync(pathStr);
		if (files.includes("theme")) {
			const themes = fs
				.readdirSync(pathStr + "/theme")
				.filter((item) => {
					const stats = fs.statSync(pathStr + "/theme/" + item);
					if (stats.isDirectory()) {
						return true;
					}
				})
				?.map((item) => {
					return item.replace(".ts", "");
				});
			return themes;
		}
		return [];
	}
	readLayouts(pluginName: string): string[] {
		let pathStr = pathHelper.pluginsCache + "/" + pluginName;
		const files = fs.readdirSync(pathStr);
		if (files.includes("layouts")) {
			const layouts = fs
				.readdirSync(pathStr + "/layouts")
				.filter((item) => {
					const stats = fs.statSync(pathStr + "/layouts/" + item);
					if (stats.isDirectory()) {
						return true;
					}
				})
				?.map((item) => {
					return item.replace(".ts", "");
				});
			return layouts;
		}
		return [];
	}
	readI18n(pluginName: string, lang: string): string[] {
		let pathStr = pathHelper.pluginsCache + "/" + pluginName;
		const files = fs.readdirSync(pathStr);
		if (files.includes("i18n")) {
			const list = fs
				.readdirSync(pathStr + "/i18n/" + lang)
				.filter((item) => {
					const stats = fs.statSync(
						pathStr + "/i18n/" + lang + "/" + item,
					);
					if (stats.isDirectory()) {
						return true;
					}
				})
				?.map((item) => {
					return item.replace(".json", "");
				});
			return list;
		}
		return [];
	}
	toRemoveI18n(pluginName: string, name: string, lang: string) {
		let pathStr = pathHelper.pluginsCache + "/" + pluginName;
		fs.unlinkSync(`${pathStr}/i18n/${lang}/${name}`);
	}
}

export default new devHelper();
