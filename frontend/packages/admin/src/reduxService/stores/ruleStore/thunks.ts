/* Instruments */
import { pickBy } from "lodash-es";
import { dp } from "src/reduxService";
import { createThunks } from "src/reduxService/setup";
import names from "src/reduxService/stores/names";
import httpApi from "./api";
import { Rule } from "./model";

const thunks = createThunks(names.ruleStore, {
  // 添加rule的动作
  addAct: async (params: Rule) => {
    await httpApi.createApi(params);
  },
  deleteAct: async (params: any) => {
    await httpApi.deleteApi(params);
  },
  updateAct: async (params: any) => {
    await httpApi.upadteApi(pickBy(params));
  },
  queryRuleAct: async (_, api) => {
    const { filterData, ruleTablePagedata } = api.getState().ruleStore;
    const { pageNum, pageSize } = ruleTablePagedata;
    const { data } = await httpApi.getRuleListApi({
      pageNo: pageNum,
      pageSize,
      ...filterData,
    });
    data.list && dp("ruleStore", "setRuletList", data.list);
  },
});
export default thunks;
