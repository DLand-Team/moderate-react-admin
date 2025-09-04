"use client";

import { Provider } from "redux-eazy";
import { reduxStore } from ".";

const ServiceProvider = (props: React.PropsWithChildren) => {
	return <Provider store={reduxStore}>{props.children}</Provider>;
};

export default ServiceProvider;
