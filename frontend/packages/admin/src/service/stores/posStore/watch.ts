import { dp, getActionType } from "src/service";
import { startAppListening } from "src/service/setup";

const watch = () => {
    startAppListening({
        type: getActionType("posStore").setPosFilterData,
        effect: async () => {
          await dp("posStore", "setPosTablePageData", {
            pageNum: 1,
          });
        },
      });
      startAppListening({
        type: getActionType("posStore").setPosTablePageData,
        effect: async () => {
          dp("posStore", "queryPostListAct");
        },
      });
};

export default watch;
