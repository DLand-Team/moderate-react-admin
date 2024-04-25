/* Instruments */
import { dp } from "src/service";
import { createThunks } from "src/service/setup";
import names from "src/service/stores/names";
import httpApi from "./api";
import { GetAgencyDataApiParams, GetDetailActParams, Market } from "./model";

const thunks = createThunks(names.marketStore, {
  initCurrentDataAct: async (params: GetDetailActParams) => {
    const { id } = params;
    let marketData: Market;
    if (id) {
      const { data } = await httpApi.getMarketDeatilApi(params);
      const { data: marketItemList } = await httpApi.getMarketItemListApi({
        marketId: id,
      });
      marketData = { ...data, cpdMarketItems: marketItemList };
    } else {
      marketData = {
        marketName: "",
        comment: "",
        cpdMarketItems: [],
      };
    }
    dp("marketStore", "setCurrentMarketData", marketData);
  },
  getDetailAct: async (params: GetDetailActParams) => {
    const { data } = await httpApi.getMarketDeatilApi(params);
    dp("marketStore", "setCurrentMarketData", data);
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
  queryMarkettListAct: async (_, api) => {
    const { marketTablePagedata, marketFilterData } =
      api.getState().marketStore;
    const { pageNum, pageSize } = marketTablePagedata;
    const { data } = await httpApi.getMarketListApi({
      pageNo: pageNum,
      pageSize,
      ...marketFilterData,
    });
    data.list && dp("marketStore", "setMarketList", data);
  },
  getMarketCarrierListAct: async () => {
    const { data } = await httpApi.getMarketCarrierListApi();
    dp("marketStore", "setMarketCarrier", data);
  },
  getLocationListAct: async () => {
    const { data } = await httpApi.getLocationListApi();
    dp("marketStore", "setMarketCarrier", data);
  },
  getAgencyDataAct: async (params: GetAgencyDataApiParams) => {
    const { data } = await httpApi.getAgencyDataApi(params);
    dp("marketStore", "setMarketCarrier", data);
  },
});
export default thunks;
