import CustomRouter from "src/common/components/customRouter/customRouter";

import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import ServiceProvider from "./reduxService/ServiceProvider";
import AuthProvider from "./common/provider/authProvider";
import ThemeProvider from "./theme/provider";

createRoot(document.getElementById("root")!).render(
	<ServiceProvider>
		<CustomRouter>
			<AuthProvider>
				<ThemeProvider>
					<App></App>
				</ThemeProvider>
			</AuthProvider>
		</CustomRouter>
	</ServiceProvider>,
);
