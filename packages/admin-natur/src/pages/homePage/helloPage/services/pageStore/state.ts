import { StoreState } from "./model";

// 写成函数，方便初始化
export const initState = (): StoreState => {
	return {
		opportunityStatisticsData: [],
		platformStatisticsData: [],
		generateColumnsDataByDate: [],
		loading: false,
	};
};

const state = initState();
export default state;
