// 职责功能划分的仓库
import appStore from "./appStore";
import authStore from "./authStore";
import devStore from "./devStore";
import routerStore from "./routerStore";
import marketStore from "./marketStore";
import posStore from "./posStore";
import carrierStore from "./carrierStore";
import sortStore from "./sortStore";
import filterStore from "./filterStore";
import ruleStore from "./ruleStore";
import dealStore from "./dealStore";
// 组件划分
import categoryStore from "src/pages/homePage/cmsPage/categoryPage/services";

const stores = {
  appStore,
  authStore,
  devStore,
  routerStore,
  categoryStore,
  posStore,
  marketStore,
  carrierStore,
  sortStore,
  filterStore,
  ruleStore,
  dealStore,
};

export { stores };
