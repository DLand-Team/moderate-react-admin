import { pluginProviders } from "plugins/config/providers";
import RouterProvider from "./routerProvider";
import AuthProvider from "./authProvider";
import ServiceProvider from "./serviceProvider";
import ThemeProvider from "./themeProvider";
import "src/i18n";
const providerArr = [
  ServiceProvider,
  RouterProvider,
  AuthProvider,
  ThemeProvider,
  ...pluginProviders,
];

export default providerArr;
