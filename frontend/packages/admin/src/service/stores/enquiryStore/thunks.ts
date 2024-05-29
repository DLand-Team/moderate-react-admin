/* Instruments */
import { pickBy } from "lodash-es";
import { UUID } from "src/common/utils";
import { createThunks } from "src/service/setup";
import names from "src/service/stores/names";
import httpApi from "./api";

const thunks = createThunks(names.enquiryStore, {
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
	setAddModalShowAct: ({ isShowAddModal }: { isShowAddModal: boolean }) => {
		let extra = !isShowAddModal
			? {
					isDetail: false,
				}
			: {};
		return {
			isShowAddModal,
			...extra,
		};
	},
	addAct: async (params) => {
		await httpApi.addApi(pickBy(params));
	},
	deleteAct: async (params) => {
		await httpApi.deleteApi(params);
	},
	updateAct: async (params) => {
		await httpApi.updateApi(pickBy(params));
	},
	queryListAct: async () => {
		// const list = await httpApi.queryApi({
		// 	page: api.getState().enquiryStore.pageData.pageNum || 1,
		// 	...pickBy(params),
		// });
		// dp("categoryStore", "setCategoryList", { list, total: list.length });
	},
});
export default thunks;
