/* Instruments */
import { dp } from "src/reduxService";
import { createThunks } from "src/reduxService/setup";
import names from "src/reduxService/stores/names";
import httpApi from "./api";
import { GetRuleDetailApiParams, Rule } from "./model";

const thunks = createThunks(names.ruleStore, {
  initCurrentDataAct: async (params: GetRuleDetailApiParams) => {
    const { id } = params;
    let ruleData: Rule;
    if (id) {
      const { data } = await httpApi.getRuleDetailApi(params);
      ruleData = { ...data };
    } else {
      ruleData = {
        ruleName: "",
        comment: "",
        id: 1,
        ownerId: "1",
      } as Rule;
    }
    dp("ruleStore", "setCurrentRuleData", ruleData);
  },
  // 查询rule的table列表数据
  queryRuleListAct: async (_, api) => {
    const { filterData, ruleTablePagedata } = api.getState().ruleStore;
    const { pageNum, pageSize } = ruleTablePagedata;
    const { data } = await httpApi.getRuleListApi({
      pageNo: pageNum,
      pageSize,
      ...filterData,
    });
    data.list && dp("ruleStore", "setRuletList", data.list);
  },
  // 添加rule
  addAct: async (params: Rule) => {
    await httpApi.createApi(params);
  },
  // 更新rule
  updateAct: async (params: Rule) => {
    await httpApi.upadteApi(params);
  },
  // 删除rule
  deleteAct: async (params: any) => {
    await httpApi.deleteApi(params);
  },
  // 设置RuleCarrier
  getRuleCarrierListAct: async () => {
    const { data } = await httpApi.getRuleCarrierListApi();
    dp("ruleStore", "setRuleCarrier", data);
  },
  // 获取详情
  getDetailAct: async (params: GetRuleDetailApiParams) => {
    const { data } = await httpApi.getRuleDetailApi(params);
    dp("ruleStore", "setCurrentRuleData", data);
  },
});
export default thunks;
