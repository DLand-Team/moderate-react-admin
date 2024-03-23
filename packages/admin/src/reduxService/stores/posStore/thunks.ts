/* Instruments */
import { pickBy } from "lodash-es";
import { dp } from "src/reduxService";
import { createThunks } from "src/reduxService/setup";
import names from "src/reduxService/stores/names";
import httpApi from "./api";
import { GetAgencyDataApiParams, Pos } from "./model";

const thunks = createThunks(names.posStore, {
	// 添加pos的动作
	addAct: async (params: Pos) => {
		await httpApi.createApi(params);
	},
	deleteAct: async (params: any) => {
		await httpApi.deleteApi(params);
	},
	updateAct: async (params: any) => {
		await httpApi.upadteApi(pickBy(params));
	},
	queryPostListAct: async (_, api) => {
		const { posTablePagedata } = api.getState().posStore;
		const { pageNum, pageSize } = posTablePagedata;
		const { data } = await httpApi.getPosListApi({
			pageNo: pageNum,
			pageSize,
		});
		data.list && dp("posStore", "setPostList", data.list);
	},
	getPosCarrierListAct: async () => {
		const { data } = await httpApi.getPosCarrierListApi();
		dp("posStore", "setPosCarrier", data);
	},
	getAgencyDataAct: async (params: GetAgencyDataApiParams) => {
		const { data } = await httpApi.getAgencyDataApi(params);
		dp("posStore", "setPosCarrier", data);
	},
});
export default thunks;
