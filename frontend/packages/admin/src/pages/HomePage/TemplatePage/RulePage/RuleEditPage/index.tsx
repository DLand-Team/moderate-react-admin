import { useSearchParams } from "react-router-dom";
import { useActive } from "src/common/hooks/useActive";
import { ROUTE_ID } from "src/router/name";
import { dpChain } from "src/service";
import EditView from "../views/editView";

const RuleEditPage = () => {
	const branchName = ROUTE_ID.RuleEditPage;
	let [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	useActive({
		onActive() {
			dpChain(["ruleStore", branchName]).getCurrentDetailAct({
				id,
			});
		},
	});
	return <EditView branchName={branchName} />;
};

export default RuleEditPage;
