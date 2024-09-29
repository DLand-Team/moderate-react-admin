import { useSearchParams } from "react-router-dom";
import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import EditView, { EditViewProps } from "../views/editView";

const MarketEditPage = (props: EditViewProps) => {
	const { isSub, id: subId } = props;
	const [searchParams] = useSearchParams();
	const id = isSub ? subId : searchParams.get("id");
	const branchName = ROUTE_ID.MarketEditPage;
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
			onLeave() {
				setCurrentMarketData(null);
			},
		},
		[id],
	);

	return <EditView id={id!} branchName={branchName} {...props} />;
};
export default MarketEditPage;
