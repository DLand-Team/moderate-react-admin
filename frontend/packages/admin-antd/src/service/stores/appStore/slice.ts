import { PayloadAction } from "redux-eazy";
import { cloneDeep } from "src/common/utils";
import storageHelper from "src/common/utils/storageHelper";
import { appHelper, createSlice } from "src/service/setup";
import settingData from "src/setting.json";
import {
	MenuItem,
	Setting,
	StoreState,
	TabItem,
	ThemeColor,
	ThemeName,
	XY_POS,
} from "./model";

const initialState = (): StoreState => {
	const menuData = appHelper.createMenuData({});
	const settingDataPreset = {
		projectName: "Dland Admin",
		logo: "/logoBig.png",
		icon: "/logo.png",
		paletteSet: { light: "Default", dark: "Default" },
		layoutSet: { light: "Rain", dark: "Wind" },
		routerAni: "fade",
		...(process.env.NODE_ENV === "production" &&
		storageHelper.getItem("SETTING", "local")
			? storageHelper.getItem("SETTING", "local")
			: settingData),
	};

	return {
		sign: "",
		menuDefaultSelectedKeys: [],
		menuDefaultOpenKeys: null,
		menuData: menuData,
		tabItems: storageHelper.getItem("TABS_HISTORY") || [],
		activeTabKey: "",
		isThemeAuto:
			storageHelper.getItem("IS_THEME_AUTO") == "1" ? true : false,
		currentTheme: storageHelper.getItem("THEME") || ThemeColor.light,
		isShowOptionsDrawer: false,
		isCollapsedMenu: false,
		isShowMdDrawer: false,
		mdContent: "",
		winBoxList: [],
		settingData: settingDataPreset,
		language: storageHelper.getItem("LANGUAGE") || "zh",
		winPosTemp: {
			x: 0,
			y: 0,
		},
		winBoxTitleTemp: "",
		refreshKey: [],
		isLoading: sessionStorage.getItem("IS_PLUGIN_INSTALLING") == "1",
	};
};

const appSlice = createSlice({
	name: "appStore",
	stateInit: initialState,
	computed: {
		testValueCP(state, params: { a: string }) {
			return state.sign + "" + params.a;
		},
		testObjCP(state, params: { a: string }) {
			return {
				testObj: state.sign + "" + params.a,
			};
		},
	},
	reducers: {
		setSign(state, { payload }: PayloadAction<string>) {
			state.sign = payload;
		},
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
			const temp = cloneDeep(state.winBoxList);
			const targetId = temp.findIndex((item) => {
				return item.id == id;
			});
			if (targetId != -1) {
				temp.splice(targetId, 1);
			}
			state.winBoxList = temp;
		},
		setSettingData(state, { payload }: PayloadAction<Partial<Setting>>) {
			state.settingData = { ...state.settingData, ...payload };
			storageHelper.setItem("SETTING", state.settingData, "local");
		},
		setIsThemeAuto(state, { payload }: PayloadAction<boolean>) {
			state.isThemeAuto = payload;
			storageHelper.setItem("IS_THEME_AUTO", payload ? 1 : 0, "local");
		},
		setLanguage(state, { payload }: PayloadAction<string>) {
			state.language = payload;
			storageHelper.setItem("LANGUAGE", payload);
		},
		setRefreshKey(state, { payload }: PayloadAction<string[]>) {
			state.refreshKey = payload;
		},
		setIsLoading(state, { payload }: PayloadAction<boolean>) {
			state.isLoading = payload;
		},
	},
});

export default appSlice;
