import { cloneDeep } from "lodash-es";
import { PayloadAction, createSliceCustom } from "redux-eazy";
import storageHelper from "src/common/utils/storageHelper";
import { AppHelper, MenuItem, RouterHelper } from "src/service/helper";
import names from "../names";
import {
	Setting,
	StoreState,
	TabItem,
	TabsHistory,
	ThemeColor,
	ThemeName,
} from "./modal";
import { ROUTE_CONFIG_MAP } from "src/router/routesConfig";
import { ROUTE_ID } from "src/router/name";
import { ReactNode } from "react";
import GlobalVar from "src/static/globalVar";
import { UUID } from "src/common/utils";
import settingData from "src/setting.json";

const initialState = (): StoreState => {
	// 初始化菜单，根据当前的homePage的路由结构，分析出菜单来
	const { routesTreeData = [] } =
		RouterHelper.createRoutesConfigByPermissions({
			routesPermissions: [],
			routesConfigMap: cloneDeep(ROUTE_CONFIG_MAP),
		});
	const children = routesTreeData.find((item) => {
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
		currentTheme: "light",
		themeMode: storageHelper.getItem("THEME") || "light",
		isShowOptionsDrawer: false,
		isCollapsedMenu: false,
		isShowMdDrawer: false,
		mdContent: "",
		winBoxList: [],
		settingData: settingData as Setting,
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
			state.themeMode = payload;
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
			{ payload }: PayloadAction<string[]>,
		) => {
			state.menuDefaultSelectedKeys = payload;
		},
		setMenuDefaultOpenKeys: (
			state,
			{ payload }: PayloadAction<string[]>,
		) => {
			state.menuDefaultOpenKeys = payload;
		},
		setMenuDataAct: (state, { payload }: PayloadAction<MenuItem[]>) => {
			state.menuData = payload;
		},
		setIsShowMdDrawer(state, { payload }: PayloadAction<boolean>) {
			state.isShowMdDrawer = payload;
		},
		setMdContent(state, { payload }: PayloadAction<string>) {
			state.mdContent = payload;
		},
		addWinBox(state, { payload }: PayloadAction<{ content: ReactNode }>) {
			const id = UUID();
			const winBoxContent = GlobalVar.service.get("winBoxContent");
			winBoxContent?.set(id, payload.content);
			state.winBoxList = [...state.winBoxList, id];
		},
		deleteWinBox() {
			// const id = UUID();
			// const winBoxContent = GlobalVar.service.get("winBoxContent");
			// winBoxContent![id] = payload.content;
			// GlobalVar.service.set("winBoxContent", winBoxContent!);
			// state.winBoxList = [...state.winBoxList, id];
		},
		setSettingData(state, { payload }: PayloadAction<Setting>) {
			state.settingData = payload;
		},
		setCurrentTheme(state, { payload }: PayloadAction<ThemeColor>) {
			state.currentTheme = payload;
		},
	},

	extraReducers: () => {},
});

export default appSlice;
