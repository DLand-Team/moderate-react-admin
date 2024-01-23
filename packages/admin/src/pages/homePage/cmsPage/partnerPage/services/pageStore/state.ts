import { CompanyPageStoreState } from "./model";

// 写成函数，方便初始化
export const initState = (): CompanyPageStoreState => {
	return {
		pageNum: 1,
		pageSize: 10,
		dataList: [],
		total: 0,
		isShowAddModal: false,
		isUpdate: false,
		recordData:null,
		loading:false,
		isDetail:false,
	};
};

const state = initState();
export default state;
