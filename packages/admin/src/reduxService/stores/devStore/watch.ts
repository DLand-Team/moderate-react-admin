import { ListenerMiddleware } from "redux-eazy";
import { startAppListening } from "../../setup";

const watch = (listenerMiddleware: ListenerMiddleware) => {
	// startAppListening({
	// 	type: getActionType('appStore').setAppInfo,
	// 	effect: () => {},
	// });
	// // 监听例子
	startAppListening({
		predicate: (action, currentState, previousState) => {
			return false;
		},
		effect: async (action, listenerApi) => {},
	});
};

export default watch;
