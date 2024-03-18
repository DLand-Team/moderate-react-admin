import { dp, routerHelper } from "src/reduxService";
import { Routes } from "react-router-dom";
import { useFlat } from "./reduxService";
import { useEffect } from "react";

const App = () => {
	const { routesConfig } = useFlat("routerStore");
	const { createRoutesDataAct } = useFlat("routerStore");
	useEffect(() => {
		createRoutesDataAct().then(({ payload }) => {
			debugger;
		});
		dp("routerStore", "createRoutesDataAct").then((data) => {
			debugger;
		});
	}, []);
	return (
		<Routes>
			{routesConfig?.map((item) => {
				return routerHelper.toRenderRouteLoop(item);
			})}
		</Routes>
	);
};

export default App;
