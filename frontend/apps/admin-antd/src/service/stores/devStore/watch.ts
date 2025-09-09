import { dp, getActionType } from "src/service";
import { startAppListening } from "src/service";

const watch = () => {
  startAppListening({
    type: getActionType("devStore").removePluginAct + "/fulfilled",
    effect: () => {
      dp("devStore", "getPluginListAct");
    },
  });
};

export default watch;
