import { ItemType } from "antd/es/menu/hooks/useItems";
import { type Location } from "react-router-dom";

export interface TabItem {
	label: string;
	key: string;
}
export type TabsHistory = { [key: PropertyKey]: Location };
export interface StoreState {
	// 菜单相关信息
	menuDefaultSelectedKeys: string[];
	menuDefaultOpenKeys: string[];
	menuData: ItemType[];
	// 页面tab栏信息
	tabsHistory: TabsHistory;
	tabItems: TabItem[];
	activeTabKey: string;
}
