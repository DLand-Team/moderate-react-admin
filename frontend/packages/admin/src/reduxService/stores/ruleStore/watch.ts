import { dp, getActionType } from "src/reduxService";
import { startAppListening } from "src/reduxService/setup";

const watch = () => {
  // 页码一边，就刷新列表
  // 触发页码改变的情景如：
  // 赛选条件变了
  startAppListening({
    type: getActionType("ruleStore").setFilterData,
    effect: async () => {
      await dp("ruleStore", "setRuleTablePageData", {
        pageNum: 1,
      });
    },
  });
  startAppListening({
    type: getActionType("ruleStore").setRuleTablePageData,
    effect: async () => {
      dp("ruleStore", "queryRuleListAct");
    },
  });
};

export default watch;
