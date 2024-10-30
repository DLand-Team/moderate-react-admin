import { dp } from "src/service";
import { createThunks } from "src/service";
import httpApi from "./api";
import { DeleteApiParams, Filter, GetApiParams } from "./model";
import { UUID } from "src/common/utils";

const thunks = createThunks("filterStore", {
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
        const arr = [];
        if (data.connectionsOperator) {
            arr.push({
                filterId: data.id,
                filterBy: "connections",
                operator: data.connectionsOperator,
                number: data.connections,
                pv: 2,
                key: UUID(),
            });
        }
        if (data.travelTime) {
            arr.push({
                filterId: data.id,
                filterBy: "travelTime",
                operator: data.travelTimeOperator,
                number: data.travelTime,
                pv: data.travelTimeType === 1 ? 2 : 1,
                key: UUID(),
            });
        }
        dp("filterStore", "setFilterItemList", arr);
    },
    queryListAct: async (_, api) => {
        const { filterData, tablePagedata } = api.getState().filterStore;
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
