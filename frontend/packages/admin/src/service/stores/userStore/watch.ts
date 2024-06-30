import { dpChain, getActionType } from "src/service";
import { startAppListening } from "src/service/setup";

const watch = () => {
	startAppListening({
		type: getActionType("userStore").setPageData,
		effect: async () => {
			dpChain("userStore").queryListAct();
		},
	});
};

export default watch;
