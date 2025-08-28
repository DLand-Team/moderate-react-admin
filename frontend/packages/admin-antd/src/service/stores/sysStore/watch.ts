import { dpChain, getActionType } from "src/service";
import { startAppListening } from "src/service/setup";

const watch = () => {
	startAppListening({
		type: getActionType("sysStore").deleteUserAct.fulfilled,
		effect: async () => {
			dpChain("sysStore").queryUserListAct({});
		},
	});

	startAppListening({
		predicate: (action) => {
			const { createRoleAct, updateRoleAct } = getActionType("sysStore");
			if (
				[createRoleAct.fulfilled, updateRoleAct.fulfilled].includes(
					action.type,
				)
			) {
				return true;
			}
			return false;
		},
		effect: async () => {
			dpChain("sysStore").queryRoleListAct({});
		},
	});
};

export default watch;
