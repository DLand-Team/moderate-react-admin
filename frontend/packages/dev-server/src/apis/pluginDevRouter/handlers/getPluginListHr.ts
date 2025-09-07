import pathHelper from "@/helper/pathHelper";
import { request } from "@/utils/request";
import fs from "fs";

type Plugin = {
	name: string;
	gitee: string;
	cover: string;
	isInstalled: boolean;
};
type PluginListConfigRes = {
	plugins: Plugin[];
};
const getPageListApiHr = async (ctx) => {
	const { plugins } = await request.get<any, PluginListConfigRes>(
		`https://gitee.com/qanglee/moderate-plugins/raw/master/config.json`,
	);
	// 获取一下当前项目，安装的插件列表
	const pluginsInstalled = fs
		.readdirSync(pathHelper.adminPlugins)
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

export default getPageListApiHr;
