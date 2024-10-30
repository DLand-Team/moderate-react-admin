import { dpChain, getActionType, startAppListening } from "src/service";

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
const updateRuleListWorkFlow = (branchName: string) => {
    // 查询触发刷新列表
    startAppListening({
        type: getActionType(["ruleStore", branchName]).setRuleFilterData,
        effect: async () => {
            dpChain(["ruleStore", branchName]).setRuleTablePageData({
                pageNum: 1,
            });
        },
    });
    // 增，删，改，生效触发刷新列表
    startAppListening({
        predicate: (action) => {
            const { addRuleAct, updateRuleAct, deleteRuleAct, activeRuleAct } =
                getActionType(["ruleStore", branchName]);
            return [
                addRuleAct.fulfilled,
                updateRuleAct.fulfilled,
                deleteRuleAct.fulfilled,
                activeRuleAct.fulfilled,
            ].includes(action.type);
        },
        effect: async () => {
            dpChain(["ruleStore", branchName]).setRuleTablePageData({
                pageNum: 1,
            });
        },
    });

    // 刷新机制：翻页数据变化即触发刷新
    startAppListening({
        type: getActionType(["ruleStore", branchName]).setRuleTablePageData,
        effect: async () => {
            dpChain(["ruleStore", branchName]).queryRuleListAct(null);
        },
    });
};

const watch = (branchName: string) => {
    updateItineraryWorkFlow(branchName);
    updateRuleListWorkFlow(branchName);
};

export default watch;
