const path = require("path");

export default {
  src: path.resolve("src"),
  apisPath: path.resolve("src/apis"),
  pluginsCache: path.resolve("./pluginsCahche"),
  adminPlugins: path.resolve("../admin-antd/plugins"),
  webPath: path.resolve("../admin-antd"),
  webSrcPath: path.resolve("../admin-antd/src"),
  webRouterConfigPath: path.resolve("../admin-antd/src/router/routesConfig.ts"), // 路由配置数据
  webRouterStructPath: path.resolve("../admin-antd/src/router/routesTree.ts"), // 路由树结构
  webRouterNamePath: path.resolve("../admin-antd/src/router/name.ts"), // 路由名称
  pluginRouterConfigPath: path.resolve(
    "../admin-antd/plugins/config/router/routesConfig.ts",
  ), // 路由配置数据
  pluginRouterStructPath: path.resolve(
    "../admin-antd/plugins/config/router/routesTree.ts",
  ), // 路由树结构
  pluginRouterNamePath: path.resolve(
    "../admin-antd/plugins/config/router/name.ts",
  ), // 路由名称
  providerConfigPath: path.resolve("../admin-antd/plugins/config/providers.ts"), // provider配置数据
  themeConfigPath: path.resolve("../admin-antd/plugins/config/themes.ts"), // theme主题
  layoutConfigPath: path.resolve("../admin-antd/plugins/config/layouts.ts"), // 布局主题
  webLocalesPath: path.resolve("../admin-antd/plugins/config/i18n/locales"),
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
  webSettingPath: path.resolve("../admin-antd/src/setting.json"),
};
