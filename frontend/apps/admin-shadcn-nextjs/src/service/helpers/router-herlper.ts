import { cloneDeep } from "@/src/common/utils";
import { ROUTE_CONFIG_MAP, ROUTE_ID_KEY, ROUTE_NAME } from "@/src/router";
import { emit } from "../setup";
import HelperBase from "./_helperBase";

export interface RouteTreeItem {
	parentId: ROUTE_NAME;
	id: ROUTE_NAME;
}

class RouterHelper extends HelperBase {
	// 存储组件View组件的Map，组件View是一个函数组件，不是节点
	keepAliveMap = new Map<string, React.ReactNode>();
	routeList: any[] = [];
	registerPage(routeId: ROUTE_ID_KEY, component?: React.ReactNode) {
		if (component) {
			this.keepAliveMap.set(routeId, component);
			this.routeList.push(routeId);
		}
		emit("appStore").setRouteListEx(cloneDeep(this.routeList));
	}

	// 获取组件View
	getKeepAliveComponent(pathname: string) {
		return this.keepAliveMap.get(this.getRouteIdByPath(pathname));
	}

	getRouteIdByPath(pathname: string): ROUTE_ID_KEY {
		return pathname.split("/").pop() as ROUTE_ID_KEY;
	}

	// 判断是否需要缓存
	isKeepAlive(pathname: ROUTE_ID_KEY) {
		return ROUTE_CONFIG_MAP[pathname]?.keepAlive;
	}

	junpTo(id: ROUTE_ID_KEY) {
		const { routeList } = this.getStore("appStore");
		const targetRoutItem = routeList.find((item) => item.id === id);
		debugger;
		targetRoutItem && emit("appStore").setCurrentRoute(targetRoutItem);
	}
}

export default RouterHelper;
