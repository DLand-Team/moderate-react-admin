/* Instruments */
import { dp } from "src/reduxService";
import { createThunks } from "src/reduxService/setup";
import names from "src/reduxService/stores/names";
import httpApi from "./api";
import { Sort, DeleteApiParams,GetApiParams } from "./model";

const thunks = createThunks(names.sortStore, {
  createAct: async (params: Sort) => {
    await httpApi.createApi(params);
  },
  deleteAct: async (params: DeleteApiParams) => {
    await httpApi.deleteApi(params);
  },
  updateAct: async (params: Sort) => {
    await httpApi.upadteApi(params);
  },
  getDetailAct: async (params: GetApiParams) => {
    // await httpApi.getDetail(params);
    const { data } = await httpApi.getDetail(params);
    dp("sortStore", "setCurrentData", data);
  },
  queryListAct: async (_, api) => {
    const { filterData, tablePagedata } = api.getState().sortStore;
    const { pageNum, pageSize } = tablePagedata;
    // 请求回来list数据
    const { data } = await httpApi.getListApi({
      pageNo: pageNum,
      pageSize,
      ...filterData,
    });
    dp("sortStore", "setList", data);
  },
});
export default thunks;
