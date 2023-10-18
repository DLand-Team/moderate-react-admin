import { ModuleEvent, WatchAPI } from "natur";

const watch = {
	// 监听用户登录，登录成功就根据用户权限生成路由数据
	userInfoStore: (event: ModuleEvent, api: WatchAPI) => {
		const {
			actionName,
			newModule: { state },
		} = event;
		if (actionName === "login" && event.type === "update") {
			api.localDispatch("createRoutesAction", state);
		}
	},
};

export default watch;
