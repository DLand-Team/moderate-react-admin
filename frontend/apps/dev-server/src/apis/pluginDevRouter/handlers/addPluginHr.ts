import devHelper from "@/helper/devHelper";
import pathHelper from "@/helper/pathHelper";
import fs from "fs";
import { exec } from "child_process";
import { request } from "@/utils/request";
import { deleteDir } from "@/utils/fsUtils";
import { io } from "..";

export interface PluginsConfig {
	name: string;
	type: string;
	dependencies: Record<PropertyKey, string>;
	devDependencies: Record<PropertyKey, string>;
}

const addPluginHandler = async (ctx) => {
	const { url, type = "pnpm" } = ctx.request.body; //获取post提交的数据
	const pluginName = url.split("/").at(-1).replace(".git", "");
	const pluginCachePath = pathHelper.pluginsCache + "/" + pluginName;

	const { dependencies = {}, devDependencies = {} } = await request.get<
		any,
		PluginsConfig
	>(`${url}/raw/master/config.json`);

	// 第一步下载，git下载，可以版本控制
	{
		const files = fs.readdirSync(pathHelper.pluginsCache);
		// 判断插件是否存在，存在，拉一下代码
		if (!files.includes(pluginName)) {
			const cmd = `git clone ${url}.git ${pluginName}`;
			const cwd = pathHelper.pluginsCache;
			await new Promise((resolve) => {
				exec(cmd, { cwd }, function (error, _, __) {
					if (error) {
						// console.log(stderr);
					}
					resolve(`run ${cwd} successfully`);
				});
			});
		} else {
			const cmd = `git pull`;
			const cwd = `${pathHelper.pluginsCache}/${pluginName}`;
			await new Promise((resolve) => {
				exec(cmd, { cwd }, function (error, _, __) {
					if (error) {
						// console.log(stderr);
					}
					resolve(`run ${cwd} successfully`);
				});
			});
		}
	}
	// 第二步拷贝，将插件文件拷贝到前端项目中的plugins中
	{
		//todo 检查一下是否存在
		const pluginPath = pathHelper.pluginsCache + "/" + pluginName;
		const targetPath = pathHelper.adminPlugins + "/" + pluginName;
		fs.cpSync(pluginPath, targetPath, { recursive: true });
		// 删除拷贝过去的git文件夹
		// const files = fs.readdirSync(targetPath);
		// console.log(files);
		deleteDir(`${targetPath}/.git`);
	}

	{
		// 第二步安装依赖
		const depStr = Object.entries(dependencies)
			.map(([moduleName, moduleVersion]) => {
				return `${moduleName}@${moduleVersion}`;
			})
			.join(" ");
		const cmd = `${type} add ${depStr}`;
		const cwd = pathHelper.webPath;
		await new Promise((resolve) => {
			exec(cmd, { cwd }, function (error, _, __) {
				if (error) {
					// console.log(stderr);
				}
				resolve(`run ${cwd} successfully`);
			});
		});
		// 第二步安装依赖
		const devDepStr = Object.entries(devDependencies)
			.map(([moduleName, moduleVersion]) => {
				return `${moduleName}@${moduleVersion}`;
			})
			.join(" ");
		const devCmd = `${type} add ${devDepStr} -D`;
		await new Promise((resolve) => {
			exec(devCmd, { cwd }, function (error, _, __) {
				if (error) {
					// console.log(stderr);
				}
				resolve(`run ${devCmd} successfully`);
			});
		});
	}

	// 第三步 注册
	{
		// 分析目录信息:获得了
		// pagePath：用来注册page使用
		// pageName：用来配置路由
		let result: Record<
			PropertyKey,
			{ pageName: string; pagePath: string; isHasIndexPage: boolean }
		> = {};
		devHelper.readDirForPluginInfoLoop(pluginCachePath + "/pages", result);
		Object.keys(result).forEach((item) => {
			if (!item.endsWith("Page")) delete result[item];
		});
		const pageCode = devHelper.toFromat(
			fs.readFileSync(pathHelper.webRouterNamePath).toString(),
		);
		const regex = /export enum NAME {([\s\S]*?)}/;
		const match = pageCode.match(regex);
		let newResult = {};
		// 首先排除一下主路由配置中存在的。
		for (let i in result) {
			if (!match?.[1].includes(i)) {
				newResult[i] = result[i];
			}
		}
		result = newResult;
		Object.values(result).forEach((item) => {
			item.pagePath = item.pagePath.replace(
				pathHelper.pluginsCache,
				"plugins",
			);
		});
		for (let i in result) {
			const { pageName, pagePath, isHasIndexPage } = result[i];
			let pathNew = `../${pageName}/pages`;
			const newRouteItem: any = {
				id: pageName,
				meta: {
					title: `${pageName}:${pageName}Title`,
				},
				isNoAuth: true,
			};

			if (isHasIndexPage) {
				newRouteItem.component =
					devHelper.capitalizeFirstLetter(pageName);
			}

			devHelper.toRegisterPluginPage({
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
	// 分析page以外的资源：provider,layouts
	{
		// 通过plugin的位置读出来内部是否存在provider
		const providers = devHelper.readProviders(pluginName);
		providers.forEach((item) => {
			devHelper.toRegisterProvider(pluginName, item);
		});

		const themes = devHelper.readThemes(pluginName);
		themes.forEach((item) => {
			devHelper.toRegisterTheme(pluginName, item);
		});

		const layouts = devHelper.readLayouts(pluginName);
		layouts.forEach((item) => {
			devHelper.toRegisterLayout(pluginName, item);
		});

		const i18nZh = devHelper.readI18n(pluginName, "zh");
		const i18nEn = devHelper.readI18n(pluginName, "en");
		i18nZh.forEach((item) => {
			devHelper.toRegisterI18n(pluginName, item, "zh");
		});
		i18nEn.forEach((item) => {
			devHelper.toRegisterI18n(pluginName, item, "en");
		});
	}

	ctx.response.body = {
		status: 1,
		code: "200",
		data: {
			// pageStruct,
			// routerStr,
		},
	};
	let timer;
	io.on("isRecived", () => {
		clearInterval(timer);
	});
	io.emit("addPluginSuccessed");
	setTimeout(() => {
		io.emit("addPluginSuccessed");
	}, 3000);
};

export default addPluginHandler;
