// 用户信息仓库，信息包括：
// token：登录凭证
// isAdmin：是否是管理员，最高权限，直接跳过权限校验
import { routerHelper } from "@/services";

const actions = {
	setRoutesConfigMap(routesConfigMap) {
		return {
			routesConfigMap,
		};
	},
	createRoutesAction: () => {
		let routesData = routerHelper.createRoutesConfigByUserInfo();
		return {
			routesData,
		};
	},
};
export default actions;
