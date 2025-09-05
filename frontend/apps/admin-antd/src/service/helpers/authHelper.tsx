import { ROUTE_CONFIG_MAP, RoutesStructDataItem } from "src/router";
import { ACTION_DICT } from "src/static";
import { type MenuPermissionItem } from "../stores/authStore/model";
import HelperBase from "./_helperBase";
import { FilterType } from "../stores/sysStore/model";

type PermissionNode = any;

export class AuthHelper extends HelperBase {
	/**
	 * @description: 根据权限创建菜单
	 * @param {MenuPermissionItem} data
	 * @param {MenuItem} result
	 * @param {string[]} routesPermissions 路由权限数组ƒ
	 * @return {}
	 */
	createRoutesPermissionsByMenu = (data: MenuPermissionItem) => {
		const { routesPermissions } = this.createRoutesLoop(
			data?.children || [],
			[],
		);
		return { routesPermissions };
	};

	createRoutesLoop = (
		data: MenuPermissionItem[],
		routesPermissions: string[],
	) => {
		data?.forEach((item) => {
			routesPermissions.push(item.componentName);
			if (item?.children?.length) {
				this.createRoutesLoop(item.children, routesPermissions);
			}
		});
		return { routesPermissions };
	};

	createPermissionByRoutesLoop(
		routesConfig: RoutesStructDataItem[],
		newData: PermissionNode[],
	) {
		routesConfig.forEach((routeStructItem) => {
			const { id } = routeStructItem;
			const routeInfoItem = ROUTE_CONFIG_MAP[id];
			let item: PermissionNode = {
				title: this.routerHelper.getRouteTitleByKey(id),
				value: id,
				key: id,
			};
			newData.push(item);
			if (routeStructItem.children) {
				item.children = [];
				this.createPermissionByRoutesLoop(
					routeStructItem.children,
					item.children,
				);
			} else {
				item.children = [];
				const actionsPermissions: string[] =
					routeInfoItem.actionPermissions || [];
				item.children = actionsPermissions.map((actionId) => {
					const btnConfig =
						ACTION_DICT[actionId as keyof typeof ACTION_DICT];
					return {
						title: btnConfig.title,
						value: `${id}:${actionId}`,
						key: `${id}:${actionId}`,
					};
				});
			}
		});
	}

	/**
	 * 构造树型结构数据
	 * @param {*} data 数据源
	 * @param {*} id id字段 默认 'id'
	 * @param {*} parentId 父节点字段 默认 'parentId'
	 * @param {*} children 孩子节点字段 默认 'children'
	 */
	handleTree = (
		data: any[],
		id?: string,
		parentId?: string,
		children?: string,
	) => {
		if (!Array.isArray(data)) {
			console.warn("data must be an array");
			return [];
		}
		const config = {
			id: id || "id",
			parentId: parentId || "parentId",
			childrenList: children || "children",
		};

		const childrenListMap = {};
		const nodeIds = {};
		const tree: any[] = [];

		for (const d of data) {
			const parentId = d[config.parentId];
			if (childrenListMap[parentId] == null) {
				childrenListMap[parentId] = [];
			}
			nodeIds[d[config.id]] = d;
			childrenListMap[parentId].push(d);
		}

		for (const d of data) {
			const parentId = d[config.parentId];
			if (nodeIds[parentId] == null) {
				tree.push(d);
			}
		}
		;
		for (const t of tree) {
			adaptToChildrenList(t);
		}

		function adaptToChildrenList(o) {
			if (childrenListMap?.[o[config.id]] !== null) {
				o[config.childrenList] = childrenListMap[o[config.id]];
			}
			if (o[config.childrenList]) {
				for (const c of o[config.childrenList]) {
					adaptToChildrenList(c);
				}
			}
		}
		return tree;
	};

	handleTreePro = ({
		data,
		id,
		parentId,
		children,
		filterType,
	}: {
		data: any[];
		id?: string;
		parentId?: string;
		children?: string;
		filterType: FilterType;
	}) => {
		if (!Array.isArray(data)) {
			console.warn("data must be an array");
			return [];
		}
		const config = {
			id: id || "id",
			parentId: parentId || "parentId",
			childrenList: children || "children",
		};

		const childrenListMap = {};
		const nodeIds = {};
		const tree: any[] = [];

		for (const d of data) {
			const parentId = d[config.parentId];
			if (childrenListMap[parentId] == null) {
				childrenListMap[parentId] = [];
			}
			nodeIds[d[config.id]] = d;
			childrenListMap[parentId].push(d);
		}

		for (const d of data) {
			const parentId = d[config.parentId];
			if (nodeIds[parentId] == null) {
				if (filterType == FilterType.ACTIVED) {
					if (d.status === 0) {
						tree.push(d);
					}
				} else {
					tree.push(d);
				}
			}
		}
		for (const t of tree) {
			adaptToChildrenList(t);
		}

		function adaptToChildrenList(o) {
			if (childrenListMap?.[o[config.id]] !== null) {
				o[config.childrenList] = childrenListMap[o[config.id]];
			}
			if (o[config.childrenList]) {
				for (const c of o[config.childrenList]) {
					adaptToChildrenList(c);
				}
			}
		}
		return tree;
	};
}
