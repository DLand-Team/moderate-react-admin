import { PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { createSliceCustom } from "redux-eazy";
import names from "../names";
import { StoreState, TabItem, TabsHistory } from "./modal";
import { RouterHelper } from "src/reduxService/helper/routerHelper";
import { cloneDeep } from "lodash-es";
import { ROUTE_ID, ROUTE_INFO_CONFIG } from "src/config/routerConfig";

const initialState = (): StoreState => {
	const { routesConfig } = RouterHelper.createRoutesConfigByUserInfo({
		routesPermissions: [],
		routesConfigMap: cloneDeep(ROUTE_INFO_CONFIG),
	});
	const temp = routesConfig.find((item) => {
		return item.id === ROUTE_ID.homePage;
	}).children;
	const menuData = RouterHelper.createMenuDataLoop(temp, []);
	return {
		menuDefaultSelectedKeys: [],
		menuDefaultOpenKeys: null,
		menuData: menuData,
		tabsHistory: {},
		tabItems: [],
		activeTabKey: null,
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
			debugger;
		},
		setMenuDataAct: (state, { payload }: PayloadAction<ItemType[]>) => {
			state.menuData = payload;
		},
		setServerMenuDataAct: (
			state,
			{ payload }: PayloadAction<ItemType[]>,
		) => {
			state.menuData = payload;
		},
	},

	extraReducers: (builder) => {},
});

export default appSlice;
