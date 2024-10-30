import { useSearchParams } from "react-router-dom";
import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
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
	useActive(
		{
			onFirstActive() {
				setIsDetail(true);
				getCurrentDetailAct({
					id,
				});
				dpChain("marketStore").queryAllMarketListAct(null);
				dpChain("posStore").queryAllPostListAct(null);
				dpChain("filterStore").queryListAct(null);
				dpChain("sortStore").queryListAct(null);
			},
			onLastLeave() {
				setIsDetail(false);
				setCurrentRuleData(null);
			},
		},
		[id],
	);

	return <DetailView branchName={branchName} />;
};
export default RuleDetailPage;
