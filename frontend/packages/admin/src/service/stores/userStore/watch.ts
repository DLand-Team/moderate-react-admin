import { dp, getActionType } from "src/service";
import { startAppListening } from "src/service/setup";

const watch = () => {
	startAppListening({
		type: getActionType("userStore").setPageData,
		effect: async () => {
			dp("userStore", "queryListAct");
		},
	});
};

export default watch;
