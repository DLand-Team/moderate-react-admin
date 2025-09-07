
import names from "src/reduxService/stores/names";
import { pickBy } from "lodash-es";
import httpApi from "./api";
import { UUID } from "src/common/utils";
import { createThunks } from "src/reduxService/setup";

const thunks = createThunks(names.categoryStore, {
	refreshFormVersionAct: () => {
		return {
			formVersion: UUID(),
		};
	},
	setIsDetailAct: (isDetail: boolean) => {
		return {
			isDetail,
		};
	},
	setPageNum: (pageNum: number) => {
		return {
			pageNum,
		};
	},
	setAddModalShowAct: ({
		isShowAddModal,
		recordData,
	}: {
		isShowAddModal: boolean;
		recordData?: any;
	}) => {
		let extra = !isShowAddModal
			? {
					isDetail: false,
				}
			: {};
		return {
			recordData,
			isShowAddModal,
			...extra,
		};
	},
	addAct: async (params: any) => {
		await httpApi.addApi(pickBy(params));
	},
	deleteAct: async (params: any) => {
		await httpApi.deleteApi(params);
	},
	updateAct: async (params: any) => {
		await httpApi.upadteApi(pickBy(params));
	},
	queryAct: async (params: any) => {
		await httpApi.upadteApi(pickBy(params));
	},
});
export default thunks;
