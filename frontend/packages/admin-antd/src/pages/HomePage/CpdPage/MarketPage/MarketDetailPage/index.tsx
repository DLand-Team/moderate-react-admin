import { useSearchParams } from "react-router-dom";
import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import DetailView from "../views/detailView";
import { EditViewProps } from "../views/editView";

const MarketDetailPage = (props: EditViewProps) => {
	const { isSub, id: subId } = props;
	const [searchParams] = useSearchParams();
	const id = isSub ? subId : searchParams.get("id");
	const branchName = ROUTE_ID.MarketDetailPage;
	const { getCurrentDetailAct, setCurrentMarketData, getLocationListAct } =
		useFlat(["marketStore", branchName]);
	useActive({
		onActive() {
			getCurrentDetailAct({
				id,
			});
			getLocationListAct();
		},
		onLeave() {
			setCurrentMarketData(null);
		},
	});
	return <DetailView id={id!} branchName={branchName} {...props} />;
};
export default MarketDetailPage;
