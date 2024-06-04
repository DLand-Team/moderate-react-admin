import { Provider } from "redux-eazy";
import { DevHelper, dp, reduxStore } from "../service";
import "../service/setup";
import React, { useEffect } from "react";
import storageHelper from "src/common/utils/storageHelper";
import { message } from "antd";

const App = (props: React.PropsWithChildren<{}>) => {
	return <>{props.children}</>;
};

const ServiceProvider = (props: React.PropsWithChildren<{}>) => {
	useEffect(() => {
		DevHelper.SocketSetup();
		DevHelper.socket.on("addPluginSuccessed", () => {
			dp("appStore", "setIsLoading", false);
			storageHelper.removeItem("IS_PLUGIN_INSTALLING");
			message.success("yeah~ plguin add success!");
		});
		DevHelper.socket.emit("isRecived");
	}, []);
	return (
		<Provider store={reduxStore}>
			<App>{props.children}</App>
		</Provider>
	);
};

export default ServiceProvider;
