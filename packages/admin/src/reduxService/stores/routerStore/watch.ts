import { dp, getActionType } from "src/reduxService";
import { startAppListening } from "src/reduxService/setup";

const watch = () => {
	startAppListening({
		type: getActionType("authStore").setPermissions,
		effect: () => {
			dp("routerStore", "createRoutesDataAct");
		},
	});
};

export default watch;
