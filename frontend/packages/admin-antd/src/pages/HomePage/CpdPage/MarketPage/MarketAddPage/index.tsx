import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { useFlat, useResetRedux } from "src/service";
import EditView, { EditViewProps } from "../views/editView";

const MarketAddPage = (props: EditViewProps) => {
	const branchName = ROUTE_ID.MarketAddPage;
	const { initCurrentDetailAct, getLocationListAct } = useFlat([
		"marketStore",
		branchName,
	]);
	const reset = useResetRedux();
	useActive({
		onFirstActive() {
			initCurrentDetailAct();
			getLocationListAct();
		},
		onLastLeave() {
			reset(["marketStore", branchName]);
		},
	});

	return <EditView branchName={branchName} {...props} />;
};
export default MarketAddPage;
