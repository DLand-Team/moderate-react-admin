const path = require("path");

export default {
	src: path.resolve("src"),
	apisPath: path.resolve("src/apis"),
	pluginsCache: path.resolve("./pluginsCahche"),
	adminPlugins: path.resolve("../admin/plugins"),
	webPath: path.resolve("../admin"),
	webSrcPath: path.resolve("../admin/src"),
	webRouterConfigPath: path.resolve("../admin/src/router/routesConfig.ts"), // 路由配置数据
	webRouterStructPath: path.resolve("../admin/src/router/routesTree.ts"), // 路由树结构
	webRouterNamePath: path.resolve("../admin/src/router/name.ts"), // 路由名称
	pluginRouterConfigPath: path.resolve(
		"../admin/plugins/config/router/routesConfig.ts",
	), // 路由配置数据
	pluginRouterStructPath: path.resolve(
		"../admin/plugins/config/router/routesTree.ts",
	), // 路由树结构
	pluginRouterNamePath: path.resolve(
		"../admin/plugins/config/router/name.ts",
	), // 路由名称
	webPagesPath: path.resolve("../admin/src/pages"),
	webServicePath: path.resolve("../admin/src/services"),
	webStoresPath: path.resolve("../admin/src/services/stores"),
	webStoresIndexPath: path.resolve("../admin/src/services/stores/index.ts"),
	webApisPath: path.resolve("../admin/src/services/apis"),
	webApisIndexPath: path.resolve("../admin/src/services/apis/index.ts"),
	webPageIndexPath: path.resolve("../admin/src/pages/index.tsx"),
	pluginPageIndexPath: path.resolve("../admin/plugins/config/pages.ts"),
};
