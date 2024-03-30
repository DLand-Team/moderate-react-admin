/* Instruments */
import { dp } from "src/reduxService";
import { createThunks } from "src/reduxService/setup";
import names from "src/reduxService/stores/names";
import httpApi from "./api";
import { Carrier, DeleteApiParams, GetApiParams } from "./model";

const thunks = createThunks(names.carrierStore, {
  createAct: async (params: Carrier) => {
    await httpApi.createApi(params);
  },
  deleteAct: async (params: DeleteApiParams) => {
    await httpApi.deleteApi(params);
  },
  updateAct: async (params: Carrier) => {
    await httpApi.upadteApi(params);
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
