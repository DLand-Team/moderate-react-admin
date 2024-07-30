import { useSearchParams } from "react-router-dom";
import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import DetailView from "../views/detailView";

const MarketDetailPage = () => {
	const branchName = ROUTE_ID.RuleDetail;
	let [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const { getCurrentDetailAct, setCurrentMarketData, getLocationListAct } =
		useFlat(["marketStore", branchName]);
	useActive(
		{
			onFirstActive() {
				getCurrentDetailAct({
					id,
				});
				getLocationListAct();
			},
			onLastLeave() {
				setCurrentMarketData(null);
			},
		},
		[id],
	);
	return <DetailView branchName={branchName} />;
};
export default MarketDetailPage;
