import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../names";
import { StoreState, TabItem, TabsHistory } from "./modal";
import { ItemType } from "antd/es/menu/hooks/useItems";

const initialState = (): StoreState => {
	return {
		menuDefaultSelectedKeys: [],
		menuDefaultOpenKeys: null,
		menuData: [],
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
			;
		},
		setMenuDefaultOpenKeys: (
			state,
			{ payload }: PayloadAction<string[]>,
		) => {
			state.menuDefaultOpenKeys = payload;
		},
		setMenuDataAct: (state, { payload }: PayloadAction<ItemType[]>) => {
			state.menuData = payload;
			;
		},
	},

	extraReducers: (builder) => {},
});

export default appSlice;
