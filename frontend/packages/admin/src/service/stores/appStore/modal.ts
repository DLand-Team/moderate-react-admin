import { type Location } from "react-router-dom";
import { LayoutMapkey } from "src/layouts";
import { MenuItem } from "src/service/helper";
import type { ThemeMapkey } from "src/theme";
export type ThemeName = "dark" | "light";
export interface TabItem {
	label: string;
	key: string;
	location?: Location;
}
export type XY_POS = { x: number; y: number };
export interface StoreState {
	sign: string;
	// 菜单相关信息
	menuDefaultSelectedKeys: string[];
	menuDefaultOpenKeys: string[] | null;
	menuData: MenuItem[];
	// 页面tab栏信息
	tabItems: TabItem[];
	activeTabKey: string;
	isThemeAuto: boolean; // 是否主题跟随系统
	currentTheme: ThemeName;
	// 设置窗口的打开
	isShowOptionsDrawer: boolean;
	// 切换
	isCollapsedMenu: boolean;
	// 显示md的drawer：起作用的前提是安装了对应的插件
	isShowMdDrawer: boolean;
	winBoxList: { id: string; type?: string }[];
	winPosTemp: XY_POS;
	winBoxTitleTemp: string;
	mdContent: string;
	settingData: Setting;
	language: string;
	refreshKey: string[];
	isLoading: boolean;
}
export type RouterAni = "fade" | "slide" | "up" | "none";
export interface Setting {
	routerAni: RouterAni;
	icon: string;
	logo: string;
	projectName: string;
	paletteSet?: { light: ThemeMapkey; dark: ThemeMapkey };
	layoutSet?: { light: LayoutMapkey; dark: LayoutMapkey };
}
