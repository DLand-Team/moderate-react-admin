import { dp, getActionType } from "src/service";
import { startAppListening } from "../../setup";

const watch = () => {
	// 监听权限数据，动态生成菜单
	startAppListening({
		type: getActionType("routerStore").setRoutesConfigMap,
		effect: async () => {
			dp("appStore", "createMenuDataAct");
		},
	});
};

export default watch;
