import React, { useEffect } from "react";
import { Provider } from "redux-eazy";
import { storageHelper } from "src/common/utils";
import { devHelper, dpChain, reduxStore } from "../service";
import { message } from "antd";

const App = (props: React.PropsWithChildren<{}>) => {
	return <>{props.children}</>;
};

const ServiceProvider = (props: React.PropsWithChildren<{}>) => {
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			devHelper.SocketSetup();
			devHelper.socket.on("addPluginSuccessed", () => {
				dpChain("appStore").setIsLoading(false);
				storageHelper.removeItem("IS_PLUGIN_INSTALLING");
				message.success("yeah~ plguin add success!");
			});
			devHelper.socket.on("connect_error", () => {
				devHelper.socket.close();
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
