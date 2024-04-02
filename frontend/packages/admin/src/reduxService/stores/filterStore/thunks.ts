/* Instruments */
import { createThunks } from "src/reduxService/setup";
import names from "src/reduxService/stores/names";
import httpApi from "./api";
import { Filter, DeleteApiParams, GetApiParams } from "./model";
import { dp } from "src/reduxService";

const thunks = createThunks(names.filterStore, {
  createAct: async (params: Filter) => {
    return await httpApi.createApi(params);
  },
  deleteAct: async (params: DeleteApiParams) => {
    await httpApi.deleteApi(params);
  },
  updateAct: async (params: Filter) => {
    return await httpApi.upadteApi(params);
  },
  getDetailAct: async (params: GetApiParams) => {
    const { data } = await httpApi.getDetail(params);
    dp("filterStore", "setCurrentData", data);
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
    dp("filterStore", "setList", data);
  },
});
export default thunks;
