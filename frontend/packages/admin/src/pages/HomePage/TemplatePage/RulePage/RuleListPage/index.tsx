import { useEffect } from "react";
import { dpChain } from "src/service";
import ListView from "../views/listView";
import { ROUTE_ID } from "src/router/name";

const Page = () => {
	const branchName = ROUTE_ID.RuleDetailPage;
	useEffect(() => {
		dpChain(["ruleStore", branchName]).queryRuleListAct(null);
	}, []);

	return <ListView branchName={branchName}></ListView>;
};

export default Page;
