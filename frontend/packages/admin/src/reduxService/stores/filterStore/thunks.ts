/* Instruments */
import { createThunks } from "src/reduxService/setup";
import names from "src/reduxService/stores/names";
import httpApi from "./api";
import { Carrier, DeleteApiParams } from "./model";

const thunks = createThunks(names.filterStore, {
  createAct: async (params: Carrier) => {
    await httpApi.createApi(params);
  },
  deleteAct: async (params: DeleteApiParams) => {
    await httpApi.deleteApi(params);
  },
  updateAct: async (params: Carrier) => {
    await httpApi.upadteApi(params);
  },
  queryListAct: async (_) => {
    // const { filterData, tablePagedata } = api.getState().carrierStore;
    // const { pageNum, pageSize } = tablePagedata;
    // 请求回来list数据
    // const { data } = await httpApi.getListApi({
    //   pageNo: pageNum,
    //   pageSize,
    //   ...filterData,
    // });
    // dp("carrierStore", "setList", data);
  },
});
export default thunks;
