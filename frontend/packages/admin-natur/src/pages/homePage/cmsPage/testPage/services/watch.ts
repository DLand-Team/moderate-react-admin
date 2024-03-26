import { ModuleEvent, WatchAPI } from "natur";

const watch = {
	userInfoStore: (event: ModuleEvent, api: WatchAPI) => {
		const { actionName } = event;
		if (actionName === "login" && event.type === "update") {
			api.localDispatch("createArticleTypeList");
		}
	},
};

export default watch;
