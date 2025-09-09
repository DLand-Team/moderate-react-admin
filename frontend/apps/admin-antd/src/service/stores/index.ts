import { stores as pluginStores } from "plugins/config/services/stores";
import appStore from "./appStore";
import authStore from "./authStore";
import categoryStore from "./categoryStore";
import commonStore from "./commonStore";
import dealStore from "./dealStore";
import devStore from "./devStore";
import routerStore from "./routerStore";
import sysStore from "./sysStore";

const stores = {
  appStore,
  commonStore,
  authStore,
  devStore,
  routerStore,
  dealStore,
  categoryStore,
  sysStore,
  ...pluginStores,
};

export { stores };
