import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import EditView from "../views/editView";

const RuleAddPage = () => {
	const branchName = ROUTE_ID.RuleAdd;
	const { initCurrentDetailAct } = useFlat(["ruleStore", branchName]);
	useActive({
		onFirstActive() {
			initCurrentDetailAct();
		},
	});

	return <EditView branchName={branchName} />;
};

export default RuleAddPage;
