import { createActions } from "@/common/hooks";
import api, { QueryOpportunityParams, QueryPlatformParams } from "../api";
import state from "./state";
import dayjs from "dayjs";

const actions = createActions(state)({
	queryOpportunityACT: async (data: QueryOpportunityParams) => {
		const res = await api.queryOpportunity(data);
		return {
			opportunityStatisticsData: res.data,
		};
	},
	queryPlatformACT: async (data: QueryPlatformParams) => {
		let arr = [];
		let dateTime = new Date();

		for (let i = 0; i < 100; i++) {
			dateTime = new Date(dateTime.setDate(dateTime.getDate() + i));
			arr.push({
				created_at: dateTime,
				deleted_at: dateTime,
				enquiry_count: 50 + 10 * Math.random(),
				id: i,
				opportunity_count: 60 + 10 * Math.random(),
				partner_count: 40 + 10 * Math.random(),
				updated_at: dateTime,
				user_count: 20 + 10 * Math.random(),
				visits: 30 + 10 * Math.random(),
			});
		}
		return {
			platformStatisticsData: arr,
		};
	},
});

export default actions;
