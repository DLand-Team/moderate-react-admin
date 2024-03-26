import { dp, getActionType } from "src/reduxService";
import { startAppListening } from "../../setup";

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
