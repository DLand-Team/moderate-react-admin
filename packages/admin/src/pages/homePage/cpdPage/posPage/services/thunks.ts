/* Instruments */
import { pickBy } from "lodash-es";
import { UUID } from "src/common/utils";
import { createThunks } from "src/reduxService/setup";
import names from "src/reduxService/stores/names";
import httpApi from "./api";

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
	addAct: async (params) => {
		await httpApi.addApi(pickBy(params));
	},
	deleteAct: async (params) => {
		await httpApi.deleteApi(params);
	},
	updateAct: async (params) => {
		await httpApi.upadteApi(pickBy(params));
	},
	queryAct: async (_, api) => {
		const { pageNum, pageSize } = api.getState().posStore;
		await httpApi.queryApi(
			{
				pageNo: pageNum,
				pageSize: pageSize,
			}
		);
	},
});
export default thunks;
