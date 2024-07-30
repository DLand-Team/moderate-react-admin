import { dp, getActionType } from "src/service";
import { startAppListening } from "src/service";

const watch = () => {
  // 监听查询状态的改变，响应行为就是重新刷新列表数据
  startAppListening({
    type: getActionType("carrierStore").setFilterData,
    effect: async () => {
      await dp("carrierStore", "setPageData", {
        pageNum: 1,
      });
    },
  });
  startAppListening({
    type: getActionType("carrierStore").setPageData,
    effect: async () => {
      dp("carrierStore", "queryListAct");
    },
  });
};

export default watch;
