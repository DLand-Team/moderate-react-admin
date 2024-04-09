import { cloneDeep } from "lodash-es";
import { PayloadAction, createSliceCustom } from "redux-eazy";
import storageHelper from "src/common/utils/storageHelper";
import { ROUTE_ID, ROUTE_INFO_CONFIG } from "src/config/routerConfig";
import { AppHelper, MenuItem, RouterHelper } from "src/reduxService/helper";
import names from "../names";
import { StoreState, TabItem, TabsHistory, ThemeName } from "./modal";

const initialState = (): StoreState => {
  const { routesConfig = [] } = RouterHelper.createRoutesConfigByPermissions({
    routesPermissions: [],
    routesConfigMap: cloneDeep(ROUTE_INFO_CONFIG),
  });
  const children = routesConfig.find((item) => {
    return item!?.id === ROUTE_ID.HomePage;
  })?.children;
  const menuData = AppHelper.createMenuDataLoop(children!, []);
  return {
    menuDefaultSelectedKeys: [],
    menuDefaultOpenKeys: null,
    menuData: menuData,
    tabsHistory: storageHelper.getItem("TABS_HISTORY") || [],
    tabItems: [],
    activeTabKey: "",
    theme: storageHelper.getItem("THEME") || "light",
    isShowOptionsDrawer: false,
    isCollapsedMenu: false,
  };
};

const appSlice = createSliceCustom({
  name: names.appStore,
  stateInit: initialState,
  reducers: {
    setIsCollapsedMenu(state, { payload }: PayloadAction<boolean>) {
      state.isCollapsedMenu = payload;
    },
    setIsShowOptionsDrawer(state, { payload }: PayloadAction<boolean>) {
      state.isShowOptionsDrawer = payload;
    },
    setTheme(state, { payload }: PayloadAction<ThemeName>) {
      state.theme = payload;
      storageHelper.setItem("THEME", payload);
    },
    setTabsHistory(state, { payload }: PayloadAction<TabsHistory>) {
      state.tabsHistory = payload;
      storageHelper.setItem("TABS_HISTORY", payload);
    },
    setActiveTabKey(state, { payload }: PayloadAction<string>) {
      state.activeTabKey = payload;
    },
    setTabItems(state, { payload }: PayloadAction<TabItem[]>) {
      state.tabItems = payload;
    },
    setMenuDefaultSelectedKeys: (
      state,
      { payload }: PayloadAction<string[]>
    ) => {
      state.menuDefaultSelectedKeys = payload;
    },
    setMenuDefaultOpenKeys: (state, { payload }: PayloadAction<string[]>) => {
      state.menuDefaultOpenKeys = payload;
    },
    setMenuDataAct: (state, { payload }: PayloadAction<MenuItem[]>) => {
      state.menuData = payload;
    },
  },

  extraReducers: () => {},
});

export default appSlice;
