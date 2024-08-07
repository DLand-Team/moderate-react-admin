import { ruleHelper } from "src/service";
import type { Rule } from "src/service/stores/ruleStore/model";
export let mockRuleListData: Rule[] = [];

Array.from(Array(16), (_, k) => {
	mockRuleListData.push({
		id: k,
		ruleName: "rule" + k,
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
		cpdRuleItinerarys: ruleHelper.getItDefault(),
	} as Rule);
});
