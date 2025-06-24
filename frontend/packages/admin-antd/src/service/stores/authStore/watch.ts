import { dpChain, getActionType, startAppListening } from "src/service";

const watch = () => {
	startAppListening({
		type: getActionType("authStore").setPermissions,
		effect: () => {
			dpChain("authStore").getMenuListAct(null);
		},
	});
};

export default watch;
