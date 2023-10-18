const path = require('path');

export default {
    src: path.resolve("src"),
    apisPath:path.resolve('src/apis'),
    webPath: path.resolve("../admin"),
    webSrcPath: path.resolve("../admin/src"),
    webRouterConfigPath: path.resolve("../admin/src/config/routerConfig.tsx"),
    webPagesPath: path.resolve("../admin/src/pages"),
    webServicePath: path.resolve("../admin/src/services"),
    webStoresPath: path.resolve("../admin/src/services/stores"),
    webStoresIndexPath: path.resolve("../admin/src/services/stores/index.ts"),
    webApisPath: path.resolve("../admin/src/services/apis"),
    webApisIndexPath: path.resolve("../admin/src/services/apis/index.ts"),
    webPageIndexPath: path.resolve("../admin/src/pages/index.ts"),
}