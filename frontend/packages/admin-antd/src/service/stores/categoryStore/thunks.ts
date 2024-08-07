import { dpChain } from "src/service";
import { createThunks } from "src/service";
import httpApi from "./api";
import { UUID, pickBy } from "src/common/utils";

const thunks = createThunks("categoryStore", {
    refreshFormVersionAct: () => {
        return {
            formVersion: UUID(),
        };
    },
    setIsDetailAct: (isDetail: boolean) => {
        return {
            isDetail,
        };
    },
    setPageNum: (pageNum: number) => {
        return {
            pageNum,
        };
    },
    setAddModalShowAct: ({ isShowAddModal }: { isShowAddModal: boolean }) => {
        let extra = !isShowAddModal
            ? {
                  isDetail: false,
              }
            : {};
        return {
            isShowAddModal,
            ...extra,
        };
    },
    addAct: async (params) => {
        await httpApi.addApi(pickBy(params));
    },
    deleteAct: async (params) => {
        await httpApi.deleteApi(params);
    },
    updateAct: async (params) => {
        await httpApi.updateApi(pickBy(params));
    },
    queryListAct: async (params, api) => {
        const list = await httpApi.queryApi({
            page: api.getState().categoryStore.pageData.pageNum || 1,
            ...pickBy(params),
        });
        dpChain("categoryStore").setCategoryList({
            list,
            total: list.length,
        });
    },
});
export default thunks;
