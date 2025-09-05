import { createThunks, dpChain } from "src/service";
import httpApi from "./api";
import {
	GetIdByNameApiReq,
	GetUserInfoParams,
	LoginApiReq,
	MenuPermissionItem,
} from "./model";

const handleTree = (
	data: any[],
	id?: string,
	parentId?: string,
	children?: string
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

const thunks = createThunks("authStore", {
	getIdByNameAct: async (arg: GetIdByNameApiReq) => {
		await httpApi.getIdByNameApi(arg);
	},
	captchaAct: async () => {
		await httpApi.captchaApi();
	},
	loginAct: async (arg: LoginApiReq) => {
		const { data } = await httpApi.loginApi(arg);
		const { userId, accessToken, refreshToken } = data;
		userId && dpChain("authStore").setUserid(userId);
		dpChain("authStore").setToken({
			accessToken,
			refreshToken,
		});
	},
	async getMenuListAct() {
		const { data } = await httpApi.getMenuListApi();
		const treeData = handleTree(data);
		dpChain("authStore").setMenuList(data);
		dpChain("authStore").setMenuTree(treeData);
	},
	async refreshTokenAct() {
		const { data } = await httpApi.refreshToken();
		dpChain("authStore").setToken(data);
		return data;
	},
	async getUserPermissionsAct() {
		const {
			data: { permissions, menus },
		} = await httpApi.fetchUserPermissions();
        
		await dpChain("authStore").setPermissions({
			menuPermissions: menus,
			permissions,
			routesPermissions: [],
		});
	},

	async getUserinfoAct(arg: GetUserInfoParams) {
		const { data } = await httpApi.getUserInfoApi(arg);
		return data;
	},
});
export default thunks;
