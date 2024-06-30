import { dpChain } from "src/service";
import { createThunks } from "src/service/setup";
import { posCreater } from "src/shapes/pos";
import httpApi from "./api";
import { GetAgencyDataApiParams, GetDetailActParams, Pos } from "./model";
import slice from "./slice";

const thunks = createThunks(["posStore", slice.branch], {
	initCurrentDetail: async (_, __, branchName) => {
		let posData = posCreater() as Pos;
		dpChain(["posStore", branchName]).setCurrentDetail(posData);
	},
	getCurrentDetailAct: async (params: GetDetailActParams, _, branchName) => {
		const { id } = params;
		let posData: Pos;
		const { data } = await httpApi.getPosDeatilApi(params);
		const { data: posItemList } = await httpApi.getPosItemListApi({
			posId: id,
		});
		posData = { ...data, cpdPosItems: posItemList };
		debugger;
		dpChain(["posStore", branchName]).setCurrentDetail(posData);
	},
	getDetailAct: async (params: GetDetailActParams, _, branchName) => {
		const { data } = await httpApi.getPosDeatilApi(params);
		dpChain(["posStore", branchName]).setCurrentDetail(data);
	},
	// 添加pos的动作
	addAct: async (_, api) => {
		const { currentData } = api.getState().posStore;
		currentData && (await httpApi.createApi(currentData));
	},
	deleteAct: async (params: any) => {
		await httpApi.deleteApi(params);
	},
	updateAct: async (_, api) => {
		const { currentData } = api.getState().posStore;
		await httpApi.upadteApi(currentData!);
	},
	queryPostListAct: async (_, api, branchName) => {
		const { posTablePagedata, posFilterData } = api.getState().posStore;
		const { pageNum, pageSize } = posTablePagedata;
		const { data } = await httpApi.getPosListApi({
			pageNo: pageNum,
			pageSize,
			...posFilterData,
		});
		data.list && dpChain(["posStore", branchName]).setPostList(data.list);
	},
	getPosCarrierListAct: async (_, __, branchName) => {
		const { data } = await httpApi.getPosCarrierListApi();
		dpChain(["posStore", branchName]).setPosCarrier(data);
	},
	getLocationListAct: async (_, __, branchName) => {
		const { data } = await httpApi.getLocationListApi();
		dpChain(["posStore", branchName]).setPosCarrier(data);
	},
	getAgencyDataAct: async (params: GetAgencyDataApiParams) => {
		const { data } = await httpApi.getAgencyDataApi(params);
		return data;
	},
});
export default thunks;
