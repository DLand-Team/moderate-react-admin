import { dp, getActionType } from "src/service";
import { startAppListening } from "src/service/setup";

const watch = () => {
  // 监听查询状态的改变，响应行为就是重新刷新列表数据
  startAppListening({
    type: getActionType("filterStore").setFilterData,
    effect: async () => {
      await dp("filterStore", "setPageData", {
        pageNum: 1,
      });
    },
  });
  startAppListening({
    type: getActionType("filterStore").setPageData,
    effect: async () => {
      dp("filterStore", "queryListAct");
    },
  });
};

export default watch;
