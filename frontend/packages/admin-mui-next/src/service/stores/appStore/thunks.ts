import { createThunks, dpChain } from "@/service";
import httpApi from "./api";
import { GetPswInfoParams } from "./model";

const thunks = createThunks("appStore", {
    deleteTabHistoryAct: async ({ pathName }: { pathName: string }, api) => {
        const { tabItems } = api.getState().appStore;
        const tabsHistoryCopy = [...tabItems];
        const index = tabsHistoryCopy.findIndex((item) => {
            return item.key === pathName;
        });
        if (index != -1) {
            tabsHistoryCopy.splice(index, 1);
            dpChain("appStore").setTabItems(tabsHistoryCopy);
        }
    },
    createMenuDataAct: async (_: null, api) => {
        dpChain("appStore").setMenuDataAct([]);
    },
    async changePswAct(arg: GetPswInfoParams) {
        return await httpApi.changePswApi(arg);
    },
});
export default thunks;
