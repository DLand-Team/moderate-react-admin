import { cloneDeep } from "lodash-es";
import { PayloadAction, createSliceCustom } from "redux-eazy";
import storageHelper from "src/common/utils/storageHelper";
import { ROUTE_ID } from "src/router/name";
import { ROUTE_CONFIG_MAP } from "src/router/routesConfig";
import { AppHelper, MenuItem, RouterHelper } from "src/service/helper";
import settingData from "src/setting.json";

import names from "../names";
import { Setting, StoreState, TabItem, ThemeName, XY_POS } from "./modal";

export enum ThemeColor {
	light = "light",
	dark = "dark",
}

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
		tabItems: storageHelper.getItem("TABS_HISTORY") || [],
		activeTabKey: "",
		isThemeAuto: storageHelper.getItem("IS_THEME_AUTO"),
		currentTheme: storageHelper.getItem("THEME") || ThemeColor.light,
		isShowOptionsDrawer: false,
		isCollapsedMenu: false,
		isShowMdDrawer: false,
		mdContent: "",
		winBoxList: [],
		settingData: settingData as Setting,
		language: storageHelper.getItem("LANGUAGE") || "en",
		winPosTemp: {
			x: 0,
			y: 0,
		},
		winBoxTitleTemp: "",
		refreshKey: [],
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
			state.currentTheme = payload;
			storageHelper.setItem("THEME", payload);
		},
		setActiveTabKey(state, { payload }: PayloadAction<string>) {
			state.activeTabKey = payload;
		},
		setTabItems(state, { payload }: PayloadAction<TabItem[]>) {
			state.tabItems = payload;
			storageHelper.setItem("TABS_HISTORY", payload);
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
		addWinBox(
			state,
			{
				payload: { id, pos, title, type },
			}: PayloadAction<{
				id: string;
				pos: XY_POS;
				title: string;
				type?: string;
			}>,
		) {
			state.winBoxList = [
				...state.winBoxList,
				{
					type,
					id,
				},
			];
			state.winPosTemp = pos;
			state.winBoxTitleTemp = title;
		},
		deleteWinBox(
			state,
			{
				payload: { id },
			}: PayloadAction<{
				id: string | number;
			}>,
		) {
			let temp = cloneDeep(state.winBoxList);
			let targetId = temp.findIndex((item) => {
				return item.id == id;
			});
			if (targetId != -1) {
				temp.splice(targetId, 1);
			}
			state.winBoxList = temp;
		},
		setSettingData(state, { payload }: PayloadAction<Setting>) {
			state.settingData = payload;
		},
		setIsThemeAuto(state, { payload }: PayloadAction<boolean>) {
			state.isThemeAuto = payload;
		},
		setLanguage(state, { payload }: PayloadAction<string>) {
			state.language = payload;
			storageHelper.setItem("LANGUAGE", payload);
		},
		setRefreshKey(state, { payload }: PayloadAction<string[]>) {
			state.refreshKey = payload;
		},
	},
});

export default appSlice;
