import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../names";
import { StoreState, TabItem, TabsHistory } from "./modal";
import { MenuItem, RouterHelper } from "src/reduxService/helper/routerHelper";
import { cloneDeep } from "lodash-es";
import { ROUTE_ID, ROUTE_INFO_CONFIG } from "src/config/routerConfig";

const initialState = (): StoreState => {
	const { routesConfig = [] } = RouterHelper.createRoutesConfigByUserInfo({
		routesPermissions: [],
		routesConfigMap: cloneDeep(ROUTE_INFO_CONFIG),
	});
	const children = routesConfig.find((item) => {
		return item!?.id === ROUTE_ID.homePage;
	})?.children;
	const menuData = RouterHelper.createMenuDataLoop(children!, []);
	return {
		menuDefaultSelectedKeys: [],
		menuDefaultOpenKeys: null,
		menuData: menuData,
		tabsHistory: {},
		tabItems: [],
		activeTabKey: "",
	};
};

const appSlice = createSliceCustom({
	name: names.appStore,
	stateInit: initialState,
	reducers: {
		setTabsHistory(state, { payload }: PayloadAction<TabsHistory>) {
			state.tabsHistory = payload;
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
		setServerMenuDataAct: (
			state,
			{ payload }: PayloadAction<MenuItem[]>,
		) => {
			state.menuData = payload;
		},
	},

	extraReducers: () => {},
});

export default appSlice;
