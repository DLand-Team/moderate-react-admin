// import { Route, Routes } from "react-router-dom";
// import { useFlat } from "./service";
// import { RouterHelper } from "./service/helper";
// import HomePage from "./pages/HomePage/homePage";
// import HelloPage from "./pages/HomePage/HelloPage/helloPage";
// const App = () => {
// 	const { routesConfig } = useFlat("routerStore");
// 	debugger;

// 	return (
// 		<Routes>
// 			<Route path={undefined} key={1} element={<HomePage />}></Route>
// 		</Routes>
// 	);
// };

// export default App;

import { Routes } from "react-router-dom";
import { useFlat } from "./service";
import { RouterHelper } from "./service/helper";
const App = () => {
	const { routesTree } = useFlat("routerStore");
	return (
		<Routes>
			{routesTree.map((item) => {
				return RouterHelper.toRenderRouteLoop(item);
			})}
		</Routes>
	);
};

export default App;
