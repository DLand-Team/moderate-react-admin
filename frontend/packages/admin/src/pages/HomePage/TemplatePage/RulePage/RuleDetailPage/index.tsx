import { useSearchParams } from "react-router-dom";
import { useActive } from "src/common/hooks/useActive";
import { ROUTE_ID } from "src/router/name";
import { dpChain, useFlat } from "src/service";
import DetailView from "../views/detailView";

const RuleDetailPage = () => {
	const branchName = ROUTE_ID.RuleDetailPage;
	let [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const { getCurrentDetailAct, setCurrentRuleData, setIsDetail } = useFlat(
		["ruleStore", branchName],
		{},
	);

	useActive({
		onActive() {
			setIsDetail(true);
			getCurrentDetailAct({
				id,
			});
			dpChain("posStore").queryPostListAct(null);
			dpChain("filterStore").queryListAct(null);
		},
		onLeave() {
			setIsDetail(false);
			setCurrentRuleData(null);
		},
	});

	return <DetailView branchName={branchName} />;
};
export default RuleDetailPage;
