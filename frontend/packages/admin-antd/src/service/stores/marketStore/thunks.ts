import { dpChain, getStore } from "src/service";
import { createThunks } from "src/service";
import httpApi from "./api";
import { GetAgencyDataApiParams, GetDetailActParams, Market } from "./model";
import { PageBaseData } from "src/types/common";
import slice from "./slice";

const thunks = createThunks(["marketStore", slice.branch], {
    initCurrentDetailAct: async (_, __, branchName) => {
        let marketData: Market;
        marketData = {
            marketName: "",
            comment: "",
            cpdMarketItems: [],
        };
        dpChain(["marketStore", branchName]).setCurrentMarketData(marketData);
    },
    getCurrentDetailAct: async (params: GetDetailActParams, _, branchName) => {
        const { id } = params;
        let marketData: Market;
        if (id) {
            const { data } = await httpApi.getMarketDeatilApi(params);
            const { data: marketItemList } = await httpApi.getMarketItemListApi(
                {
                    marketId: id,
                }
            );
            marketData = { ...data, cpdMarketItems: marketItemList };
        } else {
            marketData = {
                marketName: "",
                comment: "",
                cpdMarketItems: [],
            };
        }
        dpChain(["marketStore", branchName]).setCurrentMarketData(marketData);
    },
    getDetailAct: async (params: GetDetailActParams, _, branchName) => {
        const { data } = await httpApi.getMarketDeatilApi(params);
        dpChain(["marketStore", branchName]).setCurrentMarketData(data);
    },
    // 添加market的动作
    addAct: async (_, __, branchName) => {
        const { currentData } = getStore(["marketStore", branchName]);
        currentData && (await httpApi.createApi(currentData));
    },
    deleteAct: async (params: any) => {
        await httpApi.deleteApi(params);
    },
    updateAct: async (_, __, branchName) => {
        const { currentData } = getStore(["marketStore", branchName]);
        await httpApi.upadteApi(currentData!);
    },

    queryAllMarketListAct: async (__, _, branchName) => {
        const { data } = await httpApi.getAllMarketListApi();
        data && dpChain(["marketStore", branchName]).setAllMarketList(data);
    },
    queryMarkettListAct: async (
        payload: Partial<PageBaseData> | null,
        _,
        branchName
    ) => {
        const { marketTablePagedata, marketFilterData } = getStore([
            "marketStore",
            branchName,
        ]);
        const { pageNum, pageSize } = marketTablePagedata;
        const { data } = await httpApi.getMarketListApi({
            pageNo: payload?.pageNum || pageNum,
            pageSize: payload?.pageSize || pageSize,
            ...marketFilterData,
        });
        data.list && dpChain(["marketStore", branchName]).setMarketList(data);
    },
    getMarketCarrierListAct: async (_, __, branchName) => {
        const { data } = await httpApi.getMarketCarrierListApi();
        dpChain(["marketStore", branchName]).setMarketCarrier(data);
    },
    getLocationListAct: async (_, __, branchName) => {
        const { data } = await httpApi.getLocationListApi();
        dpChain(["marketStore", branchName]).setLocaionList(data);
    },
    getAgencyDataAct: async (params: GetAgencyDataApiParams, _, branchName) => {
        const { data } = await httpApi.getAgencyDataApi(params);
        dpChain(["marketStore", branchName]).setMarketCarrier(data);
    },
});
export default thunks;
