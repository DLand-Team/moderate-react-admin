import { dpChain, getActionType } from "src/service";
import { startAppListening } from "src/service";

// 更新Itinerary的工作流
const updateItineraryWorkFlow = (branchName: string) => {
  // 刷新了ItineraryList，就重新转换数据的结构
  startAppListening({
    type: getActionType(["ruleStore", branchName]).setItineraryList,
    effect: async () => {
      dpChain(["ruleStore", branchName]).createItByRankAct(null);
    },
  });

  // 切换当前的Itinerary，生成对应的数据结构
  // 或者ItByRank数据发生变化
  // 以上情况，就会刷新显示数据，刷新rule信息面板的数据
  startAppListening({
    predicate: (action) => {
      const { setTargetItineraryId, setTargetRankId, createItByRankAct } =
        getActionType(["ruleStore", branchName]);
      return [
        setTargetItineraryId,
        setTargetRankId,
        createItByRankAct.fulfilled,
      ].includes(action.type);
    },
    effect: async () => {
      dpChain(["ruleStore", branchName]).createConAndSeqByPosAct(null);
    },
  });
};
// 一切更新表格的工作流
const updatePageWorkflow = (branchName: string) => {
  startAppListening({
    type: getActionType(["ruleStore", branchName]).setFilterData,
    effect: async () => {
      dpChain(["ruleStore", branchName]).setRuleTablePageData({
        pageNum: 1,
      });
    },
  });
  startAppListening({
    type: getActionType(["ruleStore", branchName]).setRuleTablePageData,
    effect: async () => {
      dpChain(["ruleStore", branchName]).queryRuleListAct({
        pageNum: 1,
      });
    },
  });
};
const watch = (branchName: string) => {
  updateItineraryWorkFlow(branchName);
  updatePageWorkflow(branchName);
};

export default watch;
