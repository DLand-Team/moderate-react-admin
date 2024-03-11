import { createActions } from "@/common/hooks";
import api, { QueryOpportunityParams, QueryPlatformParams } from "../api";
import state from "./state";

const actions = createActions(state)({
	queryOpportunityACT: async (data: QueryOpportunityParams) => {
		const res = await api.queryOpportunity(data);
		return {
			opportunityStatisticsData: res.data,
		};
	},
	queryPlatformACT: async (data: QueryPlatformParams) => {
		const res = await api.queryPlatform(data);
		return {
			platformStatisticsData: res.data,
		};
	},
});

export default actions;
