import { Routes } from "react-router-dom";
import { OptionsDrawer, OptionsFloatBtn } from "./components";
import { useFlat } from "./service";
import { RouterHelper } from "src/service";
import RiveLoading from "plugins/moderate-plugin-rive/common/components/riveLoading";
import { useEffect, useState } from "react";
const App = () => {
	const {} = useFlat("appStore");
	const { routesTree } = useFlat("routerStore");
	const [flag, setFlag] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setFlag(false);
		}, 5000);
	}, []);
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
			{flag && (
				<div
					className="loading g-glossy"
					style={{
						position: "fixed",
						left: 0,
						bottom: 0,
						right: 0,
						top: 0,
						zIndex: 2,
					}}
				>
					<RiveLoading />
				</div>
			)}
		</>
	);
};

export default App;
