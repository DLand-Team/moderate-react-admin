import devHelper from "@/helper/devHelper";
import pathHelper from "@/helper/pathHelper";
import fs from "fs";
// import { request } from "@/utils/request";
import { exec } from "child_process";
import { request } from "@/utils/request";

export interface PluginsConfig {
	name: string;
	type: string;
	dependencies: Record<PropertyKey, string>;
}

const addPluginHandler = async (ctx) => {
	// const name = "PdfPage";
	// const url = "https://gitee.com/qanglee/moderate-plugin-pdf.git";
	const { url, type = "pnpm" } = ctx.request.body; //获取post提交的数据
	const pluginName = url.split("/").at(-1).replace(".git", "");
	const pluginCachePath = pathHelper.pluginsCache + "/" + pluginName;
	const { dependencies } = await request.get<any, PluginsConfig>(
		`${url}/raw/master/config.json`,
	);
	// 第一步下载，git下载，可以版本控制
	{
		const cmd = `git clone ${url}.git ${pluginName}`;
		const cwd = pathHelper.pluginsCache;
		await new Promise((resolve) => {
			exec(cmd, { cwd }, function (error, _, stderr) {
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
		const pluginPath = pathHelper.pluginsCache + "/" + pluginName;
		const targetPath = pathHelper.adminPlugins + "/" + pluginName;
		fs.cpSync(pluginPath, targetPath, { recursive: true });
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
			exec(cmd, { cwd }, function (error, _, stderr) {
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
		let result: Record<
			PropertyKey,
			{ pageName: string; pagePath: string; isHasIndexPage: boolean }
		> = {};
		devHelper.readDirForPluginInfoLoop(pluginCachePath + "/pages", result);
		const pageCode = devHelper.toFromat(
			fs.readFileSync(pathHelper.webRouterNamePath).toString(),
		);
		const regex = /export enum NAME {([\s\S]*?)}/;
		const match = pageCode.match(regex);
		let newResult = {};
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
					title: pageName,
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

	ctx.response.body = {
		status: 1,
		code: "200",
		data: {
			// pageStruct,
			// routerStr,
		},
	};
};

export default addPluginHandler;
