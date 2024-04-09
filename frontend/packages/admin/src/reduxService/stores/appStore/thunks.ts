/*
 * @Author: qanglee 545540710@qq.com
 * @Date: 2024-03-18 11:51:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-19 11:33:51
 * @FilePath: /admin/src/reduxService/stores/appStore/thunks.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* Instruments */
import { type Location } from "react-router-dom";
import { AppHelper } from "src/reduxService/helper";
import { dp } from "../..";
import { createThunks } from "../../setup";
import names from "../names";

const thunks = createThunks(names.appStore, {
  deleteTabHistoryAct: async ({ pathName }: { pathName: string }, api) => {
    const { tabsHistory } = api.getState().appStore;
    {
      const tabsHistoryCopy = [...tabsHistory];
      const index = tabsHistoryCopy.findIndex((item) => {
        return item.pathname === pathName;
      });
      tabsHistoryCopy.splice(index, 1);
      dp("appStore", "setTabsHistory", tabsHistoryCopy);
    }
  },
  addTabHistoryActionAct: async ({ newItem }: { newItem: Location }, api) => {
    const { tabsHistory } = api.getState().appStore;
    if (
      !tabsHistory.some((item) => {
        return item.pathname === newItem.pathname;
      })
    ) {
      dp("appStore", "setTabsHistory", [...tabsHistory, newItem]);
    }
  },
  createMenuDataAct: async (_, api) => {
    const { menuPermissions } = api.getState().authStore;
    const { children = [] } = menuPermissions || {};
    const menuData = AppHelper.createMenuData(children);
    dp("appStore", "setMenuDataAct", menuData);
  },
});
export default thunks;
