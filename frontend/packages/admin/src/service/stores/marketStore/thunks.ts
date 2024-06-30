
import { dpChain } from "src/service";
import { createThunks } from "src/service/setup";
import httpApi from "./api";
import { GetAgencyDataApiParams, GetDetailActParams, Market } from "./model";
import { PageBaseData } from "src/types/common";

const thunks = createThunks("marketStore", {
	getCurrentDetailAct: async (params: GetDetailActParams) => {
		const { id } = params;
		let marketData: Market;
		if (id) {
			const { data } = await httpApi.getMarketDeatilApi(params);
			const { data: marketItemList } = await httpApi.getMarketItemListApi(
				{
					marketId: id,
				},
			);
			marketData = { ...data, cpdMarketItems: marketItemList };
		} else {
			marketData = {
				marketName: "",
				comment: "",
				cpdMarketItems: [],
			};
		}
		dpChain("marketStore").setCurrentMarketData(marketData);
	},
	getDetailAct: async (params: GetDetailActParams) => {
		const { data } = await httpApi.getMarketDeatilApi(params);
		dpChain("marketStore").setCurrentMarketData(data);
	},
	// 添加market的动作
	addAct: async (_, api) => {
		const { currentData } = api.getState().marketStore;
		currentData && (await httpApi.createApi(currentData));
	},
	deleteAct: async (params: any) => {
		await httpApi.deleteApi(params);
	},
	updateAct: async (_, api) => {
		const { currentData } = api.getState().marketStore;
		await httpApi.upadteApi(currentData!);
	},
	queryMarkettListAct: async (_: Partial<PageBaseData> | null, api) => {
		const { marketTablePagedata, marketFilterData } =
			api.getState().marketStore;
		const { pageNum, pageSize } = marketTablePagedata;
		const { data } = await httpApi.getMarketListApi({
			pageNo: pageNum,
			pageSize,
			...marketFilterData,
		});
		data.list && dpChain("marketStore").setMarketList(data);
	},
	getMarketCarrierListAct: async () => {
		const { data } = await httpApi.getMarketCarrierListApi();
		dpChain("marketStore").setMarketCarrier(data);
	},
	getLocationListAct: async () => {
		const { data } = await httpApi.getLocationListApi();
		dpChain("marketStore").setLocaionList(data);
	},
	getAgencyDataAct: async (params: GetAgencyDataApiParams) => {
		const { data } = await httpApi.getAgencyDataApi(params);
		dpChain("marketStore").setMarketCarrier(data);
	},
});
export default thunks;
