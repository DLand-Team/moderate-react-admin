import { Provider } from "redux-eazy";
import { DevHelper, dp, dpChain, reduxStore } from "../service";
import "../service/setup";
import React, { useEffect } from "react";
import storageHelper from "src/common/utils/storageHelper";
import { message } from "antd";

const App = (props: React.PropsWithChildren<{}>) => {
	return <>{props.children}</>;
};

const ServiceProvider = (props: React.PropsWithChildren<{}>) => {
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			DevHelper.SocketSetup();
			DevHelper.socket.on("addPluginSuccessed", () => {
				dp("appStore", "setIsLoading", false);
				storageHelper.removeItem("IS_PLUGIN_INSTALLING");
				message.success("yeah~ plguin add success!");
			});
			DevHelper.socket.on("connect_error", () => {
				DevHelper.socket.close();
			});
			if (sessionStorage.getItem("IS_PLUGIN_INSTALLING") == "1") {
				setTimeout(() => {
					storageHelper.removeItem("IS_PLUGIN_INSTALLING");
					dpChain("appStore").setIsLoading(false);
				}, 30 * 1000);
			}
		}
	}, []);
	return (
		<Provider store={reduxStore}>
			<App>{props.children}</App>
		</Provider>
	);
};

export default ServiceProvider;
