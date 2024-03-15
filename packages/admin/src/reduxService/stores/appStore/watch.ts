import { ROUTE_ID } from "src/config/routerConfig";
import { dp, getActionType, routerHelper } from "src/reduxService";
import { startAppListening } from "../../setup";
import { RouterHelper } from "src/reduxService/helper/routerHelper";

const watch = () => {
	// 监听权限数据，动态生成菜单
	startAppListening({
		type: getActionType("authStore").setPermissions,
		effect: async () => {
			dp("appStore", "createMenuDataAct");
		},
	});
};

export default watch;
