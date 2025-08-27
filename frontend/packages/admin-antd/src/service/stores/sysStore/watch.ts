import { dpChain, getActionType } from "src/service";
import { startAppListening } from "src/service/setup";

const watch = () => {
	startAppListening({
		type: getActionType("sysStore").deleteUserAct.fulfilled,
		effect: async () => {
			dpChain("sysStore").queryUserListAct({});
		},
	});
};

export default watch;
