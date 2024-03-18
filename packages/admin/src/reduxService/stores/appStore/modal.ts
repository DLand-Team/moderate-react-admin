import { type Location } from "react-router-dom";
import { MenuItem } from "src/reduxService/helper/routerHelper";

export interface TabItem {
	label: string;
	key: string;
}
export type TabsHistory = { [key: PropertyKey]: Location };
export interface StoreState {
	// 菜单相关信息
	menuDefaultSelectedKeys: string[];
	menuDefaultOpenKeys: string[] | null;
	menuData: MenuItem[];
	// 页面tab栏信息
	tabsHistory: TabsHistory;
	tabItems: TabItem[];
	activeTabKey: string;
}
