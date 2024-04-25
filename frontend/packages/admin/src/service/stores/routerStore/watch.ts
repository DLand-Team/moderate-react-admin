import { dp, getActionType } from "src/service";
import { startAppListening } from "src/service/setup";

const watch = () => {
	startAppListening({
		type: getActionType("authStore").setPermissions,
		effect: () => {
			dp("routerStore", "createRoutesDataAct");
		},
	});
};

export default watch;
