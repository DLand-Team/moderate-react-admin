import { dp } from "src/service";
import { createThunks } from "src/service";
import httpApi from "./api";

const thunks = createThunks("commonStore", {
    getLocationListAct: async () => {
        const { data } = await httpApi.getLocationListApi();
        dp("commonStore", "setLocaionList", data);
    },
    getRedisDataAct: async () => {
        const { data } = await httpApi.getRedisDataApi();
        dp("commonStore", "setRedisData", data);
    },
    getIsAuditAct: async (params) => {
        const { data } = await httpApi.getIsAuditApi(params);
        dp("commonStore", "setIsAudit", data?.list?.length===0);
    },
    createAuditDataAct: async (params) => {
        return await httpApi.createAuditApi(params);
    },
});
export default thunks;
