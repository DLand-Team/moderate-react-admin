import { dpChain, getActionType, startAppListening } from "src/service";

const watch = () => {
	startAppListening({
		type: getActionType("authStore").getMenuListAct.fulfilled,
		effect: () => {
			dpChain("routerStore").createRoutesDataAct(null);
		},
	});
};

export default watch;
