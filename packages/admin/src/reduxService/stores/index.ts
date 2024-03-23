// 职责功能划分的仓库
import appStore from "./appStore";
import authStore from "./authStore";
import devStore from "./devStore";
import routerStore from "./routerStore";
// 组件划分
import categoryStore from "src/pages/homePage/cmsPage/categoryPage/services";
import posStore from "./posStore";

const stores = {
	appStore,
	authStore,
	devStore,
	routerStore,
	categoryStore,
	posStore,
};

export { stores };
