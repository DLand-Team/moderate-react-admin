/* Instruments */
import { createThunks } from "src/service/setup";
import names from "src/service/stores/names";
import httpApi from "./api";
import { Filter, DeleteApiParams, GetApiParams } from "./model";
import { dp } from "src/service";
import { guid } from "src/common/utils/utilFn";

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
    let arr = [];
    if (data.connectionsOperator) {
      arr.push({
        filterId: data.id,
        filterBy: "connections",
        operator: data.connectionsOperator,
        number: data.connections,
        pv: 2,
        key:guid()
      });
    }
    if (data.travelTime) {
      arr.push({
        filterId: data.id,
        filterBy: "travelTime",
        operator: data.travelTimeOperator,
        number: data.travelTime,
        pv: data.travelTimeType === 1 ? 2 : 1,
        key:guid()
      });
    }
    dp("filterStore", "setFilterItemList", arr);
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
