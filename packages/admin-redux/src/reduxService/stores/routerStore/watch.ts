import { getActionType } from "@/reduxService";
import { startAppListening } from "@/reduxService/setup";
import { ListenerMiddleware } from "redux-eazy";

const watch = (listenerMiddleware: ListenerMiddleware) => {
	// startAppListening({
	// 	type: getActionType("authStore").login,
	// 	effect: () => {},
	// });
	// 监听例子
	startAppListening({
		predicate: (action, currentState, previousState) => {
			// return true when the listener should run
			return false;
		},
		effect: async (action, listenerApi) => {},
	});
};

export default watch;
