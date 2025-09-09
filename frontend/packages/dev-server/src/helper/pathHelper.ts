import path from "path";

// 只维护 webPath
const webPath = path.resolve("../../apps/admin-antd");

export default {
  src: path.resolve("src"),
  apisPath: path.resolve("src/apis"),
  pluginsCache: path.resolve("./pluginsCahche"),

  // 统一基于 webPath 拼接
  adminPlugins: path.join(webPath, "plugins"),
  webPath,
  webSrcPath: path.join(webPath, "src"),
  webRouterConfigPath: path.join(webPath, "src/router/routesConfig.ts"), // 路由配置数据
  webRouterStructPath: path.join(webPath, "src/router/routesTree.ts"), // 路由树结构
  webRouterNamePath: path.join(webPath, "src/router/name.ts"), // 路由名称
  pluginRouterConfigPath: path.join(
    webPath,
    "plugins/config/router/routesConfig.ts",
  ), // 路由配置数据
  pluginRouterStructPath: path.join(
    webPath,
    "plugins/config/router/routesTree.ts",
  ), // 路由树结构
  pluginRouterNamePath: path.join(webPath, "plugins/config/router/name.ts"), // 路由名称
  providerConfigPath: path.join(webPath, "plugins/config/providers.ts"), // provider配置数据
  themeConfigPath: path.join(webPath, "plugins/config/themes.ts"), // theme主题
  layoutConfigPath: path.join(webPath, "plugins/config/layouts.ts"), // 布局主题
  webLocalesPath: path.join(webPath, "plugins/config/i18n/locales"),
  webPagesPath: path.join(webPath, "src/pages"),
  webServicePath: path.join(webPath, "src/services"),
  webStoresPath: path.join(webPath, "src/services/stores"),
  webStoresIndexPath: path.join(webPath, "src/services/stores/index.ts"),
  webApisPath: path.join(webPath, "src/services/apis"),
  webApisIndexPath: path.join(webPath, "src/services/apis/index.ts"),
  webPageIndexPath: path.join(webPath, "src/pages/index.tsx"),
  pluginPageIndexPath: path.join(webPath, "plugins/config/pages.ts"),
  webSettingPath: path.join(webPath, "src/setting.json"),
};
