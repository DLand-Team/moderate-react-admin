import { appHelper, createThunks, dpChain, reduxStore } from "src/service";
import httpApi from "./api";
import { GetPswInfoParams } from "./model";

const thunks = createThunks("appStore", {
  deleteTabHistoryAct: async ({ pathName }: { pathName: string }, api) => {
    const { tabItems } = api.getState().appStore;
    const tabsHistoryCopy = [...tabItems];
    const index = tabsHistoryCopy.findIndex((item) => {
      return item.key === pathName;
    });
    if (index != -1) {
      tabsHistoryCopy.splice(index, 1);
      dpChain("appStore").setTabItems(tabsHistoryCopy);
    }
  },
  // 直接根据路由生成菜单 前端主导的逻辑
  createMenuDataAct: async (_: null, api) => {
    const { menuPermissions, routesPermissions, menuListData, menuTreeData } =
      api.getState().authStore;
    const { routesMap, routesTree } = reduxStore.getState().routerStore;
    const menuData = appHelper.createMenuData({
      menuPermissions,
      routesPermissions,
      routesMap,
      routesTree,
      menuListData,
      menuTreeData,
    });
    dpChain("appStore").setMenuDataAct(menuData);
  },
  async changePswAct(arg: GetPswInfoParams) {
    return await httpApi.changePswApi(arg);
  },
});
export default thunks;
