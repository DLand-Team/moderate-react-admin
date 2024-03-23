import { RouteItem } from "@/model";
import fs from "fs";
import pathHelper from "./pathHelper";
import ejs from "ejs";
import regHelper from "@/helper/regHelper";
import path from "path";
import beautify from "js-beautify/js";
import storeTemplateConfig from "@/templates/storeTemplate/config.json";
import apiTemplateConfig from "@/templates/apiTemplate/config.json";
import pageTemplateConfig from "@/templates/template1/config.json";
const chokidar = require("chokidar");

const beautifyOptions = {
	indent_size: "2",
	indent_char: " ",
	max_preserve_newlines: "5",
	preserve_newlines: true,
	keep_array_indentation: false,
	break_chained_methods: false,
	indent_scripts: "normal",
	brace_style: "collapse",
	space_before_conditional: true,
	unescape_strings: false,
	jslint_happy: false,
	end_with_newline: false,
	wrap_line_length: "0",
	indent_inner_html: false,
	comma_first: false,
	e4x: false,
	indent_empty_lines: false,
};

class devHelper {
	beautifyOptions = beautifyOptions;
	isCreate = false;
	capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	toFromat = (str) => {
		return beautify(str, beautifyOptions);
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

	getRouteStructStr = () => {
		const pageCode = fs
			.readFileSync(pathHelper.webRouterConfigPath)
			.toString();
		let oldStructStr = pageCode.match(
			/\/\/\s*?MODERATE_AUTO:START([\s\S]*?)\/\/ MODERATE_AUTO:END/g,
		)[0];
		return oldStructStr;
	};

	// 获得理由config字典
	getRouteConfig = () => {
		const pageCode = fs
			.readFileSync(pathHelper.webRouterConfigPath)
			.toString();
		const matches = regHelper.getStrBetween(
			pageCode,
			"MODERATE_AUTO_3:START",
			"//MODERATE_AUTO_3:END",
		);
		let configStr = matches[1].split("=")[1].replace(/\n|\t/g, "");
		let result = {};
		eval("result = " + configStr);
		return result;
	};

	// 注册页面信息
	toRegistePage = (newItem, path, pageName) => {
		// 写入路由配置数据文件内容
		{
			const pageCode = fs
				.readFileSync(pathHelper.webRouterConfigPath)
				.toString();

			let newCode = pageCode;
			// 第一步：注册name
			{
				const regex = /export enum ROUTE_NAME {([\s\S]*?)}/;
				const match = pageCode.match(regex);
				if (match) {
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

			// 第二步骤：注册路由
			// 获得路由数据
			let routeConfig = this.getRouteConfig();
			routeConfig[pageName] = newItem;
			const matchestest = regHelper.getStrBetween(
				pageCode,
				"MODERATE_AUTO_3:START",
				"//MODERATE_AUTO_3:END",
			);
			let configStr = matchestest[1].split("=");
			configStr[1] = JSON.stringify(routeConfig);
			let newRoutesStr = `\n${configStr.join("=")}\n`;
			newCode = newCode.replace(
				matchestest[1],
				"\n" +
					this.toFromat(
						newRoutesStr.replace(/"([^"]+)":/g, "$1:") + "\n",
					),
			);
			fs.writeFileSync(
				pathHelper.webRouterConfigPath,
				newCode.replace(/\'/g, '"'),
			);
		}

		// 写入组件表
		{
			const pageIndexCode = fs
				.readFileSync(pathHelper.webPageIndexPath)
				.toString();
			const [matchExport, exportList] = this.getPageExport(pageIndexCode);
			exportList.push(newItem.component);
			const updateString = exportList.join(",");
			let newCode = pageIndexCode.replace(matchExport[1], updateString);
			// 加个lazyComopnent
			let lazyStr = `const ${newItem.component} = lazy(() => import("${path}/${pageName}/${pageName}"));`;
			newCode = newCode.replace(
				"MODERATE_AUTO_PAGE_LAZY_IMPORT:END",
				`//${pageName} \n` +
					lazyStr +
					" \n //MODERATE_AUTO_PAGE_LAZY_IMPORT:END",
			);
			fs.writeFileSync(
				pathHelper.webPageIndexPath,
				this.toFromat(newCode).replace(/\'/g, '"'),
			);
		}
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
	toBuildPage = (pagePath: string, pageName: string) => {
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
			let fileName = `${pageName}.${fileItem.type}`;
			// 将pageName的首字母大写
			this.writeFile(
				filePath + fileItem.path,
				`/${fileName}`,
				animalKotlin({
					...fileItem,
					pageName: pageName.replace(/^\S/, (s) => s.toUpperCase()),
					name: pageName + extraName,
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
			// 将pageName的首字母大写
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
	toCreateRouteStructData = (routerConfigPath, pagePath) => {
		const pageCode = fs
			.readFileSync(pathHelper.webRouterConfigPath)
			.toString();
		let oldStructStr = this.getRouteStructStr();
		// 创建路由数据，通过分析目录结构
		const routeStructData = this.createRouteStructDataByDir(pagePath);
		let newCode = pageCode
			.replace(oldStructStr, routeStructData)
			.replace(/\n+$/, "");
		fs.writeFileSync(routerConfigPath, newCode.replace(/\'/g, '"'));
	};

	writeFile = function (filePath, filename, newContent) {
		if (fs.existsSync(filePath)) {
			console.log("该路径已存在");
		} else {
			console.log("该路径不存在");
			fs.mkdirSync(filePath);
		}
		try {
			const oldContent = fs.readFileSync(filename, "utf8");
			if (oldContent == newContent) {
				console.warn(
					`* Skipping file '${filename}' because it is up-to-date`,
				);
				return;
			}
		} catch (err) {}
		fs.writeFileSync(filePath + filename, newContent);
		console.warn(`* Updating outdated file '${filename}'`);
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

	createRouteStructDataByDir = (path) => {
		let data = {};
		this.readFilrDirLoop(path, data);
		let newCode = `// MODERATE_AUTO:START \n export const ROUTE_STRUCT_CONFIG: RoutesStructDataItem[] = ${this.convertToRouteStructConfig(
			data,
		)} \n // MODERATE_AUTO:END`;
		return beautify(newCode, beautifyOptions);
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

	convertToRouteStructConfig = (data) => {
		return JSON.stringify(
			this.convertToRouteStructConfigLoop(data),
		).replace(/\"/g, "");
	};
	toWatchFlies = async () => {
		const toreWriteRouteStructData = () => {
			if (this.isCreate) {
				this.isCreate = false;
			} else {
				this.isCreate = true;
				this.toCreateRouteStructData(
					pathHelper.webRouterConfigPath,
					pathHelper.webPagesPath,
				);
			}
		};
		const rouerConfigWatcher = chokidar.watch(
			pathHelper.webRouterConfigPath,
			{
				ignored: /[\/\\]\./,
				ignoreInitial: false,
			},
		);
		rouerConfigWatcher
			.on("unlinkDir", function (path) {
				console.log("Directory", path, "has been removed");
			})
			.on("addDir", function (path) {
				console.log("Directory", path, "has been added");
			})
			.on("add", async function (path) {
				console.log("File", path, "has been change");
			})
			.on("change", async function (path) {
				console.log("File", path, "has been change");
				toreWriteRouteStructData();
			})
			.on("unlink", function (path) {
				console.log("File", path, "has been delete");
			});
		const watcher = chokidar.watch(pathHelper.webPageIndexPath, {
			ignored: /[\/\\]\./,
			ignoreInitial: false,
		});
		// 监听添加文件夹
		// 监听删除文件夹
		// 监听删除文件
		watcher
			.on("unlinkDir", function (path) {
				console.log("Directory", path, "has been removed");
			})
			.on("addDir", function (path) {
				console.log("Directory", path, "has been added");
			})
			.on("add", async function (path) {
				console.log("File", path, "has been change");
			})
			.on("change", async function (path) {
				console.log("File", path, "has been change");
				toreWriteRouteStructData();
			})
			.on("unlink", function (path) {
				console.log("File", path, "has been delete");
			});
	};
}

export default new devHelper();
