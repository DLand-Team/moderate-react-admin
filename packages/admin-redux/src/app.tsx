import { routerHelper } from "@/reduxService";
import { Routes } from "react-router-dom";
import { useFlat } from "./reduxService";

const App = () => {
	const { routesConfig } = useFlat("routerStore");

	return (
		<Routes>
			{routesConfig?.map((item) => {
				;
				return routerHelper.toRenderRouteLoop(item);
			})}
		</Routes>
	);
};

export default App;
