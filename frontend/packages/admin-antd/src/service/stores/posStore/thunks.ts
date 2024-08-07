import { dpChain, getStore } from "src/service";
import { createThunks } from "src/service";
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
        dpChain(["posStore", branchName]).setCurrentDetail(posData);
    },
    getDetailAct: async (params: GetDetailActParams, _, branchName) => {
        const { data } = await httpApi.getPosDeatilApi(params);
        dpChain(["posStore", branchName]).setCurrentDetail(data);
    },
    // 添加pos的动作
    addPosAct: async (_, __, branchName) => {
        const { currentData } = getStore(["posStore", branchName]);
        currentData && (await httpApi.createApi(currentData));
    },
    deletePosAct: async (params: any) => {
        await httpApi.deleteApi(params);
    },
    updatePosAct: async (_, __, branchName) => {
        const { currentData } = getStore(["posStore", branchName]);
        await httpApi.upadteApi(currentData!);
    },
    queryPostListAct: async (_, __, branchName) => {
        const { posTablePagedata, posFilterData } = getStore([
            "posStore",
            branchName,
        ]);
        const { pageNum, pageSize } = posTablePagedata;
        const { data } = await httpApi.getPosPageApi({
            pageNo: pageNum,
            pageSize,
            ...posFilterData,
        });
        data.list && dpChain(["posStore", branchName]).setPostList(data.list);
    },
    queryAllPostListAct: async (_, __, branchName) => {
        const { data } = await httpApi.getPosListApi();
        data && dpChain(["posStore", branchName]).setAllPosList(data);
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
