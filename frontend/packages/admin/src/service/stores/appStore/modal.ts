import { type Location } from "react-router-dom";
import { LayoutMapkey } from "src/layouts";
import { MenuItem } from "src/service/helper";
import type { ThemeMapkey } from "src/theme";
export type ThemeName = "dark" | "light";
export interface TabItem {
	label: string;
	key: string;
}
export type TabsHistory = Location[];
export type XY_POS = { x: number; y: number };
export interface StoreState {
	// 菜单相关信息
	menuDefaultSelectedKeys: string[];
	menuDefaultOpenKeys: string[] | null;
	menuData: MenuItem[];
	// 页面tab栏信息
	tabsHistory: TabsHistory;
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
	winBoxList: string[];
	winPosTemp: XY_POS;
	winBoxTitleTemp: string;
	mdContent: string;
	settingData: Setting | null;
	language: string;

}

export interface Setting {
	paletteSet?: { light: ThemeMapkey; dark: ThemeMapkey };
	layoutSet?: { light: LayoutMapkey; dark: LayoutMapkey };
}
