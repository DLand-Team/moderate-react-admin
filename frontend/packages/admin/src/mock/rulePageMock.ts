import { RuleHelper } from "src/service";
import { Rule } from "src/service/stores/ruleStore/model";
export let mockRuleListData: Rule[] = [];

Array.from(Array(16), (_, k) => {
	mockRuleListData.push({
		id: k,
		ruleName: "rule",
		ownerId: "rule",
		comment: "rule",
		status: 0,
		sequenceNo: 0,
		fareAllowedCarriers: "rule",
		oriMarketId: k,
		desMarketId: k,
		posId: k,
		effectStartDate: Date.now().toString(),
		effectEndDate: Date.now().toString(),
		applyProduct: 0,
		sortItemId: k,
		filterItemId: k,
		backupResult: 0,
		cpdRuleItinerarys: RuleHelper.getItDefault(),
	});
});
