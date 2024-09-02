import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { dpChain, useFlat } from "src/service";
import EditView from "../views/editView";
import { useSearchParams } from "react-router-dom";

const RuleAddPage = () => {
	const branchName = ROUTE_ID.RuleAddPage;
	const { initCurrentDetailAct } = useFlat(["ruleStore", branchName]);
	let [searchParams] = useSearchParams();
	const id = searchParams.get("copyId");
	useActive({
		onFirstActive() {
			if (id) {
				dpChain(["ruleStore", branchName]).getCurrentDetailAct({
					id,
				});
			} else {
				initCurrentDetailAct();
			}
		},
	});

	return <EditView branchName={branchName} />;
};

export default RuleAddPage;
