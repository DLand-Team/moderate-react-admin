"use client";

import React from "react";
import { Provider } from "redux-eazy";
import { reduxStore } from "../service";

const App = (props: React.PropsWithChildren<{}>) => {
    return <>{props.children}</>;
};

const ServiceProvider = (props: React.PropsWithChildren<{}>) => {
    return (
        <Provider store={reduxStore}>
            <App>{props.children}</App>
        </Provider>
    );
};

export default ServiceProvider;
