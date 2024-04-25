import { dp, getActionType } from "src/service";
import { startAppListening } from "src/service/setup";

const watch = () => {
  // 页码一边，就刷新列表
  // 触发页码改变的情景如：
  // 赛选条件变了
  startAppListening({
    type: getActionType("marketStore").setMarketFilterData,
    effect: async () => {
      await dp("marketStore", "setMarketTablePageData", {
        pageNum: 1,
      });
    },
  });
  startAppListening({
    type: getActionType("marketStore").setMarketTablePageData,
    effect: async () => {
      dp("marketStore", "queryMarkettListAct");
    },
  });
};

export default watch;
