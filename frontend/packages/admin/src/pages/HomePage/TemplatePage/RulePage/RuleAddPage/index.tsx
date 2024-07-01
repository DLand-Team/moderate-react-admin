import { useActive } from "src/common/hooks/useActive";
import { ROUTE_ID } from "src/router/name";
import { useFlat } from "src/service";
import EditView from "../views/editView";

const RuleAddPage = () => {
	const branchName = ROUTE_ID.RuleAddPage;
	const { initCurrentDetailAct } = useFlat(["ruleStore", branchName]);
	useActive({
		onActive(isFirst) {
			isFirst && initCurrentDetailAct();
		},
	});

	return <EditView branchName={branchName} />;
};

export default RuleAddPage;
