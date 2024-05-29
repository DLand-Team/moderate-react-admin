import { Routes } from "react-router-dom";
import { OptionsDrawer, OptionsFloatBtn } from "./components";
import { useFlat } from "./service";
import { RouterHelper } from "src/service";
const App = () => {
	const { routesTree } = useFlat("routerStore");
	return (
		<>
			<Routes>
				{routesTree.map((item) => {
					return RouterHelper.toRenderRouteLoop(item);
				})}
			</Routes>
			{process.env.NODE_ENV == "development" && (
				<>
					<OptionsFloatBtn />
					<OptionsDrawer />
				</>
			)}
		</>
	);
};

export default App;
