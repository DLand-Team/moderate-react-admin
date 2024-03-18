import { mapCreator } from "@/common/hooks";
import state from "./state";
import dayjs from "dayjs";
const createMap = mapCreator(state);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	opportunityStatisticsDataNew: createMap(
		(s) => {
			return s.opportunityStatisticsData;
		},
		(opportunityStatisticsData) => {
			const result = [];
			opportunityStatisticsData.forEach((item) => {
				const { view, wished, enquiry, click, created_at } = item;
				let obj = { view, wished, enquiry, click };
				for (let key in obj) {
					result.push({
						type: key,
						value: obj[key],
						created_at: dayjs(created_at).format("YYYY-MM-DD"),
					});
				}
			});
			return result;
		},
	),
	platformStatisticsDataNew: createMap(
		(s) => {
			return s.platformStatisticsData;
		},
		(platformStatisticsData) => {
			const result = [];
			platformStatisticsData.forEach((item) => {
				const {
					user_count,
					partner_count,
					opportunity_count,
					enquiry_count,
					created_at,
				} = item;
				let obj = {
					user_count,
					partner_count,
					opportunity_count,
					enquiry_count,
				};
				for (let key in obj) {
					result.push({
						type: key,
						value: obj[key],
						created_at: dayjs(created_at).format("YYYY-MM-DD"),
					});
				}
			});
			return result;
		},
	),
	// generateColumnsDataByDate: createMap(
	// 	(s) => { 
	// 		return s.generateColumnsDataByDate;
	// 	},
	// 	(generateColumnsDataByDate) => { 
	// 		const opportunity
	// 	}
	// )
};
