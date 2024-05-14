/* Instruments */
import { dp } from "src/service";
import { createThunks } from "src/service/setup";
import names from "src/service/stores/names";
import httpApi from "./api";
import { Carrier, DeleteApiParams, GetApiParams } from "./model";

const thunks = createThunks(names.carrierStore, {
	createAct: async (params: Carrier) => {
		return await httpApi.createApi(params);
	},
	deleteAct: async (params: DeleteApiParams) => {
		await httpApi.deleteApi(params);
	},
	updateAct: async (params: Carrier) => {
		return await httpApi.upadteApi(params);
	},
	getDetailAct: async (params: GetApiParams) => {
		const { data } = await httpApi.getDetailApi(params);
		dp("carrierStore", "setCurrentData", data);
	},
	queryListAct: async (_, api) => {
		const { filterData, tablePagedata } = api.getState().carrierStore;
		const { pageNum, pageSize } = tablePagedata;
		// 请求回来list数据
		const { data } = await httpApi.getListApi({
			pageNo: pageNum,
			pageSize,
			...filterData,
		});
		dp("carrierStore", "setList", data);
	},
	queryCarrierAct: async (_) => {
		const { data } = await httpApi.getCarrierListApi();
		dp("carrierStore", "setCarrierList", data);
	},
});
export default thunks;
