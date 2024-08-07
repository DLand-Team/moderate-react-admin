import {
    dpChain,
    getActionType,
    getStore,
    startAppListening,
} from "src/service";

const watch = () => {
    startAppListening({
        type: getActionType("authStore").setUserid,
        effect: async () => {
            dpChain("authStore")
                .getUserinfoAct({
                    id: getStore("authStore").userId,
                })
                .then(async (data) => {
                    await dpChain("authStore").getExtraUserinfoAct({
                        id: data.payload.deptId,
                    });
                    dpChain("authStore").getInfraConfigAct(null);
                });
        },
    });
};

export default watch;
