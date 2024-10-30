import { pluginProviders } from "plugins/config/providers";
import RouterProvider from "./routerProvider";
import AuthProvider from "./authProvider";
import ServiceProvider from "./serviceProvider";
import ThemeProvider from "./themeProvider";

const providerArr = [
    ServiceProvider,
    RouterProvider,
    AuthProvider,
    ThemeProvider,
    ...pluginProviders,
];

export default providerArr;
