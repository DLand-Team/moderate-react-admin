import CustomRouter from "@/common/components/customRouter/customRouter";
import { store } from "@/services";
import { Provider } from "natur";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<CustomRouter>
			<App></App>
		</CustomRouter>
	</Provider>,
);
