/* Instruments */
import { dp } from "src/service";
import { createThunks } from "src/service";
import httpApi from "./api";

const thunks = createThunks("ruleSimulationStore", {
    queryListAct: async (params: any) => {
        const { code, data } = await httpApi.queryListApi(params);
        const { solutions, uuid, errorInformation } = data || {};
        if (code === "200") {
            if (solutions.length) {
                dp("ruleSimulationStore", "setRuleSimulationArr", solutions);
                dp("ruleSimulationStore", "setUuid", "");
                dp("ruleSimulationStore", "setErrorText", "");
            } else if (errorInformation != null) {
                dp("ruleSimulationStore", "setUuid", uuid);
                dp(
                    "ruleSimulationStore",
                    "setErrorText",
                    errorInformation.errorText
                );
                dp("ruleSimulationStore", "setRuleSimulationArr", []);
            }
        }
    },
    queryRuleSimulationAct: async (params: any) => {
        const res = await httpApi.queryLocationListApi(params);
        if (res.code == "200") {
            dp("ruleSimulationStore", "setLocationList", res.data);
            return res.data.locationList;
        }
    },
});
export default thunks;
