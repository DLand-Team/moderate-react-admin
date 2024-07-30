import { useActive } from "src/common/hooks";
import { dpChain } from "src/service";
import ListView from "../views/listView";

const Page = () => {
	useActive({
		onActive() {
			dpChain("ruleStore").queryRuleListAct(null);
		},
	});

	return <ListView></ListView>;
};

export default Page;
