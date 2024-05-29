import { pluginProviders } from "plugins/config/providers";
import { createRoot } from "react-dom/client";
import CustomRouter from "src/components/customRouter";
import App from "./app";
import AuthProvider from "./providers/authProvider";
import "./index.scss";
import { AppHelper } from "./service";
import ServiceProvider from "./providers/serviceProvider";
import ThemeProvider from "./providers/themeProvider";

const providerArr = [
	ServiceProvider,
	CustomRouter,
	AuthProvider,
	ThemeProvider,
	...pluginProviders,
	App,
];

createRoot(document.getElementById("root")!).render(
	AppHelper.createApp(providerArr),
);
