import { getActionType } from "src/reduxService";
import { startAppListening } from "src/reduxService/setup";
import { ListenerMiddleware } from "redux-eazy";

const watch = (listenerMiddleware: ListenerMiddleware) => {
	// 监听例子s
	listenerMiddleware.startListening({
		predicate: (action, currentState, previousState) => {
			return false;
		},
		effect: async (action, listenerApi) => {},
	});
};

export default watch;
