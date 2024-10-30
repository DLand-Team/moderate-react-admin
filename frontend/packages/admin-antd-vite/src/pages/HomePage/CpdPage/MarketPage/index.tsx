import { MainContainer } from "src/components";

import { Outlet } from "react-router-dom";
import { useActive } from "src/common/hooks";
import { dpChain } from "src/service";

const MarketPage = () => {
	useActive({
		onFirstActive() {
			dpChain("marketStore").getLocationListAct(null);
		},
	});

	return (
		<MainContainer>
			<Outlet />
		</MainContainer>
	);
};

export default MarketPage;
