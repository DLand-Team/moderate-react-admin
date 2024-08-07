import { dpChain, getActionType } from "src/service";
import { startAppListening } from "src/service";

const watch = () => {
    startAppListening({
        type: getActionType("userStore").setPageData,
        effect: async () => {
            dpChain("userStore").queryListAct(null);
        },
    });
};

export default watch;
