import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.scss";
import providerArr from "./providers";
import "src/service/helpers";
import { appHelper } from "./service/setup";

document.ondblclick = function (e) {
	e.preventDefault();
};

createRoot(document.getElementById("root")!).render(
	appHelper.createApp(providerArr.concat(App)),
);
