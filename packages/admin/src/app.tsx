import { Routes } from "react-router-dom";
import { useFlat } from "./reduxService";
import { RouterHelper } from "./reduxService/helper";

const App = () => {
	const { routesConfig } = useFlat("routerStore");
	
	return (
		<Routes>
			{routesConfig?.map((item) => {
				return RouterHelper.toRenderRouteLoop(item);
			})}
		</Routes>
	);
};

export default App;
