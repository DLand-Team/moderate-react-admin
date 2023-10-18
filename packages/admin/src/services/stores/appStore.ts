import { ROUTE_ID } from "@/config/routerConfig";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { ModuleEvent, WatchAPI } from "natur";
import { ITP } from "natur-immer";
import type { Location } from "react-router-dom";
import { routerHelper } from "../helper";
import { RouterStoreState } from "./routerStore/routerStore.model";

interface TabItem {
	label: string;
	key: string;
}
interface AppStoreState {
	// 菜单相关信息
	menuDefaultSelectedKeys: string[];
	menuDefaultOpenKeys: string[];
	menuData: ItemType[];
	// 页面tab栏信息
	tabsHistory: { [key: PropertyKey]: Location };
	tabItems: TabItem[];
	activeTabKey: string;
}

const initState = (): AppStoreState => {
	return {
		menuDefaultSelectedKeys: [],
		menuDefaultOpenKeys: null,
		menuData: [],
		tabsHistory: {},
		tabItems: [],
		activeTabKey: null,
	};
};

const appStore = {
	// 状态
	state: initState(),
	// 计算属性
	maps: {},
	watch: {
		routerStore: (event: ModuleEvent, api: WatchAPI) => {
			const {
				actionName,
				newModule: { state },
			} = event;
			const { routesData } = state as RouterStoreState;
			if (
				actionName === "createRoutesAction" &&
				event.type === "update"
			) {
				if (routesData.length) {
					const temp = routesData.find((item) => {
						return item.id === ROUTE_ID.homePage;
					}).children;
					if (temp?.length) {
						const memuDataTemp = routerHelper.generateMenuDataLoop(
							temp,
							[],
						);
						api.localDispatch("setMenuDataAct", memuDataTemp);
					}
				}
			}
		},
	},
	// 操作
	actions: {
		deleteTabHistoryAct:
			(pathName: string) =>
			({ setState }: ITP<AppStoreState>) =>
				setState((state) => {
					let temp = state.tabsHistory;
					if (Object.values(temp).length > 1) {
						Reflect.deleteProperty(temp, pathName);
					}
				}),
		addTabHistoryActionAct:
			(newItem: any) =>
			({ setState }: ITP<AppStoreState>) => {
				return setState((state) => {
					state.tabsHistory[newItem.pathname] = newItem;
				});
			},
		setActiveTabKeyAct(activeTabKey) {
			return {
				activeTabKey,
			};
		},
		setTableItemsAct(tabItems) {
			debugger;
			return {
				tabItems,
			};
		},
		setMenuDefaultSelectedKeysAct: (menuDefaultSelectedKeys: string[]) => {
			return {
				menuDefaultSelectedKeys,
			};
		},
		setMenuDefaultOpenKeysAct: (menuDefaultOpenKeys: string[]) => {
			return {
				menuDefaultOpenKeys,
			};
		},
		setMenuDataAct: (menuData: ItemType[]) => {
			return {
				menuData,
			};
		},
	},
};

export default appStore;
