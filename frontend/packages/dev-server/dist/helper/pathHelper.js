"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = {
	src: path.resolve("src"),
	apisPath: path.resolve("src/apis"),
	pluginsCache: path.resolve("./pluginsCahche"),
	adminPlugins: path.resolve("../admin-antd/plugins"),
	webPath: path.resolve("../admin-antd"),
	webSrcPath: path.resolve("../admin-antd/src"),
	webRouterConfigPath: path.resolve(
		"../admin-antd/src/router/routesConfig.ts",
	),
	webRouterStructPath: path.resolve("../admin-antd/src/router/routesTree.ts"),
	webRouterNamePath: path.resolve("../admin-antd/src/router/name.ts"),
	pluginRouterConfigPath: path.resolve(
		"../admin-antd/plugins/config/router/routesConfig.ts",
	),
	pluginRouterStructPath: path.resolve(
		"../admin-antd/plugins/config/router/routesTree.ts",
	),
	pluginRouterNamePath: path.resolve(
		"../admin-antd/plugins/config/router/name.ts",
	),
	webPagesPath: path.resolve("../admin-antd/src/pages"),
	webServicePath: path.resolve("../admin-antd/src/services"),
	webStoresPath: path.resolve("../admin-antd/src/services/stores"),
	webStoresIndexPath: path.resolve(
		"../admin-antd/src/services/stores/index.ts",
	),
	webApisPath: path.resolve("../admin-antd/src/services/apis"),
	webApisIndexPath: path.resolve("../admin-antd/src/services/apis/index.ts"),
	webPageIndexPath: path.resolve("../admin-antd/src/pages/index.tsx"),
	pluginPageIndexPath: path.resolve("../admin-antd/plugins/config/pages.ts"),
};
//# sourceMappingURL=pathHelper.js.map
