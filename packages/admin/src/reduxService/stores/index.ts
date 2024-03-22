import appStore from "./appStore";
import authStore from "./authStore";
import devStore from "./devStore";
import routerStore from "./routerStore";
// 组件文件夹下的store
import categoryStore from "src/pages/homePage/cmsPage/categoryPage/services";
import posStore from "src/pages/homePage/cpdPage/posPage/posListPage/services";

const stores = {
	appStore,
	authStore,
	devStore,
	routerStore,
	categoryStore,
	posStore,
};

export { stores };
