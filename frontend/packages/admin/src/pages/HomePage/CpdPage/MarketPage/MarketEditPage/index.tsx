import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import EditView, { EditViewProps } from "../views/editView";

const MarketEditPage = (props: EditViewProps) => {
	const branchName = ROUTE_ID.MarketEdit;
	const [searchParams] = useSearchParams();
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
			onLeave() {
				setCurrentMarketData(null);
			},
		},
		[id],
	);
	useEffect(() => {
		return () => {};
	}, [id]);

	return <EditView branchName={branchName} {...props} />;
};
export default MarketEditPage;
