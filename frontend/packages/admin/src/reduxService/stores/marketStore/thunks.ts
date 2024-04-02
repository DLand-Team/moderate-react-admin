/* Instruments */
import { dp } from "src/reduxService";
import { createThunks } from "src/reduxService/setup";
import names from "src/reduxService/stores/names";
import httpApi from "./api";
import { DeleteApiParams, DetailApiParams, Market } from "./model";

const thunks = createThunks(names.marketStore, {
  // 添加
  addAct: async (params: Market) => {
    await httpApi.createApi(params);
  },
  deleteAct: async (params: DeleteApiParams) => {
    await httpApi.deleteApi(params);
  },
  updateAct: async (params: Market) => {
    await httpApi.upadteApi(params);
  },
  queryMarketListAct: async (_, api) => {
    // 请求
    const { marketTablePagedata } = api.getState().marketStore;
    const { pageNum, pageSize } = marketTablePagedata;
    // 请求回来list数据
    const { data } = await httpApi.getMarketListApi({
      pageNo: pageNum,
      pageSize,
    });
    dp("marketStore", "setMarketList", data.list);
  },

  getLocationListAct: async () => {
    const { data } = await httpApi.getLocationListApi();
    dp("marketStore", "setLocaionList", data);
  },
  getDetailAct: async (_: DetailApiParams) => {
    // const { data } = await httpApi.getMarketDetailListApi(params);
    // dp("marketStore", "setCurrentData", data);
  },
});
export default thunks;
