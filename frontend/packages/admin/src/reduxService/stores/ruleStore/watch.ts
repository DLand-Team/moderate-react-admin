import { dp, getActionType } from "src/reduxService";
import { startAppListening } from "src/reduxService/setup";

const watch = () => {
  // 监听查询状态的改变，响应行为就是重新刷新列表数据
  startAppListening({
    type: getActionType("ruleStore").setFilterData,
    effect: async () => {
      await dp("ruleStore", "setPageData", {
        pageNum: 1,
      });
    },
  });
  startAppListening({
    type: getActionType("ruleStore").setPageData,
    effect: async () => {
      dp("ruleStore", "queryRuleAct");
    },
  });
};

export default watch;
