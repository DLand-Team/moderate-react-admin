import CustomRouter from "src/common/components/customRouter/customRouter";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import ServiceProvider from "./reduxService/ServiceProvider";
import AuthProvider from "./common/provider/authProvider";

createRoot(document.getElementById("root")!).render(
	<CustomRouter>
		<ServiceProvider>
			<AuthProvider>
				<App></App>
			</AuthProvider>
		</ServiceProvider>
	</CustomRouter>,
);
