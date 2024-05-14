import { Routes } from "react-router-dom";
import { useFlat } from "./service";
import { RouterHelper } from "./service/helper";
import { OptionsDrawer, OptionsFloatBtn } from "./components";
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
