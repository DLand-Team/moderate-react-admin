import "nprogress/nprogress.css";
import RiveLoading from "plugins/moderate-plugin-rive/common/components/riveLoading";
import { Routes } from "react-router-dom";
import { routerHelper } from "src/service";
import { OptionsDrawer, OptionsFloatBtn } from "./components";
import { useFlat } from "./service";

const App = () => {
	const { isLoading } = useFlat("appStore", {
		isCollapsedMenu: "IN",
		isLoading: "IN",
	});
	const { routesTree } = useFlat("routerStore", {
		routesTree: "IN",
	});

	return (
		<>
			<Routes>
				{routesTree.map((item) => {
					return routerHelper.toRenderRouteLoop(item);
				})}
			</Routes>
			<>
				<OptionsFloatBtn />
				<OptionsDrawer />
			</>
			{isLoading && (
				<div className="loading g-glossy">
					<RiveLoading />
				</div>
			)}
		</>
	);
};

export default App;
