"use client";

import "@bprogress/core/css";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { Provider } from "redux-eazy";
import { reduxStore } from ".";

const ServiceProvider = (props: React.PropsWithChildren) => {

	return (
		<Provider store={reduxStore}>
			<ProgressProvider>{props.children}</ProgressProvider>
		</Provider>
	);
};

export default ServiceProvider;
