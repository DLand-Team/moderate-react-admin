import devHelper from "@/helper/devHelper";
import pathHelper from "@/helper/pathHelper";
// import { request } from "@/utils/request";
import fs from "fs";

export interface PluginsConfig {
	name: string;
	type: string;
	dependencies: Record<PropertyKey, string>;
}

const removePluginHandler = async (ctx) => {
	const { url } = ctx.request.body; //获取post提交的数据
	const pluginName = url.split("/").at(-1).replace(".git", "");
	const pluginCachePath = pathHelper.pluginsCache + "/" + pluginName;
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
			const { pageName, isHasIndexPage } = result[i];
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

			devHelper.toRemovePluginPage({
				pluginName,
				pageName: pageName,
			});
		}
	}
	// 分析page以外的资源：provider,layouts
	{
		// 通过plugin的位置读出来内部是否存在provider
		const providers = devHelper.readProviders(pluginName);
		providers.forEach((item) => {
			devHelper.toRemoveProvider(pluginName, item);
		});

		const themes = devHelper.readThemes(pluginName);
		themes.forEach((item) => {
			devHelper.toRemoveTheme(pluginName, item);
		});

		const layouts = devHelper.readLayouts(pluginName);
		layouts.forEach((item) => {
			devHelper.toRemoveLayout(pluginName, item);
		});

		const i18nZh = devHelper.readI18n(pluginName, "zh");
		const i18nEn = devHelper.readI18n(pluginName, "en");
		i18nZh.forEach((item) => {
			devHelper.toRemoveI18n(pluginName, item + ".json", "zh");
		});
		i18nEn.forEach((item) => {
			devHelper.toRegisterI18n(pluginName, item + ".json", "en");
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
};

export default removePluginHandler;
